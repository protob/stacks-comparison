<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { useConfirmDialogStore } from '@/stores/confirmDialog'
import { storeToRefs } from 'pinia'
import Sidebar from '@/components/global/Sidebar.vue' // This will be our new tree navigation
import TopBar from '@/components/global/TopBar.vue'
import GlobalPlayer from '@/components/global/GlobalPlayer.vue'
import GlobalNotifications from '@/components/global/GlobalNotifications.vue'
import RightSidebar from '@/components/global/RightSidebar.vue'
import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

const uiStore = useUiStore()
const confirmDialogStore = useConfirmDialogStore()
const { isRightSidebarOpen } = storeToRefs(uiStore)
const { isOpen, title, message, confirmText, cancelText, danger } = storeToRefs(confirmDialogStore)
</script>

<template>
  <div class="app-layout">
    <Sidebar class="sidebar-grid-area" />
    <TopBar
      class="topbar-grid-area"
      :style="{ paddingRight: isRightSidebarOpen ? '384px' : '0' }"
    />
    <main
      class="main-grid-area"
      :style="{ paddingRight: isRightSidebarOpen ? '384px' : '0' }"
    >
      <RouterView />
    </main>
    <GlobalPlayer class="player-grid-area" />
    <RightSidebar />
    <GlobalNotifications />
    <ConfirmDialog
      :is-open="isOpen"
      :title="title"
      :message="message"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      :danger="danger"
      @confirm="confirmDialogStore.handleConfirm"
      @cancel="confirmDialogStore.handleCancel"
    />
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  height: 100vh;
  width: 100vw;
  /* DEFINES THE MAIN 2-PANEL STRUCTURE + TOP/BOTTOM BARS */
  grid-template-columns: 280px 1fr; /* Sidebar width | Main content */
  grid-template-rows: 64px 1fr 96px; /* TopBar height | Main content | Player height */
  grid-template-areas:
    "sidebar topbar"
    "sidebar main"
    "player player";
  overflow: hidden;
  background-color: var(--color-background);
}

.sidebar-grid-area {
  grid-area: sidebar;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}

.topbar-grid-area {
  grid-area: topbar;
  border-bottom: 1px solid var(--border-color);
  transition: padding-right 300ms ease;
}

.main-grid-area {
  grid-area: main;
  overflow: hidden; /* Important for nested scrolling */
  display: flex;
  flex-direction: column;
  transition: padding-right 300ms ease;
}

.player-grid-area {
  grid-area: player;
  border-top: 1px solid var(--border-color);
}
</style>