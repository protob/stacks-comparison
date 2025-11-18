<script lang="ts">
  import '../app.css';
  import Notifications from '$lib/components/common/Notifications.svelte';
  
  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen text-neutral-100">
  <header class="border-b border-neutral-800 bg-neutral-900">
    <div class="container px-4 py-4 mx-auto">
      <h1 class="text-xl font-semibold text-neutral-100">Items</h1>
    </div>
  </header>
  <main class="flex-1 w-full">
    {@render children()}
  </main>
  <Notifications />
</div>