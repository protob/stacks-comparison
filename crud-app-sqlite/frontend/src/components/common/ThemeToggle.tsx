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
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};
