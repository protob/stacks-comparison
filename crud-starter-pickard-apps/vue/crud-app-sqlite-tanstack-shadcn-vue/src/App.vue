<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'sonner';
import { useThemeUpdater } from '@/composables/useThemeUpdater';

useThemeUpdater();
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Toaster position="top-right" richColors />
    <RouterView />
  </div>
</template>
