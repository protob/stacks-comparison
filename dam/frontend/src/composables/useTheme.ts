import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    initTheme,
    toggleTheme,
  }
}