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

  const openForm = (item?: Item) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
  };

  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
  };

  return {
    isLoading,
    loadingMessage,
    theme,
    isFormOpen,
    editingItem,
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
    openForm,
    closeForm,
  };
});