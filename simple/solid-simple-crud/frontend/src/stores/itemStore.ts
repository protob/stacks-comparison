// frontends/solid/src/stores/itemStore.ts
import { createStore, produce, reconcile } from 'solid-js/store';
import { createSignal, batch } from 'solid-js';
import type { Item, ItemTree, Priority, SingleCategory, CreateItemPayload, UpdateItemPayload } from '@/types';
import { slugify } from '@/utils/slugify';
import { uiStore } from '@/stores/uiStore';

const API_BASE_URL = 'http://localhost:3000';

const [itemTree, setItemTree] = createStore<ItemTree>({});
const [isLoading, setIsLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

const fetchItemTree = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/api/items/tree`);
    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("Fetch item tree HTTP error:", response.status, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0,150)}`);
    }
    const result: ApiResponse<ItemTree> = await response.json();
    if (result.success && result.data) {
      batch(() => {
        setItemTree(reconcile(result.data, { merge: false }));
        setIsLoading(false);
      });
    } else {
      const apiErrorMsg = result.error || result.message || 'Invalid API response format for fetchItemTree';
      console.error("Fetch item tree API error:", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to fetch items:", err);
    batch(() => {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setIsLoading(false);
    });
  }
};

const addItem = async (itemData: CreateItemPayload) => {
  if (!itemData.categories || !Array.isArray(itemData.categories) || itemData.categories.length === 0 || typeof itemData.categories[0] !== 'string' || !itemData.categories[0].trim()) {
    const errMessage = "Item must have a valid, non-empty category.";
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
    return;
  }

  setIsLoading(true);
  setError(null);
  console.log("Attempting to add item. Payload:", JSON.stringify(itemData, null, 2));
  try {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Add item HTTP error response:", response.status, errorBody, "Payload sent:", itemData);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }

    const result: ApiResponse<Item> = await response.json();
    if (result.success && result.data) {
      console.log("Add item successful, server data:", result.data);
      await fetchItemTree(); 
      uiStore.showNotification('success', `Item "${result.data.name || itemData.name}" added.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to add item (API success:false)';
      console.error("Add item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to add item:", err, "Original payload:", itemData);
    const errMessage = err instanceof Error ? err.message : 'Failed to add item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const updateItem = async (originalCategorySlug: string, itemSlug: string, formData: UpdateItemPayload) => {
  setIsLoading(true);
  setError(null);
  console.log("Attempting to update item:", originalCategorySlug, itemSlug, "Payload:", JSON.stringify(formData, null, 2));

  try {
    const response = await fetch(`${API_BASE_URL}/api/items/${originalCategorySlug}/${itemSlug}`, {
      method: 'PATCH', // <--- CHANGED FROM PUT TO PATCH
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Update item HTTP error response:", response.status, errorBody, "Payload sent:", formData);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }

    const result: ApiResponse<Item> = await response.json();
    if (result.success && result.data) {
      console.log("Update successful, server data:", result.data);
      await fetchItemTree();
      uiStore.showNotification('success', `Item "${result.data.name || itemSlug}" updated.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to update item (API success:false)';
      console.error("Update item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to update item:", err, "Original payload:", formData);
    const errMessage = err instanceof Error ? err.message : 'Failed to update item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const deleteItem = async (categorySlug: string, itemSlug: string) => {
  setIsLoading(true);
  setError(null);
  console.log("Attempting to delete item:", categorySlug, itemSlug);
  try {
    const response = await fetch(`${API_BASE_URL}/api/items/${categorySlug}/${itemSlug}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: `HTTP ${response.status} ${response.statusText}`, error: `HTTP ${response.status} ${response.statusText}` }));
      console.error("Delete item HTTP error response:", response.status, errorBody);
      throw new Error(errorBody.message || errorBody.error || `HTTP ${response.status}`);
    }
    const result: ApiResponse<{deleted: boolean}> = await response.json();
    if (result.success) {
      console.log("Delete item successful on server.");
      setItemTree(
        produce(tree => {
          if (tree[categorySlug]) {
            const itemIndex = tree[categorySlug].findIndex(item => item.slug === itemSlug);
            if (itemIndex > -1) {
              tree[categorySlug].splice(itemIndex, 1);
            }
            if (tree[categorySlug].length === 0) {
              delete tree[categorySlug];
            }
            console.log("Local itemTree updated after delete for category:", categorySlug);
          } else {
            console.warn("Category slug not found in local tree for deletion:", categorySlug);
          }
        })
      );
      uiStore.showNotification('success', `Item "${itemSlug}" deleted.`);
    } else {
      const apiErrorMsg = result.error || result.message || 'Failed to delete item (API success:false)';
      console.error("Delete item API error (result.success=false):", apiErrorMsg, "Full result:", result);
      throw new Error(apiErrorMsg);
    }
  } catch (err) {
    console.error("Catch block - Failed to delete item:", err);
    const errMessage = err instanceof Error ? err.message : 'Failed to delete item';
    setError(errMessage);
    uiStore.showNotification('error', errMessage);
  } finally {
    setIsLoading(false);
  }
};

const toggleItemCompletion = async (item: Item) => {
  const originalCategorySlug = slugify(item.categories[0]);
  const payload: UpdateItemPayload = {
    name: item.name,
    text: item.text,
    priority: item.priority,
    tags: item.tags,
    categories: item.categories,
    isCompleted: !item.isCompleted,
  };
  await updateItem(originalCategorySlug, item.slug, payload);
};

export const itemStore = {
  get itemTree() { return itemTree; },
  get isLoading() { return isLoading(); },
  get error() { return error(); },
  fetchItemTree,
  addItem,
  updateItem,
  deleteItem,
  toggleItemCompletion,
};