'use client';

import Link from 'next/link';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Item } from '@/types';
import { useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';
import { slugify } from '@/utils/slugify';

interface ItemItemProps {
  item: Item;
}

export function ItemItem({ item }: ItemItemProps) {
  const toggleCompletion = useToggleItemCompletion();
  const deleteItem = useDeleteItem();
  const categorySlug = slugify(item.categories[0]);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem.mutate({ categorySlug, itemSlug: item.slug });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompletion(item);
  };

  const priorityColor = {
    high: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    mid: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    low: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  };

  return (
    <Link 
      href={`/items/${categorySlug}/${item.slug}`}
      className="block group"
    >
      <div className={cn(
        "p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all",
        item.isCompleted && "opacity-60"
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <button 
              onClick={handleToggle}
              className="mt-1 text-muted-foreground hover:text-primary transition-colors"
            >
              {item.isCompleted ? (
                <CheckCircle className="size-5 text-green-500" />
              ) : (
                <Circle className="size-5" />
              )}
            </button>
            
            <div className="space-y-1">
              <h3 className={cn(
                "font-medium text-foreground",
                item.isCompleted && "line-through text-muted-foreground"
              )}>
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.text}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide",
                  priorityColor[item.priority]
                )}>
                  {item.priority}
                </span>
                {item.tags?.map(tag => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}