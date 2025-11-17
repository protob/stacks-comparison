import { useForm } from '@tanstack/react-form';
import { itemFormSchema, ItemFormData } from '@/schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TagInput } from '@/components/common/TagInput';
import type { Item } from '@/types';

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
  item?: Item | null;
  isSubmitting?: boolean;
}

export function ItemForm({ onSubmit, onCancel, item, isSubmitting }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: item?.name ?? '',
      text: item?.text ?? '',
      priority: item?.priority ?? 'mid',
      tags: item?.tags ?? [],
      categories: item?.categories ?? [''],
    },
    onSubmit: async ({ value }) => {
      // Validate with zod schema
      const result = itemFormSchema.safeParse(value);
      if (!result.success) {
        console.error('Validation failed:', result.error);
        return;
      }
      onSubmit(value);
    },
  });

  return (
    <div className="space-y-6">
      <form.Field
        name="name"
        children={(field) => (
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Finalize project report" 
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            {field.state.meta.errors && (
              <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />

      <form.Field
        name="text"
        children={(field) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add more details about the task..." 
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            {field.state.meta.errors && (
              <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />
        
      <form.Field
        name="categories"
        children={(field) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Work" 
                value={field.state.value[0]}
                onChange={(e) => field.handleChange([e.target.value])}
                onBlur={field.handleBlur}
              />
            </FormControl>
            {field.state.meta.errors && (
              <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />

      <form.Field
        name="priority"
        children={(field) => (
          <FormItem className="space-y-3">
            <FormLabel>Priority</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.state.value}
                onValueChange={field.handleChange}
                className="flex items-center space-x-4"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="low" />
                  </FormControl>
                  <FormLabel className="font-normal">Low</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mid" />
                  </FormControl>
                  <FormLabel className="font-normal">Medium</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="high" />
                  </FormControl>
                  <FormLabel className="font-normal">High</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            {field.state.meta.errors && (
              <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />

      <form.Field
        name="tags"
        children={(field) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <TagInput
                tags={field.state.value}
                onTagsChange={field.handleChange}
                placeholder="Add a tag..."
              />
            </FormControl>
            {field.state.meta.errors && (
              <FormMessage>{field.state.meta.errors[0]?.message}</FormMessage>
            )}
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, formIsSubmitting]) => (
            <Button 
              type="button" 
              disabled={isSubmitting || formIsSubmitting || !canSubmit}
              onClick={() => form.handleSubmit()}
            >
              {isSubmitting || formIsSubmitting ? 'Saving...' : item ? 'Save Changes' : 'Create Task'}
            </Button>
          )}
        />
      </div>
    </div>
  );
}