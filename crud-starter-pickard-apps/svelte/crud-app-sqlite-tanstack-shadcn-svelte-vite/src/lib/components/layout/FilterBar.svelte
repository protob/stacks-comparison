<script lang="ts">
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  let { 
    priority = $bindable('all'),
    showCompleted = $bindable(true),
    hasActiveFilters = false,
    allTags = [],
    selectedTags = $bindable([]),
    search = $bindable('')
  } = $props();

  const dispatch = createEventDispatcher();

  function handleClear() {
    dispatch('clear');
  }
</script>

<div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <Label class="block mb-2">Priority</Label>
      <RadioGroup bind:value={priority} class="flex items-center gap-4">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-all" value="all" />
          <Label for="r-all">All</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-low" value="low" />
          <Label for="r-low">Low</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-mid" value="mid" />
          <Label for="r-mid">Mid</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-high" value="high" />
          <Label for="r-high">High</Label>
        </div>
      </RadioGroup>
    </div>

    <div>
      <Label class="block mb-2">Status</Label>
      <div class="flex items-center gap-2">
        <Checkbox
          id="show-completed"
          bind:checked={showCompleted}
        />
        <Label for="show-completed">Show Completed</Label>
      </div>
    </div>
  </div>

  {#if hasActiveFilters}
    <Button
      variant="ghost"
      size="sm"
      onclick={handleClear}
      class="mt-4"
    >
      Clear Filters
    </Button>
  {/if}
</div>