<script setup lang="ts">
import { useItemTree } from "@/composables/useItemsApi";
import { useItemFilters } from "@/composables/useItemFilters";
import FilterBar from "@/components/layout/FilterBar.vue";
import ItemItem from "@/components/items/ItemItem.vue";
import ItemForm from "@/components/items/ItemForm.vue";
import { useUiStore } from "@/stores/uiStore";
import { useFilterStore } from "@/stores/filterStore";
import { Button } from "@/components/ui/button";

const { data: itemTree, isLoading, error } = useItemTree();
const uiStore = useUiStore();
const filterStore = useFilterStore();

// Convert store state to computed ref for the composable
const filters = computed(() => ({
    searchQuery: filterStore.searchQuery,
    selectedPriority: filterStore.selectedPriority,
    showCompleted: filterStore.showCompleted,
    selectedTags: filterStore.selectedTags,
}));

const { filteredItemTree } = useItemFilters(
    computed(() => itemTree.value || {}),
    filters,
);
</script>

<template>
    <div>
        <header class="mb-6">
            <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
        </header>

        <FilterBar />

        <div v-if="isLoading" class="py-10 text-center text-text-muted">Loading...</div>

        <div v-else-if="error" class="py-10 text-center text-destructive">Error: {{ error.message }}</div>

        <div v-else-if="itemTree" class="mt-6 space-y-8">
            <section v-for="(items, category) in filteredItemTree" :key="category">
                <div class="flex items-center gap-2 mb-4">
                    <h2 class="font-semibold capitalize text-size-xl">
                        {{ category }}
                    </h2>
                    <span class="text-sm text-text-muted">({{ items.length }})</span>
                    <Button variant="ghost" size="icon-sm" @click="uiStore.openForm(undefined, category)">
                        <Icon name="lucide:plus" class="w-4 h-4" />
                    </Button>
                </div>

                <div class="grid gap-4">
                    <ItemItem v-for="item in items" :key="item.id" :item="item" />
                </div>
            </section>

            <div v-if="Object.keys(filteredItemTree).length === 0" class="py-10 text-center text-text-muted">
                <p>No items found.</p>
                <p v-if="filterStore.hasActiveFilters">Try adjusting your filters.</p>
                <p v-if="!filterStore.showCompleted" class="mt-2">
                    <span class="text-sm"> 💡 Completed items are hidden. </span>
                    <button @click="filterStore.showCompleted = true" class="text-sm text-primary underline hover:no-underline">Show them?</button>
                </p>
            </div>
        </div>

        <ItemForm v-if="uiStore.isFormOpen" @close="uiStore.closeForm" />
    </div>
</template>
