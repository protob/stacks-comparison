<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCollectionsStore } from '@/stores/collections'
import { useProjectsStore } from '@/stores/projects'
import { useIdeasStore } from '@/stores/ideas'
import { useSongsStore } from '@/stores/songs'
import { tracksApi, type Track } from '@/api/damApi'
import { storeToRefs } from 'pinia'
import AutocompleteInput from '@/components/common/AutocompleteInput.vue'

const props = defineProps<{
  track: Track | null
}>()

const emit = defineEmits<{
  assigned: []
}>()

const collectionsStore = useCollectionsStore()
const projectsStore = useProjectsStore()
const ideasStore = useIdeasStore()
const songsStore = useSongsStore()

const { sortedCollections } = storeToRefs(collectionsStore)
const { sortedProjects } = storeToRefs(projectsStore)
const { sortedIdeas } = storeToRefs(ideasStore)
const { sortedSongs } = storeToRefs(songsStore)

// Selected IDs for the hierarchy
const selectedCollectionId = ref<string | null>(null)
const selectedProjectId = ref<string | null>(null)
const selectedIdeaId = ref<string | null>(null)
const selectedSongId = ref<string | null>(null)

const isAssigning = ref(false)
const error = ref<string | null>(null)

// Load data on mount and pre-select Default collection
onMounted(async () => {
  try {
    await Promise.all([
      collectionsStore.loadCollections(),
      projectsStore.loadProjects(),
      ideasStore.loadIdeas(),
      songsStore.loadSongs()
    ])

    // Pre-select Default collection if not already selected
    if (!selectedCollectionId.value) {
      const defaultCollection = sortedCollections.value.find(c => c.name === 'Default')
      if (defaultCollection) {
        selectedCollectionId.value = defaultCollection.id
      }
    }
  } catch (err) {
    console.error('Failed to load assignment data:', err)
    error.value = 'Failed to load data'
  }
})

// Filter entities based on hierarchy selection
const filteredProjects = computed(() => {
  if (!selectedCollectionId.value) return sortedProjects.value
  return sortedProjects.value.filter(p => p.collection_id === selectedCollectionId.value)
})

const filteredIdeas = computed(() => {
  if (!selectedProjectId.value) return sortedIdeas.value
  return sortedIdeas.value.filter(i => i.project_id === selectedProjectId.value)
})

const filteredSongs = computed(() => {
  if (!selectedIdeaId.value) return sortedSongs.value
  return sortedSongs.value.filter(s => s.idea_id === selectedIdeaId.value)
})

// Reset child selections when parent changes
watch(selectedCollectionId, () => {
  selectedProjectId.value = null
  selectedIdeaId.value = null
  selectedSongId.value = null
})

watch(selectedProjectId, () => {
  selectedIdeaId.value = null
  selectedSongId.value = null
})

watch(selectedIdeaId, () => {
  selectedSongId.value = null
})

// Load current track's song assignment (but don't clear on save - optimistic updates)
const loadTrackAssignment = async (track: Track | null) => {
  if (!track) {
    return
  }

  if (!track.song_id) {
    // Only clear if we haven't made a selection yet
    if (!selectedSongId.value) {
      // Pre-select Default collection
      const defaultCollection = sortedCollections.value.find(c => c.name === 'Default')
      if (defaultCollection && !selectedCollectionId.value) {
        selectedCollectionId.value = defaultCollection.id
      }
      selectedProjectId.value = null
      selectedIdeaId.value = null
      selectedSongId.value = null
    }
    return
  }

  // Load song and traverse hierarchy upward
  try {
    const song = await songsStore.loadSong(track.song_id)
    if (!song) return

    // Load idea
    const idea = await ideasStore.loadIdea(song.idea_id)
    if (!idea) return

    // Load project
    const project = await projectsStore.loadProject(idea.project_id)
    if (!project) return

    // SET VALUES IN CORRECT ORDER (parent → child) to avoid watchers clearing
    // Load collection if project has one
    if (project.collection_id) {
      selectedCollectionId.value = project.collection_id
    }
    selectedProjectId.value = project.id
    selectedIdeaId.value = idea.id
    selectedSongId.value = song.id
  } catch (err) {
    console.error('Failed to load song hierarchy:', err)
  }
}

watch(() => props.track, loadTrackAssignment, { immediate: true })

// Assign track to selected song
const assignTrack = async () => {
  if (!props.track) return

  // Validate hierarchy
  if (selectedSongId.value && !selectedIdeaId.value) {
    error.value = 'Please select an Idea for the Song'
    return
  }
  if (selectedIdeaId.value && !selectedProjectId.value) {
    error.value = 'Please select a Project for the Idea'
    return
  }

  isAssigning.value = true
  error.value = null

  try {
    await tracksApi.assignToSong(props.track.id, selectedSongId.value)
    emit('assigned')
  } catch (err) {
    console.error('Failed to assign track:', err)
    error.value = 'Failed to assign track'
  } finally {
    isAssigning.value = false
  }
}

// Quick create new entities
const handleCreateCollection = async (name: string) => {
  error.value = null
  try {
    const collection = await collectionsStore.createCollection({ name, state: 'active' })
    selectedCollectionId.value = collection.id
  } catch (err) {
    console.error('Failed to create collection:', err)
    error.value = 'Failed to create collection'
  }
}

const handleCreateProject = async (name: string) => {
  if (!selectedCollectionId.value) {
    error.value = 'Please select a Collection first'
    return
  }

  error.value = null
  try {
    const project = await projectsStore.createProject({
      name,
      collection_id: selectedCollectionId.value,
      state: 'active'
    })
    selectedProjectId.value = project.id
  } catch (err) {
    console.error('Failed to create project:', err)
    error.value = 'Failed to create project'
  }
}

const handleCreateIdea = async (name: string) => {
  if (!selectedProjectId.value) {
    error.value = 'Please select a Project first'
    return
  }

  error.value = null
  try {
    const idea = await ideasStore.createIdea({
      name,
      project_id: selectedProjectId.value,
      state: 'concept'
    })
    selectedIdeaId.value = idea.id
  } catch (err) {
    console.error('Failed to create idea:', err)
    error.value = 'Failed to create idea'
  }
}

const handleCreateSong = async (name: string) => {
  if (!selectedIdeaId.value) {
    error.value = 'Please select an Idea first'
    return
  }

  error.value = null
  try {
    const song = await songsStore.createSong({
      name,
      idea_id: selectedIdeaId.value,
      state: 'draft'
    })
    selectedSongId.value = song.id
  } catch (err) {
    console.error('Failed to create song:', err)
    error.value = 'Failed to create song'
  }
}

// Hierarchy breadcrumb display
const assignmentPath = computed(() => {
  const parts: string[] = []

  if (selectedCollectionId.value) {
    const collection = sortedCollections.value.find(c => c.id === selectedCollectionId.value)
    if (collection) parts.push(collection.name)
  }

  if (selectedProjectId.value) {
    const project = sortedProjects.value.find(p => p.id === selectedProjectId.value)
    if (project) parts.push(project.name)
  }

  if (selectedIdeaId.value) {
    const idea = sortedIdeas.value.find(i => i.id === selectedIdeaId.value)
    if (idea) parts.push(idea.name)
  }

  if (selectedSongId.value) {
    const song = sortedSongs.value.find(s => s.id === selectedSongId.value)
    if (song) parts.push(song.name)
  }

  return parts.join(' > ') || 'Not assigned'
})
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-sm font-semibold text-text-primary">Assignment</h3>

    <!-- Error message -->
    <div v-if="error" class="p-2 text-xs bg-red-900/20 border border-red-500 rounded text-red-400">
      {{ error }}
    </div>

    <!-- Collection -->
    <AutocompleteInput
      v-model="selectedCollectionId"
      :items="sortedCollections"
      label="Collection"
      placeholder="Search collections..."
      :allow-create="true"
      @create="handleCreateCollection"
    />

    <!-- Project -->
    <AutocompleteInput
      v-model="selectedProjectId"
      :items="filteredProjects"
      label="Project"
      placeholder="Search projects..."
      :disabled="!selectedCollectionId"
      :allow-create="true"
      @create="handleCreateProject"
    />

    <!-- Idea -->
    <AutocompleteInput
      v-model="selectedIdeaId"
      :items="filteredIdeas"
      label="Idea"
      placeholder="Search ideas..."
      :disabled="!selectedProjectId"
      :allow-create="true"
      @create="handleCreateIdea"
    />

    <!-- Song -->
    <AutocompleteInput
      v-model="selectedSongId"
      :items="filteredSongs"
      label="Song"
      placeholder="Search songs..."
      :disabled="!selectedIdeaId"
      :allow-create="true"
      @create="handleCreateSong"
    />

    <!-- Assignment path -->
    <div v-if="assignmentPath" class="p-2 text-xs rounded bg-neutral-800 text-text-secondary">
      <strong>Path:</strong> {{ assignmentPath }}
    </div>

    <!-- Assign button -->
    <button
      @click="assignTrack"
      :disabled="isAssigning || !track"
      class="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isAssigning ? 'Assigning...' : 'Save Assignment' }}
    </button>
  </div>
</template>
