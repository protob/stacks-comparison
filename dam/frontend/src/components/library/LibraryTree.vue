<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { useConfirmDialogStore } from '@/stores/confirmDialog'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import MdiChevronRight from '~icons/mdi/chevron-right'
import MdiChevronDown from '~icons/mdi/chevron-down'
import MdiFolder from '~icons/mdi/folder'
import MdiPlus from '~icons/mdi/plus'
import MdiLightbulbOutline from '~icons/mdi/lightbulb-outline'
import MdiMusicNote from '~icons/mdi/music-note'
import MdiPencil from '~icons/mdi/pencil'
import MdiDelete from '~icons/mdi/delete'
import { collectionsApi, projectsApi, ideasApi, songsApi } from '@/api/damApi'

const emit = defineEmits<{
  'add-collection': []
  'add-project': [collectionId: string]
  'add-idea': [projectId: string]
  'add-song': [ideaId: string]
}>()

const libraryStore = useLibraryStore()
const confirmDialogStore = useConfirmDialogStore()
const router = useRouter()
const route = useRoute()

const { libraryTree, defaultCollection, loading, isEditMode } = storeToRefs(libraryStore)

// Track expanded state - expand Default collection by default
const expandedCollections = ref<Record<string, boolean>>({})
const expandedProjects = ref<Record<string, boolean>>({})
const expandedIdeas = ref<Record<string, boolean>>({})

// Track editing state (which item is being renamed)
const editingCollectionId = ref<string | null>(null)
const editingProjectId = ref<string | null>(null)
const editingIdeaId = ref<string | null>(null)
const editingSongId = ref<string | null>(null)

const editingName = ref('')

onMounted(async () => {
  await libraryStore.loadAllHierarchy()

  // Auto-expand Default collection
  if (defaultCollection.value) {
    expandedCollections.value[defaultCollection.value.id] = true
  }
})

const toggleCollection = (collectionId: string) => {
  expandedCollections.value[collectionId] = !expandedCollections.value[collectionId]
}

const toggleProject = (projectId: string) => {
  expandedProjects.value[projectId] = !expandedProjects.value[projectId]
}

const toggleIdea = (ideaId: string) => {
  expandedIdeas.value[ideaId] = !expandedIdeas.value[ideaId]
}

const navigateToCollection = (collectionId: string) => {
  router.push(`/library/collections/${collectionId}`)
}

const navigateToProject = (projectId: string) => {
  router.push(`/library/projects/${projectId}`)
}

const navigateToIdea = (ideaId: string) => {
  router.push(`/library/ideas/${ideaId}`)
}

const navigateToSong = (songId: string) => {
  router.push(`/library/songs/${songId}`)
}

// Count helpers
const countProjects = (collectionId: string) => {
  return Object.keys(libraryTree.value[collectionId]?.projects || {}).length
}

const countIdeas = (collectionId: string, projectId: string) => {
  return Object.keys(libraryTree.value[collectionId]?.projects[projectId]?.ideas || {}).length
}

const countSongs = (collectionId: string, projectId: string, ideaId: string) => {
  return Object.keys(libraryTree.value[collectionId]?.projects[projectId]?.ideas[ideaId]?.songs || {}).length
}

const countTracks = (collectionId: string, projectId: string, ideaId: string, songId: string) => {
  return libraryTree.value[collectionId]?.projects[projectId]?.ideas[ideaId]?.songs[songId]?.tracks.length || 0
}

// Check if collection is the default collection
const isDefaultCollection = (collectionId: string) => {
  return defaultCollection.value?.id === collectionId
}

// Edit/Rename functions
const startEditingCollection = (collectionId: string, currentName: string) => {
  if (isDefaultCollection(collectionId)) return // Protect Default collection
  editingCollectionId.value = collectionId
  editingName.value = currentName
}

const startEditingProject = (projectId: string, currentName: string) => {
  editingProjectId.value = projectId
  editingName.value = currentName
}

const startEditingIdea = (ideaId: string, currentName: string) => {
  editingIdeaId.value = ideaId
  editingName.value = currentName
}

const startEditingSong = (songId: string, currentName: string) => {
  editingSongId.value = songId
  editingName.value = currentName
}

const cancelEditing = () => {
  editingCollectionId.value = null
  editingProjectId.value = null
  editingIdeaId.value = null
  editingSongId.value = null
  editingName.value = ''
}

const saveCollectionName = async (collectionId: string) => {
  if (!editingName.value.trim()) return
  try {
    await collectionsApi.update(collectionId, { name: editingName.value.trim() })
    await libraryStore.loadAllHierarchy()
    cancelEditing()
  } catch (error) {
    console.error('Failed to rename collection:', error)
    alert('Failed to rename collection')
  }
}

const saveProjectName = async (projectId: string) => {
  if (!editingName.value.trim()) return
  try {
    await projectsApi.update(projectId, { name: editingName.value.trim() })
    await libraryStore.loadAllHierarchy()
    cancelEditing()
  } catch (error) {
    console.error('Failed to rename project:', error)
    alert('Failed to rename project')
  }
}

const saveIdeaName = async (ideaId: string) => {
  if (!editingName.value.trim()) return
  try {
    await ideasApi.update(ideaId, { name: editingName.value.trim() })
    await libraryStore.loadAllHierarchy()
    cancelEditing()
  } catch (error) {
    console.error('Failed to rename idea:', error)
    alert('Failed to rename idea')
  }
}

const saveSongName = async (songId: string) => {
  if (!editingName.value.trim()) return
  try {
    await songsApi.update(songId, { name: editingName.value.trim() })
    await libraryStore.loadAllHierarchy()
    cancelEditing()
  } catch (error) {
    console.error('Failed to rename song:', error)
    alert('Failed to rename song')
  }
}

// Delete functions
const deleteCollection = async (collectionId: string, collectionName: string) => {
  if (isDefaultCollection(collectionId)) {
    await confirmDialogStore.confirm({
      title: 'Cannot Delete Default Collection',
      message: 'The Default collection cannot be deleted as it is required for the system to function properly.',
      confirmText: 'OK',
      danger: false
    })
    return
  }

  const projectCount = countProjects(collectionId)
  const confirmed = await confirmDialogStore.confirm({
    title: 'Delete Collection',
    message: `Delete "${collectionName}" and all its contents?\n\nThis will unassign all tracks in this collection (tracks remain in workspace).\n\n${projectCount} project(s) will be deleted.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true
  })

  if (!confirmed) return

  try {
    await collectionsApi.delete(collectionId)
    await libraryStore.loadAllHierarchy()
    // Navigate away if we're viewing this collection
    if (route.path.includes(`/collections/${collectionId}`)) {
      router.push('/library')
    }
  } catch (error) {
    console.error('Failed to delete collection:', error)
    await confirmDialogStore.confirm({
      title: 'Delete Failed',
      message: 'Failed to delete collection. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  }
}

const deleteProject = async (projectId: string, projectName: string, collectionId: string) => {
  const ideaCount = countIdeas(collectionId, projectId)
  const confirmed = await confirmDialogStore.confirm({
    title: 'Delete Project',
    message: `Delete "${projectName}" and all its contents?\n\nThis will unassign all tracks in this project (tracks remain in workspace).\n\n${ideaCount} idea(s) will be deleted.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true
  })

  if (!confirmed) return

  try {
    await projectsApi.delete(projectId)
    await libraryStore.loadAllHierarchy()
    if (route.path.includes(`/projects/${projectId}`)) {
      router.push('/library')
    }
  } catch (error) {
    console.error('Failed to delete project:', error)
    await confirmDialogStore.confirm({
      title: 'Delete Failed',
      message: 'Failed to delete project. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  }
}

const deleteIdea = async (ideaId: string, ideaName: string, collectionId: string, projectId: string) => {
  const songCount = countSongs(collectionId, projectId, ideaId)
  const confirmed = await confirmDialogStore.confirm({
    title: 'Delete Idea',
    message: `Delete "${ideaName}" and all its contents?\n\nThis will unassign all tracks in this idea (tracks remain in workspace).\n\n${songCount} song(s) will be deleted.`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true
  })

  if (!confirmed) return

  try {
    await ideasApi.delete(ideaId)
    await libraryStore.loadAllHierarchy()
    if (route.path.includes(`/ideas/${ideaId}`)) {
      router.push('/library')
    }
  } catch (error) {
    console.error('Failed to delete idea:', error)
    await confirmDialogStore.confirm({
      title: 'Delete Failed',
      message: 'Failed to delete idea. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  }
}

const deleteSong = async (songId: string, songName: string, collectionId: string, projectId: string, ideaId: string) => {
  const trackCount = countTracks(collectionId, projectId, ideaId, songId)
  const confirmed = await confirmDialogStore.confirm({
    title: 'Delete Song',
    message: `Delete "${songName}"?\n\nThis will unassign ${trackCount} track(s) (tracks remain in workspace).`,
    confirmText: 'Delete',
    cancelText: 'Cancel',
    danger: true
  })

  if (!confirmed) return

  try {
    await songsApi.delete(songId)
    await libraryStore.loadAllHierarchy()
    if (route.path.includes(`/songs/${songId}`)) {
      router.push('/library')
    }
  } catch (error) {
    console.error('Failed to delete song:', error)
    await confirmDialogStore.confirm({
      title: 'Delete Failed',
      message: 'Failed to delete song. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  }
}
</script>

<template>
  <div class="library-tree">
    <!-- Edit Mode Toggle -->
    <div class="px-2 mb-2">
      <button
        @click="isEditMode = !isEditMode"
        :class="[
          'w-full flex items-center justify-center gap-2 px-2 py-1.5 text-xs font-medium rounded-md transition-colors mb-2',
          isEditMode
            ? 'bg-primary text-text-inverse'
            : 'bg-surface hover:bg-surface-hover text-text-primary border border-border'
        ]"
      >
        <MdiPencil class="w-3.5 h-3.5" />
        <span>{{ isEditMode ? 'Done Editing' : 'Edit Library' }}</span>
      </button>

      <!-- Add Collection Button -->
      <button
        @click="emit('add-collection')"
        class="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20"
      >
        <MdiPlus class="w-3.5 h-3.5" />
        <span>New Collection</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading && Object.keys(libraryTree).length === 0" class="px-2 py-4 text-center">
      <div class="text-xs text-text-muted">Loading collections...</div>
    </div>

    <!-- Collections Tree -->
    <div v-else class="px-2 space-y-0.5">
      <div v-for="(collectionNode, collectionId) in libraryTree" :key="collectionId">
        <!-- Collection -->
        <div class="flex items-center gap-1 group">
          <!-- Expand/Collapse -->
          <button
            @click="toggleCollection(collectionId as string)"
            class="p-0.5 hover:bg-surface-hover rounded"
          >
            <MdiChevronRight
              v-if="!expandedCollections[collectionId as string]"
              class="w-3.5 h-3.5 text-text-muted"
            />
            <MdiChevronDown
              v-else
              class="w-3.5 h-3.5 text-text-muted"
            />
          </button>

          <!-- Collection Name (Editing) -->
          <div v-if="editingCollectionId === collectionId" class="flex-1 flex items-center gap-1">
            <input
              v-model="editingName"
              @keyup.enter="saveCollectionName(collectionId as string)"
              @keyup.escape="cancelEditing"
              class="flex-1 px-2 py-1 text-xs border rounded bg-background border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              autofocus
            />
            <button
              @click="saveCollectionName(collectionId as string)"
              class="p-1 text-xs text-green-400 hover:bg-green-500/20 rounded"
              title="Save"
            >
              ✓
            </button>
            <button
              @click="cancelEditing"
              class="p-1 text-xs text-red-400 hover:bg-red-500/20 rounded"
              title="Cancel"
            >
              ✕
            </button>
          </div>

          <!-- Collection Name (Normal) -->
          <button
            v-else
            @click="navigateToCollection(collectionId as string)"
            class="flex-1 flex items-center gap-1.5 px-1.5 py-1 text-xs rounded hover:bg-surface-hover text-left"
            :class="{ 'bg-primary/10 text-primary': route.path === `/library/collections/${collectionId}` }"
          >
            <MdiFolder class="w-3.5 h-3.5" />
            <span class="font-medium truncate">{{ collectionNode.collection.name }}</span>
            <span
              v-if="isDefaultCollection(collectionId as string)"
              class="px-1.5 py-0.5 text-xs rounded bg-blue-500/10 text-blue-400"
            >
              default
            </span>
            <span class="ml-auto text-xs text-text-muted">{{ countProjects(collectionId as string) }}</span>
          </button>

          <!-- Edit/Delete Buttons (Edit Mode) -->
          <div v-if="isEditMode && !editingCollectionId" class="flex items-center gap-0.5">
            <button
              v-if="!isDefaultCollection(collectionId as string)"
              @click.stop="startEditingCollection(collectionId as string, collectionNode.collection.name)"
              class="p-0.5 hover:bg-primary/10 text-text-muted hover:text-primary rounded"
              title="Rename"
            >
              <MdiPencil class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="!isDefaultCollection(collectionId as string)"
              @click.stop="deleteCollection(collectionId as string, collectionNode.collection.name)"
              class="p-0.5 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded"
              title="Delete"
            >
              <MdiDelete class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Add Project Button (Normal Mode) -->
          <button
            v-if="!isEditMode"
            @click.stop="emit('add-project', collectionId as string)"
            class="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded"
          >
            <MdiPlus class="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

        <!-- Projects (when expanded) -->
        <div v-if="expandedCollections[collectionId as string]" class="ml-4 mt-0.5 space-y-0.5">
          <div v-for="(projectNode, projectId) in collectionNode.projects" :key="projectId">
            <!-- Project -->
            <div class="flex items-center gap-1 group">
              <!-- Expand/Collapse -->
              <button
                @click="toggleProject(projectId as string)"
                class="p-0.5 hover:bg-surface-hover rounded"
              >
                <MdiChevronRight
                  v-if="!expandedProjects[projectId as string]"
                  class="w-3.5 h-3.5 text-text-muted"
                />
                <MdiChevronDown
                  v-else
                  class="w-3.5 h-3.5 text-text-muted"
                />
              </button>

              <!-- Project Name (Editing) -->
              <div v-if="editingProjectId === projectId" class="flex-1 flex items-center gap-1">
                <input
                  v-model="editingName"
                  @keyup.enter="saveProjectName(projectId as string)"
                  @keyup.escape="cancelEditing"
                  class="flex-1 px-2 py-1 text-xs border rounded bg-background border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  autofocus
                />
                <button @click="saveProjectName(projectId as string)" class="p-1 text-xs text-green-400 hover:bg-green-500/20 rounded" title="Save">✓</button>
                <button @click="cancelEditing" class="p-1 text-xs text-red-400 hover:bg-red-500/20 rounded" title="Cancel">✕</button>
              </div>

              <!-- Project Name (Normal) -->
              <button
                v-else
                @click="navigateToProject(projectId as string)"
                class="flex-1 flex items-center gap-1.5 px-1.5 py-1 text-xs rounded hover:bg-surface-hover text-left"
                :class="{ 'bg-primary/10 text-primary': route.path === `/library/projects/${projectId}` }"
              >
                <MdiFolder class="w-3.5 h-3.5" />
                <span class="truncate">{{ projectNode.project.name }}</span>
                <span class="ml-auto text-xs text-text-muted">{{ countIdeas(collectionId as string, projectId as string) }}</span>
              </button>

              <!-- Edit/Delete Buttons (Edit Mode) -->
              <div v-if="isEditMode && !editingProjectId" class="flex items-center gap-0.5">
                <button @click.stop="startEditingProject(projectId as string, projectNode.project.name)" class="p-0.5 hover:bg-primary/10 text-text-muted hover:text-primary rounded" title="Rename">
                  <MdiPencil class="w-3.5 h-3.5" />
                </button>
                <button @click.stop="deleteProject(projectId as string, projectNode.project.name, collectionId as string)" class="p-0.5 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded" title="Delete">
                  <MdiDelete class="w-3.5 h-3.5" />
                </button>
              </div>

              <!-- Add Idea Button (Normal Mode) -->
              <button
                v-if="!isEditMode"
                @click.stop="emit('add-idea', projectId as string)"
                class="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded"
              >
                <MdiPlus class="w-3.5 h-3.5 text-primary" />
              </button>
            </div>

            <!-- Ideas (when expanded) -->
            <div v-if="expandedProjects[projectId as string]" class="ml-4 mt-0.5 space-y-0.5">
              <div v-for="(ideaNode, ideaId) in projectNode.ideas" :key="ideaId">
                <!-- Idea -->
                <div class="flex items-center gap-1 group">
                  <!-- Expand/Collapse -->
                  <button
                    @click="toggleIdea(ideaId as string)"
                    class="p-0.5 hover:bg-surface-hover rounded"
                  >
                    <MdiChevronRight
                      v-if="!expandedIdeas[ideaId as string]"
                      class="w-3.5 h-3.5 text-text-muted"
                    />
                    <MdiChevronDown
                      v-else
                      class="w-3.5 h-3.5 text-text-muted"
                    />
                  </button>

                  <!-- Idea Name (Editing) -->
                  <div v-if="editingIdeaId === ideaId" class="flex-1 flex items-center gap-1">
                    <input
                      v-model="editingName"
                      @keyup.enter="saveIdeaName(ideaId as string)"
                      @keyup.escape="cancelEditing"
                      class="flex-1 px-2 py-1 text-xs border rounded bg-background border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      autofocus
                    />
                    <button @click="saveIdeaName(ideaId as string)" class="p-1 text-xs text-green-400 hover:bg-green-500/20 rounded" title="Save">✓</button>
                    <button @click="cancelEditing" class="p-1 text-xs text-red-400 hover:bg-red-500/20 rounded" title="Cancel">✕</button>
                  </div>

                  <!-- Idea Name (Normal) -->
                  <button
                    v-else
                    @click="navigateToIdea(ideaId as string)"
                    class="flex-1 flex items-center gap-1.5 px-1.5 py-1 text-xs rounded hover:bg-surface-hover text-left"
                    :class="{ 'bg-primary/10 text-primary': route.path === `/library/ideas/${ideaId}` }"
                  >
                    <MdiLightbulbOutline class="w-3.5 h-3.5" />
                    <span class="truncate">{{ ideaNode.idea.name }}</span>
                    <span class="ml-auto text-xs text-text-muted">{{ countSongs(collectionId as string, projectId as string, ideaId as string) }}</span>
                  </button>

                  <!-- Edit/Delete Buttons (Edit Mode) -->
                  <div v-if="isEditMode && !editingIdeaId" class="flex items-center gap-0.5">
                    <button @click.stop="startEditingIdea(ideaId as string, ideaNode.idea.name)" class="p-0.5 hover:bg-primary/10 text-text-muted hover:text-primary rounded" title="Rename">
                      <MdiPencil class="w-3.5 h-3.5" />
                    </button>
                    <button @click.stop="deleteIdea(ideaId as string, ideaNode.idea.name, collectionId as string, projectId as string)" class="p-0.5 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded" title="Delete">
                      <MdiDelete class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <!-- Add Song Button (Normal Mode) -->
                  <button
                    v-if="!isEditMode"
                    @click.stop="emit('add-song', ideaId as string)"
                    class="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-primary/10 rounded"
                  >
                    <MdiPlus class="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>

                <!-- Songs (when expanded) -->
                <div v-if="expandedIdeas[ideaId as string]" class="ml-4 mt-0.5 space-y-0.5">
                  <div v-for="(songNode, songId) in ideaNode.songs" :key="songId" class="flex items-center gap-1 group">
                    <!-- Song Name (Editing) -->
                    <div v-if="editingSongId === songId" class="flex-1 flex items-center gap-1">
                      <input
                        v-model="editingName"
                        @keyup.enter="saveSongName(songId as string)"
                        @keyup.escape="cancelEditing"
                        class="flex-1 px-2 py-1 text-xs border rounded bg-background border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        autofocus
                      />
                      <button @click="saveSongName(songId as string)" class="p-1 text-xs text-green-400 hover:bg-green-500/20 rounded" title="Save">✓</button>
                      <button @click="cancelEditing" class="p-1 text-xs text-red-400 hover:bg-red-500/20 rounded" title="Cancel">✕</button>
                    </div>

                    <!-- Song Name (Normal) -->
                    <button
                      v-else
                      @click="navigateToSong(songId as string)"
                      class="flex-1 flex items-center gap-1.5 px-1.5 py-1 text-xs rounded hover:bg-surface-hover text-left"
                      :class="{ 'bg-primary/10 text-primary': route.path === `/library/songs/${songId}` }"
                    >
                      <MdiMusicNote class="w-3.5 h-3.5" />
                      <span class="truncate">{{ songNode.song.name }}</span>
                      <span class="ml-auto text-xs text-text-muted">{{ countTracks(collectionId as string, projectId as string, ideaId as string, songId as string) }}</span>
                    </button>

                    <!-- Edit/Delete Buttons (Edit Mode) -->
                    <div v-if="isEditMode && !editingSongId" class="flex items-center gap-0.5">
                      <button @click.stop="startEditingSong(songId as string, songNode.song.name)" class="p-0.5 hover:bg-primary/10 text-text-muted hover:text-primary rounded" title="Rename">
                        <MdiPencil class="w-3.5 h-3.5" />
                      </button>
                      <button @click.stop="deleteSong(songId as string, songNode.song.name, collectionId as string, projectId as string, ideaId as string)" class="p-0.5 hover:bg-red-500/10 text-text-muted hover:text-red-400 rounded" title="Delete">
                        <MdiDelete class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.library-tree {
  font-size: 0.875rem;
}
</style>
