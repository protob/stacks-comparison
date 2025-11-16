# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** nie, 16 lis 2025, 11:32:20 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-app-sqlite/frontend

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## `gen.sh`
```
#!/bin/bash
# setup-react-project.sh
set -e

echo "\U0001f680 Creating React project structure in current directory..."

# Create directory structure
mkdir -p src/{components/{common,items,layout},stores,hooks,api,types,utils,pages}
mkdir -p public

# Create main files
touch src/{main.tsx,App.tsx,index.css}
touch src/types/index.ts
touch src/utils/{helpers.ts,slugify.ts,schema-helpers.ts}
touch src/api/{apiClient.ts,itemApi.ts}
touch src/stores/{useItemStore.ts,useUiStore.ts}
touch src/hooks/useItemFilters.ts
touch src/pages/ItemPage.tsx

# Create component files
touch src/components/common/{Button.tsx,Icon.tsx,Modal.tsx,FormField.tsx,TagInput.tsx,SchemaForm.tsx,SchemaField.tsx,ConfirmDeleteModal.tsx,Notifications.tsx}
touch src/components/items/{ItemForm.tsx,ItemItem.tsx}
touch src/components/layout/{AppSidebar.tsx,FilterBar.tsx}

# Create config files
touch {vite.config.ts,tsconfig.json,tsconfig.node.json,tailwind.config.js}
touch index.html

# Create package.json
cat > package.json << 'EOF'
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.379.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "unplugin-auto-import": "^0.17.6"
  }
}
EOF

echo "\u2705 Project structure created successfully!"
echo ""
echo "\U0001f4c1 Created directory structure:"
echo "\u251c\u2500\u2500 src/"
echo "\u2502   \u251c\u2500\u2500 components/"
echo "\u2502   \u2502   \u251c\u2500\u2500 common/"
echo "\u2502   \u2502   \u251c\u2500\u2500 items/"
echo "\u2502   \u2502   \u2514\u2500\u2500 layout/"
echo "\u2502   \u251c\u2500\u2500 stores/"
echo "\u2502   \u251c\u2500\u2500 hooks/"
echo "\u2502   \u251c\u2500\u2500 api/"
echo "\u2502   \u251c\u2500\u2500 types/"
echo "\u2502   \u251c\u2500\u2500 utils/"
echo "\u2502   \u2514\u2500\u2500 pages/"
echo "\u251c\u2500\u2500 public/"
echo "\u2514\u2500\u2500 config files (package.json, vite.config.ts, etc.)"
echo ""
echo "\U0001f3af Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"
```

## `tsconfig.json`
```
{
  "compilerOptions": {
    "target": "ES2024",
    "useDefineForClassFields": true,
    "lib": ["ES2024", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/auto-imports.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

## `package.json`
```
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.2.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-router": "7.9.6",
    "zustand": "5.0.8",
    "zod": "4.1.12",
    "lucide-react": "0.553.0",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@types/react": "19.2.5",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.1.1",
    "typescript": "5.9.3",
    "vite": "7.2.2",
    "tailwindcss": "4.1.17",
    "unplugin-auto-import": "20.2.0",
    "use-sync-external-store": "1.6.0"
  }
}

```

## `tsconfig.node.json`
```
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## `vite.config.ts`
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],
      imports: [
        'react',
        {
          'react-router': ['useNavigate', 'useParams', 'useLocation', 'useSearchParams'],
          'zustand': [['create', 'create']],
          'zustand/middleware': ['devtools', 'persist'],
          'clsx': [['default', 'clsx']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/hooks/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
      vueTemplate: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    watch: {
      ignored: ['**/server-node/data/**']
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'zustand'],
          'icons': ['lucide-react'],
        }
      }
    }
  }
});

```

## `src/utils/slugify.ts`
```
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

## `src/utils/helpers.ts`
```
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

## `src/utils/schema-helpers.ts`
```
import { z } from 'zod';

export function unwrapZodType(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    const inner = schema._def.innerType || (typeof (schema as any).unwrap === 'function' ? (schema as any).unwrap() : undefined);
    return inner ? unwrapZodType(inner) : schema;
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapZodType(schema.innerType());
  }
  return schema;
}

export function getBaseSchema(schema: z.ZodTypeAny): z.ZodObject<any, any, any> | null {
  const unwrapped = unwrapZodType(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped;
  }
  console.error("getBaseSchema: Expected a ZodObject after unwrapping, but got:", unwrapped);
  return null;
}
```

## `src/stores/useItemStore.ts`
```
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Item } from '@/types';
import * as itemApi from '@/api/itemApi';
import { useUiStore } from './useUiStore';
import { slugify } from '@/utils/slugify';

interface ItemState {
  itemTree: itemApi.ItemTree;
  isLoading: boolean;
  error: string | null;
  
  fetchItemTree: () => Promise<void>;
  addItem: (newItemData: Omit<Item, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => Promise<Item | undefined>;
  updateItem: (originalCategorySlug: string, itemSlug: string, updateData: Partial<Omit<Item, 'id' | 'slug' | 'createdAt'>>) => Promise<Item | undefined>;
  toggleItemCompletion: (item: Item) => Promise<Item | undefined>;
  deleteItem: (categorySlug: string, itemSlug: string) => Promise<boolean>;
}

export const useItemStore = create<ItemState>()(
  devtools(
    (set, get) => ({
      itemTree: {},
      isLoading: false,
      error: null,

      fetchItemTree: async () => {
        set({ isLoading: true, error: null });
        try {
          const itemTree = await itemApi.getItemTree();
          set({ itemTree });
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to fetch items';
          set({ error: errorMessage, itemTree: {} });
          useUiStore.getState().showNotification('error', errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (newItemData) => {
        useUiStore.getState().setIsLoading(true, 'Adding item...');
        try {
          const createdItem = await itemApi.createItem({
            name: newItemData.name,
            text: newItemData.text,
            priority: newItemData.priority,
            tags: newItemData.tags,
            categories: newItemData.categories,
          });
          
          const categorySlug = slugify(newItemData.categories[0]);
          set(state => {
            const newTree = { ...state.itemTree };
            if (!newTree[categorySlug]) {
              newTree[categorySlug] = [];
            }
            newTree[categorySlug].unshift(createdItem);
            return { itemTree: newTree };
          });
          
          useUiStore.getState().showNotification('success', `Item "${createdItem.name}" added.`);
          return createdItem;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to add item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return undefined;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },

      updateItem: async (originalCategorySlug, itemSlug, updateData) => {
        useUiStore.getState().setIsLoading(true, 'Updating item...');
        try {
          const updatedItem = await itemApi.updateItem(originalCategorySlug, itemSlug, updateData);
          
          // Refresh to handle potential category changes
          await get().fetchItemTree();
          
          useUiStore.getState().showNotification('success', `Item "${updatedItem.name}" updated.`);
          return updatedItem;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to update item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return undefined;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },

      toggleItemCompletion: async (item) => {
        return get().updateItem(slugify(item.categories[0]), item.slug, { isCompleted: !item.isCompleted });
      },

      deleteItem: async (categorySlug, itemSlug) => {
        useUiStore.getState().setIsLoading(true, 'Deleting item...');
        try {
          await itemApi.deleteItem(categorySlug, itemSlug);
          
          set(state => {
            const newTree = { ...state.itemTree };
            if (newTree[categorySlug]) {
              newTree[categorySlug] = newTree[categorySlug].filter(t => t.slug !== itemSlug);
              if (newTree[categorySlug].length === 0) {
                delete newTree[categorySlug];
              }
            }
            return { itemTree: newTree };
          });
          
          useUiStore.getState().showNotification('success', 'Item deleted.');
          return true;
        } catch (e: any) {
          const errorMessage = e.message || 'Failed to delete item';
          set({ error: errorMessage });
          useUiStore.getState().showNotification('error', errorMessage);
          return false;
        } finally {
          useUiStore.getState().setIsLoading(false);
        }
      },
    }),
    { name: 'item-store' }
  )
);
```

## `src/stores/useUiStore.ts`
```
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/types';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  notifications: Notification[];
  
  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string, duration?: number) => string;
  removeNotification: (id: string) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set, get) => ({
      isLoading: false,
      loadingMessage: null,
      notifications: [],

      setIsLoading: (status: boolean, message?: string) =>
        set({ isLoading: status, loadingMessage: message || null }),

      showNotification: (type: NotificationType, message: string, duration = 3000): string => {
        const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const notification: Notification = { 
          id, 
          type, 
          message, 
          duration, 
          timestamp: Date.now() 
        };

        set(state => ({
          notifications: [...state.notifications, notification]
        }));

        if (duration > 0) {
          setTimeout(() => get().removeNotification(id), duration);
        }

        return id;
      },

      removeNotification: (id: string) =>
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        })),
    }),
    { name: 'ui-store' }
  )
);
```

## `src/hooks/useItemFilters.ts`
```
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

## `src/types/index.ts`
```
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

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: number;
}
```

## `src/index.css`
```
@import "tailwindcss";

@layer base {
  body {
    background-color: theme(colors.neutral.900);
    color: theme(colors.neutral.100);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid theme(colors.neutral.700);
    border-radius: 0.375rem;
    background-color: theme(colors.neutral.800);
    color: theme(colors.neutral.100);
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: theme(colors.blue.500);
    box-shadow: 0 0 0 1px theme(colors.blue.500 / 50%);
  }

  input[type="checkbox"] {
    width: auto;
  }
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: theme(colors.neutral.800);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: theme(colors.neutral.600);
  border-radius: 0.25rem;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: theme(colors.neutral.500);
}

```

## `src/api/itemApi.ts`
```
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

## `src/api/apiClient.ts`
```
const API_URL_BASE = 'http://localhost:3000/api';

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

export const isApiError = (error: any): error is ApiErrorData => {
  return error && typeof error.message === 'string' && typeof error.statusCode === 'number';
};

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

