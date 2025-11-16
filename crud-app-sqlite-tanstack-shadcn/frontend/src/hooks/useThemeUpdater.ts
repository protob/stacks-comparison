import { useUiStore } from '@/stores/useUiStore';
import { useEffect } from 'react';

/**
 * A hook that listens to the theme state in the UI store and applies
 * the corresponding 'dark' class to the root <html> element.
 */
export function useThemeUpdater() {
  const theme = useUiStore(state => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  }, [theme]);
}