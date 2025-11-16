import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  notifications: Notification[];
  theme: Theme;

  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string, duration?: number) => string;
  removeNotification: (id: string) => void;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    return saved as Theme;
  }
  return 'system';
};

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        loadingMessage: null,
        notifications: [],
        theme: getInitialTheme(),

        setIsLoading: (status: boolean, message?: string) =>
          set({ isLoading: status, loadingMessage: message || null }),

        showNotification: (type: NotificationType, message: string, duration = 3000): string => {
          const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
          const notification: Notification = {
            id,
            type,
            message,
            duration,
            timestamp: Date.now()
          };

          set(state => ({
            notifications: [...state.notifications, notification]
          }));

          if (duration > 0) {
            setTimeout(() => get().removeNotification(id), duration);
          }

          return id;
        },

        removeNotification: (id: string) =>
          set(state => ({
            notifications: state.notifications.filter(n => n.id !== id)
          })),

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
