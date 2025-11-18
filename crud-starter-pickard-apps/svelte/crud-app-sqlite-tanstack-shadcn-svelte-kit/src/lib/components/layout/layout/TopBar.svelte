<script lang="ts">
  import { page } from '$app/stores';

  // Use SvelteKit's page store to get current path
  $: currentPath = $page.url.pathname;
</script>

<header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
  <nav class="flex items-center gap-4">
    <a 
      href="/"
      class={currentPath === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      Home
    </a>
    <a 
      href="/about"
      class={currentPath.startsWith('/about') ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      About
    </a>
  </nav>
</header>