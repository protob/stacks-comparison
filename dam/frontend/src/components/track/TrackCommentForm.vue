<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TrackComment, TrackCommentInput } from '@/types'

const props = defineProps<{
  comment: TrackComment | null | undefined
}>()

const emit = defineEmits<{
  'update:comment': [comment: TrackCommentInput]
}>()

// Local state - ensure strings, never undefined or null
const general = ref('')
const pluses = ref('')
const minuses = ref('')
const blockers = ref('')

// Initialize from props
if (props.comment) {
  general.value = typeof props.comment.general === 'string' ? props.comment.general : ''
  pluses.value = typeof props.comment.pluses === 'string' ? props.comment.pluses : ''
  minuses.value = typeof props.comment.minuses === 'string' ? props.comment.minuses : ''
  blockers.value = typeof props.comment.blockers === 'string' ? props.comment.blockers : ''
}

// Watch for prop changes
watch(() => props.comment, (newComment) => {
  if (newComment) {
    // Handle both string and null values properly
    general.value = typeof newComment.general === 'string' ? newComment.general : ''
    pluses.value = typeof newComment.pluses === 'string' ? newComment.pluses : ''
    minuses.value = typeof newComment.minuses === 'string' ? newComment.minuses : ''
    blockers.value = typeof newComment.blockers === 'string' ? newComment.blockers : ''
  } else {
    // Reset if no comment
    general.value = ''
    pluses.value = ''
    minuses.value = ''
    blockers.value = ''
  }
}, { immediate: true })

const saveComment = () => {
  emit('update:comment', {
    general: general.value,
    pluses: pluses.value,
    minuses: minuses.value,
    blockers: blockers.value,
  })
}
</script>

<template>
  <div class="space-y-3">
    <!-- General -->
    <div>
      <label class="flex items-center gap-1.5 mb-1 text-xs font-medium text-text-primary">
        <MdiTextBox class="w-3.5 h-3.5" />
        General
      </label>
      <textarea
        v-model="general"
        rows="2"
        placeholder="Overall impressions..."
        class="w-full px-2 py-1.5 text-xs border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary resize-none"
      />
    </div>

    <!-- Pluses -->
    <div>
      <label class="flex items-center gap-1.5 mb-1 text-xs font-medium text-green-500">
        <MdiPlusCircle class="w-3.5 h-3.5" />
        Pluses
      </label>
      <textarea
        v-model="pluses"
        rows="2"
        placeholder="What works well..."
        class="w-full px-2 py-1.5 text-xs border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
      />
    </div>

    <!-- Minuses -->
    <div>
      <label class="flex items-center gap-1.5 mb-1 text-xs font-medium text-yellow-500">
        <MdiAlertCircle class="w-3.5 h-3.5" />
        Minuses
      </label>
      <textarea
        v-model="minuses"
        rows="2"
        placeholder="Minor issues..."
        class="w-full px-2 py-1.5 text-xs border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-yellow-500 resize-none"
      />
    </div>

    <!-- Blockers -->
    <div>
      <label class="flex items-center gap-1.5 mb-1 text-xs font-medium text-red-500">
        <MdiCloseCircle class="w-3.5 h-3.5" />
        Blockers
      </label>
      <textarea
        v-model="blockers"
        rows="2"
        placeholder="Deal-breakers..."
        class="w-full px-2 py-1.5 text-xs border rounded-md bg-background border-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
      />
    </div>

    <!-- Save button -->
    <button
      @click="saveComment"
      class="w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-text-inverse hover:bg-primary-dark"
    >
      Save Comments
    </button>
  </div>
</template>
