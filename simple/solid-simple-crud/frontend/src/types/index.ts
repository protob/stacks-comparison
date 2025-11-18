// frontends/solid/src/types/index.ts

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
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: number;
}

export interface ItemTree {
  [categorySlug: string]: Item[];
}

// API Payload Types - Single Source of Truth
export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
    isCompleted?: boolean;
    categories?: SingleCategory<string>;
};