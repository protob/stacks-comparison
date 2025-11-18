<script lang="ts">
  import { clsx } from 'clsx';
  
  let {
    searchQuery = '',
    onSearchQueryChange,
    searchPlaceholder = 'Search items...',
    availableTags = [],
    selectedTags = [],
    onToggleTag,
    tagsLabel = 'TAGS',
    tagPrefix = '#'
  }: {
    searchQuery?: string;
    onSearchQueryChange: (query: string) => void;
    searchPlaceholder?: string;
    availableTags?: string[];
    selectedTags?: string[];
    onToggleTag: (tag: string) => void;
    tagsLabel?: string;
    tagPrefix?: string;
  } = $props();
</script>

<div class="w-64 p-4 space-y-6 border-r bg-neutral-800 border-neutral-700">
  <div>
    <h3 class="mb-3 text-sm font-medium text-neutral-300">Search</h3>
    <input
      value={searchQuery}
      oninput={(e) => onSearchQueryChange(e.currentTarget.value)}
      type="text"
      placeholder={searchPlaceholder}
      class="w-full px-3 py-2 text-sm border rounded bg-neutral-700 border-neutral-600 text-neutral-200 placeholder:text-neutral-500"
    />
  </div>
  
  {#if availableTags.length > 0}
    <div>
      <h3 class="mb-3 text-sm font-medium text-neutral-300">{tagsLabel}</h3>
      <div class="overflow-y-auto max-h-64 scrollbar-thin">
        <div class="flex flex-wrap gap-2">
          {#each availableTags as tag}
            <button
              onclick={() => onToggleTag(tag)}
              class={clsx(
                'px-2 py-1 text-xs rounded transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              )}
            >
              {tagPrefix}{tag}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>