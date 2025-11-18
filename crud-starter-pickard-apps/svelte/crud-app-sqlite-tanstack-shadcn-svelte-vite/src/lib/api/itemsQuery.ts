// src/lib/api/itemsQuery.ts
import {
  QueryClient,
  createQuery,
  createMutation,
  useQueryClient,
} from '@tanstack/svelte-query';
import {
  getItemTree,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem,
} from '$lib/api/itemApi';
import type { CreateItemPayload, UpdateItemPayload } from '$lib/types';
import { uiStore } from '$lib/stores/uiStore';

// shared query keys (same structure as Vue)
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

// root-level query client creator (used in App.svelte)
export function createAppQueryClient() {
  return new QueryClient();
}

// hooks-equivalent functions for components

export function useItemTree() {
  return createQuery(() => ({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
    staleTime: 5 * 60 * 1000,
  }));
}

export function useItemDetail(categorySlug: () => string, itemSlug: () => string) {
  return createQuery(() => ({
    queryKey: itemKeys.detail(categorySlug(), itemSlug()),
    queryFn: () => getItemBySlug(categorySlug(), itemSlug()),
    enabled: Boolean(categorySlug() && itemSlug()),
  }));
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to create item');
    },
  }));
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (args: { id: number; payload: UpdateItemPayload }) =>
      updateItem(args.id, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to update item');
    },
  }));
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to delete item');
    },
  }));
}