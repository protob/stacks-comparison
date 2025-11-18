<!-- src/lib/pages/ItemDetailPage.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';

  export let categorySlug: string;
  export let itemSlug: string;

  const dispatch = createEventDispatcher<{ navigate: string }>();

  const detailQuery = useItemDetail(
    () => categorySlug,
    () => itemSlug,
  );

  function goBack() {
    dispatch('navigate', '/');
  }
</script>

<div class="container mx-auto p-fluid-6">
  <button on:click={goBack} class="mb-4 text-primary hover:underline">
    ← Back
  </button>

  {#if $detailQuery.isLoading}
    <div>Loading...</div>
  {:else if $detailQuery.error}
    <div>Error: {$detailQuery.error.message}</div>
  {:else if $detailQuery.data}
    {#const item = $detailQuery.data}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class={`tag-priority-${item.priority}`}>{item.priority}</span>
        {#if item.isCompleted}
          <span class="tag-sm bg-success-light">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>