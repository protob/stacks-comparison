import { get, post, patch, del } from "./apiClient";
import type { Item, ItemTree, CreateItemPayload, UpdateItemPayload } from "~/types";

export const getItemTree = () => get<ItemTree>("items/tree");

export const getItemBySlug = (categorySlug: string, itemSlug: string) => get<Item>(`items/${categorySlug}/${itemSlug}`);

export const createItem = (payload: CreateItemPayload) => post<Item, CreateItemPayload>("items", payload);

export const updateItem = (categorySlug: string, itemSlug: string, payload: UpdateItemPayload) =>
  patch<Item, UpdateItemPayload>(`items/${categorySlug}/${itemSlug}`, payload);

export const deleteItem = (categorySlug: string, itemSlug: string) => del(`items/${categorySlug}/${itemSlug}`);
