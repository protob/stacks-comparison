import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { songsApi, type Song } from '@/api/damApi'

export const useSongsStore = defineStore('songs', () => {
  // State
  const songs = ref<Song[]>([])
  const currentSong = ref<Song | null>(null)
  const loading = ref(false)

  // Sorted songs alphabetically
  const sortedSongs = computed(() => {
    const sorted = [...songs.value]
    sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  })

  // Filter songs by idea
  const getSongsByIdea = computed(() => {
    return (ideaId: string | null) => {
      if (!ideaId) return []
      return songs.value.filter(s => s.idea_id === ideaId)
    }
  })

  // Actions
  async function loadSongs() {
    loading.value = true
    try {
      songs.value = await songsApi.list()
    } catch (error) {
      console.error('Failed to load songs:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadSongsByIdea(ideaId: string) {
    loading.value = true
    try {
      const filteredSongs = await songsApi.listByIdea(ideaId)
      // Merge with existing songs (avoid duplicates)
      const existingIds = new Set(songs.value.map(s => s.id))
      const newSongs = filteredSongs.filter(s => !existingIds.has(s.id))
      songs.value = [...songs.value, ...newSongs]
    } catch (error) {
      console.error('Failed to load songs by idea:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadSong(id: string) {
    loading.value = true
    try {
      currentSong.value = await songsApi.get(id)
      // Update in list if exists
      const index = songs.value.findIndex(s => s.id === id)
      if (index >= 0) {
        songs.value[index] = currentSong.value
      } else {
        songs.value.push(currentSong.value)
      }
      return currentSong.value
    } catch (error) {
      console.error('Failed to load song:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createSong(data: {
    name: string
    idea_id: string
    description?: string
    tags?: string[]
    state?: string
    version?: string
  }) {
    loading.value = true
    try {
      const song = await songsApi.create(data)
      songs.value.push(song)
      return song
    } catch (error) {
      console.error('Failed to create song:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateSong(
    id: string,
    data: Partial<{
      name: string
      description: string
      tags: string[]
      state: string
      version: string
    }>
  ) {
    loading.value = true
    try {
      const song = await songsApi.update(id, data)
      // Update in list
      const index = songs.value.findIndex(s => s.id === id)
      if (index >= 0) {
        songs.value[index] = song
      }
      if (currentSong.value?.id === id) {
        currentSong.value = song
      }
      return song
    } catch (error) {
      console.error('Failed to update song:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteSong(id: string) {
    try {
      await songsApi.delete(id)
      // Remove from list
      songs.value = songs.value.filter(s => s.id !== id)
      if (currentSong.value?.id === id) {
        currentSong.value = null
      }
    } catch (error) {
      console.error('Failed to delete song:', error)
      throw error
    }
  }

  return {
    // State
    songs,
    currentSong,
    loading,
    sortedSongs,
    getSongsByIdea,

    // Actions
    loadSongs,
    loadSongsByIdea,
    loadSong,
    createSong,
    updateSong,
    deleteSong
  }
})
