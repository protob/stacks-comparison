<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    <main class="flex flex-col flex-1">
      <!-- We will add a header here later -->
      <div class="flex-1 overflow-auto p-fluid-6">
        <slot />
      </div>
    </main>
  </div>
</template>