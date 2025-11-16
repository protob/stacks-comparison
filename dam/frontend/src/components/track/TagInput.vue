<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  tags: string[]
  label: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:tags': [tags: string[]]
}>()

const inputValue = ref('')

const addTag = () => {
  const tag = inputValue.value.trim()
  if (tag && !props.tags.includes(tag)) {
    emit('update:tags', [...props.tags, tag])
    inputValue.value = ''
  }
}

const removeTag = (index: number) => {
  const newTags = [...props.tags]
  newTags.splice(index, 1)
  emit('update:tags', newTags)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag()
  }
}
</script>

<template>
  <div class="space-y-1.5">
    <label class="block text-xs font-medium text-text-muted">{{ label }}</label>

    <!-- Tags display -->
    <div v-if="tags.length > 0" class="flex flex-wrap gap-1.5 mb-1.5">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-primary/20 text-primary"
      >
        {{ tag }}
        <button
          @click="removeTag(index)"
          class="hover:text-primary-dark"
          aria-label="Remove tag"
        >
          <MdiClose class="w-3 h-3" />
        </button>
      </span>
    </div>

    <!-- Input -->
    <div class="flex gap-1.5">
      <input
        v-model="inputValue"
        @keydown="handleKeydown"
        type="text"
        :placeholder="placeholder || 'Add tag...'"
        class="flex-1 px-2 py-1.5 text-xs border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        @click="addTag"
        class="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark"
      >
        Add
      </button>
    </div>
  </div>
</template>
