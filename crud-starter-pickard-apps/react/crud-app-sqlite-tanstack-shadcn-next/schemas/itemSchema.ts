import { z } from 'zod';
import type { Priority } from '@/types';

export const itemSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: z.string()
    .min(1, 'Description is required'),
  category: z.string()
    .min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high']) as z.ZodType<Priority>,
});

export type ItemFormData = z.infer<typeof itemSchema>;