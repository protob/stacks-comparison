// src/lib/types/index.ts
export type Priority = 'low' | 'mid' | 'high';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type SingleCategory<T = number> = [T];

export interface Item {
  id: number;
  name: string;
  text: string;
  priority: Priority;
  isCompleted: boolean;
  slug: string;
  tags?: string[];
  categories: SingleCategory<number>;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  // In Vue this is SingleCategory<string>; keep same payload shape.
  categories: SingleCategory<string>;
}

export interface UpdateItemPayload extends Partial<CreateItemPayload> {
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorData {
  message: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };