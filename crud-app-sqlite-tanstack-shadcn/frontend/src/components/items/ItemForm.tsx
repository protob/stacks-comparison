import { useForm } from '@tanstack/react-form';
import { itemFormSchema } from '@/schemas/itemSchema';
import { FormFieldWrapper } from '@/components/common/FormFieldWrapper';
import { TagInput } from '@/components/common/TagInput';
import type { Item } from '@/types';
import type { CreateItemPayload } from '@/api/itemApi';
import Button from '../common/Button';

interface ItemFormProps {
    item?: Item | null;
    isLoading?: boolean;
    prefilledCategory?: string;
    onSubmit: (data: CreateItemPayload) => void;
    onCancel: () => void;
}

export function ItemForm({ onSubmit, onCancel }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: '',
      text: '',
      priority: 'mid' as const,
      tags: [] as string[],
      categories: [''] as [string],
    },
    onSubmit: async ({ value }) => {
      // Validate on submit
      const result = itemFormSchema.safeParse(value);
      if (!result.success) {
        console.error('Validation failed:', result.error);
        return;
      }
      
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        children={(field) => (
          <FormFieldWrapper field={field} label="Name">
            <input
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g., Deploy new feature"
              className="w-full"
            />
          </FormFieldWrapper>
        )}
      />

      <form.Field
        name="text"
        children={(field) => (
          <FormFieldWrapper field={field} label="Description">
            <textarea
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              placeholder="Add more details here..."
              className="w-full"
            />
          </FormFieldWrapper>
        )}
      />

      <form.Field
        name="categories"
        mode="array"
        children={(field) => (
          <FormFieldWrapper field={field} label="Category">
            <input
              type="text"
              value={field.state.value[0] || ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange([e.target.value])}
              placeholder="e.g., Work or Personal"
              className="w-full"
            />
          </FormFieldWrapper>
        )}
      />

      <form.Field
        name="tags"
        children={(field) => (
          <FormFieldWrapper field={field} label="Tags">
            <TagInput
              value={field.state.value}
              onChange={(tags) => field.handleChange(tags)}
              placeholder="Type and press Enter or comma"
            />
          </FormFieldWrapper>
        )}
      />

      <form.Field
        name="priority"
        children={(field) => (
          <FormFieldWrapper field={field} label="Priority">
            <div className="flex gap-4">
              {(['high', 'mid', 'low'] as const).map((p) => (
                <label key={p} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={field.state.value === p}
                    onChange={() => field.handleChange(p)}
                    onBlur={field.handleBlur}
                  />
                  <span className="text-sm">{p.charAt(0).toUpperCase() + p.slice(1)}</span>
                </label>
              ))}
            </div>
          </FormFieldWrapper>
        )}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </Button>
          )}
        />
      </div>
    </form>
  );
}

export default ItemForm;