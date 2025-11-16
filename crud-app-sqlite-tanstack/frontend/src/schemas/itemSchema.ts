import { z } from 'zod';

export const itemFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z.string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high'], {
    errorMap: () => ({ message: 'Please select a priority' })
  }),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]),
});

export type ItemFormData = z.infer<typeof itemFormSchema>;