import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  collectionsApi,
  projectsApi,
  ideasApi,
  songsApi,
  tracksApi,
  type Collection,
  type Project,
  type Idea,
  type Song,
  type Track
} from '@/api/damApi'

export const useLibraryStore = defineStore('library', () => {
  // State
  const collections = ref<Collection[]>([])
  const projects = ref<Project[]>([])
  const ideas = ref<Idea[]>([])
  const songs = ref<Song[]>([])
  const tracks = ref<Track[]>([])

  const currentCollection = ref<Collection | null>(null)
  const currentProject = ref<Project | null>(null)
  const currentIdea = ref<Idea | null>(null)
  const currentSong = ref<Song | null>(null)

  const loading = ref(false)
  const isEditMode = ref(false)

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

  // Hierarchical tree structure (computed)
  const libraryTree = computed(() => {
    const tree: Record<string, {
      collection: Collection
      projects: Record<string, {
        project: Project
        ideas: Record<string, {
          idea: Idea
          songs: Record<string, {
            song: Song
            tracks: Track[]
          }>
        }>
      }>
    }> = {}

    // Use sorted collections so Default is always first
    sortedCollections.value.forEach(collection => {
      tree[collection.id] = {
        collection,
        projects: {}
      }
    })

    projects.value.forEach(project => {
      if (project.collection_id && tree[project.collection_id]) {
        tree[project.collection_id].projects[project.id] = {
          project,
          ideas: {}
        }
      }
    })

    ideas.value.forEach(idea => {
      // Find the project this idea belongs to
      const project = projects.value.find(p => p.id === idea.project_id)
      if (project && project.collection_id && tree[project.collection_id]?.projects[project.id]) {
        tree[project.collection_id].projects[project.id].ideas[idea.id] = {
          idea,
          songs: {}
        }
      }
    })

    songs.value.forEach(song => {
      // Find the idea this song belongs to
      const idea = ideas.value.find(i => i.id === song.idea_id)
      if (idea) {
        const project = projects.value.find(p => p.id === idea.project_id)
        if (project && project.collection_id) {
          const projectNode = tree[project.collection_id]?.projects[project.id]
          if (projectNode?.ideas[idea.id]) {
            projectNode.ideas[idea.id].songs[song.id] = {
              song,
              tracks: []
            }
          }
        }
      }
    })

    // Add tracks to songs
    tracks.value.forEach(track => {
      if (track.song_id) {
        const song = songs.value.find(s => s.id === track.song_id)
        if (song) {
          const idea = ideas.value.find(i => i.id === song.idea_id)
          if (idea) {
            const project = projects.value.find(p => p.id === idea.project_id)
            if (project && project.collection_id) {
              const songNode = tree[project.collection_id]?.projects[project.id]?.ideas[idea.id]?.songs[song.id]
              if (songNode) {
                songNode.tracks.push(track)
              }
            }
          }
        }
      }
    })

    return tree
  })

  // Load all hierarchy data
  async function loadAllHierarchy() {
    loading.value = true
    try {
      const [collectionsData, projectsData, ideasData, songsData, tracksData] = await Promise.all([
        collectionsApi.list(),
        projectsApi.list(),
        ideasApi.list(),
        songsApi.list(),
        tracksApi.list()
      ])

      collections.value = collectionsData
      projects.value = projectsData
      ideas.value = ideasData
      songs.value = songsData
      tracks.value = tracksData
    } catch (error) {
      console.error('Failed to load library hierarchy:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Collections
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
      // Load projects for this collection
      const projectsData = await projectsApi.listByCollection(id)
      projects.value = projectsData
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

  // Projects
  async function loadProjectsByCollection(collectionId: string) {
    loading.value = true
    try {
      const projectsData = await projectsApi.listByCollection(collectionId)
      projects.value = projectsData
    } catch (error) {
      console.error('Failed to load projects:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadProject(id: string) {
    loading.value = true
    try {
      currentProject.value = await projectsApi.get(id)
      // Load ideas for this project
      const ideasData = await ideasApi.listByProject(id)
      ideas.value = ideasData
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

  // Ideas
  async function loadIdeasByProject(projectId: string) {
    loading.value = true
    try {
      const ideasData = await ideasApi.listByProject(projectId)
      ideas.value = ideasData
    } catch (error) {
      console.error('Failed to load ideas:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadIdea(id: string) {
    loading.value = true
    try {
      currentIdea.value = await ideasApi.get(id)
      // Load songs for this idea
      const songsData = await songsApi.listByIdea(id)
      songs.value = songsData
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

  // Songs
  async function loadSongsByIdea(ideaId: string) {
    loading.value = true
    try {
      const songsData = await songsApi.listByIdea(ideaId)
      songs.value = songsData
    } catch (error) {
      console.error('Failed to load songs:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadSong(id: string) {
    loading.value = true
    try {
      currentSong.value = await songsApi.get(id)
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

  return {
    // State
    collections,
    projects,
    ideas,
    songs,
    currentCollection,
    currentProject,
    currentIdea,
    currentSong,
    loading,
    isEditMode,
    libraryTree,
    sortedCollections,
    defaultCollection,

    // Actions
    loadAllHierarchy,
    loadCollections,
    loadCollection,
    createCollection,
    loadProjectsByCollection,
    loadProject,
    createProject,
    loadIdeasByProject,
    loadIdea,
    createIdea,
    loadSongsByIdea,
    loadSong,
    createSong
  }
})
