<script setup lang="ts">
import { useItemTree, itemKeys } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';
import { useUiStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { getItemTree } from '@/api/itemApi';

// Data fetching for the page
const { data: itemTree, isLoading, error } = await useAsyncData('itemTree', getItemTree, {
  default: () => ({}),
});
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
  <div>
    <header class="mb-6">
      <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
    </header>

    <FilterBar
      v-model:priority="filters.selectedPriority"
      v-model:showCompleted="filters.showCompleted"
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
          <Button variant="ghost" size="icon-sm" @click="uiStore.openForm(undefined, category)">
            <Icon name="lucide:plus" class="w-4 h-4" />
          </Button>
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

    <ItemForm
      v-if="uiStore.isFormOpen"
      @close="uiStore.closeForm"
    />
  </div>
</template>