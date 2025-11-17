Of course, here is the updated, comprehensive technical documentation for the `crud-app-sqlite` frontend codebase. This new `README.md` reflects the integration of `shadcn/ui` and other changes based on the provided source files.

---

# (Technical Documentation) Items App - Frontend

**This document serves as a detailed technical guide for developers (human or AI) interacting with the `crud-app-sqlite` frontend codebase. Its purpose is to provide a comprehensive understanding of the architecture, design system, state management, and development practices.**

---

## 1. Core Architecture & Tech Stack

This is a modern, responsive React application built with a focus on developer experience, performance, and maintainability. It leverages a fully type-safe, component-based architecture.

| Category | Technology | Version | Purpose & Key Features |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | `18.2.0` | Powers the UI with a component-based model and modern features like hooks. |
| **Build Tool** | [Vite](https://vitejs.dev/) | `5.2.0` | Provides a lightning-fast development server with Hot Module Replacement (HMR) and optimized production builds. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | `1.136.6` | Enables 100% type-safe, client-side routing with route loaders for data pre-fetching and nested layouts. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | `5.90.9` | Manages server state, handling data fetching, caching, and synchronization with the backend API. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.0.0-alpha.13` | A utility-first CSS framework configured with a "CSS-first" approach, leveraging a custom, token-based design system. |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) | N/A | A collection of beautifully designed, accessible, and unstyled components built on top of Radix UI. |
| **Form Management**| [TanStack Form](https://tanstack.com/form) | `1.25.0` | Manages form state with a performance-first and type-safe approach. |
| **UI State** | [Zustand](https://zustand-demo.pmnd.rs/) | `4.5.0` | A minimal, hook-based library for managing global client-side UI state (e.g., theme, loading spinners). |
| **Validation** | [Zod](https://zod.dev/) | `4.1.12` | Provides TypeScript-first schema declaration and validation, used with the TanStack Form adapter. |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | `2.0.7` | An opinionated toast library for elegant and simple notifications. |
| **Icons** | [Lucide React](https://lucide.dev/) | `0.554.0` | A clean, consistent, and tree-shakable icon toolkit. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.7.2` | Ensures full type safety across the entire application. |
| **Class Utilities**| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | `3.4.0` | Intelligently merges Tailwind CSS classes without style conflicts. |
| **Auto-Imports**| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) | `0.17.6` | Reduces boilerplate by automatically importing commonly used hooks and utilities. |

---

## 2. Project Structure Deep Dive

The codebase is organized into a logical and scalable structure. Path aliases (`@/*`) are configured in `tsconfig.json` to point to the `src/` directory for clean import paths.

```
frontend/
├── src/
│   ├── api/                      # API communication layer
│   │   ├── apiClient.ts          # Base fetch client with error handling & result unwrapping
│   │   └── itemApi.ts            # Type-safe functions for item CRUD endpoints
│   ├── components/               # React components (UI), including shadcn/ui components
│   ├── hooks/                    # Custom React hooks for reusable logic
│   │   ├── useItemFilters.ts     # Logic for filtering the item tree
│   │   ├── useItemsApi.ts        # TanStack Query hooks for item data
│   │   └── useThemeUpdater.ts    # Applies theme class to the DOM
│   ├── lib/                      # General-purpose libraries and utilities
│   │   └── utils.ts              # shadcn/ui `cn` utility for merging class names
│   ├── pages/                    # Route components
│   │   ├── AboutPage.tsx         # /about route
│   │   ├── ItemDetailPage.tsx    # /items/:categorySlug/:itemSlug route
│   │   └── ItemPage.tsx          # / (index) route
│   ├── schemas/                  # Zod validation schemas
│   │   └── itemSchema.ts         # Schema for the item creation/edit form
│   ├── stores/                   # Zustand stores for global client state
│   │   ├── useItemStore.ts       # Placeholder for client-only item state
│   │   └── useUiStore.ts         # Manages theme, notifications, global loading
│   ├── styles/                   # CSS and Design System
│   │   └── main.css              # Core of the design system: tokens, layers, utilities
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Global types (Item, ApiResponse, etc.)
│   ├── utils/                    # Project-specific utility functions
│   │   ├── helpers.ts            # General helper functions (e.g., formatDate)
│   │   └── slugify.ts            # URL slug generation
│   ├── App.tsx                   # Root application component (contains router outlet)
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global base styles and shadcn/ui variable mapping
│   ├── router.ts                 # TanStack Router configuration and route tree
│   └── auto-imports.d.ts         # Auto-generated types for unplugin-auto-import
├── components.json               # shadcn/ui configuration file
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite build tool configuration
├── tailwind.config.js            # Tailwind CSS configuration (maps to CSS tokens)
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Project dependencies and scripts
```

---

## 3. Modernist Design System & Shadcn/UI Integration

The application's visual identity is governed by a comprehensive, three-tier design system defined in `src/styles/main.css`. It is built on modern CSS principles and is fully integrated with `shadcn/ui`.

**Core Principles:**
*   **CSS-First Configuration**: Uses Tailwind v4's `@theme` directive, making `src/styles/main.css` the single source of truth for all design tokens.
*   **Fluid Responsiveness**: Employs `clamp()` for typography and spacing, creating a seamless, fluid layout that adapts to any screen size without manual breakpoints.
*   **Semantic Tokenization**: Enforces the use of meaningful tokens (e.g., `--color-surface`, `--card-padding`) instead of hardcoded values.
*   **OKLCH Color System**: Utilizes the modern OKLCH color model for perceptually uniform, vibrant, and accessible color palettes that are easy to manipulate.

### 3.1. Shadcn/UI Integration

This project does not use the default `shadcn/ui` theme. Instead, it maps its own rich, semantic design system variables to the variables `shadcn/ui` components expect. This is achieved in `src/index.css`, which acts as an adapter layer.

This approach provides the best of both worlds:
1.  The ability to use the well-architected, accessible components from `shadcn/ui`.
2.  Full control over the application's unique visual identity through the custom design system in `main.css`.

### 3.2. Developer Usage Guide

**It is critical to use the provided semantic utility classes and CSS variables instead of raw Tailwind utilities or hardcoded values.** This maintains the integrity of the design system.

| ✅ **CORRECT (Use Semantic Tokens)** | ❌ **INCORRECT (Avoid Raw Values)** |
| :--- | :--- |
| `<div class="bg-surface text-text-primary p-card rounded-card">` | `<div class="p-4 text-gray-900 rounded-lg bg-gray-50">` |
| `<button class="bg-primary hover:bg-primary-hover">` | `<button class="bg-blue-600 hover:bg-blue-700">` |
| `<h1 class="text-size-xl">Heading</h1>` | `<h1 class="text-2xl">Heading</h1>` |

**Key Custom Utilities (Defined in `main.css`):**
*   **Text Sizes**: `.text-size-xs` through `.text-size-xl`.
*   **Tags/Badges**: `.tag-sm`, `.tag-priority-mid`.
*   **Buttons**: `.btn-sm`, `.btn-md`, etc., for consistent sizing.
*   **Performance**: `.contain-strict` and `.item-list` for CSS containment.
*   **Responsiveness**: `.container-aware` and `.grid-auto-items` for container query-based layouts.
*   **Fluid Spacing**: `.p-fluid-4`, `.gap-fluid-4`, etc., for responsive spacing.

---

## 4. State & Data Management

The application separates state into two categories: **Server State** (data from the API) and **Client State** (UI-specific data).

### 4.1. Server State (TanStack Query)

All interactions with the backend API are managed by TanStack Query.
*   **Custom Hooks**: All query and mutation logic is encapsulated in custom hooks within `src/hooks/useItemsApi.ts`.
*   **Query Keys**: A structured keying system (`itemKeys`) is used to manage cache invalidation effectively.
*   **Mutations**: `useAddItem`, `useUpdateItem`, and `useDeleteItem` hooks handle CUD operations. They automatically show notifications via the `useUiStore` and invalidate the relevant queries (`itemKeys.tree()`) upon success to keep the UI in sync.

### 4.2. Client State (Zustand)

Global UI state is managed by a lightweight Zustand store to avoid prop-drilling.
*   **`useUiStore`**: Manages global loading indicators and the current theme (`light`/`dark`/`system`). It integrates with the **Sonner** library to display toast notifications. The theme state is persisted to `localStorage`.
*   **`useItemStore`**: A placeholder for any complex, client-only state related to items that might be needed in the future.

---

## 5. Routing (TanStack Router)

The application uses TanStack Router for type-safe, modern routing, configured in `src/router.ts`.

**Key Features:**
*   **Type Safety**: Routes, links, and parameters are fully type-safe, preventing common routing errors at compile time.
*   **Loaders**: The `loader` function on each route definition pre-fetches data using `queryClient.ensureQueryData`, ensuring data is available before the component renders.
*   **Path Parameters**: The `/items/$categorySlug/$itemSlug` route demonstrates type-safe parameter access.

**Defined Routes:**
*   `/`: Main items page, loads the entire item tree.
*   `/about`: Static "About" page.
*   `/items/:categorySlug/:itemSlug`: Detail view for a single item.

---

## 6. API Integration

Communication with the backend REST API is handled by a robust, type-safe client.
*   **Base Client (`apiClient.ts`)**: Wraps the native `fetch` API to standardize requests and responses. It features a custom `Result` type and an `unwrapResult` function to centralize error handling, ensuring that API errors are consistently caught by TanStack Query.
*   **Endpoints (`itemApi.ts`)**: Defines a function for each API endpoint (e.g., `getItemTree`, `createItem`), using TypeScript interfaces (`CreateItemPayload`, `UpdateItemPayload`) to ensure data is correctly shaped.

---

## 7. Development & Operations

### 7.1. Prerequisites

*   Bun runtime installed.
*   A running instance of the backend API.

### 7.2. Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Configure API URL:** The backend API URL is currently hardcoded in `src/api/apiClient.ts`. If your backend is running on a different address, modify the `API_URL_BASE` constant in that file.
    ```typescript
    // src/api/apiClient.ts
    const API_URL_BASE = 'http://localhost:3000/api'; // <-- Change this if needed
    ```
4.  **Start the development server:**
    ```bash
    bun run dev
    ```
    The application will be accessible at `http://localhost:5173`.

### 7.3. Available Scripts

*   `bun run dev`: Starts the Vite development server with HMR.
*   `bun run build`: Generates router types, runs the TypeScript checker, and builds the application for production in the `dist/` directory.
*   `bun run preview`: Serves the production build locally for testing.
*   `bun run type-check`: Runs the TypeScript compiler to check for type errors without generating output.
*   `bun run route-gen`: A helper script used by `build` to ensure TanStack Router's types are up-to-date.