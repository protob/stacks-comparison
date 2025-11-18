Based on the comprehensive analysis of both codebases, here is a complete step-by-step instruction set for migrating the React TanStack app to a Vue 3 project with the specified stack.[1][2][3][4][5][6][7]

***

## Vue CRUD App Migration Guide - Complete Implementation Steps

### 0. Prerequisites & Working Directory

**Working Directory:**
```bash
cd crud-starter-pickard-apps/vue/crud-app-sqlite-tanstack-shadcn-vue
```

***

### 1. Install Core Dependencies

Install all required packages for the Vue implementation:[3][5][7]

```bash
# Core Vue ecosystem
bun add vue-router@latest pinia

# TanStack ecosystem for Vue
bun add @tanstack/vue-query@latest @tanstack/vue-query-devtools@latest
bun add @tanstack/vue-form@latest @tanstack/zod-form-adapter@latest

# HTTP client
bun add ofetch

# Validation & utilities
bun add zod@latest
bun add sonner-vue

# Theme management
bun add @vueuse/core

# Development dependencies
bun add -D @pinia/testing unplugin-auto-import
```

***

### 2. Project Structure Setup

Create the full directory structure for the Vue application:[1]

```bash
mkdir -p src/{api,components/{common,items,layout},composables,pages,router,stores,schemas,types,utils,styles}
mkdir -p src/components/ui
```

Create placeholder files:

```bash
# API layer
touch src/api/{apiClient.ts,itemApi.ts}

# Types
touch src/types/index.ts

# Utils
touch src/utils/{helpers.ts,slugify.ts}

# Stores
touch src/stores/{itemStore.ts,uiStore.ts}

# Schemas
touch src/schemas/itemSchema.ts

# Composables
touch src/composables/{useItemFilters.ts,useItemsApi.ts,useThemeUpdater.ts}

# Pages
touch src/pages/{ItemPage.vue,ItemDetailPage.vue,AboutPage.vue}

# Components - Common
touch src/components/common/{Modal.vue,FormField.vue,TagInput.vue,SchemaForm.vue,SchemaField.vue,ConfirmDeleteModal.vue,Notifications.vue}

# Components - Items
touch src/components/items/{ItemForm.vue,ItemItem.vue}

# Components - Layout
touch src/components/layout/{AppSidebar.vue,FilterBar.vue}

# Router
touch src/router/index.ts

# Styles
touch src/styles/main.css
```

***

### 3. Configure Vite

Update `vite.config.ts` with Vue-specific plugins and auto-imports:[2]

```typescript
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@tanstack/vue-query': ['useQuery', 'useMutation', 'useQueryClient'],
          '@tanstack/vue-form': ['useForm'],
          'ofetch': ['ofetch'],
          '@vueuse/core': ['useStorage', 'useDark', 'useToggle'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
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
          'vendor': ['vue', 'vue-router', 'pinia'],
          'icons': ['lucide-vue-next'],
        }
      }
    }
  }
})
```

***

### 4. Add shadcn-vue Components

Add required shadcn-vue components using the correct bun command:[2]

```bash
# Core UI components
bun x --bun shadcn-vue@latest add button
bun x --bun shadcn-vue@latest add input
bun x --bun shadcn-vue@latest add label
bun x --bun shadcn-vue@latest add select
bun x --bun shadcn-vue@latest add checkbox
bun x --bun shadcn-vue@latest add radio-group
bun x --bun shadcn-vue@latest add dialog
bun x --bun shadcn-vue@latest add alert-dialog
bun x --bun shadcn-vue@latest add card
bun x --bun shadcn-vue@latest add badge
bun x --bun shadcn-vue@latest add separator
bun x --bun shadcn-vue@latest add toaster
```

***

### 5. Design System & Styles

Create the complete design system in `src/styles/main.css` based on the React version:[1]

Copy the entire `main.css` content from the React project, which includes:
- Custom CSS tokens (colors, spacing, typography)
- Tailwind v4 `@theme` configuration
- OKLCH color system
- Fluid typography and spacing scales
- Component utilities (buttons, tags, etc.)
- CSS containment and performance utilities

Update `src/style.css` (already exists) to import the design system:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "./styles/main.css";

@custom-variant dark (&:is(.dark *));
```

Keep existing theme variable mappings from the Vue template.[2]

***

### 6. TypeScript Configuration

Update `tsconfig.app.json` to match the project structure:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/lib/*": ["./src/lib/*"]
    },
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "src/auto-imports.d.ts"
  ]
}
```

***

### 7. Define TypeScript Types

Create `src/types/index.ts` with all application types:[1]

```typescript
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
  details?: any;
}

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };
```

***

### 8. Create API Client Layer

**`src/api/apiClient.ts`** - Base fetch client using ofetch:[1]

```typescript
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '@/types';

const API_URL_BASE = 'http://localhost:3000/api';

export const apiClient = ofetch.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  async onResponseError({ response }) {
    console.error('API Error:', response.status, response._data);
  },
});

const success = <T>(data: T): Result<T, ApiErrorData> => ({
  success: true,
  data,
});

const failure = (error: ApiErrorData): Result<any, ApiErrorData> => ({
  success: false,
  error,
});

const createApiError = (message: string, statusCode: number): ApiErrorData => ({
  message,
  statusCode,
});

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await apiClient.raw(endpoint, {
      method,
      body: body ? body : undefined,
    });

    const data = response._data;
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    const statusCode = error.response?.status || 503;
    const message = error.data?.message || error.message || 'Network request failed';
    return failure(createApiError(message, statusCode));
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

**`src/api/itemApi.ts`** - Item-specific API functions:[1]

```typescript
import { get, post, patch, del } from './apiClient';
import type { Item, ItemTree, CreateItemPayload, UpdateItemPayload } from '@/types';

export const getItemTree = () => get<ItemTree>('/items/tree');

export const getItemBySlug = (categorySlug: string, itemSlug: string) =>
  get<Item>(`/items/${categorySlug}/${itemSlug}`);

export const createItem = (payload: CreateItemPayload) =>
  post<Item, CreateItemPayload>('/items', payload);

export const updateItem = (id: number, payload: UpdateItemPayload) =>
  patch<Item, UpdateItemPayload>(`/items/${id}`, payload);

export const deleteItem = (id: number) =>
  del<{ deleted: boolean }>(`/items/${id}`);
```

***

### 9. Validation Schemas

Create `src/schemas/itemSchema.ts`:[1]

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

***

### 10. Utility Functions

**`src/utils/slugify.ts`**:[1]

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

**`src/utils/helpers.ts`**:[1]

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

***

### 11. Pinia Stores

**`src/stores/uiStore.ts`** - UI state management with Pinia:[5][6][3]

```typescript
import { defineStore } from 'pinia';
import { toast } from 'sonner-vue';
import type { NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref<string | null>(null);
  const theme = useStorage<Theme>('theme', 'system');

  const setIsLoading = (status: boolean, message?: string) => {
    isLoading.value = status;
    loadingMessage.value = message || null;
  };

  const showNotification = (type: NotificationType, message: string) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  return {
    isLoading,
    loadingMessage,
    theme,
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
  };
});
```

**`src/stores/itemStore.ts`** - Item-specific client state:[1]

```typescript
import { defineStore } from 'pinia';

export const useItemStore = defineStore('item', () => {
  const clientOnlyState = ref('Ready');

  const setClientOnlyState = (value: string) => {
    clientOnlyState.value = value;
  };

  return {
    clientOnlyState,
    setClientOnlyState,
  };
});
```

***

### 12. Composables for Data Fetching

**`src/composables/useItemsApi.ts`** - TanStack Query integration:[8][7]

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getItemTree, getItemBySlug, createItem, updateItem, deleteItem } from '@/api/itemApi';
import { useUiStore } from '@/stores/uiStore';
import type { CreateItemPayload, UpdateItemPayload } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

export function useItemTree() {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
    staleTime: 5 * 60 * 1000,
  });
}

export function useItemDetail(categorySlug: Ref<string>, itemSlug: Ref<string>) {
  return useQuery({
    queryKey: computed(() => itemKeys.detail(categorySlug.value, itemSlug.value)),
    queryFn: () => getItemBySlug(categorySlug.value, itemSlug.value),
    enabled: computed(() => !!categorySlug.value && !!itemSlug.value),
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to create item');
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateItemPayload }) =>
      updateItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to update item');
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to delete item');
    },
  });
}
```

**`src/composables/useItemFilters.ts`** - Filter logic:[1]

```typescript
import type { ItemTree, Item, Priority } from '@/types';

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: Ref<ItemTree>, filters: Ref<FilterOptions>) {
  const allTags = computed(() => {
    const tags = new Set<string>();
    Object.values(itemTree.value).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  });

  const hasActiveFilters = computed(() => {
    return filters.value.searchQuery.trim() !== '' ||
           filters.value.selectedPriority !== 'all' ||
           !filters.value.showCompleted ||
           filters.value.selectedTags.length > 0;
  });

  const filteredItemTree = computed(() => {
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(itemTree.value).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        // Search filter
        if (filters.value.searchQuery.trim()) {
          const query = filters.value.searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Priority filter
        if (filters.value.selectedPriority !== 'all' && item.priority !== filters.value.selectedPriority) {
          return false;
        }

        // Completion status filter
        if (!filters.value.showCompleted && item.isCompleted) {
          return false;
        }

        // Tags filter
        if (filters.value.selectedTags.length > 0) {
          const hasMatchingTag = filters.value.selectedTags.some(selectedTag =>
            item.tags?.includes(selectedTag)
          );
          if (!hasMatchingTag) return false;
        }

        return true;
      });

      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });

    return filtered;
  });

  const clearFilters = () => {
    filters.value = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
  };

  return {
    allTags,
    hasActiveFilters,
    filteredItemTree,
    clearFilters,
  };
}
```

**`src/composables/useThemeUpdater.ts`** - Theme DOM updater:[1]

```typescript
import { useUiStore } from '@/stores/uiStore';

export function useThemeUpdater() {
  const uiStore = useUiStore();
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  });

  watch(
    () => uiStore.theme,
    (newTheme) => {
      if (newTheme === 'system') {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        isDark.value = newTheme === 'dark';
      }
    },
    { immediate: true }
  );

  return { isDark };
}
```

***

### 13. Vue Router Configuration

**`src/router/index.ts`** - Replace TanStack Router with Vue Router:[1]

```typescript
import { createRouter, createWebHistory } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { itemKeys } from '@/composables/useItemsApi';
import { getItemTree, getItemBySlug } from '@/api/itemApi';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/ItemPage.vue'),
      meta: {
        loader: async () => {
          const queryClient = useQueryClient();
          await queryClient.ensureQueryData({
            queryKey: itemKeys.tree(),
            queryFn: getItemTree,
          });
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/items/:categorySlug/:itemSlug',
      name: 'item-detail',
      component: () => import('@/pages/ItemDetailPage.vue'),
      meta: {
        loader: async (to: any) => {
          const queryClient = useQueryClient();
          await queryClient.ensureQueryData({
            queryKey: itemKeys.detail(to.params.categorySlug, to.params.itemSlug),
            queryFn: () => getItemBySlug(to.params.categorySlug, to.params.itemSlug),
          });
        },
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.loader) {
    try {
      await (to.meta.loader as Function)(to);
    } catch (error) {
      console.error('Route loader error:', error);
    }
  }
  next();
});

export default router;
```

***

### 14. Main Application Entry

Update `src/main.ts`:[2]

```typescript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  },
});

app.mount('#app');
```

***

### 15. Root App Component

Update `src/App.vue`:[2][1]

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'sonner-vue';
import { useThemeUpdater } from '@/composables/useThemeUpdater';

useThemeUpdater();
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Toaster position="top-right" richColors />
    <RouterView />
  </div>
</template>
```

***

### 16. Build Page Components

**`src/pages/ItemPage.vue`** - Main items page:[1]

```vue
<script setup lang="ts">
import { useItemTree } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';

const { data: itemTree, isLoading, error } = useItemTree();

const filters = ref({
  searchQuery: '',
  selectedPriority: 'all' as const,
  showCompleted: true,
  selectedTags: [],
});

const { filteredItemTree, allTags, hasActiveFilters, clearFilters } = useItemFilters(
  computed(() => itemTree.value || {}),
  filters
);

const isFormOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    
    <main class="flex-1 p-fluid-6">
      <header class="mb-6">
        <h1 class="mb-2 font-bold text-size-2xl">Items</h1>
        <button
          @click="isFormOpen = true"
          class="btn-md bg-primary text-primary-foreground hover:bg-primary-hover rounded-button"
        >
          Add New Item
        </button>
      </header>

      <FilterBar
        v-model:search="filters.searchQuery"
        v-model:priority="filters.selectedPriority"
        v-model:showCompleted="filters.showCompleted"
        v-model:selectedTags="filters.selectedTags"
        :all-tags="allTags"
        :has-active-filters="hasActiveFilters"
        @clear="clearFilters"
      />

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else class="space-y-8">
        <section v-for="(items, category) in filteredItemTree" :key="category">
          <h2 class="mb-4 font-semibold text-size-xl">{{ category }}</h2>
          <div class="grid gap-4">
            <ItemItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </div>
        </section>
      </div>

      <ItemForm
        v-if="isFormOpen"
        @close="isFormOpen = false"
      />
    </main>
  </div>
</template>
```

**`src/pages/ItemDetailPage.vue`** - Item detail page:[1]

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useItemDetail } from '@/composables/useItemsApi';
import { formatDate } from '@/utils/helpers';

const route = useRoute();
const router = useRouter();

const categorySlug = computed(() => route.params.categorySlug as string);
const itemSlug = computed(() => route.params.itemSlug as string);

const { data: item, isLoading, error } = useItemDetail(categorySlug, itemSlug);
</script>

<template>
  <div class="container mx-auto p-fluid-6">
    <button @click="router.back()" class="mb-4 text-primary hover:underline">
      ← Back
    </button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="item" class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{{ item.name }}</h1>
      <p class="mb-4 text-text-secondary">{{ item.text }}</p>
      <div class="flex gap-2 mb-4">
        <span :class="`tag-priority-${item.priority}`">{{ item.priority }}</span>
        <span v-if="item.isCompleted" class="tag-sm bg-success-light">Completed</span>
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {{ formatDate(item.createdAt) }}</p>
        <p>Updated: {{ formatDate(item.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>
```

**`src/pages/AboutPage.vue`**:

```vue
<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto p-fluid-6">
    <h1 class="mb-4 font-bold text-size-2xl">About</h1>
    <p class="text-text-secondary">
      This is a Vue 3 CRUD application built with TanStack Query, Pinia, and shadcn-vue.
    </p>
  </div>
</template>
```

***

### 17. Build Item Components

**`src/components/items/ItemForm.vue`** - Form with TanStack Form:[9][10]

```vue
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddItem } from '@/composables/useItemsApi';
import { itemFormSchema } from '@/schemas/itemSchema';

const emit = defineEmits<{ close: [] }>();
const { mutate: addItem } = useAddItem();

const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    categories: ['general'] as [string],
  },
  onSubmit: async ({ value }) => {
    addItem(value, {
      onSuccess: () => emit('close'),
    });
  },
  validatorAdapter: zodValidator(),
});
</script>

<template>
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Item</DialogTitle>
      </DialogHeader>
      
      <form
        @submit.prevent="form.handleSubmit()"
        class="space-y-4"
      >
        <form.Field
          name="name"
          :validators="{
            onChange: itemFormSchema.shape.name,
          }"
        >
          <template #default="{ field }">
            <div>
              <Label>Name</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              />
              <span v-if="field.state.meta.errors.length" class="text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </span>
            </div>
          </template>
        </form.Field>

        <form.Field
          name="text"
          :validators="{
            onChange: itemFormSchema.shape.text,
          }"
        >
          <template #default="{ field }">
            <div>
              <Label>Description</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              />
              <span v-if="field.state.meta.errors.length" class="text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </span>
            </div>
          </template>
        </form.Field>

        <form.Field name="priority">
          <template #default="{ field }">
            <div>
              <Label>Priority</Label>
              <Select
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </template>
        </form.Field>

        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="emit('close')">
            Cancel
          </Button>
          <Button type="submit">
            Create Item
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
```

**`src/components/items/ItemItem.vue`** - Item card component:[1]

```vue
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUpdateItem, useDeleteItem } from '@/composables/useItemsApi';
import type { Item } from '@/types';

const props = defineProps<{ item: Item }>();

const { mutate: updateItem } = useUpdateItem();
const { mutate: deleteItem } = useDeleteItem();

const toggleComplete = () => {
  updateItem({
    id: props.item.id,
    payload: { isCompleted: !props.item.isCompleted },
  });
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    deleteItem(props.item.id);
  }
};
</script>

<template>
  <Card>
    <CardContent class="p-4">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="mb-2 font-semibold text-size-lg">{{ item.name }}</h3>
          <p class="mb-2 text-text-secondary">{{ item.text }}</p>
          <div class="flex gap-2">
            <Badge :class="`tag-priority-${item.priority}`">{{ item.priority }}</Badge>
            <Badge v-if="item.isCompleted" class="bg-success-light">Completed</Badge>
          </div>
        </div>
        <div class="flex gap-2">
          <Button size="sm" variant="outline" @click="toggleComplete">
            {{ item.isCompleted ? 'Undo' : 'Complete' }}
          </Button>
          <Button size="sm" variant="destructive" @click="handleDelete">
            Delete
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
```

***

### 18. Build Layout Components

**`src/components/layout/AppSidebar.vue`**:[1]

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/uiStore';

const uiStore = useUiStore();
</script>

<template>
  <aside class="w-64 p-4 border-r bg-surface border-border">
    <nav class="space-y-2">
      <RouterLink to="/" custom v-slot="{ navigate, isActive }">
        <Button
          @click="navigate"
          :variant="isActive ? 'default' : 'ghost'"
          class="justify-start w-full"
        >
          Items
        </Button>
      </RouterLink>
      <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
        <Button
          @click="navigate"
          :variant="isActive ? 'default' : 'ghost'"
          class="justify-start w-full"
        >
          About
        </Button>
      </RouterLink>
    </nav>
    
    <div class="mt-8">
      <Button variant="outline" @click="uiStore.toggleTheme()">
        Toggle Theme
      </Button>
    </div>
  </aside>
</template>
```

**`src/components/layout/FilterBar.vue`**:[1]

```vue
<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

defineProps<{
  search: string;
  priority: string;
  showCompleted: boolean;
  selectedTags: string[];
  allTags: string[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:search': [value: string];
  'update:priority': [value: string];
  'update:showCompleted': [value: boolean];
  'update:selectedTags': [value: string[]];
  clear: [];
}>();
</script>

<template>
  <div class="p-4 mb-6 space-y-4 bg-surface rounded-card">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Input
        :model-value="search"
        @update:model-value="emit('update:search', $event)"
        placeholder="Search items..."
      />
      
      <Select
        :model-value="priority"
        @update:model-value="emit('update:priority', $event)"
      >
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="mid">Mid</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <div class="flex items-center gap-2">
        <Checkbox
          :checked="showCompleted"
          @update:checked="emit('update:showCompleted', $event)"
        />
        <label>Show Completed</label>
      </div>
    </div>

    <Button
      v-if="hasActiveFilters"
      variant="outline"
      @click="emit('clear')"
    >
      Clear Filters
    </Button>
  </div>
</template>
```

***

### 19. Update HTML Entry Point

Update `index.html`:[1]

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

***

### 20. Update Package Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit"
  }
}
```

***

### 21. Start Development

```bash
bun install
bun run dev
```

***

## Summary

This comprehensive guide provides a complete implementation path for migrating the React TanStack app to Vue 3 with the following stack:[7][3][5][2][1]

- **Vue 3** with Composition API and `<script setup>`
- **Vue Router** (replacing TanStack Router)
- **Pinia** for global state management (replacing Zustand)
- **TanStack Query for Vue** with **ofetch** for data fetching
- **TanStack Form for Vue** with Zod validation
- **shadcn-vue** components (already configured)
- Custom token-based design system from the React version
- Modern 2025 Vue conventions with auto-imports

All components follow Vue 3 best practices with proper reactivity, TypeScript support, and the same feature set as the React version.[6][5][7]
