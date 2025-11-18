<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  import { useAddItem } from '$lib/api/itemsQuery';
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { uiStore } from '$lib/stores/uiStore';
  import { createEventDispatcher } from 'svelte';

  export let onClose: () => void;

  const dispatch = createEventDispatcher();
  const { mutate: addItem } = useAddItem();

  let currentTag = '';
  let formData = {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    categories: [$uiStore.preselectedCategory || 'general'] as [string],
  };

  let errors: Record<string, string> = {};

  function validateForm() {
    errors = {};
    
    try {
      itemFormSchema.parse(formData);
    } catch (e: any) {
      if (e.errors) {
        e.errors.forEach((error: any) => {
          errors[error.path[0]] = error.message;
        });
      }
    }
    
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    addItem(formData, {
      onSuccess: () => {
        dispatch('close');
        if (onClose) onClose();
      },
    });
  }

  function addTag() {
    const newTag = currentTag.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      formData = {
        ...formData,
        tags: [...formData.tags, newTag]
      };
    }
    currentTag = '';
  }

  function removeTag(tagToRemove: string) {
    formData = {
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    };
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  }
</script>

<Dialog open={true} on:openChange={() => dispatch('close')}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Task</DialogTitle>
    </DialogHeader>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <!-- Name Field -->
      <div>
        <Label for="name">Task Name</Label>
        <Input
          id="name"
          bind:value={formData.name}
          placeholder="e.g., Finalize project report"
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Description Field -->
      <div>
        <Label for="text">Description</Label>
        <Input
          id="text"
          bind:value={formData.text}
          placeholder="Add more details about task..."
        />
        {#if errors.text}
          <p class="mt-1 text-sm text-destructive">{errors.text}</p>
        {/if}
      </div>

      <!-- Category Field -->
      <div>
        <Label for="category">Category</Label>
        <Input
          id="category"
          bind:value={formData.categories[0]}
          placeholder="e.g., Work"
        />
        {#if errors.categories}
          <p class="mt-1 text-sm text-destructive">{errors.categories}</p>
        {/if}
      </div>

      <!-- Priority Field -->
      <div>
        <Label>Priority</Label>
        <RadioGroup
          bind:value={formData.priority}
          class="flex items-center gap-4 mt-2"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-low" value="low" />
            <Label for="p-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-mid" value="mid" />
            <Label for="p-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-high" value="high" />
            <Label for="p-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- Tags Field -->
      <div>
        <Label>Tags</Label>
        <div class="flex items-center gap-2 mt-2">
          <Input
            bind:value={currentTag}
            on:keydown={handleKeydown}
            placeholder="Add a tag..."
          />
          <Button type="button" variant="outline" onclick={addTag}>Add</Button>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each formData.tags as tag (tag)}
            <Badge
              variant="secondary"
              class="cursor-pointer"
              onclick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={() => dispatch('close')}>Cancel</Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>