'use client';

import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, Priority } from '@/types';
import { itemSchema } from '@/schemas/itemSchema';
import { useItemsApi } from '@/hooks/useItemsApi';
import { slugify } from '@/utils/slugify';

interface ItemFormProps {
  item?: Item;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ItemForm({ item, onSuccess, onCancel }: ItemFormProps) {
  const { createItemMutation, updateItemMutation } = useItemsApi();
  const isEditing = !!item;

  const form = useForm({
    defaultValues: {
      title: item?.title || '',
      description: item?.description || '',
      category: item?.category || '',
      priority: item?.priority || 'medium' as Priority,
    },
    onSubmit: async ({ value }) => {
      try {
        const itemData = {
          ...value,
          categorySlug: slugify(value.category),
          slug: slugify(value.title),
        };

        if (isEditing && item) {
          await updateItemMutation.mutateAsync({ id: item.id, data: itemData });
        } else {
          await createItemMutation.mutateAsync(itemData);
        }
        
        onSuccess?.();
      } catch (error) {
        console.error('Failed to save item:', error);
      }
    },
    // validators: {
    //   onChange: itemSchema,
    // },
  });

  const isPending = createItemMutation.isPending || updateItemMutation.isPending;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Item' : 'Create New Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="title"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter item title"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter item description"
                  rows={3}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="category"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Category</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter category"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="priority"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Priority</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as Priority)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? 'Saving...' : (isEditing ? 'Update Item' : 'Create Item')}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}