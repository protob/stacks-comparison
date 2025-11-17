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