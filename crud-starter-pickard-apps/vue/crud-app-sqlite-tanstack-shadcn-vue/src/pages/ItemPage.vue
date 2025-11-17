<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemTree } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';
import { useUiStore } from '@/stores/uiStore';

const { data: itemTree, isLoading, error } = useItemTree();
const uiStore = useUiStore();

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
</script>

<template>
  <MainLayout>
    <header class="mb-6">
      <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
      <!-- The "Add New Item" button is now in the sidebar -->
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
    <div v-else class="mt-6 space-y-8">
      <section v-for="(items, category) in filteredItemTree" :key="category">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="font-semibold capitalize text-size-xl">{{ category }}</h2>
          <span class="text-sm text-text-muted">({{ items.length }})</span>
        </div>
        <div class="grid gap-4">
          <ItemItem
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
      <div v-if="Object.keys(filteredItemTree).length === 0 && !isLoading" class="py-10 text-center text-text-muted">
        <p>No items found.</p>
        <p v-if="hasActiveFilters">Try adjusting your filters.</p>
      </div>
    </div>

    <!-- The ItemForm will be triggered from the sidebar -->
    <ItemForm
      v-if="uiStore.isFormOpen"
      :item="uiStore.editingItem"
      @close="uiStore.closeForm"
    />
  </MainLayout>
</template>