// src/lib/utils/themeUpdater.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Access theme via the effect derived from the store state
    $effect(() => {
      const theme = uiStore.theme;
      const html = document.documentElement;
      
      if (theme === 'system') {
        const isDark = media.matches;
        if (isDark) html.classList.add('dark');
        else html.classList.remove('dark');
      } else if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });

    const mediaListener = () => {
      if (uiStore.theme === 'system') {
        const html = document.documentElement;
        if (media.matches) html.classList.add('dark');
        else html.classList.remove('dark');
      }
    };

    media.addEventListener('change', mediaListener);

    return () => {
      media.removeEventListener('change', mediaListener);
    };
  });
}