import { z } from 'zod';
import { splitProps } from 'solid-js';
import Button from '../common/Button';
import SchemaForm from '../common/SchemaForm';
import type { Item, Priority } from '@/types';

interface ItemFormProps {
  item?: Item | null;
  isLoading?: boolean;
  prefilledCategory?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const priorityEnum = z.enum(['low', 'mid', 'high']).optional().default('mid');

const itemZodSchema = z.object({
  name: z.string().min(1, "Name is required."),
  text: z.string().min(1, "Description is required."),
  category: z.string().min(1, "Category is required."),
  priority: priorityEnum,
  tags: z.array(z.string()).optional().default([]),
  isCompleted: z.boolean().optional().default(false),
});

type ItemFormDataType = z.infer<typeof itemZodSchema>;

const ItemForm = (props: ItemFormProps) => {
  const [local, _] = splitProps(props, [
    'item', 'isLoading', 'prefilledCategory', 'onSubmit', 'onCancel'
  ]);

  // Use store for form data
  const [formData, setFormData] = createStore<Partial<ItemFormDataType>>({});

  // Layout hints for SchemaForm
  const layoutHints = createMemo(() => ({
    name: { 
      order: 10, 
      placeholder: "e.g., Buy groceries",
      label: "Item Name"
    },
    text: { 
      order: 20, 
      widget: "textarea", 
      rows: 4, 
      placeholder: "Add more details about this item...",
      label: "Description"
    },
    category: { 
      order: 30, 
      label: "Category", 
      placeholder: "e.g., Work, Personal, Shopping" 
    },
    priority: {
      order: 40,
      widget: "select",
      label: "Priority (optional)",
      options: [
        { value: 'low', label: 'Low' },
        { value: 'mid', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
    },
    tags: { 
      order: 50, 
      widget: "tag-input", 
      placeholder: "Add tags...",
      label: "Tags (optional)"
    },
    isCompleted: { 
      order: 60, 
      label: "Mark as completed",
      hidden: !local.item
    },
  }));

  // Initialize form data when props change
  createEffect(() => {
    if (local.item) {
      // Editing existing item
      setFormData({
        name: local.item.name || '',
        text: local.item.text || '',
        category: local.item.categories[0] || '',
        priority: local.item.priority || 'mid',
        tags: Array.isArray(local.item.tags) ? [...local.item.tags] : [],
        isCompleted: !!local.item.isCompleted,
      });
    } else {
      // Creating new item
      setFormData({
        name: '',
        text: '',
        category: local.prefilledCategory || '',
        priority: 'mid',
        tags: [],
        isCompleted: false,
      });
    }
  });

  const handleSubmit = (validatedData: ItemFormDataType) => {
    const submissionPayload: any = {
      name: validatedData.name,
      text: validatedData.text,
      priority: validatedData.priority || 'mid',
      tags: validatedData.tags || [],
      categories: validatedData.category ? [validatedData.category.trim()] : [],
    };
    
    // Only include isCompleted for existing items
    if (local.item) {
      submissionPayload.isCompleted = validatedData.isCompleted;
    }
    
    local.onSubmit(submissionPayload);
  };

  // Update form data using store setter
  const handleFormDataChange = (key: string, value: any) => {
    setFormData(key, value);
  };

  return (
    <SchemaForm
      schema={itemZodSchema}
      value={formData}
      onChange={handleFormDataChange}
      layoutHints={layoutHints()}
      columns={1}
      onSubmit={handleSubmit}
      onCancel={local.onCancel}
      showErrors={true}
      footer={({ submit }) => (
        <div class="flex justify-end pt-4 space-x-3">
          <Button type="button" variant="secondary" onClick={local.onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={local.isLoading}
            onClick={submit}
            icon={local.item?.id ? 'Save' : 'Plus'}
          >
            {local.item?.id ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      )}
    />
  );
};

export default ItemForm;