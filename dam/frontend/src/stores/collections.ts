import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collectionsApi, type Collection, type Track } from '@/api/damApi'

export const useCollectionsStore = defineStore('collections', () => {
  // State
  const collections = ref<Collection[]>([])
  const currentCollection = ref<Collection | null>(null)
  const currentCollectionTracks = ref<Track[]>([])
  const loading = ref(false)

  // Get default collection (always present, name = "Default")
  const defaultCollection = computed(() => {
    return collections.value.find(c => c.name === 'Default') || null
  })

  // Sorted collections with Default always first
  const sortedCollections = computed(() => {
    const sorted = [...collections.value]
    sorted.sort((a, b) => {
      // Default always first
      if (a.name === 'Default') return -1
      if (b.name === 'Default') return 1
      // Then alphabetically
      return a.name.localeCompare(b.name)
    })
    return sorted
  })

  // Actions
  async function loadCollections() {
    loading.value = true
    try {
      collections.value = await collectionsApi.list()
    } catch (error) {
      console.error('Failed to load collections:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadCollection(id: string) {
    loading.value = true
    try {
      currentCollection.value = await collectionsApi.get(id)
      currentCollectionTracks.value = await collectionsApi.getTracks(id)
    } catch (error) {
      console.error('Failed to load collection:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createCollection(data: {
    name: string
    description?: string
    tags?: string[]
  }) {
    loading.value = true
    try {
      const collection = await collectionsApi.create(data)
      collections.value.push(collection)
      return collection
    } catch (error) {
      console.error('Failed to create collection:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function addTrackToCollection(collectionId: string, trackId: string) {
    try {
      await collectionsApi.addTrack(collectionId, trackId)
      // Reload if this is the current collection
      if (currentCollection.value?.id === collectionId) {
        await loadCollection(collectionId)
      }
    } catch (error) {
      console.error('Failed to add track to collection:', error)
      throw error
    }
  }

  async function removeTrackFromCollection(collectionId: string, trackId: string) {
    try {
      await collectionsApi.removeTrack(collectionId, trackId)
      // Reload if this is the current collection
      if (currentCollection.value?.id === collectionId) {
        await loadCollection(collectionId)
      }
    } catch (error) {
      console.error('Failed to remove track from collection:', error)
      throw error
    }
  }

  return {
    // State
    collections,
    currentCollection,
    currentCollectionTracks,
    loading,
    sortedCollections,
    defaultCollection,

    // Actions
    loadCollections,
    loadCollection,
    createCollection,
    addTrackToCollection,
    removeTrackFromCollection
  }
})