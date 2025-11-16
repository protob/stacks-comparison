<script setup lang="ts">
import { ref, computed } from 'vue'
import MdiClose from '~icons/mdi/close'
import MdiPlus from '~icons/mdi/plus'

interface Item {
  id: string
  name: string
}

const props = defineProps<{
  modelValue: string | null
  items: Item[]
  label: string
  placeholder?: string
  disabled?: boolean
  allowCreate?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'create': [name: string]
}>()

const searchQuery = ref('')
const showDropdown = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

// Get selected item
const selectedItem = computed(() => {
  if (!props.modelValue) return null
  return props.items.find(item => item.id === props.modelValue) || null
})

// Filter items based on search
const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items

  const query = searchQuery.value.toLowerCase()
  return props.items.filter(item =>
    item.name.toLowerCase().includes(query)
  )
})

// Check if there's an exact match
const exactMatch = computed(() => {
  if (!searchQuery.value) return false
  return filteredItems.value.some(item =>
    item.name.toLowerCase() === searchQuery.value.toLowerCase()
  )
})

// Show create option
const showCreateOption = computed(() => {
  return props.allowCreate && searchQuery.value && !exactMatch.value
})

// Select an item
const selectItem = (item: Item) => {
  emit('update:modelValue', item.id)
  searchQuery.value = ''
  showDropdown.value = false
}

// Clear selection
const clearSelection = () => {
  emit('update:modelValue', null)
  searchQuery.value = ''
  showDropdown.value = false
}

// Create new item
const createNew = () => {
  if (!searchQuery.value) return
  emit('create', searchQuery.value)
  searchQuery.value = ''
  showDropdown.value = false
}

// Handle focus
const handleFocus = () => {
  showDropdown.value = true
}

// Handle blur with delay to allow clicking dropdown items
const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
    searchQuery.value = ''
  }, 200)
}

// Watch for clicks outside
const handleClickOutside = () => {
  showDropdown.value = false
  searchQuery.value = ''
}
</script>

<template>
  <div class="relative">
    <label v-if="label" class="block mb-1.5 text-xs font-medium text-text-primary">
      {{ label }}
    </label>

    <!-- Selected item display (chip) -->
    <div
      v-if="selectedItem && !showDropdown"
      class="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md bg-background border-border"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <span class="flex-1 text-text-primary">{{ selectedItem.name }}</span>
      <button
        v-if="!disabled"
        @click="clearSelection"
        class="text-text-muted hover:text-text-primary"
        type="button"
      >
        <MdiClose class="w-4 h-4" />
      </button>
    </div>

    <!-- Search input -->
    <div v-else class="relative">
      <input
        ref="inputRef"
        v-model="searchQuery"
        @focus="handleFocus"
        @blur="handleBlur"
        :placeholder="placeholder || `Search ${label.toLowerCase()}...`"
        :disabled="disabled"
        class="w-full px-3 py-1.5 text-sm border rounded-md bg-background border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <!-- Dropdown -->
      <div
        v-if="showDropdown && !disabled"
        class="absolute z-50 w-full mt-1 bg-surface border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        <!-- Filtered items -->
        <div
          v-for="item in filteredItems"
          :key="item.id"
          @mousedown="selectItem(item)"
          class="px-3 py-2 text-sm cursor-pointer hover:bg-background text-text-primary"
        >
          {{ item.name }}
        </div>

        <!-- No results -->
        <div
          v-if="filteredItems.length === 0 && !showCreateOption"
          class="px-3 py-2 text-sm text-text-muted"
        >
          No results found
        </div>

        <!-- Create new option -->
        <div
          v-if="showCreateOption"
          @mousedown="createNew"
          class="px-3 py-2 text-sm cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border-t border-border"
        >
          <MdiPlus class="inline w-4 h-4 mr-1" />
          Create "{{ searchQuery }}"
        </div>
      </div>
    </div>
  </div>
</template>
