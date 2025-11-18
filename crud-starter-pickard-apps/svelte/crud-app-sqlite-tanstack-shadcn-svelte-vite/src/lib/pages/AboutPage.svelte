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