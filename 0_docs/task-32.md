Here is the corrective to-do list for the AI agent. It focuses on fixing the API endpoints (405 error), resolving the hydration mismatch (Next.js/SSR issue), and restoring the layout/features to be a 1:1 copy of the original React application (removing the extra "dashboard" widgets and restoring the category-tree view).

### **Prerequisites**

*   **Working Directory:** `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next`
*   **Objective:** Fix API methods, resolve hydration errors, and align UI 1:1 with the React source (Tree view, no stats cards).

---

### **Step 1: Update Types & Schema (Match Backend)**

The backend uses specific fields like `slug`, `categorySlug`, and `categories` (array). We need to ensure our types match the OpenAPI spec provided.

**1.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/types/index.ts`**

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
  // Helpers for the frontend logic
  categorySlug?: string; 
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
```

**1.2 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/schemas/itemSchema.ts`**
(Revert to the React App schema which handles categories correctly as a tuple)

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

### **Step 2: Fix API Logic (Solve 405 Error)**

The backend does not have `GET /items`. It has `GET /items/tree`. We must also use the correct slug-based paths for updates/deletes.

**2.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/lib/api/itemApi.ts`**

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

// Fix: Use /items/tree instead of /items
export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

// Fix: Use slugs instead of ID
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

// Fix: Use slugs instead of ID
export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}
```

---

### **Step 3: Fix Hooks (Logic Restoration)**

We need to restore the `ItemTree` filtering logic from the React app and update the API hooks to use the tree endpoint.

**3.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/hooks/useItemsApi.ts`**

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
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: (newItem) => {
      showSuccessToast(`Item "${newItem.name}" added.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to add item.');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
      itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
    onSuccess: (updatedItem) => {
      showSuccessToast(`Item "${updatedItem.name}" updated.`);
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      const categorySlug = slugify(updatedItem.categories[0]);
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to update item.');
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
  const { showSuccessToast, showErrorToast } = useUiStore();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
      itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
    onSuccess: () => {
      showSuccessToast('Item deleted.');
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error: any) => {
      showErrorToast(error.message || 'Failed to delete item.');
    },
  });
};
```

**3.2 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/hooks/useItemFilters.ts`**
(Restore the `ItemTree` logic from Source A)

```typescript
import { useMemo, useState } from 'react';
import type { Item, Priority } from '@/types';
import { ItemTree } from '@/lib/api/itemApi';

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: ItemTree) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    searchQuery, setSearchQuery,
    selectedPriority, setSelectedPriority,
    showCompleted, setShowCompleted,
    selectedTags, setSelectedTags,
    allTags,
    hasActiveFilters,
    filteredItemTree,
    totalItems,
    totalFilteredItems,
  };
}
```

---

### **Step 4: Fix Layout & Hydration Error**

Fix the Sidebar hydration error by waiting for mount. Remove the "Dashboard" stats and revert to the list layout.

**4.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/layout/AppSidebar.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, List, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          {mounted ? (
            theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />
          ) : (
            <div className="size-4" /> // Placeholder to avoid layout shift/hydration mismatch
          )}
          <span className="capitalize">{mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Toggle Theme'}</span>
        </Button>
      </div>
    </div>
  );
}
```

---

### **Step 5: Restore Feature Components**

Replace the incompatible components with the originals ported from React.

**5.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/items/ItemItem.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
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
                {item.tags?.map(tag => (
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

**5.2 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/components/items/ItemForm.tsx`**

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

### **Step 6: Restore Main Page (Category View)**

Revert `app/page.tsx` to render the tree view grouped by category, rather than a flat grid with stats.

**6.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/page.tsx`**

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
  const { data: itemTree, isLoading, error } = useGetItemTree();
  const addItem = useAddItem();
  const [isOpen, setIsOpen] = useState(false);

  const {
    filteredItemTree,
    allTags,
    hasActiveFilters,
    totalItems,
    totalFilteredItems,
    searchQuery, setSearchQuery,
    selectedPriority, setSelectedPriority,
    showCompleted, setShowCompleted,
    selectedTags, setSelectedTags
  } = useItemFilters(itemTree || {});

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (error) {
     return <div className="p-8 text-red-500">Error loading items: {error.message}</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {/* Header & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Items Dashboard</h2>
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

        {/* List Grouped by Category */}
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

---
