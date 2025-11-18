<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { useUpdateItem, useDeleteItem } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';
  import { uiStore } from '$lib/stores/uiStore';
  import type { Item } from '$lib/types';

  export let item: Item;

  const { mutate: updateItem } = useUpdateItem();
  const { mutate: deleteItem } = useDeleteItem();

  function toggleComplete() {
    updateItem({
      id: item.id,
      payload: { isCompleted: !item.isCompleted },
    });
  }

  function handleDelete() {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
    }
  }
</script>

<Card class:opacity-60={item.isCompleted}>
  <CardContent class="flex items-start gap-4 p-4">
    <Checkbox
      checked={item.isCompleted}
      on:change={toggleComplete}
      class="mt-1"
    />
    <div class="flex-1">
      <div class="flex items-center justify-between">
          <h3 
            class="font-semibold text-size-lg"
            class:line-through={item.isCompleted}
            class:text-text-muted={item.isCompleted}
          >
            {item.name}
          </h3>
           <Badge class="tag-priority-{item.priority}" variant="outline">
             {item.priority}
           </Badge>
      </div>
      <p class="mb-3 text-text-secondary">{item.text}</p>

      <div class="flex items-center justify-between">
          <p class="text-xs text-text-muted">{formatDate(item.createdAt)}</p>
          <div class="flex gap-2">
              <Button size="sm" variant="ghost" onclick={() => uiStore.openForm(item)}>
                  <icon-lucide-pencil class="w-4 h-4"></icon-lucide-pencil>
              </Button>
              <Button size="sm" variant="destructive" onclick={handleDelete}>
                  <icon-lucide-trash-2 class="w-4 h-4"></icon-lucide-trash-2>
              </Button>
          </div>
      </div>

      <div class="flex gap-2 mt-3">
        {#each item.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
        {/each}
      </div>
    </div>
  </CardContent>
</Card>