import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

export const useConfirmDialogStore = defineStore('confirmDialog', () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const confirmText = ref('Confirm')
  const cancelText = ref('Cancel')
  const danger = ref(false)

  let resolvePromise: ((value: boolean) => void) | null = null

  const confirm = async (options: ConfirmOptions): Promise<boolean> => {
    title.value = options.title
    message.value = options.message
    confirmText.value = options.confirmText || 'Confirm'
    cancelText.value = options.cancelText || 'Cancel'
    danger.value = options.danger || false
    isOpen.value = true

    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const handleConfirm = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }

  const handleCancel = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }
  }

  return {
    // State
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    danger,

    // Actions
    confirm,
    handleConfirm,
    handleCancel
  }
})
