import { z } from 'zod';
import { splitProps, createEffect, createSignal, Show, For } from 'solid-js';
import FormField from './FormField';
import TagInput from './TagInput';
import { unwrapZodType } from '@/utils/schema-helpers';
import clsx from 'clsx';

interface SchemaFieldProps {
  schema: z.ZodTypeAny;
  name: string;
  value: any;
  error?: string;
  layoutHint?: Record<string, any>;
  onChange: (value: any) => void;
}

const SchemaField = (props: SchemaFieldProps) => {
  const [local, _] = splitProps(props, [
    'schema', 'name', 'value', 'error', 'layoutHint', 'onChange'
  ]);

  const fieldId = `field-${local.name}`;
  const layoutHint = () => local.layoutHint || {};
  const baseSchema = () => unwrapZodType(local.schema);

  const fieldType = () => {
    const schema = baseSchema();
    if (!schema) {
      console.warn(`SchemaField: Schema is undefined for field '${local.name}'`);
      return 'unknown';
    }
    
    if (schema instanceof z.ZodString) return 'string';
    if (schema instanceof z.ZodNumber) return 'number';
    if (schema instanceof z.ZodBoolean) return 'boolean';
    if (schema instanceof z.ZodEnum) return 'enum';
    if (schema instanceof z.ZodArray) return 'array';
    if (schema instanceof z.ZodObject) return 'object';
    if (local.name.toLowerCase().includes('date') || (schema._def?.typeName === 'ZodDate')) return 'date';
    
    return 'unknown';
  };

  const effectiveFieldType = () => {
    const hint = layoutHint();
    const type = fieldType();
    
    if (hint?.widget === 'textarea' && type === 'string') {
      return 'textarea';
    }
    if (hint?.widget === 'select' && type === 'string') {
      if (hint?.options) return 'select-string-enum';
    }
    if (hint?.widget === 'select' && type === 'enum') {
      return 'enum';
    }
    if (type === 'array' && (hint?.widget === 'tag-input' || ['tags', 'categories'].includes(local.name.toLowerCase()))) {
      return 'tag-input';
    }
    
    return type;
  };

  const isRequired = () => {
    const originalSchema = local.schema;
    return !(
      originalSchema instanceof z.ZodOptional ||
      originalSchema instanceof z.ZodNullable ||
      originalSchema instanceof z.ZodDefault
    );
  };

  const formatEnumOption = (optionValue: string): string => {
    const hint = layoutHint();
    if (hint?.options) {
      const foundOption = hint.options.find((opt: {value: string, label: string}) => opt.value === optionValue);
      if (foundOption) return foundOption.label;
    }
    return optionValue.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const enumOptions = () => {
    const type = fieldType();
    const effectiveType = effectiveFieldType();
    const schema = baseSchema();
    const hint = layoutHint();
    
    if (type === 'enum') {
      if (schema instanceof z.ZodEnum) {
        return schema.options.map((opt: string) => ({ 
          value: opt, 
          label: formatEnumOption(opt) 
        }));
      }
    }
    if (effectiveType === 'select-string-enum' && hint?.options) {
      return hint.options;
    }
    return [];
  };

  const getLabel = (): string => {
    const hint = layoutHint();
    return hint?.label ||
      local.name.replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  const fieldClass = () => {
    const hint = layoutHint();
    if (hint?.colSpan === 2) return 'md:col-span-2';
    if (hint?.colSpan === 3) return 'md:col-span-3';
    return '';
  };

  const handleChange = (newValue: any) => {
    const effectiveType = effectiveFieldType();
    const required = isRequired();
    let processedValue = newValue;
    
    if ((effectiveType === 'enum' || effectiveType === 'select-string-enum') && !required && newValue === '') {
      processedValue = undefined;
    } else if (effectiveType === 'number') {
      const num = parseFloat(newValue);
      processedValue = isNaN(num) ? (required ? 0 : undefined) : num;
    }
    
    local.onChange(processedValue);
  };

  // Use local signals for input values
  const [localValue, setLocalValue] = createSignal(local.value || '');
  const [localChecked, setLocalChecked] = createSignal(!!local.value);
  const [localNumberValue, setLocalNumberValue] = createSignal(local.value || '');

  // Sync with external value changes
  createEffect(() => {
    setLocalValue(local.value || '');
    setLocalChecked(!!local.value);
    setLocalNumberValue(local.value || '');
  });

  const renderField = () => {
    const effectiveType = effectiveFieldType();
    const hint = layoutHint();
    const required = isRequired();
    const options = enumOptions();

    switch (effectiveType) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={hint?.rows || 3}
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'tag-input':
        return (
          <TagInput
            value={local.value || []}
            onChange={handleChange}
            placeholder={hint?.placeholder || 'Add items...'}
            error={local.error}
          />
        );

      case 'enum':
      case 'select-string-enum':
        return (
          <select
            id={fieldId}
            value={localValue()}
            onChange={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required={required}
            aria-invalid={!!local.error}
          >
            <Show when={!required}>
              <option value="">-- Optional --</option>
            </Show>
            <For each={options}>
              {(option) => (
                <option value={option.value}>
                  {option.label}
                </option>
              )}
            </For>
          </select>
        );

      case 'date':
        return (
          <input
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="date"
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'number':
        return (
          <input
            id={fieldId}
            value={localNumberValue()}
            onInput={(e) => {
              setLocalNumberValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="number"
            step={hint?.step || 'any'}
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      case 'boolean':
        return (
          <div class="flex items-center h-10">
            <input
              id={fieldId}
              checked={localChecked()}
              onChange={(e) => {
                setLocalChecked(e.currentTarget.checked);
                handleChange(e.currentTarget.checked);
              }}
              type="checkbox"
              class="w-4 h-4 rounded accent-blue-500 focus:ring-blue-500 border-neutral-600 bg-neutral-700"
              required={required}
              aria-invalid={!!local.error}
            />
          </div>
        );

      case 'string':
        return (
          <input
            id={fieldId}
            value={localValue()}
            onInput={(e) => {
              setLocalValue(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            type="text"
            class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={hint?.placeholder}
            required={required}
            aria-invalid={!!local.error}
          />
        );

      default:
        return (
          <div class="p-2 text-xs italic text-red-400 border rounded bg-neutral-800 border-red-700/50">
            Unsupported field type: {effectiveType} ({local.name})
          </div>
        );
    }
  };

  return (
    <FormField
      label={getLabel()}
      required={isRequired()}
      error={local.error}
      help={layoutHint()?.help}
      labelFor={fieldId}
      class={fieldClass()}
    >
      {renderField()}
    </FormField>
  );
};

export default SchemaField;