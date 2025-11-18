# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** wto, 18 lis 2025, 22:26:18 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn/frontend

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## `gen.sh`
```
#!/bin/bash
# setup-react-project.sh
set -e

echo "\U0001f680 Creating React project structure in current directory..."

# Create directory structure
mkdir -p src/{components/{common,items,layout},stores,hooks,api,types,utils,pages}
mkdir -p public

# Create main files
touch src/{main.tsx,App.tsx,index.css}
touch src/types/index.ts
touch src/utils/{helpers.ts,slugify.ts,schema-helpers.ts}
touch src/api/{apiClient.ts,itemApi.ts}
touch src/stores/{useItemStore.ts,useUiStore.ts}
touch src/hooks/useItemFilters.ts
touch src/pages/ItemPage.tsx

# Create component files
touch src/components/common/{Button.tsx,Icon.tsx,Modal.tsx,FormField.tsx,TagInput.tsx,SchemaForm.tsx,SchemaField.tsx,ConfirmDeleteModal.tsx,Notifications.tsx}
touch src/components/items/{ItemForm.tsx,ItemItem.tsx}
touch src/components/layout/{AppSidebar.tsx,FilterBar.tsx}

# Create config files
touch {vite.config.ts,tsconfig.json,tsconfig.node.json,tailwind.config.js}
touch index.html

# Create package.json
cat > package.json << 'EOF'
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.379.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "unplugin-auto-import": "^0.17.6"
  }
}
EOF

echo "\u2705 Project structure created successfully!"
echo ""
echo "\U0001f4c1 Created directory structure:"
echo "\u251c\u2500\u2500 src/"
echo "\u2502   \u251c\u2500\u2500 components/"
echo "\u2502   \u2502   \u251c\u2500\u2500 common/"
echo "\u2502   \u2502   \u251c\u2500\u2500 items/"
echo "\u2502   \u2502   \u2514\u2500\u2500 layout/"
echo "\u2502   \u251c\u2500\u2500 stores/"
echo "\u2502   \u251c\u2500\u2500 hooks/"
echo "\u2502   \u251c\u2500\u2500 api/"
echo "\u2502   \u251c\u2500\u2500 types/"
echo "\u2502   \u251c\u2500\u2500 utils/"
echo "\u2502   \u2514\u2500\u2500 pages/"
echo "\u251c\u2500\u2500 public/"
echo "\u2514\u2500\u2500 config files (package.json, vite.config.ts, etc.)"
echo ""
echo "\U0001f3af Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"
```

## `tsconfig.json`
```
{
  "compilerOptions": {


    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/lib/*": ["src/lib/*"] 
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/auto-imports.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

## `package.json`
```
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
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@tanstack/react-form": "^1.25.0",
    "@tanstack/react-query": "^5.90.9",
    "@tanstack/react-router": "^1.136.6",
    "@tanstack/zod-form-adapter": "^0.42.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.554.0",
    "next-themes": "^0.4.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.66.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.1.12",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "@tanstack/react-query-devtools": "^5.90.2",
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

## `README.md`
```
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
```

## `tsconfig.node.json`
```
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## `vite.config.ts`
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],
      imports: [
        'react',
        {
          '@tanstack/react-query': ['useQuery', 'useMutation', 'useQueryClient'],
          '@tanstack/react-router': ['useRoute', 'Link'],
          '@tanstack/react-form': ['useForm'],
          'zustand': [['default', 'create']],
          'zustand/middleware': ['devtools', 'persist'],
          'clsx': [['default', 'clsx']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/hooks/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
      vueTemplate: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
          'vendor': ['react', 'react-dom', 'zustand'],
          'icons': ['lucide-react'],
        }
      }
    }
  }
});

```

## `src/lib/utils.ts`
```
import { clsx, type ClassValue } from "clsx"
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

## `src/stores/useItemStore.ts`
```
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

## `src/stores/useUiStore.ts`
```
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from "sonner";
import type { NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  theme: Theme;

  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string) => void;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as Theme;
    }
  }
  return 'system';
};

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        loadingMessage: null,
        theme: getInitialTheme(),

        setIsLoading: (status: boolean, message?: string) =>
          set({ isLoading: status, loadingMessage: message || null }),

        showNotification: (type: NotificationType, message: string) => {
          switch (type) {
            case 'success': toast.success(message); break;
            case 'error': toast.error(message); break;
            case 'warning': toast.warning(message); break;
            case 'info': toast.info(message); break;
            default: toast(message);
          }
        },

        setTheme: (newTheme: Theme) => set({ theme: newTheme }),

        toggleTheme: () => {
          const current = get().theme;
          const newTheme = current === 'dark' ? 'light' : 'dark';
          set({ theme: newTheme });
        },
      }),
      { name: 'ui-store' }
    ),
    { name: 'ui-store' }
  )
);

```

## `src/styles/main.css`
```
/*
 * MODERNIST DESIGN SYSTEM - Tailwind v4 CSS-First for Todo App
 * Clean, minimal, functional - inspired by Bauhaus & Swiss typography
 * Optimized for React with fluid responsiveness, vertical rhythm, proportions
 */
/*
 ---break---
 */
@plugin "tailwindcss-animate";

@config "../../tailwind.config.js";

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

## `src/hooks/useItemFilters.ts`
```
import { useMemo } from 'react';
import type { Item, Priority } from '@/types';

export interface ItemTree {
  [categorySlug: string]: Item[];
}

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: ItemTree, filters: FilterOptions) {
  const { searchQuery, selectedPriority, showCompleted, selectedTags } = filters;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(itemTree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [itemTree]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           selectedPriority !== 'all' ||
           !showCompleted ||
           selectedTags.length > 0;
  }, [searchQuery, selectedPriority, showCompleted, selectedTags]);

  const filteredItemTree = useMemo(() => {
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(itemTree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Priority filter
        if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
          return false;
        }

        // Completion status filter
        if (!showCompleted && item.isCompleted) {
          return false;
        }

        // Tag filter
        if (selectedTags.length > 0) {
          const hasSelectedTag = selectedTags.some(tag => 
            item.tags?.includes(tag)
          );
          if (!hasSelectedTag) return false;
        }

        return true;
      });
      
      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });
    
    return filtered;
  }, [itemTree, searchQuery, selectedPriority, showCompleted, selectedTags]);

  const totalItems = useMemo(() => {
    return Object.values(itemTree).reduce((total, items) => total + items.length, 0);
  }, [itemTree]);

  const totalFilteredItems = useMemo(() => {
    return Object.values(filteredItemTree).reduce((total, items) => total + items.length, 0);
  }, [filteredItemTree]);

  return {
    allTags,
    hasActiveFilters,
    filteredItemTree,
    totalItems,
    totalFilteredItems,
  };
}
```

## `src/hooks/useThemeUpdater.ts`
```
import { useUiStore } from '@/stores/useUiStore';
import { useEffect } from 'react';

/**
 * A hook that listens to the theme state in the UI store and applies
 * the corresponding 'dark' class to the root <html> element.
 */
export function useThemeUpdater() {
  const theme = useUiStore(state => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  }, [theme]);
}
```

## `src/hooks/useItemsApi.ts`
```
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

## `src/router.ts`
```
import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
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
    loader: ({ params }: { params: { categorySlug: string; itemSlug: string } }) => {
        const { categorySlug, itemSlug } = params;
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
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

## `src/types/index.ts`
```
import type { LucideIcon } from 'lucide-react';

export type IconName = LucideIcon | string;
export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T> = [T];

export interface Item {
  id: string;
  slug: string;
  name: string;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  tags: string[];
  categories: SingleCategory<string>;
  createdAt: string;
  updatedAt: string;
  isEditing?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: number;
}
```

## `src/index.css`
```
@import "./styles/main.css";

@layer base {
  :root {
    --background: var(--color-background);
    --foreground: var(--color-text-primary);
    --card: var(--color-surface);
    --card-foreground: var(--color-text-primary);
    --popover: var(--color-surface);
    --popover-foreground: var(--color-text-primary);
    --primary: var(--color-primary);
    --primary-foreground: var(--color-text-inverse);
    --secondary: var(--color-gray-200);
    --secondary-foreground: var(--color-text-primary);
    --muted: var(--color-text-muted);
    --muted-foreground: var(--color-text-secondary);
    --accent: var(--color-primary-light);
    --accent-foreground: var(--color-primary);
    --destructive: var(--color-danger);
    --destructive-foreground: var(--color-text-inverse);
    --border: var(--color-border);
    --input: var(--color-border);
    --ring: var(--color-border-focus);
    --radius: 0.375rem; /* Corresponds to your --radius-lg */
  }

  .dark {
    --background: var(--color-background);
    --foreground: var(--color-text-primary);
    --card: var(--color-surface);
    --card-foreground: var(--color-text-primary);
    --popover: var(--color-surface);
    --popover-foreground: var(--color-text-primary);
    --primary: var(--color-primary);
    --primary-foreground: var(--color-text-inverse);
    --secondary: var(--color-gray-800);
    --secondary-foreground: var(--color-text-primary);
    --muted: var(--color-text-muted);
    --muted-foreground: var(--color-text-secondary);
    --accent: var(--color-primary-light);
    --accent-foreground: var(--color-primary);
    --destructive: var(--color-danger);
    --destructive-foreground: var(--color-text-inverse);
    --border: var(--color-border);
    --input: var(--color-input-border, var(--color-gray-600));
    --ring: var(--color-border-focus);
  }

  /* Keep original base styles */
  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }
  
  /* ... rest of your original styles from index.css ... */
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

## `src/api/itemApi.ts`
```
import { get, post, patch, del } from './apiClient';
import type { Item, Priority, SingleCategory } from '@/types';

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
    isCompleted?: boolean;
    categories?: SingleCategory<string>;
};

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload
): Promise<Item> {
  return patch<Item, UpdateItemPayload>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}
```

## `src/api/apiClient.ts`
```
const API_URL_BASE = 'http://localhost:3000/api';

type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export const createApiError = (
  message: string, 
  statusCode: number = 500, 
  details?: any
): ApiErrorData => ({
  message,
  statusCode,
  details,
});

export const isApiError = (error: any): error is ApiErrorData => {
  return error && typeof error.message === 'string' && typeof error.statusCode === 'number';
};

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      
      return failure(createApiError(message, response.status));
    }

    const data = await response.json();
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    return failure(createApiError(
      error.message || 'Network request failed',
      503
    ));
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

## `tailwind.config.js`
```
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic token mappings
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-active': 'var(--color-surface-active)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-light': 'var(--color-primary-light)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        danger: 'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
        'danger-hover': 'var(--color-red-700)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'border-focus': 'var(--color-border-focus)',
        backdrop: 'var(--color-backdrop)',
        'modal-bg': 'var(--color-modal-bg)',
        'modal-border': 'var(--color-modal-border)',
      },
      spacing: {
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card': 'var(--card-padding)',
        'nav': 'var(--nav-padding)',
      },
      width: {
        // 'checkbox' and 'radio' removed
      },
      height: {
        // 'checkbox' and 'radio' removed
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'button': 'var(--button-radius)',
        'card': 'var(--card-radius)',
        'input': 'var(--input-radius)',
        'checkbox': 'var(--checkbox-radius)',
      },
      fontWeight: {
        button: 'var(--button-font-weight)',
      },
      gap: {
        'component': 'var(--gap-component-internal)',
        'grid': 'var(--gap-grid-items)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

```

## `components.json`
```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/main.css",
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
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

