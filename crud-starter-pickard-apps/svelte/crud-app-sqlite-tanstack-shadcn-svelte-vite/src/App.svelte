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