<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <!-- 
    Layout changed from 'flex' to 'grid'.
    The grid columns are defined by our CSS variable for sidebar and '1fr' for main content.
    This provides a robust and token-based layout structure.
  -->
  <div class="grid min-h-screen" style="grid-template-columns: var(--sidebar-width) 1fr;">
    <!-- Sidebar: Width is now controlled by the grid template column -->
    <AppSidebar />

    <!-- 
      Main Content: 
      - 'min-w-0' is crucial. It prevents wide content (like long text without breaks) 
        from pushing past the boundaries of the grid cell, fixing the overlap issue.
      - 'flex-1' is removed as it's a flexbox property.
    -->
    <main class="min-w-0 overflow-y-auto">
      <div class="p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
        <TopBar />
        <div class="flex-1">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>