import { create } from 'zustand'

import { getItemTree, createItem, updateItem, deleteItem } from '@/api/itemApi'

import { useUiStore } from './useUiStore'

import { slugify } from '@/utils/slugify'

import type { ItemTree, Item, CreateItemPayload, UpdateItemPayload } from '@/types'

interface ItemState {
  itemTree: ItemTree
  isLoading: boolean
  fetchItemTree: () => Promise<void>
  addItem: (payload: CreateItemPayload) => Promise<void>
  updateItem: (categorySlug: string, itemSlug: string, payload: UpdateItemPayload) => Promise<void>
  toggleItemCompletion: (categorySlug: string, itemSlug: string) => Promise<void>
  deleteItem: (categorySlug: string, itemSlug: string) => Promise<void>
}

export const useItemStore = create<ItemState>((set, get) => ({
  itemTree: {},
  isLoading: false,
  fetchItemTree: async () => {
    useUiStore.getState().setIsLoading(true, 'Fetching items...')
    try {
      const tree = await getItemTree()
      set({ itemTree: tree })
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to fetch items')
    } finally {
      useUiStore.getState().setIsLoading(false)
    }
  },
  addItem: async (payload) => {
    try {
      const newItem = await createItem(payload)
      const { itemTree } = get()
      const categorySlug = slugify(payload.categories[0])
      const updatedCategory = [...(itemTree[categorySlug] || []), newItem]
      set({ itemTree: { ...itemTree, [categorySlug]: updatedCategory } })
      useUiStore.getState().showNotification('success', 'Item added successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to add item')
    }
  },
  updateItem: async (categorySlug, itemSlug, payload) => {
    try {
      const updatedItem = await updateItem(categorySlug, itemSlug, payload)
      const { itemTree } = get()
      const categoryItems = itemTree[categorySlug] || []
      const updatedCategory = categoryItems.map(item => item.slug === itemSlug ? updatedItem : item)
      set({ itemTree: { ...itemTree, [categorySlug]: updatedCategory } })
      useUiStore.getState().showNotification('success', 'Item updated successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to update item')
    }
  },
  toggleItemCompletion: async (categorySlug, itemSlug) => {
    const { itemTree } = get()
    const item = itemTree[categorySlug]?.find(i => i.slug === itemSlug)
    if (item) {
      await get().updateItem(categorySlug, itemSlug, { isCompleted: !item.isCompleted })
    }
  },
  deleteItem: async (categorySlug, itemSlug) => {
    try {
      await deleteItem(categorySlug, itemSlug)
      const { itemTree } = get()
      const updatedCategory = itemTree[categorySlug]?.filter(item => item.slug !== itemSlug) || []
      const updatedTree = { ...itemTree }
      if (updatedCategory.length === 0) {
        delete updatedTree[categorySlug]
      } else {
        updatedTree[categorySlug] = updatedCategory
      }
      set({ itemTree: updatedTree })
      useUiStore.getState().showNotification('success', 'Item deleted successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to delete item')
    }
  },
}))
