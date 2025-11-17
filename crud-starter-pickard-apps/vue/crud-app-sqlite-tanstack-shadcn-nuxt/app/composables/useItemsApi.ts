import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getItemTree, getItemBySlug, createItem, updateItem, deleteItem } from '@/api/itemApi';
import { useUiStore } from '@/stores/uiStore';
import type { CreateItemPayload, UpdateItemPayload } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

export function useItemTree() {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
  });
}

export function useItemDetail(categorySlug: Ref<string>, itemSlug: Ref<string>) {
  return useQuery({
    queryKey: computed(() => itemKeys.detail(categorySlug.value, itemSlug.value)),
    queryFn: () => getItemBySlug(categorySlug.value, itemSlug.value),
    enabled: computed(() => !!categorySlug.value && !!itemSlug.value),
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to create item');
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateItemPayload }) =>
      updateItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to update item');
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to delete item');
    },
  });
}