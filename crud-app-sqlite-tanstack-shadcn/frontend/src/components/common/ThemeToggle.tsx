import { Moon, Sun } from 'lucide-react';
import { useUiStore } from '@/stores/useUiStore';
import { Button } from './Button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-text-muted hover:text-text-primary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};
