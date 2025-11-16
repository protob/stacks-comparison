import { useUiStore } from '../../stores/useUiStore'
import { Icon } from './Icon'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUiStore()

  return (
    <button onClick={toggleTheme} className="p-3 rounded-radius-md bg-surface-hover">
      {theme === 'dark' ? <Icon name="Sun" className="text-primary w-5 h-5" /> : <Icon name="Moon" className="text-primary w-5 h-5" />}
    </button>
  )
}
