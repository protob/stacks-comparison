

### 0. Preconditions (what the agent starts with)

1. Ensure the Svelte app exists at:  
   `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite`.[1]

2. Confirm it is a Vite + Svelte 5 app with Tailwind v4 and shadcn-svelte already configured (you have `components.json`, `src/app.css`, and a `Button` component from shadcn-svelte).[1]

3. Use Bun for commands (pattern from user like `bun x shadcn-svelte@next add button`), but adapt to this project.[8][9][1]

***

### 1. Install Svelte TanStack + validation + notifications

**TODO 1.1 – Install TanStack Svelte adapters and Zod**

Run this in the Svelte project root:[2][3][4][5][1]

```bash
cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite

bun add @tanstack/svelte-query @tanstack/svelte-form @tanstack/zod-form-adapter zod ofetch
```

This mirrors the Vue app’s use of TanStack Query, TanStack Form and Zod, but with Svelte adapters instead of Vue adapters.[3][4][5][7][2]

**TODO 1.2 – Install Svelte Sonner**

Use Svelte’s equivalent of `vue-sonner` for toasts:[7]

```bash
bun add svelte-sonner
```

This will provide `<Toaster />` and `toast` similar to `vue-sonner`, allowing a nearly identical notification API in the Svelte UI store and layout.[7]

***

### 2. Generate shadcn-svelte UI components used in the Vue app

The Vue app uses shadcn-based components: `button`, `input`, `label`, `checkbox`, `badge`, `card`, `dialog`, `alert-dialog`, `separator`, `select`, radio group, and `sonner`.[7]

Your Svelte app already has `Button` wired under `$lib/components/ui/button`.[1]

**TODO 2.1 – Add all required shadcn-svelte components**

In the Svelte project root run:[10][9][8][1]

```bash
bun x shadcn-svelte@latest add button input label checkbox badge card dialog alert-dialog separator select radio-group sonner
```

This will generate Svelte versions under `$lib/components/ui/*` matching the API style of your existing Svelte `Button` component, so you can keep the same class-based design system you already configured via `src/app.css`.[9][8][10][1]

***

### 3. Mirror the Vue folder structure under `src/lib` in Svelte

The Vue project’s structure is: `api`, `components`, `composables`, `layouts`, `lib/utils`, `pages`, `schemas`, `stores`, `styles`, `types`, `utils`, `router`.[7]

For Svelte (non-SvelteKit) you want the same logical domains under `src/lib`, using your Svelte-simple-crud layout (`src/lib/api`, `components`, `stores`, `types`, `utils`).[6][7]

**TODO 3.1 – Create directories**

From Svelte project root:[6][1][7]

```bash
mkdir -p src/lib/api
mkdir -p src/lib/components/items
mkdir -p src/lib/components/layout
mkdir -p src/lib/pages
mkdir -p src/lib/schemas
mkdir -p src/lib/stores
mkdir -p src/lib/types
mkdir -p src/lib/utils
mkdir -p src/lib/router
```

This maps 1:1 to the Vue app’s `src/api`, `src/components/items`, `src/components/layout`, `src/pages`, `src/schemas`, `src/stores`, `src/types`, `src/utils`, and `src/router`.[7]

***

### 4. Port TypeScript types (1:1 from Vue)

Copy the Vue types into `src/lib/types/index.ts` in Svelte with path aliases adjusted from `@/` to `$lib/`.[1][7]

**TODO 4.1 – Create `src/lib/types/index.ts`**

Create this file with the following content:[7]

```ts
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
```

This is a direct port of `src/types/index.ts` from the Vue app so all API contracts and query types stay identical.[7]

***

### 5. Port the API layer (`apiClient` + `itemApi`)

The Vue app uses `ofetch` with a `Result` wrapper plus `unwrapResult`, then `itemApi` calls like `getItemTree`, `createItem`, etc.[7]

**TODO 5.1 – Create `src/lib/api/apiClient.ts`**

Create this file in Svelte with minimal path changes:[1][7]

```ts
// src/lib/api/apiClient.ts
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '$lib/types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
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

This is essentially `src/api/apiClient.ts` from the Vue app, only the import path moved to `$lib/types`.[7]

**TODO 5.2 – Create `src/lib/api/itemApi.ts`**

Create this file mirroring the Vue `itemApi.ts`:[7]

```ts
// src/lib/api/itemApi.ts
import { get, post, patch, del } from '$lib/api/apiClient';
import type {
  Item,
  ItemTree,
  CreateItemPayload,
  UpdateItemPayload,
} from '$lib/types';

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

This keeps the REST contract identical with your existing backend.[7]

***

### 6. TanStack Query in Svelte (equivalent of `useItemsApi.ts`)

You need Svelte equivalents for `useItemTree`, `useItemDetail`, `useAddItem`, `useUpdateItem`, `useDeleteItem`, but using `@tanstack/svelte-query`.[4][2][7]

**TODO 6.1 – Create `src/lib/api/itemsQuery.ts`**

Create a Svelte TanStack Query helper module:[2][4][7]

```ts
// src/lib/api/itemsQuery.ts
import {
  QueryClient,
  createQuery,
  createMutation,
  useQueryClient,
} from '@tanstack/svelte-query';
import {
  getItemTree,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem,
} from '$lib/api/itemApi';
import type { CreateItemPayload, UpdateItemPayload } from '$lib/types';
import { uiStore } from '$lib/stores/uiStore';

// shared query keys (same structure as Vue)
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

// root-level query client creator (used in App.svelte)
export function createAppQueryClient() {
  return new QueryClient();
}

// hooks-equivalent functions for components

export function useItemTree() {
  return createQuery(() => ({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
    staleTime: 5 * 60 * 1000,
  }));
}

export function useItemDetail(categorySlug: () => string, itemSlug: () => string) {
  return createQuery(() => ({
    queryKey: itemKeys.detail(categorySlug(), itemSlug()),
    queryFn: () => getItemBySlug(categorySlug(), itemSlug()),
    enabled: Boolean(categorySlug() && itemSlug()),
  }));
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to create item');
    },
  }));
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (args: { id: number; payload: UpdateItemPayload }) =>
      updateItem(args.id, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to update item');
    },
  }));
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to delete item');
    },
  }));
}
```

This follows the Svelte adapter pattern where `createQuery` and `createMutation` receive a thunk `() => ({ ...options })` and uses the same query keys and notifications as the Vue version.[4][2][7]

***

### 7. UI store (Pinia → Svelte store)

Vue’s `useUiStore` manages theme, form open state, preselected category and notifications via `vue-sonner`.[7]

In Svelte, implement a plain TS module with Svelte store semantics and `svelte-sonner` toast API.[6][7]

**TODO 7.1 – Create `src/lib/stores/uiStore.ts`**

```ts
// src/lib/stores/uiStore.ts
import { writable, get } from 'svelte/store';
import type { NotificationType, Item } from '$lib/types';
import { toast } from 'svelte-sonner';

export type Theme = 'light' | 'dark' | 'system';

function createUiStore() {
  const theme = writable<Theme>('system');
  const isFormOpen = writable(false);
  const preselectedCategory = writable<string | null>(null);
  const editingItem = writable<Item | null>(null);

  function openForm(item?: Item, categorySlug?: string) {
    editingItem.set(item ?? null);
    if (categorySlug) {
      preselectedCategory.set(categorySlug);
    } else if (item?.categorySlug) {
      preselectedCategory.set(item.categorySlug);
    }
    isFormOpen.set(true);
  }

  function closeForm() {
    isFormOpen.set(false);
    preselectedCategory.set(null);
    editingItem.set(null);
  }

  function toggleTheme() {
    const current = get(theme);
    if (current === 'light') theme.set('dark');
    else if (current === 'dark') theme.set('system');
    else theme.set('light');
  }

  function showNotification(type: NotificationType, message: string) {
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
      default:
        toast(message);
        break;
    }
  }

  return {
    theme,
    isFormOpen,
    preselectedCategory,
    editingItem,
    openForm,
    closeForm,
    toggleTheme,
    showNotification,
  };
}

export const uiStore = createUiStore();
```

This preserves fields and functions (`openForm`, `closeForm`, `toggleTheme`, `showNotification`) expected by `ItemPage`, `AppSidebar`, `ItemForm`, and the theme updater.[7]

***

### 8. Theme updater (Vue composable → Svelte effect)

In Vue you use `useThemeUpdater` + `useDark` from `@vueuse/core`, toggling `<html class="dark">` based on store theme and system preferences.[7]

In Svelte, use `onMount` + `matchMedia` with a reactive store subscription.[6][7]

**TODO 8.1 – Create `src/lib/utils/themeUpdater.ts`**

```ts
// src/lib/utils/themeUpdater.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore';
import { get } from 'svelte/store';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme: Theme) {
      const html = document.documentElement;
      if (theme === 'system') {
        const isDark = media.matches;
        if (isDark) html.classList.add('dark');
        else html.classList.remove('dark');
      } else if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    // initial
    applyTheme(get(uiStore.theme));

    const unsub = uiStore.theme.subscribe((t) => applyTheme(t));

    const mediaListener = () => {
      if (get(uiStore.theme) === 'system') {
        applyTheme('system');
      }
    };

    media.addEventListener('change', mediaListener);

    return () => {
      unsub();
      media.removeEventListener('change', mediaListener);
    };
  });
}
```

This matches the Vue composable behavior but uses basic DOM APIs instead of `@vueuse/core`.[7]

***

### 9. Minimal SPA router in Svelte (Vue Router replacement)

You need to support the same routes: `/`, `/about`, `/items/:categorySlug/:itemSlug`.[7]

Instead of introducing a router library, use a thin custom router component with Svelte 5 runes and `history.pushState`.[6][1][7]

**TODO 9.1 – Create `src/lib/router/router.ts` (route resolver)**

```ts
// src/lib/router/router.ts
export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'item-detail'; categorySlug: string; itemSlug: string };

export function resolveRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') {
    return { name: 'home' };
  }
  if (pathname === '/about') {
    return { name: 'about' };
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'items' && parts.length === 3) {
    const [, categorySlug, itemSlug] = parts;
    return { name: 'item-detail', categorySlug, itemSlug };
  }

  // fallback: home
  return { name: 'home' };
}

export function navigate(path: string) {
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
    const event = new CustomEvent('app:navigated', { detail: path });
    window.dispatchEvent(event);
  }
}
```

This replaces the Vue Router route table while keeping path semantics identical.[7]

**TODO 9.2 – Create `src/lib/router/Router.svelte`**

```svelte
<!-- src/lib/router/Router.svelte -->
<script lang="ts">
  import ItemPage from '$lib/pages/ItemPage.svelte';
  import AboutPage from '$lib/pages/AboutPage.svelte';
  import ItemDetailPage from '$lib/pages/ItemDetailPage.svelte';
  import { resolveRoute, navigate as navFn, type Route } from '$lib/router/router';
  import { onMount } from 'svelte';

  let currentRoute: Route = $state(resolveRoute(window.location.pathname));

  function handleNavigate(path: string) {
    navFn(path);
  }

  onMount(() => {
    const handler = (event: PopStateEvent | CustomEvent<string>) => {
      const pathname =
        event instanceof PopStateEvent
          ? window.location.pathname
          : (event.detail as string);
      currentRoute = resolveRoute(pathname);
    };

    window.addEventListener('popstate', handler);
    window.addEventListener('app:navigated', handler as EventListener);

    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('app:navigated', handler as EventListener);
    };
  });
</script>

{#if currentRoute.name === 'home'}
  <ItemPage on:navigate={(e) => handleNavigate(e.detail)} />
{:elseif currentRoute.name === 'about'}
  <AboutPage on:navigate={(e) => handleNavigate(e.detail)} />
{:elseif currentRoute.name === 'item-detail'}
  <ItemDetailPage
    categorySlug={currentRoute.categorySlug}
    itemSlug={currentRoute.itemSlug}
    on:navigate={(e) => handleNavigate(e.detail)}
  />
{/if}
```

All pages will use a `navigate` custom event to change routes, which keeps routing logic central.[7]

***

### 10. Root wiring: App + QueryClientProvider + Toaster

In Vue, `App.vue` wraps `RouterView` and the Toaster, while `main.ts` creates the Vue app, installs router and Pinia, and mounts on `#app`.[7]

In Svelte you already mount `App.svelte` from `src/main.ts`.[1]

**TODO 10.1 – Replace `src/App.svelte` content**

Replace the existing `App.svelte` with:[2][4][1][7]

```svelte
<!-- src/App.svelte -->
<script lang="ts">
  import './app.css';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import { createAppQueryClient } from '$lib/api/itemsQuery';
  import Router from '$lib/router/Router.svelte';
  import { useThemeUpdater } from '$lib/utils/themeUpdater';

  const queryClient = createAppQueryClient();

  useThemeUpdater();
</script>

<main class="min-h-screen bg-background text-foreground">
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" richColors />
    <Router />
  </QueryClientProvider>
</main>
```

This matches the Vue root structure: theme updater, Toaster, and router outlet under a full-screen background.[4][2][7]

`src/main.ts` can stay as generated (`mount(App, { target: ... })`).[1]

***

### 11. Port pages (`ItemPage`, `ItemDetailPage`, `AboutPage`) 1:1

Now port the three Vue pages under `src/pages` into Svelte components under `src/lib/pages`.[7]

#### 11.1 Main layout

First, port `src/layouts/MainLayout.vue` to `src/lib/components/layout/MainLayout.svelte`.[7]

**TODO 11.1 – Create `src/lib/components/layout/MainLayout.svelte`**

Use the same structure: sidebar + top bar + slot.[7]

```svelte
<!-- src/lib/components/layout/MainLayout.svelte -->
<script lang="ts">
  import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';

  export let onNavigate: (path: string) => void;
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <AppSidebar on:navigate={(e) => onNavigate(e.detail)} />
  <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
    <TopBar on:navigate={(e) => onNavigate(e.detail)} />
    <slot />
  </div>
</div>
```

The `onNavigate` callback will be wired from each page to bubble up to `Router.svelte`.[7]

#### 11.2 About page

**TODO 11.2 – Create `src/lib/pages/AboutPage.svelte`**

Port Vue `AboutPage.vue` template directly:[7]

```svelte
<!-- src/lib/pages/AboutPage.svelte -->
<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';

  export let navigate: (path: string) => void;

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }

  const dispatch = createEventDispatcher<{ navigate: string }>();
</script>

<MainLayout onNavigate={handleNavigate}>
  <div class="space-y-6">
    <header>
      <h1 class="font-bold text-size-3xl">About This Application</h1>
    </header>

    <div class="p-6 border rounded-lg bg-surface border-border">
      <p class="mb-4 text-text-secondary">
        This is a modern, responsive Vue frontend for managing items, built to serve as a clean and robust boilerplate. It leverages the full power of the TanStack suite and modern tooling for a superior developer experience and a fully type-safe workflow.
      </p>

      <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>

      <ul class="space-y-2 list-disc list-inside text-text-secondary">
        <li>
          <span class="font-medium text-text-primary">Vue 3:</span>
          For building a reactive and performant user interface with the Composition API.
        </li>
        <li>
          <span class="font-medium text-text-primary">TanStack Query (Vue Query):</span>
          Manages all server state, handling data fetching, caching, and synchronization effortlessly.
        </li>
        <li>
          <span class="font-medium text-text-primary">TanStack Form (Vue Form):</span>
          Ensures performant and 100% type-safe forms from validation to submission.
        </li>
        <li>
          <span class="font-medium text-text-primary">Pinia:</span>
          Provides simple and type-safe global state management for client-side UI state.
        </li>
        <li>
          <span class="font-medium text-text-primary">shadcn-vue:</span>
          A collection of beautifully designed, accessible, and unstyled components that are adapted to our custom design system.
        </li>
        <li>
          <span class="font-medium text-text-primary">Tailwind CSS v4:</span>
          Powers styling with a "CSS-first" approach, using a custom, token-based, and fluidly responsive design system.
        </li>
      </ul>
    </div>
  </div>
</MainLayout>
```

Keep Tailwind classes exactly as in Vue for a 1:1 look; only difference is Svelte slot and event wiring.[7]

#### 11.3 Item detail page

**TODO 11.3 – Create `src/lib/pages/ItemDetailPage.svelte`**

Use Svelte Query instead of `useItemDetail` composable:[2][4][7]

```svelte
<!-- src/lib/pages/ItemDetailPage.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';

  export let categorySlug: string;
  export let itemSlug: string;

  const dispatch = createEventDispatcher<{ navigate: string }>();

  const detailQuery = useItemDetail(
    () => categorySlug,
    () => itemSlug,
  );

  function goBack() {
    dispatch('navigate', '/');
  }
</script>

<div class="container mx-auto p-fluid-6">
  <button on:click={goBack} class="mb-4 text-primary hover:underline">
    ← Back
  </button>

  {#if $detailQuery.isLoading}
    <div>Loading...</div>
  {:else if $detailQuery.error}
    <div>Error: {$detailQuery.error.message}</div>
  {:else if $detailQuery.data}
    {#const item = $detailQuery.data}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class={`tag-priority-${item.priority}`}>{item.priority}</span>
        {#if item.isCompleted}
          <span class="tag-sm bg-success-light">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>
```

This keeps layout and styling identical while using the Svelte TanStack adapter.[4][2][7]

#### 11.4 Item list page

**TODO 11.4 – Create `src/lib/pages/ItemPage.svelte`**

Mirror `ItemPage.vue` but with `useItemTree` and `useItemFilters` ported.[7]

First, port `useItemFilters.ts` to Svelte `src/lib/utils/useItemFilters.ts`, then use it here.[7]

```ts
// src/lib/utils/useItemFilters.ts
import type { ItemTree, Item, Priority } from '$lib/types';

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function filterItemTree(itemTree: ItemTree, filters: FilterOptions) {
  const filtered: Record<string, Item[]> = {};

  Object.entries(itemTree).forEach(([categoryName, items]) => {
    const filteredItems = items.filter((item) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.text.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (
        filters.selectedPriority !== 'all' &&
        item.priority !== filters.selectedPriority
      ) {
        return false;
      }

      if (!filters.showCompleted && item.isCompleted) {
        return false;
      }

      if (filters.selectedTags.length > 0) {
        const hasMatchingTag = filters.selectedTags.some((selectedTag) =>
          item.tags?.includes(selectedTag),
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
}

export function getAllTags(itemTree: ItemTree): string[] {
  const tags = new Set<string>();
  Object.values(itemTree).forEach((items) => {
    items.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
  });
  return Array.from(tags).sort();
}
```

Then the page:[7]

```svelte
<!-- src/lib/pages/ItemPage.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { useItemTree } from '$lib/api/itemsQuery';
  import { filterItemTree, getAllTags, type FilterOptions } from '$lib/utils/useItemFilters';
  import FilterBar from '$lib/components/layout/FilterBar.svelte';
  import ItemItem from '$lib/components/items/ItemItem.svelte';
  import { uiStore } from '$lib/stores/uiStore';
  import { Button } from '$lib/components/ui/button';

  const dispatch = createEventDispatcher<{ navigate: string }>();

  const itemTreeQuery = useItemTree();

  let filters: FilterOptions = {
    searchQuery: '',
    selectedPriority: 'all',
    showCompleted: true,
    selectedTags: [],
  };

  $: rawTree = $itemTreeQuery.data ?? {};
  $: allTags = getAllTags(rawTree);
  $: filteredItemTree = filterItemTree(rawTree, filters);
  $: hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.selectedPriority !== 'all' ||
    !filters.showCompleted ||
    filters.selectedTags.length > 0;

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
  }

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout onNavigate={handleNavigate}>
  <header class="mb-6">
    <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
  </header>

  <FilterBar
    bind:search={filters.searchQuery}
    bind:priority={filters.selectedPriority}
    bind:showCompleted={filters.showCompleted}
    bind:selectedTags={filters.selectedTags}
    {allTags}
    {hasActiveFilters}
    on:clear={clearFilters}
  />

  {#if $itemTreeQuery.isLoading}
    <div>Loading...</div>
  {:else if $itemTreeQuery.error}
    <div>Error: {$itemTreeQuery.error.message}</div>
  {:else}
    <div class="mt-6 space-y-8">
      {#each Object.entries(filteredItemTree) as [category, items]}
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-semibold capitalize text-size-xl">{category}</h2>
            <span class="text-sm text-text-muted">({items.length})</span>
            <Button
              variant="ghost"
              size="icon-sm"
              on:click={() => uiStore.openForm(undefined, category)}
            >
              <icon-lucide-plus class="w-4 h-4" />
            </Button>
          </div>
          <div class="grid gap-4">
            {#each items as item (item.id)}
              <ItemItem {item} />
            {/each}
          </div>
        </section>
      {/each}

      {#if Object.keys(filteredItemTree).length === 0 && !$itemTreeQuery.isLoading}
        <div class="py-10 text-center text-text-muted">
          <p>No items found.</p>
          {#if hasActiveFilters}
            <p>Try adjusting your filters.</p>
          {/if}
        </div>
      {/if}
    </div>
  {/else}
</MainLayout>
```

All Tailwind classes and UI hierarchy are identical to the Vue `ItemPage.vue`.[7]

***

### 12. Port layout components (`TopBar`, `AppSidebar`, `FilterBar`)

Use the same Tailwind markup and shadcn components, only switching to Svelte binding/event syntax.[7]

**TODO 12.1 – `TopBar`**

Create `src/lib/components/layout/TopBar.svelte` from `TopBar.vue`.[7]

- Replace `<RouterLink>` with `<button>` or `<a>` and dispatch `navigate` events.[7]

**TODO 12.2 – `AppSidebar`**

Create `src/lib/components/layout/AppSidebar.svelte` from `AppSidebar.vue`.[7]

- Use `import { Button } from '$lib/components/ui/button';` and `import { Input } from '$lib/components/ui/input';`.[1][7]
- Keep `searchQuery`, `allTags`, `selectedTags` as local `let` runes or `let` with `$:` derived values.[7]
- Use `uiStore.openForm()` and `uiStore.toggleTheme()` exactly as Vue used `useUiStore()`.[7]

**TODO 12.3 – `FilterBar`**

Create `src/lib/components/layout/FilterBar.svelte` from `FilterBar.vue`.[7]

- Props: `export let priority: string; export let showCompleted: boolean; export let hasActiveFilters: boolean; export let search: string; export let selectedTags: string[]; export let allTags: string[];`.[7]
- Use `bind:` for v-model equivalents (`bind:priority`, `bind:showCompleted`, `bind:search`, etc.) when used in `ItemPage.svelte`.[7]
- Use Svelte `createEventDispatcher` for `clear` event.[7]

All class names and shadcn-svelte components (`RadioGroup`, `RadioGroupItem`, `Checkbox`, `Button`, `Label`) should match the Vue version 1:1.[7]

***

### 13. Port item components (`ItemItem`, `ItemForm`)

**TODO 13.1 – `ItemItem`**

Create `src/lib/components/items/ItemItem.svelte` from `ItemItem.vue`.[7]

- Keep `Card`, `CardContent`, `Badge`, `Button`, `Checkbox` imports but point to Svelte shadcn modules.[1][7]
- Replace Vue events with Svelte: `@click` → `on:click`, `@update:checked` → `on:change` on checkbox (depending on shadcn-svelte checkbox API).[7]
- Use `useUpdateItem` and `useDeleteItem` from `itemsQuery.ts` as `const updateItem = useUpdateItem(); const deleteItem = useDeleteItem();` and call `.mutate(...)`.[7]

**TODO 13.2 – `ItemForm`**

Create `src/lib/components/items/ItemForm.svelte` from `ItemForm.vue` using `@tanstack/svelte-form`.[5][3][7]

- Import:  

  ```ts
  import { createForm } from '@tanstack/svelte-form';
  import { zodValidator } from '@tanstack/zod-form-adapter';
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { useAddItem } from '$lib/api/itemsQuery';
  import { uiStore } from '$lib/stores/uiStore';
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  ```

- Define form with `createForm(() => ({ defaultValues: {...}, onSubmit, validatorAdapter: zodValidator() }))` same as Vue’s `useForm` call.[3][5][7]
- Use Svelte-form field API:  

  ```svelte
  {#await form.Field({ name: 'name', validators: { onChange: itemFormSchema.shape.name } }) then field}
    <!-- use {field.state.value}, field.handleChange, field.state.meta.errors[0] -->
  {/await}
  ```

  or the latest Svelte TanStack Form pattern per docs (the AI agent should mechanically follow doc examples for `form.Field` in Svelte, keeping exactly the same validation schemas and error messages).[5][3][7]

- Keep the dialog markup, labels, inputs, tag list, priority radio group, and buttons 1:1 with the Vue template, changing only directive syntax.[7]

***

### 14. Zod schema reuse

**TODO 14.1 – Create `src/lib/schemas/itemSchema.ts`**

Copy `src/schemas/itemSchema.ts` from Vue almost verbatim:[7]

```ts
// src/lib/schemas/itemSchema.ts
import { z } from 'zod';
import type { SingleCategory } from '$lib/types';

export const itemFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z
    .string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high']),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]) as z.ZodType<
    SingleCategory<string>
  >,
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
```

Use this schema in TanStack Svelte Form exactly as the Vue adapter uses it.[3][5][7]

***

### 15. Final check / parity checklist

After all steps, the AI agent should verify:[5][3][2][4][6][1][7]

- `/` shows the Items page with identical layout, filters, category sections, per-category “+” button, and card list.[7]
- `/about` shows the About page content and typography matching the Vue app.[7]
- `/items/:categorySlug/:itemSlug` shows the detail view, reachable by manually entering URL and with the same layout.[7]
- CRUD actions call the same backend endpoints (`/items/tree`, `/items`, `/items/:id`, `/items/:categorySlug/:itemSlug`) and behave identically.[7]
- Filters (search, priority, completed, tags) behave the same as in Vue since the filter logic was ported verbatim.[7]
- Theme toggle affects `<html>` `dark` class and Svelte app uses the same design tokens as current `src/app.css`.[1][7]
- Toast notifications show on create/update/delete success and errors, with styling comparable to `vue-sonner`.[7]

This gives a concrete, mechanical path for another AI agent to convert every Vue component into its Svelte equivalent while preserving the design system, behavior, and TanStack-based data flow 1:1.[3][5][2][4][6][1][7]

