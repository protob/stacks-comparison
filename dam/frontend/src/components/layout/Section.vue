<template>
  <section :class="sectionClasses">
    <Container v-if="!noContainer" :size="containerSize" :padding="containerPadding">
      <slot />
    </Container>
    <slot v-else />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Container from './Container.vue'

interface Props {
  background?: 'default' | 'surface' | 'primary' | 'dark' | 'light' | 'transparent'
  spacing?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  border?: 'none' | 'top' | 'bottom' | 'both'
  noContainer?: boolean
  containerSize?: 'narrow' | 'medium' | 'wide' | 'full'
  containerPadding?: 'none' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  background: 'transparent',
  spacing: 'medium',
  border: 'none',
  noContainer: false,
  containerSize: 'wide',
  containerPadding: 'medium'
})

const sectionClasses = computed(() => {
  const classes = []

  const bgMap = {
    default: 'bg-background',
    surface: 'bg-surface',
    primary: 'bg-primary',
    dark: 'bg-gray-950',
    light: 'bg-gray-50',
    transparent: ''
  }
  if (props.background !== 'transparent') {
    classes.push(bgMap[props.background])
  }

  const spacingMap = {
    none: '',
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16',
    xlarge: 'py-20'
  }
  if (props.spacing !== 'none') {
    classes.push(spacingMap[props.spacing])
  }

  if (props.border === 'top' || props.border === 'both') {
    classes.push('border-t border-border')
  }
  if (props.border === 'bottom' || props.border === 'both') {
    classes.push('border-b border-border')
  }

  return classes.join(' ')
})
</script>