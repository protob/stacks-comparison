import { writable, derived } from 'svelte/store';
import type { Item, Priority } from '$lib/types';

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export function useItemFilters(itemTreeAccessor: () => Record<string, Item[]>) {
	// Filter state with writable stores
	const searchQueryStore = writable('');
	const selectedPriorityStore = writable<'all' | Priority>('all');
	const showCompletedStore = writable(true);
	const selectedTagsStore = writable<string[]>([]);

	// Derived readable values - these return the actual values, not stores
	const searchQuery = derived(searchQueryStore, ($searchQuery) => $searchQuery);
	const selectedPriority = derived(selectedPriorityStore, ($selectedPriority) => $selectedPriority);
	const showCompleted = derived(showCompletedStore, ($showCompleted) => $showCompleted);
	const selectedTags = derived(selectedTagsStore, ($selectedTags) => $selectedTags);

	// Setter functions
	const setSearchQuery = (query: string) => searchQueryStore.set(query);
	const setSelectedPriority = (priority: 'all' | Priority) => selectedPriorityStore.set(priority);
	const setShowCompleted = (show: boolean) => showCompletedStore.set(show);

	// Extract all available tags from the item tree
	const allTags = derived(
		[searchQueryStore],
		() => {
			const itemTree = itemTreeAccessor();
			const tags = new Set<string>();
			
			if (itemTree && typeof itemTree === 'object') {
				Object.values(itemTree).forEach((items) => {
					if (Array.isArray(items)) {
						items.forEach((item) => {
							if (item && item.tags && Array.isArray(item.tags)) {
								item.tags.forEach((tag) => {
									if (typeof tag === 'string') {
										tags.add(tag);
									}
								});
							}
						});
					}
				});
			}
			
			return Array.from(tags).sort();
		}
	);

	// Check if any filters are currently active
	const hasActiveFilters = derived(
		[searchQueryStore, selectedPriorityStore, showCompletedStore, selectedTagsStore],
		([$searchQuery, $selectedPriority, $showCompleted, $selectedTags]) => {
			return (
				$searchQuery.trim() !== '' ||
				$selectedPriority !== 'all' ||
				!$showCompleted ||
				$selectedTags.length > 0
			);
		}
	);

	// Apply all filters to the item tree
	const filteredItemTree = derived(
		[searchQueryStore, selectedPriorityStore, showCompletedStore, selectedTagsStore],
		([$searchQuery, $selectedPriority, $showCompleted, $selectedTags]) => {
			const itemTree = itemTreeAccessor();
			const filtered: Record<string, Item[]> = {};

			if (!itemTree || typeof itemTree !== 'object') {
				return filtered;
			}

			Object.entries(itemTree).forEach(([categoryName, items]) => {
				if (!Array.isArray(items)) {
					console.warn(`Items for category ${categoryName} is not an array:`, items);
					return;
				}

				const filteredItems = items.filter((item) => {
					if (!item || typeof item !== 'object') {
						console.warn('Invalid item found:', item);
						return false;
					}

					// Search filter - check name, text, and tags
					if ($searchQuery.trim()) {
						const query = $searchQuery.toLowerCase();
						const matchesSearch =
							(item.name && item.name.toLowerCase().includes(query)) ||
							(item.text && item.text.toLowerCase().includes(query)) ||
							(item.tags && Array.isArray(item.tags) && item.tags.some((tag) => 
								typeof tag === 'string' && tag.toLowerCase().includes(query)
							));
						if (!matchesSearch) return false;
					}

					// Priority filter
					if ($selectedPriority !== 'all' && item.priority !== $selectedPriority) {
						return false;
					}

					// Completion status filter
					if (!$showCompleted && item.isCompleted) {
						return false;
					}

					// Tag filter - item must have at least one selected tag
					if ($selectedTags.length > 0) {
						const hasSelectedTag = $selectedTags.some((tag) =>
							item.tags && Array.isArray(item.tags) && item.tags.includes(tag)
						);
						if (!hasSelectedTag) return false;
					}

					return true;
				});

				// Only include categories that have items after filtering
				if (filteredItems.length > 0) {
					filtered[categoryName] = filteredItems;
				}
			});

			return filtered;
		}
	);

	// Calculate total items across all categories
	const totalItems = derived(
		[searchQueryStore],
		() => {
			const itemTree = itemTreeAccessor();
			if (!itemTree || typeof itemTree !== 'object') {
				return 0;
			}
			return Object.values(itemTree).reduce((total, items) => {
				return total + (Array.isArray(items) ? items.length : 0);
			}, 0);
		}
	);

	// Calculate total filtered items
	const totalFilteredItems = derived(
		filteredItemTree,
		($filteredItemTree) => {
			return Object.values($filteredItemTree).reduce((total, items) => {
				return total + (Array.isArray(items) ? items.length : 0);
			}, 0);
		}
	);

	// Toggle a tag in the selected tags list
	const toggleTag = (tag: string) => {
		selectedTagsStore.update((tags) => {
			const index = tags.indexOf(tag);
			if (index > -1) {
				return tags.filter((t) => t !== tag);
			} else {
				return [...tags, tag];
			}
		});
	};

	// Clear all active filters
	const clearAllFilters = () => {
		searchQueryStore.set('');
		selectedPriorityStore.set('all');
		showCompletedStore.set(true);
		selectedTagsStore.set([]);
	};

	return {
		// Derived readable values
		searchQuery,
		selectedPriority,
		showCompleted,
		selectedTags,
		
		// Setter functions
		setSearchQuery,
		setSelectedPriority,
		setShowCompleted,
		
		// Derived values
		allTags,
		hasActiveFilters,
		filteredItemTree,
		totalItems,
		totalFilteredItems,
		
		// Methods
		toggleTag,
		clearAllFilters
	};
}
