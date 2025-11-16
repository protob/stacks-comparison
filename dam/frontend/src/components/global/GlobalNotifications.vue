<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import MdiCheckCircle from '~icons/mdi/check-circle'
import MdiAlertCircle from '~icons/mdi/alert-circle'
import MdiAlert from '~icons/mdi/alert'

const uiStore = useUiStore()
const { notifications } = storeToRefs(uiStore)

const iconMap = {
  success: MdiCheckCircle,
  error: MdiAlertCircle,
  warning: MdiAlert,
}

const colorMap = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-amber-600',
}
</script>

<template>
  <div class="fixed top-4 right-4 z-[100] flex flex-col items-end gap-3">
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div
        v-for="n in notifications"
        :key="n.id"
        :class="['flex items-center gap-2 w-full max-w-sm p-3 text-white rounded-lg shadow-lg', colorMap[n.type]]"
      >
        <component :is="iconMap[n.type]" class="w-5 h-5" />
        <p class="text-xs font-semibold">{{ n.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>