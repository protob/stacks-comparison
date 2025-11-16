import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as itemApi from '@/api/itemApi';
import { useUiStore } from '@/stores/useUiStore';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';

// Define query keys for caching
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (category: string, slug: string) => [...itemKeys.all, 'detail', category, slug] as const,
};

/**
 * Fetches the entire item tree.
 */
export const useGetItemTree = () => {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: itemApi.getItemTree,
  });
};

/**
 * Provides a mutation function for creating a new item.
 */
export const useAddItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: (newItem) => {
      showNotification('success', `Item "${newItem.name}" added.`);
      // Invalidate the cache for the item tree to trigger a refetch
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to add item.');
    },
  });
};

/**
 * Provides a mutation function for updating an existing item.
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
      itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
    onSuccess: (updatedItem) => {
      showNotification('success', `Item "${updatedItem.name}" updated.`);
      // Invalidate both the tree and the specific item detail query
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      const categorySlug = slugify(updatedItem.categories[0]);
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to update item.');
    },
  });
};

/**
 * Provides a mutation for toggling an item's completion status.
 */
export const useToggleItemCompletion = () => {
    const updateItemMutation = useUpdateItem();
    return (item: Item) => {
        const categorySlug = slugify(item.categories[0]);
        updateItemMutation.mutate({
            categorySlug,
            itemSlug: item.slug,
            payload: { isCompleted: !item.isCompleted },
        });
    };
};

/**
 * Provides a mutation function for deleting an item.
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
      itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
    onSuccess: () => {
      showNotification('success', 'Item deleted.');
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to delete item.');
    },
  });
};