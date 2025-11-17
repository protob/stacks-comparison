import { defineStore } from 'pinia';
import { toast } from 'vue-sonner'; 
import type { NotificationType, Item } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref<string | null>(null);
  const theme = useStorage<Theme>('theme', 'system');
  
  // Form state
  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null); // Added state

  const setIsLoading = (status: boolean, message?: string) => {
    isLoading.value = status;
    loadingMessage.value = message || null;
  };

  const showNotification = (type: NotificationType, message: string) => {
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
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  // Modified openForm to accept an optional category
  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || null;
  };

  // Modified closeForm to reset new state
  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    isLoading,
    loadingMessage,
    theme,
    isFormOpen,
    editingItem,
    preselectedCategory, // Expose new state
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
    openForm,
    closeForm,
  };
});