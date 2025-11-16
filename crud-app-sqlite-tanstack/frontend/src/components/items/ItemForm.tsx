import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useAddItem, useUpdateItem } from '@/hooks/useItemsApi';
import type { Item, SingleCategory } from '@/types';
import Button from '../common/Button';

// Define Zod schema for form validation
const itemSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    text: z.string().min(1, 'Text is required'),
    priority: z.enum(['low', 'mid', 'high']),
    tags: z.array(z.string()),
    categories: z.tuple([z.string().min(1, "Category is required")]) as z.ZodType<SingleCategory<string>>,
});

interface ItemFormProps {
    item?: Item;
    onDone: () => void;
}

export default function ItemForm({ item, onDone }: ItemFormProps) {
    const addItem = useAddItem();
    const updateItem = useUpdateItem();

    const form = useForm({
        defaultValues: {
            name: item?.name || '',
            text: item?.text || '',
            priority: item?.priority || 'mid',
            tags: item?.tags || [],
            categories: item?.categories || [''],
        },
        validators: {
            onChange: itemSchema,
        },
        onSubmit: async ({ value }) => {
            if (item) {
                // Update logic
                updateItem.mutate({ categorySlug: item.categories[0], itemSlug: item.slug, payload: value });
            } else {
                // Create logic
                addItem.mutate(value);
            }
            onDone();
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
            <form.Field
                name="name"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name}>Name</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />
            
            <form.Field
                name="text"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name}>Text</label>
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            rows={3}
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />

            <form.Field
                name="categories"
                children={(field) => (
                    <div>
                        <label htmlFor={field.name}>Category</label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value[0]}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange([e.target.value])}
                        />
                        {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                    </div>
                )}
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onDone}>Cancel</Button>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? 'Saving...' : 'Save Item'}
                    </Button>
                  )}
                />
            </div>
        </form>
    );
}