#  Documentation: Items App (SvelteKit Port)
**Target Environment:** Svelte 5 + SvelteKit + Tailwind v4 + TanStack Query

## 1. Core Architecture & Tech Stack

This project is a port of the reference application to **SvelteKit**. It leverages SvelteKit's meta-framework capabilities (file-system routing, SSR/CSR negotiation) while maintaining Svelte 5 Runes (`$state`, `$derived`, `$props`) for reactive logic.

| Category | Technology | Version | Purpose & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Framework** | [SvelteKit](https://kit.svelte.dev/) | `^2.47.0` | Meta-framework handling routing, hydration, and build optimization. |
| **UI Engine** | [Svelte 5](https://svelte.dev/) | `^5.41.0` | Component logic using Runes. |
| **Build Tool** | [Vite](https://vitejs.dev/) | `^7.0.0` | Bundler, handled internally by SvelteKit. |
| **Routing** | **File-System** | N/A | Directory-based routing via `src/routes/`. Replaces the manual router. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query/latest) | `^6.0.0` | **Server State**. Client-side fetching strategy enabled in browser environment. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.1.14` | **CSS-First**. Configured via `@theme` in `src/app.css`. |
| **UI Components** | [shadcn-svelte](https://www.shadcn-svelte.com/) | N/A | Headless components via `bits-ui`, styled with Tailwind. |
| **State Mgmt** | **Runes (Singleton)** | N/A | **Client State**. Global reactive class instance (`uiStore.svelte.ts`). |
| **Validation** | [Zod](https://zod.dev/) | `^4.1.0` | Schema definition and form validation logic. |
| **Notifications** | `svelte-sonner` | `^1.0.0` | Toast notifications, integrated via `uiStore`. |
| **HTTP Client** | `ofetch` | `^1.5.0` | Type-safe fetch wrapper used by TanStack Query functions. |

---

## 2. Project Structure Deep Dive

The structure follows SvelteKit conventions. The `src/lib` folder serves as the central alias for shared code, while `src/routes` defines the URL structure.

```text
svelte-kit-app/
├── src/
│   ├── lib/                      # Aliased as $lib
│   │   ├── api/                  # API Layer
│   │   │   ├── apiClient.ts      # 'ofetch' instance (Base URL: localhost:3000)
│   │   │   ├── itemApi.ts        # API Endpoint definitions
│   │   │   └── itemsQuery.ts     # TanStack Query hooks
│   │   ├── components/           # UI Components
│   │   │   ├── items/            # Domain-specific (ItemForm, ItemItem)
│   │   │   ├── layout/           # Layouts (AppSidebar, TopBar, FilterBar)
│   │   │   └── ui/               # Shadcn primitives (Button, Dialog, etc.)
│   │   ├── schemas/              # Zod Schemas
│   │   ├── stores/               # Global Client State
│   │   │   └── uiStore.svelte.ts # Global UI state (Runes-based class)
│   │   ├── types/                # TS Interfaces
│   │   └── utils/                # Helpers (Theme, formatting, filters)
│   ├── routes/                   # SvelteKit File-System Routing
│   │   ├── about/
│   │   │   └── +page.svelte      # /about
│   │   ├── items/
│   │   │   └── [categorySlug]/
│   │   │       └── [itemSlug]/
│   │   │           ├── +page.svelte # /items/:cat/:slug (View)
│   │   │           └── +page.ts     # Parameter extraction (Load function)
│   │   ├── +layout.svelte        # Root Layout (Sidebar, Providers, Toaster)
│   │   └── +page.svelte          # / (Home Dashboard)
│   ├── app.css                   # Tailwind v4 Configuration (@theme)
│   └── app.html                  # HTML Document Shell
├── static/                       # Static assets (favicon)
├── svelte.config.js              # SvelteKit Config
├── vite.config.ts                # Vite Config
└── package.json
```

---

## 3. Design System & Styling (Tailwind v4)

This project uses **Tailwind CSS v4**.

1.  **Configuration:** No `tailwind.config.js` theme extensions. Design tokens are defined in `src/app.css` using the `@theme` directive.
2.  **Dark Mode:** 
    *   Controlled by `src/lib/utils/themeUpdater.svelte.ts`.
    *   Toggles the `.dark` class on the `<html>` element.
    *   Sidebar toggle button interacts with `uiStore`.
3.  **Fluid Typography:** Fluid spacing/font classes (e.g., `p-fluid-6`) are defined in `app.css`.

---

## 4. State Management Strategy

### 4.1 Server State (TanStack Query)
*   **Context:** `QueryClient` is instantiated in `src/routes/+layout.svelte`.
*   **SSR Handling:** The client is configured with `enabled: browser` to prevent data fetching on the server during the initial render (SSR). This ensures data is fetched freshly on the client (CSR) to avoid hydration mismatches with stale server data.
*   **Usage:** Components import "hook-like" functions (e.g., `useItemTree`) from `$lib/api/itemsQuery`.

### 4.2 Client State (Svelte Runes)
*   **Store:** `src/lib/stores/uiStore.svelte.ts`.
*   **Pattern:** Singleton Class with Runes.
*   **SSR Safety:** The store logic includes checks (e.g., `if (!browser) return`) inside methods like `showNotification` to prevents crashes during server-side execution where `window`/`document` are undefined.

---

## 5. Routing Implementation (SvelteKit)

Routing is handled automatically by the file system.

1.  **Root Layout (`src/routes/+layout.svelte`):**
    *   Contains the `AppSidebar`, `TopBar`, and `QueryClientProvider`.
    *   Persists across all page navigations.
    *   Passes the current URL path to `TopBar` via `$page.url.pathname`.
2.  **Dynamic Routes:**
    *   **URL:** `/items/[categorySlug]/[itemSlug]`
    *   **Load Function (`+page.ts`):** Extracts `categorySlug` and `itemSlug` from the URL parameters and passes them as `data` props to the component.
    *   **Component (`+page.svelte`):** Receives `data` props and uses a `$derived` rune to trigger the `useItemDetail` query.

---

## 6. API Integration

*   **Client:** `src/lib/api/apiClient.ts`.
*   **Library:** `ofetch`.
*   **Base URL:** `http://localhost:3000/api` (Hardcoded).
*   **Flow:**
    1.  User acts (e.g., Add Item).
    2.  `useAddItem` mutation is called.
    3.  On success, `queryClient.invalidateQueries` refills the `itemKeys.tree()` cache.
    4.  The Home Page list updates automatically via reactivity.

---

## 7. Development & Operations

**Package Manager:** `npm` (via `sv` CLI structure) or `bun` (compatible).

### 7.1 Prerequisites
*   Node.js or Bun Runtime.
*   Backend API running on port 3000.

### 7.2 Setup & Run
1.  **Install:**
    ```bash
    npm install
    # or
    bun install
    ```
2.  **Dev Server:**
    ```bash
    npm run dev
    # or
    bun run dev
    ```
    *Runs at http://localhost:5173*

### 7.3 Common Commands
*   **Sync SvelteKit Types:**
    ```bash
    npm run prepare
    ```
    *Run this if TypeScript complains about missing `$app/` or `$lib/` imports.*
*   **Build:**
    ```bash
    npm run build
    ```

### 7.4 Troubleshooting
*   **500 Error / `reading 'push'`**: This usually means a Snippet (`{@render ...}`) is being passed incorrectly to a slot, or a layout nesting issue. Ensure `src/routes/+page.svelte` does **not** use `<MainLayout>` (as the root `+layout.svelte` already handles the shell).
*   **Hydration Mismatch**: If the UI flickers or console warns about hydration, check that `localStorage` or `window` access is wrapped in `onMount` or `if (browser)` checks.
