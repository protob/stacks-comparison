<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { usePlayerDamStore, setAudioElement } from '@/stores/playerDam'
import { useTracksStore } from '@/stores/tracks'
import { storeToRefs } from 'pinia'
import { useDebounceFn, useEventListener } from '@vueuse/core'

const playerStore = usePlayerDamStore()
const tracksStore = useTracksStore()
const {
  currentTrack,
  currentTrackUrl,
  currentTrackImageUrl,
  isPlaying,
  volume,
  isMuted,
  isLooping,
  currentQueue,
  currentTrackIndex,
} = storeToRefs(playerStore)

const audioEl = ref<HTMLAudioElement | null>(null)
const isDraggingSlider = ref(false)

// Initialize player on mount: restore last track from API, then setup audio
onMounted(async () => {
  // First, restore last track from localStorage (fetch from API)
  await playerStore.initializeFromStorage()

  // If track was restored, also load it into sidebar (single source of truth sync)
  if (currentTrack.value) {
    tracksStore.selectTrack(currentTrack.value)
  }

  // Then setup audio element
  if (audioEl.value) {
    setAudioElement(audioEl.value)

    // If track was restored, load it into the audio element
    if (currentTrackUrl.value) {
      audioEl.value.src = currentTrackUrl.value
      audioEl.value.load()
    }
  }
})

// --- NATIVE AUDIO EVENTS: Keep UI state in sync ---
// These are REACTIVE to actual audio events, not store state
useEventListener(audioEl, 'play', () => {
  // Audio actually started playing
  if (!isPlaying.value) {
    playerStore.isPlaying = true
  }
})

useEventListener(audioEl, 'pause', () => {
  // Audio actually paused
  if (isPlaying.value) {
    playerStore.isPlaying = false
  }
})

useEventListener(audioEl, 'ended', () => {
  // Audio finished - handle auto-play next or loop
  playerStore.handleTrackEnded()
})

useEventListener(audioEl, 'timeupdate', () => {
  // Update current time
  if (!isDraggingSlider.value && audioEl.value) {
    playerStore.setTime(audioEl.value.currentTime)
  }
})

useEventListener(audioEl, 'durationchange', () => {
  // Update duration
  if (audioEl.value) {
    playerStore.setDuration(audioEl.value.duration || 0)
  }
})

// --- VOLUME CONTROL: Sync store to audio element ---
watch(volume, (newVolume) => {
  if (audioEl.value) {
    audioEl.value.volume = newVolume
  }
})

watch(isMuted, (newIsMuted) => {
  if (audioEl.value) {
    audioEl.value.muted = newIsMuted
  }
})

// --- SRC CHANGES: Update audio element src when track changes ---
watch(currentTrackUrl, (newUrl) => {
  if (audioEl.value && newUrl) {
    audioEl.value.src = newUrl
  }
})

// --- UI Interaction Handlers ---
const onSliderChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newTime = (parseFloat(target.value) / 100) * playerStore.duration
  if (isFinite(newTime) && audioEl.value) {
    audioEl.value.currentTime = newTime
    playerStore.setTime(newTime)
  }
}

const onVolumeChange = useDebounceFn((event: Event) => {
  const newVolume = parseFloat((event.target as HTMLInputElement).value)
  playerStore.setVolume(newVolume)
}, 50)

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

// --- Computed properties for the template ---
const progressPercentage = computed(() => {
  if (playerStore.duration === 0) return 0
  return (playerStore.currentTime / playerStore.duration) * 100
})

const canPlayNext = computed(() => {
  return currentQueue.value.length > 0 && currentTrackIndex.value < currentQueue.value.length - 1
})

const canPlayPrevious = computed(() => {
  return currentQueue.value.length > 0 && currentTrackIndex.value > 0
})
</script>
<template>
  <footer class="grid items-center h-24 grid-cols-3 px-4 bg-surface relative z-50">
    <audio ref="audioEl"></audio>

    <!-- Now Playing -->
    <div
      class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      @click="currentTrack && tracksStore.selectTrack(currentTrack)"
    >
      <div v-if="currentTrack" class="border rounded-md h-14 w-14 border-border bg-background overflow-hidden">
        <img v-if="currentTrackImageUrl" :src="currentTrackImageUrl" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center bg-neutral-800">
          <MdiMusicNoteOutline class="w-6 h-6 text-neutral-500" />
        </div>
      </div>
      <div v-if="currentTrack" class="flex flex-col min-w-0">
        <p class="text-sm font-semibold text-text-primary truncate">{{ currentTrack.title }}</p>
        <p class="text-xs text-text-secondary truncate">{{ currentTrack.source_type }}</p>
      </div>
    </div>

    <!-- Player Controls -->
    <div class="flex flex-col items-center justify-center">
      <div class="flex items-center gap-4">
        <button
          @click="playerStore.playPrevious()"
          :disabled="!canPlayPrevious"
          class="text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <MdiSkipPrevious class="w-6 h-6"/>
        </button>
        <button
          @click="playerStore.togglePlay()"
          :disabled="!currentTrack"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-text-inverse disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdiPause v-if="isPlaying" class="w-6 h-6" />
          <MdiPlay v-else class="w-6 h-6" />
        </button>
        <button
          @click="playerStore.playNext()"
          :disabled="!canPlayNext"
          class="text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <MdiSkipNext class="w-6 h-6"/>
        </button>
        <button
          @click="playerStore.toggleLoop()"
          :class="[
            'transition-colors',
            isLooping ? 'text-primary hover:text-primary/80' : 'text-text-muted hover:text-text-primary'
          ]"
        >
          <MdiRepeat class="w-5 h-5"/>
        </button>
      </div>
      <div class="flex items-center w-full max-w-lg gap-2 mt-2">
        <span class="min-w-[40px] text-right text-xs text-text-muted">{{ formatTime(playerStore.currentTime) }}</span>
        <input
          type="range"
          :value="progressPercentage"
          @input="onSliderChange"
          @mousedown="isDraggingSlider = true"
          @mouseup="isDraggingSlider = false"
          class="w-full h-1 rounded-lg appearance-none cursor-pointer bg-border"
        />
        <span class="text-xs text-text-muted">{{ formatTime(playerStore.duration) }}</span>
      </div>
    </div>

    <!-- Volume & Other Controls -->
    <div class="flex items-center justify-end gap-3">
      <button class="text-text-muted hover:text-text-primary"><MdiMicrophoneVariant class="w-5 h-5" /></button>
      <button class="text-text-muted hover:text-text-primary"><MdiPlaylistMusic class="w-5 h-5" /></button>
      <div class="flex items-center w-32">
        <button @click="playerStore.toggleMute()" class="text-text-muted hover:text-text-primary">
          <MdiVolumeHigh v-if="!isMuted && volume > 0.5" class="w-5 h-5" />
          <MdiVolumeMedium v-else-if="!isMuted && volume > 0" class="w-5 h-5" />
          <MdiVolumeOff v-else class="w-5 h-5" />
        </button>
        <input
          type="range"
          :value="volume"
          @input="onVolumeChange"
          min="0"
          max="1"
          step="0.05"
          class="w-full h-1 ml-2 rounded-lg appearance-none cursor-pointer bg-border"
        />
      </div>
    </div>
  </footer>
</template>