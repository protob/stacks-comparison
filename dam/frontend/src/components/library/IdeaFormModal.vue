<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import type { Idea } from '@/types/dam-api'
import MdiClose from '~icons/mdi/close'

const props = defineProps<{
  modelValue: boolean
  idea?: Idea | null
  prefilledProjectId?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'saved': [idea: Idea]
}>()

const libraryStore = useLibraryStore()
const uiStore = useUiStore()
const { projects } = storeToRefs(libraryStore)

const name = ref('')
const projectId = ref('')
const description = ref('')
const referenceNotes = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    if (props.idea) {
      name.value = props.idea.name
      projectId.value = props.idea.project_id
      description.value = props.idea.description || ''
      referenceNotes.value = props.idea.reference_notes || ''
      tags.value = props.idea.tags || []
    } else {
      name.value = ''
      projectId.value = props.prefilledProjectId || ''
      description.value = ''
      referenceNotes.value = ''
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
    uiStore.error('Idea name is required')
    return
  }
  if (!projectId.value) {
    uiStore.error('Please select a project')
    return
  }

  try {
    const idea = await libraryStore.createIdea({
      name: name.value,
      project_id: projectId.value,
      description: description.value || undefined,
      reference_notes: referenceNotes.value || undefined,
      tags: tags.value.length > 0 ? tags.value : undefined
    })

    uiStore.success(`Idea "${name.value}" created`)
    emit('saved', idea)
    close()
  } catch (error) {
    console.error('Failed to create idea:', error)
    uiStore.error('Failed to create idea')
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
          {{ idea ? 'Edit Idea' : 'New Idea' }}
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
              placeholder="e.g., Cyberpunk Romance"
              class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label class="block mb-1.5 text-sm font-medium text-text-primary">
              Project <span class="text-red-500">*</span>
            </label>
            <select
              v-model="projectId"
              class="w-full px-3 py-2 text-sm border rounded-md bg-background border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select project...</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">
                {{ project.name }}
              </option>
            </select>
          </div>
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
          <label class="block mb-1.5 text-sm font-medium text-text-primary">Reference Notes</label>
          <textarea
            v-model="referenceNotes"
            rows="3"
            placeholder="Markdown or plain text notes..."
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
            {{ idea ? 'Save' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
