<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
    <nav class="flex items-center gap-4">
      <RouterLink 
        to="/" 
        :class="route.path === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        Home
      </RouterLink>
      <RouterLink 
        to="/about" 
        :class="route.path === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        About
      </RouterLink>
    </nav>
  </header>
</template>