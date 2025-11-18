# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** wto, 18 lis 2025, 19:00:50 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>shadcn-simple-svelte-vite</title>
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
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}

```

## `package.json`
```
{
  "name": "shadcn-simple-svelte-vite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.app.json && tsc -p tsconfig.node.json"
  },
  "devDependencies": {
    "@internationalized/date": "^3.8.1",
    "@lucide/svelte": "^0.544.0",
    "@sveltejs/vite-plugin-svelte": "^6.2.1",
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.19",
    "@tailwindcss/vite": "^4.1.14",
    "@tsconfig/svelte": "^5.0.5",
    "@types/node": "^24.10.0",
    "bits-ui": "^2.11.0",
    "clsx": "^2.1.1",
    "mode-watcher": "^1.1.0",
    "svelte": "^5.43.5",
    "svelte-check": "^4.3.3",
    "tailwind-merge": "^3.3.1",
    "tailwind-variants": "^3.1.1",
    "tailwindcss": "^4.1.14",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "vite": "npm:rolldown-vite@7.2.2"
  },
  "overrides": {
    "vite": "npm:rolldown-vite@7.2.2"
  },
  "dependencies": {
    "@tanstack/svelte-form": "^1.25.0",
    "@tanstack/svelte-query": "^6.0.8",
    "@tanstack/zod-form-adapter": "^0.42.1",
    "ofetch": "^1.5.1",
    "svelte-sonner": "^1.0.6",
    "zod": "^4.1.12"
  }
}

```

## `tsconfig.app.json`
```
{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
      "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    },
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "types": ["svelte", "vite/client"],
    "noEmit": true,
    /**
     * Typecheck JS in `.svelte` and `.js` files by default.
     * Disable checkJs if you'd like to use dynamic types in JS.
     * Note that setting allowJs false does not prevent the use
     * of JS in `.svelte` files.
     */
    "allowJs": true,
    "checkJs": true,
    "moduleDetection": "force"
  },
  "include": ["src/**/*.ts", "src/**/*.js", "src/**/*.svelte", "src/**/*.svelte.ts"]
}

```

## `README.md`
```
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
  "recommendations": ["svelte.svelte-vscode"]
}

```

## `svelte.config.js`
```
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}

```

## `vite.config.ts`
```
import path from "path";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), svelte()], resolve: {
        alias: {
            $lib: path.resolve("./src/lib"),
        },
    },
});

```

## `src/App.svelte`
```
<!-- src/App.svelte -->
<script lang="ts">
  import './app.css';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import { createAppQueryClient } from '$lib/api/itemsQuery';
  import Router from '$lib/router/Router.svelte';
  import { useThemeUpdater } from '$lib/utils/themeUpdater.svelte';

  const queryClient = createAppQueryClient();

  useThemeUpdater();
</script>

<main class="min-h-screen bg-background text-foreground">
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" richColors />
    <Router />
  </QueryClientProvider>
</main>
```

## `src/lib/components/items/ItemItem.svelte`
```
<script lang="ts">
   import { Badge } from '$lib/components/ui/badge';
   import { Button } from '$lib/components/ui/button';
   import { Checkbox } from '$lib/components/ui/checkbox';
   import { useUpdateItem, useDeleteItem } from '$lib/api/itemsQuery';
   import { formatDate } from '$lib/utils/helpers';
   import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
   import type { Item } from '$lib/types';
   import { Pencil, Trash2 } from '@lucide/svelte';
 
   let { item } = $props<{ item: Item }>();
 
   const { mutate: updateItem } = useUpdateItem();
   const { mutate: deleteItem } = useDeleteItem();
 
   function toggleComplete() {
     updateItem({
       id: item.id,
       payload: { isCompleted: !item.isCompleted },
     });
   }
 
   function handleDelete() {
     if (confirm('Are you sure you want to delete this item?')) {
       deleteItem(item.id);
     }
   }
 </script>
 
<div class="flex items-start gap-4 p-4 border rounded-lg bg-card opacity-60" class:opacity-100={!item.isCompleted}>
    <div class="mt-1">
      <Checkbox
        checked={item.isCompleted}
        onchange={toggleComplete}
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
          <h3 
            class="text-lg font-semibold"
            class:line-through={item.isCompleted}
            class:text-muted-foreground={item.isCompleted}
          >
            {item.name}
          </h3>
           <Badge class="tag-priority-{item.priority}" variant="outline">
             {item.priority}
           </Badge>
      </div>
      <p class="mb-3 text-muted-foreground">{item.text}</p>

      <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
          <div class="flex gap-2">
              <Button size="sm" variant="ghost" onclick={() => uiStore.openForm(item)}>
                  <Pencil class="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onclick={handleDelete}>
                  <Trash2 class="w-4 h-4" />
              </Button>
          </div>
      </div>

      <div class="flex gap-2 mt-3">
        {#each item.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
        {/each}
      </div>
    </div>
</div>
```

## `src/lib/components/items/ItemForm.svelte`
```
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  import { useAddItem, useUpdateItem } from '$lib/api/itemsQuery'; // Import update hook
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension

  let { onClose } = $props<{ onClose: () => void }>();

  const { mutate: addItem } = useAddItem();
  const { mutate: updateItem } = useUpdateItem();

  let currentTag = $state('');
  
  // Initialize form data based on uiStore.editingItem
  let formData = $state({
    name: uiStore.editingItem?.name || '',
    text: uiStore.editingItem?.text || '',
    priority: (uiStore.editingItem?.priority || 'mid') as 'low' | 'mid' | 'high',
    tags: uiStore.editingItem?.tags ? [...uiStore.editingItem.tags] : [] as string[],
    categories: [uiStore.preselectedCategory || (uiStore.editingItem?.categories?.[0] ? String(uiStore.editingItem.categories[0]) : 'general')] as [string],
  });

  let errors = $state<Record<string, string>>({});

  function validateForm() {
    errors = {};
    const result = itemFormSchema.safeParse(formData);
    
    if (!result.success) {
      result.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      categories: [formData.categories[0]] as [string] // Ensure tuple type for API
    };

    const onSuccess = () => {
      if (onClose) onClose();
    };

    if (uiStore.editingItem) {
      updateItem({
        id: uiStore.editingItem.id,
        payload: payload
      }, { onSuccess });
    } else {
      addItem(payload, { onSuccess });
    }
  }

  function addTag() {
    const newTag = currentTag.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      formData.tags = [...formData.tags, newTag];
    }
    currentTag = '';
  }

  function removeTag(tagToRemove: string) {
    formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  }
</script>

<Dialog open={true} onOpenChange={(open) => !open && onClose()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{uiStore.editingItem ? 'Edit Task' : 'Add New Task'}</DialogTitle>
    </DialogHeader>
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
      <!-- Name Field -->
      <div>
        <Label for="name">Task Name</Label>
        <Input
          id="name"
          bind:value={formData.name}
          placeholder="e.g., Finalize project report"
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Description Field -->
      <div>
        <Label for="text">Description</Label>
        <Input
          id="text"
          bind:value={formData.text}
          placeholder="Add more details about task..."
        />
        {#if errors.text}
          <p class="mt-1 text-sm text-destructive">{errors.text}</p>
        {/if}
      </div>

      <!-- Category Field -->
      <div>
        <Label for="category">Category</Label>
        <Input
          id="category"
          bind:value={formData.categories[0]}
          placeholder="e.g., Work"
        />
        {#if errors.categories}
          <p class="mt-1 text-sm text-destructive">{errors.categories}</p>
        {/if}
      </div>

      <!-- Priority Field -->
      <div>
        <Label>Priority</Label>
        <RadioGroup
          bind:value={formData.priority}
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

      <!-- Tags Field -->
      <div>
        <Label>Tags</Label>
        <div class="flex items-center gap-2 mt-2">
          <Input
            bind:value={currentTag}
            onkeydown={handleKeydown}
            placeholder="Add a tag..."
          />
          <Button type="button" variant="outline" onclick={addTag}>Add</Button>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each formData.tags as tag (tag)}
            <Badge
              variant="secondary"
              class="cursor-pointer"
              onclick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
        <Button type="submit">{uiStore.editingItem ? 'Update' : 'Create'} Task</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

## `src/lib/components/layout/FilterBar.svelte`
```
<script lang="ts">
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  let { 
    priority = $bindable('all'),
    showCompleted = $bindable(true),
    hasActiveFilters = false,
    allTags = [],
    selectedTags = $bindable([]),
    search = $bindable('')
  } = $props();

  const dispatch = createEventDispatcher();

  function handleClear() {
    dispatch('clear');
  }
</script>

<div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <Label class="block mb-2">Priority</Label>
      <RadioGroup bind:value={priority} class="flex items-center gap-4">
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
          bind:checked={showCompleted}
        />
        <Label for="show-completed">Show Completed</Label>
      </div>
    </div>
  </div>

  {#if hasActiveFilters}
    <Button
      variant="ghost"
      size="sm"
      onclick={handleClear}
      class="mt-4"
    >
      Clear Filters
    </Button>
  {/if}
</div>
```

## `src/lib/components/layout/MainLayout.svelte`
```
<!-- src/lib/components/layout/MainLayout.svelte -->
<script lang="ts">
  import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';

  export let currentPath: string;
  export let onNavigate: (path: string) => void;
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <AppSidebar on:navigate={(e) => onNavigate(e.detail)} />
  <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
    <TopBar currentPath={currentPath} on:navigate={(e) => onNavigate(e.detail)} />
    <slot />
  </div>
</div>
```

## `src/lib/components/layout/AppSidebar.svelte`
```
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
  import { Sun, Moon } from '@lucide/svelte';

  let searchQuery = $state('');
  let allTags = ['project', 'personal', 'work'];
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  }
</script>

<aside class="flex flex-col p-4 border-r bg-surface border-border">
  <div class="p-2 mb-4">
    <h2 class="text-xl font-bold">TodoApp</h2>
  </div>

  <div class="flex-1 space-y-4">
    <!-- Search -->
    <div class="px-2">
      <Input bind:value={searchQuery} placeholder="Search tasks..." />
    </div>

    <Separator />

    <!-- Tags Section -->
    <div class="px-2">
      <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag (tag)}
          <Button
            onclick={() => toggleTag(tag)}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            size="sm"
            class="rounded-full"
          >
            {tag}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Add New Item Button -->
    <div class="px-2 mt-4">
      <Button class="w-full" onclick={() => uiStore.openForm()}>
        + Add Item
      </Button>
    </div>
  </div>

  <!-- Footer / Theme Toggle -->
  <div class="mt-auto">
    <Button variant="ghost" onclick={() => uiStore.toggleTheme()} class="justify-start w-full">
      {#if uiStore.theme !== 'dark'}
        <Sun class="w-4 h-4" />
      {:else}
        <Moon class="w-4 h-4" />
      {/if}
    </Button>
  </div>
</aside>
```

## `src/lib/components/layout/TopBar.svelte`
```
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let currentPath: string;

  const dispatch = createEventDispatcher<{ navigate: string }>();

  function navigate(path: string) {
    // Dispatch navigate event to parent
    dispatch('navigate', path);
  }
</script>

<header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
  <nav class="flex items-center gap-4">
    <button 
      onclick={() => navigate('/')}
      class={currentPath === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      Home
    </button>
    <button 
      onclick={() => navigate('/about')}
      class={currentPath === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      About
    </button>
  </nav>
</header>
```

## `src/lib/components/ui/button/button.svelte`
```
<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
				outline:
					"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

```

## `src/lib/components/ui/button/Button.svelte`
```
<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { ButtonHTMLAttributes } from "svelte/elements";
  import { cva, type VariantProps } from "class-variance-authority";

  const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

  type Props = ButtonHTMLAttributes & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
  };

  export let variant: Props["variant"] = "default";
  export let size: Props["size"] = "default";
  let className: Props["class"] = undefined;
  let restProps: $restProps;

  $: buttonClass = cn(buttonVariants({ variant, size, className }));
</script>

<button
  class={buttonClass}
  {...restProps}
  on:click
  on:keydown
  on:keyup
  on:focus
  on:blur
  on:mouseenter
  on:mouseleave
  on:paste
>
  <slot />
</button>
```

## `src/lib/components/ui/button/index.ts`
```
import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button.svelte";

export {
	Root,
	type ButtonProps as Props,
	//
	Root as Button,
	buttonVariants,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
};

```

## `src/lib/components/ui/checkbox/index.ts`
```
import Root from "./checkbox.svelte";
export {
	Root,
	//
	Root as Checkbox,
};

```

## `src/lib/components/ui/checkbox/checkbox.svelte`
```
<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from "@lucide/svelte/icons/check";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		"border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div data-slot="checkbox-indicator" class="text-current transition-none">
			{#if checked}
				<CheckIcon class="size-3.5" />
			{:else if indeterminate}
				<MinusIcon class="size-3.5" />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>

```

## `src/lib/components/ui/label/label.svelte`
```
<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
	data-slot="label"
	class={cn(
		"flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/label/index.ts`
```
import Root from "./label.svelte";

export {
	Root,
	//
	Root as Label,
};

```

## `src/lib/components/ui/input/input.svelte`
```
<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
			"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}

```

## `src/lib/components/ui/input/index.ts`
```
import Root from "./input.svelte";

export {
	Root,
	//
	Root as Input,
};

```

## `src/lib/components/ui/alert-dialog/alert-dialog-footer.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert-dialog-footer"
	class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-title.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.TitleProps = $props();
</script>

<AlertDialogPrimitive.Title
	bind:ref
	data-slot="alert-dialog-title"
	class={cn("text-lg font-semibold", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-action.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.ActionProps = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn(buttonVariants(), className)}
	{...restProps}
/>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-description.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.DescriptionProps = $props();
</script>

<AlertDialogPrimitive.Description
	bind:ref
	data-slot="alert-dialog-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-overlay.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.OverlayProps = $props();
</script>

<AlertDialogPrimitive.Overlay
	bind:ref
	data-slot="alert-dialog-overlay"
	class={cn(
		"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-header.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert-dialog-header"
	class={cn("flex flex-col gap-2 text-center sm:text-left", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/alert-dialog/alert-dialog-trigger.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: AlertDialogPrimitive.TriggerProps = $props();
</script>

<AlertDialogPrimitive.Trigger bind:ref data-slot="alert-dialog-trigger" {...restProps} />

```

## `src/lib/components/ui/alert-dialog/alert-dialog-content.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import AlertDialogOverlay from "./alert-dialog-overlay.svelte";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		...restProps
	}: WithoutChild<AlertDialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<AlertDialogPrimitive.PortalProps>;
	} = $props();
</script>

<AlertDialogPrimitive.Portal {...portalProps}>
	<AlertDialogOverlay />
	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-content"
		class={cn(
			"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
			className
		)}
		{...restProps}
	/>
</AlertDialogPrimitive.Portal>

```

## `src/lib/components/ui/alert-dialog/index.ts`
```
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import Trigger from "./alert-dialog-trigger.svelte";
import Title from "./alert-dialog-title.svelte";
import Action from "./alert-dialog-action.svelte";
import Cancel from "./alert-dialog-cancel.svelte";
import Footer from "./alert-dialog-footer.svelte";
import Header from "./alert-dialog-header.svelte";
import Overlay from "./alert-dialog-overlay.svelte";
import Content from "./alert-dialog-content.svelte";
import Description from "./alert-dialog-description.svelte";

const Root = AlertDialogPrimitive.Root;
const Portal = AlertDialogPrimitive.Portal;

export {
	Root,
	Title,
	Action,
	Cancel,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	//
	Root as AlertDialog,
	Title as AlertDialogTitle,
	Action as AlertDialogAction,
	Cancel as AlertDialogCancel,
	Portal as AlertDialogPortal,
	Footer as AlertDialogFooter,
	Header as AlertDialogHeader,
	Trigger as AlertDialogTrigger,
	Overlay as AlertDialogOverlay,
	Content as AlertDialogContent,
	Description as AlertDialogDescription,
};

```

## `src/lib/components/ui/alert-dialog/alert-dialog-cancel.svelte`
```
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.CancelProps = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-cancel"
	class={cn(buttonVariants({ variant: "outline" }), className)}
	{...restProps}
/>

```

## `src/lib/components/ui/sonner/index.ts`
```
export { default as Toaster } from "./sonner.svelte";

```

## `src/lib/components/ui/sonner/sonner.svelte`
```
<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
/>

```

## `src/lib/components/ui/select/select-group.svelte`
```
<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: SelectPrimitive.GroupProps = $props();
</script>

<SelectPrimitive.Group data-slot="select-group" {...restProps} />

```

## `src/lib/components/ui/select/select-scroll-down-button.svelte`
```
<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	data-slot="select-scroll-down-button"
	class={cn("flex cursor-default items-center justify-center py-1", className)}
	{...restProps}
>
	<ChevronDownIcon class="size-4" />
</SelectPrimitive.ScrollDownButton>

```

## `src/lib/components/ui/select/select-scroll-up-button.svelte`
```
<script lang="ts">
	import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("flex cursor-default items-center justify-center py-1", className)}
	{...restProps}
>
	<ChevronUpIcon class="size-4" />
</SelectPrimitive.ScrollUpButton>

```

## `src/lib/components/ui/select/select-group-heading.svelte`
```
<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.GroupHeading> = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	data-slot="select-group-heading"
	class={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>

```

## `src/lib/components/ui/select/select-label.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {} = $props();
</script>

<div
	bind:this={ref}
	data-slot="select-label"
	class={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/select/select-content.svelte`
```
<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import SelectScrollUpButton from "./select-scroll-up-button.svelte";
	import SelectScrollDownButton from "./select-scroll-down-button.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: SelectPrimitive.PortalProps;
	} = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		data-slot="select-content"
		class={cn(
			"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--bits-select-content-available-height) origin-(--bits-select-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
			className
		)}
		{...restProps}
	>
		<SelectScrollUpButton />
		<SelectPrimitive.Viewport
			class={cn(
				"h-(--bits-select-anchor-height) min-w-(--bits-select-anchor-width) w-full scroll-my-1 p-1"
			)}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<SelectScrollDownButton />
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

```

## `src/lib/components/ui/select/select-separator.svelte`
```
<script lang="ts">
	import type { Separator as SeparatorPrimitive } from "bits-ui";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<Separator
	bind:ref
	data-slot="select-separator"
	class={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/select/select-item.svelte`
```
<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={cn(
		"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="absolute right-2 flex size-3.5 items-center justify-center">
			{#if selected}
				<CheckIcon class="size-4" />
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>

```

## `src/lib/components/ui/select/index.ts`
```
import { Select as SelectPrimitive } from "bits-ui";

import Group from "./select-group.svelte";
import Label from "./select-label.svelte";
import Item from "./select-item.svelte";
import Content from "./select-content.svelte";
import Trigger from "./select-trigger.svelte";
import Separator from "./select-separator.svelte";
import ScrollDownButton from "./select-scroll-down-button.svelte";
import ScrollUpButton from "./select-scroll-up-button.svelte";
import GroupHeading from "./select-group-heading.svelte";

const Root = SelectPrimitive.Root;

export {
	Root,
	Group,
	Label,
	Item,
	Content,
	Trigger,
	Separator,
	ScrollDownButton,
	ScrollUpButton,
	GroupHeading,
	//
	Root as Select,
	Group as SelectGroup,
	Label as SelectLabel,
	Item as SelectItem,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator,
	ScrollDownButton as SelectScrollDownButton,
	ScrollUpButton as SelectScrollUpButton,
	GroupHeading as SelectGroupHeading,
};

```

## `src/lib/components/ui/select/select-trigger.svelte`
```
<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		size?: "sm" | "default";
	} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	class={cn(
		"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex w-fit select-none items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronDownIcon class="size-4 opacity-50" />
</SelectPrimitive.Trigger>

```

## `src/lib/components/ui/dialog/dialog-footer.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-footer"
	class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/dialog/dialog-close.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DialogPrimitive.CloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {...restProps} />

```

## `src/lib/components/ui/dialog/dialog-trigger.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DialogPrimitive.TriggerProps = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {...restProps} />

```

## `src/lib/components/ui/dialog/dialog-content.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import XIcon from "@lucide/svelte/icons/x";
	import type { Snippet } from "svelte";
	import * as Dialog from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close
				class="ring-offset-background focus:ring-ring rounded-xs focus:outline-hidden absolute end-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
			>
				<XIcon />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</Dialog.Portal>

```

## `src/lib/components/ui/dialog/dialog-description.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="dialog-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-overlay.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	data-slot="dialog-overlay"
	class={cn(
		"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-title.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={cn("text-lg font-semibold leading-none", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-header.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn("flex flex-col gap-2 text-center sm:text-left", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/dialog/index.ts`
```
import { Dialog as DialogPrimitive } from "bits-ui";

import Title from "./dialog-title.svelte";
import Footer from "./dialog-footer.svelte";
import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
import Description from "./dialog-description.svelte";
import Trigger from "./dialog-trigger.svelte";
import Close from "./dialog-close.svelte";

const Root = DialogPrimitive.Root;
const Portal = DialogPrimitive.Portal;

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription,
	Close as DialogClose,
};

```

## `src/lib/components/ui/radio-group/radio-group.svelte`
```
<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: RadioGroupPrimitive.RootProps = $props();
</script>

<RadioGroupPrimitive.Root
	bind:ref
	bind:value
	data-slot="radio-group"
	class={cn("grid gap-3", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/radio-group/radio-group-item.svelte`
```
<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	class={cn(
		"border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-4 shrink-0 rounded-full border outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div data-slot="radio-group-indicator" class="relative flex items-center justify-center">
			{#if checked}
				<CircleIcon
					class="fill-primary absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
				/>
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>

```

## `src/lib/components/ui/radio-group/index.ts`
```
import Root from "./radio-group.svelte";
import Item from "./radio-group-item.svelte";

export {
	Root,
	Item,
	//
	Root as RadioGroup,
	Item as RadioGroupItem,
};

```

## `src/lib/components/ui/separator/separator.svelte`
```
<script lang="ts">
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		"data-slot": dataSlot = "separator",
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot={dataSlot}
	class={cn(
		"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/separator/index.ts`
```
import Root from "./separator.svelte";

export {
	Root,
	//
	Root as Separator,
};

```

## `src/lib/components/ui/card/card-description.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="card-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</p>

```

## `src/lib/components/ui/card/card.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-action.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-action"
	class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-content.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} data-slot="card-content" class={cn("px-6", className)} {...restProps}>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-header.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-title.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-title"
	class={cn("font-semibold leading-none", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-footer.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-footer"
	class={cn("[.border-t]:pt-6 flex items-center px-6", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/index.ts`
```
import Root from "./card.svelte";
import Content from "./card-content.svelte";
import Description from "./card-description.svelte";
import Footer from "./card-footer.svelte";
import Header from "./card-header.svelte";
import Title from "./card-title.svelte";
import Action from "./card-action.svelte";

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	Action,
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction,
};

```

## `src/lib/components/ui/badge/badge.svelte`
```
<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
				secondary:
					"bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
				destructive:
					"bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>

```

## `src/lib/components/ui/badge/index.ts`
```
export { default as Badge } from "./badge.svelte";
export { badgeVariants, type BadgeVariant } from "./badge.svelte";

```

## `src/lib/utils/themeUpdater.svelte.ts`
```
// src/lib/utils/themeUpdater.svelte.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore.svelte';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // react to uiStore.theme via rune effect
    $effect(() => {
      const theme = uiStore.theme as Theme;
      const html = document.documentElement;

      if (theme === 'system') {
        const isDark = media.matches;
        if (isDark) html.classList.add('dark');
        else html.classList.remove('dark');
      } else if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });

    const mediaListener = () => {
      if (uiStore.theme === 'system') {
        const html = document.documentElement;
        if (media.matches) html.classList.add('dark');
        else html.classList.remove('dark');
      }
    };

    media.addEventListener('change', mediaListener);
    return () => media.removeEventListener('change', mediaListener);
  });
}
```

## `src/lib/utils/useItemFilters.ts`
```
// src/lib/utils/useItemFilters.ts
import type { ItemTree, Item, Priority } from '$lib/types';

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function filterItemTree(itemTree: ItemTree, filters: FilterOptions) {
  const filtered: Record<string, Item[]> = {};

  Object.entries(itemTree).forEach(([categoryName, items]) => {
    const filteredItems = items.filter((item) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.text.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (
        filters.selectedPriority !== 'all' &&
        item.priority !== filters.selectedPriority
      ) {
        return false;
      }

      if (!filters.showCompleted && item.isCompleted) {
        return false;
      }

      if (filters.selectedTags.length > 0) {
        const hasMatchingTag = filters.selectedTags.some((selectedTag) =>
          item.tags?.includes(selectedTag),
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
}

export function getAllTags(itemTree: ItemTree): string[] {
  const tags = new Set<string>();
  Object.values(itemTree).forEach((items) => {
    items.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
  });
  return Array.from(tags).sort();
}

export function useItemFilters(itemTree: ItemTree, filters: FilterOptions) {
  const filteredItemTree = filterItemTree(itemTree, filters);
  const allTags = getAllTags(itemTree);
  
  const hasActiveFilters = !!(
    filters.searchQuery.trim() ||
    filters.selectedPriority !== 'all' ||
    !filters.showCompleted ||
    filters.selectedTags.length > 0
  );

  return {
    filteredItemTree,
    allTags,
    hasActiveFilters
  };
}
```

## `src/lib/utils/helpers.ts`
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

## `src/lib/stores/uiStore.svelte.ts`
```
// src/lib/stores/uiStore.ts
import { toast } from 'svelte-sonner';
import type { NotificationType, Item } from '$lib/types';

export type Theme = 'light' | 'dark' | 'system';

class UiStore {
  // State
  theme = $state<Theme>('system');
  isFormOpen = $state(false);
  preselectedCategory = $state<string | null>(null);
  editingItem = $state<Item | null>(null);

  // Actions
  openForm(item?: Item, categorySlug?: string) {
    this.editingItem = item ?? null;
    if (categorySlug) {
      this.preselectedCategory = categorySlug;
    } else if (item?.categorySlug) {
      this.preselectedCategory = item.categorySlug;
    }
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.preselectedCategory = null;
    this.editingItem = null;
  }

  toggleTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else if (this.theme === 'dark') this.theme = 'system';
    else this.theme = 'light';
  }

  showNotification(type: NotificationType, message: string) {
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
      default:
        toast.info(message);
        break;
    }
  }
}

export const uiStore = new UiStore();
```

## `src/lib/utils.ts`
```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

```

## `src/lib/Counter.svelte`
```
<script lang="ts">
  let count: number = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<button onclick={increment}>
  count is {count}
</button>

```

## `src/lib/schemas/itemSchema.ts`
```
import { z } from 'zod';
import type { SingleCategory } from '$lib/types';

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

## `src/lib/router/Router.svelte`
```
<!-- src/lib/router/Router.svelte -->
<script lang="ts">
  import ItemPage from '$lib/pages/ItemPage.svelte';
  import AboutPage from '$lib/pages/AboutPage.svelte';
  import ItemDetailPage from '$lib/pages/ItemDetailPage.svelte';
  import { resolveRoute, navigate as navFn, type Route } from '$lib/router/router';
  import { onMount } from 'svelte';

  let currentRoute: Route = $state(resolveRoute(window.location.pathname));

  function handleNavigate(path: string) {
    navFn(path);
  }

  onMount(() => {
    const handler = (event: PopStateEvent | CustomEvent<string>) => {
      const pathname =
        event instanceof PopStateEvent
          ? window.location.pathname
          : (event.detail as string);
      currentRoute = resolveRoute(pathname);
    };

    window.addEventListener('popstate', handler);
    window.addEventListener('app:navigated', handler as EventListener);

    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('app:navigated', handler as EventListener);
    };
  });
</script>

{#if currentRoute.name === 'home'}
  <ItemPage on:navigate={(e) => handleNavigate(e.detail)} />
{:else if currentRoute.name === 'about'}
  <AboutPage on:navigate={(e) => handleNavigate(e.detail)} />
{:else if currentRoute.name === 'item-detail'}
  <ItemDetailPage
    categorySlug={currentRoute.categorySlug}
    itemSlug={currentRoute.itemSlug}
    on:navigate={(e) => handleNavigate(e.detail)}
  />
{/if}
```

## `src/lib/router/router.ts`
```
// src/lib/router/router.ts
export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'item-detail'; categorySlug: string; itemSlug: string };

export function resolveRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') {
    return { name: 'home' };
  }
  if (pathname === '/about') {
    return { name: 'about' };
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'items' && parts.length === 3) {
    const [, categorySlug, itemSlug] = parts;
    return { name: 'item-detail', categorySlug, itemSlug };
  }

  // fallback: home
  return { name: 'home' };
}

export function navigate(path: string) {
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
    const event = new CustomEvent('app:navigated', { detail: path });
    window.dispatchEvent(event);
  }
}
```

## `src/lib/types/index.ts`
```
// src/lib/types/index.ts
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
  // In Vue this is SingleCategory<string>; keep same payload shape.
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };
```

## `src/lib/pages/AboutPage.svelte`
```
<!-- src/lib/pages/AboutPage.svelte -->
<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ navigate: string }>();

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout currentPath={window.location.pathname} onNavigate={handleNavigate}>
  <div class="space-y-6">
    <header>
      <h1 class="font-bold text-size-3xl">About This Application</h1>
    </header>

    <div class="p-6 border rounded-lg bg-surface border-border">
      <p class="mb-4 text-text-secondary">
        This is a modern, responsive Svelte 5 frontend for managing items.
      </p>

      <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>

      <ul class="space-y-2 list-disc list-inside text-text-secondary">
        <li>
          <span class="font-medium text-text-primary">Svelte 5:</span>
          For building a reactive and performant user interface with Runes.
        </li>
        <li>
          <span class="font-medium text-text-primary">TanStack Query (Svelte Query):</span>
          Manages all server state.
        </li>
        <li>
          <span class="font-medium text-text-primary">shadcn-svelte:</span>
          UI Component library.
        </li>
        <li>
          <span class="font-medium text-text-primary">Tailwind CSS v4:</span>
          Styling.
        </li>
      </ul>
    </div>
  </div>
</MainLayout>
```

## `src/lib/pages/ItemPage.svelte`
```
<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { useItemTree } from '$lib/api/itemsQuery';
  import { useItemFilters } from '$lib/utils/useItemFilters';
  import FilterBar from '$lib/components/layout/FilterBar.svelte';
  import ItemItem from '$lib/components/items/ItemItem.svelte';
  import ItemForm from '$lib/components/items/ItemForm.svelte';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import { Plus } from '@lucide/svelte'; // Import icon directly

  const itemTreeQuery = useItemTree();
  const dispatch = createEventDispatcher();

  let filters = $state({
    searchQuery: '',
    selectedPriority: 'all' as const,
    showCompleted: true,
    selectedTags: [] as string[],
  });

  // Use derived for reactive calculations in Svelte 5
  let filterResults = $derived(useItemFilters(itemTreeQuery.data || {}, filters));
  let filteredItemTree = $derived(filterResults.filteredItemTree);
  let allTags = $derived(filterResults.allTags);
  let hasActiveFilters = $derived(filterResults.hasActiveFilters);

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
  }

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout currentPath={window.location.pathname} onNavigate={handleNavigate}>
  <header class="mb-6">
    <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
  </header>

  <!-- Bind props using Svelte 5 syntax -->
  <FilterBar
    bind:search={filters.searchQuery}
    bind:priority={filters.selectedPriority}
    bind:showCompleted={filters.showCompleted}
    bind:selectedTags={filters.selectedTags}
    {allTags}
    {hasActiveFilters}
    on:clear={clearFilters}
  />

  {#if itemTreeQuery.isLoading}
    <div>Loading...</div>
  {:else if itemTreeQuery.error}
    <div>Error: {itemTreeQuery.error.message}</div>
  {:else}
    <div class="mt-6 space-y-8">
      {#each Object.entries(filteredItemTree) as [category, items]}
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-semibold capitalize text-size-xl">{category}</h2>
            <span class="text-sm text-text-muted">({items.length})</span>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onclick={() => uiStore.openForm(undefined, category)}
            >
              <Plus class="w-4 h-4" />
            </Button>
          </div>
          <div class="grid gap-4">
            {#each items as item (item.id)}
              <ItemItem {item} />
            {/each}
          </div>
        </section>
      {/each}
      {#if Object.keys(filteredItemTree).length === 0 && !itemTreeQuery.isLoading}
        <div class="py-10 text-center text-text-muted">
          <p>No items found.</p>
          {#if hasActiveFilters}
            <p>Try adjusting your filters.</p>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Access store property directly -->
  {#if uiStore.isFormOpen}
    <ItemForm onClose={() => uiStore.closeForm()} />
  {/if}
</MainLayout>
```

## `src/lib/pages/ItemDetailPage.svelte`
```
<script lang="ts">
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';
  import type { Item } from '$lib/types';

  export let categorySlug: string;
  export let itemSlug: string;
  export let navigate: (path: string) => void;

  const { data: item, isLoading, error } = useItemDetail(() => categorySlug, () => itemSlug);

  function goBack() {
    navigate('/');
  }
</script>

<div class="container mx-auto p-fluid-6">
  <button onclick={goBack} class="mb-4 text-primary hover:underline">
    ← Back
  </button>

  {#if isLoading}
    <div>Loading...</div>
  {:else if error}
    <div>Error: {error.message}</div>
  {:else if item}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class="tag-priority-{item.priority}">{item.priority}</span>
        {#if item.isCompleted}
          <span class="tag-sm bg-success-light">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>
```

## `src/lib/api/itemApi.ts`
```
// src/lib/api/itemApi.ts
import { get, post, patch, del } from '$lib/api/apiClient';
import type {
  Item,
  ItemTree,
  CreateItemPayload,
  UpdateItemPayload,
} from '$lib/types';

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

## `src/lib/api/apiClient.ts`
```
// src/lib/api/apiClient.ts
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '$lib/types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
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

## `src/lib/api/itemsQuery.ts`
```
// src/lib/api/itemsQuery.ts
import {
  QueryClient,
  createQuery,
  createMutation,
  useQueryClient,
} from '@tanstack/svelte-query';
import {
  getItemTree,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem,
} from '$lib/api/itemApi';
import type { CreateItemPayload, UpdateItemPayload } from '$lib/types';
import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension

// shared query keys (same structure as Vue)
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

// root-level query client creator (used in App.svelte)
export function createAppQueryClient() {
  return new QueryClient();
}

// hooks-equivalent functions for components

export function useItemTree() {
  return createQuery(() => ({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
    staleTime: 5 * 60 * 1000,
  }));
}

export function useItemDetail(categorySlug: () => string, itemSlug: () => string) {
  return createQuery(() => ({
    queryKey: itemKeys.detail(categorySlug(), itemSlug()),
    queryFn: () => getItemBySlug(categorySlug(), itemSlug()),
    enabled: Boolean(categorySlug() && itemSlug()),
  }));
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to create item');
    },
  }));
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (args: { id: number; payload: UpdateItemPayload }) =>
      updateItem(args.id, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to update item');
    },
  }));
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to delete item');
    },
  }));
}
```

## `src/app.css`
```
@import "tailwindcss";

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

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

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## `src/main.ts`
```
import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

```

## `components.json`
```
{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/app.css",
		"baseColor": "neutral"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks",
		"lib": "$lib"
	},
	"typescript": true,
	"registry": "https://shadcn-svelte.com/registry"
}

```

