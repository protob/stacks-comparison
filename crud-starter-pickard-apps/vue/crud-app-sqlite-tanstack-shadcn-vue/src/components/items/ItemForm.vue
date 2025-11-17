<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddItem } from '@/composables/useItemsApi';
import { itemFormSchema } from '@/schemas/itemSchema';

const emit = defineEmits<{ close: [] }>();
const { mutate: addItem } = useAddItem();

const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    categories: ['general'] as [string],
  },
  onSubmit: async ({ value }) => {
    addItem(value, {
      onSuccess: () => emit('close'),
    });
  },
  validatorAdapter: zodValidator(),
});
</script>

<template>
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Item</DialogTitle>
      </DialogHeader>
      
      <form
        @submit.prevent="form.handleSubmit()"
        class="space-y-4"
      >
        <form.Field
          name="name"
          :validators="{
            onChange: itemFormSchema.shape.name,
          }"
        >
          <template #default="{ field }">
            <div>
              <Label>Name</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              />
              <span v-if="field.state.meta.errors.length" class="text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </span>
            </div>
          </template>
        </form.Field>

        <form.Field
          name="text"
          :validators="{
            onChange: itemFormSchema.shape.text,
          }"
        >
          <template #default="{ field }">
            <div>
              <Label>Description</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              />
              <span v-if="field.state.meta.errors.length" class="text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </span>
            </div>
          </template>
        </form.Field>

        <form.Field name="priority">
          <template #default="{ field }">
            <div>
              <Label>Priority</Label>
              <Select
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </template>
        </form.Field>

        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="emit('close')">
            Cancel
          </Button>
          <Button type="submit">
            Create Item
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>