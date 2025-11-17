# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** wto, 18 lis 2025, 00:49:37 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/vue/crud-app-sqlite-tanstack-shadcn-vue

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue CRUD App - TanStack & shadcn/vue</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

## `tsconfig.json`
```
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
   "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

## `package.json`
```
{
  "name": "vue-crud-app-tanstack-shadcn",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@vueuse/core": "^14.0.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-vue-next": "^0.553.0",
    "reka-ui": "^2.6.0",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.17",
    "vue": "^3.5.24",
    "vue-sonner": "^2.0.9"
  },
  "devDependencies": {
    "@iconify-json/lucide": "^1.2.73",
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "unplugin-icons": "^22.5.0",
    "unplugin-vue-components": "^30.0.0",
    "vite": "npm:rolldown-vite@7.2.2",
    "vue-tsc": "^3.1.3"
  },
  "overrides": {
    "vite": "npm:rolldown-vite@7.2.2"
  }
}

```

## `tsconfig.app.json`
```
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

## `README.md`
```
#  Items App - Vue Frontend


## 1. Core Architecture & Tech Stack

This is a modern, responsive Vue application built with a focus on developer experience, performance, and maintainability. It leverages a fully type-safe, component-based architecture using the Composition API.

| Category | Technology | Version | Purpose & Key Features |
| :--- | :--- | :--- | :--- |
| **Framework** | [Vue 3](https://vuejs.org/) | `3.5.24` | Powers the UI with a component-based model using `<script setup>` SFCs and the Composition API. |
| **Build Tool** | [Vite](https://vitejs.dev/) | `rolldown-vite@7.2.2` | Provides a lightning-fast development server with HMR and optimized production builds. |
| **Routing** | [Vue Router](https://router.vuejs.org/) | `^4.0.0` | The official router for Vue.js, handling client-side routing with a data-loading pattern via navigation guards. |
| **Data Fetching** | [TanStack Query (Vue Query)](https://tanstack.com/query/v5/docs/vue/overview) | `^5.0.0` | Manages server state, handling data fetching, caching, and synchronization with the backend API. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.1.17` | A utility-first CSS framework configured with a "CSS-first" approach, leveraging a custom, token-based design system. |
| **UI Components** | [shadcn-vue](https://www.shadcn-vue.com/) | N/A | A collection of beautifully designed, accessible components built on `reka-ui` and adapted for this project. |
| **Form Management**| [TanStack Form (Vue Form)](https://tanstack.com/form/v0/docs/adapters/vue-form) | `^0.20.0` | Manages form state with a performance-first and type-safe approach. |
| **UI State** | [Pinia](https://pinia.vuejs.org/) | `^2.0.0` | The official state management library for Vue, providing a simple and type-safe global store. |
| **Validation** | [Zod](https://zod.dev/) | `^3.0.0` | Provides TypeScript-first schema declaration and validation, used with the TanStack Form adapter. |
| **Notifications** | [vue-sonner](https://github.com/wobsoriano/vue-sonner) | `2.0.9` | An opinionated toast library for elegant and simple notifications. |
| **Icons** | [Lucide Vue Next](https://lucide.dev/) | `0.553.0` | A clean, consistent, and tree-shakable icon toolkit, auto-imported via `unplugin-icons`. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `~5.9.3` | Ensures full type safety across the entire application. |
| **Class Utilities**| [tailwind-merge](https://github.com/dcastil/tailwind-merge) & [clsx](https://github.com/lukeed/clsx) | `^3.4.0` | Intelligently merges Tailwind CSS classes without style conflicts via the `cn` utility. |
| **Auto-Imports**| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) | `^30.0.0` | Reduces boilerplate by automatically importing composables, store actions, and utilities. |

---

## 2. Project Structure Deep Dive

The codebase is organized into a logical and scalable structure. Path aliases (`@/*`) are configured in `tsconfig.json` to point to the `src/` directory for clean import paths.

```
frontend/
├── src/
│   ├── api/                      # API communication layer
│   │   ├── apiClient.ts          # Base ofetch client with error handling & result unwrapping
│   │   └── itemApi.ts            # Type-safe functions for item CRUD endpoints
│   ├── components/               # Reusable Vue components
│   │   ├── items/                # Components specific to items (ItemForm, ItemItem)
│   │   ├── layout/               # Layout components (Sidebar, TopBar, FilterBar)
│   │   └── ui/                   # shadcn-vue base UI components (Button, Card, etc.)
│   ├── composables/              # Reusable Composition API functions (Vue's "hooks")
│   │   ├── useItemFilters.ts     # Logic for filtering the item tree
│   │   ├── useItemsApi.ts        # TanStack Query composables for item data
│   │   └── useThemeUpdater.ts    # Applies the theme class to the DOM
│   ├── layouts/                  # Main page layouts
│   │   └── MainLayout.vue        # The primary layout with a sidebar and main content area
│   ├── lib/                      # General-purpose libraries and utilities
│   │   └── utils.ts              # shadcn-vue `cn` utility for merging class names
│   ├── pages/                    # Route components
│   │   ├── AboutPage.vue         # /about route
│   │   ├── ItemDetailPage.vue    # /items/:categorySlug/:itemSlug route
│   │   └── ItemPage.vue          # / (index) route
│   ├── schemas/                  # Zod validation schemas
│   │   └── itemSchema.ts         # Schema for the item creation/edit form
│   ├── stores/                   # Pinia stores for global client state
│   │   ├── itemStore.ts          # Placeholder for client-only item state
│   │   └── uiStore.ts            # Manages theme, form modals, notifications, global loading
│   ├── styles/                   # CSS and Design System
│   │   └── main.css              # Core of the design system: tokens, layers, utilities
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Global types (Item, ApiResponse, etc.)
│   ├── utils/                    # Project-specific utility functions
│   │   ├── helpers.ts            # General helper functions (e.g., formatDate)
│   │   └── slugify.ts            # URL slug generation
│   ├── App.vue                   # Root application component (contains RouterView)
│   ├── main.ts                   # Application entry point
│   ├── style.css                 # Global base styles and shadcn/vue variable mapping
│   ├── router/index.ts           # Vue Router configuration and route tree
│   ├── auto-imports.d.ts         # Auto-generated types for unplugin-auto-import
│   └── components.d.ts           # Auto-generated types for unplugin-vue-components
├── components.json               # shadcn-vue configuration file
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite build tool configuration
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Project dependencies and scripts
```

---

## 3. Modernist Design System & shadcn-vue Integration

The application's visual identity is governed by a comprehensive, three-tier design system defined in `src/styles/main.css`. It is built on modern CSS principles and is fully integrated with `shadcn-vue`.

**Core Principles:**
*   **CSS-First Configuration**: Uses Tailwind v4's `@theme` directive, making `src/styles/main.css` the single source of truth for all design tokens.
*   **Fluid Responsiveness**: Employs `clamp()` for typography and spacing, creating a seamless, fluid layout that adapts to any screen size without manual breakpoints.
*   **Semantic Tokenization**: Enforces the use of meaningful tokens (e.g., `--color-surface`, `--card-padding`) instead of hardcoded values.
*   **OKLCH Color System**: Utilizes the modern OKLCH color model for perceptually uniform, vibrant, and accessible color palettes that are easy to manipulate.

### 3.1. shadcn-vue Integration

This project does not use the default `shadcn-vue` theme. Instead, it maps its own rich, semantic design system variables to the variables `shadcn-vue` components expect. This is achieved in `src/style.css`, which acts as an adapter layer.

This approach provides the best of both worlds:
1.  The ability to use the well-architected, accessible components from `shadcn-vue`.
2.  Full control over the application's unique visual identity through the custom design system in `main.css`.

### 3.2. Developer Usage Guide

**It is critical to use the provided semantic utility classes and CSS variables instead of raw Tailwind utilities or hardcoded values.** This maintains the integrity of the design system.

| ✅ **CORRECT (Use Semantic Tokens)** | ❌ **INCORRECT (Avoid Raw Values)** |
| :--- | :--- |
| `<div class="bg-surface text-text-primary p-card rounded-xl">` | `<div class="p-4 text-gray-900 rounded-lg bg-gray-50">` |
| `<Button variant="primary">...` | `<button class="bg-blue-600 hover:bg-blue-700">...` |
| `<h1 class="text-size-xl">Heading</h1>` | `<h1 class="text-2xl">Heading</h1>` |

**Key Custom Utilities (Defined in `main.css`):**
*   **Text Sizes**: `.text-size-xs` through `.text-size-xl`.
*   **Tags/Badges**: `.tag-sm`, `.tag-priority-mid`.
*   **Performance**: `.contain-strict` and `.item-list` for CSS containment.
*   **Fluid Spacing**: `.p-fluid-4`, `.gap-fluid-4`, etc., for responsive spacing.

---

## 4. State & Data Management

The application separates state into two categories: **Server State** (data from the API) and **Client State** (UI-specific data).

### 4.1. Server State (TanStack Query / Vue Query)

All interactions with the backend API are managed by Vue Query.
*   **Composables**: All query and mutation logic is encapsulated in custom composables within `src/composables/useItemsApi.ts`.
*   **Query Keys**: A structured keying system (`itemKeys`) is used to manage cache invalidation effectively.
*   **Mutations**: `useAddItem`, `useUpdateItem`, and `useDeleteItem` composables handle CUD operations. They automatically show notifications via the `uiStore` and invalidate the relevant queries (`itemKeys.tree()`) upon success to keep the UI in sync.

### 4.2. Client State (Pinia)

Global UI state is managed by a lightweight Pinia store to avoid prop-drilling.
*   **`useUiStore`**: Manages global UI state such as the current theme (`light`/`dark`/`system`), form visibility (`isFormOpen`), and data for pre-filling forms (`preselectedCategory`). It integrates with **vue-sonner** to display toast notifications. Theme state is persisted to `localStorage` via `@vueuse/core`.
*   **`useItemStore`**: A placeholder for any complex, client-only state related to items that might be needed in the future.

---

## 5. Routing (Vue Router)

The application uses Vue Router for robust, official routing, configured in `src/router/index.ts`.

**Key Features:**
*   **Official & Mature**: As the official Vue router, it offers deep integration with the framework's ecosystem.
*   **Loaders via Navigation Guards**: Data pre-fetching is implemented using a `beforeEach` navigation guard that checks for a `meta.loader` function on the target route. This ensures data is available via TanStack Query's cache before the component renders.
*   **Path Parameters**: The `/items/:categorySlug/:itemSlug` route demonstrates standard, expressive parameter handling.

**Defined Routes:**
*   `/`: Main items page, loads the entire item tree.
*   `/about`: Static "About" page.
*   `/items/:categorySlug/:itemSlug`: Detail view for a single item.

---

## 6. API Integration

Communication with the backend REST API is handled by a robust, type-safe client built on `ofetch`.
*   **Base Client (`apiClient.ts`)**: Wraps `ofetch` to standardize requests, responses, and headers. It features a custom `Result` type and an `unwrapResult` function to centralize error handling, ensuring that API errors are consistently caught and thrown, to be managed by TanStack Query.
*   **Endpoints (`itemApi.ts`)**: Defines a function for each API endpoint (e.g., `getItemTree`, `createItem`), using TypeScript interfaces from `src/types` to ensure all payloads are correctly shaped.

---

## 7. Development & Operations

### 7.1. Prerequisites

*   Node.js (LTS version recommended).
*   A package manager like `npm`.

### 7.2. Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd <project-root>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure API URL:** The backend API URL is currently hardcoded in `src/api/apiClient.ts`. If your backend is running on a different address, modify the `API_URL_BASE` constant.
    ```typescript
    // src/api/apiClient.ts
    const API_URL_BASE = 'http://localhost:3000/api'; // <-- Change this if needed
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

### 7.3. Available Scripts

*   `npm run dev`: Starts the Vite development server with HMR.
*   `npm run build`: Runs the TypeScript checker and builds the application for production in the `dist/` directory.
*   `npm run preview`: Serves the production build locally for testing.
*   `npm run type-check`: Runs the TypeScript compiler to check for type errors without generating output.
```

## `tsconfig.node.json`
```
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

## `.vscode/extensions.json`
```
{
  "recommendations": ["Vue.volar"]
}

```

## `vite.config.ts`
```
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
          'vue-sonner': ['toast'],
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

    // Add Components with Icons resolver
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // Add Icons plugin
    Icons({
      compiler: 'vue3',
      autoInstall: true,
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
        }
      }
    }
  }
})
```

## `src/components/items/ItemForm.vue`
```
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useAddItem } from '@/composables/useItemsApi';
import { itemFormSchema } from '@/schemas/itemSchema';
import { useUiStore } from '@/stores/uiStore';

const emit = defineEmits<{ close: [] }>();
const { mutate: addItem } = useAddItem();
const uiStore = useUiStore();

const currentTag = ref('');

const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    // Use preselected category from store, or a default
    categories: [uiStore.preselectedCategory || 'general'] as [string],
  },
  onSubmit: async ({ value }) => {
    addItem(value, {
      onSuccess: () => emit('close'),
    });
  },
  validatorAdapter: zodValidator(),
});

const addTag = () => {
  const newTag = currentTag.value.trim();
  if (newTag && !form.state.values.tags.includes(newTag)) {
    form.setFieldValue('tags', [...form.state.values.tags, newTag]);
  }
  currentTag.value = '';
};

const removeTag = (tagToRemove: string) => {
  form.setFieldValue('tags', form.state.values.tags.filter(tag => tag !== tagToRemove));
};
</script>

<template>
  <!-- TEMPLATE REMAINS UNCHANGED -->
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>
      
      <form @submit.prevent="form.handleSubmit()" class="space-y-4">
        <!-- Name Field -->
        <form.Field name="name" :validators="{ onChange: itemFormSchema.shape.name }">
          <template #default="{ field }">
            <div>
              <Label>Task Name</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="e.g., Finalize project report"
              />
              <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <!-- Description Field -->
        <form.Field name="text" :validators="{ onChange: itemFormSchema.shape.text }">
          <template #default="{ field }">
            <div>
              <Label>Description</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="Add more details about the task..."
              />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <!-- Category Field -->
        <form.Field name="categories" :validators="{ onChange: itemFormSchema.shape.categories }">
           <template #default="{ field }">
             <div>
               <Label>Category</Label>
               <Input
                 :model-value="field.state.value[0]"
                 @update:model-value="field.handleChange([$event])"
                 placeholder="e.g., Work"
               />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
             </div>
           </template>
        </form.Field>

        <!-- Priority Field -->
        <form.Field name="priority">
          <template #default="{ field }">
            <div>
              <Label>Priority</Label>
              <RadioGroup
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                class="flex items-center gap-4 mt-2"
              >
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-low" value="low" />
                  <Label for="p-low">Low</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-mid" value="mid" />
                  <Label for="p-mid">Mid</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-high" value="high" />
                  <Label for="p-high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </template>
        </form.Field>

        <!-- Tags Field -->
        <div>
          <Label>Tags</Label>
          <div class="flex items-center gap-2 mt-2">
            <Input
              v-model="currentTag"
              @keydown.enter.prevent="addTag"
              placeholder="Add a tag..."
            />
            <Button type="button" variant="outline" @click="addTag">Add</Button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <Badge
              v-for="tag in form.state.values.tags"
              :key="tag"
              variant="secondary"
              class="cursor-pointer"
              @click="removeTag(tag)"
            >
              {{ tag }} &times;
            </Badge>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="emit('close')">Cancel</Button>
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
```

## `src/components/items/ItemItem.vue`
```
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useUpdateItem, useDeleteItem } from '@/composables/useItemsApi';
import { formatDate } from '@/utils/helpers';
import { useUiStore } from '@/stores/uiStore';
import type { Item } from '@/types';

const props = defineProps<{ item: Item }>();

const { mutate: updateItem } = useUpdateItem();
const { mutate: deleteItem } = useDeleteItem();
const uiStore = useUiStore();

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
  <Card :class="{ 'opacity-60': item.isCompleted }">
    <CardContent class="flex items-start gap-4 p-4">
      <Checkbox
        :checked="item.isCompleted"
        @update:checked="toggleComplete"
        class="mt-1"
      />
      <div class="flex-1">
        <div class="flex items-center justify-between">
            <h3 
              class="font-semibold text-size-lg"
              :class="{ 'line-through text-text-muted': item.isCompleted }"
            >
              {{ item.name }}
            </h3>
             <Badge :class="`tag-priority-${item.priority}`" variant="outline">
               {{ item.priority }}
            </Badge>
        </div>
        <p class="mb-3 text-text-secondary">{{ item.text }}</p>

        <div class="flex items-center justify-between">
            <p class="text-xs text-text-muted">{{ formatDate(item.createdAt) }}</p>
            <div class="flex gap-2">
                <Button size="sm" variant="ghost" @click="uiStore.openForm(item)">
                    <icon-lucide-pencil class="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" @click="handleDelete">
                    <icon-lucide-trash-2 class="w-4 h-4" />
                </Button>
            </div>
        </div>

        <div class="flex gap-2 mt-3">
          <Badge v-for="tag in item.tags" :key="tag" variant="secondary">{{ tag }}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
```

## `src/components/layout/TopBar.vue`
```
<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
    <nav class="flex items-center gap-4">
      <RouterLink 
        to="/" 
        :class="route.path === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        Home
      </RouterLink>
      <RouterLink 
        to="/about" 
        :class="route.path === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        About
      </RouterLink>
    </nav>
  </header>
</template>
```

## `src/components/layout/AppSidebar.vue`
```
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUiStore } from '@/stores/uiStore';

// These would eventually be props or come from a store
const searchQuery = ref('');
const allTags = ref(['project', 'personal', 'work']); // Example tags
const selectedTags = ref<string[]>([]);

const uiStore = useUiStore();

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};
</script>

<template>
  <aside class="flex flex-col p-4 border-r bg-surface border-border">
    <div class="p-2 mb-4">
      <h2 class="text-xl font-bold">TodoApp</h2>
    </div>

    <div class="flex-1 space-y-4">
      <!-- Search -->
      <div class="px-2">
        <Input v-model="searchQuery" placeholder="Search tasks..." />
      </div>

      <Separator />

      <!-- Tags Section -->
      <div class="px-2">
        <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            :variant="selectedTags.includes(tag) ? 'default' : 'outline'"
            size="sm"
            class="rounded-full"
          >
            {{ tag }}
          </Button>
        </div>
      </div>

      <!-- Add New Item Button -->
      <div class="px-2 mt-4">
        <Button class="w-full" @click="uiStore.openForm()">
          + Add Item
        </Button>
      </div>
    </div>

    <!-- Footer / Theme Toggle -->
    <div class="mt-auto">
      <Button variant="ghost" @click="uiStore.toggleTheme()" class="justify-start w-full">
        <icon-lucide-sun v-if="!uiStore.isDark" class="w-4 h-4" />
        <icon-lucide-moon v-else class="w-4 h-4" />
      </Button>
    </div>
  </aside>
</template>
```

## `src/components/layout/FilterBar.vue`
```
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

defineProps<{
  priority: string;
  showCompleted: boolean;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:priority': [value: string];
  'update:showCompleted': [value: boolean];
  'clear': [];
}>();
</script>

<template>
  <div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Label class="block mb-2">Priority</Label>
        <RadioGroup
          :model-value="priority"
          @update:model-value="emit('update:priority', $event as string)"
          class="flex items-center gap-4"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-all" value="all" />
            <Label for="r-all">All</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-low" value="low" />
            <Label for="r-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-mid" value="mid" />
            <Label for="r-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-high" value="high" />
            <Label for="r-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label class="block mb-2">Status</Label>
        <div class="flex items-center gap-2">
          <Checkbox
            id="show-completed"
            :checked="showCompleted"
            @update:checked="emit('update:showCompleted', $event as boolean)"
          />
          <Label for="show-completed">Show Completed</Label>
        </div>
      </div>
    </div>

    <Button
      v-if="hasActiveFilters"
      variant="ghost"
      size="sm"
      @click="emit('clear')"
      class="mt-4"
    >
      Clear Filters
    </Button>
  </div>
</template>
```

## `src/components/ui/button/Button.vue`
```
<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>

```

## `src/components/ui/button/index.ts`
```
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        "default": "h-9 px-4 py-2 has-[>svg]:px-3",
        "sm": "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>

```

## `src/components/ui/checkbox/Checkbox.vue`
```
<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn('peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
         props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Check class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

```

## `src/components/ui/checkbox/index.ts`
```
export { default as Checkbox } from "./Checkbox.vue"

```

## `src/components/ui/label/Label.vue`
```
<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Label } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>

```

## `src/components/ui/label/index.ts`
```
export { default as Label } from "./Label.vue"

```

## `src/components/ui/input/Input.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
  >
</template>

```

## `src/components/ui/input/index.ts`
```
export { default as Input } from "./Input.vue"

```

## `src/components/ui/alert-dialog/AlertDialogDescription.vue`
```
<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  AlertDialogDescription,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogFooter.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-dialog-footer"
    :class="
      cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/alert-dialog/AlertDialog.vue`
```
<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from "reka-ui"
import { AlertDialogRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogRoot v-slot="slotProps" data-slot="alert-dialog" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </AlertDialogRoot>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogTitle.vue`
```
<script setup lang="ts">
import type { AlertDialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogTitle } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="delegatedProps"
    :class="cn('text-lg font-semibold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogHeader.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogCancel.vue`
```
<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogCancel } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'

const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      props.class,
    )"
  >
    <slot />
  </AlertDialogCancel>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogContent.vue`
```
<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AlertDialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      data-slot="alert-dialog-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

```

## `src/components/ui/alert-dialog/AlertDialogAction.vue`
```
<script setup lang="ts">
import type { AlertDialogActionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AlertDialogAction } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>

```

## `src/components/ui/alert-dialog/index.ts`
```
export { default as AlertDialog } from "./AlertDialog.vue"
export { default as AlertDialogAction } from "./AlertDialogAction.vue"
export { default as AlertDialogCancel } from "./AlertDialogCancel.vue"
export { default as AlertDialogContent } from "./AlertDialogContent.vue"
export { default as AlertDialogDescription } from "./AlertDialogDescription.vue"
export { default as AlertDialogFooter } from "./AlertDialogFooter.vue"
export { default as AlertDialogHeader } from "./AlertDialogHeader.vue"
export { default as AlertDialogTitle } from "./AlertDialogTitle.vue"
export { default as AlertDialogTrigger } from "./AlertDialogTrigger.vue"

```

## `src/components/ui/alert-dialog/AlertDialogTrigger.vue`
```
<script setup lang="ts">
import type { AlertDialogTriggerProps } from "reka-ui"
import { AlertDialogTrigger } from "reka-ui"

const props = defineProps<AlertDialogTriggerProps>()
</script>

<template>
  <AlertDialogTrigger data-slot="alert-dialog-trigger" v-bind="props">
    <slot />
  </AlertDialogTrigger>
</template>

```

## `src/components/ui/sonner/Sonner.vue`
```
<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-vue-next"
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>

```

## `src/components/ui/sonner/index.ts`
```
export { default as Toaster } from "./Sonner.vue"

```

## `src/components/ui/select/SelectTrigger.vue`
```
<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"], size?: "sm" | "default" }>(),
  { size: "default" },
)

const delegatedProps = reactiveOmit(props, "class", "size")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="cn(
      'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>

```

## `src/components/ui/select/SelectValue.vue`
```
<script setup lang="ts">
import type { SelectValueProps } from "reka-ui"
import { SelectValue } from "reka-ui"

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue
    data-slot="select-value"
    v-bind="props"
  >
    <slot />
  </SelectValue>
</template>

```

## `src/components/ui/select/SelectScrollUpButton.vue`
```
<script setup lang="ts">
import type { SelectScrollUpButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronUp } from "lucide-vue-next"
import { SelectScrollUpButton, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
  >
    <slot>
      <ChevronUp class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>

```

## `src/components/ui/select/SelectContent.vue`
```
<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { SelectScrollDownButton, SelectScrollUpButton } from "."

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    position: "popper",
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('p-1', position === 'popper' && 'h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>

```

## `src/components/ui/select/SelectGroup.vue`
```
<script setup lang="ts">
import type { SelectGroupProps } from "reka-ui"
import { SelectGroup } from "reka-ui"

const props = defineProps<SelectGroupProps>()
</script>

<template>
  <SelectGroup
    data-slot="select-group"
    v-bind="props"
  >
    <slot />
  </SelectGroup>
</template>

```

## `src/components/ui/select/SelectItemText.vue`
```
<script setup lang="ts">
import type { SelectItemTextProps } from "reka-ui"
import { SelectItemText } from "reka-ui"

const props = defineProps<SelectItemTextProps>()
</script>

<template>
  <SelectItemText
    data-slot="select-item-text"
    v-bind="props"
  >
    <slot />
  </SelectItemText>
</template>

```

## `src/components/ui/select/SelectLabel.vue`
```
<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectLabel } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

```

## `src/components/ui/select/SelectSeparator.vue`
```
<script setup lang="ts">
import type { SelectSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SelectSeparator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="delegatedProps"
    :class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.class)"
  />
</template>

```

## `src/components/ui/select/SelectItem.vue`
```
<script setup lang="ts">
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        props.class,
      )
    "
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <slot name="indicator-icon">
          <Check class="size-4" />
        </slot>
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

```

## `src/components/ui/select/SelectScrollDownButton.vue`
```
<script setup lang="ts">
import type { SelectScrollDownButtonProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import { SelectScrollDownButton, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
  >
    <slot>
      <ChevronDown class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>

```

## `src/components/ui/select/index.ts`
```
export { default as Select } from "./Select.vue"
export { default as SelectContent } from "./SelectContent.vue"
export { default as SelectGroup } from "./SelectGroup.vue"
export { default as SelectItem } from "./SelectItem.vue"
export { default as SelectItemText } from "./SelectItemText.vue"
export { default as SelectLabel } from "./SelectLabel.vue"
export { default as SelectScrollDownButton } from "./SelectScrollDownButton.vue"
export { default as SelectScrollUpButton } from "./SelectScrollUpButton.vue"
export { default as SelectSeparator } from "./SelectSeparator.vue"
export { default as SelectTrigger } from "./SelectTrigger.vue"
export { default as SelectValue } from "./SelectValue.vue"

```

## `src/components/ui/select/Select.vue`
```
<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from "reka-ui"
import { SelectRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot
    v-slot="slotProps"
    data-slot="select"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>

```

## `src/components/ui/dialog/DialogDescription.vue`
```
<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogDescription, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>

```

## `src/components/ui/dialog/DialogClose.vue`
```
<script setup lang="ts">
import type { DialogCloseProps } from "reka-ui"
import { DialogClose } from "reka-ui"

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <DialogClose
    data-slot="dialog-close"
    v-bind="props"
  >
    <slot />
  </DialogClose>
</template>

```

## `src/components/ui/dialog/DialogScrollContent.vue`
```
<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
            props.class,
          )
        "
        v-bind="{ ...$attrs, ...forwarded }"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
        >
          <X class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

```

## `src/components/ui/dialog/DialogTrigger.vue`
```
<script setup lang="ts">
import type { DialogTriggerProps } from "reka-ui"
import { DialogTrigger } from "reka-ui"

const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <DialogTrigger
    data-slot="dialog-trigger"
    v-bind="props"
  >
    <slot />
  </DialogTrigger>
</template>

```

## `src/components/ui/dialog/DialogHeader.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/dialog/DialogTitle.vue`
```
<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogTitle, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    :class="cn('text-lg leading-none font-semibold', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

```

## `src/components/ui/dialog/Dialog.vue`
```
<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { DialogRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot
    v-slot="slotProps"
    data-slot="dialog"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>

```

## `src/components/ui/dialog/DialogFooter.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/dialog/DialogContent.vue`
```
<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps & { class?: HTMLAttributes["class"], showCloseButton?: boolean }>(), {
  showCloseButton: true,
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        data-slot="dialog-close"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <X />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

```

## `src/components/ui/dialog/index.ts`
```
export { default as Dialog } from "./Dialog.vue"
export { default as DialogClose } from "./DialogClose.vue"
export { default as DialogContent } from "./DialogContent.vue"
export { default as DialogDescription } from "./DialogDescription.vue"
export { default as DialogFooter } from "./DialogFooter.vue"
export { default as DialogHeader } from "./DialogHeader.vue"
export { default as DialogOverlay } from "./DialogOverlay.vue"
export { default as DialogScrollContent } from "./DialogScrollContent.vue"
export { default as DialogTitle } from "./DialogTitle.vue"
export { default as DialogTrigger } from "./DialogTrigger.vue"

```

## `src/components/ui/dialog/DialogOverlay.vue`
```
<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogOverlay } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80', props.class)"
  >
    <slot />
  </DialogOverlay>
</template>

```

## `src/components/ui/radio-group/RadioGroup.vue`
```
<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RadioGroupRoot
    v-slot="slotProps"
    data-slot="radio-group"
    :class="cn('grid gap-3', props.class)"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>

```

## `src/components/ui/radio-group/RadioGroupItem.vue`
```
<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { CircleIcon } from "lucide-vue-next"
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="relative flex items-center justify-center"
    >
      <slot>
        <CircleIcon class="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

```

## `src/components/ui/radio-group/index.ts`
```
export { default as RadioGroup } from "./RadioGroup.vue"
export { default as RadioGroupItem } from "./RadioGroupItem.vue"

```

## `src/components/ui/separator/Separator.vue`
```
<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        props.class,
      )
    "
  />
</template>

```

## `src/components/ui/separator/index.ts`
```
export { default as Separator } from "./Separator.vue"

```

## `src/components/ui/card/CardTitle.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <h3
    data-slot="card-title"
    :class="cn('leading-none font-semibold', props.class)"
  >
    <slot />
  </h3>
</template>

```

## `src/components/ui/card/CardFooter.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center px-6 [.border-t]:pt-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/card/Card.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/card/CardAction.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-action"
    :class="cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/card/CardDescription.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </p>
</template>

```

## `src/components/ui/card/CardContent.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/card/CardHeader.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `src/components/ui/card/index.ts`
```
export { default as Card } from "./Card.vue"
export { default as CardAction } from "./CardAction.vue"
export { default as CardContent } from "./CardContent.vue"
export { default as CardDescription } from "./CardDescription.vue"
export { default as CardFooter } from "./CardFooter.vue"
export { default as CardHeader } from "./CardHeader.vue"
export { default as CardTitle } from "./CardTitle.vue"

```

## `src/components/ui/badge/Badge.vue`
```
<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

```

## `src/components/ui/badge/index.ts`
```
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
         "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>

```

## `src/lib/utils.ts`
```
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

## `src/main.ts`
```
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

## `src/stores/uiStore.ts`
```
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner'; 
import type { NotificationType, Item } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref<string | null>(null);
  const theme = useStorage<Theme>('theme', 'system');
  
  // Form state
  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null); // Added state

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

  // Modified openForm to accept an optional category
  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || null;
  };

  // Modified closeForm to reset new state
  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    isLoading,
    loadingMessage,
    theme,
    isFormOpen,
    editingItem,
    preselectedCategory, // Expose new state
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
    openForm,
    closeForm,
  };
});
```

## `src/stores/itemStore.ts`
```
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

## `src/styles/main.css`
```
/*
 * MODERNIST DESIGN SYSTEM - Tailwind v4 CSS-First for Todo App
 * Clean, minimal, functional - inspired by Bauhaus & Swiss typography
 * Optimized for Vue with fluid responsiveness, vertical rhythm, proportions
 */
/*
 ---break---
 */
@plugin "tailwindcss-animate";

@import "tailwindcss";

@import "tw-animate-css";

/*
 ---break---
 */

@custom-variant dark (&:is(.dark *));

/* Define layer order for cascade control */
@layer base, components, utilities;

/* ============================================
   BASE CONSTRAINTS - Minimum viewport
   ============================================ */
@layer base {
  html {
    min-width: 320px;
  }

  body {
    min-width: 320px;
  }
}

/* ============================================
   DESIGN TOKENS - Three-tier architecture
   ============================================ */

@theme {
  /* =========================
     1. PRIMITIVE TOKENS - Raw values
     ========================= */

  /* Grayscale Palette - OKLCH for better perceptual uniformity */
  --color-gray-0:   oklch(1.000 0.000 0);      /* Pure white */
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
  --color-gray-950: oklch(0.075 0.010 247);    /* Near black */

  /* Primary Palette - Blue for trust & professionalism */
  --color-blue-50:  oklch(0.96 0.025 240);  /* Very light blue */
  --color-blue-100: oklch(0.92 0.045 240);
  --color-blue-200: oklch(0.86 0.075 240);
  --color-blue-300: oklch(0.78 0.115 240);
  --color-blue-400: oklch(0.68 0.165 240);
  --color-blue-500: oklch(0.58 0.215 240);
  --color-blue-600: oklch(0.50 0.220 240);
  --color-blue-700: oklch(0.42 0.200 240);
  --color-blue-800: oklch(0.35 0.175 240);
  --color-blue-900: oklch(0.30 0.150 240);

  /* Accent Colors - Semantic use for Todo app */
  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-500: oklch(0.647 0.190 142);
  --color-green-600: oklch(0.519 0.195 142);

  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-500:  oklch(0.637 0.237 27);
  --color-red-600:  oklch(0.577 0.237 27);

  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);

  /* Typography Scale - Modular (1.2 ratio) - Fluid with clamp for auto scaling */
  --font-size-xs:   clamp(0.625rem, 0.6rem + 0.125vw, 0.694rem);     /* 10-11px */
  --font-size-sm:   clamp(0.75rem, 0.72rem + 0.14vw, 0.833rem);      /* 12-13px */
  --font-size-base: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);        /* 14-16px */
  --font-size-lg:   clamp(1.05rem, 0.99rem + 0.3vw, 1.2rem);         /* 17-19px */
  --font-size-xl:   clamp(1.26rem, 1.188rem + 0.36vw, 1.44rem);      /* 20-23px */
  --font-size-2xl:  clamp(1.512rem, 1.425rem + 0.435vw, 1.728rem);   /* 24-28px */
  --font-size-3xl:  clamp(1.814rem, 1.71rem + 0.52vw, 2.074rem);     /* 29-33px */
  --font-size-4xl:  clamp(2.177rem, 2.052rem + 0.625vw, 2.488rem);   /* 35-40px */
  --font-size-5xl:  clamp(2.612rem, 2.462rem + 0.75vw, 2.986rem);    /* 42-48px */

  /* Spacing - Standard Fixed Scale (Tailwind Default) */
  --spacing-0: 0px;
  --spacing-px: 1px;
  --spacing-0_5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;     /* 4px */
  --spacing-1_5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;      /* 8px */
  --spacing-2_5: 0.625rem;  /* 10px */
  --spacing-3: 0.75rem;     /* 12px */
  --spacing-3_5: 0.875rem;  /* 14px */
  --spacing-4: 1rem;        /* 16px */
  --spacing-5: 1.25rem;     /* 20px */
  --spacing-6: 1.5rem;      /* 24px */
  --spacing-7: 1.75rem;     /* 28px */
  --spacing-8: 2rem;        /* 32px */
  --spacing-9: 2.25rem;     /* 36px */
  --spacing-10: 2.5rem;     /* 40px */
  --spacing-11: 2.75rem;    /* 44px */
  --spacing-12: 3rem;       /* 48px */
  --spacing-14: 3.5rem;     /* 56px */
  --spacing-16: 4rem;       /* 64px */
  --spacing-20: 5rem;       /* 80px */
  --spacing-24: 6rem;       /* 96px */

  /* Spacing - Custom Fluid Scale */
  --spacing-fluid-0_5: clamp(0.125rem, 0.1rem + 0.125vw, 0.25rem);
  --spacing-fluid-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --spacing-fluid-1_5: clamp(0.375rem, 0.3rem + 0.375vw, 0.75rem);
  --spacing-fluid-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --spacing-fluid-2_5: clamp(0.625rem, 0.5rem + 0.625vw, 1.25rem);
  --spacing-fluid-3: clamp(0.75rem, 0.6rem + 0.75vw, 1.5rem);
  --spacing-fluid-4: clamp(1rem, 0.8rem + 1vw, 2rem);
  --spacing-fluid-5: clamp(1.25rem, 1rem + 1.25vw, 2.5rem);
  --spacing-fluid-6: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  --spacing-fluid-8: clamp(2rem, 1.6rem + 2vw, 4rem);
  --spacing-fluid-10: clamp(2.5rem, 2rem + 2.5vw, 5rem);
  --spacing-fluid-12: clamp(3rem, 2.4rem + 3vw, 6rem);
  --spacing-fluid-16: clamp(4rem, 3.2rem + 4vw, 8rem);
  --spacing-fluid-20: clamp(5rem, 4rem + 5vw, 10rem);
  --spacing-fluid-24: clamp(6rem, 4.8rem + 6vw, 12rem);

  /* Line Heights - Fluid for better rhythm */
  --line-height-none: 1;
  --line-height-tight: clamp(1.2, 1.15 + 0.25vw, 1.25);
  --line-height-snug: clamp(1.325, 1.3 + 0.125vw, 1.375);
  --line-height-normal: clamp(1.45, 1.4 + 0.25vw, 1.5);
  --line-height-relaxed: clamp(1.575, 1.55 + 0.125vw, 1.625);
  --line-height-loose: clamp(1.7, 1.675 + 0.125vw, 1.75);

  /* Vertical Rhythm System - Based on base line-height multiple */
  --rhythm-base: var(--line-height-normal); /* ~1.5 */
  --rhythm-half: calc(var(--rhythm-base) / 2);
  --rhythm-double: calc(var(--rhythm-base) * 2);
  --rhythm-triple: calc(var(--rhythm-base) * 3);

  /* Fluid Rhythm */
  --rhythm-fluid: clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem);
  --rhythm-fluid-half: calc(var(--rhythm-fluid) / 2);
  --rhythm-fluid-double: calc(var(--rhythm-fluid) * 2);
  --rhythm-fluid-triple: calc(var(--rhythm-fluid) * 3);

  /* Semantic Rhythm Tokens for Todo app */
  --margin-after-heading: var(--rhythm-fluid);
  --margin-after-paragraph: var(--rhythm-half);
  --margin-between-sections: var(--rhythm-double);
  --gap-grid-items: var(--rhythm-fluid);
  --gap-component-internal: var(--spacing-2);

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Border Radius - Subtle for modernist aesthetic */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.25rem;    /* 4px */
  --radius-lg: 0.375rem;   /* 6px */
  --radius-xl: 0.5rem;     /* 8px */
  --radius-2xl: 0.75rem;   /* 12px */
  --radius-3xl: 1rem;      /* 16px */
  --radius-full: 9999px;   /* pills */

  /* Shadows - Subtle depth */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-none: none;

  /* =========================
     2. SEMANTIC TOKENS - Context-aware
     ========================= */

  /* Background & Surface */
  --color-background: var(--color-gray-0);
  --color-surface: var(--color-gray-50);
  --color-surface-hover: var(--color-gray-100);
  --color-surface-active: var(--color-gray-200);

  /* Text Hierarchy */
  --color-text-primary: var(--color-gray-900);
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

  /* -- ADD THESE TWO NEW LINES FOR THE 'MID' PRIORITY BADGE -- */
  --color-priority-mid-bg: var(--color-amber-50);
  --color-priority-mid-text: var(--color-amber-600);

  /* Borders */
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
  --color-border-focus: var(--color-blue-500);

  /* Modal & Overlay */
  --color-backdrop: rgb(0 0 0 / 0.7);
  --color-modal-bg: var(--color-surface);
  --color-modal-border: var(--color-border);

  /* =========================
     3. COMPONENT TOKENS - Specific use for Todo app
     ========================= */

  /* Button Components */
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-transition: 150ms;

  /* Button Sizes - Icon Only */
  --button-icon-xs: var(--spacing-1);
  --button-icon-sm: var(--spacing-1_5);
  --button-icon-md: var(--spacing-2);
  --button-icon-lg: var(--spacing-2_5);

  /* Button Sizes - With Text */
  --button-xs-px: var(--spacing-2_5);
  --button-xs-py: var(--spacing-1);
  --button-xs-gap: var(--spacing-1);
  --button-xs-text: var(--font-size-xs);

  --button-sm-px: var(--spacing-3);
  --button-sm-py: var(--spacing-1_5);
  --button-sm-gap: var(--spacing-1_5);
  --button-sm-text: var(--font-size-sm);

  --button-md-px: var(--spacing-4);
  --button-md-py: var(--spacing-2);
  --button-md-gap: var(--spacing-2);
  --button-md-text: var(--font-size-base);

  --button-lg-px: var(--spacing-5);
  --button-lg-py: var(--spacing-2_5);
  --button-lg-gap: var(--spacing-2_5);
  --button-lg-text: var(--font-size-lg);

  /* Card/Item Components (uses FLUID spacing) */
  --card-radius: var(--radius-lg);
  --card-padding: var(--spacing-fluid-4);
  --card-shadow: var(--shadow);

  /* Input Components */
  --input-radius: var(--radius-md);
  --input-padding-x: var(--spacing-3);
  --input-padding-y: var(--spacing-2);
  --input-border-width: 1px;
  --input-font-size: var(--font-size-base);

  /* Checkbox/Radio sizing */
  --checkbox-size: 1.125rem; /* 18px - reasonable, accessible size */
  --radio-size: 1.125rem;    /* 18px - same as checkbox for consistency */
  --checkbox-radius: var(--radius-sm);  /* Subtle rounded corners for checkboxes */

  /* Navigation/Sidebar (uses FLUID spacing) */
  --nav-height: clamp(3rem, 2.5rem + 2.5vw, 4rem);
  --nav-padding: var(--spacing-fluid-4);

  /* Layout */
  --container-max: 1280px;
  --sidebar-width: clamp(200px, 15vw, 280px);
  --content-max: 65ch;
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
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: var(--gap-grid-items);
  }

  /* Custom Fluid Spacing Utilities */
  .p-fluid-1 { padding: var(--spacing-fluid-1); }
  .p-fluid-2 { padding: var(--spacing-fluid-2); }
  .p-fluid-3 { padding: var(--spacing-fluid-3); }
  .p-fluid-4 { padding: var(--spacing-fluid-4); }
  .p-fluid-5 { padding: var(--spacing-fluid-5); }
  .p-fluid-6 { padding: var(--spacing-fluid-6); }
  .p-fluid-8 { padding: var(--spacing-fluid-8); }

  .px-fluid-4 { padding-left: var(--spacing-fluid-4); padding-right: var(--spacing-fluid-4); }
  .py-fluid-4 { padding-top: var(--spacing-fluid-4); padding-bottom: var(--spacing-fluid-4); }
  
  .m-fluid-4 { margin: var(--spacing-fluid-4); }
  .mt-fluid-4 { margin-top: var(--spacing-fluid-4); }
  .mb-fluid-4 { margin-bottom: var(--spacing-fluid-4); }

  .gap-fluid-2 { gap: var(--spacing-fluid-2); }
  .gap-fluid-4 { gap: var(--spacing-fluid-4); }
  .gap-fluid-6 { gap: var(--spacing-fluid-6); }
  .gap-fluid-8 { gap: var(--spacing-fluid-8); }

  .space-y-fluid-2 > :not([hidden]) ~ :not([hidden]) { margin-top: var(--spacing-fluid-2); }
  .space-y-fluid-3 > :not([hidden]) ~ :not([hidden]) { margin-top: var(--spacing-fluid-3); }
  .space-y-fluid-6 > :not([hidden]) ~ :not([hidden]) { margin-top: var(--spacing-fluid-6); }
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
    contain-intrinsic-size: 0 300px;
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
  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-500: oklch(0.647 0.190 142);
  --color-green-600: oklch(0.519 0.195 142);

  /* Red */
  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-500:  oklch(0.637 0.237 27);
  --color-red-600:  oklch(0.577 0.237 27);
  --color-red-700:  oklch(0.517 0.237 27);

  /* Amber */
  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);
  --radius: 0.625rem;
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
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
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
  --color-text-inverse: var(--color-gray-0);

  --color-border: var(--color-gray-800);
  --color-border-hover: var(--color-gray-700);

  --color-input-bg: var(--color-gray-800);
  --color-input-border: var(--color-gray-600);
  --color-input-text: var(--color-gray-100);
  --color-input-placeholder: var(--color-gray-500);

  /* Modal & Overlay in dark mode */
  --color-backdrop: rgb(0 0 0 / 0.85);
  --color-modal-bg: var(--color-gray-800);
  --color-modal-border: var(--color-gray-700);

  /* -- ADD THESE TWO LINES TO FIX THE 'MID' PRIORITY BADGE -- */
  --color-priority-mid-bg: var(--color-amber-500);
  --color-priority-mid-text: var(--color-gray-950);
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

/* ============================================
   BASE LAYER - Global defaults
   ============================================ */

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-text-primary antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-text-primary;
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
   UTILITIES LAYER - Helper classes a
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

  /* Text Size Utilities - Token-based */
  .text-size-xs { font-size: var(--font-size-xs); }
  .text-size-sm { font-size: var(--font-size-sm); }
  .text-size-base { font-size: var(--font-size-base); }
  .text-size-lg { font-size: var(--font-size-lg); }
  .text-size-xl { font-size: var(--font-size-xl); }

  /* Tag/Chip Utilities */
  .tag-sm {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: var(--spacing-0_5);
    padding-bottom: var(--spacing-0_5);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-tight);
    white-space: nowrap;
    gap: var(--spacing-1);
  }

  /* -- ADD THIS NEW CLASS FOR THE 'MID' PRIORITY BADGE -- */
  .tag-priority-mid {
    background-color: var(--color-priority-mid-bg);
    color: var(--color-priority-mid-text);
    border-radius: var(--radius-full);
  }

  /* Button Size Utilities - Icon Only */
  .btn-icon-xs {
    padding: 0;
    margin: 0;
    margin-left: var(--spacing-1);
    border: none;
    background: none;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    min-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 0;
    transition: color 150ms, background-color 150ms;
  }
  .btn-icon-sm { padding: var(--button-icon-sm); }
  .btn-icon-md { padding: var(--button-icon-md); }
  .btn-icon-lg { padding: var(--button-icon-lg); }

  /* Button Size Utilities - With Text */
  .btn-xs {
    padding-left: var(--button-xs-px);
    padding-right: var(--button-xs-px);
    padding-top: var(--button-xs-py);
    padding-bottom: var(--button-xs-py);
    gap: var(--button-xs-gap);
    font-size: var(--button-xs-text);
  }

  .btn-sm {
    padding-left: var(--button-sm-px);
    padding-right: var(--button-sm-px);
    padding-top: var(--button-sm-py);
    padding-bottom: var(--button-sm-py);
    gap: var(--button-sm-gap);
    font-size: var(--button-sm-text);
  }

  .btn-md {
    padding-left: var(--button-md-px);
    padding-right: var(--button-md-px);
    padding-top: var(--button-md-py);
    padding-bottom: var(--button-md-py);
    gap: var(--button-md-gap);
    font-size: var(--button-md-text);
  }

  .btn-lg {
    padding-left: var(--button-lg-px);
    padding-right: var(--button-lg-px);
    padding-top: var(--button-lg-py);
    padding-bottom: var(--button-lg-py);
    gap: var(--button-lg-gap);
    font-size: var(--button-lg-text);
  }
}

/*
 ---break---
 */

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

/*
 ---break---
 */

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## `src/layouts/MainLayout.vue`
```
<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <!-- 
    Layout changed from 'flex' to 'grid'.
    The grid columns are defined by our CSS variable for sidebar and '1fr' for main content.
    This provides a robust and token-based layout structure.
  -->
  <div class="grid min-h-screen" style="grid-template-columns: var(--sidebar-width) 1fr;">
    <!-- Sidebar: Width is now controlled by the grid template column -->
    <AppSidebar />

    <!-- 
      Main Content: 
      - 'min-w-0' is crucial. It prevents wide content (like long text without breaks) 
        from pushing past the boundaries of the grid cell, fixing the overlap issue.
      - 'flex-1' is removed as it's a flexbox property.
    -->
    <main class="min-w-0 overflow-y-auto">
      <div class="p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
        <TopBar />
        <div class="flex-1">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
```

## `src/style.css`
```
@import "tailwindcss";
@import "tw-animate-css";
@import "./styles/main.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
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
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
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

```

## `src/schemas/itemSchema.ts`
```
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

## `src/router/index.ts`
```
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

## `src/App.vue`
```
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner';  
import 'vue-sonner/style.css';  
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

## `src/composables/useItemFilters.ts`
```
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

## `src/composables/useThemeUpdater.ts`
```
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

## `src/composables/useItemsApi.ts`
```
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

## `src/types/index.ts`
```
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

## `src/pages/ItemDetailPage.vue`
```
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

## `src/pages/ItemPage.vue`
```
<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemTree } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';
import { useUiStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';

const { data: itemTree, isLoading, error } = useItemTree();
const uiStore = useUiStore();

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
</script>

<template>
  <MainLayout>
    <header class="mb-6">
      <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
      <!-- The main "Add New Item" button remains in the sidebar -->
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
    <div v-else class="mt-6 space-y-8">
      <section v-for="(items, category) in filteredItemTree" :key="category">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="font-semibold capitalize text-size-xl">{{ category }}</h2>
          <span class="text-sm text-text-muted">({{ items.length }})</span>
          <!-- Add "+" button here -->
          <Button variant="ghost" size="icon-sm" @click="uiStore.openForm(undefined, category)">
            <icon-lucide-plus class="w-4 h-4" />
          </Button>
        </div>
        <div class="grid gap-4">
          <ItemItem
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
      <div v-if="Object.keys(filteredItemTree).length === 0 && !isLoading" class="py-10 text-center text-text-muted">
        <p>No items found.</p>
        <p v-if="hasActiveFilters">Try adjusting your filters.</p>
      </div>
    </div>

    <!-- The ItemForm is now aware of pre-selected category -->
    <ItemForm
      v-if="uiStore.isFormOpen"
      @close="uiStore.closeForm"
    />
  </MainLayout>
</template>
```

## `src/pages/AboutPage.vue`
```
<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
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
            <strong class="font-medium text-text-primary">Vue 3:</strong> For building a reactive and performant user interface with the Composition API.
          </li>
          <li>
            <strong class="font-medium text-text-primary">TanStack Query (Vue Query):</strong> Manages all server state, handling data fetching, caching, and synchronization effortlessly.
          </li>
          <li>
            <strong class="font-medium text-text-primary">TanStack Form (Vue Form):</strong> Ensures performant and 100% type-safe forms from validation to submission.
          </li>
          <li>
            <strong class="font-medium text-text-primary">Pinia:</strong> Provides simple and type-safe global state management for client-side UI state.
          </li>
           <li>
            <strong class="font-medium text-text-primary">shadcn-vue:</strong> A collection of beautifully designed, accessible, and unstyled components that are adapted to our custom design system.
          </li>
          <li>
            <strong class="font-medium text-text-primary">Tailwind CSS v4:</strong> Powers styling with a "CSS-first" approach, using a custom, token-based, and fluidly responsive design system.
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>
```

## `src/api/itemApi.ts`
```
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

## `src/api/apiClient.ts`
```
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

## `components.json`
```
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "",
    "css": "src/style.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "composables": "@/composables"
  },
  "registries": {}
}

```

