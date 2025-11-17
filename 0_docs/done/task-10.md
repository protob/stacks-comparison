Based on the web research and codebase analysis, here are the literal TODO tasks for an AI agent to fix the issues:

## TODO Tasks for Fixing TanStack Form Validation Issues

### Task 1: Create Missing Form Components
**File:** `src/components/items/ItemForm.tsx` (File appears to be referenced but not provided)
- [ ] Verify if ItemForm.tsx exists
- [ ] If it doesn't exist, create it with proper TanStack Form implementation
- [ ] Ensure it uses `@tanstack/react-form` hook correctly

### Task 2: Fix Zod Adapter Error Display Issue
**File:** Create/update the form field rendering logic

**Problem:** The `[object Object]` error occurs when TanStack Form with Zod returns error objects instead of strings. According to the research:
- TanStack Form's zod adapter joins multiple errors with commas by default
- The error might be an object instead of a string when using custom error mappers
- `field.state.meta.errors` is an array of `ValidationError` which can be strings or objects

**Solution:**
```tsx
// In ItemForm.tsx or wherever the form fields are rendered
// Instead of directly displaying field.state.meta.errors[0]
// Do this:

const getErrorMessage = (error: ValidationError): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object') {
    return error.toString();
  }
  return 'Validation error';
};

// When rendering errors:
{field.state.meta.errors.length > 0 && (
  <div className="text-danger text-size-sm">
    {field.state.meta.errors.map((error, i) => (
      <div key={i}>{getErrorMessage(error)}</div>
    ))}
  </div>
)}
```

### Task 3: Fix Submit Button Disabled State
**File:** ItemForm.tsx or wherever the submit button is rendered

**Problem:** The submit button remains disabled even when all fields are filled. This typically happens when:
- Form validation state isn't properly checked
- The `canSubmit` property isn't correctly evaluated
- Field-level validation errors aren't cleared after valid input

**Solution:**
```tsx
// In the form component, properly check the canSubmit state
const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as Priority,
    tags: [] as string[],
    categories: [''] as SingleCategory<string>,
  },
  validators: {
    // Use onBlur or onChange for better UX
    onBlur: zodValidator({ schema: yourZodSchema }),
  },
  onSubmit: async ({ value }) => {
    // handle submission
  },
});

// For the submit button:
<Button
  type="submit"
  disabled={!form.state.canSubmit || form.state.isSubmitting}
>
  {form.state.isSubmitting ? 'Submitting...' : 'Add Item'}
</Button>
```

### Task 4: Implement Proper Field-Level Validation Display
**File:** Create a reusable FormField component

**Problem:** Validation should only show errors for touched/blurred fields, not all fields at once.

**Solution:**
```tsx
// Create src/components/common/FormFieldWrapper.tsx
import { FieldApi } from '@tanstack/react-form';

interface FormFieldWrapperProps {
  field: FieldApi<any, any, any, any>;
  label: string;
  children: React.ReactNode;
}

export function FormFieldWrapper({ field, label, children }: FormFieldWrapperProps) {
  const { isTouched, isBlurred, errors } = field.state.meta;
  
  // Only show errors if field has been touched/blurred
  const shouldShowError = (isTouched || isBlurred) && errors.length > 0;
  
  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    return JSON.stringify(error);
  };
  
  return (
    <div className="mb-4">
      <label className="block text-text-primary font-medium mb-2">
        {label}
      </label>
      {children}
      {shouldShowError && (
        <div className="text-danger text-size-sm mt-1">
          {errors.map((error, i) => (
            <div key={i}>{getErrorMessage(error)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Task 5: Create Zod Schema with Proper Error Messages
**File:** Create `src/schemas/itemSchema.ts`

```tsx
import { z } from 'zod';

export const itemFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z.string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high'], {
    errorMap: () => ({ message: 'Please select a priority' })
  }),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]),
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
```

### Task 6: Implement Form with TanStack Form Best Practices
**File:** Update/create ItemForm.tsx with complete implementation

```tsx
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { itemFormSchema } from '@/schemas/itemSchema';
import { FormFieldWrapper } from '@/components/common/FormFieldWrapper';
import type { CreateItemPayload } from '@/api/itemApi';

export function ItemForm({ onSubmit, onCancel }: {
  onSubmit: (data: CreateItemPayload) => Promise<void>;
  onCancel: () => void;
}) {
  const form = useForm({
    defaultValues: {
      name: '',
      text: '',
      priority: 'mid' as const,
      tags: [],
      categories: [''] as [string],
    },
    validators: {
      onBlur: zodValidator({ schema: itemFormSchema }),
    },
    onSubmit: async ({ value }) => {
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
                    onChange={() => field.handleChange(p)}
                    onBlur={field.handleBlur}
                  />
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </label>
              ))}
            </div>
          </FormFieldWrapper>
        )}
      />

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
```

### Task 7: Debug and Test
- [ ] Add console logging to see the actual error structure:
```tsx
console.log('Field errors:', field.state.meta.errors);
console.log('Form state:', form.state);
```
- [ ] Test form submission with both valid and invalid data
- [ ] Verify that errors appear only after field blur/touch
- [ ] Confirm submit button enables/disables correctly

### Task 8: Update Dependencies (if needed)
**File:** `package.json`

- [ ] Ensure `@tanstack/react-form` is at least version 0.33.0 (latest stable)
- [ ] Ensure `@tanstack/zod-form-adapter` is at version compatible with your Zod version
- [ ] Run `bun install` to update dependencies

### Priority Order:
1. Task 2 (Fix error display)
2. Task 5 (Create proper schema)
3. Task 4 (Create FormFieldWrapper)
4. Task 6 (Implement complete form)
5. Task 3 (Fix submit button)
6. Task 7 (Debug and test)

The core issue is that TanStack Form with Zod can return error objects that need proper handling for display, and the `canSubmit` state needs to be correctly evaluated based on the validation strategy used.