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
