<script setup lang="ts">
import { useItemTree } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';

const { data: itemTree, isLoading, error } = useItemTree();

const filters = ref({
  searchQuery: '',
  selectedPriority: 'all' as const,
  showCompleted: true,
  selectedTags: [],
});

const { filteredItemTree, allTags, hasActiveFilters, clearFilters } = useItemFilters(
  computed(() => itemTree.value || {}),
  filters
);

const isFormOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    
    <main class="flex-1 p-fluid-6">
      <header class="mb-6">
        <h1 class="mb-2 font-bold text-size-2xl">Items</h1>
        <button
          @click="isFormOpen = true"
          class="btn-md bg-primary text-primary-foreground hover:bg-primary-hover rounded-button"
        >
          Add New Item
        </button>
      </header>

      <FilterBar
        v-model:search="filters.searchQuery"
        v-model:priority="filters.selectedPriority"
        v-model:showCompleted="filters.showCompleted"
        v-model:selectedTags="filters.selectedTags"
        :all-tags="allTags"
        :has-active-filters="hasActiveFilters"
        @clear="clearFilters"
      />

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else class="space-y-8">
        <section v-for="(items, category) in filteredItemTree" :key="category">
          <h2 class="mb-4 font-semibold text-size-xl">{{ category }}</h2>
          <div class="grid gap-4">
            <ItemItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>
      </div>

      <ItemForm
        v-if="isFormOpen"
        @close="isFormOpen = false"
      />
    </main>
  </div>
</template>