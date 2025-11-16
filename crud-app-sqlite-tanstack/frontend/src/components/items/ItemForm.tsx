import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import type { Item, Priority, SingleCategory } from '@/types';
import type { CreateItemPayload } from '@/api/itemApi';
import Button from '../common/Button';

// Expanded Zod schema for full validation
const itemSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    text: z.string().min(1, 'Description is required'),
    priority: z.enum(['low', 'mid', 'high']),
    tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)), // Handle comma-separated tags
    categories: z.tuple([z.string().min(1, "Category is required")]) as z.ZodType<SingleCategory<string>>,
});

interface ItemFormProps {
    item?: Item | null | undefined;
    isLoading?: boolean;
    prefilledCategory?: string;
    onSubmit: (data: CreateItemPayload) => void;
    onCancel: () => void;
}

export default function ItemForm({ item, isLoading, onSubmit, onCancel }: ItemFormProps) {
    const form = useForm({
        defaultValues: {
            name: item?.name || '',
            text: item?.text || '',
            priority: item?.priority || 'mid',
            tags: item?.tags?.join(', ') || '',
            categories: item?.categories || [''],
        },
        validators: {
            onChange: ({ value }) => itemSchema.safeParse(value),
            onSubmit: ({ value }) => itemSchema.safeParse(value),
        },
        onSubmit: async ({ value }) => {
            const preparedPayload = {
                ...value,
                tags: value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                categories: [value.categories[0].trim()] as SingleCategory<string>,
            };
            onSubmit(preparedPayload);
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
            {/* Name Field */}
            <form.Field
                name="name"
                validators={{ onChange: itemSchema.shape.name }}
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full"
                            placeholder="e.g., Deploy new feature"
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />

            {/* Text/Description Field */}
            <form.Field
                name="text"
                validators={{ onChange: itemSchema.shape.text }}
                children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full"
                            rows={3}
                            placeholder="Add more details here..."
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />

            {/* Category Field */}
            <form.Field
                name="categories"
                validators={{ onChange: itemSchema.shape.categories }}
                 children={(field) => (
                    <div>
                        <label htmlFor="categories-input" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                        <input
                            id="categories-input"
                            name={field.name}
                            value={field.state.value[0]}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange([e.target.value])}
                            className="w-full"
                            placeholder="e.g., Work or Personal"
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />

            {/* Tags Field */}
            <form.Field
                name="tags"
                 children={(field) => (
                    <div>
                        <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Tags (comma-separated)</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full"
                            placeholder="e.g., urgent, frontend, bug"
                        />
                    </div>
                )}
            />

            {/* Priority Field */}
            <form.Field
                name="priority"
                children={(field) => (
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
                        <div className="flex items-center gap-4">
                            {(['high', 'mid', 'low'] as Priority[]).map((p) => (
                                <label key={p} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={field.name}
                                        checked={field.state.value === p}
                                        onChange={() => field.handleChange(p)}
                                        onBlur={field.handleBlur}
                                    />
                                <span className="capitalize">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            />

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting || isLoading}>
                      {isSubmitting || isLoading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
                    </Button>
                  )}
                />
            </div>
        </form>
    );
}