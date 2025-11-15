import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/types';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  notifications: Notification[];
  
  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string, duration?: number) => string;
  removeNotification: (id: string) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set, get) => ({
      isLoading: false,
      loadingMessage: null,
      notifications: [],

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
    }),
    { name: 'ui-store' }
  )
);