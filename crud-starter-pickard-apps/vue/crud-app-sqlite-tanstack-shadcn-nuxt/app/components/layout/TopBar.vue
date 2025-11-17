<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header class="flex items-center justify-end pb-4 mb-4 border-b border-border">
    <nav class="flex items-center gap-4">
      <NuxtLink 
        to="/" 
        :class="route.path === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        Home
      </NuxtLink>
      <NuxtLink 
        to="/about" 
        :class="route.path === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        About
      </NuxtLink>
    </nav>
  </header>
</template>