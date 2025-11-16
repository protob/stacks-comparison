<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { useTracksStore } from '@/stores/tracks'
import { useCollectionsStore } from '@/stores/collections'
import { useLibraryStore } from '@/stores/library'
import { storeToRefs } from 'pinia'
import TrackRating from '@/components/track/TrackRating.vue'
import TagInput from '@/components/track/TagInput.vue'
import TrackCommentForm from '@/components/track/TrackCommentForm.vue'
import AssignmentPanel from '@/components/track/AssignmentPanel.vue'
import type { TrackCommentInput } from '@/types'

const uiStore = useUiStore()
const tracksStore = useTracksStore()
const collectionsStore = useCollectionsStore()
const libraryStore = useLibraryStore()

const { isRightSidebarOpen } = storeToRefs(uiStore)
const { currentTrack, currentTrackComment, isLoadingTrack } = storeToRefs(tracksStore)
const { sortedCollections, defaultCollection } = storeToRefs(collectionsStore)

// Local editing state
const editedTitle = ref('')
const editedRating = ref<number | null>(null)
const editedArtistTags = ref<string[]>([])
const editedAlbumTags = ref<string[]>([])
const editedGenreTags = ref<string[]>([])
const editedMoodTags = ref<string[]>([])
const editedTags = ref<string[]>([])
const editedStyleDesc = ref('')

// Watch for track changes and populate local state
watch(currentTrack, (track) => {
  if (track) {
    editedTitle.value = track.title
    editedRating.value = track.rating || null
    editedArtistTags.value = track.artist_tags || []
    editedAlbumTags.value = track.album_tags || []
    editedGenreTags.value = track.genre_tags || []
    editedMoodTags.value = track.mood_tags || []
    editedTags.value = track.tags || []
    editedStyleDesc.value = track.style_desc || ''
  }
}, { immediate: true })

const toggleSidebar = () => {
  uiStore.toggleRightSidebar()
}

const saveMetadata = async () => {
  if (!currentTrack.value) return

  try {
    await tracksStore.updateTrackMetadata(currentTrack.value.id, {
      title: editedTitle.value,
      rating: editedRating.value,
      artist_tags: editedArtistTags.value,
      album_tags: editedAlbumTags.value,
      genre_tags: editedGenreTags.value,
      mood_tags: editedMoodTags.value,
      tags: editedTags.value,
      style_desc: editedStyleDesc.value,
    })
    uiStore.success('Metadata saved successfully')
  } catch (error) {
    console.error('Failed to save metadata:', error)
    uiStore.error('Failed to save metadata')
  }
}

const saveComment = async (comment: TrackCommentInput) => {
  if (!currentTrack.value) return

  try {
    await tracksStore.updateTrackComment(currentTrack.value.id, comment)
    uiStore.success('Comment saved successfully')
  } catch (error) {
    console.error('Failed to save comment:', error)
    uiStore.error('Failed to save comment')
  }
}

// Save everything (metadata + tags + comments if modified)
const saveAll = async () => {
  if (!currentTrack.value) return

  try {
    // Save metadata and tags
    await tracksStore.updateTrackMetadata(currentTrack.value.id, {
      title: editedTitle.value,
      rating: editedRating.value,
      artist_tags: editedArtistTags.value,
      album_tags: editedAlbumTags.value,
      genre_tags: editedGenreTags.value,
      mood_tags: editedMoodTags.value,
      tags: editedTags.value,
      style_desc: editedStyleDesc.value,
    })
    uiStore.success('Saved successfully')
  } catch (error) {
    console.error('Failed to save:', error)
    uiStore.error('Failed to save')
  }
}

const updateRating = async (rating: number) => {
  if (!currentTrack.value) return

  try {
    editedRating.value = rating
    await tracksStore.updateTrackRating(currentTrack.value.id, rating)
    uiStore.success('Rating updated')
  } catch (error) {
    console.error('Failed to update rating:', error)
    uiStore.error('Failed to update rating')
  }
}

// Collection assignment
const selectedCollectionId = ref<string | null>(null)

const addToCollection = async () => {
  if (!currentTrack.value || !selectedCollectionId.value) return

  try {
    await collectionsStore.addTrackToCollection(selectedCollectionId.value, currentTrack.value.id)
    uiStore.success('Added to collection')
  } catch (error) {
    console.error('Failed to add to collection:', error)
    uiStore.error('Failed to add to collection')
  }
}

const handleAssignment = () => {
  // Reload track to show updated assignment
  if (currentTrack.value) {
    tracksStore.fetchTrackById(currentTrack.value.id)
  }
  // Reload library to show updated hierarchy
  libraryStore.loadAllHierarchy()
  uiStore.success('Assignment saved successfully')
}

onMounted(() => {
  collectionsStore.loadCollections()
  // Pre-select default collection if available
  watch(() => collectionsStore.defaultCollection, (defaultColl) => {
    if (defaultColl && !selectedCollectionId.value) {
      selectedCollectionId.value = defaultColl.id
    }
  }, { immediate: true })
})
</script>

<template>
  <aside
    :class="[
      'fixed top-0 right-0 h-full bg-surface border-l border-border transition-transform duration-300 z-30',
      isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full',
      'w-96'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-border">
      <h2 class="text-lg font-semibold text-text-primary">Track Details</h2>
      <button
        @click="toggleSidebar"
        class="p-2 rounded-md hover:bg-background text-text-muted hover:text-text-primary"
        aria-label="Close sidebar"
      >
        <MdiClose class="w-5 h-5" />
      </button>
    </div>

    <!-- Content (leave space for player at bottom) -->
    <div class="h-[calc(100vh-10rem)] overflow-y-auto">
      <!-- Loading state -->
      <div v-if="isLoadingTrack" class="flex items-center justify-center h-full">
        <MdiLoading class="w-8 h-8 animate-spin text-primary" />
      </div>

      <!-- No track selected -->
      <div v-else-if="!currentTrack" class="flex flex-col items-center justify-center h-full p-4 text-center">
        <MdiMusic class="w-16 h-16 mb-4 text-text-muted" />
        <p class="text-text-muted">Select a track to view details</p>
      </div>

      <!-- Track details -->
      <div v-else class="p-4 pb-28 space-y-4">
        <!-- Basic info -->
        <div class="space-y-3">
          <div>
            <label class="block mb-1.5 text-xs font-medium text-text-primary">Title</label>
            <input
              v-model="editedTitle"
              type="text"
              class="w-full px-3 py-1.5 text-sm border rounded-md bg-background border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label class="block mb-1.5 text-xs font-medium text-text-primary">Rating</label>
            <TrackRating :rating="editedRating" @update:rating="updateRating" />
          </div>

          <div v-if="currentTrack.style_desc || editedStyleDesc">
            <label class="block mb-1.5 text-xs font-medium text-text-primary">Style Description</label>
            <textarea
              v-model="editedStyleDesc"
              rows="2"
              class="w-full px-3 py-1.5 text-sm border rounded-md bg-background border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-border"></div>

        <!-- Tags -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-text-primary">Tags</h3>

          <TagInput
            :tags="editedArtistTags"
            label="Artist"
            placeholder="Add artist..."
            @update:tags="editedArtistTags = $event"
          />

          <TagInput
            :tags="editedAlbumTags"
            label="Album"
            placeholder="Add album..."
            @update:tags="editedAlbumTags = $event"
          />

          <TagInput
            :tags="editedGenreTags"
            label="Genre"
            placeholder="Add genre..."
            @update:tags="editedGenreTags = $event"
          />

          <TagInput
            :tags="editedMoodTags"
            label="Mood"
            placeholder="Add mood..."
            @update:tags="editedMoodTags = $event"
          />

          <TagInput
            :tags="editedTags"
            label="General"
            placeholder="Add tag..."
            @update:tags="editedTags = $event"
          />

          <!-- Save button after tags -->
          <button
            @click="saveAll"
            class="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark"
          >
            Save Metadata & Tags
          </button>
        </div>

        <!-- Divider -->
        <div class="border-t border-border"></div>

        <!-- Comments -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-text-primary">Comments</h3>
          <TrackCommentForm
            :comment="currentTrackComment"
            @update:comment="saveComment"
          />
        </div>

        <!-- Divider -->
        <div class="border-t border-border"></div>

        <!-- Assignment Panel -->
        <AssignmentPanel
          :track="currentTrack"
          @assigned="handleAssignment"
        />
      </div>
    </div>
  </aside>

  <!-- Toggle button (when closed) -->
  <button
    v-if="!isRightSidebarOpen"
    @click="toggleSidebar"
    class="fixed z-20 p-2 border rounded-md top-4 right-4 bg-surface border-border hover:bg-background text-text-muted hover:text-text-primary"
    aria-label="Open track details"
  >
    <MdiChevronLeft class="w-5 h-5" />
  </button>
</template>
