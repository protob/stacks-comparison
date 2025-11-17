import { defineStore } from 'pinia';
import { toast } from 'sonner';
import type { NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref<string | null>(null);
  const theme = useStorage<Theme>('theme', 'system');

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

  return {
    isLoading,
    loadingMessage,
    theme,
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
  };
});