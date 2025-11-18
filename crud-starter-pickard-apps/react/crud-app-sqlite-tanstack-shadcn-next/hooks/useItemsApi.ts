import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as itemApi from '@/lib/api/itemApi';
import { useUiStore } from '@/stores/useUiStore';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  items: () => [...itemKeys.all, 'list'] as const,
  detail: (id: string) => [...itemKeys.all, 'detail', id] as const,
};

export const useItems = () => {
  return useQuery({
    queryKey: itemKeys.items(),
    queryFn: itemApi.getItems,
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: () => {
      showSuccessToast('Item created successfully!');
      queryClient.invalidateQueries({ queryKey: itemKeys.items() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to create item.');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: (variables: { id: string; data: Partial<Item> }) =>
      itemApi.updateItem(variables.id, variables.data),
    onSuccess: () => {
      showSuccessToast('Item updated successfully!');
      queryClient.invalidateQueries({ queryKey: itemKeys.items() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to update item.');
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: itemApi.deleteItem,
    onSuccess: () => {
      showSuccessToast('Item deleted successfully!');
      queryClient.invalidateQueries({ queryKey: itemKeys.items() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to delete item.');
    },
  });
};

// Combined hook for convenience
export const useItemsApi = () => {
  const itemsQuery = useItems();
  const createItemMutation = useAddItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  return {
    items: itemsQuery.data,
    isLoading: itemsQuery.isLoading,
    error: itemsQuery.error,
    createItemMutation,
    updateItemMutation,
    deleteItemMutation,
  };
};