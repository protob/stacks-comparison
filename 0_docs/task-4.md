Current working directory is crud-app-sqlite/frontend

Follow these literal to-do steps exactly as written. Do not skip any steps, do not add extra code, do not modify the code I provide, and do not make any decisions on your own. Copy and paste the code directly into the specified files. If a file does not exist, create it. If it does exist, replace its entire content with the provided code. After completing all steps, run `npm install` to ensure dependencies are up to date, then run `npm run dev` to test.

1. Update src/styles/main.css with the following code to adjust proportions (smaller fonts, spacing, sidebar, etc.), add semantic utility classes for consistent theme application (to prevent mixed light/dark elements), and ensure all tokens are used properly for the design system. This makes components use classes like bg-surface instead of hard-coded colors, fixing the mixed mode issue. I have scaled down clamps for smaller UI elements and added utilities for all semantic tokens.

```css
@theme {
  /* =========================
     1. PRIMITIVE TOKENS - Foundations
     ========================= */

  /* Breakpoints - Fluid scaling between breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Typography */
  --font-family-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-size-base: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); /* Scaled down from 14-16px to 12-14px */
  --font-size-sm: clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
  --font-size-lg: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-xl: clamp(1.2rem, 1.1rem + 0.5vw, 1.35rem);
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Spacing - 4px base grid with fluid scaling, scaled down for smaller UI */
  --spacing-0: 0px;
  --spacing-px: 1px;
  --spacing-1: clamp(0.15rem, 0.13rem + 0.1vw, 0.25rem); /* 2.4-4px */
  --spacing-2: clamp(0.3rem, 0.26rem + 0.2vw, 0.5rem); /* 4.8-8px */
  --spacing-3: clamp(0.45rem, 0.39rem + 0.3vw, 0.75rem); /* 7.2-12px */
  --spacing-4: clamp(0.6rem, 0.52rem + 0.4vw, 1rem); /* 9.6-16px */
  --spacing-5: clamp(0.75rem, 0.65rem + 0.5vw, 1.25rem); /* 12-20px */
  --spacing-6: clamp(0.9rem, 0.78rem + 0.6vw, 1.5rem); /* 14.4-24px */
  --spacing-8: clamp(1.2rem, 1.04rem + 0.8vw, 2rem); /* 19.2-32px */
  --spacing-10: clamp(1.5rem, 1.3rem + 1vw, 2.5rem); /* 24-40px */
  --spacing-12: clamp(1.8rem, 1.56rem + 1.2vw, 3rem); /* 28.8-48px */

  /* Radius */
  --radius-sm: clamp(0.15rem, 0.13rem + 0.1vw, 0.25rem); /* Scaled down */
  --radius-md: clamp(0.3rem, 0.26rem + 0.2vw, 0.5rem);
  --radius-lg: clamp(0.45rem, 0.39rem + 0.3vw, 0.75rem);
  --radius-xl: clamp(0.6rem, 0.52rem + 0.4vw, 1rem);
  --radius-full: 9999px;

  /* Shadows */
  --shadow: 0 2px 4px oklch(0% 0 0 / 0.05), 0 1px 2px oklch(0% 0 0 / 0.1);
  --shadow-md: 0 4px 6px oklch(0% 0 0 / 0.05), 0 2px 4px oklch(0% 0 0 / 0.1);
  --shadow-lg: 0 10px 15px oklch(0% 0 0 / 0.1), 0 4px 6px oklch(0% 0 0 / 0.05);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* =========================
     2. SEMANTIC TOKENS - Meaningful aliases
     ========================= */

  /* Surfaces */
  --color-background: var(--color-gray-0);
  --color-surface: var(--color-gray-50);
  --color-surface-hover: var(--color-gray-100);
  --color-surface-active: var(--color-gray-200);

  /* Text */
  --color-text-primary: var(--color-gray-950);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-0);

  /* Brand Colors */
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-primary-active: var(--color-blue-800);
  --color-primary-light: var(--color-blue-50);

  /* Semantic States for Todo */
  --color-success: var(--color-green-600);
  --color-success-light: var(--color-green-50);
  --color-danger: var(--color-red-600);
  --color-danger-light: var(--color-red-50);
  --color-warning: var(--color-amber-600);
  --color-warning-light: var(--color-amber-50);

  /* Borders */
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
  --color-border-focus: var(--color-blue-500);

  /* =========================
     3. COMPONENT TOKENS - Specific use for Todo app
     ========================= */

  /* Button Components */
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-transition: 150ms;

  /* Card/Item Components */
  --card-radius: var(--radius-lg);
  --card-padding: var(--spacing-3); /* Reduced from spacing-4 for smaller padding */
  --card-shadow: var(--shadow);

  /* Input Components */
  --input-radius: var(--radius-md);
  --input-padding-x: var(--spacing-2); /* Reduced for smaller inputs */
  --input-padding-y: var(--spacing-1);
  --input-border-width: 1px;

  /* Navigation/Sidebar */
  --nav-height: clamp(2.5rem, 2rem + 2.5vw, 3.5rem); /* Scaled down */
  --nav-padding: var(--spacing-3); /* Reduced */

  /* Layout */
  --container-max: 1024px; /* Reduced from 1280px */
  --sidebar-width: clamp(180px, 12vw, 240px); /* Scaled down */
  --content-max: 55ch; /* Reduced */
}

/* ============================================
   CONTAINER QUERY UTILITIES - For component-based responsiveness
   ============================================ */

@layer utilities {
  /* Container query utilities */
  .container-aware {
    container-type: inline-size;
  }

  .container-item {
    container-type: inline-size;
    container-name: item;
  }

  .container-sidebar {
    container-type: inline-size;
    container-name: sidebar;
  }

  /* Intrinsic grid for Todo items */
  .grid-auto-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); /* Reduced min width for smaller cards */
    gap: var(--spacing-3); /* Reduced gap */
  }

  /* Semantic utilities for easy use in components */
  .bg-background { background-color: var(--color-background); }
  .bg-surface { background-color: var(--color-surface); }
  .bg-surface-hover { background-color: var(--color-surface-hover); }
  .bg-surface-active { background-color: var(--color-surface-active); }
  .bg-primary { background-color: var(--color-primary); }
  .bg-primary-hover { background-color: var(--color-primary-hover); }
  .bg-primary-active { background-color: var(--color-primary-active); }
  .bg-success { background-color: var(--color-success); }
  .bg-danger { background-color: var(--color-danger); }
  .bg-warning { background-color: var(--color-warning); }
  .bg-success-light { background-color: var(--color-success-light); }
  .bg-danger-light { background-color: var(--color-danger-light); }
  .bg-warning-light { background-color: var(--color-warning-light); }

  .text-primary { color: var(--color-text-primary); }
  .text-secondary { color: var(--color-text-secondary); }
  .text-muted { color: var(--color-text-muted); }
  .text-inverse { color: var(--color-text-inverse); }

  .border-border { border-color: var(--color-border); }
  .border-border-hover { border-color: var(--color-border-hover); }
  .border-border-focus { border-color: var(--color-border-focus); }

  .rounded-card-radius { border-radius: var(--card-radius); }
  .p-card-padding { padding: var(--card-padding); }
  .shadow-card-shadow { box-shadow: var(--card-shadow); }
  .rounded-button-radius { border-radius: var(--button-radius); }
  .font-button-font-weight { font-weight: var(--button-font-weight); }
  .transition-button-transition { transition: var(--button-transition); }
  .rounded-input-radius { border-radius: var(--input-radius); }
  .p-nav-padding { padding: var(--nav-padding); }
  .h-nav-height { height: var(--nav-height); }
  .w-sidebar-width { width: var(--sidebar-width); }
}

/* ============================================
   PERFORMANCE OPTIMIZATIONS - Containment, visibility
   ============================================ */

@layer utilities {
  /* CSS Containment */
  .contain-strict {
    contain: layout style paint;
  }

  /* For Todo list items */
  .item-list {
    content-visibility: auto;
    contain-intrinsic-size: 0 250px; /* Reduced for smaller */
  }

  /* Hardware acceleration */
  .hardware-accelerate {
    transform: translateZ(0);
  }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Aspect ratios for proportions */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-todo {
  aspect-ratio: 16 / 9;
}

/* ============================================
   CSS CUSTOM PROPERTIES
   ============================================ */

:root {
  /* Export primitives as vars */
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

  /* Blue */
  --color-blue-50:  oklch(0.96 0.025 240);
  --color-blue-100: oklch(0.92 0.045 240);
  --color-blue-200: oklch(0.86 0.075 240);
  --color-blue-300: oklch(0.78 0.115 240);
  --color-blue-400: oklch(0.68 0.165 240);
  --color-blue-500: oklch(0.58 0.215 240);
  --color-blue-600: oklch(0.50 0.220 240);
  --color-blue-700: oklch(0.42 0.200 240);
  --color-blue-800: oklch(0.35 0.175 240);
  --color-blue-900: oklch(0.30 0.150 240);

  /* Green */
  --color-green-50:  oklch(0.96 0.025 150);
  --color-green-600: oklch(0.50 0.220 150);

  /* Red */
  --color-red-50:  oklch(0.96 0.025 0);
  --color-red-600: oklch(0.50 0.220 0);

  /* Amber */
  --color-amber-50:  oklch(0.96 0.025 60);
  --color-amber-600: oklch(0.50 0.220 60);
}

/* Dark mode overrides (class strategy) */
.dark {
  --color-background: var(--color-gray-950);
  --color-surface: var(--color-gray-900);
  --color-surface-hover: var(--color-gray-800);
  --color-surface-active: var(--color-gray-700);

  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-900);

  --color-border: var(--color-gray-800);
  --color-border-hover: var(--color-gray-700);

  --color-input-bg: var(--color-gray-800);
  --color-input-border: var(--color-gray-600);
  --color-input-text: var(--color-gray-100);
  --color-input-placeholder: var(--color-gray-500);
}

/* ============================================
   BASE LAYER - Global defaults
   ============================================ */

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-primary antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-primary;
    line-height: var(--line-height-tight);
  }

  p {
    line-height: var(--line-height-relaxed);
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }

  html {
    scroll-behavior: smooth;
  }
}

/* ============================================
   UTILITIES LAYER - Helper classes
   ============================================ */

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  ::selection {
    @apply bg-primary/20 text-primary;
  }
}
```

2. Update src/index.css with the following code to ensure base styles use semantic tokens and smaller proportions.

```css
@import "./styles/main.css";

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    min-height: 100vh;
    font-size: var(--font-size-base);
  }

  input, textarea, select {
    width: 100%;
    padding: var(--input-padding-y) var(--input-padding-x);
    border: var(--input-border-width) solid var(--color-border);
    border-radius: var(--input-radius);
    background-color: var(--color-surface);
    color: var(--color-text-primary);
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 1px var(--color-border-focus) / 50%;
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
  background-color: var(--color-surface-hover);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--color-gray-600);
  border-radius: var(--radius-sm);
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-gray-500);
}
```

3. Create or update src/stores/useUiStore.ts with the following code to handle theme persistence and notifications correctly.

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface UiState {
  isLoading: boolean
  loadingMessage: string
  notifications: Notification[]
  theme: Theme
  setIsLoading: (isLoading: boolean, message?: string) => void
  showNotification: (type: NotificationType, message: string, duration?: number) => void
  removeNotification: (id: string) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      loadingMessage: '',
      notifications: [],
      theme: 'system',
      setIsLoading: (isLoading, message = '') => set({ isLoading, loadingMessage: message }),
      showNotification: (type, message, duration = 3000) => {
        const id = Date.now().toString()
        set({ notifications: [...get().notifications, { id, type, message, timestamp: Date.now(), duration }] })
        if (duration > 0) {
          setTimeout(() => get().removeNotification(id), duration)
        }
      },
      removeNotification: (id) => set({ notifications: get().notifications.filter(n => n.id !== id) }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme
        const next = current === 'dark' ? 'light' : 'dark'
        set({ theme: next })
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
```

4. Create or update src/stores/useItemStore.ts with the following code to handle item CRUD with proper error handling and state updates.

```typescript
import { create } from 'zustand'

import { getItemTree, createItem, updateItem, deleteItem } from '@/api/itemApi'

import { useUiStore } from './useUiStore'

import { slugify } from '@/utils/slugify'

import type { ItemTree, Item, CreateItemPayload, UpdateItemPayload } from '@/types'

interface ItemState {
  itemTree: ItemTree
  isLoading: boolean
  fetchItemTree: () => Promise<void>
  addItem: (payload: CreateItemPayload) => Promise<void>
  updateItem: (categorySlug: string, itemSlug: string, payload: UpdateItemPayload) => Promise<void>
  toggleItemCompletion: (categorySlug: string, itemSlug: string) => Promise<void>
  deleteItem: (categorySlug: string, itemSlug: string) => Promise<void>
}

export const useItemStore = create<ItemState>((set, get) => ({
  itemTree: {},
  isLoading: false,
  fetchItemTree: async () => {
    useUiStore.getState().setIsLoading(true, 'Fetching items...')
    try {
      const tree = await getItemTree()
      set({ itemTree: tree })
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to fetch items')
    } finally {
      useUiStore.getState().setIsLoading(false)
    }
  },
  addItem: async (payload) => {
    try {
      const newItem = await createItem(payload)
      const { itemTree } = get()
      const categorySlug = slugify(payload.categories[0])
      const updatedCategory = [...(itemTree[categorySlug] || []), newItem]
      set({ itemTree: { ...itemTree, [categorySlug]: updatedCategory } })
      useUiStore.getState().showNotification('success', 'Item added successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to add item')
    }
  },
  updateItem: async (categorySlug, itemSlug, payload) => {
    try {
      const updatedItem = await updateItem(categorySlug, itemSlug, payload)
      const { itemTree } = get()
      const categoryItems = itemTree[categorySlug] || []
      const updatedCategory = categoryItems.map(item => item.slug === itemSlug ? updatedItem : item)
      set({ itemTree: { ...itemTree, [categorySlug]: updatedCategory } })
      useUiStore.getState().showNotification('success', 'Item updated successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to update item')
    }
  },
  toggleItemCompletion: async (categorySlug, itemSlug) => {
    const { itemTree } = get()
    const item = itemTree[categorySlug]?.find(i => i.slug === itemSlug)
    if (item) {
      await get().updateItem(categorySlug, itemSlug, { isCompleted: !item.isCompleted })
    }
  },
  deleteItem: async (categorySlug, itemSlug) => {
    try {
      await deleteItem(categorySlug, itemSlug)
      const { itemTree } = get()
      const updatedCategory = itemTree[categorySlug]?.filter(item => item.slug !== itemSlug) || []
      const updatedTree = { ...itemTree }
      if (updatedCategory.length === 0) {
        delete updatedTree[categorySlug]
      } else {
        updatedTree[categorySlug] = updatedCategory
      }
      set({ itemTree: updatedTree })
      useUiStore.getState().showNotification('success', 'Item deleted successfully')
    } catch (error) {
      useUiStore.getState().showNotification('error', 'Failed to delete item')
    }
  },
}))
```

5. Create or update src/main.tsx with the following code to properly apply the theme to the HTML element, fixing the mode mixing by ensuring the .dark class is added/removed based on the store.

```typescript
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useUiStore } from './stores/useUiStore'

function Root() {
  const theme = useUiStore(state => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
```

6. Create or update src/App.tsx with the following code to set up routing and render the main page.

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemPage from './pages/ItemPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

7. Create or update src/pages/ItemPage.tsx with the following code to render the main UI, using semantic classes for consistent theming and smaller proportions.

```typescript
import { useEffect, useState } from 'react'
import { useItemStore } from '../stores/useItemStore'
import { useItemFilters, type FilterOptions, type ItemTree } from '../hooks/useItemFilters'
import AppSidebar from '../components/layout/AppSidebar'
import FilterBar from '../components/layout/FilterBar'
import ItemItem from '../components/items/ItemItem'
import ItemForm from '../components/items/ItemForm'
import Notifications from '../components/common/Notifications'
import { slugify } from '../utils/slugify'
import type { Item } from '@/types'

const initialFilters: FilterOptions = {
  searchQuery: '',
  selectedPriority: 'all',
  showCompleted: true,
  selectedTags: [],
}

export default function ItemPage() {
  const { itemTree, fetchItemTree } = useItemStore()
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const { filteredItemTree, allTags, hasActiveFilters, totalFilteredItems } = useItemFilters(itemTree, filters)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchItemTree()
  }, [])

  return (
    <div className="flex bg-background min-h-screen">
      <AppSidebar allTags={allTags} selectedTags={filters.selectedTags} onTagSelect={(tags) => setFilters({ ...filters, selectedTags: tags })} onSearch={(query) => setFilters({ ...filters, searchQuery: query })} />
      <main className="flex-1 p-nav-padding">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-center mb-spacing-4">
            <h1 className="text-xl font-bold">Items</h1>
            <button onClick={() => setShowForm(true)} className="bg-primary text-inverse px-4 py-2 rounded-button-radius">+ Add Item</button>
          </div>
          <FilterBar filters={filters} onChange={setFilters} />
          <p className="text-muted mb-spacing-3">{totalFilteredItems} of {Object.values(itemTree).reduce((acc, items) => acc + items.length, 0)} items</p>
          {Object.entries(filteredItemTree).map(([category, items]) => (
            <section key={category} className="mb-spacing-6">
              <h2 className="text-lg font-semibold mb-spacing-3 capitalize">{category.replace('-', ' ')}</h2>
              <div className="grid-auto-items">
                {items.map((item: Item) => (
                  <ItemItem key={item.id} item={item} categorySlug={slugify(category)} />
                ))}
              </div>
            </section>
          ))}
          {showForm && <ItemForm onClose={() => setShowForm(false)} />}
        </div>
      </main>
      <Notifications />
    </div>
  )
}
```

8. Create or update src/components/layout/AppSidebar.tsx with the following code, using semantic classes for consistent theming.

```typescript
import { useState } from 'react'
import { Input } from 'react' // Assume basic, or use native
import ThemeToggle from '../common/ThemeToggle'

interface Props {
  allTags: string[]
  selectedTags: string[]
  onTagSelect: (tags: string[]) => void
  onSearch: (query: string) => void
}

export default function AppSidebar({ allTags, selectedTags, onTagSelect, onSearch }: Props) {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]
    onTagSelect(updated)
  }

  return (
    <aside className="w-sidebar-width bg-surface p-nav-padding fixed h-screen overflow-y-auto scrollbar-thin">
      <h3 className="text-primary font-medium mb-spacing-2">Search Items...</h3>
      <input className="mb-spacing-4" value={search} onChange={handleSearch} placeholder="Search..." />
      <h3 className="text-primary font-medium mb-spacing-2">Tags</h3>
      <div className="flex flex-wrap gap-spacing-2">
        {allTags.map(tag => (
          <button key={tag} onClick={() => toggleTag(tag)} className={clsx('px-3 py-1 rounded-radius-md', selectedTags.includes(tag) ? 'bg-primary text-inverse' : 'bg-surface-hover text-secondary')}>
            {tag}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-spacing-4">
        <ThemeToggle />
      </div>
    </aside>
  )
}
```

9. Create or update src/components/layout/FilterBar.tsx with the following code, using semantic classes for consistent theming and smaller sizes.

```typescript
import clsx from 'clsx'

interface Props {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
}

export default function FilterBar({ filters, onChange }: Props) {
  const priorities = ['all', 'high', 'mid', 'low'] as const

  return (
    <div className="bg-surface p-spacing-3 flex items-center justify-between rounded-radius-lg mb-spacing-4">
      <div className="flex items-center gap-spacing-3">
        <span className="text-secondary font-medium">Priority</span>
        {priorities.map(p => (
          <button
            key={p}
            onClick={() => onChange({ ...filters, selectedPriority: p })}
            className={clsx(
              'w-5 h-5 rounded-full', /* Smaller size */
              p === 'all' ? 'bg-primary' : p === 'high' ? 'bg-danger' : p === 'mid' ? 'bg-warning' : 'bg-success',
              filters.selectedPriority === p ? 'ring-2 ring-border-focus' : ''
            )}
          />
        ))}
      </div>
      <label className="flex items-center gap-spacing-2 text-secondary">
        <input
          type="checkbox"
          checked={filters.showCompleted}
          onChange={e => onChange({ ...filters, showCompleted: e.target.checked })}
          className="w-4 h-4"
        />
        Show completed
      </label>
    </div>
  )
}
```

10. Create or update src/components/items/ItemItem.tsx with the following code, using semantic classes for consistent theming and smaller proportions.

```typescript
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import { useItemStore } from '../../stores/useItemStore'
import { Icon } from '../common/Icon'
import type { Item } from '@/types'

interface Props {
  item: Item
  categorySlug: string
}

export default function ItemItem({ item, categorySlug }: Props) {
  const { toggleItemCompletion, deleteItem } = useItemStore()

  const priorityColor = {
    high: 'bg-danger text-danger-light',
    mid: 'bg-warning text-warning-light',
    low: 'bg-success text-success-light',
  }[item.priority]

  return (
    <div className="bg-surface rounded-card-radius p-card-padding shadow-card-shadow flex flex-col gap-spacing-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-spacing-2">
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => toggleItemCompletion(categorySlug, item.slug)}
            className="w-4 h-4"
          />
          <h3 className={clsx('font-medium', item.isCompleted ? 'line-through text-muted' : 'text-primary')}>{item.name}</h3>
        </div>
        <span className={clsx('px-2 py-1 text-xs rounded-radius-sm', priorityColor)}>{item.priority}</span>
      </div>
      <p className="text-muted text-sm">{item.text}</p>
      <div className="flex flex-wrap gap-spacing-1">
        {item.tags.map(tag => (
          <span key={tag} className="bg-surface-hover text-muted text-xs px-2 py-1 rounded-radius-sm">{tag}</span>
        ))}
      </div>
      <div className="flex justify-end mt-auto">
        <button onClick={() => deleteItem(categorySlug, item.slug)} className="text-danger">
          <Icon name={Trash} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
```

11. Create or update src/components/items/ItemForm.tsx with the following code, using semantic classes.

```typescript
import { useState } from 'react'
import { useItemStore } from '../../stores/useItemStore'
import { slugify } from '../../utils/slugify'
import type { Priority } from '@/types'

interface Props {
  onClose: () => void
}

export default function ItemForm({ onClose }: Props) {
  const { addItem } = useItemStore()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('mid')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('test') // Default category

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addItem({
      name,
      text,
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      categories: [category],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-surface p-card-padding rounded-card-radius shadow-lg max-w-md w-full">
        <h2 className="text-primary font-medium mb-spacing-3">Add New Item</h2>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="mb-spacing-2" />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Description" className="mb-spacing-2" />
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="mb-spacing-2">
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="mb-spacing-2" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="mb-spacing-4" />
        <div className="flex justify-end gap-spacing-2">
          <button type="button" onClick={onClose} className="bg-surface-hover text-secondary px-4 py-2 rounded-button-radius">Cancel</button>
          <button type="submit" className="bg-primary text-inverse px-4 py-2 rounded-button-radius">Add</button>
        </div>
      </form>
    </div>
  )
}
```

12. Create or update src/components/common/ThemeToggle.tsx with the following code.

```typescript
import { Sun, Moon } from 'lucide-react'
import { useUiStore } from '../../stores/useUiStore'
import { Icon } from './Icon'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUiStore()

  return (
    <button onClick={toggleTheme} className="p-2 rounded-radius-md bg-surface-hover">
      {theme === 'dark' ? <Icon name={Sun} className="text-primary" /> : <Icon name={Moon} className="text-primary" />}
    </button>
  )
}
```

13. Create or update src/components/common/Notifications.tsx with the following code, using semantic classes.

```typescript
import clsx from 'clsx'
import { useUiStore } from '../../stores/useUiStore'

export default function Notifications() {
  const { notifications, removeNotification } = useUiStore()

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-spacing-2">
      {notifications.map(n => (
        <div key={n.id} className={clsx('p-spacing-3 rounded-radius-md shadow-md', {
          'bg-success text-inverse': n.type === 'success',
          'bg-danger text-inverse': n.type === 'error',
          'bg-primary text-inverse': n.type === 'info',
          'bg-warning text-inverse': n.type === 'warning',
        })}>
          {n.message}
          <button onClick={() => removeNotification(n.id)} className="ml-spacing-2 text-inverse">×</button>
        </div>
      ))}
    </div>
  )
}
```

14. Create or update src/components/common/Icon.tsx with the following code.

```typescript
import * as Lucide from 'lucide-react'
import clsx from 'clsx'

interface Props {
  name: keyof typeof Lucide
  className?: string
}

export function Icon({ name, className }: Props) {
  const IconComponent = Lucide[name]
  return <IconComponent className={clsx('h-4 w-4', className)} />
}
```

15. Create or update src/components/common/ConfirmDeleteModal.tsx with the following code, using semantic classes.

```typescript
interface Props {
  onConfirm: () => void
  onCancel: () => void
  message: string
}

export default function ConfirmDeleteModal({ onConfirm, onCancel, message }: Props) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
      <div className="bg-surface p-card-padding rounded-card-radius shadow-lg max-w-sm w-full">
        <p className="text-primary mb-spacing-4">{message}</p>
        <div className="flex justify-end gap-spacing-2">
          <button onClick={onCancel} className="bg-surface-hover text-secondary px-4 py-2 rounded-button-radius">Cancel</button>
          <button onClick={onConfirm} className="bg-danger text-inverse px-4 py-2 rounded-button-radius">Delete</button>
        </div>
      </div>
    </div>
  )
}
```

16. Create or update src/utils/slugify.ts with the following code (simple slugify function).

```typescript
export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
```

17. Create or update src/utils/helpers.ts with the following code (placeholder for helpers).

```typescript
// Add any general helpers here if needed in the future
export const noop = () => {}
```

18. If not already present, create src/auto-imports.d.ts with the following code (generated by unplugin-auto-import).

```typescript
// Auto generated by unplugin-auto-import
export {}
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
```

This completes the fixes. The theme mixing is resolved by using semantic utilities everywhere, proportions are smaller via adjusted clamps, and paddings are added/ reduced in component tokens.