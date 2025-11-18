export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T = string> = T;

export interface Item {
	id: string;
	slug: string;
	name: string;
	text: string;
	isCompleted: boolean;
	priority: Priority;
	tags: string[];
	categories: SingleCategory<string>[];
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

export interface CreateItemPayload {
	name: string;
	text: string;
	priority: Priority;
	tags?: string[];
	categories: SingleCategory<string>[];
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
	isCompleted?: boolean;
	categories?: SingleCategory<string>[];
};

// Updated IconName type with correct Lucide icon names
export type IconName = 
	| 'Pencil'      // For edit (was Edit3)
	| 'Trash'       // For delete (was Trash2)
	| 'Plus'
	| 'Save'
	| 'X'
	| 'Loader'
	| 'Loader2'
	| 'CheckCircle'
	| 'AlertCircle'
	| 'AlertTriangle'
	| 'Info'
	| 'ClipboardList'
	| 'HelpCircle'
	| string; // Allow any string for flexibility
