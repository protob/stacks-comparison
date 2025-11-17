import { Link } from '@tanstack/react-router';
import type { Item } from '@/types';
import { formatDate } from '@/utils/helpers';
import { Button } from '@/components/ui/button';

interface ItemItemProps {
  item: Item;
  onToggleComplete: (item: Item) => void;
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
}

const priorityClasses: { [key in Item['priority']]: string } = {
  high: 'bg-danger text-text-inverse',
  mid: 'bg-primary text-text-inverse',
  low: 'bg-surface-hover text-text-secondary',
};

export default function ItemItem({ item, onToggleComplete, onDelete, onEdit }: ItemItemProps) {
  return (
    <div className={`p-card bg-surface rounded-card shadow-sm transition-opacity ${item.isCompleted ? 'opacity-50' : ''}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => onToggleComplete(item)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Link to="/items/$categorySlug/$itemSlug" params={{ categorySlug: item.categories[0], itemSlug: item.slug }}>
                    <h3 className="text-size-base font-bold hover:underline">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className={`tag-sm rounded-button ${priorityClasses[item.priority]}`}>
                    {item.priority}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>✏️</Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(item)} className="text-destructive">🗑️</Button>
                </div>
              </div>
              <p className="text-text-secondary text-size-sm mt-1">{item.text}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  {item.tags?.map(tag => (
                    <span key={tag} className="tag-sm bg-surface-hover text-text-secondary rounded-button">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-text-muted text-size-xs">{formatDate(item.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }