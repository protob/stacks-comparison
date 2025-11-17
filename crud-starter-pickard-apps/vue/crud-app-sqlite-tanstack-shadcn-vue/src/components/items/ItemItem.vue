<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUpdateItem, useDeleteItem } from '@/composables/useItemsApi';
import type { Item } from '@/types';

const props = defineProps<{ item: Item }>();

const { mutate: updateItem } = useUpdateItem();
const { mutate: deleteItem } = useDeleteItem();

const toggleComplete = () => {
  updateItem({
    id: props.item.id,
    payload: { isCompleted: !props.item.isCompleted },
  });
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    deleteItem(props.item.id);
  }
};
</script>

<template>
  <Card>
    <CardContent class="p-4">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="mb-2 font-semibold text-size-lg">{{ item.name }}</h3>
          <p class="mb-2 text-text-secondary">{{ item.text }}</p>
          <div class="flex gap-2">
            <Badge :class="`tag-priority-${item.priority}`">{{ item.priority }}</Badge>
            <Badge v-if="item.isCompleted" class="bg-success-light">Completed</Badge>
          </div>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline" @click="toggleComplete">
            {{ item.isCompleted ? 'Undo' : 'Complete' }}
          </Button>
          <Button size="sm" variant="destructive" @click="handleDelete">
            Delete
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>