import { writable, derived } from 'svelte/store';
import type { Item, Priority } from '$lib/types';
import * as itemApi from '$lib/api/itemApi';
import { slugify } from '$lib/utils/slugify';

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export interface CreateItemPayload {
	name: string;
	text: string;
	priority: Priority;
	tags?: string[];
	categories: string[];
}

export interface UpdateItemPayload extends Partial<Omit<CreateItemPayload, 'categories'>> {
	isCompleted?: boolean;
	categories?: string[];
}

function createItemStore() {
	const itemTree = writable<ItemTree>({});
	const isLoading = writable(false);
	const error = writable<string | null>(null);

	// Derived stores
	const categories = derived(itemTree, ($itemTree) => Object.keys($itemTree));

	// Actions
	const fetchItemTree = async (): Promise<ItemTree> => {
		isLoading.set(true);
		error.set(null);
		try {
			const tree = await itemApi.getItemTree();
			console.log('Raw API response:', tree);
			
			// Ensure all categories have arrays of items
			const normalizedTree: ItemTree = {};
			
			// Handle both direct data and wrapped response
			const data = tree.data || tree;
			
			if (data && typeof data === 'object') {
				Object.entries(data).forEach(([categorySlug, items]) => {
					normalizedTree[categorySlug] = Array.isArray(items) ? items : [];
				});
			}
			
			console.log('Normalized tree:', normalizedTree);
			itemTree.set(normalizedTree);
			return normalizedTree;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to fetch items';
			console.error('Fetch error:', e);
			error.set(errorMessage);
			const emptyTree = {};
			itemTree.set(emptyTree);
			return emptyTree;
		} finally {
			isLoading.set(false);
		}
	};

	const addItem = async (newItemData: CreateItemPayload): Promise<Item | undefined> => {
		isLoading.set(true);
		try {
			const createdItem = await itemApi.createItem(newItemData);
			// Refresh the tree to ensure consistency
			await fetchItemTree();
			return createdItem;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to add item';
			error.set(errorMessage);
			return undefined;
		} finally {
			isLoading.set(false);
		}
	};

	const updateItem = async (
		originalCategorySlug: string,
		itemSlug: string,
		updateData: UpdateItemPayload
	): Promise<Item | undefined> => {
		isLoading.set(true);
		try {
			const updatedItem = await itemApi.updateItem(originalCategorySlug, itemSlug, updateData);
			// Refresh the tree to handle potential category changes
			await fetchItemTree();
			return updatedItem;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to update item';
			error.set(errorMessage);
			return undefined;
		} finally {
			isLoading.set(false);
		}
	};

	const toggleItemCompletion = async (item: Item): Promise<Item | undefined> => {
		return updateItem(slugify(item.categories[0]), item.slug, {
			isCompleted: !item.isCompleted
		});
	};

	const deleteItem = async (categorySlug: string, itemSlug: string): Promise<boolean> => {
		isLoading.set(true);
		try {
			await itemApi.deleteItem(categorySlug, itemSlug);
			// Update local tree
			itemTree.update((tree) => {
				if (tree[categorySlug]) {
					tree[categorySlug] = tree[categorySlug].filter((t) => t.slug !== itemSlug);
					if (tree[categorySlug].length === 0) {
						delete tree[categorySlug];
					}
				}
				return tree;
			});
			return true;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to delete item';
			error.set(errorMessage);
			return false;
		} finally {
			isLoading.set(false);
		}
	};

	return {
		// Stores
		itemTree: { subscribe: itemTree.subscribe },
		categories: { subscribe: categories.subscribe },
		isLoading: { subscribe: isLoading.subscribe },
		error: { subscribe: error.subscribe },
		
		// Actions
		fetchItemTree,
		addItem,
		updateItem,
		toggleItemCompletion,
		deleteItem
	};
}

export const itemStore = createItemStore();

// Export a function that returns the store instance
export function useItemStore() {
	return itemStore;
}
