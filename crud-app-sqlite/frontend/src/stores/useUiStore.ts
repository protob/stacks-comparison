import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface UiState {
  isLoading: boolean
  loadingMessage: string
  notifications: Notification[]
  theme: Theme
  setIsLoading: (isLoading: boolean, message?: string) => void
  showNotification: (type: NotificationType, message: string, duration?: number) => void
  removeNotification: (id: string) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      loadingMessage: '',
      notifications: [],
      theme: 'system',
      setIsLoading: (isLoading, message = '') => set({ isLoading, loadingMessage: message }),
      showNotification: (type, message, duration = 3000) => {
        const id = Date.now().toString()
        set({ notifications: [...get().notifications, { id, type, message, timestamp: Date.now(), duration }] })
        if (duration > 0) {
          setTimeout(() => get().removeNotification(id), duration)
        }
      },
      removeNotification: (id) => set({ notifications: get().notifications.filter(n => n.id !== id) }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme
        const next = current === 'dark' ? 'light' : 'dark'
        set({ theme: next })
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
