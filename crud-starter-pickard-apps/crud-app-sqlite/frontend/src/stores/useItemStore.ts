import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Item } from '@/types';
import * as itemApi from '@/api/itemApi';
import { useUiStore } from './useUiStore';
import { slugify } from '@/utils/slugify';

interface ItemState {
  itemTree: itemApi.ItemTree;
  isLoading: boolean;
  error: string | null;
  
  fetchItemTree: () => Promise<void>;
  addItem: (newItemData: Omit<Item, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => Promise<Item | undefined>;
  updateItem: (originalCategorySlug: string, itemSlug: string, updateData: Partial<Omit<Item, 'id' | 'slug' | 'createdAt'>>) => Promise<Item | undefined>;
  toggleItemCompletion: (item: Item) => Promise<Item | undefined>;
  deleteItem: (categorySlug: string, itemSlug: string) => Promise<boolean>;
}

export const useItemStore = create<ItemState>()(
  devtools(
    (set, get) => ({
      itemTree: {},
      isLoading: false,
      error: null,

      fetchItemTree: async () => {
        set({ isLoading: true, error: null });
        try {
          const itemTree = await itemApi.getItemTree();
          set({ itemTree });
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to fetch items';
          set({ error: errorMessage, itemTree: {} });
          useUiStore.getState().showNotification('error', errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (newItemData) => {
        useUiStore.getState().setIsLoading(true, 'Adding item...');
        try {
          const createdItem = await itemApi.createItem({
            name: newItemData.name,
            text: newItemData.text,
            priority: newItemData.priority,
            tags: newItemData.tags,
            categories: newItemData.categories,
          });
          
          const categorySlug = slugify(newItemData.categories[0]);
          set(state => {
            const newTree = { ...state.itemTree };
            if (!newTree[categorySlug]) {
              newTree[categorySlug] = [];
            }
            newTree[categorySlug].unshift(createdItem);
            return { itemTree: newTree };
          });
          
          useUiStore.getState().showNotification('success', `Item "${createdItem.name}" added.`);
          return createdItem;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to add item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return undefined;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },

      updateItem: async (originalCategorySlug, itemSlug, updateData) => {
        useUiStore.getState().setIsLoading(true, 'Updating item...');
        try {
          const updatedItem = await itemApi.updateItem(originalCategorySlug, itemSlug, updateData);
          
          // Refresh to handle potential category changes
          await get().fetchItemTree();
          
          useUiStore.getState().showNotification('success', `Item "${updatedItem.name}" updated.`);
          return updatedItem;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to update item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return undefined;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },

      toggleItemCompletion: async (item) => {
        const categorySlug = slugify(item.categories[0]);
        return get().updateItem(categorySlug, item.slug, {
          isCompleted: !item.isCompleted
        });
      },

      deleteItem: async (categorySlug, itemSlug) => {
        useUiStore.getState().setIsLoading(true, 'Deleting item...');
        try {
          await itemApi.deleteItem(categorySlug, itemSlug);
          
          set(state => {
            const newTree = { ...state.itemTree };
            if (newTree[categorySlug]) {
              newTree[categorySlug] = newTree[categorySlug].filter(t => t.slug !== itemSlug);
              if (newTree[categorySlug].length === 0) {
                delete newTree[categorySlug];
              }
            }
            return { itemTree: newTree };
          });
          
          useUiStore.getState().showNotification('success', 'Item deleted.');
          return true;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to delete item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return false;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },
    }),
    { name: 'item-store' }
  )
);