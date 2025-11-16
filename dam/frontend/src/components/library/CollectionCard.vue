<script setup lang="ts">
import { computed } from 'vue'
import type { Collection } from '@/types/dam-api'
import { useLibraryStore } from '@/stores/library'
import { storeToRefs } from 'pinia'
import MdiFolder from '~icons/mdi/folder'
import MdiMusicNote from '~icons/mdi/music-note'

const props = defineProps<{
  collection: Collection
}>()

const libraryStore = useLibraryStore()
const { libraryTree } = storeToRefs(libraryStore)

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Check if this is the default collection
const isDefault = computed(() => props.collection.name === 'Default')

// Count tracks (versions) in this collection
const songCount = computed(() => {
  const collectionNode = libraryTree.value[props.collection.id]
  if (!collectionNode) return 0

  let count = 0
  Object.values(collectionNode.projects).forEach(projectNode => {
    Object.values(projectNode.ideas).forEach(ideaNode => {
      Object.values(ideaNode.songs).forEach(songNode => {
        count += songNode.tracks.length
      })
    })
  })
  return count
})
</script>

<template>
  <div
    class="group relative p-3 border rounded-lg border-border bg-surface hover:bg-surface-hover hover:border-primary/50 transition-all cursor-pointer"
  >
    <!-- Icon -->
    <div class="flex items-start justify-between mb-2">
      <div class="p-2 rounded-md bg-primary/10">
        <MdiFolder class="w-5 h-5 text-primary" />
      </div>
      <div class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-background text-xs text-text-muted">
        <MdiMusicNote class="w-3 h-3" />
        <span>{{ songCount }}</span>
      </div>
    </div>

    <!-- Name -->
    <div class="flex items-center gap-2 mb-1">
      <h3 class="text-sm font-semibold text-text-primary truncate">
        {{ collection.name }}
      </h3>
      <span
        v-if="isDefault"
        class="px-1.5 py-0.5 text-xs rounded bg-blue-500/10 text-blue-400 flex-shrink-0"
      >
        default
      </span>
    </div>

    <!-- Description -->
    <p v-if="collection.description" class="text-xs text-text-muted line-clamp-2 mb-2">
      {{ collection.description }}
    </p>

    <!-- Tags -->
    <div v-if="collection.tags && collection.tags.length > 0" class="flex flex-wrap gap-1 mb-2">
      <span
        v-for="(tag, index) in collection.tags.slice(0, 3)"
        :key="index"
        class="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary"
      >
        {{ tag }}
      </span>
      <span
        v-if="collection.tags.length > 3"
        class="px-1.5 py-0.5 text-xs rounded bg-background text-text-muted"
      >
        +{{ collection.tags.length - 3 }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border">
      <span>{{ formatDate(collection.created_at) }}</span>
      <span
        :class="[
          'px-1.5 py-0.5 rounded text-xs',
          collection.state === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
        ]"
      >
        {{ collection.state }}
      </span>
    </div>
  </div>
</template>
