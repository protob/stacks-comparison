<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let currentPath: string;

  const dispatch = createEventDispatcher<{ navigate: string }>();

  function navigate(path: string) {
    // Dispatch navigate event to parent
    dispatch('navigate', path);
  }
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