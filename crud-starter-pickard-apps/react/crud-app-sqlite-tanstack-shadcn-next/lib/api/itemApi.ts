import { get, post, patch, del } from './apiClient';
import type { Item, Priority, SingleCategory } from '@/types';

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
    isCompleted?: boolean;
    categories?: SingleCategory<string>;
};

export interface ItemTree {
  [categorySlug: string]: Item[];
}

// Fix: Use /items/tree instead of /items
export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

// Fix: Use slugs instead of ID
export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload
): Promise<Item> {
  return patch<Item, UpdateItemPayload>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

// Fix: Use slugs instead of ID
export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}