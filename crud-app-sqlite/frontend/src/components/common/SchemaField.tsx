import { z } from 'zod';
import { useMemo, useCallback } from 'react';
import FormField from './FormField';
import TagInput from './TagInput';
import { unwrapZodType } from '@/utils/schema-helpers';

interface SchemaFieldProps {
  schema: z.ZodTypeAny;
  name: string;
  value: any;
  error?: string;
  layoutHint?: Record<string, any>;
  onChange: (value: any) => void;
}

const SchemaField = ({ schema, name, value, error, layoutHint = {}, onChange }: SchemaFieldProps) => {
  const fieldId = useMemo(() => `field-${name}`, [name]);
  const baseSchema = useMemo(() => unwrapZodType(schema), [schema]);

  const fieldType = useMemo(() => {
    if (!baseSchema) {
      console.warn(`SchemaField: Schema is undefined for field '${name}'`);
      return 'unknown';
    }
    if (baseSchema instanceof z.ZodString) return 'string';
    if (baseSchema instanceof z.ZodNumber) return 'number';
    if (baseSchema instanceof z.ZodBoolean) return 'boolean';
    if (baseSchema instanceof z.ZodEnum) return 'enum';
    if (baseSchema instanceof z.ZodArray) return 'array';
    if (baseSchema instanceof z.ZodObject) return 'object';
    if (name.toLowerCase().includes('date') || (baseSchema._def?.typeName === 'ZodDate')) return 'date';

    console.warn(`SchemaField: Unknown Zod type for field '${name}'. Schema definition:`, baseSchema._def);
    return 'unknown';
  }, [baseSchema, name]);

  const effectiveFieldType = useMemo(() => {
    if (layoutHint?.widget === 'textarea' && fieldType === 'string') {
      return 'textarea';
    }
    if (layoutHint?.widget === 'select' && fieldType === 'string') {
      if (layoutHint?.options) return 'select-string-enum';
    }
    if (layoutHint?.widget === 'select' && fieldType === 'enum') {
      return 'enum';
    }
    return fieldType;
  }, [fieldType, layoutHint]);

  const isRequired = useMemo(() => {
    const originalSchema = schema;
    return !(
      originalSchema instanceof z.ZodOptional ||
      originalSchema instanceof z.ZodNullable ||
      originalSchema instanceof z.ZodDefault
    );
  }, [schema]);

  // Move formatEnumOption before enumOptions to fix hoisting issue
  const formatEnumOption = useCallback((optionValue: string): string => {
    if (layoutHint?.options) {
      const foundOption = layoutHint.options.find((opt: {value: string, label: string}) => opt.value === optionValue);
      if (foundOption) return foundOption.label;
    }
    return optionValue.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [layoutHint]);

  const enumOptions = useMemo(() => {
    if (fieldType === 'enum') {
      if (baseSchema instanceof z.ZodEnum) {
        return baseSchema.options.map((opt: string) => ({ 
          value: opt, 
          label: formatEnumOption(opt) 
        }));
      }
    }
    if (effectiveFieldType === 'select-string-enum' && layoutHint?.options) {
      return layoutHint.options;
    }
    return [];
  }, [fieldType, effectiveFieldType, baseSchema, layoutHint, formatEnumOption]);

  const useTagInput = useMemo(() => {
    return fieldType === 'array' && (
      layoutHint?.widget === 'tag-input' || 
      ['tags', 'categories'].includes(name.toLowerCase())
    );
  }, [fieldType, layoutHint, name]);

  const getLabel = useCallback((): string => {
    return layoutHint?.label ||
      name.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }, [layoutHint, name]);

  const fieldClass = useMemo(() => {
    if (layoutHint?.colSpan === 2) return 'md:col-span-2';
    if (layoutHint?.colSpan === 3) return 'md:col-span-3';
    return '';
  }, [layoutHint]);

  const handleChange = useCallback((newValue: any) => {
    let processedValue = newValue;
    
    if ((effectiveFieldType === 'enum' || effectiveFieldType === 'select-string-enum') && !isRequired && newValue === '') {
      processedValue = undefined;
    } else if (effectiveFieldType === 'number') {
      const num = parseFloat(newValue);
      processedValue = isNaN(num) ? (isRequired ? 0 : undefined) : num;
    }
    
    onChange(processedValue);
  }, [effectiveFieldType, isRequired, onChange]);

  const normalizedValue = useMemo(() => {
    if ((effectiveFieldType === 'string' || effectiveFieldType === 'textarea' || effectiveFieldType === 'date') && (value === null || value === undefined)) {
      return '';
    }
    if (effectiveFieldType === 'number' && (value === null || value === undefined || value === '')) {
      return null;
    }
    if ((effectiveFieldType === 'enum' || effectiveFieldType === 'select-string-enum') && !isRequired && (value === null || value === undefined)) {
      return '';
    }
    if (effectiveFieldType === 'boolean') {
      return !!value;
    }
    if (useTagInput) {
      return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
    }
    return value;
  }, [value, effectiveFieldType, isRequired, useTagInput]);

  const renderField = () => {
    switch (effectiveFieldType) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            value={normalizedValue}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full border rounded-none bg-surface border-border text-text-primary"
            rows={layoutHint?.rows || 3}
            placeholder={layoutHint?.placeholder}
            required={isRequired}
            aria-invalid={!!error}
          />
        );

      case 'array':
        if (useTagInput) {
          return (
            <TagInput
              value={normalizedValue}
              onChange={handleChange}
              placeholder={layoutHint?.placeholder || 'Add items...'}
              error={error}
            />
          );
        }
        break;

      case 'enum':
      case 'select-string-enum':
        return (
          <select
            id={fieldId}
            value={normalizedValue}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full border rounded-none bg-surface border-border text-text-primary"
            required={isRequired}
            aria-invalid={!!error}
          >
            {!isRequired && <option value="">-- Optional --</option>}
            {enumOptions.map((option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            id={fieldId}
            value={normalizedValue}
            onChange={(e) => handleChange(e.target.value)}
            type="date"
            className="w-full border rounded-none bg-surface border-border text-text-primary"
            required={isRequired}
            aria-invalid={!!error}
          />
        );

      case 'number':
        return (
          <input
            id={fieldId}
            value={normalizedValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            type="number"
            step={layoutHint?.step || 'any'}
            className="w-full border rounded-none bg-surface border-border text-text-primary"
            placeholder={layoutHint?.placeholder}
            required={isRequired}
            aria-invalid={!!error}
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center h-10">
            <input
              id={fieldId}
              checked={normalizedValue}
              onChange={(e) => handleChange(e.target.checked)}
              type="checkbox"
              className="w-4 h-4 rounded-sm accent-blue-500 focus:ring-blue-500 border-border bg-surface"
              required={isRequired}
              aria-invalid={!!error}
            />
          </div>
        );

      case 'string':
        return (
          <input
            id={fieldId}
            value={normalizedValue}
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            className="w-full border rounded-none bg-surface border-border text-text-primary"
            placeholder={layoutHint?.placeholder}
            required={isRequired}
            aria-invalid={!!error}
          />
        );

      default:
        return (
          <div className="p-card text-size-xs italic text-danger border rounded-none bg-surface border-danger">
            Unsupported field type: {effectiveFieldType} ({name})
          </div>
        );
    }
  };

  return (
    <FormField
      label={getLabel()}
      required={isRequired}
      error={error}
      help={layoutHint?.help}
      labelFor={fieldId}
      className={fieldClass}
    >
      {renderField()}
    </FormField>
  );
};

export default SchemaField;