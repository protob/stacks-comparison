import { writable, derived } from 'svelte/store';
import type { Notification, NotificationType } from '$lib/types';

function createUiStore() {
  const _isLoading = writable(false);
  const _loadingMessage = writable<string | null>(null);
  const _notifications = writable<Notification[]>([]);

  const setIsLoading = (status: boolean, message?: string) => {
    _isLoading.set(status);
    _loadingMessage.set(message || null);
  };

  const showNotification = (
    type: NotificationType,
    message: string,
    duration: number = 3000
  ): string => {
    const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const notification: Notification = { id, type, message, duration, timestamp: Date.now() };
    
    _notifications.update(n => [...n, notification]);

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
    return id;
  };

  const removeNotification = (id: string) => {
    _notifications.update(n => n.filter(notif => notif.id !== id));
  };

  return {
    subscribe: _notifications.subscribe,
    isLoading: derived(_isLoading, $isLoading => $isLoading),
    loadingMessage: derived(_loadingMessage, $loadingMessage => $loadingMessage),
    notifications: derived(_notifications, $notifications => $notifications),
    setIsLoading,
    showNotification,
    removeNotification,
  };
}

export const uiStore = createUiStore();