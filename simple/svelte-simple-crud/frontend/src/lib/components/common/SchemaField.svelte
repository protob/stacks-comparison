<script lang="ts">
	import { z } from 'zod';
	import FormField from './FormField.svelte';
	import TagInput from './TagInput.svelte';
	import { unwrapZodType } from '$lib/utils/schema-helpers';

	interface Props {
		schema: z.ZodTypeAny;
		name: string;
		value: any;
		error?: string;
		layoutHint?: Record<string, any>;
		onChange: (value: any) => void;
	}

	let { schema, name, value, error, layoutHint, onChange }: Props = $props();

	const fieldId = $derived(`field-${name}`);
	const baseSchema = $derived(() => unwrapZodType(schema));

	const fieldType = $derived(() => {
		const schema = baseSchema();
		if (!schema) {
			console.warn(`SchemaField: Schema is undefined for field ${name}`);
			return 'unknown';
		}

		if (schema instanceof z.ZodString) return 'string';
		if (schema instanceof z.ZodNumber) return 'number';
		if (schema instanceof z.ZodBoolean) return 'boolean';
		if (schema instanceof z.ZodEnum) return 'enum';
		if (schema instanceof z.ZodArray) return 'array';
		if (schema instanceof z.ZodObject) return 'object';

		if (name.toLowerCase().includes('date') || (schema as any).def?.typeName === 'ZodDate') {
			return 'date';
		}

		console.warn(`SchemaField: Unknown Zod type for field ${name}. Schema definition:`, (schema as any).def);
		return 'unknown';
	});

	const effectiveFieldType = $derived(() => {
		if (layoutHint?.widget === 'textarea' && fieldType() === 'string') return 'textarea';
		if (layoutHint?.widget === 'select' && fieldType() === 'string') {
			if (layoutHint?.options) return 'select-string-enum';
		}
		if (layoutHint?.widget === 'select' && fieldType() === 'enum') return 'enum';
		if (fieldType() === 'array' && (layoutHint?.widget === 'tag-input' || ['tags', 'categories'].includes(name.toLowerCase()))) {
			return 'tag-input';
		}
		return fieldType();
	});

	const isRequired = $derived(() => {
		const originalSchema = schema;
		return !(
			originalSchema instanceof z.ZodOptional ||
			originalSchema instanceof z.ZodNullable ||
			originalSchema instanceof z.ZodDefault
		);
	});

	const enumOptions = $derived(() => {
		if (fieldType() === 'enum') {
			const schema = baseSchema();
			if (schema instanceof z.ZodEnum) {
				return schema.options.map((opt: string) => ({
					value: opt,
					label: formatEnumOption(opt)
				}));
			}
		}
		if (effectiveFieldType() === 'select-string-enum' && layoutHint?.options) {
			return layoutHint.options;
		}
		return [];
	});

	const getLabel = (): string => {
		return layoutHint?.label || name
			.replace(/_/g, ' ')
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const formatEnumOption = (optionValue: string): string => {
		if (layoutHint?.options) {
			const foundOption = layoutHint.options.find((opt: { value: string; label: string }) => opt.value === optionValue);
			if (foundOption) return foundOption.label;
		}
		return optionValue
			.replace(/_/g, ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const fieldClass = $derived(() => {
		if (layoutHint?.colSpan === 2) return 'md:col-span-2';
		if (layoutHint?.colSpan === 3) return 'md:col-span-3';
		return '';
	});

	const handleChange = (newValue: any) => {
		const effectiveType = effectiveFieldType();
		const required = isRequired();
		let processedValue = newValue;

		if ((effectiveType === 'enum' || effectiveType === 'select-string-enum') && !required && newValue === '') {
			processedValue = undefined;
		} else if (effectiveType === 'number') {
			const num = parseFloat(newValue as string);
			processedValue = isNaN(num) ? (required ? 0 : undefined) : num;
		}

		onChange(processedValue);
	};

	// Initialize value properly for arrays
	$effect(() => {
		if (effectiveFieldType() === 'tag-input' && !Array.isArray(value)) {
			onChange([]);
		}
	});

	// Local reactive values for form inputs
	let localValue = $state(value || '');
	let localChecked = $state(!!value);
	let localNumberValue = $state(value || '');
	let localArrayValue = $state<string[]>(Array.isArray(value) ? value : []);

	// Sync with external value changes
	$effect(() => {
		localValue = value || '';
		localChecked = !!value;
		localNumberValue = value || '';
		localArrayValue = Array.isArray(value) ? value : [];
	});
</script>

<FormField
	label={getLabel()}
	required={isRequired()}
	error={error}
	help={layoutHint?.help}
	labelFor={fieldId}
	class={fieldClass()}
>
	{#if effectiveFieldType() === 'textarea'}
		<textarea
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			rows={layoutHint?.rows || 3}
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		></textarea>
	{:else if effectiveFieldType() === 'tag-input'}
		<TagInput
			bind:value={localArrayValue}
			onChange={handleChange}
			placeholder={layoutHint?.placeholder || 'Add items...'}
			error={error}
		/>
	{:else if effectiveFieldType() === 'enum' || effectiveFieldType() === 'select-string-enum'}
		<select
			id={fieldId}
			bind:value={localValue}
			onchange={(e) => handleChange(e.currentTarget.value)}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			required={isRequired()}
			aria-invalid={!!error}
		>
			{#if !isRequired()}
				<option value="">-- Optional --</option>
			{/if}
			{#each enumOptions() as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else if effectiveFieldType() === 'date'}
		<input
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="date"
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else if effectiveFieldType() === 'number'}
		<input
			id={fieldId}
			bind:value={localNumberValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="number"
			step={layoutHint?.step || 'any'}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else if effectiveFieldType() === 'boolean'}
		<div class="flex items-center h-10">
			<input
				id={fieldId}
				bind:checked={localChecked}
				onchange={(e) => handleChange(e.currentTarget.checked)}
				type="checkbox"
				class="w-4 h-4 rounded accent-blue-500 focus:ring-blue-500 border-neutral-600 bg-neutral-700"
				required={isRequired()}
				aria-invalid={!!error}
			/>
		</div>
	{:else if effectiveFieldType() === 'string'}
		<input
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="text"
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else}
		<div class="p-2 text-xs italic text-red-400 border rounded bg-neutral-800 border-red-700/50">
			Unsupported field type: {effectiveFieldType()} ({name})
		</div>
	{/if}
</FormField>
