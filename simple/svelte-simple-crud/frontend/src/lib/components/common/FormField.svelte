<script lang="ts">
  import { clsx } from 'clsx';
  
  let {
    label = '',
    labelFor = '',
    help = '',
    error = '',
    required = false,
    labelClass = '',
    fullWidth = false,
    class: className = '',
    children
  }: {
    label?: string;
    labelFor?: string;
    help?: string;
    error?: string;
    required?: boolean;
    labelClass?: string;
    fullWidth?: boolean;
    class?: string;
    children?: any;
  } = $props();
  
  const containerClass = $derived(
    clsx('mb-4', fullWidth && 'w-full', className)
  );
  
  const computedLabelClass = $derived(
    clsx(
      'block text-sm font-medium mb-1',
      labelClass || 'text-neutral-300',
      error && 'text-red-400'
    )
  );
</script>

<div class={containerClass}>
  {#if label}
    <label for={labelFor} class={computedLabelClass}>
      {label}
      {#if required}
        <span class="ml-1 text-red-500">*</span>
      {/if}
    </label>
  {/if}
  {@render children?.()}
  {#if help && !error}
    <div class="mt-1 text-xs text-neutral-500">
      {help}
    </div>
  {/if}
  {#if error}
    <div class="mt-1 text-xs text-red-400">
      {error}
    </div>
  {/if}
</div>