Of course. I understand the situation perfectly. The initial refactor set up the core TanStack architecture, but it stripped away the specific UI components and client-side state management that made the original application functional and visually complete.

The goal now is to restore the application's look, feel, and functionality to be a 1:1 match with the original, but built *on top* of the new TanStack foundation.

Here is the second, highly detailed list of tasks for the AI agent. This plan focuses on rebuilding the UI components, re-introducing the client-side filter state, and wiring everything together correctly.

---

### **Phase 2: UI and Functionality Restoration**

**Objective:** Re-implement the UI components and client-side logic that were lost during the initial migration. This will make the TanStack version visually and functionally identical to the original.

**Step 2.1: Restore the Full-Featured Item Form**
*   **Action:** The current `ItemForm.tsx` is a placeholder. Replace it with the complete form, including all fields, validation, and layout, using TanStack Form.
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
    import { slugify } from '@/utils/slugify';

    // Expanded Zod schema for full validation
    const itemSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        text: z.string().min(1, 'Description is required'),
        priority: z.enum(['low', 'mid', 'high']),
        tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)), // Handle comma-separated tags
        categories: z.tuple([z.string().min(1, "Category is required")]) as z.ZodType<SingleCategory<string>>,
    });

    interface ItemFormProps {
        item?: Item;
        onDone: () => void;
    }

    export default function ItemForm({ item, onDone }: ItemFormProps) {
        const addItemMutation = useAddItem();
        const updateItemMutation = useUpdateItem();

        const form = useForm({
            defaultValues: {
                name: item?.name || '',
                text: item?.text || '',
                priority: item?.priority || 'mid',
                tags: item?.tags?.join(', ') || '',
                categories: item?.categories || [''],
            },
            validator: zodValidator,
            onSubmit: async ({ value }) => {
                const preparedPayload = {
                    ...value,
                    categories: [value.categories[0].trim()] as SingleCategory<string>,
                };

                if (item) {
                    const originalCategorySlug = slugify(item.categories[0]);
                    updateItemMutation.mutate({
                        categorySlug: originalCategorySlug,
                        itemSlug: item.slug,
                        payload: preparedPayload,
                    });
                } else {
                    addItemMutation.mutate(preparedPayload);
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
                {/* Name Field */}
                <form.Field
                    name="name"
                    validators={{ onChange: itemSchema.shape.name }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full"
                                placeholder="e.g., Deploy the new feature"
                            />
                            {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                        </div>
                    )}
                />

                {/* Text/Description Field */}
                <form.Field
                    name="text"
                    validators={{ onChange: itemSchema.shape.text }}
                    children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full"
                                rows={3}
                                placeholder="Add more details here..."
                            />
                            {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                        </div>
                    )}
                />

                {/* Category Field */}
                <form.Field
                    name="categories"
                    validators={{ onChange: itemSchema.shape.categories }}
                     children={(field) => (
                        <div>
                            <label htmlFor="categories-input" className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                            <input
                                id="categories-input"
                                name={field.name}
                                value={field.state.value[0]}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange([e.target.value])}
                                className="w-full"
                                placeholder="e.g., Work or Personal"
                            />
                            {field.state.meta.errors && <p className="text-sm text-danger mt-1">{field.state.meta.errors.join(', ')}</p>}
                        </div>
                    )}
                />

                {/* Tags Field */}
                <form.Field
                    name="tags"
                     children={(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-text-secondary mb-1">Tags (comma-separated)</label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full"
                                placeholder="e.g., urgent, frontend, bug"
                            />
                        </div>
                    )}
                />

                {/* Priority Field */}
                <form.Field
                    name="priority"
                    children={(field) => (
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
                            <div className="flex items-center gap-4">
                                {(['high', 'mid', 'low'] as Priority[]).map((p) => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={field.name}
                                            checked={field.state.value === p}
                                            onChange={() => field.handleChange(p)}
                                            onBlur={field.handleBlur}
                                        />
                                        <span className="capitalize">{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                />

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="secondary" onClick={onDone}>Cancel</Button>
                    <form.Subscribe
                      selector={(state) => [state.canSubmit, state.isSubmitting]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit || isSubmitting}>
                          {isSubmitting ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
                        </Button>
                      )}
                    />
                </div>
            </form>
        );
    }
    ```

**Step 2.2: Rebuild the Item Display Component**
*   **Action:** Create the `ItemItem.tsx` component to display individual items exactly as they appeared in the original design.
*   **File Path:** `src/components/items/ItemItem.tsx`
*   **Action:** CREATE this new file with the following content.
*   **New Content:**
    ```tsx
    import { Link } from '@tanstack/router';
    import type { Item } from '@/types';
    import { formatDate } from '@/utils/helpers';
    import Button from '../common/Button';

    interface ItemItemProps {
      item: Item;
      onToggleComplete: () => void;
      onDelete: () => void;
      onEdit: () => void;
    }

    const priorityClasses: { [key in Item['priority']]: string } = {
      high: 'bg-danger text-text-inverse',
      mid: 'bg-primary text-text-inverse',
      low: 'bg-surface-hover text-text-secondary',
    };

    export default function ItemItem({ item, onToggleComplete, onDelete, onEdit }: ItemItemProps) {
      return (
        <div className={`p-card bg-surface rounded-card shadow-sm transition-opacity ${item.isCompleted ? 'opacity-50' : ''}`}>
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={onToggleComplete}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <Link to="/items/$categorySlug/$itemSlug" params={{ categorySlug: item.categories[0], itemSlug: item.slug }}>
                    <h3 className="text-size-base font-bold hover:underline">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className={`tag-sm rounded-button ${priorityClasses[item.priority]}`}>
                    {item.priority}
                  </span>
                  <Button size="sm" variant="ghost" icon="Edit" onClick={onEdit} />
                  <Button size="sm" variant="ghost" icon="Trash2" onClick={onDelete} className="text-danger" />
                </div>
              </div>
              <p className="text-text-secondary text-size-sm mt-1">{item.text}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  {item.tags?.map(tag => (
                    <span key={tag} className="tag-sm bg-surface-hover text-text-secondary rounded-button">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-text-muted text-size-xs">{formatDate(item.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    ```

**Step 2.3: Rebuild the Filter Bar**
*   **Action:** The `FilterBar.tsx` was simplified. Restore it to include the priority and completion status filters.
*   **File Path:** `src/components/layout/FilterBar.tsx`
*   **Action:** CREATE this new file with the following content.
*   **New Content:**
    ```tsx
    import type { Priority } from "@/types";

    interface FilterBarProps {
        searchQuery: string;
        onSearchQueryChange: (query: string) => void;
        selectedPriority: 'all' | Priority;
        onPriorityChange: (priority: 'all' | Priority) => void;
        showCompleted: boolean;
        onShowCompletedChange: (show: boolean) => void;
    }

    export default function FilterBar({
        searchQuery, onSearchQueryChange,
        selectedPriority, onPriorityChange,
        showCompleted, onShowCompletedChange
    }: FilterBarProps) {
        return (
            <div className="p-4 bg-surface rounded-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Priority</h4>
                        <div className="flex items-center gap-4">
                            {(['all', 'high', 'mid', 'low'] as const).map(p => (
                                <label key={p} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        checked={selectedPriority === p}
                                        onChange={() => onPriorityChange(p)}
                                    />
                                    <span className="capitalize">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Status</h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCompleted}
                                onChange={(e) => onShowCompletedChange(e.target.checked)}
                            />
                            Show completed
                        </label>
                    </div>
                </div>
            </div>
        );
    }
    ```

**Step 2.4: Restore the Main Page Logic**
*   **Action:** Update `ItemPage.tsx` to manage the state for all filters, handle the add/edit modal, and pass the correct data and functions down to the child components (`FilterBar`, `ItemItem`).
*   **File Path:** `src/pages/ItemPage.tsx`
*   **Action:** REPLACE the entire file content.
*   **New Content:**
    ```tsx
    import { useState } from 'react';
    import { useGetItemTree, useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';
    import { useItemFilters } from '@/hooks/useItemFilters';
    import FilterBar from '@/components/layout/FilterBar';
    import ItemItem from '@/components/items/ItemItem';
    import ItemForm from '@/components/items/ItemForm';
    import Modal from '@/components/common/Modal';
    import Button from '@/components/common/Button';
    import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal';
    import type { Item, Priority } from '@/types';

    export default function ItemPage() {
      // Server state from TanStack Query
      const { data: itemTree = {}, isLoading, error } = useGetItemTree();

      // Client-side state for UI and filters
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');
      const [showCompleted, setShowCompleted] = useState(true);
      const [selectedTags, setSelectedTags] = useState<string[]>([]);
      const [isFormModalOpen, setIsFormModalOpen] = useState(false);
      const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
      const [deletingItem, setDeletingItem] = useState<Item | undefined>(undefined);

      // Memoized filtering logic
      const { filteredItemTree, totalFilteredItems } = useItemFilters(itemTree, {
          searchQuery,
          selectedPriority,
          showCompleted,
          selectedTags,
      });

      // Mutations from TanStack Query
      const toggleItemCompletionMutation = useToggleItemCompletion();
      const deleteItemMutation = useDeleteItem();

      const handleOpenFormModal = (item?: Item) => {
        setEditingItem(item);
        setIsFormModalOpen(true);
      };

      const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
        setEditingItem(undefined);
      };

      const handleDelete = () => {
        if (deletingItem) {
          const categorySlug = slugify(deletingItem.categories[0]);
          deleteItemMutation.mutate({ categorySlug, itemSlug: deletingItem.slug });
          setDeletingItem(undefined);
        }
      };

      if (isLoading) return <div className="text-center p-8">Loading items...</div>;
      if (error) return <div className="text-center p-8 text-danger">Error: {error.message}</div>;

      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
                <h1 className="text-size-xl font-bold">Items</h1>
                <p className="text-text-muted">{totalFilteredItems} of {Object.values(itemTree).flat().length} items</p>
            </div>
            <Button onClick={() => handleOpenFormModal()} icon="Plus">
              Add Item
            </Button>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery} // Note: The search input is in the sidebar, we'll connect this next.
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
          />
          
          <div className="space-y-6">
            {Object.keys(filteredItemTree).length > 0 ? (
                Object.entries(filteredItemTree).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-size-lg font-bold mb-2 capitalize border-b border-border pb-1">
                      {category.replace(/-/g, ' ')}
                    </h2>
                    <div className="space-y-2">
                      {items.map(item => (
                        <ItemItem
                          key={item.id}
                          item={item}
                          onToggleComplete={() => toggleItemCompletionMutation(item)}
                          onDelete={() => setDeletingItem(item)}
                          onEdit={() => handleOpenFormModal(item)}
                        />
                      ))}
                    </div>
                  </div>
                ))
            ) : (
                <div className="text-center p-8 bg-surface rounded-card">
                    <p>No items match your filters.</p>
                </div>
            )}
          </div>

          {/* Modals */}
          <Modal isOpen={isFormModalOpen} onClose={handleCloseFormModal} title={editingItem ? 'Edit Item' : 'Add New Item'}>
            <ItemForm item={editingItem} onDone={handleCloseFormModal} />
          </Modal>

          <ConfirmDeleteModal
            isOpen={!!deletingItem}
            onClose={() => setDeletingItem(undefined)}
            onConfirm={handleDelete}
            itemName={deletingItem?.name || ''}
            isDeleting={deleteItemMutation.isPending}
          />
        </div>
      );
    }
    ```

**Step 2.5: Restore the Sidebar and Connect Search**
*   **Action:** The sidebar needs to be rebuilt with proper navigation links and a search bar that updates the state in `ItemPage`. Since state is in `ItemPage`, we will lift it up to `App.tsx` to share it.
*   **File Path:** `src/App.tsx`
*   **Action:** First, LIFT the search state up to the `App` component so the sidebar can modify it and the page can consume it.
*   **New Content:**
    ```tsx
    import { Outlet, useRouterState } from '@tanstack/router';
    import AppSidebar from './components/layout/AppSidebar';
    import Notifications from './components/common/Notifications';
    import { useUiStore } from './stores/useUiStore';
    import { useEffect, useState } from 'react';

    function App() {
      const { theme } = useUiStore();
      const [searchQuery, setSearchQuery] = useState('');
      const router = useRouterState();

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

      // Clear search when navigating away from the main page
      useEffect(() => {
        if (router.location.pathname !== '/') {
            setSearchQuery('');
        }
      }, [router.location.pathname]);

      return (
        <div className="flex h-screen bg-background text-text-primary">
          <AppSidebar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {/* Pass search query through the outlet's context */}
            <Outlet context={{ searchQuery, setSearchQuery }} />
          </main>
          <Notifications />
        </div>
      );
    }
    
    export default App;
    ```
*   **File Path:** `src/router.ts`
*   **Action:** Update the router definition to pass the `searchQuery` context down.
*   **Updated `createRouter` call in `src/router.ts`:**
    ```typescript
    // In src/router.ts

    // ... (rest of the file)
    
    // Create the router instance
    export const router = createRouter({ 
        routeTree, 
        context: { 
            queryClient,
            searchQuery: '', // Default value
            setSearchQuery: (query: string) => {}, // Default no-op function
        }
    });
    
    // ...
    ```

*   **File Path:** `src/pages/ItemPage.tsx`
*   **Action:** Modify `ItemPage.tsx` to *receive* the search query from the router context instead of managing it internally.
*   **Action:** In `src/pages/ItemPage.tsx`, remove the `const [searchQuery, setSearchQuery] = useState('');` line and add `const { searchQuery, setSearchQuery } = useOutletContext();` from `@tanstack/router`.
*   **Action:** Also, remove the `searchQuery` and `onSearchQueryChange` props from the `<FilterBar />` component call, as search is now in the sidebar.

*   **File Path:** `src/components/layout/AppSidebar.tsx`
*   **Action:** CREATE this file with the fully functional sidebar, using TanStack Router's `<Link>` and consuming the `useGetItemTree` hook to display all available tags.
*   **New Content:**
    ```tsx
    import { Link } from '@tanstack/router';
    import { Sun, Moon, Tags, Search } from 'lucide-react';
    import { useUiStore } from '@/stores/useUiStore';
    import Clock from '../common/Clock';
    import { useGetItemFilters } from '@/hooks/useItemFilters';
    import { useGetItemTree } from '@/hooks/useItemsApi';

    interface AppSidebarProps {
      searchQuery: string;
      onSearchQueryChange: (query: string) => void;
    }

    export default function AppSidebar({ searchQuery, onSearchQueryChange }: AppSidebarProps) {
        const { theme, toggleTheme } = useUiStore();
        const { data: itemTree = {} } = useGetItemTree();
        const { allTags } = useGetItemFilters(itemTree, {
            searchQuery: '',
            selectedPriority: 'all',
            showCompleted: true,
            selectedTags: [],
        });

        return (
            <aside className="w-[--sidebar-width] bg-surface flex flex-col p-4 border-r border-border">
                <div className="flex-1 space-y-6">
                    <div>
                        <h2 className="text-size-sm font-semibold text-text-muted mb-2">Navigation</h2>
                        <nav className="space-y-1">
                            <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-surface-hover" activeProps={{ className: 'bg-primary text-text-inverse' }}>
                                Items
                            </Link>
                            <Link to="/about" className="flex items-center gap-2 p-2 rounded-md hover:bg-surface-hover" activeProps={{ className: 'bg-primary text-text-inverse' }}>
                                About
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h2 className="text-size-sm font-semibold text-text-muted mb-2 flex items-center gap-2"><Search size={16} /> Search</h2>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => onSearchQueryChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-size-sm font-semibold text-text-muted mb-2 flex items-center gap-2"><Tags size={16} /> Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => (
                                <button key={tag} className="tag-sm bg-surface-hover text-text-secondary rounded-button hover:bg-surface-active">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Clock />
                    <button onClick={toggleTheme} className="w-full flex items-center justify-center p-2 rounded-md bg-surface-hover">
                        {theme === 'dark' ? <Sun /> : <Moon />}
                    </button>
                </div>
            </aside>
        );
    }
    ```
*   **Action:** You will need to create the `Clock.tsx`, `Modal.tsx`, and `ConfirmDeleteModal.tsx` components. For now, you can use these placeholders.
*   **File Path:** `src/components/common/Clock.tsx` -> **CREATE**
    ```tsx
    import { useState, useEffect } from 'react';
    export default function Clock() {
        const [time, setTime] = useState(new Date());
        useEffect(() => {
            const timerId = setInterval(() => setTime(new Date()), 1000);
            return () => clearInterval(timerId);
        }, []);
        return <div className="text-center text-sm text-text-muted">{time.toLocaleTimeString()}</div>;
    }
    ```
*   **File Path:** `src/components/common/Modal.tsx` -> **CREATE**
    ```tsx
    import { ReactNode } from 'react';
    export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactNode }) {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-backdrop z-50 flex items-center justify-center" onClick={onClose}>
                <div className="bg-modal-bg rounded-card p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-lg font-bold mb-4">{title}</h2>
                    {children}
                </div>
            </div>
        );
    }
    ```
*   **File Path:** `src/components/common/ConfirmDeleteModal.tsx` -> **CREATE**
    ```tsx
    import Button from './Button';
    import Modal from './Modal';
    export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName, isDeleting }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, itemName: string, isDeleting: boolean }) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
                <p>Are you sure you want to delete "{itemName}"? This action cannot be undone.</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </Modal>
        );
    }
    ```
*   **File Path:** `src/components/common/Button.tsx` -> **CREATE**
    ```tsx
    import { forwardRef } from 'react';
    import clsx from 'clsx';
    import { icons, LucideProps } from 'lucide-react';
    
    type IconName = keyof typeof icons;

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
        icon?: IconName;
        iconPosition?: 'left' | 'right';
    }

    const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
        variant = 'primary',
        size = 'md',
        icon,
        iconPosition = 'left',
        children,
        className,
        ...props
    }, ref) => {
        const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-button transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';

        const variantClasses = {
            primary: 'bg-primary text-text-inverse hover:bg-primary-hover',
            secondary: 'bg-surface-hover text-text-primary hover:bg-surface-active',
            danger: 'bg-danger text-text-inverse hover:bg-danger-hover',
            ghost: 'bg-transparent text-text-secondary hover:bg-surface-hover',
        };

        const sizeClasses = {
            sm: 'btn-sm',
            md: 'btn-md',
            lg: 'btn-lg',
        };
        
        const Icon = icon ? icons[icon] : null;

        return (
            <button
                ref={ref}
                className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
                {...props}
            >
                {Icon && iconPosition === 'left' && <Icon size={16} />}
                {children}
                {Icon && iconPosition === 'right' && <Icon size={16} />}
            </button>
        );
    });

    export default Button;
    ```

### **Phase 6: Final Verification**

*   **Action:** After applying all the changes above, run the development server.
*   **Command:** `bun run dev`
*   **Verification Checklist:**
    1.  Does the sidebar appear correctly with "Items" and "About" links?
    2.  Does the search bar in the sidebar filter the items on the main page?
    3.  Does the `FilterBar` component appear above the item list?
    4.  Do the "Priority" and "Status" filters in the `FilterBar` correctly filter the displayed items?
    5.  Does clicking the "Add Item" button open a modal with the full form?
    6.  Does the form validation work for all fields?
    7.  Can you successfully create, edit, and delete an item?
    8.  Are the UI notifications appearing for each action?
    9.  Does the application look and behave identically to the screenshots and description of the original?

This detailed plan should guide the agent to restore all the missing pieces, resulting in a functionally and visually identical application that leverages the superior architecture of the TanStack suite.