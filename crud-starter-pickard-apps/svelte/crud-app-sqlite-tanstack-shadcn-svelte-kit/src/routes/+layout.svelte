<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg'; // Changed import to $lib
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import { useThemeUpdater } from '$lib/utils/themeUpdater.svelte.js';
  import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser, // Only fetch on client
        staleTime: 60 * 1000,
      },
    },
  });

  // Initialize theme
  useThemeUpdater();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>shadcn-simple-svelte-kit</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <div class="flex min-h-screen bg-background text-foreground">
    <!-- Sidebar handles its own internal state -->
    <AppSidebar />
    
    <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
      <!-- Pass current path from $page store -->
      <TopBar currentPath={$page.url.pathname} />
      
      <!-- Correct Svelte 5 Render Syntax -->
      {@render children()}
    </div>
  </div>
  
  <Toaster position="top-right" richColors />
</QueryClientProvider>