import { z } from 'zod';
import SchemaField from './SchemaField';
import Button from './Button';
import { getBaseSchema } from '@/utils/schema-helpers';

interface SchemaFormProps {
  schema: z.ZodTypeAny;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  layoutHints?: Record<string, any>;
  columns?: number;
  excludeFields?: string[];
  showErrors?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  customFields?: React.ReactNode;
  footer?: (props: { submit: () => void }) => React.ReactNode;
}

const SchemaForm = ({
  schema,
  value,
  onChange,
  layoutHints = {},
  columns = 1,
  excludeFields = ['id', 'slug', 'created_at', 'modified_at', 'updatedAt', 'createdAt'],
  showErrors = true,
  onSubmit,
  onCancel,
  children,
  customFields,
  footer
}: SchemaFormProps) => {
  const [errors, setErrors] = useState<Record<string, { message: string }>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const columnClass = useMemo(() => {
    switch (columns) {
      case 1: return '';
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      case 4: return 'md:grid-cols-4';
      default: return '';
    }
  }, [columns]);

  const sortedFields = useMemo(() => {
    const baseSchema = getBaseSchema(schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
      console.error("SchemaForm: Cannot compute sortedFields. Base schema is not a ZodObject.");
      return {};
    }
    const schemaShape = baseSchema.shape as Record<string, z.ZodTypeAny>;

    if (!schemaShape) {
      console.error("SchemaForm: Schema shape is undefined!");
      return {};
    }

    const entries = Object.entries(schemaShape);
    const sorted = entries.sort(([keyA], [keyB]) => {
      const orderA = layoutHints[keyA]?.order ?? 999;
      const orderB = layoutHints[keyB]?.order ?? 999;
      return orderA - orderB;
    });

    return sorted.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
  }, [schema, layoutHints]);

  const shouldRenderField = useCallback((key: string): boolean => {
    const excluded = excludeFields.includes(key);
    const hidden = layoutHints[key]?.hidden;
    return !excluded && !hidden;
  }, [excludeFields, layoutHints]);

  const getFieldSchema = useCallback((key: string): z.ZodTypeAny | undefined => {
    const baseSchema = getBaseSchema(schema);
    if (!baseSchema || !(baseSchema instanceof z.ZodObject)) return undefined;
    return baseSchema.shape[key];
  }, [schema]);

  const getLayoutHint = useCallback((key: string): Record<string, any> => {
    return layoutHints[key] || {};
  }, [layoutHints]);

  const updateFieldValue = useCallback((key: string, fieldValue: any) => {
    setTouchedFields(prev => new Set([...prev, key]));
    const updatedModel = { ...value, [key]: fieldValue };
    onChange(updatedModel);
    validateField(key, fieldValue);
  }, [value, onChange]);

  const getFieldName = useCallback((key: string): string => {
    return layoutHints[key]?.label ||
      key.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }, [layoutHints]);

  const validateField = useCallback((key: string, fieldValue: any) => {
    const fieldSchema = getFieldSchema(key);
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(fieldValue);
    setErrors(prev => {
      const currentErrors = { ...prev };
      if (!result.success) {
        const message = result.error.errors[0]?.message || "Invalid value";
        currentErrors[key] = { message };
      } else {
        delete currentErrors[key];
      }
      return currentErrors;
    });
  }, [getFieldSchema]);

  const validateForm = useCallback(() => {
    setErrors({});

    const parseResult = schema.safeParse(value);
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
  }, [schema, value]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm();
    if (result.valid && onSubmit) {
      onSubmit(result.data);
    }
  }, [validateForm, onSubmit]);

  const internalSubmit = useCallback(() => {
    const result = validateForm();
    if (result.valid && onSubmit) {
      onSubmit(result.data);
    }
  }, [validateForm, onSubmit]);

  // Watch for value changes to validate touched fields
  useEffect(() => {
    touchedFields.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        validateField(key, value[key]);
      }
    });
  }, [value, touchedFields, validateField]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Header slot */}
      {children}

      {/* Fields rendered in a grid layout */}
      <div className={clsx(
        'grid gap-x-4 gap-y-0',
        `grid-cols-1 ${columnClass}`
      )}>
        {/* Schema-generated fields */}
        {Object.entries(sortedFields).map(([key, field]) => 
          shouldRenderField(key) ? (
            <SchemaField
              key={key}
              name={key}
              schema={getFieldSchema(key)!}
              value={value[key]}
              error={errors[key]?.message}
              layoutHint={getLayoutHint(key)}
              onChange={(fieldValue) => updateFieldValue(key, fieldValue)}
            />
          ) : null
        )}
      </div>

      {/* Custom fields slot */}
      {customFields}

      {/* Error summary block */}
      {showErrors && Object.keys(errors).length > 0 && (
        <div className="p-3 mt-4 text-red-300 border rounded bg-red-900/10 border-red-700/50">
          <h4 className="mb-1 font-medium">Please fix the following errors:</h4>
          <ul className="space-y-1 text-sm list-disc list-inside">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                {field === '_form' ? (
                  error.message
                ) : (
                  <>
                    <span className="font-semibold">{getFieldName(field)}:</span> {error.message}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer with default or custom buttons */}
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
        {footer ? (
          footer({ submit: internalSubmit })
        ) : (
          <>
            <Button onClick={onCancel} variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary" icon="Save">Save</Button>
          </>
        )}
      </div>
    </form>
  );
};

export default SchemaForm;