import { useForm } from '@tanstack/react-form';
import { itemFormSchema, ItemFormData } from '@/schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
        // Show validation errors in form
        result.error.issues.forEach((issue) => {
          form.setFieldMeta(issue.path[0] as string, (meta) => ({
            ...meta,
            errors: [issue.message]
          }));
        });
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
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Task Name
            </label>
            <Input 
              id={field.name}
              placeholder="e.g., Finalize project report" 
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="text"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description
            </label>
            <Textarea 
              id={field.name}
              placeholder="Add more details about the task..." 
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      />
        
      <form.Field
        name="categories"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Category
            </label>
            <Input 
              id={field.name}
              placeholder="e.g., Work" 
              value={field.state.value[0]}
              onChange={(e) => field.handleChange([e.target.value])}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="priority"
        children={(field) => (
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Priority
            </label>
            <RadioGroup
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value as any)}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="priority-low" className="h-4 w-4" />
                <label htmlFor="priority-low" className="text-sm font-normal">
                  Low
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="priority-mid" className="h-4 w-4" />
                <label htmlFor="priority-mid" className="text-sm font-normal">
                  Medium
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="priority-high" className="h-4 w-4" />
                <label htmlFor="priority-high" className="text-sm font-normal">
                  High
                </label>
              </div>
            </RadioGroup>
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="tags"
        children={(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Tags
            </label>
            <TagInput
              tags={field.state.value}
              onTagsChange={field.handleChange}
              placeholder="Add a tag..."
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
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