<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

defineProps<{
  priority: string;
  showCompleted: boolean;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:priority': [value: string];
  'update:showCompleted': [value: boolean];
  'clear': [];
}>();
</script>

<template>
  <div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Label class="block mb-2">Priority</Label>
        <RadioGroup
          :model-value="priority"
          @update:model-value="emit('update:priority', $event as string)"
          class="flex items-center gap-4"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-all" value="all" />
            <Label for="r-all">All</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-low" value="low" />
            <Label for="r-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-mid" value="mid" />
            <Label for="r-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-high" value="high" />
            <Label for="r-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label class="block mb-2">Status</Label>
        <div class="flex items-center gap-2">
          <Checkbox
            id="show-completed"
            :checked="showCompleted"
            @update:checked="emit('update:showCompleted', $event as boolean)"
          />
          <Label for="show-completed">Show Completed</Label>
        </div>
      </div>
    </div>

    <Button
      v-if="hasActiveFilters"
      variant="ghost"
      size="sm"
      @click="emit('clear')"
      class="mt-4"
    >
      Clear Filters
    </Button>
  </div>
</template>