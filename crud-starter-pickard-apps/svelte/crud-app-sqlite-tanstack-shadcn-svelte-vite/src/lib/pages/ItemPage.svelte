<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { useItemTree } from '$lib/api/itemsQuery';
  import { useItemFilters } from '$lib/utils/useItemFilters';
  import FilterBar from '$lib/components/layout/FilterBar.svelte';
  import ItemItem from '$lib/components/items/ItemItem.svelte';
  import ItemForm from '$lib/components/items/ItemForm.svelte';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import { Plus } from '@lucide/svelte'; // Import icon directly

  const itemTreeQuery = useItemTree();
  const dispatch = createEventDispatcher();

  let filters = $state({
    searchQuery: '',
    selectedPriority: 'all' as const,
    showCompleted: true,
    selectedTags: [] as string[],
  });

  // Use derived for reactive calculations in Svelte 5
  let filterResults = $derived(useItemFilters(itemTreeQuery.data || {}, filters));
  let filteredItemTree = $derived(filterResults.filteredItemTree);
  let allTags = $derived(filterResults.allTags);
  let hasActiveFilters = $derived(filterResults.hasActiveFilters);

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
  }

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout onNavigate={handleNavigate}>
  <header class="mb-6">
    <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
  </header>

  <!-- Bind props using Svelte 5 syntax -->
  <FilterBar
    bind:search={filters.searchQuery}
    bind:priority={filters.selectedPriority}
    bind:showCompleted={filters.showCompleted}
    bind:selectedTags={filters.selectedTags}
    {allTags}
    {hasActiveFilters}
    on:clear={clearFilters}
  />

  {#if itemTreeQuery.isLoading}
    <div>Loading...</div>
  {:else if itemTreeQuery.error}
    <div>Error: {itemTreeQuery.error.message}</div>
  {:else}
    <div class="mt-6 space-y-8">
      {#each Object.entries(filteredItemTree) as [category, items]}
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-semibold capitalize text-size-xl">{category}</h2>
            <span class="text-sm text-text-muted">({items.length})</span>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onclick={() => uiStore.openForm(undefined, category)}
            >
              <Plus class="w-4 h-4" />
            </Button>
          </div>
          <div class="grid gap-4">
            {#each items as item (item.id)}
              <ItemItem {item} />
            {/each}
          </div>
        </section>
      {/each}
      {#if Object.keys(filteredItemTree).length === 0 && !itemTreeQuery.isLoading}
        <div class="py-10 text-center text-text-muted">
          <p>No items found.</p>
          {#if hasActiveFilters}
            <p>Try adjusting your filters.</p>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Access store property directly -->
  {#if uiStore.isFormOpen}
    <ItemForm onClose={() => uiStore.closeForm()} />
  {/if}
</MainLayout>