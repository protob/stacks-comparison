<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWorkspaceStore } from '@/stores/workspace'
import { useLocalStorage } from '@vueuse/core'
import SidebarNode from './SidebarNode.vue'
import LibraryTree from '@/components/library/LibraryTree.vue'
import CollectionFormModal from '@/components/library/CollectionFormModal.vue'
import ProjectFormModal from '@/components/library/ProjectFormModal.vue'
import IdeaFormModal from '@/components/library/IdeaFormModal.vue'
import SongFormModal from '@/components/library/SongFormModal.vue'

const workspaceStore = useWorkspaceStore()
// Use storeToRefs to get a reactive reference to the tree data
const { workspaceTree } = storeToRefs(workspaceStore)

// Tab state (persisted to localStorage)
const activeTab = useLocalStorage<'workspace' | 'library'>('dam-sidebar-active-tab', 'workspace')

// Modal states
const showCollectionModal = ref(false)
const showProjectModal = ref(false)
const showIdeaModal = ref(false)
const showSongModal = ref(false)

// Prefill data for context-aware modals
const prefilledCollectionId = ref<string | null>(null)
const prefilledProjectId = ref<string | null>(null)
const prefilledIdeaId = ref<string | null>(null)

// Fetch the tree data when the component is mounted
onMounted(() => {
  workspaceStore.fetchWorkspaceTree()
})

// Handle add button clicks from LibraryTree
const handleAddCollection = () => {
  showCollectionModal.value = true
}

const handleAddProject = (collectionId: string) => {
  prefilledCollectionId.value = collectionId
  showProjectModal.value = true
}

const handleAddIdea = (projectId: string) => {
  prefilledProjectId.value = projectId
  showIdeaModal.value = true
}

const handleAddSong = (ideaId: string) => {
  prefilledIdeaId.value = ideaId
  showSongModal.value = true
}

// Handle successful saves (can reload tree if needed)
const handleCollectionSaved = () => {
  // Tree will auto-reload via store
}

const handleProjectSaved = () => {
  // Tree will auto-reload via store
  prefilledCollectionId.value = null
}

const handleIdeaSaved = () => {
  // Tree will auto-reload via store
  prefilledProjectId.value = null
}

const handleSongSaved = () => {
  // Tree will auto-reload via store
  prefilledIdeaId.value = null
}
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <router-link to="/">DAM</router-link>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        :class="['tab', { 'tab-active': activeTab === 'workspace' }]"
        @click="activeTab = 'workspace'"
      >
        Workspace
      </button>
      <button
        :class="['tab', { 'tab-active': activeTab === 'library' }]"
        @click="activeTab = 'library'"
      >
        Library
      </button>
    </div>

    <nav class="nav-menu">
      <!-- Workspace Tab Content -->
      <div v-if="activeTab === 'workspace'">
        <!-- Dashboard -->
        <div class="px-2 space-y-1">
          <router-link to="/" class="nav-item">
            <MdiViewDashboardOutline class="w-5 h-5 mr-2" />
            <span class="text-sm font-medium">Dashboard</span>
          </router-link>
        </div>

        <!-- Workspace Tree -->
        <div class="mt-4">
          <div class="nav-section-header">SUNO / UDIO</div>
          <div class="px-2 space-y-1">
            <SidebarNode v-for="node in workspaceTree" :key="node.id" :node="node" :level="0" />
          </div>
        </div>
      </div>

      <!-- Library Tab Content -->
      <div v-else-if="activeTab === 'library'">
        <!-- Dashboard -->
        <div class="px-2 space-y-1">
          <router-link to="/" class="nav-item">
            <MdiViewDashboardOutline class="w-5 h-5 mr-2" />
            <span class="text-sm font-medium">Dashboard</span>
          </router-link>
        </div>

        <!-- Library Tree -->
        <div class="mt-4">
          <div class="nav-section-header">LIBRARY</div>
          <LibraryTree
            @add-collection="handleAddCollection"
            @add-project="handleAddProject"
            @add-idea="handleAddIdea"
            @add-song="handleAddSong"
          />
        </div>
      </div>
    </nav>

    <!-- Modals -->
    <CollectionFormModal
      v-model="showCollectionModal"
      @saved="handleCollectionSaved"
    />
    <ProjectFormModal
      v-model="showProjectModal"
      :prefilled-collection-id="prefilledCollectionId"
      @saved="handleProjectSaved"
    />
    <IdeaFormModal
      v-model="showIdeaModal"
      :prefilled-project-id="prefilledProjectId"
      @saved="handleIdeaSaved"
    />
    <SongFormModal
      v-model="showSongModal"
      :prefilled-idea-id="prefilledIdeaId"
      @saved="handleSongSaved"
    />
  </aside>
</template>

<style scoped>
.sidebar {
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  flex-shrink: 0;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: 1px solid var(--border-color);
}

.logo a {
  text-decoration: none;
  color: var(--text-primary);
}

/* Tabs */
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--color-background);
}

.tab {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover {
  color: var(--text-primary);
  background-color: var(--color-surface-hover);
}

.tab-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.nav-menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  overflow-y: auto; /* This makes the navigation scrollable */
}

.nav-section-header {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: var(--text-secondary);
  transition: background-color 0.2s, color 0.2s;
}

.nav-item:hover {
  background-color: var(--color-surface-hover);
  color: var(--text-primary);
}

.router-link-exact-active {
  background-color: var(--color-primary);
  color: white !important; /* Use !important to override hover styles */
}
</style>