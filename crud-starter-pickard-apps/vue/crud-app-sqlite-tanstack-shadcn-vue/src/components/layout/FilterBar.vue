<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

defineProps<{
  search: string;
  priority: string;
  showCompleted: boolean;
  selectedTags: string[];
  allTags: string[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:search': [value: string];
  'update:priority': [value: string];
  'update:showCompleted': [value: boolean];
  'update:selectedTags': [value: string[]];
  clear: [];
}>();
</script>

<template>
  <div class="p-4 mb-6 space-y-4 bg-surface rounded-card">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Input
        :model-value="search"
        @update:model-value="emit('update:search', $event)"
        placeholder="Search items..."
      />
      
      <Select
        :model-value="priority"
        @update:model-value="emit('update:priority', $event)"
      >
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="mid">Mid</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <div class="flex items-center gap-2">
        <Checkbox
          :checked="showCompleted"
          @update:checked="emit('update:showCompleted', $event)"
        />
        <label>Show Completed</label>
      </div>
    </div>

    <Button
      v-if="hasActiveFilters"
      variant="outline"
      @click="emit('clear')"
    >
      Clear Filters
    </Button>
  </div>
</template>