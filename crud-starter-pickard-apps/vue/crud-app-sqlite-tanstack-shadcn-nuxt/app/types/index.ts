export type Priority = "low" | "mid" | "high";
export type NotificationType = "success" | "error" | "warning" | "info";

export type SingleCategory<T = string> = [T];

export interface Item {
  id: string;
  name: string;
  text: string;
  priority: Priority;
  isCompleted: boolean;
  slug: string;
  tags?: string[];
  categories: string[];
  categorySlug: string; // ADD THIS - the category slug from the tree key
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
  categories: SingleCategory<string>;
}

export interface UpdateItemPayload extends Partial<CreateItemPayload> {
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export type Result<T, E> = { success: true; data: T } | { success: false; error: E };
