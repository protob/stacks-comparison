<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { theme, toggleTheme } = useTheme()
</script>
<template>
  <button @click="toggleTheme" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover">
    <MdiWeatherSunny v-if="theme === 'light'" />
    <MdiWeatherNight v-else />
  </button>
</template>