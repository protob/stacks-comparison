<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ItemForm from '$lib/components/items/ItemForm.svelte';
	import ItemItem from '$lib/components/items/ItemItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import ConfirmDeleteModal from '$lib/components/common/ConfirmDeleteModal.svelte';
	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { useItemStore } from '$lib/stores/itemStore';
	import { useItemFilters } from '$lib/composables/useItemFilters';
	import type { Item } from '$lib/types';
	import { slugify } from '$lib/utils/slugify';

	const itemStore = useItemStore();

	// Reactive state using runes
	let itemTree = $state<Record<string, Item[]>>({});
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	// Modal state
	let showFormModal = $state(false);
	let editingItem = $state<Item | null>(null);
	let isSubmittingForm = $state(false);
	let prefilledCategory = $state('');

	// Delete state
	let showDeleteConfirm = $state(false);
	let itemToDelete = $state<Item | null>(null);
	let isDeleting = $state(false);

	// Use the filtering composable with proper reactive state
	const {
		searchQuery,
		selectedPriority,
		showCompleted,
		selectedTags,
		allTags,
		hasActiveFilters,
		filteredItemTree,
		totalItems,
		totalFilteredItems,
		toggleTag,
		clearAllFilters,
		setSearchQuery,
		setSelectedPriority,
		setShowCompleted
	} = useItemFilters(() => itemTree);

	// Convert store values to reactive values for display
	let searchQueryValue = $state('');
	let selectedPriorityValue = $state<'all' | 'low' | 'mid' | 'high'>('all');
	let showCompletedValue = $state(true);
	let selectedTagsValue = $state<string[]>([]);
	let allTagsValue = $state<string[]>([]);
	let hasActiveFiltersValue = $state(false);
	let filteredItemTreeValue = $state<Record<string, Item[]>>({});
	let totalItemsValue = $state(0);
	let totalFilteredItemsValue = $state(0);

	// Subscribe to store changes and update reactive values
	$effect(() => {
		const unsubscribes = [
			searchQuery.subscribe((value) => (searchQueryValue = value)),
			selectedPriority.subscribe((value) => (selectedPriorityValue = value)),
			showCompleted.subscribe((value) => (showCompletedValue = value)),
			selectedTags.subscribe((value) => (selectedTagsValue = value)),
			allTags.subscribe((value) => (allTagsValue = value)),
			hasActiveFilters.subscribe((value) => (hasActiveFiltersValue = value)),
			filteredItemTree.subscribe((value) => (filteredItemTreeValue = value)),
			totalItems.subscribe((value) => (totalItemsValue = value)),
			totalFilteredItems.subscribe((value) => (totalFilteredItemsValue = value))
		];

		return () => unsubscribes.forEach((unsub) => unsub());
	});

	// Computed values using $derived
	const deleteConfirmationMessage = $derived(() => {
		const itemName = itemToDelete?.name || 'this item';
		return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
	});

	// Methods
	const retryFetch = async () => {
		await fetchItemTree();
	};

	const openAddModal = (categoryName?: string) => {
		editingItem = null;
		prefilledCategory = categoryName || '';
		showFormModal = true;
	};

	const openEditModal = (item: Item) => {
		console.log('Opening edit modal for item:', item);
		editingItem = { ...item };
		prefilledCategory = '';
		showFormModal = true;
	};

	const handleFormSubmit = async (formData: any) => {
		console.log('handleFormSubmit called with:', formData);
		console.log('editingItem:', editingItem);
		
		isSubmittingForm = true;
		try {
			if (editingItem?.id) {
				console.log('Updating existing item');
				const originalCategorySlug = slugify(editingItem.categories[0]);
				const result = await itemStore.updateItem(originalCategorySlug, editingItem.slug, formData);
				console.log('Update result:', result);
			} else {
				console.log('Adding new item');
				const result = await itemStore.addItem(formData);
				console.log('Add result:', result);
			}
			
			console.log('Closing modal and refreshing data');
			showFormModal = false;
			editingItem = null;
			prefilledCategory = '';
			
			// Refresh data
			await fetchItemTree();
		} catch (error) {
			console.error('Error in handleFormSubmit:', error);
		} finally {
			isSubmittingForm = false;
		}
	};

	const handleToggleComplete = async (item: Item) => {
		await itemStore.toggleItemCompletion(item);
		await fetchItemTree();
	};

	const confirmDelete = (item: Item) => {
		itemToDelete = item;
		showDeleteConfirm = true;
	};

	const executeDelete = async () => {
		if (!itemToDelete) return;
		isDeleting = true;
		try {
			const categorySlug = slugify(itemToDelete.categories[0]);
			await itemStore.deleteItem(categorySlug, itemToDelete.slug);
			showDeleteConfirm = false;
			itemToDelete = null;
			// Refresh data
			await fetchItemTree();
		} finally {
			isDeleting = false;
		}
	};

	// Initialize data
	const fetchItemTree = async () => {
		isLoading = true;
		error = null;
		try {
			const data = await itemStore.fetchItemTree();
			console.log('Fetched data in component:', data);
			itemTree = data;
		} catch (err) {
			console.error('Error in component:', err);
			error = err instanceof Error ? err.message : 'Failed to fetch items';
			itemTree = {}; // Reset to empty object on error
		} finally {
			isLoading = false;
		}
	};

	onMount(async () => {
		await fetchItemTree();
	});
</script>

<!-- Rest of the template remains the same -->
<div class="min-h-screen bg-neutral-900 text-neutral-100">
	<div class="flex">
		<!-- Sidebar -->
		<AppSidebar
			searchQuery={searchQueryValue}
			onSearchQueryChange={setSearchQuery}
			availableTags={allTagsValue}
			selectedTags={selectedTagsValue}
			onToggleTag={toggleTag}
		/>

		<!-- Main Content -->
		<div class="flex-1 p-6">
			<!-- Header -->
			<div class="flex items-center justify-between mb-6">
				<div>
					<h1 class="text-3xl font-bold text-neutral-100">Items</h1>
					<p class="mt-1 text-neutral-400">
						{#if hasActiveFiltersValue}
							Showing {totalFilteredItemsValue} of {totalItemsValue} items
						{:else}
							{totalItemsValue} items total
						{/if}
					</p>
				</div>
				<Button onclick={() => openAddModal()} variant="primary">
					Add Item
				</Button>
			</div>

			<!-- Filters -->
			<FilterBar
				showPriorityFilter={true}
				selectedPriority={selectedPriorityValue}
				onPriorityChange={setSelectedPriority}
				showStatusFilter={true}
				showCompleted={showCompletedValue}
				onShowCompletedChange={setShowCompleted}
			/>

			{#if hasActiveFiltersValue}
				<div class="mb-4">
					<Button onclick={clearAllFilters} variant="text" size="sm">
						Clear all filters
					</Button>
				</div>
			{/if}

			<!-- Loading State -->
			{#if isLoading}
				<div class="flex items-center justify-center py-12">
					<div class="text-neutral-400">Loading items...</div>
				</div>
			{:else if error}
				<!-- Error State -->
				<div class="p-4 mb-6 border rounded bg-red-900/20 border-red-700/50">
					<h3 class="mb-2 font-medium text-red-300">Error loading items</h3>
					<p class="mb-3 text-sm text-red-400">{error}</p>
					<Button onclick={retryFetch} variant="danger" size="sm">
						Retry
					</Button>
				</div>
			{:else}
				<!-- Items Content -->
				{#if Object.keys(filteredItemTreeValue).length === 0}
					<div class="py-12 text-center">
						<div class="mb-4 text-neutral-500">
							{#if hasActiveFiltersValue}
								No items match your current filters.
							{:else}
								No items found. Create your first item to get started.
							{/if}
						</div>
						{#if !hasActiveFiltersValue}
							<Button onclick={() => openAddModal()} variant="primary">
								Add Your First Item
							</Button>
						{/if}
					</div>
				{:else}
					<!-- Categories and Items -->
					{#each Object.entries(filteredItemTreeValue) as [categoryName, items]}
						{#if Array.isArray(items) && items.length > 0}
							<div class="mb-8">
								<div class="flex items-center mb-4 justify-left">
									<h2 class="text-xl font-semibold capitalize text-neutral-200">
										{categoryName.replace(/-/g, ' ')}
									</h2>
									<Button 
										variant="text" 
										size="sm" 
										onclick={() => openAddModal(categoryName)} 
										icon="Plus" 
										iconOnly
										class="ml-2 text-blue-400 hover:text-blue-300"
									/>
								</div>
								<div class="space-y-3">
									{#each items as item (item.id)}
										<ItemItem
											{item}
											onToggleComplete={handleToggleComplete}
											onEdit={openEditModal}
											onDelete={confirmDelete}
										/>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			{/if}
		</div>
	</div>
</div>

<!-- Add/Edit Modal -->
<Modal bind:isOpen={showFormModal} title={editingItem ? 'Edit Item' : 'New Item'}>
	<ItemForm
		item={editingItem}
		isLoading={isSubmittingForm}
		prefilledCategory={prefilledCategory}
		onSubmit={handleFormSubmit}
		onCancel={() => {
			console.log('Modal cancel clicked');
			showFormModal = false;
		}}
	/>
</Modal>

<!-- Delete Confirmation -->
<ConfirmDeleteModal
	bind:isOpen={showDeleteConfirm}
	title="Delete Item"
	message={deleteConfirmationMessage}
	confirmText="Delete"
	isLoading={isDeleting}
	onConfirm={executeDelete}
	onCancel={() => (showDeleteConfirm = false)}
/>
