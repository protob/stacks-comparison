<script lang="ts">
  export let currentPath = '';

  function navigate(path: string) {
    // Dispatch navigate event to parent
    dispatch('navigate', { path });
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
  <nav class="flex items-center gap-4">
    <button 
      onclick={() => navigate('/')}
      class={currentPath === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      Home
    </button>
    <button 
      onclick={() => navigate('/about')}
      class={currentPath === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      About
    </button>
  </nav>
</header>