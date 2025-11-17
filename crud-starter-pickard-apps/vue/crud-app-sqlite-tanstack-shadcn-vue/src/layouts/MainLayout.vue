<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <div class="grid min-h-screen grid-cols-[var(--sidebar-width)_1fr]">
    <!-- Sidebar: Constrained by the first column of the grid. -->
    <AppSidebar />

    <!-- Main Content: Fills the remaining space and handles its own scrolling. -->
    <main class="overflow-y-auto p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
      <TopBar />
      <div class="flex-1">
        <slot />
      </div>
    </main>
  </div>
</template>