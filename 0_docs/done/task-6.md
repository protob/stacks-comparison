Of course. Here is a crystal-clear, literal, step-by-step plan for an AI agent to refactor the codebase from using a custom data-fetching implementation with Zustand to a modern stack utilizing TanStack Query, TanStack Router, and TanStack Form, while retaining Zustand for global UI state.

**Project Goal:** Refactor the `crud-app-sqlite` frontend to `crud-app-sqlite-tanstack`, integrating the full TanStack suite for server-state, routing, and forms, following best practices as of November 2025.

---

### **Phase 0: Project Setup**

**Action:**
1.  Navigate to the parent directory of your `crud-app-sqlite` project.
2.  Clone the existing `frontend` directory into a new directory named `crud-app-sqlite-tanstack`.
3.  Navigate into the new project directory: `cd crud-app-sqlite-tanstack/frontend`.
4.  You will perform all subsequent actions within this `crud-app-sqlite-tanstack/frontend` directory.

---

### **Phase 1: Dependency Management**

**Step 1.1: Uninstall Old Dependencies**
*   **Action:** Remove the `react-router-dom` library.
*   **Command:**
    ```bash
    bun remove react-router-dom
    ```

**Step 1.2: Install TanStack Dependencies**
*   **Action:** Add the required TanStack libraries and the Zod adapter for TanStack Form.
*   **Command:**
    ```bash
    bun add @tanstack/react-query @tanstack/router @tanstack/react-form @tanstack/zod-form-adapter @tanstack/react-query-devtools
    ```

**Step 1.3: Update `package.json`**
*   **Action:** REPLACE the entire content of `package.json` to reflect the new dependencies and add a script for generating the router's type definitions.
*   **File Path:** `package.json`
*   **New Content:**
    ```json
    {
      "name": "react-todo-app-tanstack",
      "private": true,
      "version": "1.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "bun run route-gen && tsc && vite build",
        "preview": "vite preview",
        "type-check": "tsc --noEmit",
        "route-gen": "vite-node src/router.ts"
      },
      "dependencies": {
        "@tanstack/react-form": "^0.23.0",
        "@tanstack/react-query": "^5.51.1",
        "@tanstack/react-router": "^1.44.0",
        "@tanstack/zod-form-adapter": "^0.23.0",
        "clsx": "^2.1.0",
        "lucide-react": "^0.379.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "zod": "^3.23.8",
        "zustand": "^4.5.0"
      },
      "devDependencies": {
        "@tailwindcss/vite": "^4.0.0-alpha.13",
        "@tanstack/react-query-devtools": "^5.51.1",
        "@types/react": "^18.2.66",
        "@types/react-dom": "^18.2.22",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.19",
        "tailwindcss": "^4.0.0-alpha.13",
        "typescript": "^5.7.2",
        "unplugin-auto-import": "^0.17.6",
        "vite": "^5.2.0",
        "vite-node": "^2.0.3"
      }
    }
    ```

---

### **Phase 2: Integrating TanStack Query for Server State**

**Step 2.1: Configure Auto-Imports for TanStack Query**
*   **Action:** Update the Vite configuration to auto-import TanStack Query hooks.
*   **File Path:** `vite.config.ts`
*   **Action:** Find the `AutoImport` plugin configuration and add `'@tanstack/react-query': ['useQuery', 'useMutation', 'useQueryClient']` to the imports section.
*   **New `imports` section in `vite.config.ts`:**
    ```typescript
    imports: [
      'react',
      {
        'react-router-dom': ['useNavigate', 'useParams', 'useLocation', 'useSearchParams'], // This will be removed by the router setup later
        '@tanstack/react-query': ['useQuery', 'useMutation', 'useQueryClient'],
        'zustand': [['default', 'create']],
        'zustand/middleware': ['devtools', 'persist'],
        'clsx': [['default', 'clsx']],
      },
    ],
    ```

**Step 2.2: Simplify the Zustand Item Store**
*   **Action:** Remove all server state logic from the item store. It will no longer handle fetching, creating, updating, or deleting items.
*   **File Path:** `src/stores/useItemStore.ts`
*   **Action:** REPLACE the entire file content.
*   **New Content:**
    ```typescript
    import { create } from 'zustand';
    import { devtools } from 'zustand/middleware';

    interface ItemState {
      // This store is now a placeholder.
      // You can add client-side state here if needed in the future,
      // such as complex filter states that don't belong in the URL.
      clientOnlyState: string;
      setClientOnlyState: (value: string) => void;
    }

    export const useItemStore = create<ItemState>()(
      devtools(
        (set) => ({
          clientOnlyState: 'Ready',
          setClientOnlyState: (value: string) => set({ clientOnlyState: value }),
        }),
        { name: 'item-store' }
      )
    );
    ```

**Step 2.3: Create a Dedicated Hook for API Mutations and Queries**
*   **Action:** Create a new file to house all TanStack Query hooks related to items. This centralizes server state logic.
*   **File Path:** `src/hooks/useItemsApi.ts`
*   **New Content:**
    ```typescript
    import * as itemApi from '@/api/itemApi';
    import { useUiStore } from '@/stores/useUiStore';
    import { slugify } from '@/utils/slugify';
    import type { Item } from '@/types';

    // Define query keys for caching
    export const itemKeys = {
      all: ['items'] as const,
      tree: () => [...itemKeys.all, 'tree'] as const,
      detail: (category: string, slug: string) => [...itemKeys.all, 'detail', category, slug] as const,
    };

    /**
     * Fetches the entire item tree.
     */
    export const useGetItemTree = () => {
      return useQuery({
        queryKey: itemKeys.tree(),
        queryFn: itemApi.getItemTree,
      });
    };

    /**
     * Provides a mutation function for creating a new item.
     */
    export const useAddItem = () => {
      const queryClient = useQueryClient();
      const { showNotification } = useUiStore.getState();

      return useMutation({
        mutationFn: itemApi.createItem,
        onSuccess: (newItem) => {
          showNotification('success', `Item "${newItem.name}" added.`);
          // Invalidate the cache for the item tree to trigger a refetch
          queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
        },
        onError: (error) => {
          showNotification('error', error.message || 'Failed to add item.');
        },
      });
    };

    /**
     * Provides a mutation function for updating an existing item.
     */
    export const useUpdateItem = () => {
      const queryClient = useQueryClient();
      const { showNotification } = useUiStore.getState();

      return useMutation({
        mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
          itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
        onSuccess: (updatedItem) => {
          showNotification('success', `Item "${updatedItem.name}" updated.`);
          // Invalidate both the tree and the specific item detail query
          queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
          const categorySlug = slugify(updatedItem.categories[0]);
          queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
        },
        onError: (error) => {
          showNotification('error', error.message || 'Failed to update item.');
        },
      });
    };

    /**
     * Provides a mutation for toggling an item's completion status.
     */
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

    /**
     * Provides a mutation function for deleting an item.
     */
    export const useDeleteItem = () => {
      const queryClient = useQueryClient();
      const { showNotification } = useUiStore.getState();

      return useMutation({
        mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
          itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
        onSuccess: () => {
          showNotification('success', 'Item deleted.');
          queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
        },
        onError: (error) => {
          showNotification('error', error.message || 'Failed to delete item.');
        },
      });
    };
    ```

---

### **Phase 3: Integrating TanStack Router**

**Step 3.1: Define the Application Routes**
*   **Action:** Create a new file to define the entire application's routing structure, including data loaders that integrate with TanStack Query.
*   **File Path:** `src/router.ts`
*   **New Content:**
    ```typescript
    import {
      createRouter,
      createRootRoute,
      createRoute,
      createFileRoute,
    } from '@tanstack/router';
    import { QueryClient } from '@tanstack/react-query';
    import { itemKeys } from './hooks/useItemsApi';
    import * as itemApi from './api/itemApi';

    // Import page/layout components (we will create/update these next)
    import App from './App';
    import ItemPage from './pages/ItemPage';
    import AboutPage from './pages/AboutPage';
    import ItemDetailPage from './pages/ItemDetailPage';

    export const queryClient = new QueryClient();

    // Create a root route that will serve as the main layout
    const rootRoute = createRootRoute({
      component: App,
    });

    // Create the index route for the main item page
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: ItemPage,
      // Loader to pre-fetch data for this route
      loader: () => {
        return queryClient.ensureQueryData({
          queryKey: itemKeys.tree(),
          queryFn: itemApi.getItemTree,
        });
      },
    });

    // Create the about route
    const aboutRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/about',
      component: AboutPage,
    });
    
    // Create the item detail route with type-safe params
    const itemDetailRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '/items/$categorySlug/$itemSlug',
        loader: ({ params: { categorySlug, itemSlug } }) => {
            return queryClient.ensureQueryData({
                queryKey: itemKeys.detail(categorySlug, itemSlug),
                queryFn: () => itemApi.getItem(categorySlug, itemSlug),
            });
        },
        component: ItemDetailPage,
    });

    // Create the route tree
    const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, itemDetailRoute]);

    // Create the router instance
    export const router = createRouter({ routeTree, context: { queryClient } });

    // Register the router for typesafety
    declare module '@tanstack/router' {
      interface Register {
        router: typeof router;
      }
    }
    ```

**Step 3.2: Update the Main Application Entry Point**
*   **Action:** Modify `main.tsx` to set up `QueryClientProvider` and `RouterProvider`.
*   **File Path:** `src/main.tsx`
*   **Action:** REPLACE the entire file content.
*   **New Content:**
    ```tsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { RouterProvider } from '@tanstack/router';
    import { QueryClientProvider } from '@tanstack/react-query';
    import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
    import { router, queryClient } from './router';
    import './index.css';

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </React.StrictMode>
    );
    ```

**Step 3.3: Adapt the Root `App` Component**
*   **Action:** Modify `App.tsx` to serve as the root layout component, rendering the TanStack Router's `<Outlet />`.
*   **File Path:** `src/App.tsx`
*   **Action:** REPLACE the entire file content.
*   **New Content:**
    ```tsx
    import { Outlet } from '@tanstack/router';
    import AppSidebar from './components/layout/AppSidebar';
    import Notifications from './components/common/Notifications';
    import { useUiStore } from './stores/useUiStore';
    import { useEffect } from 'react';

    function App() {
      const { theme } = useUiStore();

      useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
      }, [theme]);

      return (
        <div className="flex h-screen bg-background text-text-primary">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
          <Notifications />
        </div>
      );
    }

    export default App;
    ```

**Step 3.4: Create/Update Page Components**
*   **Action:** Your `ItemPage.tsx`, `AboutPage.tsx`, and `ItemDetailPage.tsx` will now be rendered by the router. They need to be updated to fetch data from the router's loader context.
*   **File Path:** `src/pages/ItemPage.tsx`
*   **Action:** REPLACE the entire file content to use the `useGetItemTree` hook, which gets its initial data from the route loader.
*   **New Content:**
    ```tsx
    import { useState } from 'react';
    import { useGetItemTree } from '@/hooks/useItemsApi';
    import { useItemFilters } from '@/hooks/useItemFilters';
    import FilterBar from '@/components/layout/FilterBar';
    import ItemItem from '@/components/items/ItemItem';
    import { useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';

    export default function ItemPage() {
      const { data: itemTree = {}, isLoading, error } = useGetItemTree();
      const [searchQuery, setSearchQuery] = useState('');
      
      // The filter hook can remain as it is pure logic
      const { filteredItemTree, totalFilteredItems } = useItemFilters(itemTree, {
          searchQuery,
          selectedPriority: 'all',
          showCompleted: true,
          selectedTags: [],
      });
      
      const toggleItemCompletion = useToggleItemCompletion();
      const deleteItemMutation = useDeleteItem();

      if (isLoading) return <div>Loading items...</div>;
      if (error) return <div className="text-danger">Error: {error.message}</div>;

      return (
        <div className="space-y-4">
          <FilterBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
          <p className="text-text-muted">{totalFilteredItems} items found.</p>
          <div className="space-y-6">
            {Object.entries(filteredItemTree).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-size-lg font-bold mb-2 capitalize border-b border-border pb-1">
                  {category.replace(/-/g, ' ')}
                </h2>
                <div className="space-y-2">
                  {items.map(item => (
                    <ItemItem
                      key={item.id}
                      item={item}
                      onToggleComplete={() => toggleItemCompletion(item)}
                      onDelete={() => deleteItemMutation.mutate({ categorySlug: category, itemSlug: item.slug })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    ```
*   **File Path:** `src/pages/ItemDetailPage.tsx`
*   **Action:** CREATE this new file.
*   **New Content:**
    ```tsx
    import { useRoute } from '@tanstack/router';
    import { Link } from '@tanstack/router';

    export default function ItemDetailPage() {
        // useRoute hook provides access to the current route instance, including loader data
        const { useLoaderData } = useRoute();
        const item = useLoaderData();

        return (
            <div className="p-4 bg-surface rounded-card">
                <Link to="/" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all items</Link>
                <h1 className="text-size-xl font-bold mb-2">{item.name}</h1>
                <p className="text-text-secondary mb-4">Category: {item.categories[0]}</p>
                <div className="prose dark:prose-invert">
                    <p>{item.text}</p>
                </div>
                <div className="flex gap-2 mt-4">
                    {item.tags.map(tag => (
                        <span key={tag} className="tag-sm bg-surface-hover text-text-secondary rounded-button">{tag}</span>
                    ))}
                </div>
            </div>
        );
    }
    ```
*   **File Path:** `src/pages/AboutPage.tsx`
*   **Action:** CREATE this new file.
*   **New Content:**
    ```tsx
    export default function AboutPage() {
      return (
        <div className="p-4 bg-surface rounded-card">
          <h1 className="text-size-xl font-bold mb-4">About This Application</h1>
          <p>
            This is a modern, responsive React frontend for managing items, now refactored to use the full TanStack suite:
          </p>
          <ul className="list-disc list-inside my-4 space-y-2">
            <li><strong>TanStack Query</strong> for server state management.</li>
            <li><strong>TanStack Router</strong> for type-safe client-side routing.</li>
            <li><strong>TanStack Form</strong> for performant and type-safe forms.</li>
            <li><strong>Zustand</strong> for global UI state.</li>
            <li><strong>Tailwind CSS v4</strong> for styling.</li>
          </ul>
        </div>
      );
    }
    ```

---

### **Phase 4: Integrating TanStack Form**

**Step 4.1: Refactor the Item Form Component**
*   **Action:** Rewrite `ItemForm.tsx` to use the `useForm` hook from TanStack Form with the Zod adapter for validation.
*   **File Path:** `src/components/items/ItemForm.tsx`
*   **Action:** REPLACE the entire file content.
*   **New Content:**
    ```tsx
    import { useForm } from '@tanstack/react-form';
    import { zodValidator } from '@tanstack/zod-form-adapter';
    import { z } from 'zod';
    import { useAddItem, useUpdateItem } from '@/hooks/useItemsApi';
    import type { Item, Priority, SingleCategory } from '@/types';
    import Button from '../common/Button';

    // Define Zod schema for form validation
    const itemSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        text: z.string().min(1, 'Text is required'),
        priority: z.enum(['low', 'mid', 'high']),
        tags: z.array(z.string()).optional(),
        categories: z.tuple([z.string().min(1, "Category is required")]) as z.ZodType<SingleCategory<string>>,
    });

    interface ItemFormProps {
        item?: Item;
        onDone: () => void;
    }

    export default function ItemForm({ item, onDone }: ItemFormProps) {
        const addItem = useAddItem();
        const updateItem = useUpdateItem();

        const form = useForm({
            defaultValues: {
                name: item?.name || '',
                text: item?.text || '',
                priority: item?.priority || 'mid',
                tags: item?.tags || [],
                categories: item?.categories || [''],
            },
            validator: zodValidator,
            onSubmit: async ({ value }) => {
                if (item) {
                    // Update logic
                    updateItem.mutate({ categorySlug: item.categories[0], itemSlug: item.slug, payload: value });
                } else {
                    // Create logic
                    addItem.mutate(value);
                }
                onDone();
            },
        });

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <form.Field
                    name="name"
                    validators={{ onChange: itemSchema.shape.name }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name}>Name</label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                        </div>
                    )}
                />
                
                {/* Add other fields similarly (text, category, etc.) */}

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={onDone}>Cancel</Button>
                    <form.Subscribe
                      selector={(state) => [state.canSubmit, state.isSubmitting]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit}>
                          {isSubmitting ? 'Saving...' : 'Save Item'}
                        </Button>
                      )}
                    />
                </div>
            </form>
        );
    }
    ```

---

### **Phase 5: Final Cleanup and Verification**

**Step 5.1: Final Verification**
*   **Action:** Start the development server.
*   **Command:** `bun run dev`
*   **Verification Steps:**
    1.  The application should load on `http://localhost:5173`.
    2.  The item list should be fetched via TanStack Query (check the Network tab and React Query Devtools).
    3.  Navigating to `/about` should work correctly using TanStack Router.
    4.  Clicking an item should navigate to its detail page.
    5.  Creating, updating, and deleting items should trigger mutations and automatically refetch the item list.
    6.  Form validation in the `ItemForm` should work as defined by the Zod schema.
    7.  Zustand should still manage the theme and notifications correctly.

You have now successfully refactored the application to use the full power of the TanStack suite, resulting in a more robust, maintainable, and performant frontend.