import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ideasApi, type Idea } from '@/api/damApi'

export const useIdeasStore = defineStore('ideas', () => {
  // State
  const ideas = ref<Idea[]>([])
  const currentIdea = ref<Idea | null>(null)
  const loading = ref(false)

  // Sorted ideas alphabetically
  const sortedIdeas = computed(() => {
    const sorted = [...ideas.value]
    sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  })

  // Filter ideas by project
  const getIdeasByProject = computed(() => {
    return (projectId: string | null) => {
      if (!projectId) return []
      return ideas.value.filter(i => i.project_id === projectId)
    }
  })

  // Actions
  async function loadIdeas() {
    loading.value = true
    try {
      ideas.value = await ideasApi.list()
    } catch (error) {
      console.error('Failed to load ideas:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadIdeasByProject(projectId: string) {
    loading.value = true
    try {
      const filteredIdeas = await ideasApi.listByProject(projectId)
      // Merge with existing ideas (avoid duplicates)
      const existingIds = new Set(ideas.value.map(i => i.id))
      const newIdeas = filteredIdeas.filter(i => !existingIds.has(i.id))
      ideas.value = [...ideas.value, ...newIdeas]
    } catch (error) {
      console.error('Failed to load ideas by project:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadIdea(id: string) {
    loading.value = true
    try {
      currentIdea.value = await ideasApi.get(id)
      // Update in list if exists
      const index = ideas.value.findIndex(i => i.id === id)
      if (index >= 0) {
        ideas.value[index] = currentIdea.value
      } else {
        ideas.value.push(currentIdea.value)
      }
      return currentIdea.value
    } catch (error) {
      console.error('Failed to load idea:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createIdea(data: {
    name: string
    project_id: string
    description?: string
    tags?: string[]
    state?: string
    reference_notes?: string
  }) {
    loading.value = true
    try {
      const idea = await ideasApi.create(data)
      ideas.value.push(idea)
      return idea
    } catch (error) {
      console.error('Failed to create idea:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateIdea(
    id: string,
    data: Partial<{
      name: string
      description: string
      tags: string[]
      state: string
      reference_notes: string
    }>
  ) {
    loading.value = true
    try {
      const idea = await ideasApi.update(id, data)
      // Update in list
      const index = ideas.value.findIndex(i => i.id === id)
      if (index >= 0) {
        ideas.value[index] = idea
      }
      if (currentIdea.value?.id === id) {
        currentIdea.value = idea
      }
      return idea
    } catch (error) {
      console.error('Failed to update idea:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteIdea(id: string) {
    try {
      await ideasApi.delete(id)
      // Remove from list
      ideas.value = ideas.value.filter(i => i.id !== id)
      if (currentIdea.value?.id === id) {
        currentIdea.value = null
      }
    } catch (error) {
      console.error('Failed to delete idea:', error)
      throw error
    }
  }

  return {
    // State
    ideas,
    currentIdea,
    loading,
    sortedIdeas,
    getIdeasByProject,

    // Actions
    loadIdeas,
    loadIdeasByProject,
    loadIdea,
    createIdea,
    updateIdea,
    deleteIdea
  }
})
