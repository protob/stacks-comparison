Here is the super detailed, step-by-step migration plan designed for an AI agent. It includes absolute paths, specific `bun` commands, and complete code blocks to migrate the functionality from the React/Vite application to the Next.js 16 application.

### **Prerequisites**

*   **Working Directory:** `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next`
*   **Goal:** Port React SPA features to Next.js App Router (SPA mode).
*   **Constraint:** Remove TanStack Router; use Next.js App Router.

---

### **Step 1: Environment & Dependencies Setup**

First, navigate to the directory and install all necessary runtime libraries and UI components.

**1.1 Navigate to project root**
```bash
cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next
```

**1.2 Install Core Libraries**
(TanStack Query, Forms, Zod, Zustand, Sonner, etc.)
```bash
bun add @tanstack/react-query @tanstack/react-form @tanstack/zod-form-adapter @tanstack/react-query-devtools zustand zod sonner lucide-react next-themes clsx tailwind-merge tailwindcss-animate
```

**1.3 Install Shadcn UI Components**
Run this command to add the specific UI components used in the original app.
```bash
bun x --bun shadcn@latest add button input label checkbox radio-group dialog select alert-dialog card popover textarea
```

---

### **Step 2: Design System & Styling**

We need to port the advanced CSS variables and Tailwind configuration into the Next.js global CSS.

**2.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/globals.css`**

Replace the entire file with this merged version (Shadcn + Custom Design System):

```css
@import "tailwindcss";
@import "tw-animate-css";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  
  /* Shadcn Specifics */
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  
  /* Custom Radius from React App */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Custom Spacings & Utilities mapped to theme */
  --spacing-input-x: var(--input-padding-x);
  --spacing-input-y: var(--input-padding-y);
  --spacing-card: var(--card-padding);
  --spacing-nav: var(--nav-padding);
}

:root {
  /* --- MODERNIST DESIGN SYSTEM TOKENS --- */
  --radius: 0.625rem;
  
  /* Primitives (OKLCH) */
  --color-gray-0:   oklch(1.000 0.000 0);
  --color-gray-50:  oklch(0.985 0.002 247);
  --color-gray-100: oklch(0.973 0.003 247);
  --color-gray-200: oklch(0.935 0.006 247);
  --color-gray-300: oklch(0.869 0.010 247);
  --color-gray-400: oklch(0.707 0.015 247);
  --color-gray-500: oklch(0.539 0.018 247);
  --color-gray-600: oklch(0.428 0.020 247);
  --color-gray-700: oklch(0.321 0.020 247);
  --color-gray-800: oklch(0.215 0.019 247);
  --color-gray-900: oklch(0.141 0.015 247);
  --color-gray-950: oklch(0.075 0.010 247);

  --color-blue-50:  oklch(0.96 0.025 240);
  --color-blue-500: oklch(0.58 0.215 240);
  --color-blue-600: oklch(0.50 0.220 240);
  --color-blue-700: oklch(0.42 0.200 240);
  --color-blue-800: oklch(0.35 0.175 240);

  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-600: oklch(0.519 0.195 142);

  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-600:  oklch(0.577 0.237 27);
  --color-red-700:  oklch(0.517 0.237 27);

  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);

  /* Semantic Mappings */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Custom Semantic Vars */
  --color-surface: var(--color-gray-50);
  --color-surface-hover: var(--color-gray-100);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-0);
  
  --color-priority-mid-bg: var(--color-amber-50);
  --color-priority-mid-text: var(--color-amber-600);
  
  /* Spacing Helpers */
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.5rem;
  --card-padding: 1rem;
  --nav-padding: 1rem;

  /* Charts (Shadcn) */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  
  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);

  /* Custom Semantic Vars Dark */
  --color-surface: var(--color-gray-900);
  --color-surface-hover: var(--color-gray-800);
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-0);
  
  --color-priority-mid-bg: var(--color-amber-500);
  --color-priority-mid-text: var(--color-gray-950);

  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  
  /* Custom Utility Classes from Main.css */
  .tag-sm {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    gap: 0.25rem;
  }
  
  .tag-priority-mid {
    background-color: var(--color-priority-mid-bg);
    color: var(--color-priority-mid-text);
    border-radius: 9999px;
  }
  
  .container-aware { container-type: inline-size; }
  
  .grid-auto-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 1rem;
  }
}
```

---

### **Step 3: Core Utilities and Types**

We need to create the directory structure and files for types and API handling.

**3.1 Create Directories**
```bash
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/types
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/lib/api
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/utils
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/schemas
```

**3.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/types/index.ts`**
```typescript
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
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
```

**3.3 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/utils/slugify.ts`**
```typescript
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

**3.4 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/utils/helpers.ts`**
```typescript
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};
```

**3.5 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/schemas/itemSchema.ts`**
```typescript
import { z } from 'zod';
import type { SingleCategory } from '@/types';

export const itemFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z.string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high']),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]) as z.ZodType<SingleCategory<string>>,
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
```

---

### **Step 4: API Layer**

We will place the API logic in `lib/api` to keep the structure clean.

**4.1 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/lib/api/apiClient.ts`**
```typescript
const API_URL_BASE = 'http://localhost:3000/api'; // Ensure your backend runs here

type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export const createApiError = (
  message: string, 
  statusCode: number = 500, 
  details?: any
): ApiErrorData => ({
  message,
  statusCode,
  details,
});

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      
      return failure(createApiError(message, response.status));
    }

    const data = await response.json();
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    return failure(createApiError(
      error.message || 'Network request failed',
      503
    ));
  }
};

const unwrapResult = async <T>(resultPromise: Promise<Result<T, ApiErrorData>>): Promise<T> => {
  const result = await resultPromise;
  if (!result.success) {
    const error = new Error(result.error.message);
    (error as any).statusCode = result.error.statusCode;
    (error as any).details = result.error.details;
    throw error;
  }
  return result.data;
};

export const get = <T>(endpoint: string) => 
  unwrapResult(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };
```

**4.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/lib/api/itemApi.ts`**
```typescript
import { get, post, patch, del } from './apiClient';
import type { Item, Priority, SingleCategory } from '@/types';

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

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload
): Promise<Item> {
  return patch<Item, UpdateItemPayload>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}
```

---

### **Step 5: State Management & Providers**

In Next.js 16 (App Router), we need a dedicated Client Component to provide Contexts like React Query.

**5.1 Create Stores**
```bash
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/stores
```

**5.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/stores/useUiStore.ts`**
```typescript
import { create } from 'zustand';
import { toast } from "sonner";
import type { NotificationType } from '@/types';

interface UiState {
  isLoading: boolean;
  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoading: false,
  setIsLoading: (status: boolean) => set({ isLoading: status }),
  showNotification: (type: NotificationType, message: string) => {
    switch (type) {
      case 'success': toast.success(message); break;
      case 'error': toast.error(message); break;
      case 'warning': toast.warning(message); break;
      case 'info': toast.info(message); break;
      default: toast(message);
    }
  },
}));
```

**5.3 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/providers.tsx`**
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute
      },
    },
  }));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

**5.4 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/layout.tsx`**
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Items App",
  description: "CRUD Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}>
        <Providers>
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
```

---

### **Step 6: Hooks**

Migrate the React hooks.

**6.1 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/hooks/useItemsApi.ts`**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as itemApi from '@/lib/api/itemApi';
import { useUiStore } from '@/stores/useUiStore';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (category: string, slug: string) => [...itemKeys.all, 'detail', category, slug] as const,
};

export const useGetItemTree = () => {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: itemApi.getItemTree,
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: (newItem) => {
      showNotification('success', `Item "${newItem.name}" added.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showNotification('error', error.message || 'Failed to add item.');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
      itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
    onSuccess: (updatedItem) => {
      showNotification('success', `Item "${updatedItem.name}" updated.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      const categorySlug = slugify(updatedItem.categories[0]);
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
    },
    onError: (error: any) => {
      showNotification('error', error.message || 'Failed to update item.');
    },
  });
};

export const useToggleItemCompletion = () => {
    const updateItemMutation = useUpdateItem();
    return (item: Item) => {
        const categorySlug = slugify(item.categories[0]);
        updateItemMutation.mutate({
            categorySlug,
            itemSlug: item.slug,
            payload: { isCompleted: !item.isCompleted },
        });
    };
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
      itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
    onSuccess: () => {
      showNotification('success', 'Item deleted.');
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showNotification('error', error.message || 'Failed to delete item.');
    },
  });
};
```

**6.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/hooks/useItemFilters.ts`**
(Copy content exactly from Source B)
```typescript
import { useMemo } from 'react';
import type { Item, Priority } from '@/types';

export interface ItemTree {
  [categorySlug: string]: Item[];
}

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: ItemTree, filters: FilterOptions) {
  const { searchQuery, selectedPriority, showCompleted, selectedTags } = filters;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(itemTree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [itemTree]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           selectedPriority !== 'all' ||
           !showCompleted ||
           selectedTags.length > 0;
  }, [searchQuery, selectedPriority, showCompleted, selectedTags]);

  const filteredItemTree = useMemo(() => {
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(itemTree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Priority filter
        if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
          return false;
        }

        // Completion status filter
        if (!showCompleted && item.isCompleted) {
          return false;
        }

        // Tag filter
        if (selectedTags.length > 0) {
          const hasSelectedTag = selectedTags.some(tag => 
            item.tags?.includes(tag)
          );
          if (!hasSelectedTag) return false;
        }

        return true;
      });
      
      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });
    
    return filtered;
  }, [itemTree, searchQuery, selectedPriority, showCompleted, selectedTags]);

  const totalItems = useMemo(() => {
    return Object.values(itemTree).reduce((total, items) => total + items.length, 0);
  }, [itemTree]);

  const totalFilteredItems = useMemo(() => {
    return Object.values(filteredItemTree).reduce((total, items) => total + items.length, 0);
  }, [filteredItemTree]);

  return {
    allTags,
    hasActiveFilters,
    filteredItemTree,
    totalItems,
    totalFilteredItems,
  };
}
```

---

### **Step 7: Components (Feature Components)**

We need to migrate the React components into `components/items` and `components/layout`.

**7.1 Create component directories**
```bash
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/items
mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/layout
```

**7.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/layout/AppSidebar.tsx`**
```tsx
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, List, Info } from 'lucide-react';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-[calc(100vh-2rem)] m-4 rounded-xl shadow-sm sticky top-4">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <List className="size-6 text-primary" />
          Items App
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <List className="size-4" />
          All Items
        </Link>
        <Link href="/about" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <Info className="size-4" />
          About
        </Link>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </div>
  );
}
```

**7.3 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/items/ItemItem.tsx`**
```tsx
'use client';

import Link from 'next/link';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Item } from '@/types';
import { useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';
import { slugify } from '@/utils/slugify';

interface ItemItemProps {
  item: Item;
}

export function ItemItem({ item }: ItemItemProps) {
  const toggleCompletion = useToggleItemCompletion();
  const deleteItem = useDeleteItem();
  const categorySlug = slugify(item.categories[0]);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem.mutate({ categorySlug, itemSlug: item.slug });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompletion(item);
  };

  const priorityColor = {
    high: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    mid: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    low: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  };

  return (
    <Link 
      href={`/items/${categorySlug}/${item.slug}`}
      className="block group"
    >
      <div className={cn(
        "p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all",
        item.isCompleted && "opacity-60"
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <button 
              onClick={handleToggle}
              className="mt-1 text-muted-foreground hover:text-primary transition-colors"
            >
              {item.isCompleted ? (
                <CheckCircle className="size-5 text-green-500" />
              ) : (
                <Circle className="size-5" />
              )}
            </button>
            
            <div className="space-y-1">
              <h3 className={cn(
                "font-medium text-foreground",
                item.isCompleted && "line-through text-muted-foreground"
              )}>
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.text}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide",
                  priorityColor[item.priority]
                )}>
                  {item.priority}
                </span>
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
```

**7.4 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/items/ItemForm.tsx`**
(Using TanStack Form)
```tsx
'use client';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { itemFormSchema, type ItemFormData } from '@/schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface ItemFormProps {
  defaultValues?: Partial<ItemFormData>;
  onSubmit: (data: ItemFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ItemForm({ defaultValues, onSubmit, isSubmitting, submitLabel = 'Save' }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name ?? '',
      text: defaultValues?.text ?? '',
      priority: defaultValues?.priority ?? 'mid',
      categories: defaultValues?.categories ?? ['General'],
      tags: defaultValues?.tags ?? [],
    } as ItemFormData,
    validatorAdapter: zodValidator(),
    validators: {
      onChange: itemFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Item name..."
            />
            {field.state.meta.errors ? (
              <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="text"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="text">Description</Label>
            <Textarea
              id="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
              placeholder="Details..."
            />
          </div>
        )}
      />

      <form.Field
        name="categories"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={field.state.value[0]}
              onChange={(e) => field.handleChange([e.target.value])}
              placeholder="Category..."
            />
          </div>
        )}
      />
      
      <form.Field
        name="priority"
        children={(field) => (
          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup
              value={field.state.value}
              onValueChange={(val: any) => field.handleChange(val)}
              className="flex gap-4"
            >
              {['low', 'mid', 'high'].map((p) => (
                <div key={p} className="flex items-center space-x-2">
                  <RadioGroupItem value={p} id={p} />
                  <Label htmlFor={p} className="capitalize cursor-pointer">{p}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      />

      <form.Field
        name="tags"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={field.state.value?.join(', ')}
              onChange={(e) => 
                field.handleChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))
              }
              placeholder="work, urgent, todo"
            />
          </div>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
```

---

### **Step 8: Pages (Main SPA Logic)**

We will recreate the page structure. `page.tsx` will be a Client Component (`use client`) to handle the complex filtering and state logic from the original Vite app.

**8.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/page.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ItemForm } from '@/components/items/ItemForm';
import { ItemItem } from '@/components/items/ItemItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useGetItemTree, useAddItem } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import type { Priority } from '@/types';
import { Plus, Search, Filter } from 'lucide-react';

export default function Home() {
  const { data: itemTree, isLoading } = useGetItemTree();
  const addItem = useAddItem();
  const [isOpen, setIsOpen] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    filteredItemTree,
    allTags,
    hasActiveFilters,
    totalItems,
    totalFilteredItems
  } = useItemFilters(itemTree || {}, {
    searchQuery,
    selectedPriority,
    showCompleted,
    selectedTags
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {/* Header & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              {isLoading ? 'Loading...' : `Showing ${totalFilteredItems} of ${totalItems} items`}
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                New Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
              </DialogHeader>
              <ItemForm 
                onSubmit={(data) => {
                  addItem.mutate(data, {
                    onSuccess: () => setIsOpen(false)
                  });
                }}
                isSubmitting={addItem.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={selectedPriority} onValueChange={(v: any) => setSelectedPriority(v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="mid">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 bg-secondary/50 px-3 rounded-md">
              <Checkbox 
                id="completed" 
                checked={showCompleted}
                onCheckedChange={(c) => setShowCompleted(!!c)}
              />
              <Label htmlFor="completed" className="cursor-pointer">Show Completed</Label>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                <Filter className="size-3" />
                Tags:
              </div>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors border ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent border-input'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List */}
        <div className="space-y-8">
          {isLoading ? (
             <div className="text-center py-12 text-muted-foreground">Loading items...</div>
          ) : Object.keys(filteredItemTree).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              {hasActiveFilters ? 'No items match your filters.' : 'No items found. Create one!'}
            </div>
          ) : (
            Object.entries(filteredItemTree).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground/80">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  {category}
                  <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <ItemItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
```

**8.2 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/items/[categorySlug]/[itemSlug]/page.tsx`**
```tsx
'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as itemApi from '@/lib/api/itemApi';
import { useUpdateItem, itemKeys } from '@/hooks/useItemsApi';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ItemForm } from '@/components/items/ItemForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { slugify } from '@/utils/slugify';

export default function ItemDetailPage({ params }: { params: Promise<{ categorySlug: string; itemSlug: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const updateItem = useUpdateItem();

  // Fetch specific item using React Query
  // Note: In Next.js client components, we use the hook directly.
  const { data: item, isLoading, isError } = useQuery({
    queryKey: itemKeys.detail(unwrappedParams.categorySlug, unwrappedParams.itemSlug),
    queryFn: () => itemApi.getItem(unwrappedParams.categorySlug, unwrappedParams.itemSlug),
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError || !item) return <div className="p-8">Item not found</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back to List
        </Button>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            <div className="flex gap-2 text-muted-foreground text-sm">
              <span>Category: {item.categories[0]}</span>
              <span>•</span>
              <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <ItemForm
            defaultValues={{
              name: item.name,
              text: item.text,
              priority: item.priority,
              categories: item.categories,
              tags: item.tags,
            }}
            onSubmit={(data) => {
              updateItem.mutate({
                categorySlug: slugify(item.categories[0]),
                itemSlug: item.slug,
                payload: data
              }, {
                onSuccess: () => router.push('/') // Redirect back after save
              });
            }}
            isSubmitting={updateItem.isPending}
            submitLabel="Update Item"
          />
        </div>
      </div>
    </div>
  );
}
```

**8.3 Create `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/about/page.tsx`**
```tsx
'use client';

import { AppSidebar } from '@/components/layout/AppSidebar';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">About</h1>
        <div className="prose dark:prose-invert">
          <p>
            This is a technical demo ported from React/Vite to Next.js 16 App Router.
            It demonstrates:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Next.js 16 App Router (Client Components)</li>
            <li>TanStack Query (v5)</li>
            <li>TanStack Form</li>
            <li>Tailwind CSS v4</li>
            <li>Shadcn/UI</li>
            <li>Zustand State Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

---

### **Step 9: Cleanup**

**9.1 Remove Unused Files**
(Optional) Remove the default `postcss.config.mjs` if Tailwind v4 handles it internally via the new vite/next plugins, but keep it safe for now.

**9.2 Verify**
Run the development server to check the port.
```bash
bun dev
```

This plan creates a complete "SPA-like" experience within Next.js 16, mirroring the exact functionality of your Vite app while adopting the Next.js file-system routing (`app/` directory).