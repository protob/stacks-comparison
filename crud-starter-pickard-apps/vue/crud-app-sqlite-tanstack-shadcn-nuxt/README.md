

# Items App - Nuxt Frontend

## 1. Core Architecture & Tech Stack

This is a modern, responsive Nuxt application built with a focus on developer experience, performance, and maintainability. It leverages a fully type-safe, component-based architecture using the Composition API and Nuxt 3's auto-imports and file-based conventions.

| Category            | Technology                                                                                           | Version    | Purpose & Key Features                                                                                                          |
| :------------------ | :--------------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**       | [Nuxt](https://nuxt.com/)                                                                            | `^4.2.1`   | Powers the UI with a component-based model, server-side rendering (SSR), and file-based conventions.                            |
| **Build Tool**      | [Vite](https://vitejs.dev/)                                                                          | (Internal) | Provides a lightning-fast development server with HMR and optimized production builds, integrated into Nuxt.                    |
| **Routing**         | [Nuxt File-Based Routing](https://nuxt.com/docs/getting-started/routing)                             | N/A        | Handles all routing automatically based on the structure of the `app/pages` directory.                                          |
| **Data Fetching**   | [TanStack Query (Vue Query)](https://tanstack.com/query/v5/docs/vue/overview)                        | `^5.91.2`  | Manages server state, handling data fetching, caching, and synchronization via the `@peterbud/nuxt-query` module.               |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                                                             | `v4.1.17`  | A utility-first CSS framework configured with a "CSS-first" approach, leveraging a custom, token-based design system.           |
| **UI Components**   | [shadcn-nuxt](https://www.shadcn-vue.com/nuxt.html)                                                  | `2.3.3`    | A collection of beautifully designed, accessible components built on `radix-vue` and tailored for Nuxt.                         |
| **Form Management** | [TanStack Form (Vue Form)](https://tanstack.com/form/v0/docs/adapters/vue-form)                      | `^1.25.0`  | Manages form state with a performance-first and type-safe approach.                                                             |
| **UI State**        | [Pinia](https://pinia.vuejs.org/)                                                                    | `^3.0.4`   | The official state management library for Vue, integrated via the `@pinia/nuxt` module for a simple and type-safe global store. |
| **Validation**      | [Zod](https://zod.dev/)                                                                              | `^4.1.12`  | Provides TypeScript-first schema declaration and validation, used with the TanStack Form adapter.                               |
| **Notifications**   | [vue-sonner](https://github.com/wobsoriano/vue-sonner)                                               | `2.0.9`    | An opinionated toast library for elegant and simple notifications, integrated via a Nuxt plugin.                                |
| **Icons**           | [Lucide Vue Next](https://lucide.dev/)                                                               | `0.553.0`  | A clean, consistent icon toolkit, made available through the `@nuxt/icon` module.                                               |
| **Language**        | [TypeScript](https://www.typescriptlang.org/)                                                        | `^5.9.3`   | Ensures full type safety across the entire application, enhanced by Nuxt's auto-generated types.                                |
| **Class Utilities** | [tailwind-merge](https://github.com/dcastil/tailwind-merge) & [clsx](https://github.com/lukeed/clsx) | `^3.4.0`   | Intelligently merges Tailwind CSS classes without style conflicts via the `cn` utility.                                         |
| **Composables**     | [@vueuse/nuxt](https://vueuse.org/guide/index.html#nuxt)                                             | `^14.0.0`  | Provides a suite of essential Composition API utilities, fully tree-shakable.                                                   |

---

## 2. Project Structure Deep Dive

The codebase follows Nuxt 3's conventions, which promote a logical and scalable structure. Path aliases (`@/*` and `~/`) are configured automatically to point to the root directory for clean import paths.

```
/
├── app/
│   ├── api/                      # API communication layer
│   │   ├── apiClient.ts          # Base ofetch client with error handling
│   │   └── itemApi.ts            # Type-safe functions for item CRUD endpoints
│   ├── assets/                   # Un-compiled assets like CSS
│   │   ├── css/main.css          # Core of the custom design system
│   │   └── css/tailwind.css      # Tailwind CSS configuration and variable mapping
│   ├── components/               # Reusable Vue components (auto-imported)
│   │   ├── items/                # Components specific to items (ItemForm, ItemItem)
│   │   ├── layout/               # Layout components (Sidebar, TopBar, FilterBar)
│   │   └── ui/                   # shadcn-nuxt base UI components (Button, Card, etc.)
│   ├── composables/              # Reusable Composition API functions (auto-imported)
│   │   ├── useItemFilters.ts     # Logic for filtering the item tree
│   │   └── useItemsApi.ts        # TanStack Query composables for item data
│   ├── layouts/                  # Main page layouts
│   │   └── default.vue           # The default layout with a sidebar and main content area
│   ├── lib/                      # General-purpose libraries and utilities
│   │   └── utils.ts              # shadcn-nuxt `cn` utility for merging class names
│   ├── pages/                    # Route components for file-based routing
│   │   ├── items/
│   │   │   └── [categorySlug]/[itemSlug].vue # Dynamic route for item details
│   │   ├── about.vue             # /about route
│   │   └── index.vue             # / (index) route
│   ├── plugins/                  # Nuxt plugins
│   │   ├── ssr-width.ts          # SSR-friendly width for @vueuse/core
│   │   └── vue-sonner.ts         # Integrates the vue-sonner Toaster component
│   ├── schemas/                  # Zod validation schemas
│   │   └── itemSchema.ts         # Schema for the item creation/edit form
│   ├── stores/                   # Pinia stores for global client state (auto-imported)
│   │   ├── filterStore.ts        # Manages filtering and searching state
│   │   └── uiStore.ts            # Manages theme, form modals, and notifications
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Global types (Item, ApiResponse, etc.)
│   ├── utils/                    # Project-specific utility functions
│   │   ├── helpers.ts            # General helper functions (e.g., formatDate)
│   │   └── slugify.ts            # URL slug generation
│   └── app.vue                   # Root application component (contains NuxtLayout & NuxtPage)
├── components.json               # shadcn-nuxt configuration file
├── nuxt.config.ts                # Nuxt configuration file
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Project dependencies and scripts
```

---

## 3. Modernist Design System & shadcn-nuxt Integration

The application's visual identity is governed by a comprehensive, three-tier design system defined in `app/assets/css/main.css`. It is built on modern CSS principles and is fully integrated with `shadcn-nuxt`.

**Core Principles:**

- **CSS-First Configuration**: Uses Tailwind v4's `@theme` directive, making `app/assets/css/main.css` the single source of truth for all design tokens.
- **Fluid Responsiveness**: Employs `clamp()` for typography and spacing, creating a seamless, fluid layout that adapts to any screen size without manual breakpoints.
- **Semantic Tokenization**: Enforces the use of meaningful tokens (e.g., `--color-surface`, `--card-padding`) instead of hardcoded values.
- **OKLCH Color System**: Utilizes the modern OKLCH color model for perceptually uniform, vibrant, and accessible color palettes that are easy to manipulate.

### 3.1. shadcn-nuxt Integration

This project does not use a default theme. Instead, it maps its own rich, semantic design system variables to the variables `shadcn-nuxt` components expect. This is achieved in `app/assets/css/tailwind.css`, which acts as an adapter layer.

This approach provides the best of both worlds:

1.  The ability to use the well-architected, accessible components from `shadcn-nuxt`.
2.  Full control over the application's unique visual identity through the custom design system in `main.css`.

### 3.2. Developer Usage Guide

**It is critical to use the provided semantic utility classes and CSS variables instead of raw Tailwind utilities or hardcoded values.** This maintains the integrity of the design system.

| ✅ **CORRECT (Use Semantic Tokens)**                           | ❌ **INCORRECT (Avoid Raw Values)**                     |
| :------------------------------------------------------------- | :------------------------------------------------------ |
| `<div class="bg-surface text-text-primary p-card rounded-xl">` | `<div class="p-4 text-gray-900 rounded-lg bg-gray-50">` |
| `<Button variant="primary">...`                                | `<button class="bg-blue-600 hover:bg-blue-700">...`     |
| `<h1 class="text-size-xl">Heading</h1>`                        | `<h1 class="text-2xl">Heading</h1>`                     |

**Key Custom Utilities (Defined in `main.css`):**

- **Text Sizes**: `.text-size-xs` through `.text-size-xl`.
- **Tags/Badges**: `.tag-sm`, `.tag-priority-mid`.
- **Performance**: `.contain-strict` and `.item-list` for CSS containment.
- **Fluid Spacing**: `.p-fluid-4`, `.gap-fluid-4`, etc., for responsive spacing.

---

## 4. State & Data Management

The application separates state into two categories: **Server State** (data from the API) and **Client State** (UI-specific data).

### 4.1. Server State (TanStack Query / Vue Query)

All interactions with the backend API are managed by Vue Query, integrated seamlessly with Nuxt.

- **Composables**: All query and mutation logic is encapsulated in custom composables within `app/composables/useItemsApi.ts`. These are auto-imported into pages and components.
- **Query Keys**: A structured keying system (`itemKeys`) is used to manage cache invalidation effectively.
- **Mutations**: `useAddItem`, `useUpdateItem`, and `useDeleteItem` composables handle CUD operations. They automatically show notifications via the `uiStore` and invalidate the relevant queries (`itemKeys.tree`) upon success to keep the UI in sync.

### 4.2. Client State (Pinia)

Global UI state is managed by lightweight Pinia stores, auto-imported by Nuxt.

- **`useUiStore`**: Manages global UI state such as the current theme (`isDark`), form visibility (`isFormOpen`), and data for pre-filling forms (`preselectedCategory`). It integrates with **vue-sonner** to display toast notifications. Theme state is managed via the `@nuxtjs/color-mode` module.
- **`useFilterStore`**: Manages the state for all filtering options, such as search queries, priority selection, and tags.

---

## 5. Routing (Nuxt File-Based)

The application uses Nuxt's powerful and intuitive file-based routing system. There is no manual router configuration file.

- **Convention-over-Configuration**: Nuxt automatically generates the Vue Router configuration based on the file and directory structure inside `app/pages`.
- **Data Fetching**: Data is fetched directly within page components using the auto-imported TanStack Query composables (`useItemTree`, `useItemDetail`). This pattern is clean, co-locates data dependencies with the components that use them, and works perfectly with Nuxt's lifecycle.

**Defined Routes:**

- `app/pages/index.vue` → `/`
- `app/pages/about.vue` → `/about`
- `app/pages/items/[categorySlug]/[itemSlug].vue` → `/items/:categorySlug/:itemSlug`

---

## 6. API Integration

Communication with the backend REST API is handled by a robust, type-safe client built on `ofetch`, a powerful fetch library from the Nuxt ecosystem.

- **Base Client (`apiClient.ts`)**: Creates an `ofetch` instance with a base URL and default headers. Wrapper functions (`get`, `post`, etc.) are used to automatically unwrap the `data` property from the standardized API response.
- **Endpoints (`itemApi.ts`)**: Defines a function for each API endpoint (e.g., `getItemTree`, `createItem`), using TypeScript interfaces from `app/types` to ensure all payloads are correctly shaped.

---

## 7. Development & Operations

### 7.1. Prerequisites

- Node.js (LTS version recommended).
- A package manager like `npm`, `pnpm`, `yarn`, or `bun`.

### 7.2. Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd <project-root>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure API URL:** The backend API URL is currently hardcoded in `app/api/apiClient.ts`. If your backend is running on a different address, modify the `API_URL_BASE` constant.
    ```typescript
    // app/api/apiClient.ts
    const API_URL_BASE = "http://localhost:3000/api"; // <-- Change this if needed
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### 7.3. Available Scripts

- `npm run dev`: Starts the Nuxt development server with HMR.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally for testing.
- `npm run generate`: Builds a statically-generated version of the application.
- `npm run postinstall`: A script run by `npm` after installation to prepare Nuxt types.
