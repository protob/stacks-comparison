# (Technical Documentation) Items App - Next.js Frontend

**This document serves as a detailed technical guide for developers  interacting with the `crud-app-sqlite-tanstack-shadcn-next` codebase. It documents the architecture of the application port from Vite/React to Next.js 16 App Router.**

---

## 1. Core Architecture & Tech Stack

This is a modern, client-side rendered (SPA-style) application built on Next.js 16. It retains the interactive characteristics of the original React application while leveraging the Next.js App Router architecture for routing and layout management.

| Category | Technology | Version | Purpose & Key Features |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.0.3` | React framework using the App Router. Configured primarily for Client Components (`use client`) to emulate SPA behavior. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Ensures full type safety across the entire application. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.0.0` | Utility-first CSS framework using the modern v4 engine and CSS-first configuration (`@theme`). |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | `5.90.10` | Manages server state (REST API sync), caching, and optimistic updates on the client side. |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) | N/A | A collection of accessible, unstyled components (Radix UI) integrated with the custom design system. |
| **Form Management**| [TanStack Form](https://tanstack.com/form) | `1.25.0` | Headless, type-safe form state management. |
| **Validation** | [Zod](https://zod.dev/) | `4.1.12` | Schema declaration and validation for forms and API types. |
| **UI State** | [Zustand](https://zustand-demo.pmnd.rs/) | `5.0.8` | Global client-side state management (Filters, UI notifications, Theme). |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | `2.0.7` | High-performance toast notification library. |
| **Icons** | [Lucide React](https://lucide.dev/) | `0.554.0` | Consistent icon toolkit. |

---

## 2. Project Structure Deep Dive

The codebase follows the Next.js App Router conventions, with source code located in the root (no `src` directory).

```
/
├── app/                          # Next.js App Router Directory
│   ├── items/
│   │   └── [categorySlug]/
│   │       └── [itemSlug]/       # Dynamic Route: Item Detail
│   │           └── page.tsx
│   ├── about/
│   │   └── page.tsx              # Static Route: About Page
│   ├── globals.css               # Global styles & Tailwind v4 Configuration
│   ├── layout.tsx                # Root Layout (Sidebar + TopBar + Providers)
│   └── page.tsx                  # Root Route: Main Dashboard
├── components/                   # React Components
│   ├── items/                    # Feature-specific components (Forms, List Items)
│   ├── layout/                   # Layout components (AppSidebar, TopBar)
│   ├── ui/                       # Shadcn/UI reusable primitives
│   └── providers.tsx             # Client-side context providers (QueryClient, Theme)
├── hooks/                        # Custom React Hooks
│   ├── useItemFilters.ts         # Client-side filtering logic
│   └── useItemsApi.ts            # TanStack Query wrappers for API calls
├── lib/
│   ├── api/                      # API Communication Layer
│   │   ├── apiClient.ts          # Fetch wrapper with error handling
│   │   └── itemApi.ts            # Endpoint definitions
│   └── utils.ts                  # Style utility (cn)
├── schemas/                      # Zod schemas for validation
├── stores/                       # Zustand Stores
│   ├── useFilterStore.ts         # Global search and tag state
│   └── useUiStore.ts             # Toast and loading state
├── types/                        # TypeScript interfaces
└── utils/                        # Helper functions (slugify, formatting)
```

---

## 3. Modernist Design System & Tailwind v4

The application implements a robust design system using **Tailwind CSS v4**. Unlike v3, this configuration relies heavily on native CSS variables and the `@theme` directive within `app/globals.css`.

**Key Characteristics:**
*   **OKLCH Colors:** All colors are defined using the OKLCH color space for superior vibrancy and accessibility.
*   **CSS-First Configuration:** Design tokens (colors, radius, spacing) are defined in CSS variables inside `@theme inline { ... }` or `:root`, rather than `tailwind.config.js`.
*   **Shadcn Adapter:** The `app/globals.css` file maps the custom "Modernist" design tokens to the semantic variables required by Shadcn/UI (e.g., mapping `--color-gray-50` to `--background`).

**Usage:**
Developers should use semantic utility classes (e.g., `bg-card`, `text-muted-foreground`) to ensure consistency and proper dark mode support.

---

## 4. State & Data Management

State is strictly divided between Server State (API data) and Client State (UI/Filters).

### 4.1. Server State (TanStack Query)
Even though this is Next.js, data fetching is handled **client-side** to maintain the SPA experience of the original app.
*   **Hooks:** Logic is centralized in `hooks/useItemsApi.ts` (`useItems`, `useAddItem`, `useUpdateItem`, `useDeleteItem`).
*   **Caching:** The `QueryClient` is instantiated in `components/providers.tsx` with a default stale time.
*   **Invalidation:** Mutations automatically invalidate relevant query keys (`['items', 'list']` or `['items', 'detail']`) to refresh the UI.

### 4.2. Client State (Zustand)
Zustand is used for global UI state that needs to be accessed across the Layout and Pages.
*   **`useFilterStore`**: Manages the Search Query and Selected Tags. This allows the `AppSidebar` (where the inputs are) to control the list displayed in `app/page.tsx`.
*   **`useUiStore`**: A wrapper around `Sonner` toasts to provide a consistent interface for success/error notifications.

---

## 5. Routing (Next.js App Router)

The application uses file-system based routing in the `app/` directory.

*   **`layout.tsx`**: The root layout wraps the application in `Providers` and establishes the persistent shell:
    *   **Sidebar (Left)**: Contains global search, tags, and navigation.
    *   **TopBar (Top)**: Contains breadcrumbs (placeholder) and secondary navigation.
    *   **Main**: The scrollable content area.
*   **`/` (Dashboard)**: The main view. It subscribes to `useFilterStore` to filter the Item Tree fetched via React Query.
*   **`/items/[categorySlug]/[itemSlug]`**: A dynamic route for viewing/editing specific items. It reads parameters from the URL to fetch specific data.

---

## 6. API Integration

The frontend communicates with an external backend (running on port 3000) via a typed API layer in `lib/api/`.

*   **`apiClient.ts`**: A generic fetch wrapper that handles:
    *   JSON serialization/deserialization.
    *   Standardized error handling (wrapping non-200 responses).
    *   Result type wrapping (`{ success: true, data: T }`).
*   **`itemApi.ts`**: Contains specific functions for the domain:
    *   `getItemTree()`: Fetches items grouped by category.
    *   `createItem`, `updateItem`, `deleteItem`: Handle CRUD operations using the specific payload types defined in TypeScript interfaces.

---

## 7. Development & Operations

### 7.1. Prerequisites
*   Bun runtime (or Node.js).
*   The backend API running at `http://localhost:3000`.

### 7.2. Getting Started

1.  **Install Dependencies:**
    ```bash
    bun install
    ```

2.  **Run Development Server:**
    ```bash
    bun dev
    ```
    The app will launch at `http://localhost:3001` (or 3000 if the backend is elsewhere, check Next.js console output).

3.  **Build for Production:**
    ```bash
    bun run build
    bun start
    ```

### 7.3. Linting
The project uses ESLint with Next.js web vitals config:
```bash
bun run lint
```