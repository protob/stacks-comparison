import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { projectsApi, type Project } from '@/api/damApi'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const loading = ref(false)

  // Sorted projects alphabetically
  const sortedProjects = computed(() => {
    const sorted = [...projects.value]
    sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  })

  // Filter projects by collection
  const getProjectsByCollection = computed(() => {
    return (collectionId: string | null) => {
      if (!collectionId) return []
      return projects.value.filter(p => p.collection_id === collectionId)
    }
  })

  // Actions
  async function loadProjects() {
    loading.value = true
    try {
      projects.value = await projectsApi.list()
    } catch (error) {
      console.error('Failed to load projects:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadProjectsByCollection(collectionId: string) {
    loading.value = true
    try {
      const filteredProjects = await projectsApi.listByCollection(collectionId)
      // Merge with existing projects (avoid duplicates)
      const existingIds = new Set(projects.value.map(p => p.id))
      const newProjects = filteredProjects.filter(p => !existingIds.has(p.id))
      projects.value = [...projects.value, ...newProjects]
    } catch (error) {
      console.error('Failed to load projects by collection:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadProject(id: string) {
    loading.value = true
    try {
      currentProject.value = await projectsApi.get(id)
      // Update in list if exists
      const index = projects.value.findIndex(p => p.id === id)
      if (index >= 0) {
        projects.value[index] = currentProject.value
      } else {
        projects.value.push(currentProject.value)
      }
      return currentProject.value
    } catch (error) {
      console.error('Failed to load project:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createProject(data: {
    name: string
    collection_id: string
    description?: string
    tags?: string[]
    state?: string
    mood?: string
  }) {
    loading.value = true
    try {
      const project = await projectsApi.create(data)
      projects.value.push(project)
      return project
    } catch (error) {
      console.error('Failed to create project:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateProject(
    id: string,
    data: Partial<{
      name: string
      description: string
      collection_id: string
      tags: string[]
      state: string
      mood: string
    }>
  ) {
    loading.value = true
    try {
      const project = await projectsApi.update(id, data)
      // Update in list
      const index = projects.value.findIndex(p => p.id === id)
      if (index >= 0) {
        projects.value[index] = project
      }
      if (currentProject.value?.id === id) {
        currentProject.value = project
      }
      return project
    } catch (error) {
      console.error('Failed to update project:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteProject(id: string) {
    try {
      await projectsApi.delete(id)
      // Remove from list
      projects.value = projects.value.filter(p => p.id !== id)
      if (currentProject.value?.id === id) {
        currentProject.value = null
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      throw error
    }
  }

  return {
    // State
    projects,
    currentProject,
    loading,
    sortedProjects,
    getProjectsByCollection,

    // Actions
    loadProjects,
    loadProjectsByCollection,
    loadProject,
    createProject,
    updateProject,
    deleteProject
  }
})
