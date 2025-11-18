import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as itemApi from '@/lib/api/itemApi';
import { useUiStore } from '@/stores/useUiStore';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (category: string, slug: string) => [...itemKeys.all, 'detail', category, slug] as const,
};

export const useGetItemTree = () => {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: itemApi.getItemTree,
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: (newItem) => {
      showSuccessToast(`Item "${newItem.name}" added.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to add item.');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
      itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
    onSuccess: (updatedItem) => {
      showSuccessToast(`Item "${updatedItem.name}" updated.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      const categorySlug = slugify(updatedItem.categories[0]);
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to update item.');
    },
  });
};

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

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
      itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
    onSuccess: () => {
      showSuccessToast('Item deleted.');
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to delete item.');
    },
  });
};