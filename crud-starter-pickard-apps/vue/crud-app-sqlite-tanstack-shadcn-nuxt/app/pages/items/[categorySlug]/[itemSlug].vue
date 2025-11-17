<script setup lang="ts">
import { useItemDetail } from '@/composables/useItemsApi';
import { formatDate } from '@/utils/helpers';

const route = useRoute();
const router = useRouter();

const categorySlug = computed(() => route.params.categorySlug as string);
const itemSlug = computed(() => route.params.itemSlug as string);

const { data: item, isLoading, error } = useItemDetail(categorySlug, itemSlug);
</script>

<template>
  <div class="container mx-auto p-fluid-6">
    <button @click="router.back()" class="mb-4 text-primary hover:underline">
      ← Back
    </button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="item" class="p-6 rounded-lg bg-surface">
      <h1 class="mb-4 font-bold text-size-2xl">{{ item.name }}</h1>
      <p class="mb-4 text-text-secondary">{{ item.text }}</p>
      <div class="flex items-center gap-2 mb-4">
        <span class="tag-sm" :class="`tag-priority-${item.priority}`">{{ item.priority }}</span>
        <span v-if="item.isCompleted" class="px-2 py-1 text-xs font-medium rounded-full tag-sm bg-success-light">Completed</span>
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {{ formatDate(item.createdAt) }}</p>
        <p>Updated: {{ formatDate(item.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>