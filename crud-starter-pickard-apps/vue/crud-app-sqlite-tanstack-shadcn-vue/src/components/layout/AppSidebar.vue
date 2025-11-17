<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUiStore } from '@/stores/uiStore';

// These would eventually be props or come from a store
const searchQuery = ref('');
const allTags = ref(['project', 'personal', 'work']); // Example tags
const selectedTags = ref<string[]>([]);

const uiStore = useUiStore();

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};
</script>

<template>
  <aside class="flex flex-col p-4 border-r w-72 bg-surface border-border">
    <div class="p-2 mb-4">
      <h2 class="text-xl font-bold">TodoApp</h2>
    </div>

    <div class="flex-1 space-y-4">
      <!-- Search -->
      <div class="px-2">
        <Input v-model="searchQuery" placeholder="Search tasks..." />
      </div>

      <Separator />

      <!-- Tags Section -->
      <div class="px-2">
        <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            :variant="selectedTags.includes(tag) ? 'default' : 'outline'"
            size="sm"
            class="rounded-full"
          >
            {{ tag }}
          </Button>
        </div>
      </div>

      <!-- Add New Item Button -->
      <div class="px-2 mt-4">
        <Button class="w-full">
          + Add Item
        </Button>
      </div>
    </div>

    <!-- Footer / Theme Toggle -->
    <div class="mt-auto">
      <Button variant="ghost" @click="uiStore.toggleTheme()" class="justify-start w-full">
        Toggle Theme
      </Button>
    </div>
  </aside>
</template>