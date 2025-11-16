import { z } from 'zod';
import Button from '../common/Button';
import SchemaForm from '../common/SchemaForm';
import type { Item } from '@/types';

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

const ItemForm = ({ item, isLoading = false, prefilledCategory = '', onSubmit, onCancel }: ItemFormProps) => {
  const [formData, setFormData] = useState<Partial<ItemFormDataType>>({});

  // Layout hints for SchemaForm
  const layoutHints = useMemo(() => ({
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
      hidden: !item
    },
  }), [item]);

  // Initialize form data when props change
  useEffect(() => {
    if (item) {
      // Editing existing item
      setFormData({
        name: item.name,
        text: item.text,
        category: item.categories[0] || '',
        priority: item.priority,
        tags: [...(item.tags || [])],
        isCompleted: item.isCompleted,
      });
    } else {
      // Creating new item
      setFormData({
        name: '',
        text: '',
        category: prefilledCategory || '',
        priority: 'mid',
        tags: [],
        isCompleted: false,
      });
    }
  }, [item, prefilledCategory]);

  const handleSubmit = useCallback((validatedData: ItemFormDataType) => {
    const submissionPayload: any = {
      name: validatedData.name,
      text: validatedData.text,
      priority: validatedData.priority || 'mid',
      tags: validatedData.tags || [],
      categories: validatedData.category ? [validatedData.category.trim()] : [],
    };
    
    // Only include isCompleted for existing items
    if (item) {
      submissionPayload.isCompleted = validatedData.isCompleted;
    }
    
    onSubmit(submissionPayload);
  }, [item, onSubmit]);

  return (
    <SchemaForm
      schema={itemZodSchema}
      value={formData}
      onChange={setFormData}
      layoutHints={layoutHints}
      columns={1}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      showErrors={true}
      footer={({ submit }) => (
        <div className="flex justify-end pt-4 space-x-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={isLoading}
            onClick={submit}
            icon={item?.id ? 'Save' : 'Plus'}
          >
            {item?.id ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      )}
    />
  );
};

export default ItemForm;