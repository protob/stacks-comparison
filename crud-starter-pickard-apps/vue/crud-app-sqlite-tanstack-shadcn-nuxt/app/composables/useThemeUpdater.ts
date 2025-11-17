import { useUiStore } from '@/stores/uiStore';

export function useThemeUpdater() {
  const uiStore = useUiStore();
  const colorMode = useColorMode();

  watch(
    () => uiStore.theme,
    (newTheme) => {
      colorMode.preference = newTheme;
    },
    { immediate: true }
  );
}