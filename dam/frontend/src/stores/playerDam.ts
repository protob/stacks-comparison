import { ref, computed, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Track } from '@/types/dam-api'
import { useFileUrl } from '@/composables/useFileUrl'

/**
 * DAM-specific player store for managing audio playback.
 *
 * ARCHITECTURE: Direct Audio Control (Action-First Pattern)
 * - Store has direct reference to HTML audio element
 * - Calls audio.play() directly, updates state AFTER success
 * - No reactive watches on isPlaying (prevents race conditions)
 * - Native audio events keep state in sync
 *
 * This ensures 100% reliability for rapid track switching.
 */

// Direct reference to audio element (set by GlobalPlayer on mount)
let audioElement: HTMLAudioElement | null = null

export const setAudioElement = (el: HTMLAudioElement) => {
  audioElement = el
}

export const usePlayerDamStore = defineStore('playerDam', () => {
  const { getFileUrl } = useFileUrl()

  // === STATE ===
  // Current track (single source of truth from API, NOT persisted)
  const currentTrack = ref<Track | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  // Queue management
  const currentQueue = ref<Track[]>([])
  const currentTrackIndex = ref<number>(-1)
  // Persist only simple values to localStorage
  const volume = useLocalStorage('dam-player-volume', 1)
  const lastTrackId = useLocalStorage<string | null>('dam-player-last-track-id', null)
  const isMuted = ref(false)
  const isLooping = useLocalStorage('dam-player-loop', false)

  // === COMPUTED ===
  const currentTrackUrl = computed<string | null>(() => {
    if (!currentTrack.value) return null
    return getFileUrl(currentTrack.value.file_path)
  })

  const currentTrackImageUrl = computed<string | null>(() => {
    if (!currentTrack.value || !currentTrack.value.image_path) return null
    return getFileUrl(currentTrack.value.image_path)
  })

  const currentTrackId = computed<string | null>(() => {
    return currentTrack.value?.id || null
  })

  // === ACTIONS ===

  /**
   * Play a track. If the same track is clicked, toggle play/pause.
   *
   * ACTION-FIRST PATTERN:
   * - Directly calls audio.play()
   * - Only sets isPlaying=true AFTER play() Promise resolves
   * - This ensures UI always matches reality (no state desync)
   */
  const playTrack = async (track: Track) => {
    if (!audioElement) {
      console.error('Audio element not initialized')
      return
    }

    // If same track clicked, toggle play/pause
    if (currentTrack.value?.id === track.id) {
      if (isPlaying.value) {
        audioElement.pause()
        isPlaying.value = false
      } else {
        try {
          await audioElement.play()
          isPlaying.value = true
        } catch (error) {
          console.error('Play failed:', error)
          isPlaying.value = false
        }
      }
      return
    }

    // Load new track
    currentTrack.value = track
    currentTime.value = 0
    // Persist track ID to localStorage (not the full object)
    lastTrackId.value = track.id

    // Wait for Vue reactivity to propagate (updates src)
    await nextTick()

    // Force reload the new source
    audioElement.load()

    // Wait for audio to be ready (with timeout)
    const readyPromise = new Promise<void>((resolve, reject) => {
      if (!audioElement) {
        reject(new Error('Audio element lost'))
        return
      }

      if (audioElement.readyState >= 3) {
        // Already ready (HAVE_FUTURE_DATA)
        resolve()
        return
      }

      const timeout = setTimeout(() => {
        audioElement?.removeEventListener('canplay', onReady)
        reject(new Error('Audio load timeout'))
      }, 3000)

      const onReady = () => {
        clearTimeout(timeout)
        resolve()
      }

      audioElement.addEventListener('canplay', onReady, { once: true })
    })

    try {
      // Wait for audio to be ready
      await readyPromise

      // Now play it
      await audioElement.play()

      // ONLY NOW update state (after successful play)
      isPlaying.value = true
    } catch (error) {
      console.error('Playback failed:', error)
      isPlaying.value = false
    }
  }

  const togglePlay = () => {
    if (!audioElement || !currentTrack.value) return

    if (isPlaying.value) {
      audioElement.pause()
      isPlaying.value = false
    } else {
      audioElement.play()
        .then(() => { isPlaying.value = true })
        .catch((error) => {
          console.error('Play failed:', error)
          isPlaying.value = false
        })
    }
  }

  const pause = () => {
    if (audioElement) {
      audioElement.pause()
    }
    isPlaying.value = false
  }

  const resume = () => {
    if (!audioElement || !currentTrack.value) return

    audioElement.play()
      .then(() => { isPlaying.value = true })
      .catch((error) => {
        console.error('Play failed:', error)
        isPlaying.value = false
      })
  }

  const setTime = (time: number) => {
    currentTime.value = time
  }

  const setDuration = (d: number) => {
    duration.value = d
  }

  const setVolume = (vol: number) => {
    volume.value = vol
    if (vol > 0) isMuted.value = false
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
  }

  const toggleLoop = () => {
    isLooping.value = !isLooping.value
  }

  /**
   * Set the current queue and optionally start playing from a specific track.
   * This should be called when playing a track from a view/folder.
   */
  const setQueue = (tracks: Track[], trackToPlay?: Track) => {
    currentQueue.value = tracks
    if (trackToPlay) {
      const index = tracks.findIndex(t => t.id === trackToPlay.id)
      currentTrackIndex.value = index >= 0 ? index : -1
    }
  }

  /**
   * Play the next track in the queue.
   * Returns true if next track exists and was played, false otherwise.
   */
  const playNext = async (): Promise<boolean> => {
    if (currentQueue.value.length === 0) return false

    const nextIndex = currentTrackIndex.value + 1
    if (nextIndex >= currentQueue.value.length) return false

    const nextTrack = currentQueue.value[nextIndex]
    currentTrackIndex.value = nextIndex
    await playTrack(nextTrack)
    return true
  }

  /**
   * Play the previous track in the queue.
   * Returns true if previous track exists and was played, false otherwise.
   */
  const playPrevious = async (): Promise<boolean> => {
    if (currentQueue.value.length === 0) return false

    const prevIndex = currentTrackIndex.value - 1
    if (prevIndex < 0) return false

    const prevTrack = currentQueue.value[prevIndex]
    currentTrackIndex.value = prevIndex
    await playTrack(prevTrack)
    return true
  }

  /**
   * Handle when current track ends.
   * If looping, restart current track. Otherwise, play next track.
   */
  const handleTrackEnded = async () => {
    if (isLooping.value && audioElement) {
      // Loop current track
      audioElement.currentTime = 0
      await audioElement.play()
      isPlaying.value = true
    } else {
      // Try to play next track
      const playedNext = await playNext()
      if (!playedNext) {
        // No next track, just pause
        isPlaying.value = false
      }
    }
  }

  /**
   * Initialize player from localStorage on app mount.
   * Fetches last played track from API (single source of truth).
   */
  const initializeFromStorage = async () => {
    if (!lastTrackId.value) return

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${API_BASE_URL}/api/tracks/${lastTrackId.value}`)
      if (!response.ok) {
        // Track no longer exists, clear localStorage
        lastTrackId.value = null
        return
      }

      const data = await response.json()
      currentTrack.value = data.track
    } catch (error) {
      console.error('Failed to restore last track:', error)
      lastTrackId.value = null
    }
  }

  return {
    // State
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLooping,
    currentQueue,
    currentTrackIndex,
    // Computed
    currentTrackUrl,
    currentTrackImageUrl,
    currentTrackId,
    // Actions
    playTrack,
    togglePlay,
    pause,
    resume,
    setTime,
    setDuration,
    setVolume,
    toggleMute,
    toggleLoop,
    setQueue,
    playNext,
    playPrevious,
    handleTrackEnded,
    initializeFromStorage,
  }
})
