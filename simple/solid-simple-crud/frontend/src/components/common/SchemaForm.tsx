import { z } from 'zod';
import { splitProps } from 'solid-js';
import SchemaField from './SchemaField';
import Button from './Button';
import { getBaseSchema } from '@/utils/schema-helpers';

interface SchemaFormProps {
  schema: z.ZodTypeAny;
  value: Record<string, any>;
  onChange: (key: string, value: any) => void;
  layoutHints?: Record<string, any>;
  columns?: number;
  excludeFields?: string[];
  showErrors?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  children?: JSX.Element;
  customFields?: JSX.Element;
  footer?: (props: { submit: () => void }) => JSX.Element;
}

const SchemaForm = (props: SchemaFormProps) => {
  const [local, _] = splitProps(props, [
    'schema', 'value', 'onChange', 'layoutHints', 'columns', 'excludeFields',
    'showErrors', 'onSubmit', 'onCancel', 'children', 'customFields', 'footer'
  ]);

  const [errors, setErrors] = createStore<Record<string, { message: string }>>({});
  const [touchedFields, setTouchedFields] = createStore<Record<string, boolean>>({});

  const layoutHints = () => local.layoutHints || {};
  const columns = () => local.columns || 1;
  const excludeFields = () => local.excludeFields || ['id', 'slug', 'created_at', 'modified_at', 'updatedAt', 'createdAt'];
  const showErrors = () => local.showErrors ?? true;

  const columnClass = createMemo(() => {
    switch (columns()) {
      case 1: return '';
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      case 4: return 'md:grid-cols-4';
      default: return '';
    }
  });

  // Create a stable array of sorted field keys instead of object entries
  const sortedFieldKeys = createMemo(() => {
    const baseSchema = getBaseSchema(local.schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
      console.error("SchemaForm: Cannot compute sortedFields. Base schema is not a ZodObject.");
      return [];
    }
    const schemaShape = baseSchema.shape as Record<string, z.ZodTypeAny>;

    if (!schemaShape) {
      console.error("SchemaForm: Schema shape is undefined!");
      return [];
    }

    const keys = Object.keys(schemaShape);
    const hints = layoutHints();
    return keys.sort((keyA, keyB) => {
      const orderA = hints[keyA]?.order ?? 999;
      const orderB = hints[keyB]?.order ?? 999;
      return orderA - orderB;
    });
  });

  const shouldRenderField = (key: string): boolean => {
    const excluded = excludeFields().includes(key);
    const hidden = layoutHints()[key]?.hidden;
    return !excluded && !hidden;
  };

  const getFieldSchema = (key: string): z.ZodTypeAny | undefined => {
    const baseSchema = getBaseSchema(local.schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) return undefined;
    return baseSchema.shape[key];
  };

  const getLayoutHint = (key: string): Record<string, any> => {
    return layoutHints()[key] || {};
  };

  // Updated to use the key-value onChange pattern
  const updateFieldValue = (key: string, fieldValue: any) => {
    setTouchedFields(key, true);
    local.onChange(key, fieldValue);
    validateField(key, fieldValue);
  };

  const getFieldName = (key: string): string => {
    const hints = layoutHints();
    return hints[key]?.label ||
      key.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  const validateField = (key: string, fieldValue: any) => {
    const fieldSchema = getFieldSchema(key);
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(fieldValue);
    setErrors(key, result.success ? undefined : { message: result.error.errors[0]?.message || "Invalid value" });
  };

  const validateForm = () => {
    setErrors({});

    const parseResult = local.schema.safeParse(local.value);
    if (parseResult.success) {
      return { valid: true, data: parseResult.data };
    } else {
      const formattedErrors = parseResult.error.format();
      const errorMap: Record<string, { message: string }> = {};

      Object.entries(formattedErrors).forEach(([key, errorValue]) => {
        if (key === '_errors') return;
        if (errorValue && typeof errorValue === 'object' && '_errors' in errorValue && Array.isArray(errorValue._errors) && errorValue._errors.length > 0) {
          errorMap[key] = { message: errorValue._errors[0] };
        }
      });

      if (formattedErrors._errors?.length) {
        errorMap._form = { message: formattedErrors._errors[0] };
      }

      setErrors(errorMap);
      return { valid: false, errors: errorMap };
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const result = validateForm();
    if (result.valid && local.onSubmit) {
      local.onSubmit(result.data);
    }
  };

  const internalSubmit = () => {
    const result = validateForm();
    if (result.valid && local.onSubmit) {
      local.onSubmit(result.data);
    }
  };

  // Watch for value changes to validate touched fields
  createEffect(() => {
    Object.keys(touchedFields).forEach(key => {
      if (touchedFields[key] && Object.prototype.hasOwnProperty.call(local.value, key)) {
        validateField(key, local.value[key]);
      }
    });
  });

  return (
    <form onSubmit={handleSubmit} class="space-y-5">
      {/* Header slot */}
      {local.children}

      {/* Fields rendered in a grid layout */}
      <div class={clsx(
        'grid gap-x-4 gap-y-0',
        `grid-cols-1 ${columnClass()}`
      )}>
        {/* Schema-generated fields - Using stable keys array */}
        <For each={sortedFieldKeys()}>
          {(key) => (
            <Show when={shouldRenderField(key)}>
              <SchemaField
                name={key}
                schema={getFieldSchema(key)!}
                value={local.value[key]}
                error={errors[key]?.message}
                layoutHint={getLayoutHint(key)}
                onChange={(fieldValue) => updateFieldValue(key, fieldValue)}
              />
            </Show>
          )}
        </For>
      </div>

      {/* Custom fields slot */}
      {local.customFields}

      {/* Error summary block */}
      <Show when={showErrors() && Object.keys(errors).length > 0}>
        <div class="p-3 mt-4 text-red-300 border rounded bg-red-900/10 border-red-700/50">
          <h4 class="mb-1 font-medium">Please fix the following errors:</h4>
          <ul class="space-y-1 text-sm list-disc list-inside">
            <For each={Object.entries(errors)}>
              {([field, error]) => (
                <li>
                  <Show when={field === '_form'} fallback={
                    <>
                      <span class="font-semibold">{getFieldName(field)}:</span> {error.message}
                    </>
                  }>
                    {error.message}
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>

      {/* Footer with default or custom buttons */}
      <div class="flex justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
        <Show when={local.footer} fallback={
          <>
            <Button onClick={local.onCancel} variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary" icon="Save">Save</Button>
          </>
        }>
          {local.footer!({ submit: internalSubmit })}
        </Show>
      </div>
    </form>
  );
};

export default SchemaForm;