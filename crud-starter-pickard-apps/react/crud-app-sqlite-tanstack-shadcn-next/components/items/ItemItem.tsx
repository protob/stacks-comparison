'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Item } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useItemsApi } from '@/hooks/useItemsApi';

interface ItemItemProps {
  item: Item;
  onEdit?: (item: Item) => void;
  showActions?: boolean;
}

export function ItemItem({ item, onEdit, showActions = true }: ItemItemProps) {
  const { deleteItemMutation } = useItemsApi();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItemMutation.mutate(item.id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight truncate group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          <Badge className={`shrink-0 ${getPriorityColor(item.priority)}`}>
            {item.priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="truncate max-w-[120px]">{item.category}</span>
            <span className="shrink-0">{formatDate(item.createdAt)}</span>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/items/${item.categorySlug}/${item.slug}`}>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="size-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit?.(item)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDelete}
                disabled={deleteItemMutation.isPending}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}