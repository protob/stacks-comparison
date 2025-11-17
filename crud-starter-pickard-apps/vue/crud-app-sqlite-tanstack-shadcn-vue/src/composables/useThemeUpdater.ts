import { useUiStore } from '@/stores/uiStore';

export function useThemeUpdater() {
  const uiStore = useUiStore();
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  });

  watch(
    () => uiStore.theme,
    (newTheme) => {
      if (newTheme === 'system') {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        isDark.value = newTheme === 'dark';
      }
    },
    { immediate: true }
  );

  return { isDark };
}