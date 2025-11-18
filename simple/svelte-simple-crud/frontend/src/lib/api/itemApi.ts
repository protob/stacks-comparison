// src/lib/api/itemApi.ts
import { get, post, patch, del } from './apiClient';
import type { Item, ItemTree, CreateItemPayload, UpdateItemPayload } from '$lib/types';

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
	payload: UpdateItemPayload
): Promise<Item> {
	return patch<Item, UpdateItemPayload>(
		`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
		payload
	);
}

export async function deleteItem(
	categorySlug: string,
	itemSlug: string
): Promise<{ deleted: boolean }> {
	return del<{ deleted: boolean }>(
		`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
	);
}