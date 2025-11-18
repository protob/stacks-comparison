import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';
import type { Notification, NotificationType } from '@/types';

const [isLoading, setIsLoading] = createSignal(false);
const [loadingMessage, setLoadingMessage] = createSignal<string | null>(null);
const [notifications, setNotifications] = createStore<Notification[]>([]);

export const uiStore = {
  get isLoading() { return isLoading(); },
  get loadingMessage() { return loadingMessage(); },
  get notifications() { return notifications; },

  setIsLoading: (status: boolean, message?: string) => {
    setIsLoading(status);
    setLoadingMessage(message || null);
  },

  showNotification: (type: NotificationType, message: string, duration = 3000): string => {
    const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const notification: Notification = { 
      id, 
      type, 
      message, 
      duration, 
      timestamp: Date.now() 
    };

    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => uiStore.removeNotification(id), duration);
    }

    return id;
  },

  removeNotification: (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  },
};