// src/lib/api/itemApi.ts
import { get, post, patch, del } from '$lib/api/apiClient';
import type {
  Item,
  ItemTree,
  CreateItemPayload,
  UpdateItemPayload,
} from '$lib/types';

export const getItemTree = () => get<ItemTree>('/items/tree');

export const getItemBySlug = (categorySlug: string, itemSlug: string) =>
  get<Item>(`/items/${categorySlug}/${itemSlug}`);

export const createItem = (payload: CreateItemPayload) =>
  post<Item, CreateItemPayload>('/items', payload);

export const updateItem = (id: number, payload: UpdateItemPayload) =>
  patch<Item, UpdateItemPayload>(`/items/${id}`, payload);

export const deleteItem = (id: number) =>
  del<{ deleted: boolean }>(`/items/${id}`);