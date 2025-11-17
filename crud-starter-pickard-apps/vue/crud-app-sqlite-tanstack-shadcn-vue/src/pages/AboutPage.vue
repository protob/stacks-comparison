<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <div class="space-y-6">
      <header>
        <h1 class="font-bold text-size-3xl">About This Application</h1>
      </header>
      
      <div class="p-6 border rounded-lg bg-surface border-border">
        <p class="mb-4 text-text-secondary">
          This is a modern, responsive Vue frontend for managing items, built to serve as a clean and robust boilerplate. It leverages the full power of the TanStack suite and modern tooling for a superior developer experience and a fully type-safe workflow.
        </p>
        
        <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>
        
        <ul class="space-y-2 list-disc list-inside text-text-secondary">
          <li>
            <strong class="font-medium text-text-primary">Vue 3:</strong> For building a reactive and performant user interface with the Composition API.
          </li>
          <li>
            <strong class="font-medium text-text-primary">TanStack Query (Vue Query):</strong> Manages all server state, handling data fetching, caching, and synchronization effortlessly.
          </li>
          <li>
            <strong class="font-medium text-text-primary">TanStack Form (Vue Form):</strong> Ensures performant and 100% type-safe forms from validation to submission.
          </li>
          <li>
            <strong class="font-medium text-text-primary">Pinia:</strong> Provides simple and type-safe global state management for client-side UI state.
          </li>
           <li>
            <strong class="font-medium text-text-primary">shadcn-vue:</strong> A collection of beautifully designed, accessible, and unstyled components that are adapted to our custom design system.
          </li>
          <li>
            <strong class="font-medium text-text-primary">Tailwind CSS v4:</strong> Powers styling with a "CSS-first" approach, using a custom, token-based, and fluidly responsive design system.
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>