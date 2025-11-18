Below is a literal, step‑by‑step TODO for an AI agent, with full paths, commands, and code blocks, assuming the backend API remains on `http://localhost:3000/api` and Bun is used to run scripts.[7][8][5][6]

***

### 1. Change to SvelteKit project directory

1. Open a shell and change directory to the SvelteKit app.[6]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit
   ```

   This path is the working SvelteKit frontend project that will be updated.[6]

2. For reference, the Vite SPA lives at this path and will be used as the source of truth for shared code.[5]

   ```bash
   /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite
   ```

***

### 2. Install required dependencies in SvelteKit app

The SvelteKit `package.json` currently only has Svelte, SvelteKit, Tailwind v4, and lucide; install the same runtime dependencies used by the Vite SPA.[5][6]

1. From the SvelteKit project root, install runtime deps with Bun.[3][6]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit

   bun add @tanstack/svelte-query@latest   @tanstack/svelte-form@latest  @tanstack/zod-form-adapter@latest   zod@latest  ofetch@latest svelte-sonner@latest
   ```

   This aligns SvelteKit with the SPA’s stack (TanStack Query v6 runes adapter, zod, ofetch, svelte-sonner).[9][3][5]

2. Ensure `devDependencies` already include Tailwind v4 and `tailwindcss/vite` plus Svelte 5 and SvelteKit; the template `package.json` already has these.[10][4][6]

***

### 3. Fix SvelteKit `svelte.config.js` alias for `lib`

The SPA uses a `lib` alias (`lib/* → src/lib/*`) and shadcn-svelte relies on this alias; SvelteKit must be configured similarly via `kit.alias`.[1][5][6]

1. Open this file for editing.[6]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/svelte.config.js
   ```

2. Replace the entire contents of `svelte.config.js` with the following configuration that sets the `lib` alias and uses adapter-auto and `vitePreprocess`.[1][6]

   ```js
   // /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/svelte.config.js
   import adapter from '@sveltejs/adapter-auto';
   import vitePreprocess from '@sveltejs/vite-plugin-svelte';
   import path from 'path';

   /** @type {import('@sveltejs/kit').Config} */
   const config = {
     preprocess: vitePreprocess(),
     kit: {
       adapter: adapter(),
       alias: {
         lib: path.resolve('src/lib')
       }
     }
   };

   export default config;
   ```

   This makes `import X from 'lib/...';` work in SvelteKit as in the Vite SPA.[5][1][6]

***

### 4. Ensure Tailwind v4 + theme CSS matches SPA

Both projects already use Tailwind v4 with `tailwindcss/vite` and a theme configured in `src/app.css`; the SvelteKit CSS should mirror the SPA theme for consistent design system tokens.[4][5][6]

1. Overwrite the SvelteKit `src/app.css` with the SPA’s `src/app.css`.[5][6]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/app.css \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/app.css
   ```

   The SPA `app.css` defines `@tailwind` layers, `@theme inline` and the OKLCH color variables used by shadcn components, which SvelteKit should reuse.[4][6][5]

2. Confirm `vite.config.ts` in SvelteKit is already using `tailwindcss/vite` and the SvelteKit Vite plugin.[4][6]

   ```bash
   cat /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/vite.config.ts
   ```

   It should contain something equivalent to:[4][6]

   ```ts
   import tailwindcss from 'tailwindcss/vite';
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vite';

   export default defineConfig({
     plugins: [tailwindcss(), sveltekit()]
   });
   ```

***

### 5. Confirm shadcn-svelte initialization and add required components

The SvelteKit project already has `components.json` and a `button` component; add the same components used in the SPA (badge, card, dialog, checkbox, input, label, radio-group, separator, etc.).[6][4][5]

1. Inspect `components.json` in SvelteKit to confirm paths and registry.[4][6]

   ```bash
   cat /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/components.json
   ```

   It should match the SPA config with aliases like `components → lib/components`, `ui → lib/components/ui`, and `utils → lib/utils`.[5][6][4]

2. From the SvelteKit root, add the needed shadcn components using the CLI.[6][4][5]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit

   bun x shadcn-svelte@next add button
   bun x shadcn-svelte@next add badge
   bun x shadcn-svelte@next add card
   bun x shadcn-svelte@next add checkbox
   bun x shadcn-svelte@next add dialog
   bun x shadcn-svelte@next add input
   bun x shadcn-svelte@next add label
   bun x shadcn-svelte@next add radio-group
   bun x shadcn-svelte@next add separator
   ```

   These components correspond to the ones actively used in the SPA’s `lib/components/ui` and `lib/components/items` implementations.[11][4][5]

3. If any of the generated components differ from the SPA’s implementations (for example custom `dialog-*` layering or `card-*` semantics), overwrite SvelteKit versions with SPA ones.[5][6]

   Example for `card` components:[6][5]

   ```bash
   cp -R /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/components/ui/card \
         /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/ui/card

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/components/ui/card/index.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/ui/card/index.ts
   ```

   Repeat similar `cp -R` for `dialog`, `radio-group`, `separator`, `badge`, and `checkbox` to keep behavior identical to the SPA.[5][6]

***

### 6. Copy shared `lib` layer from SPA into SvelteKit

SvelteKit should reuse the entire domain layer (`api`, `schemas`, `stores`, `utils`, `types`, `components/items`, `components/layout`, `pages`) from the SPA; SvelteKit’s routing will replace the SPA router.[1][6][5]

1. Create missing directories under SvelteKit `src/lib`.[6]

   ```bash
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/api
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/items
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/layout
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/schemas
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/stores
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/utils
   ```

2. Copy API client and TanStack Query hooks from SPA.[2][8][5]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/api/apiClient.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/api/apiClient.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/api/itemApi.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/api/itemApi.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/api/itemsQuery.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/api/itemsQuery.ts
   ```

   These files contain the `QueryClient` factory, `useItemTree`, `useItemDetail`, and mutation hooks configured for TanStack Query v6 runes.[3][9][5]

3. Copy types and zod schemas.[5]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/types/index.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/types/index.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/schemas/itemSchema.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/schemas/itemSchema.ts
   ```

   This preserves the `Item`, `Category`, `CreateItemPayload`, `UpdateItemPayload` and the `itemFormSchema` used by forms.[5]

4. Copy global UI store using Svelte 5 runes.[10][5]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/stores/uiStore.svelte.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/stores/uiStore.svelte.ts
   ```

   This file defines the `UiStore` singleton with `state` runes for `theme`, `isFormOpen`, `preselectedCategory`, and `editingItem`, plus toast notifications.[10][5]

5. Copy utilities including `cn`, `formatDate`, `useItemFilters`, and `themeUpdater`.[5]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/utils.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/utils.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/utils/helpers.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/utils/helpers.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/utils/useItemFilters.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/utils/useItemFilters.ts

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/utils/themeUpdater.svelte.ts \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/utils/themeUpdater.svelte.ts
   ```

   These utilities are used by components and the layout to format dates, filter items, manage theme, and compose Tailwind classes.[5]

6. Copy domain components and layouts.[5]

   ```bash
   cp -R /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/components/items \
         /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/items

   cp -R /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/components/layout \
         /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/layout
   ```

   These include `ItemItem.svelte`, `ItemForm.svelte`, main layout with sidebar/topbar, and other presentational components.[5]

7. Copy page-level components into `lib/pages`.[6][5]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/pages/AboutPage.svelte \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/AboutPage.svelte

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/pages/ItemPage.svelte \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/ItemPage.svelte

   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/pages/ItemDetailPage.svelte \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/ItemDetailPage.svelte
   ```

   These `lib/pages/*` files will be used as route components under SvelteKit’s file-based routing.[1][6][5]

8. Do **not** copy the SPA `lib/router` or `src/App.svelte` or `src/main.ts`; SvelteKit’s `src/routes` and root layout replace them.[1][6][5]

***

### 7. Configure SvelteKit root layout with QueryClient and theme

The root `src/routes/layout.svelte` should import global CSS, set the favicon, initialize the TanStack Query `QueryClient`, wrap children in `QueryClientProvider`, and hook theme updates via `useThemeUpdater`, while disabling queries on the server using SvelteKit’s `browser` flag.[8][2][6][5]

1. Open the SvelteKit layout file.[6]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/layout.svelte
   ```

2. Replace the entire contents of `layout.svelte` with the following code.[2][8][6][5]

   ```svelte
   <!-- /src/routes/layout.svelte -->
   <script lang="ts">
     import '../app.css';
     import favicon from 'lib/assets/favicon.svg';
     import type { Snippet } from 'svelte';
     import { browser } from '$app/environment';
     import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
     import { Toaster } from 'svelte-sonner';
     import { useThemeUpdater } from 'lib/utils/themeUpdater.svelte.ts';

     let { children }: { children: Snippet } = $props();

     const queryClient = new QueryClient({
       defaultOptions: {
         queries: {
           // Disable running queries during SSR; only enable in browser
           enabled: browser
         }
       }
     });

     // Initialize theme synchronization (dark/system)
     useThemeUpdater();
   </script>

   <svelte:head>
     <link rel="icon" href={favicon} />
     <title>shadcn-simple-svelte-kit</title>
   </svelte:head>

   <QueryClientProvider client={queryClient}>
     <main class="min-h-screen bg-background text-foreground">
       {children()}
       <Toaster position="top-right" richColors />
     </main>
   </QueryClientProvider>
   ```

   This follows TanStack’s SvelteKit SSR pattern by using `browser` in the `QueryClient` and wraps all routes in `QueryClientProvider` from the root layout.[8][2][6][5]

***

### 8. Define SvelteKit routes using file-based routing

SvelteKit uses filesystem-based routing under `src/routes`, so define pages corresponding to `/`, `/about`, and `/items/[categorySlug]/[itemSlug]` using `+page.svelte` files that reuse the copied `lib/pages` components.[12][1][6][5]

#### 8.1 Home route `/` → item list

1. Create or overwrite the root page file.[1][6]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/+page.svelte
   ```

2. Insert the following code, which wraps the `ItemPage` component and uses SvelteKit navigation for any internal links if needed.[1][5]

   ```svelte
   <!-- /src/routes/+page.svelte -->
   <script lang="ts">
     import ItemPage from 'lib/pages/ItemPage.svelte';
   </script>

   <ItemPage />
   ```

   `ItemPage` already uses TanStack Query hooks (`useItemTree`, mutations) and shadcn UI for the CRUD interface.[2][8][5]

#### 8.2 About route `/about`

1. Create directory and page file for `/about`.[1][6]

   ```bash
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/about

   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/about/+page.svelte
   ```

2. Insert this code to render the already existing `AboutPage` component.[1][5]

   ```svelte
   <!-- /src/routes/about/+page.svelte -->
   <script lang="ts">
     import AboutPage from 'lib/pages/AboutPage.svelte';
   </script>

   <AboutPage />
   ```

   This page uses the `MainLayout` component and descriptive content about the app stack.[5]

#### 8.3 Detail route `/items/[categorySlug]/[itemSlug]`

1. Create the nested directory and page file.[12][6][1]

   ```bash
   mkdir -p /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/items/[categorySlug]/[itemSlug]

   nano /home/dtb/0-dev-00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/items/[categorySlug]/[itemSlug]/+page.svelte
   ```

   (Fix any typo in the path when typing: ensure `0-dev` is instead of `0-dev-`.)[6][1]

2. Insert the following code that proxies SvelteKit route params into the existing `ItemDetailPage` props.[12][1][5]

   ```svelte
   <!-- /src/routes/items/[categorySlug]/[itemSlug]/+page.svelte -->
   <script lang="ts">
     import type { PageData } from './$types';
     import ItemDetailPage from 'lib/pages/ItemDetailPage.svelte';

     let { data }: { data: PageData } = $props();
   </script>

   <ItemDetailPage
     categorySlug={data.categorySlug}
     itemSlug={data.itemSlug}
   />
   ```

3. Create the corresponding `+page.ts` to expose `categorySlug` and `itemSlug` to the page.[13][1][6]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/items/[categorySlug]/[itemSlug]/+page.ts
   ```

4. Insert the following TypeScript load function.[13][1][6]

   ```ts
   // /src/routes/items/[categorySlug]/[itemSlug]/+page.ts
   import type { PageLoad } from './$types';

   export const load: PageLoad = async ({ params }) => {
     const { categorySlug, itemSlug } = params;

     return {
       categorySlug,
       itemSlug
     };
   };
   ```

   The `ItemDetailPage` component will call `useItemDetail(categorySlug, itemSlug)` using TanStack Query to fetch data from the API when running in the browser.[8][2][5]

***

### 9. Update navigation in layout/sidebar to use SvelteKit routes

The SPA layout previously used a custom router and `navigate` function; in SvelteKit, use standard `<a>` links or `goto` for internal navigation.[1][5]

1. Open the main layout component that defines the sidebar or top navigation in SvelteKit.[6][5]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/layout/MainLayout.svelte
   ```

2. Replace any SPA-specific navigation that dispatches a `navigate` event or calls a custom `navigate()` function with simple anchor tags pointing to SvelteKit routes.[1][5]

   Example replacement snippet:[1][5]

   ```svelte
   <!-- Before (SPA-style with custom navigate) -->
   <!--
   <button on:click={() => dispatch('navigate', '/')}>Home</button>
   <button on:click={() => dispatch('navigate', '/about')}>About</button>
   -->

   <!-- After (SvelteKit-style links) -->
   <nav class="flex gap-4">
     <a href="/" class="text-sm text-primary hover:underline">Home</a>
     <a href="/about" class="text-sm text-primary hover:underline">About</a>
   </nav>
   ```

   This leverages SvelteKit’s built-in link handling; for advanced prefetching, `data-sveltekit-preload-data="hover"` can be added per docs.[7][1]

3. If a “View details” action in `ItemItem.svelte` previously used `navigate('/items/...')`, update it to use `<a href={`/items/${item.categorySlug}/${item.slug}`}>` or use `goto` from `$app/navigation`.[1][5]

   Example update in `src/lib/components/items/ItemItem.svelte`:[1][5]

   ```svelte
   <script lang="ts">
     import { goto } from '$app/navigation';
     // existing imports...

     function openDetail() {
       goto(`/items/${item.categorySlug}/${item.slug}`);
     }
   </script>

   <!-- Replace old on:click navigate call -->
   <button class="text-sm text-primary hover:underline" on:click={openDetail}>
     View details
   </button>
   ```

   This ensures navigation uses SvelteKit’s router and still preserves SPA-like UX.[12][1]

***

### 10. Keep data fetching client-side with TanStack Query (best practice alignment)

Given the existing architecture and separate backend API, keep TanStack Query as the sole data-fetching mechanism on the client while disabling server-side execution; this matches TanStack’s SvelteKit SSR recommendation when you don’t need server prefetch for SEO.[14][2][8][5]

1. Verify `createAppQueryClient` in `src/lib/api/itemsQuery.ts` matches the SPA and does **not** override the `enabled: browser` setting from the root layout’s `QueryClient`.[2][5]

   ```bash
   cat /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/api/itemsQuery.ts
   ```

   Ensure it only constructs a `new QueryClient` without SSR-specific config; SSR control is centralized in `layout.svelte`.[8][2][5]

2. Confirm that `ItemPage.svelte` and `ItemDetailPage.svelte` call `useItemTree` and `useItemDetail` only in component scripts, not in load functions; this is correct for client-only querying with SvelteKit.[14][5]

   ```bash
   grep -n "useItemTree" -n \
     /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/ItemPage.svelte

   grep -n "useItemDetail" -n \
     /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/ItemDetailPage.svelte
   ```

   With `enabled: browser` in the `QueryClient`, queries will not run during SSR but will run as soon as the app hydrates in the browser.[2][8][6][5]

***

### 11. Ensure TypeScript config is compatible with `.svelte.ts` runes modules

The SPA uses `.svelte.ts` modules for runes (e.g., `uiStore.svelte.ts`, `themeUpdater.svelte.ts`); SvelteKit’s `tsconfig.json` already extends `.svelte-kit/tsconfig.json` and supports these patterns, but confirm includes/paths are aligned.[10][6][5]

1. Open the SvelteKit `tsconfig.json`.[6]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/tsconfig.json
   ```

2. Ensure `compilerOptions.paths` include `lib` and that `include` covers `src/**/*.ts`, `src/**/*.svelte`, and `.svelte.ts` files.[10][6]

   Example snippet (adjust only if missing):[10][6]

   ```json
   {
     "extends": "./.svelte-kit/tsconfig.json",
     "compilerOptions": {
       "paths": {
         "lib/*": ["./src/lib/*"]
       }
     }
   }
   ```

   This makes TypeScript aware of the `lib` alias and `.svelte.ts` modules.[10][6][5]

***

### 12. Run the app and verify

Finally, run the SvelteKit dev server via Bun and verify routes and CRUD behavior.[15][6]

1. From the SvelteKit root, install dependencies if not already done.[6]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit

   bun install
   ```

2. Start the SvelteKit dev server.[15][6]

   ```bash
   bun run dev
   ```

   By default this will run on `http://localhost:5173` or another port printed in the console.[15][6]

3. With the backend API running on `http://localhost:3000/api`, open the following URLs in a browser and verify behavior matches the SPA.[7][6][5]

   - `http://localhost:5173/` → item tree CRUD UI backed by TanStack Query.[2][5]
   - `http://localhost:5173/about` → “About this application” page.[6][5]
   - Click “View details” on an item to hit `http://localhost:5173/items/{categorySlug}/{itemSlug}` and ensure detail view loads via `useItemDetail`.[8][2][5]

4. Run checks/build to ensure no type errors.[15][6]

   ```bash
   bun run check
   bun run build
   ```

   This uses `svelte-kit sync` and `svelte-check` from the existing scripts, validating the integration.[15][10][6]

***

These steps align the SvelteKit codebase with the SPA’s architecture while following current SvelteKit best practices: file-based routing, root layout providers, client-focused TanStack Query with SSR-safe defaults, Tailwind v4 configless setup, and shadcn-svelte components wired through a shared `lib` domain layer.[13][3][12][4][2][10][5][6][1]

