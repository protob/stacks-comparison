import { get, post, patch, del } from "./apiClient";
import type { Item, ItemTree, CreateItemPayload, UpdateItemPayload } from "~/types";

export const getItemTree = () => get<ItemTree>("items/tree");
export const getItemBySlug = (categorySlug: string, itemSlug: string) => get<Item>(`items/${categorySlug}/${itemSlug}`);
export const createItem = (payload: CreateItemPayload) => post<Item, CreateItemPayload>("items", payload);
export const updateItem = (id: string, payload: UpdateItemPayload) => patch<Item, UpdateItemPayload>(`items/${id}`, payload); // Changed from number to string
export const deleteItem = (id: string) => del(`items/${id}`); // Changed from number to string
