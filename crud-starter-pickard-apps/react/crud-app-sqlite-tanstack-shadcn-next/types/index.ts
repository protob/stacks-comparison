import type { LucideIcon } from 'lucide-react';

export type IconName = LucideIcon | string;
export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T> = [T];

export interface Item {
  id: string;
  slug: string;
  name: string;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  tags: string[];
  categories: SingleCategory<string>;
  createdAt: string;
  updatedAt: string;
  isEditing?: boolean;
  // Helpers for the frontend logic
  categorySlug?: string; 
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';