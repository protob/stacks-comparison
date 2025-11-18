export type Priority = "low" | "mid" | "high";
export type NotificationType = "success" | "error" | "warning" | "info";

export type SingleCategory<T = string> = [T]; // Changed from number to string

export interface Item {
  id: string; // Changed from number to string (UUID)
  name: string;
  text: string;
  priority: Priority;
  isCompleted: boolean;
  slug: string;
  tags?: string[];
  categories: string[]; // Changed from SingleCategory<number> to string[]
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

// Add API response wrapper types
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
