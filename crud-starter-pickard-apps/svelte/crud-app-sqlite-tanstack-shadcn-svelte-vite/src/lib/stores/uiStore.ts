// src/lib/stores/uiStore.ts
import { writable, get } from 'svelte/store';
import type { NotificationType, Item } from '$lib/types';
import { toast } from 'svelte-sonner';

export type Theme = 'light' | 'dark' | 'system';

function createUiStore() {
  const theme = writable<Theme>('system');
  const isFormOpen = writable(false);
  const preselectedCategory = writable<string | null>(null);
  const editingItem = writable<Item | null>(null);

  function openForm(item?: Item, categorySlug?: string) {
    editingItem.set(item ?? null);
    if (categorySlug) {
      preselectedCategory.set(categorySlug);
    } else if (item?.categorySlug) {
      preselectedCategory.set(item.categorySlug);
    }
    isFormOpen.set(true);
  }

  function closeForm() {
    isFormOpen.set(false);
    preselectedCategory.set(null);
    editingItem.set(null);
  }

  function toggleTheme() {
    const current = get(theme);
    if (current === 'light') theme.set('dark');
    else if (current === 'dark') theme.set('system');
    else theme.set('light');
  }

  function showNotification(type: NotificationType, message: string) {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
      default:
        toast(message);
        break;
    }
  }

  return {
    theme,
    isFormOpen,
    preselectedCategory,
    editingItem,
    openForm,
    closeForm,
    toggleTheme,
    showNotification,
  };
}

export const uiStore = createUiStore();