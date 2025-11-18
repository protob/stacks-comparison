'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Moon, Sun, Search, Tag, List } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useFilterStore } from '@/stores/useFilterStore';
import { useGetItemTree } from '@/hooks/useItemsApi';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Connect to Store & Data
  const { searchQuery, setSearchQuery, selectedTags, toggleTag } = useFilterStore();
  const { data: itemTree } = useGetItemTree();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tags locally for sidebar display
  const allTags = useMemo(() => {
    if (!itemTree) return [];
    const tags = new Set<string>();
    Object.values(itemTree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [itemTree]);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* App Header */}
      <div className="p-6 border-b border-border h-14 flex items-center">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <List className="size-6 text-primary" />
          Items App
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Search
          </h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Tags Section */}
        {allTags.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Tag className="size-3" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full transition-all border",
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background hover:bg-accent text-muted-foreground border-input"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Theme Toggle */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted ? (
            theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />
          ) : (
            <div className="size-4" />
          )}
          <span className="capitalize">{mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Toggle Theme'}</span>
        </Button>
      </div>
    </aside>
  );
}