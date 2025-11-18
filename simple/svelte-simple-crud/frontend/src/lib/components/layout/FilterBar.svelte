<script lang="ts">
  interface FilterOption {
    value: string;
    label: string;
  }
  
  let {
    showPriorityFilter = true,
    priorityLabel = 'Priority',
    priorityOptions = [
      { value: 'all', label: 'All' },
      { value: 'high', label: 'High' },
      { value: 'mid', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
    selectedPriority = 'all',
    onPriorityChange,
    
    showStatusFilter = true,
    statusLabel = 'Status',
    completedLabel = 'Show completed',
    showCompleted = false,
    onShowCompletedChange
  }: {
    showPriorityFilter?: boolean;
    priorityLabel?: string;
    priorityOptions?: FilterOption[];
    selectedPriority?: string;
    onPriorityChange: (priority: string) => void;
    
    showStatusFilter?: boolean;
    statusLabel?: string;
    completedLabel?: string;
    showCompleted?: boolean;
    onShowCompletedChange: (show: boolean) => void;
  } = $props();
</script>

<div class="flex items-center gap-8 p-3 mb-6 border rounded bg-neutral-800 border-neutral-700">
  {#if showPriorityFilter}
    <div>
      <h4 class="mb-2 text-sm font-medium text-neutral-300">{priorityLabel}</h4>
      <div class="flex gap-4">
        {#each priorityOptions as option}
          <label class="flex items-center gap-2 text-sm text-neutral-400">
            <input
              value={option.value}
              checked={selectedPriority === option.value}
              onchange={(e) => onPriorityChange(e.currentTarget.value)}
              type="radio"
              class="w-4 h-4 text-blue-600 border-neutral-600 bg-neutral-700"
              name="priority"
            />
            {option.label}
          </label>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if showStatusFilter}
    <div>
      <h4 class="mb-2 text-sm font-medium text-neutral-300">{statusLabel}</h4>
      <label class="flex items-center gap-2 text-sm text-neutral-400">
        <input
          checked={showCompleted}
          onchange={(e) => onShowCompletedChange(e.currentTarget.checked)}
          type="checkbox"
          class="w-4 h-4 text-blue-600 rounded border-neutral-600 bg-neutral-700"
        />
        {completedLabel}
      </label>
    </div>
  {/if}
</div>