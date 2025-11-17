import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import type { NotificationType, Item } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const theme = useStorage<Theme>('theme', 'system');
  
  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null);

  const isDark = computed(() => theme.value === 'dark');

  const showNotification = (type: NotificationType, message: string) => {
    switch (type) {
      case 'success': toast.success(message); break;
      case 'error': toast.error(message); break;
      case 'warning': toast.warning(message); break;
      case 'info': toast.info(message); break;
      default: toast(message);
    }
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || (item ? item.categorySlug : null);
  };

  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    theme,
    isFormOpen,
    editingItem,
    preselectedCategory,
    isDark,
    showNotification,
    toggleTheme,
    openForm,
    closeForm,
  };
});