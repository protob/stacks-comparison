import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { workspaceApi, type Track } from '@/api/damApi'
import type { TreeNode } from '@/types/ui'

export const useWorkspaceStore = defineStore('workspace', () => {
  const tracks = ref<Track[]>([])
  const loading = ref(false)
  const currentPath = ref<string | null>(null)
  const workspaceTree = ref<TreeNode[]>([]) // <-- ADDED: For sidebar tree data
  
  const filteredTracks = computed(() => {
    return tracks.value
  })

  // NEW ACTION to fetch the tree
  async function fetchWorkspaceTree() {
    try {
      const response = await workspaceApi.getTree()
      workspaceTree.value = response.tree
    } catch (error) {
      console.error('Failed to fetch workspace tree:', error)
      workspaceTree.value = [] // Set to empty on error
    }
  }

  async function loadTracksForPath(path: string | string[]) {
    const pathStr = Array.isArray(path) ? path.join('/') : path
    currentPath.value = pathStr

    if (!pathStr) {
      tracks.value = []
      return
    }

    loading.value = true
    try {
      const [source, ...rest] = pathStr.split('/')
      const folderPath = rest.join('/')

      if (source === 'suno') {
        const result = await workspaceApi.listSunoFolder(folderPath)
        tracks.value = result.tracks
      } else if (source === 'udio') {
        const result = await workspaceApi.listUdioPath(folderPath)
        tracks.value = result.tracks
      } else {
        tracks.value = []
      }
    } catch (error) {
      console.error(`Failed to load tracks for path ${pathStr}:`, error)
      tracks.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    tracks,
    loading,
    currentPath,
    workspaceTree, // <-- EXPOSED
    filteredTracks,
    fetchWorkspaceTree, // <-- EXPOSED
    loadTracksForPath,
  }
})