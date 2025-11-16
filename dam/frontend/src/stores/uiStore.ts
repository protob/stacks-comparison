import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateId } from '@/utils/id'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning'
  message: string
}

export const useUiStore = defineStore('ui', () => {
  const notifications = ref<Notification[]>([])
  const isRightSidebarOpen = ref(true) // Open by default

  function show(type: Notification['type'], message: string) {
    const id = generateId()
    notifications.value.push({ id, type, message })
    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }, 5000)
  }

  const success = (message: string) => show('success', message)
  const error = (message: string) => show('error', message)
  const warning = (message: string) => show('warning', message)

  function toggleRightSidebar() {
    isRightSidebarOpen.value = !isRightSidebarOpen.value
  }

  function openRightSidebar() {
    isRightSidebarOpen.value = true
  }

  function closeRightSidebar() {
    isRightSidebarOpen.value = false
  }

  return {
    notifications,
    success,
    error,
    warning,
    isRightSidebarOpen,
    toggleRightSidebar,
    openRightSidebar,
    closeRightSidebar,
  }
})