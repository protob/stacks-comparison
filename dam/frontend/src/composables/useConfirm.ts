import { useConfirmDialog } from '@vueuse/core'
import { ref } from 'vue'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

export function useConfirm() {
  const dialogTitle = ref('')
  const dialogMessage = ref('')
  const confirmText = ref('Confirm')
  const cancelText = ref('Cancel')
  const isDanger = ref(false)

  const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()

  const confirmAction = async (options: ConfirmOptions): Promise<boolean> => {
    dialogTitle.value = options.title
    dialogMessage.value = options.message
    confirmText.value = options.confirmText || 'Confirm'
    cancelText.value = options.cancelText || 'Cancel'
    isDanger.value = options.danger || false

    const { isCanceled } = await reveal()
    return !isCanceled
  }

  return {
    // State
    isRevealed,
    dialogTitle,
    dialogMessage,
    confirmText,
    cancelText,
    isDanger,

    // Actions
    confirmAction,
    confirm,
    cancel
  }
}
