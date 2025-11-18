import type { LucideIcon } from 'lucide-react';

export type IconName = LucideIcon | string;
export type Priority = 'low' | 'medium' | 'high';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  slug: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';