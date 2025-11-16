import { useUiStore } from '../../stores/useUiStore'
import { Icon } from './Icon'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUiStore()

  return (
    <button onClick={toggleTheme} className="p-2 rounded-radius-md bg-surface-hover">
      {theme === 'dark' ? <Icon name="Sun" className="text-primary" /> : <Icon name="Moon" className="text-primary" />}
    </button>
  )
}
