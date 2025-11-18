import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { getItemTree, getItemBySlug, createItem, updateItem, deleteItem } from "~/api/itemApi";
import { useUiStore } from "~/stores/uiStore";
import type { CreateItemPayload, UpdateItemPayload, Item } from "~/types";

export const itemKeys = {
  all: ["items"] as const,
  tree: ["items", "tree"] as const,
  detail: (categorySlug: string, itemSlug: string) => ["items", "detail", categorySlug, itemSlug] as const,
};

export function useItemTree() {
  return useQuery({ queryKey: itemKeys.tree, queryFn: getItemTree });
}

export function useItemDetail(categorySlug: any, itemSlug: any) {
  return useQuery({
    queryKey: itemKeys.detail(categorySlug.value, itemSlug.value),
    queryFn: () => getItemBySlug(categorySlug.value, itemSlug.value),
    enabled: !!categorySlug.value && !!itemSlug.value,
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree });
      uiStore.showNotification("success", "Item created successfully");
    },
    onError: (error: any) => {
      uiStore.showNotification("error", error.message || "Failed to create item");
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();
  return useMutation({
    mutationFn: ({ categorySlug, itemSlug, payload }: { categorySlug: string; itemSlug: string; payload: UpdateItemPayload }) =>
      updateItem(categorySlug, itemSlug, payload),
    onMutate: async ({ categorySlug, itemSlug, payload }) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: itemKeys.tree });

      // Get previous data
      const previousData = queryClient.getQueryData(itemKeys.tree);

      // Optimistically update the cache
      queryClient.setQueryData(itemKeys.tree, (old: any) => {
        if (!old) return old;

        const newData = { ...old };
        if (newData[categorySlug]) {
          newData[categorySlug] = newData[categorySlug].map((item: Item) => (item.slug === itemSlug ? { ...item, ...payload } : item));
        }
        return newData;
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(itemKeys.tree, context.previousData);
      }
      uiStore.showNotification("error", error.message || "Failed to update item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree });
      uiStore.showNotification("success", "Item updated successfully");
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();
  return useMutation({
    mutationFn: ({ categorySlug, itemSlug }: { categorySlug: string; itemSlug: string }) => deleteItem(categorySlug, itemSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree });
      uiStore.showNotification("success", "Item deleted successfully");
    },
    onError: (error: any) => {
      uiStore.showNotification("error", error.message || "Failed to delete item");
    },
  });
}
