<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useAddItem } from '@/composables/useItemsApi';
import { itemFormSchema } from '@/schemas/itemSchema';
import { useUiStore } from '@/stores/uiStore';

const emit = defineEmits<{ close: [] }>();
const { mutate: addItem } = useAddItem();
const uiStore = useUiStore();

const currentTag = ref('');

const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    categories: [uiStore.preselectedCategory || 'general'] as [string],
  },
  onSubmit: async ({ value }) => {
    addItem(value, {
      onSuccess: () => emit('close'),
    });
  },
  validatorAdapter: zodValidator(),
});

const addTag = () => {
  const newTag = currentTag.value.trim();
  if (newTag && !form.state.values.tags.includes(newTag)) {
    form.setFieldValue('tags', [...form.state.values.tags, newTag]);
  }
  currentTag.value = '';
};

const removeTag = (tagToRemove: string) => {
  form.setFieldValue('tags', form.state.values.tags.filter(tag => tag !== tagToRemove));
};
</script>

<template>
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>
      
      <form @submit.prevent="form.handleSubmit()" class="space-y-4">
        <form.Field name="name" :validators="{ onChange: itemFormSchema.shape.name }">
          <template #default="{ field }">
            <div>
              <Label>Task Name</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="e.g., Finalize project report"
              />
              <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <form.Field name="text" :validators="{ onChange: itemFormSchema.shape.text }">
          <template #default="{ field }">
            <div>
              <Label>Description</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="Add more details about the task..."
              />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <form.Field name="categories" :validators="{ onChange: itemFormSchema.shape.categories }">
           <template #default="{ field }">
             <div>
               <Label>Category</Label>
               <Input
                 :model-value="field.state.value[0]"
                 @update:model-value="field.handleChange([$event])"
                 placeholder="e.g., Work"
               />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
             </div>
           </template>
        </form.Field>

        <form.Field name="priority">
          <template #default="{ field }">
            <div>
              <Label>Priority</Label>
              <RadioGroup
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
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
          </template>
        </form.Field>

        <div>
          <Label>Tags</Label>
          <div class="flex items-center gap-2 mt-2">
            <Input
              v-model="currentTag"
              @keydown.enter.prevent="addTag"
              placeholder="Add a tag..."
            />
            <Button type="button" variant="outline" @click="addTag">Add</Button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <Badge
              v-for="tag in form.state.values.tags"
              :key="tag"
              variant="secondary"
              class="cursor-pointer"
              @click="removeTag(tag)"
            >
              {{ tag }} &times;
            </Badge>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="emit('close')">Cancel</Button>
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>