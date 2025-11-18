'use client';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { itemFormSchema, type ItemFormData } from '@/schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ItemFormProps {
  defaultValues?: Partial<ItemFormData>;
  onSubmit: (data: ItemFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ItemForm({ defaultValues, onSubmit, isSubmitting, submitLabel = 'Save' }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name ?? '',
      text: defaultValues?.text ?? '',
      priority: defaultValues?.priority ?? 'mid',
      categories: defaultValues?.categories ?? ['General'],
      tags: defaultValues?.tags ?? [],
    } as ItemFormData,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: itemFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Item name..."
            />
            {field.state.meta.errors ? (
              <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="text"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="text">Description</Label>
            <Textarea
              id="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              placeholder="Details..."
            />
          </div>
        )}
      />

      <form.Field
        name="categories"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={field.state.value[0]}
              onChange={(e) => field.handleChange([e.target.value])}
              placeholder="Category..."
            />
          </div>
        )}
      />
      
      <form.Field
        name="priority"
        children={(field) => (
          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup
              value={field.state.value}
              onValueChange={(val: any) => field.handleChange(val)}
              className="flex gap-4"
            >
              {['low', 'mid', 'high'].map((p) => (
                <div key={p} className="flex items-center space-x-2">
                  <RadioGroupItem value={p} id={p} />
                  <Label htmlFor={p} className="capitalize cursor-pointer">{p}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      />

      <form.Field
        name="tags"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={field.state.value?.join(', ')}
              onChange={(e) => 
                field.handleChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))
              }
              placeholder="work, urgent, todo"
            />
          </div>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}