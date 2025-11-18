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