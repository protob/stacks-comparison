<script setup lang="ts">
import { ref } from 'vue'
import ThemeSwitch from './ThemeSwitch.vue'
import ScanModal from './ScanModal.vue'
import { RouterLink } from 'vue-router'

const showScanModal = ref(false)
</script>
<template>
  <header class="h-16 px-4 sm:px-6 grid grid-cols-3 items-center bg-surface flex-shrink-0">
    <!-- Left Section (Scan Button) -->
    <div class="flex items-center justify-start">
      <button
        @click="showScanModal = true"
        class="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary-hover rounded-md text-sm font-medium transition-colors"
      >
        <MdiScanner class="w-4 h-4" />
        <span>Scan</span>
      </button>
    </div>

    <!-- Center Section (Search Bar) -->
    <div class="flex items-center justify-center">
      <div class="w-full max-w-md relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdiMagnify class="w-5 h-5 text-text-muted" />
        </div>
        <input type="search" placeholder="Search for songs, artists, albums..." class="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    </div>

    <!-- Right Section (Settings & Theme) -->
    <div class="flex items-center justify-end gap-2">
      <RouterLink to="/settings" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover">
        <MdiCog />
      </RouterLink>
      <ThemeSwitch />
    </div>
  </header>

  <!-- Scan Modal -->
  <ScanModal :show="showScanModal" @close="showScanModal = false" />
</template>