<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { useUiStore } from '@/stores/uiStore'
import type { Collection } from '@/types/dam-api'
import MdiClose from '~icons/mdi/close'

const props = defineProps<{
  modelValue: boolean
  collection?: Collection | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'saved': [collection: Collection]
}>()

const libraryStore = useLibraryStore()
const uiStore = useUiStore()

// Form state
const name = ref('')
const description = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

// Initialize form when modal opens
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.collection) {
      // Edit mode
      name.value = props.collection.name
      description.value = props.collection.description || ''
      tags.value = props.collection.tags || []
    } else {
      // Create mode
      name.value = ''
      description.value = ''
      tags.value = []
    }
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

const handleSubmit = async () => {
  if (!name.value.trim()) {
    uiStore.error('Collection name is required')
    return
  }

  try {
    const collection = await libraryStore.createCollection({
      name: name.value,
      description: description.value || undefined,
      tags: tags.value.length > 0 ? tags.value : undefined
    })

    uiStore.success(`Collection "${name.value}" created`)
    emit('saved', collection)
    close()
  } catch (error) {
    console.error('Failed to create collection:', error)
    uiStore.error('Failed to create collection')
  }
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="close"
  >
    <div class="bg-surface border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-border">
        <h2 class="text-lg font-semibold text-text-primary">
          {{ collection ? 'Edit Collection' : 'New Collection' }}
        </h2>
        <button
          @click="close"
          class="p-1 rounded-md hover:bg-background text-text-muted hover:text-text-primary"
        >
          <MdiClose class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
        <!-- Name -->
        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">
            Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="e.g., My Music Collection"
            class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Description</label>
          <textarea
            v-model="description"
            rows="3"
            placeholder="Optional description..."
            class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <!-- Tags -->
        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Tags</label>

          <!-- Tag display -->
          <div v-if="tags.length > 0" class="flex flex-wrap gap-1.5 mb-2">
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-primary/20 text-primary"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="hover:text-primary-dark"
              >
                <MdiClose class="w-3 h-3" />
              </button>
            </span>
          </div>

          <!-- Tag input -->
          <div class="flex gap-1.5">
            <input
              v-model="tagInput"
              type="text"
              placeholder="Add tag..."
              @keydown.enter.prevent="addTag"
              class="flex-1 px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              @click="addTag"
              class="px-3 py-2 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark"
            >
              Add
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-2">
          <button
            type="button"
            @click="close"
            class="flex-1 px-4 py-2 text-sm font-medium rounded-md border border-border bg-background text-text-primary hover:bg-surface"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark"
          >
            {{ collection ? 'Save' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
