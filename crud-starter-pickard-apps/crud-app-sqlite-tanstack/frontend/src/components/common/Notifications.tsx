import { useCallback } from 'react';
import clsx from 'clsx';
import { useUiStore } from '@/stores/useUiStore';
import Icon from './Icon';
import type { NotificationType } from '@/types';

const Notifications = () => {
  const { notifications, removeNotification } = useUiStore();

  const getIconForType = useCallback((type: NotificationType) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info':
      default: return 'Info';
    }
  }, []);

  const getBgClassForType = useCallback((type: NotificationType) => {
    switch (type) {
      case 'success': return 'bg-green-700 border-green-600';
      case 'error': return 'bg-red-700 border-red-600';
      case 'warning': return 'bg-yellow-700 border-yellow-600';
      case 'info':
      default: return 'bg-blue-700 border-blue-600';
    }
  }, []);

  const getTextClassForType = useCallback((type: NotificationType) => {
    switch (type) {
      case 'success': return 'text-green-100';
      case 'error': return 'text-red-100';
      case 'warning': return 'text-yellow-100';
      case 'info':
      default: return 'text-blue-100';
    }
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed z-[200] flex flex-col max-w-md gap-2 top-4 right-4">
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={clsx(
              'flex items-start p-3 rounded-sm shadow-lg border text-white animate-fade-in-up',
              getBgClassForType(notification.type)
            )}
          >
            <Icon
              name={getIconForType(notification.type)}
              className={clsx('h-5 w-5 mt-0.5 mr-2 shrink-0', getTextClassForType(notification.type))}
            />
            <div className="flex-1 mr-2">
              <p className={clsx('text-size-sm', getTextClassForType(notification.type))}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className={clsx('text-text-secondary hover:text-white', getTextClassForType(notification.type))}
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;