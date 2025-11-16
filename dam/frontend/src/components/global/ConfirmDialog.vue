<script setup lang="ts">
import { ref, watch } from 'vue'
import MdiAlertCircleOutline from '~icons/mdi/alert-circle-outline'

interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  danger: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const dialogRef = ref<HTMLDialogElement>()

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    dialogRef.value?.showModal()
  } else {
    dialogRef.value?.close()
  }
})

const handleConfirm = () => {
  emit('confirm')
  dialogRef.value?.close()
}

const handleCancel = () => {
  emit('cancel')
  dialogRef.value?.close()
}

const handleBackdropClick = (e: MouseEvent) => {
  // Close if clicking on backdrop (outside dialog content)
  const dialogElement = dialogRef.value
  if (dialogElement && e.target === dialogElement) {
    handleCancel()
  }
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="backdrop:bg-black/50 bg-surface border border-border rounded-lg shadow-2xl p-0 max-w-md w-full"
    @click="handleBackdropClick"
    @cancel="handleCancel"
  >
    <div v-if="isOpen" class="p-6">
      <!-- Header -->
      <div class="flex items-start gap-3 mb-4">
        <MdiAlertCircleOutline
          :class="[
            'w-6 h-6 flex-shrink-0 mt-0.5',
            danger ? 'text-red-400' : 'text-yellow-400'
          ]"
        />
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-text-primary mb-2">
            {{ title }}
          </h3>
          <p class="text-sm text-text-muted whitespace-pre-line">
            {{ message }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="handleCancel"
          class="px-4 py-2 text-sm font-medium rounded-md bg-surface-hover hover:bg-surface-active text-text-primary border border-border transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="handleConfirm"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            danger
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-primary hover:bg-primary-hover text-text-inverse'
          ]"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}
</style>
