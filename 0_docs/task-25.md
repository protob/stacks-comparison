Clicking `/about` is currently calling the `navigate` function with the click event object instead of a string path, so your custom router receives an object and `history.pushState` stringifies it to `"[object Object]"` in the URL.[1]

### Why this happens

- In `src/lib/router/router.ts`, `navigate` expects a string `path` and passes it to `history.pushState` and into the `appnavigated` event.[1]
- In `src/lib/router/Router.svelte`, `handleNavigate` just forwards that value into `navFn(path)`, so whatever is emitted from children flows straight into `navigate`.[1]
- Your top bar component `src/lib/components/layout/TopBar.svelte` defines:  
  ```svelte
  <script lang="ts">
    export let currentPath;
    function navigate(path: string) {
      // Dispatch navigate event to parent
      dispatch('navigate', path);
    }
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>
  ```
  and uses buttons like:  
  ```svelte
  <button onclick={navigate}>Home</button>
  <button onclick={navigateabout}>About</button>
  ```
  (the second line is effectively also not passing a proper string).[1]
- With `onclick={navigate}`, Svelte calls `navigate(event)` where `event` is a `MouseEvent`, so `path` is that event object.[1]
- When that reaches `router.navigate`, `history.pushState({}, '', path)` turns the `MouseEvent` into the string `"[object Object]"`, which is what you see in the browser URL bar.[1]

### Literal TODO for the AI agent

#### TODO 1 – Fix the `TopBar.svelte` navigate wiring

1. Open `src/lib/components/layout/TopBar.svelte`.[1]
2. Ensure the script block is correctly ordered and typed, for example:  
   ```svelte
   <script lang="ts">
     import { createEventDispatcher } from 'svelte';

     export let currentPath: string;

     const dispatch = createEventDispatcher<{ navigate: string }>();

     function navigate(path: string) {
       // Dispatch navigate event to parent
       dispatch('navigate', path);
     }
   </script>
   ```
   This guarantees `navigate` always expects a string path and dispatches it as the `detail`.[1]

#### TODO 2 – Change button `onclick` handlers to pass strings

3. In the same file, replace the current button markup with explicit arrow functions that pass a string path, for example:[1]
   ```svelte
   <header class="flex items-center justify-end pb-4 mb-4 border-b border-border">
     <nav class="flex items-center gap-4">
       <button
         onclick={() => navigate('/')}
         class={currentPath === '/' 
           ? 'text-primary font-bold' 
           : 'text-text-secondary hover:text-text-primary'}
       >
         Home
       </button>

       <button
         onclick={() => navigate('/about')}
         class={currentPath === '/about' 
           ? 'text-primary font-bold' 
           : 'text-text-secondary hover:text-text-primary'}
       >
         About
       </button>
     </nav>
   </header>
   ```
   This ensures `navigate` is never called with the raw click event but only with `"/"` or `"/about"`.[1]

#### TODO 3 – Make highlighting work (optional but recommended)

4. In `src/lib/router/Router.svelte`, `currentRoute` is set from `resolveRoute(window.location.pathname)`.[1]
5. Pass the current path down to `MainLayout` and then to `TopBar` so the active link styling works:[1]
   - In `src/lib/router/Router.svelte`, when rendering `ItemPage` and `AboutPage`, wrap them with a prop for `currentPath` via `MainLayout`:  
     - In `src/lib/pages/ItemPage.svelte`, change:  
       ```svelte
       <MainLayout onNavigate={handleNavigate}>
       ```
       to:  
       ```svelte
       <MainLayout currentPath={window.location.pathname} onNavigate={handleNavigate}>
       ```
       (or pass `currentRoute` name/path if you store it in props instead).[1]
     - In `src/lib/pages/AboutPage.svelte`, do the same:  
       ```svelte
       <MainLayout currentPath={window.location.pathname} onNavigate={handleNavigate}>
       ```

   - In `src/lib/components/layout/MainLayout.svelte`, add the prop and forward it:  
     ```svelte
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
     This makes `currentPath` available to `TopBar` for correct class toggling.[1]

