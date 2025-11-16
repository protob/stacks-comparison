import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { itemFormSchema } from '@/schemas/itemSchema';
import { FormFieldWrapper } from '@/components/common/FormFieldWrapper';
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
    validators: {
      onChange: zodValidator({ schema: itemFormSchema }),
    },
    onSubmit: async ({ value }) => {
      console.log('FORM SUBMITTED!', value);
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
          <FormFieldWrapper field={field} label="Tags (comma-separated)">
            <input
              type="text"
              value={field.state.value?.join(', ') || ''}
              onBlur={field.handleBlur}
              onChange={(e) => 
                field.handleChange(
                  e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                )
              }
              placeholder="e.g., urgent, frontend"
              className="w-full"
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
                    onChange={() => field.handleChange(p as any)}
                    onBlur={field.handleBlur}
                  />
                  <span className="text-sm">{p.charAt(0).toUpperCase() + p.slice(1)}</span>
                </label>
              ))}
            </div>
          </FormFieldWrapper>
        )}
      />

      {/* Add this RIGHT BEFORE the submit button */}
      <div>
        {console.log('=== FORM STATE ===', {
          canSubmit: form.state.canSubmit,
          isSubmitting: form.state.isSubmitting,
          isValid: form.state.isValid,
          isDirty: form.state.isDirty,
          errors: form.state.errors,
          fieldMeta: form.state.fieldMeta,
          values: form.state.values,
        })}
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!form.state.canSubmit || form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Adding...' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}

export default ItemForm;