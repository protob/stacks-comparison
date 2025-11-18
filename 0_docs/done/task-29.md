The 500 is because SvelteKit cannot resolve the `FilterBar.svelte` module for the root route; the SPA (Vite) has `src/lib/components/layout/FilterBar.svelte` wired correctly, but the SvelteKit project’s `+page.svelte` still imports it in a way Vite/Kit cannot find at SSR time.[1][2][3]

Below is a **fresh, minimal TODO** that makes the SvelteKit app compile and use the same UI as the Vite app, by (1) copying `FilterBar.svelte` from the SPA, and (2) replacing `src/routes/+page.svelte` with a known‑good implementation that uses the shared `lib/pages/ItemPage.svelte`.[2][4][1]

***

### 1. Change to SvelteKit app directory

1. Open a terminal and go to the SvelteKit frontend.[1]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit
   ```

   This is the project that currently fails with `Cannot find module '$lib/components/layout/FilterBar.svelte'`.[1]

***

### 2. Ensure `FilterBar.svelte` exists in SvelteKit

The working SPA has `src/lib/components/layout/FilterBar.svelte` with the filter UI (priority, status, clear button).[2]

1. Copy `FilterBar.svelte` from the Vite SPA into the SvelteKit project, overwriting any existing file.[2][1]

   ```bash
   cp /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite/src/lib/components/layout/FilterBar.svelte \
      /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/layout/FilterBar.svelte
   ```

   The copied file should contain this structure (you do not need to retype it; the `cp` above does it):[2]

   ```svelte
   <!-- /src/lib/components/layout/FilterBar.svelte -->
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
           <!-- options All/Low/Mid/High -->
         </RadioGroup>
       </div>

       <div>
         <Label class="block mb-2">Status</Label>
         <div class="flex items-center gap-2">
           <Checkbox id="show-completed" bind:checked={showCompleted} />
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

   This guarantees the module exists at the exact path `$lib/components/layout/FilterBar.svelte` expects (`$lib` → `src/lib`).[3][1][2]

***

### 3. Replace `src/routes/+page.svelte` with a clean Item page

Right now `src/routes/+page.svelte` in SvelteKit duplicates much of the SPA logic and imports `FilterBar` directly, which is where the resolution error is triggered during SSR.[1]

To simplify and align with SvelteKit best practice, make the root route delegate to the shared `lib/pages/ItemPage.svelte` (which already wires `FilterBar`, `ItemItem`, and `ItemForm` correctly).[5][1][2]

1. Open the root page file.[1]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/routes/+page.svelte
   ```

2. **Delete everything** in this file and replace it with the following minimal implementation:[5][2][1]

   ```svelte
   <!-- /src/routes/+page.svelte -->
   <script lang="ts">
     import ItemPage from 'lib/pages/ItemPage.svelte';
   </script>

   <ItemPage />
   ```

   `ItemPage.svelte` already imports `FilterBar` from the `lib/components/layout/FilterBar.svelte` module and uses the shared MainLayout, TanStack Query hooks, and filters.[6][2][1]

3. Save the file and exit the editor (in nano: press `Ctrl+O`, `Enter`, then `Ctrl+X`).[1]

This change removes the direct `FilterBar` import from `+page.svelte` (the one that Vite complained about) and relies on the already working `lib/pages/ItemPage.svelte` wiring.[2][1]

***

### 4. Confirm imports inside `ItemPage.svelte` use the `lib` alias

`lib/pages/ItemPage.svelte` in the SvelteKit project was generated from the SPA and uses the `lib` alias (configured via `kit.alias` in `svelte.config.js`).[1]

1. Open the file to verify imports.[1]

   ```bash
   nano /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/pages/ItemPage.svelte
   ```

2. Ensure the imports look conceptually like this (you do **not** need to edit if they already match):[1]

   ```svelte
   <script lang="ts">
     import MainLayout from 'lib/components/layout/MainLayout.svelte';
     import { useItemTree } from 'lib/api/itemsQuery';
     import { useItemFilters } from 'lib/utils/useItemFilters';
     import FilterBar from 'lib/components/layout/FilterBar.svelte';
     import ItemItem from 'lib/components/items/ItemItem.svelte';
     import ItemForm from 'lib/components/items/ItemForm.svelte';
     import { uiStore } from 'lib/stores/uiStore.svelte';
     import { Button } from 'lib/components/ui/button';
     import Plus from '@lucide/svelte/icons/plus';
     // ... rest of logic
   </script>
   ```

   Using `lib/...` here is correct because `svelte.config.js` defines `alias: { lib: path.resolve('src/lib') }`, and `$lib` is still handled automatically by SvelteKit.[4][3][1]

   If any of these imports still use `$lib/components/layout/FilterBar.svelte`, it is also valid, but for consistency you can update them to `lib/...` since the alias is configured.[4][1]

***

### 5. Restart dev server and verify

1. Stop the current dev server if it is running (`Ctrl+C` in that terminal).[1]

2. Start the SvelteKit dev server again.[7][1]

   ```bash
   cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit

   bun run dev
   ```

3. Open `http://localhost:5173/` in the browser and verify that:[2][1]

   - The home page loads without a 500 error (no more `Cannot find module '$lib/components/layout/FilterBar.svelte'`).[1]
   - The items list appears with sections per category, using `FilterBar` at the top for filters.[2]
   - Opening the form and performing CRUD operations works via TanStack Query as in the SPA.[6][2][1]

If the error persists, run this command to double-check that the file is present at the expected path from SvelteKit’s perspective:[3][2][1]

```bash
ls -l /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit/src/lib/components/layout/FilterBar.svelte
```

If this `ls` shows “No such file or directory”, repeat step 2’s `cp` and confirm the directory path is spelled exactly `components/layout` with `FilterBar.svelte` casing.[3][2][1]

