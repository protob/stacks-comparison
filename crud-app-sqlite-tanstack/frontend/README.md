# (Technical Documentation) Items App - Frontend

**This document serves as a detailed technical guide for developers (human or AI) interacting with the `crud-app-sqlite` frontend codebase. Its purpose is to provide a comprehensive understanding of the architecture, design system, state management, and development practices.**

---

## 1. Core Architecture & Tech Stack

This is a modern, responsive React application built with a focus on developer experience, performance, and maintainability. It leverages a fully type-safe, component-based architecture.

| Category | Technology | Version | Purpose & Key Features |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | `18.2.0` | Powers the UI with a component-based model. Utilizes Concurrent Rendering for improved performance. |
| **Build Tool** | [Vite](https://vitejs.dev/) | `5.2.0` | Provides a lightning-fast development server with Hot Module Replacement (HMR) and optimized production builds. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | `1.136.6` | Enables 100% type-safe, client-side routing with powerful features like route loaders for data pre-fetching, search-param APIs, and nested layouts. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | `5.90.9` | Manages server state, handling data fetching, caching, and synchronization with the backend API. Simplifies loading states, error handling, and data invalidation. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.0.0-alpha.13` | A utility-first CSS framework configured with a "CSS-first" approach. Leverages a custom, token-based design system for consistency. |
| **UI State** | [Zustand](https://zustand-demo.pmnd.rs/) | `4.5.0` | A minimal, hook-based library for managing global client-side UI state (e.g., theme, notifications, loading spinners). |
| **Validation** | [Zod](https://zod.dev/) | `3.23.8` | Provides TypeScript-first schema declaration and validation, used here for form validation. |
| **Icons** | [Lucide React](https://lucide.dev/) | `0.379.0` | A clean and consistent icon toolkit. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.7.2` | Ensures full type safety across the entire application. |
| **Auto-Imports**| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) | `0.17.6` | Reduces boilerplate by automatically importing commonly used hooks and utilities. |

---

## 2. Project Structure Deep Dive

The codebase is organized into a logical and scalable structure. Path aliases (`@/*`) are configured to point to the `src/` directory for clean import paths.

```
frontend/
├── src/
│   ├── api/                      # API communication layer
│   │   ├── apiClient.ts          # Base fetch client with error handling & result unwrapping
│   │   └── itemApi.ts            # Type-safe functions for item CRUD endpoints
│   ├── components/               # React components (UI)
│   ├── hooks/                    # Custom React hooks for reusable logic
│   │   ├── useItemFilters.ts     # Logic for filtering the item tree
│   │   ├── useItemsApi.ts        # TanStack Query hooks for item data
│   │   └── useThemeUpdater.ts    # Applies theme class to the DOM
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
│   ├── utils/                    # Utility functions
│   │   ├── helpers.ts            # General helper functions (e.g., formatDate)
│   │   ├── schema-helpers.ts     # Helpers for working with Zod schemas
│   │   └── slugify.ts            # URL slug generation
│   ├── App.tsx                   # Root application component (contains router outlet)
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global base styles and form element styling
│   ├── router.ts                 # TanStack Router configuration and route tree
│   └── auto-imports.d.ts         # Auto-generated types for unplugin-auto-import
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite build tool configuration
├── tailwind.config.js            # Tailwind CSS configuration (maps to CSS tokens)
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Project dependencies and scripts
```

---

## 3. Modernist Design System

The application's visual identity is governed by a comprehensive, three-tier design system defined in `src/styles/main.css`. It is built on modern CSS principles for maximum flexibility, consistency, and performance.

**Core Principles:**
*   **CSS-First Configuration**: Uses Tailwind v4's `@theme` directive, making the CSS file the single source of truth for design tokens.
*   **Fluid Responsiveness**: Employs `clamp()` for typography and spacing, creating a seamless, fluid layout that adapts to any container size without manual breakpoints.
*   **Semantic Tokenization**: Enforces the use of meaningful tokens (e.g., `--color-surface`, `--card-padding`) instead of hardcoded values, ensuring consistency and easy theming.

### 3.1. Color System (OKLCH)

The design system utilizes the **OKLCH color model**, which offers significant advantages over traditional RGB/HSL:
*   **Perceptual Uniformity**: Changes in lightness or chroma values correspond directly to how humans perceive color, making it easier to create harmonious and accessible color palettes.
*   **Wider Gamut**: Supports modern screen capabilities (like Display P3), providing access to more vibrant colors.
*   **Intuitive Manipulation**: Creating shades and tints is as simple as adjusting the lightness (`L`) channel without affecting the perceived hue.

**Token Tiers:**
1.  **Primitive Tokens**: Raw OKLCH color values (e.g., `--color-gray-950`, `--color-blue-600`).
2.  **Semantic Tokens**: Context-aware aliases that map to primitive tokens. These are the primary tokens for development (e.g., `--color-background`, `--color-text-primary`, `--color-border`).
3.  **Component Tokens**: Scoped to specific UI elements for consistency (e.g., `--button-radius`, `--input-padding-x`).

### 3.2. Developer Usage Guide

**It is critical to use the provided semantic utility classes instead of raw Tailwind utilities.** This maintains the integrity of the design system and ensures consistency across themes.

| ✅ **CORRECT (Use Semantic Tokens)** | ❌ **INCORRECT (Avoid Raw Values)** |
| :--- | :--- |
| `<div class="bg-surface text-text-primary p-card rounded-card">` | `<div class="p-4 text-gray-900 rounded-lg bg-gray-50">` |
| `<button class="bg-primary hover:bg-primary-hover">` | `<button class="bg-blue-600 hover:bg-blue-700">` |
| `<h1 class="text-size-xl">Heading</h1>` | `<h1 class="text-2xl">Heading</h1>` |

**Key Custom Utilities (Defined in `main.css`):**
*   **Text Sizes**: `.text-size-xs` through `.text-size-xl`.
*   **Tags/Badges**: `.tag-sm` for consistent padding and font size.
*   **Buttons**: `.btn-sm`, `.btn-md`, etc., for consistent sizing.
*   **Performance**: `.contain-strict` and `.item-list` for CSS containment and `content-visibility`.
*   **Responsiveness**: `.container-aware` and `.grid-auto-items` for container query-based layouts.

---

## 4. State & Data Management

The application separates state into two categories: **Server State** (data from the API) and **Client State** (UI-specific data).

### 4.1. Server State (TanStack Query)

All interactions with the backend API are managed by TanStack Query, which provides caching, automatic refetching, and mutation management out of the box.

*   **Custom Hooks**: All query and mutation logic is encapsulated in custom hooks within `src/hooks/useItemsApi.ts`. This provides a clean, reusable API for components.
*   **Query Keys**: A structured keying system (`itemKeys` in `useItemsApi.ts`) is used to manage cache invalidation effectively.
*   **Mutations**: `useAddItem`, `useUpdateItem`, and `useDeleteItem` hooks handle creating, updating, and deleting data. They automatically show notifications and invalidate the relevant queries (`itemKeys.tree()`) upon success to keep the UI in sync.

### 4.2. Client State (Zustand)

Global UI state is managed by a lightweight Zustand store. This approach avoids prop-drilling and unnecessary re-renders.

*   **`useUiStore`**: Manages global loading indicators, toast notifications, and the current theme (`light`/`dark`/`system`). The theme state is persisted to `localStorage`.
*   **`useItemStore`**: Currently a placeholder, designed to hold any complex, client-only state related to items in the future (e.g., multi-step filtering UIs).

---

## 5. Routing (TanStack Router)

The application uses TanStack Router for type-safe, modern routing. The entire route configuration is defined in `src/router.ts`.

**Key Features:**
*   **Type Safety**: Routes, links, and parameters are fully type-safe, preventing common routing errors at compile time.
*   **Loaders**: The `loader` function on each route definition pre-fetches data using `queryClient.ensureQueryData`. This ensures that data is available before the route component renders, simplifying loading state management within components.
*   **Path Parameters**: The `/items/$categorySlug/$itemSlug` route demonstrates type-safe parameter access, which is passed directly to its loader function.
*   **Centralized Configuration**: The entire route tree is defined declaratively, providing a clear overview of the application's structure.

**Defined Routes:**
*   `/`: Main items page, loads the entire item tree.
*   `/about`: Static "About" page.
*   `/items/:categorySlug/:itemSlug`: Detail view for a single item, loads only that specific item's data.

---

## 6. API Integration

Communication with the backend REST API is handled by a robust, type-safe client.

*   **Base Client (`apiClient.ts`)**:
    *   Provides `get`, `post`, `patch`, and `del` functions.
    *   Wraps the native `fetch` API.
    *   Standardizes requests and responses.
    *   Features a `Result` type wrapper and an `unwrapResult` function to centralize error handling. API errors are thrown and caught by TanStack Query's `onError` handlers, which then trigger UI notifications.
*   **Endpoints (`itemApi.ts`)**:
    *   Defines a function for each API endpoint (e.g., `getItemTree`, `createItem`).
    *   Uses TypeScript interfaces (`CreateItemPayload`, `UpdateItemPayload`) to ensure all data sent to the API is correctly shaped.

---

## 7. Development & Operations

### 7.1. Prerequisites

*   Node.js `v18.0` or higher.
*   A running instance of the backend API (defaults to `http://localhost:3000`).

### 7.2. Getting Started

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:** Create a `.env` file in the `frontend` root and add the API URL:
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```    The application will be accessible at `http://localhost:5173`.

### 7.3. Available Scripts

*   `npm run dev`: Starts the Vite development server with HMR.
*   `npm run build`: Type-checks and builds the application for production in the `dist/` directory.
*   `npm run preview`: Serves the production build locally for testing.
*   `npm run type-check`: Runs the TypeScript compiler to check for type errors without generating output.