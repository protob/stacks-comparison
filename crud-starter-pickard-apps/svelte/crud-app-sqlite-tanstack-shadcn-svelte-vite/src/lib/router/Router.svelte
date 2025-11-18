<!-- src/lib/router/Router.svelte -->
<script lang="ts">
  import ItemPage from '$lib/pages/ItemPage.svelte';
  import AboutPage from '$lib/pages/AboutPage.svelte';
  import ItemDetailPage from '$lib/pages/ItemDetailPage.svelte';
  import { resolveRoute, navigate as navFn, type Route } from '$lib/router/router';
  import { onMount } from 'svelte';

  let currentRoute: Route = $state(resolveRoute(window.location.pathname));

  function handleNavigate(path: string) {
    navFn(path);
  }

  onMount(() => {
    const handler = (event: PopStateEvent | CustomEvent<string>) => {
      const pathname =
        event instanceof PopStateEvent
          ? window.location.pathname
          : (event.detail as string);
      currentRoute = resolveRoute(pathname);
    };

    window.addEventListener('popstate', handler);
    window.addEventListener('app:navigated', handler as EventListener);

    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('app:navigated', handler as EventListener);
    };
  });
</script>

{#if currentRoute.name === 'home'}
  <ItemPage on:navigate={(e) => handleNavigate(e.detail)} />
{:else if currentRoute.name === 'about'}
  <AboutPage on:navigate={(e) => handleNavigate(e.detail)} />
{:else if currentRoute.name === 'item-detail'}
  <ItemDetailPage
    categorySlug={currentRoute.categorySlug}
    itemSlug={currentRoute.itemSlug}
    on:navigate={(e) => handleNavigate(e.detail)}
  />
{/if}