<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { storeToRefs } from 'pinia'
import CollectionCard from '@/components/library/CollectionCard.vue'
import CollectionFormModal from '@/components/library/CollectionFormModal.vue'
import MdiPlus from '~icons/mdi/plus'
import MdiLoading from '~icons/mdi/loading'
import MdiInboxOutline from '~icons/mdi/inbox-outline'

const libraryStore = useLibraryStore()
const { sortedCollections, loading } = storeToRefs(libraryStore)

const showCollectionModal = ref(false)

onMounted(() => {
  // Load full hierarchy to show song counts in collection cards
  libraryStore.loadAllHierarchy()
})

const openNewCollectionModal = () => {
  showCollectionModal.value = true
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <div>
        <h1 class="text-xl font-semibold text-text-primary">Collections</h1>
        <p class="text-xs text-text-muted">Organize your music into collections</p>
      </div>
      <button
        @click="openNewCollectionModal"
        class="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark flex items-center gap-1.5"
      >
        <MdiPlus class="w-4 h-4" />
        New Collection
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <!-- Loading state -->
      <div v-if="loading" class="flex items-center justify-center h-64">
        <MdiLoading class="w-8 h-8 animate-spin text-primary" />
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!sortedCollections || sortedCollections.length === 0"
        class="flex flex-col items-center justify-center h-64 text-center"
      >
        <MdiInboxOutline class="w-16 h-16 mb-4 text-text-muted" />
        <p class="text-text-muted mb-2">No collections yet</p>
        <p class="text-xs text-text-muted">Default collection should appear automatically</p>
      </div>

      <!-- Collections grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        <CollectionCard
          v-for="collection in sortedCollections"
          :key="collection.id"
          :collection="collection"
        />
      </div>
    </div>

    <!-- Modal -->
    <CollectionFormModal v-model="showCollectionModal" />
  </div>
</template>
