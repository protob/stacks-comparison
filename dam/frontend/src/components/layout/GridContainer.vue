<template>
  <div v-if="isEmpty" class="empty-state">
    <slot name="empty">
      <p class="py-12 text-center text-text-muted">No items to display</p>
    </slot>
  </div>
  <div v-else class="grid-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

interface Props {
  variant?: 'compact' | 'default' | 'wide'
}

// Props kept for backwards compatibility but ignored
const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const slots = useSlots()
const isEmpty = computed(() => !slots.default || !slots.default().length)
</script>

<style scoped>
.grid-container {
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
  /* Default to centered for mobile/tablet */
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 260px));
}

/* On large screens (lg breakpoint), align to the start (left) */
@media (min-width: 1024px) {
  .grid-container {
    justify-content: start;
  }
}
</style>