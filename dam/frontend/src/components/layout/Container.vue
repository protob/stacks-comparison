<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'narrow' | 'medium' | 'wide' | 'full'
  padding?: 'none' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'wide',
  padding: 'medium'
})

const containerClasses = computed(() => {
  const classes = ['mx-auto']

  const sizeMap = {
    narrow: 'max-w-3xl',
    medium: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-full'
  }
  classes.push(sizeMap[props.size])

  const paddingMap = {
    none: '',
    small: 'px-4',
    medium: 'px-6',
    large: 'px-8'
  }
  if (props.padding !== 'none') {
    classes.push(paddingMap[props.padding])
  }

  return classes.join(' ')
})
</script>