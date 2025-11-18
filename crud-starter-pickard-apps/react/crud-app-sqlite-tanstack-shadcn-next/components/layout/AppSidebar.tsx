'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, List, Info } from 'lucide-react';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-[calc(100vh-2rem)] m-4 rounded-xl shadow-sm sticky top-4">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <List className="size-6 text-primary" />
          Items App
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <List className="size-4" />
          All Items
        </Link>
        <Link href="/about" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <Info className="size-4" />
          About
        </Link>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </div>
  );
}