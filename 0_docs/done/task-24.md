The error is caused by using the Svelte rune `$effect` inside a plain TypeScript module `src/lib/utils/themeUpdater.ts`, which is not a Svelte-aware file, so the runtime throws `rune_outside_svelte`.[1]

Below is a concrete, file-level TODO list for an AI agent to fix this in your current codebase.

***

### 1. Root cause in this repo

- There is a file `src/lib/utils/themeUpdater.ts` that imports `onMount` and uses a rune-based effect to react to `uiStore.theme`.[1]
- The code is roughly: it calls `onMount`, sets up a `matchMedia('(prefers-color-scheme: dark)')`, then uses an `effect`/`$effect` to read `uiStore.theme` and toggle the `dark` class on `<html>`.[1]
- Because this file ends with `.ts` and not `.svelte.ts`, Svelte’s rune transformer is not applied, so `$effect` runs at runtime as a raw function and trips the `rune_outside_svelte` guard.[1]
- `App.svelte` imports this helper via `import { useThemeUpdater } from '$lib/utils/themeUpdater';` and calls `useThemeUpdater();` during component initialization, which triggers the invalid rune usage.[1]

***

### 2. Recommended fix strategy

Use a Svelte logic module (`.svelte.ts`) for rune-based utilities, exactly like you already do with `src/lib/stores/uiStore.svelte.ts`.[1]

Concretely: rename `themeUpdater.ts` to `themeUpdater.svelte.ts` and import it as `'$lib/utils/themeUpdater.svelte'`, keeping the `$effect` inside that file.[1]

***

### 3. Literal TODO for AI agent

#### TODO 1 – Rename the file to a Svelte logic module

- Move/rename:  
  - From: `src/lib/utils/themeUpdater.ts`  
  - To: `src/lib/utils/themeUpdater.svelte.ts`  
[1]

(Do not change its directory, only the filename/extension.)[1]

#### TODO 2 – Update the import in `src/App.svelte`

- Open `src/App.svelte`.[1]
- Find this import:  
  ```ts
  import { useThemeUpdater } from '$lib/utils/themeUpdater';
  ```

- Replace it with:  
  ```ts
  import { useThemeUpdater } from '$lib/utils/themeUpdater.svelte';
  ```


Leave the usage as-is:  

```ts
const queryClient = createAppQueryClient();

useThemeUpdater();
```


#### TODO 3 – Ensure `useThemeUpdater` uses `$effect` only inside the function and `onMount`

- Open `src/lib/utils/themeUpdater.svelte.ts`.[1]
- Ensure its content looks like this (or equivalent) so that all rune usage is inside the function and wrapped in `onMount`:

```ts
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


- The important constraints for the agent:  
  - `$effect` must remain inside `useThemeUpdater`, not at module top level.[1]
  - The file must be `.svelte.ts` so Svelte compiles the rune usage.[1]

#### TODO 4 – (Optional but good) Update TS config include pattern

- Open `tsconfig.app.json`.[1]
- In `"include"`, ensure it covers `.svelte.ts` files, for example:  

```json
"include": ["src/**/*.ts", "src/**/*.js", "src/**/*.svelte", "src/**/*.svelte.ts"]
```


This helps the type-checker see the new module, though the runtime error is already fixed by the rename.[1]

#### TODO 5 – Verify no other runes in plain `.ts` files

- Scan for `state`, `$state`, `derived`, `$derived`, `effect`, `$effect` used in non-`.svelte` or non-`.svelte.ts` files.[1]
- In this project snapshot, only `uiStore` lives in `src/lib/stores/uiStore.svelte.ts` (correct) and `themeUpdater` was the misplaced rune usage.[1]
- If any other rune usages are found in `.ts` files, move them into `.svelte.ts` modules or into real `.svelte` components using the same pattern.[1]

***

After applying TODO 1–3, rebuild/restart dev server and the `rune_outside_svelte` error pointing at `themeUpdater.ts` should disappear, since the runes now live in a Svelte-compiled module.[1]

