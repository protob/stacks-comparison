// src/lib/utils/themeUpdater.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore';
import { get } from 'svelte/store';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme: Theme) {
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
    }

    // initial
    applyTheme(get(uiStore.theme));

    const unsub = uiStore.theme.subscribe((t) => applyTheme(t));

    const mediaListener = () => {
      if (get(uiStore.theme) === 'system') {
        applyTheme('system');
      }
    };

    media.addEventListener('change', mediaListener);

    return () => {
      unsub();
      media.removeEventListener('change', mediaListener);
    };
  });
}