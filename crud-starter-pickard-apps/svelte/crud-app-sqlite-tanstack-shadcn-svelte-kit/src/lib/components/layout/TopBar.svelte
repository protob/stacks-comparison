<script lang="ts">
  // Received from +layout.svelte via $page store
  let { currentPath = '/' } = $props();
</script>

<header class="flex items-center justify-end pb-4 mb-4 border-b border-border">
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