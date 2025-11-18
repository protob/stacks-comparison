// src/lib/stores/uiStore.ts
import { toast } from 'svelte-sonner';
import type { NotificationType, Item } from '$lib/types';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

class UiStore {
  // State
  theme = $state<Theme>('system');
  isFormOpen = $state(false);
  preselectedCategory = $state<string | null>(null);
  editingItem = $state<Item | null>(null);

  // Actions
  openForm(item?: Item, categorySlug?: string) {
    this.editingItem = item ?? null;
    if (categorySlug) {
      this.preselectedCategory = categorySlug;
    } else if (item?.categorySlug) {
      this.preselectedCategory = item.categorySlug;
    }
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.preselectedCategory = null;
    this.editingItem = null;
  }

  toggleTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else if (this.theme === 'dark') this.theme = 'system';
    else this.theme = 'light';
  }

  showNotification(type: NotificationType, message: string) {
    if (!browser) return; // Skip toast during SSR
    
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
        toast.info(message);
        break;
    }
  }
}

export const uiStore = new UiStore();