<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import type { Song } from '@/types/dam-api'
import MdiClose from '~icons/mdi/close'

const props = defineProps<{
  modelValue: boolean
  song?: Song | null
  prefilledIdeaId?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'saved': [song: Song]
}>()

const libraryStore = useLibraryStore()
const uiStore = useUiStore()
const { ideas } = storeToRefs(libraryStore)

const name = ref('')
const ideaId = ref('')
const description = ref('')
const version = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.song) {
      name.value = props.song.name
      ideaId.value = props.song.idea_id
      description.value = props.song.description || ''
      version.value = props.song.version || ''
      tags.value = props.song.tags || []
    } else {
      name.value = ''
      ideaId.value = props.prefilledIdeaId || ''
      description.value = ''
      version.value = ''
      tags.value = []
    }
  }
})

const close = () => emit('update:modelValue', false)

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index: number) => tags.value.splice(index, 1)

const handleSubmit = async () => {
  if (!name.value.trim()) {
    uiStore.error('Song name is required')
    return
  }
  if (!ideaId.value) {
    uiStore.error('Please select an idea')
    return
  }

  try {
    const song = await libraryStore.createSong({
      name: name.value,
      idea_id: ideaId.value,
      description: description.value || undefined,
      version: version.value || undefined,
      tags: tags.value.length > 0 ? tags.value : undefined
    })

    uiStore.success(`Song "${name.value}" created`)
    emit('saved', song)
    close()
  } catch (error) {
    console.error('Failed to create song:', error)
    uiStore.error('Failed to create song')
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
      <div class="flex items-center justify-between p-4 border-b border-border">
        <h2 class="text-lg font-semibold text-text-primary">
          {{ song ? 'Edit Song' : 'New Song' }}
        </h2>
        <button @click="close" class="p-1 rounded-md hover:bg-background text-text-muted hover:text-text-primary">
          <MdiClose class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block mb-1.5 text-sm font-medium text-text-primary">
              Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="e.g., Neon Dreams v2"
              class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label class="block mb-1.5 text-sm font-medium text-text-primary">
              Idea <span class="text-red-500">*</span>
            </label>
            <select
              v-model="ideaId"
              class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select idea...</option>
              <option v-for="idea in ideas" :key="idea.id" :value="idea.id">
                {{ idea.name }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Version</label>
          <input
            v-model="version"
            type="text"
            placeholder="e.g., v1, remix, extended..."
            class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Description</label>
          <textarea
            v-model="description"
            rows="3"
            placeholder="Optional description..."
            class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div>
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Tags</label>
          <div v-if="tags.length > 0" class="flex flex-wrap gap-1.5 mb-2">
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-primary/20 text-primary"
            >
              {{ tag }}
              <button type="button" @click="removeTag(index)" class="hover:text-primary-dark">
                <MdiClose class="w-3 h-3" />
              </button>
            </span>
          </div>

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
            {{ song ? 'Save' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
