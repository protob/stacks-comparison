<!-- src/lib/components/items/ItemItem.svelte -->
<script lang="ts">
	import clsx from 'clsx';
	import Button from '../common/Button.svelte';
	import type { Item, Priority } from '$lib/types';

	let { item, onToggleComplete, onEdit, onDelete }: {
		item: Item;
		onToggleComplete: (item: Item) => void;
		onEdit: (item: Item) => void;
		onDelete: (item: Item) => void;
	} = $props();

	const getPriorityClass = (priority: Priority) => {
		switch (priority) {
			case 'high':
				return 'bg-red-900/50 text-red-300 border border-red-800';
			case 'mid':
				return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
			case 'low':
				return 'bg-green-900/50 text-green-300 border border-green-800';
			default:
				return 'bg-neutral-700 text-neutral-400';
		}
	};
</script>

<div class="p-4 border rounded bg-neutral-800 border-neutral-700">
	<div class="flex items-start justify-between gap-4">
		<div class="flex items-start flex-1 min-w-0 gap-3">
			<input
				type="checkbox"
				checked={item.isCompleted}
				onchange={() => onToggleComplete(item)}
				class="w-4 h-4 mt-1 text-blue-600 rounded border-neutral-600 bg-neutral-700 focus:ring-blue-500 focus:ring-1"
			/>
			<div class="flex-1 min-w-0">
				<div class="flex items-center gap-2 mb-2">
					<h3 class={clsx(
						'font-medium text-lg',
						item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'
					)}>
						{item.name}
					</h3>
					<span class={clsx(
						'px-2 py-0.5 rounded text-xs font-medium',
						getPriorityClass(item.priority)
					)}>
						{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
					</span>
				</div>
				<p class={clsx(
					'text-sm mb-3',
					item.isCompleted ? 'line-through text-neutral-600' : 'text-neutral-400'
				)}>
					{item.text || 'No description provided.'}
				</p>
				{#if item.tags?.length > 0}
					<div class="overflow-y-auto max-h-16 scrollbar-thin">
						<div class="flex flex-wrap gap-1">
							{#each item.tags as tag}
								<span class="px-2 py-1 text-xs rounded bg-neutral-700 text-neutral-400">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex gap-2">
			<Button 
				variant="ghost" 
				size="icon" 
				onclick={() => onEdit(item)} 
				icon="Pencil" 
				iconOnly
			/>
			<Button 
				variant="ghost" 
				size="icon" 
				onclick={() => onDelete(item)} 
				icon="Trash" 
				iconOnly
			/>
		</div>
	</div>
</div>
