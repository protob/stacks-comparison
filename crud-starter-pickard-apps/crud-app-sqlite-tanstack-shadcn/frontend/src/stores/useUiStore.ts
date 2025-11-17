import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from "sonner";
import type { NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  theme: Theme;

  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string) => void;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as Theme;
    }
  }
  return 'system';
};

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        loadingMessage: null,
        theme: getInitialTheme(),

        setIsLoading: (status: boolean, message?: string) =>
          set({ isLoading: status, loadingMessage: message || null }),

        showNotification: (type: NotificationType, message: string) => {
          switch (type) {
            case 'success': toast.success(message); break;
            case 'error': toast.error(message); break;
            case 'warning': toast.warning(message); break;
            case 'info': toast.info(message); break;
            default: toast(message);
          }
        },

        setTheme: (newTheme: Theme) => set({ theme: newTheme }),

        toggleTheme: () => {
          const current = get().theme;
          const newTheme = current === 'dark' ? 'light' : 'dark';
          set({ theme: newTheme });
        },
      }),
      { name: 'ui-store' }
    ),
    { name: 'ui-store' }
  )
);
