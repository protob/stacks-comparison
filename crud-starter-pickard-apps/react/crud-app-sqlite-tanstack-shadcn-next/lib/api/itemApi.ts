import { get, post, patch, del } from './apiClient';
import type { Item, Priority } from '@/types';

export interface CreateItemPayload {
  title: string;
  description: string;
  category: string;
  priority: Priority;
  categorySlug: string;
  slug: string;
}

export type UpdateItemPayload = Partial<CreateItemPayload>;

export async function getItems(): Promise<Item[]> {
  return get<Item[]>('/items');
}

export async function getItem(id: string): Promise<Item> {
  return get<Item>(`/items/${id}`);
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function updateItem(id: string, payload: UpdateItemPayload): Promise<Item> {
  return patch<Item, UpdateItemPayload>(`/items/${id}`, payload);
}

export async function deleteItem(id: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(`/items/${id}`);
}