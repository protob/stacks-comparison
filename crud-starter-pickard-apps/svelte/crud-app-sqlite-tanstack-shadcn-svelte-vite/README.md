# Internal Documentation: Items App (Svelte 5 Port)
**Target Environment:** Svelte 5 + Vite + Tailwind v4 + TanStack Query
## 1. Core Architecture & Tech Stack

This is a direct port of the reference Vue application to **Svelte 5**, utilizing the new Runes system (`$state`, `$derived`, `$props`) for reactivity. It avoids SvelteKit's meta-framework features (like file-based routing or SSR) in favor of a pure client-side SPA (Single Page Application) approach, mimicking the reference architecture.

| Category | Technology | Version | Purpose & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Framework** | [Svelte 5](https://svelte.dev/) | `^5.43.5` | UI logic using Runes. Components are compiled, not interpreted. |
| **Build Tool** | [Vite](https://vitejs.dev/) | `^6.0.0` | Dev server and bundler. configured with `@sveltejs/vite-plugin-svelte`. |
| **Routing** | **Custom Router** | N/A | A bespoke client-side router (`src/lib/router/`) that mimics basic Vue Router behavior without SvelteKit. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query/latest) | `^5.0.0` | **Server State**. Handles caching, invalidation, and API synchronization. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.1.14` | **CSS-First**. Configured via `@theme` in `src/app.css` (no `tailwind.config.js` theme extensions). |
| **UI Components** | [shadcn-svelte](https://www.shadcn-svelte.com/) | N/A | Headless components via `bits-ui`, styled with Tailwind. |
| **State Mgmt** | **Runes (Singleton Class)** | N/A | **Client State**. Replaces Pinia. Implemented as a global reactive class instance (`uiStore.svelte.ts`). |
| **Validation** | [Zod](https://zod.dev/) | `^4.1.0` | Schema definition and form validation logic. |
| **Notifications** | `svelte-sonner` | `^1.0.0` | Toast notifications, integrated via `uiStore`. |
| **Icons** | `lucide-svelte` | `^0.544.0` | SVG icons. **Note:** Must be imported as components (e.g., `import { Plus } from 'lucide-svelte'`). |
| **HTTP Client** | `ofetch` | `^1.5.0` | Type-safe fetch wrapper. |

---

## 2. Project Structure Deep Dive

The structure mirrors the Vue reference but adapts to Svelte's module resolution (`$lib` alias).

```
svelte-app/
├── src/
│   ├── lib/                      # Aliased as $lib
│   │   ├── api/                  # API Layer
│   │   │   ├── apiClient.ts      # 'ofetch' wrapper with error handling & type unwrapping
│   │   │   ├── itemApi.ts        # Endpoint definitions
│   │   │   └── itemsQuery.ts     # TanStack Query hooks (useItemTree, useAddItem, etc.)
│   │   ├── components/           # UI Components
│   │   │   ├── items/            # Domain-specific (ItemForm.svelte, ItemItem.svelte)
│   │   │   ├── layout/           # Layouts (AppSidebar.svelte, TopBar.svelte)
│   │   │   └── ui/               # Shadcn primitives (Button, Dialog, etc.)
│   │   ├── pages/                # Route Views
│   │   │   ├── AboutPage.svelte
│   │   │   ├── ItemDetailPage.svelte
│   │   │   └── ItemPage.svelte   # Home/Index view
│   │   ├── router/               # Custom Routing Logic
│   │   │   ├── Router.svelte     # The outlet component (switches views based on state)
│   │   │   └── router.ts         # Route resolution logic and navigation function
│   │   ├── schemas/              # Zod Schemas
│   │   │   └── itemSchema.ts
│   │   ├── stores/               # Global Client State
│   │   │   └── uiStore.svelte.ts # Svelte 5 Reactive Class (The "Pinia" replacement)
│   │   ├── types/                # TypeScript Interfaces
│   │   │   └── index.ts
│   │   └── utils/                # Helpers
│   │       ├── helpers.ts        # Formatting utils
│   │       ├── themeUpdater.svelte.ts # Dark mode logic
│   │       └── useItemFilters.ts # Filter logic (Framework-agnostic logic)
│   ├── App.svelte                # Root Component (Providers + Router)
│   ├── main.ts                   # Entry Point (Mounts App)
│   └── app.css                   # Global Styles & Tailwind v4 Configuration
├── components.json               # Shadcn configuration
├── index.html                    # HTML Entry
├── vite.config.ts                # Vite Config (Path aliases defined here)
└── package.json
```

---

## 3. Design System & Styling (Tailwind v4)

This project uses **Tailwind CSS v4**, which differs significantly from v3.

1.  **Configuration:** There is no `tailwind.config.js` theme block. All design tokens are defined in `src/app.css` using the `@theme` directive.
2.  **CSS Variables:** The app uses OKLCH color spaces for `shadcn` variables (e.g., `--background`, `--foreground`).
3.  **Fluid Typography:** The `main.css` (imported in `app.css`) defines fluid spacing and font sizes (e.g., `p-fluid-4`, `text-size-xl`).
4.  **Dark Mode:** Implemented via the `.dark` class on the `<html>` element, managed by `themeUpdater.svelte.ts`.

**Usage Rule:** Always use semantic classes (e.g., `bg-surface`, `text-muted-foreground`) derived from the `src/app.css` variables rather than hardcoded colors.

---

## 4. State Management Strategy

### 4.1 Server State (TanStack Query)
*   **Location:** `src/lib/api/itemsQuery.ts`
*   **Pattern:** Custom hook-like functions (`useItemTree`, `useAddItem`) that return query objects.
*   **Reactivity:** Svelte Query stores are reactive. In `.svelte` files, access data via `$query.data`.
*   **Keys:** Managed in `itemKeys` object to ensure consistency for cache invalidation.

### 4.2 Client State (Svelte Runes)
*   **Location:** `src/lib/stores/uiStore.svelte.ts`
*   **Pattern:** Singleton Class.
*   **Implementation:**
    ```typescript
    class UiStore {
      // $state rune creates reactive properties
      isFormOpen = $state(false);
      
      // Methods mutate state directly (proxy-based reactivity)
      toggleForm() { this.isFormOpen = !this.isFormOpen; }
    }
    export const uiStore = new UiStore();
    ```
*   **Usage:** Imported directly in components. No `$` prefix needed to read, but `$derived` or `$effect` is needed to react to changes within components if creating dependent state.

---

## 5. Routing Implementation (Custom)

Since this is **not** SvelteKit, routing is manual.

1.  **State:** `window.location.pathname` is the source of truth.
2.  **Listener:** `src/lib/router/Router.svelte` listens for `popstate` and a custom `app:navigated` event.
3.  **Resolution:** `src/lib/router/router.ts` contains a `resolveRoute` function that parses the URL string and returns a Route object (e.g., `{ name: 'item-detail', categorySlug: '...' }`).
4.  **Navigation:** Do not use `<a>` tags for internal links. Use the `navigate('/path')` function exported from `router.ts` or pass events to the layout.

---

## 6. API Integration Details

*   **Client:** `src/lib/api/apiClient.ts`.
*   **Library:** `ofetch`.
*   **Error Handling:** The client automatically unwraps the `data` property from the API response or throws a structured `ApiErrorData` object.
*   **Base URL:** Hardcoded in `apiClient.ts` as `http://localhost:3000/api`.

**Standard CRUD Flow:**
1.  **Component** calls `useAddItem()`.
2.  **Mutation** triggers `createItem` (in `itemApi.ts`).
3.  **On Success:** The mutation invalidates the `itemKeys.tree()` query key.
4.  **UI Update:** `useItemTree` automatically refetches, updating the list.

---

## 7. Development & Operations

**Note:** Use `bun` for all package management and script execution.

### 7.1 Prerequisites
*   Bun Runtime installed.
*   Backend API running on port 3000.

### 7.2 Setup & Run
1.  **Install Dependencies:**
    ```bash
    bun install
    ```
2.  **Start Dev Server:**
    ```bash
    bun run dev
    ```
    *App runs at: http://localhost:5173*

### 7.3 Common Commands
*   **Add Shadcn Component:**
    ```bash
    bun x shadcn-svelte@next add [component-name]
    # Example: bun x shadcn-svelte@next add button
    ```
*   **Build for Production:**
    ```bash
    bun run build
    ```
*   **Type Check:**
    ```bash
    bun run check
    ```

### 7.4 Troubleshooting
*   **`rune_outside_svelte` Error:** Ensure any file using `$state`, `$derived`, or `$effect` ends in `.svelte.ts` (e.g., stores) or is a `.svelte` component.
*   **Import Errors:** Verify path aliases. `$lib` points to `./src/lib`.
*   **Tailwind styles missing:** Ensure `src/app.css` is imported in `src/main.ts` and the `@theme` directive is present.