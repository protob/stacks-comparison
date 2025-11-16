<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  rating: number | null | undefined
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:rating': [rating: number]
}>()

const hoveredStar = ref<number | null>(null)

const setRating = (star: number) => {
  if (props.readonly) return
  emit('update:rating', star)
}

const stars = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="star in stars"
      :key="star"
      @click="setRating(star)"
      @mouseenter="!readonly && (hoveredStar = star)"
      @mouseleave="hoveredStar = null"
      :disabled="readonly"
      class="text-2xl transition-colors"
      :class="[
        readonly ? 'cursor-default' : 'cursor-pointer',
        (hoveredStar !== null ? star <= hoveredStar : star <= (rating || 0))
          ? 'text-yellow-500'
          : 'text-neutral-700',
      ]"
    >
      {{ (hoveredStar !== null ? star <= hoveredStar : star <= (rating || 0)) ? '★' : '☆' }}
    </button>
  </div>
</template>
