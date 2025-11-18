<!-- src/lib/components/layout/MainLayout.svelte -->
<script lang="ts">
  import AppSidebar from './AppSidebar.svelte';
  import TopBar from './TopBar.svelte';
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <AppSidebar />
  <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
    <TopBar />
    <slot />
  </div>
</div>