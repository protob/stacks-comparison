<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { uiStore } from '$lib/stores/uiStore';
  import { Sun, Moon } from '@lucide/svelte';

  let searchQuery = $state('');
  let allTags = ['project', 'personal', 'work'];
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  }
</script>

<aside class="flex flex-col p-4 border-r bg-surface border-border">
  <div class="p-2 mb-4">
    <h2 class="text-xl font-bold">TodoApp</h2>
  </div>

  <div class="flex-1 space-y-4">
    <!-- Search -->
    <div class="px-2">
      <Input bind:value={searchQuery} placeholder="Search tasks..." />
    </div>

    <Separator />

    <!-- Tags Section -->
    <div class="px-2">
      <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag (tag)}
          <Button
            onclick={() => toggleTag(tag)}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            size="sm"
            class="rounded-full"
          >
            {tag}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Add New Item Button -->
    <div class="px-2 mt-4">
      <Button class="w-full" onclick={() => uiStore.openForm()}>
        + Add Item
      </Button>
    </div>
  </div>

  <!-- Footer / Theme Toggle -->
  <div class="mt-auto">
    <Button variant="ghost" onclick={() => uiStore.toggleTheme()} class="justify-start w-full">
      {#if uiStore.theme !== 'dark'}
        <Sun class="w-4 h-4" />
      {:else}
        <Moon class="w-4 h-4" />
      {/if}
    </Button>
  </div>
</aside>