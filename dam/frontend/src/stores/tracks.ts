import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Track, TrackComment, TrackWithComment, UpdateTrackInput, TrackCommentInput } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const useTracksStore = defineStore('tracks', () => {
  // Current track being viewed/edited in right sidebar (single source of truth from API)
  const currentTrack = ref<Track | null>(null)
  const currentTrackComment = ref<TrackComment | null>(null)
  const isLoadingTrack = ref(false)

  // Fetch track by ID with comment
  async function fetchTrackById(trackId: string) {
    isLoadingTrack.value = true
    try {
      const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}`)
      if (!response.ok) throw new Error('Failed to fetch track')
      const data: TrackWithComment = await response.json()

      currentTrack.value = data.track
      currentTrackComment.value = data.comment || null
    } catch (error) {
      console.error('Error fetching track:', error)
      throw error
    } finally {
      isLoadingTrack.value = false
    }
  }

  // Select a track (load it into the sidebar)
  function selectTrack(track: Track) {
    currentTrack.value = track
    // Fetch full details including comment
    fetchTrackById(track.id)
  }

  // Clear current track selection
  function clearCurrentTrack() {
    currentTrack.value = null
    currentTrackComment.value = null
  }

  // Update track metadata (OPTIMISTIC UPDATE - no refetch)
  async function updateTrackMetadata(trackId: string, metadata: UpdateTrackInput) {
    const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metadata),
    })
    if (!response.ok) throw new Error('Failed to update track')

    const data = await response.json()
    // Optimistic update: only update track data, don't refetch (preserves unsaved comments)
    if (currentTrack.value && currentTrack.value.id === trackId) {
      currentTrack.value = data.track
    }
  }

  // Update track comment
  async function updateTrackComment(trackId: string, comment: TrackCommentInput) {
    const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}/comment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (!response.ok) throw new Error('Failed to update comment')

    const data = await response.json()
    // Update local state
    currentTrackComment.value = data.comment
  }

  // Update track rating (quick update)
  async function updateTrackRating(trackId: string, rating: number) {
    const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}/rating`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating }),
    })
    if (!response.ok) throw new Error('Failed to update rating')

    // Update local state
    if (currentTrack.value && currentTrack.value.id === trackId) {
      currentTrack.value.rating = rating
    }
  }

  return {
    currentTrack,
    currentTrackComment,
    isLoadingTrack,
    fetchTrackById,
    selectTrack,
    clearCurrentTrack,
    updateTrackMetadata,
    updateTrackComment,
    updateTrackRating,
  }
})
