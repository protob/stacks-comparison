<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore();
</script>

<template>
  <aside class="w-64 p-4 border-r bg-surface border-border">
    <nav class="space-y-2">
      <RouterLink to="/" custom v-slot="{ navigate, isActive }">
        <Button
          @click="navigate"
          :variant="isActive ? 'default' : 'ghost'"
          class="justify-start w-full"
        >
          Items
        </Button>
      </RouterLink>
      <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
        <Button
          @click="navigate"
          :variant="isActive ? 'default' : 'ghost'"
          class="justify-start w-full"
        >
          About
        </Button>
      </RouterLink>
    </nav>
    
    <div class="mt-8">
      <Button variant="outline" @click="uiStore.toggleTheme()">
        Toggle Theme
      </Button>
    </div>
  </aside>
</template>