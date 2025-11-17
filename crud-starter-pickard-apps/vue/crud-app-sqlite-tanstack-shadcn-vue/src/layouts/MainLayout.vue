<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <!-- 
    TODO: Investigate grid layout solution for better control
    Previous grid implementation: grid-cols-[var(--sidebar-width)_1fr]
    Grid preferred for better layout control, but flexbox used temporarily due to overlap issues
    Need to investigate CSS custom variables and grid column sizing conflicts
  -->
  <div class="flex min-h-screen">
    <!-- Sidebar: Fixed width -->
    <AppSidebar />

    <!-- Main Content: Takes remaining space -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
        <TopBar />
        <div class="flex-1">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>