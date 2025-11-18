<!-- src/lib/components/common/SchemaForm.svelte -->
<script lang="ts">
	import { z } from 'zod';
	import clsx from 'clsx';
	import SchemaField from './SchemaField.svelte';
	import Button from './Button.svelte';
	import { getBaseSchema } from '$lib/utils/schema-helpers';

	interface Props {
		schema: z.ZodTypeAny;
		value: Record<string, any>;
		onChange: (key: string, value: any) => void;
		layoutHints?: Record<string, any>;
		columns?: number;
		excludeFields?: string[];
		showErrors?: boolean;
		onSubmit?: (data: any) => void;
		onCancel?: () => void;
		children?: any;
		customFields?: any;
		footer?: any;
	}

	let {
		schema,
		value = {},
		onChange,
		layoutHints = {},
		columns = 1,
		excludeFields = ['id', 'slug', 'createdat', 'modifiedat', 'updatedAt', 'createdAt'],
		showErrors = true,
		onSubmit,
		onCancel,
		children,
		customFields,
		footer
	}: Props = $props();

	let errors = $state<Record<string, { message: string }>>({});
	let touchedFields = $state<Record<string, boolean>>({});

	const columnClass = $derived(() => {
		switch (columns) {
			case 1: return '';
			case 2: return 'md:grid-cols-2';
			case 3: return 'md:grid-cols-3';
			case 4: return 'md:grid-cols-4';
			default: return '';
		}
	});

	const sortedFieldKeys = $derived(() => {
		const baseSchema = getBaseSchema(schema);
		if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
			console.error('SchemaForm: Cannot compute sortedFields. Base schema is not a ZodObject.');
			return [];
		}

		const schemaShape = baseSchema.shape as Record<string, z.ZodTypeAny>;
		if (!schemaShape) {
			console.error('SchemaForm: Schema shape is undefined!');
			return [];
		}

		const keys = Object.keys(schemaShape);
		return keys.sort((keyA, keyB) => {
			const orderA = layoutHints[keyA]?.order ?? 999;
			const orderB = layoutHints[keyB]?.order ?? 999;
			return orderA - orderB;
		});
	});

	const shouldRenderField = (key: string): boolean => {
		const excluded = excludeFields.includes(key);
		const hidden = layoutHints[key]?.hidden;
		return !excluded && !hidden;
	};

	const getFieldSchema = (key: string): z.ZodTypeAny | undefined => {
		const baseSchema = getBaseSchema(schema);
		if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
			return undefined;
		}
		return baseSchema.shape[key];
	};

	const getLayoutHint = (key: string): Record<string, any> => {
		return layoutHints[key] || {};
	};

	const updateFieldValue = (key: string, fieldValue: any) => {
		touchedFields[key] = true;
		onChange(key, fieldValue);
		validateField(key, fieldValue);
	};

	const getFieldName = (key: string): string => {
		return layoutHints[key]?.label || key
			.replace(/_/g, ' ')
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
		if (!result.success) {
			errors[key] = { message: result.error.errors[0]?.message || 'Invalid value' };
		} else {
			delete errors[key];
		}
	};

	const validateForm = () => {
		errors = {};
		const parseResult = schema.safeParse(value);
		
		if (parseResult.success) {
			return { valid: true, data: parseResult.data };
		} else {
			const formattedErrors = parseResult.error.format();
			const errorMap: Record<string, { message: string }> = {};
			
			Object.entries(formattedErrors).forEach(([key, errorValue]) => {
				if (key === '_errors') return;
				
				if (errorValue && typeof errorValue === 'object' && '_errors' in errorValue) {
					if (Array.isArray(errorValue._errors) && errorValue._errors.length > 0) {
						errorMap[key] = { message: errorValue._errors[0] };
					}
				}
			});
			
			if (formattedErrors._errors?.length) {
				errorMap.form = { message: formattedErrors._errors[0] };
			}
			
			errors = errorMap;
			return { valid: false, errors: errorMap };
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const result = validateForm();
		if (result.valid && onSubmit) {
			onSubmit(result.data);
		}
	};

	// This is the function that gets passed to the footer snippet
	const submitForm = () => {
		console.log('submitForm called');
		const result = validateForm();
		if (result.valid && onSubmit) {
			console.log('Form is valid, calling onSubmit with:', result.data);
			onSubmit(result.data);
		} else {
			console.log('Form validation failed:', result);
		}
	};

	// Watch for changes in touched fields
	$effect(() => {
		Object.keys(touchedFields).forEach(key => {
			if (touchedFields[key] && Object.prototype.hasOwnProperty.call(value, key)) {
				validateField(key, value[key]);
			}
		});
	});
</script>

<form onsubmit={handleSubmit} class="space-y-5">
	<!-- Render children if provided -->
	{#if children}
		{@render children()}
	{/if}

	<div class={clsx('grid gap-x-4 gap-y-0 grid-cols-1', columnClass())}>
		{#each sortedFieldKeys() as key}
			{#if shouldRenderField(key)}
				<SchemaField
					name={key}
					schema={getFieldSchema(key)}
					value={value[key]}
					error={errors[key]?.message}
					layoutHint={getLayoutHint(key)}
					onChange={(fieldValue) => updateFieldValue(key, fieldValue)}
				/>
			{/if}
		{/each}
	</div>

	<!-- Render custom fields if provided -->
	{#if customFields}
		{@render customFields()}
	{/if}

	<!-- Error summary -->
	{#if showErrors && Object.keys(errors).length > 0}
		<div class="p-3 mt-4 text-red-300 border rounded bg-red-900/10 border-red-700/50">
			<h4 class="mb-1 font-medium">Please fix the following errors:</h4>
			<ul class="space-y-1 text-sm list-disc list-inside">
				{#each Object.entries(errors) as [field, error]}
					<li>
						{#if field === 'form'}
							{error.message}
						{:else}
							<span class="font-semibold">{getFieldName(field)}:</span> {error.message}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Footer -->
	<div class="flex justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
		{#if footer}
			{@render footer({ submit: submitForm })}
		{:else}
			<Button onclick={onCancel} variant="secondary">Cancel</Button>
			<Button type="submit" variant="primary" icon="Save">Save</Button>
		{/if}
	</div>
</form>
