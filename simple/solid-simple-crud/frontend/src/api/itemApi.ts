// frontends/solid/src/api/itemApi.ts
import { get, post, patch, del } from './apiClient';
// Import all necessary types, including payload types, from @/types
import type { 
  Item, 
  // Priority,         // Keep if used directly in this file, otherwise can be removed
  // SingleCategory,   // Keep if used directly in this file, otherwise can be removed
  ItemTree, 
  CreateItemPayload,  // Import this
  UpdateItemPayload   // Import this
} from '@/types';


// Removed local definitions of CreateItemPayload and UpdateItemPayload

export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload // Use imported type
): Promise<Item> {
  return patch<Item, UpdateItemPayload>( // Use imported type for TRequest generic
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}