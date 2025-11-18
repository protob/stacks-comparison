<!-- src/lib/components/items/ItemForm.svelte -->
<script lang="ts">
	import z from 'zod';
	import Button from '../common/Button.svelte';
	import SchemaForm from '../common/SchemaForm.svelte';
	import type { Item, Priority } from '$lib/types';

	interface Props {
		item?: Item | null;
		isLoading?: boolean;
		prefilledCategory?: string;
		onSubmit: (data: any) => void;
		onCancel: () => void;
	}

	let { item, isLoading = false, prefilledCategory = '', onSubmit, onCancel }: Props = $props();

	// Zod schema for the form
	const priorityEnum = z.enum(['low', 'mid', 'high']).optional().default('mid');
	const itemZodSchema = z.object({
		name: z.string().min(1, 'Name is required.'),
		text: z.string().min(1, 'Description is required.'),
		category: z.string().min(1, 'Category is required.'),
		priority: priorityEnum,
		tags: z.array(z.string()).optional().default([]),
		isCompleted: z.boolean().optional().default(false)
	});

	type ItemFormDataType = z.infer<typeof itemZodSchema>;

	// Form data state
	let formData = $state<Partial<ItemFormDataType>>({});

	// Layout hints for SchemaForm
	const layoutHints = $derived(() => ({
		name: {
			order: 10,
			placeholder: 'e.g., Buy groceries',
			label: 'Item Name'
		},
		text: {
			order: 20,
			widget: 'textarea',
			rows: 4,
			placeholder: 'Add more details about this item...',
			label: 'Description'
		},
		category: {
			order: 30,
			label: 'Category',
			placeholder: 'e.g., Work, Personal, Shopping'
		},
		priority: {
			order: 40,
			widget: 'select',
			label: 'Priority (optional)',
			options: [
				{ value: 'low', label: 'Low' },
				{ value: 'mid', label: 'Medium' },
				{ value: 'high', label: 'High' }
			]
		},
		tags: {
			order: 50,
			widget: 'tag-input',
			placeholder: 'Add tags...',
			label: 'Tags (optional)'
		},
		isCompleted: {
			order: 60,
			label: 'Mark as completed',
			hidden: !item
		}
	}));

	// Initialize form data when props change
	$effect(() => {
		if (item) {
			// Editing existing item
			formData = {
				name: item.name || '',
				text: item.text || '',
				category: item.categories[0] || '',
				priority: (item.priority || 'mid') as 'low' | 'mid' | 'high',
				tags: Array.isArray(item.tags) ? [...item.tags] : [],
				isCompleted: !!item.isCompleted
			};
		} else {
			// Creating new item
			formData = {
				name: '',
				text: '',
				category: prefilledCategory || '',
				priority: 'mid',
				tags: [],
				isCompleted: false
			};
		}
	});

	const handleSubmit = (validatedData: ItemFormDataType) => {
		console.log('ItemForm handleSubmit called with:', validatedData);
		
		const submissionPayload: any = {
			name: validatedData.name,
			text: validatedData.text,
			priority: validatedData.priority || 'mid',
			tags: validatedData.tags || [],
			categories: validatedData.category ? [validatedData.category.trim()] : []
		};

		// Only include isCompleted for existing items
		if (item) {
			submissionPayload.isCompleted = validatedData.isCompleted;
		}

		console.log('ItemForm submitting payload:', submissionPayload);
		onSubmit(submissionPayload);
	};

	// Update form data using store setter
	const handleFormDataChange = (key: string, value: any) => {
		formData = { ...formData, [key]: value };
	};

	const handleCancel = () => {
		console.log('ItemForm cancel clicked');
		onCancel();
	};
</script>

<SchemaForm
	schema={itemZodSchema}
	value={formData}
	onChange={handleFormDataChange}
	layoutHints={layoutHints}
	columns={1}
	onSubmit={handleSubmit}
	onCancel={handleCancel}
	showErrors={true}
>
	{#snippet footer({ submit })}
		<div class="flex justify-end pt-6 space-x-3 border-t border-neutral-700 mt-6">
			<Button 
				variant="secondary" 
				onclick={handleCancel}
				class="min-w-[100px]"
			>
				Cancel
			</Button>
			<Button 
				variant="primary" 
				loading={isLoading} 
				onclick={() => {
					console.log('Update button clicked, calling submit function');
					submit();
				}}
				icon={item?.id ? 'Save' : 'Plus'}
				class="min-w-[160px]"
			>
				{item?.id ? 'Update Item' : 'Create Item'}
			</Button>
		</div>
	{/snippet}
</SchemaForm>
