<script lang="ts">
  import type { PageData } from './$types';
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';

  let { data }: { data: PageData } = $props();

  // Reactively query based on route params provided by +page.ts
  const itemQuery = $derived(useItemDetail(() => data.categorySlug, () => data.itemSlug));
</script>

<div class="container mx-auto p-fluid-6">
  <a href="/" class="inline-block mb-4 text-primary hover:underline">
    ← Back
  </a>

  {#if itemQuery.isLoading}
    <div class="py-10">Loading...</div>
  {:else if itemQuery.error}
    <div class="text-destructive">Error: {itemQuery.error.message}</div>
  {:else if itemQuery.data}
    {@const item = itemQuery.data}
    <div class="border bg-surface rounded-card p-card border-border">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class="tag-priority-{item.priority} capitalize px-2 py-1 rounded border text-xs">
          {item.priority}
        </span>
        {#if item.isCompleted}
          <span class="px-2 py-1 text-xs rounded tag-sm bg-success/20 text-success">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>