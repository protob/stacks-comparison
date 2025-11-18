<script lang="ts">
  import { clsx } from 'clsx';
  import Icon from './Icon.svelte';
  import { uiStore } from '$lib/stores/uiStore';
  import type { NotificationType } from '$lib/types';
  
  const notifications = $derived(uiStore.notifications);
  
  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info':
      default: return 'Info';
    }
  };
  
  const getBgClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'bg-green-700 border-green-600';
      case 'error': return 'bg-red-700 border-red-600';
      case 'warning': return 'bg-yellow-700 border-yellow-600';
      case 'info':
      default: return 'bg-blue-700 border-blue-600';
    }
  };
  
  const getTextClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'text-green-100';
      case 'error': return 'text-red-100';
      case 'warning': return 'text-yellow-100';
      case 'info':
      default: return 'text-blue-100';
    }
  };
</script>

{#if notifications.length > 0}
  <div class="fixed z-[200] flex flex-col max-w-md gap-2 top-4 right-4">
    <div class="space-y-2">
      {#each notifications as notification (notification.id)}
        <div
          class={clsx(
            'flex items-start p-3 rounded-sm shadow-lg border text-white',
            getBgClassForType(notification.type)
          )}
        >
          <Icon
            name={getIconForType(notification.type)}
            class={clsx('h-5 w-5 mt-0.5 mr-2 shrink-0', getTextClassForType(notification.type))}
          />
          <div class="flex-1 mr-2">
            <p class={clsx('text-sm', getTextClassForType(notification.type))}>
              {notification.message}
            </p>
          </div>
          <button
            onclick={() => uiStore.removeNotification(notification.id)}
            class={clsx('text-neutral-300 hover:text-white', getTextClassForType(notification.type))}
          >
            <Icon name="X" class="w-4 h-4" />
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}