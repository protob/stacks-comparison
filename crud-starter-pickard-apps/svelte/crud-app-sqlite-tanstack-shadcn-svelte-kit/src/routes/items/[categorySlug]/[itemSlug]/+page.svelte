<!-- /src/routes/items/[categorySlug]/[itemSlug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';

  let { data }: { data: PageData } = $props();

  const { data: item, isLoading, error } = useItemDetail(() => data.categorySlug, () => data.itemSlug);
</script>

<div class="container mx-auto p-fluid-6">
  <a href="/" class="mb-4 inline-block text-primary hover:underline">
    ← Back
  </a>

  {#if isLoading}
    <div>Loading...</div>
  {:else if error}
    <div>Error: {error.message}</div>
  {:else if item}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class="tag-priority-{item.priority}">{item.priority}</span>
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