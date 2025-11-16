import { useCallback } from 'react';
import clsx from 'clsx';
import Button from '../common/Button';
import type { Item, Priority } from '@/types';

interface ItemItemProps {
  item: Item;
  onToggleComplete: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemItem = ({ item, onToggleComplete, onEdit, onDelete }: ItemItemProps) => {
  const getPriorityClass = useCallback((priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-danger-light text-danger border border-danger';
      case 'mid': return 'bg-warning-light text-warning border border-warning';
      case 'low': return 'bg-success-light text-success border border-success';
      default: return 'bg-surface-hover text-text-muted';
    }
  }, []);

  const handleToggleComplete = useCallback(() => {
    onToggleComplete(item);
  }, [item, onToggleComplete]);

  const handleEdit = useCallback(() => {
    onEdit(item);
  }, [item, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  return (
    <div className="p-card bg-modal-bg border border-modal-border rounded-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start flex-1 min-w-0 gap-component">
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={handleToggleComplete}
            className="mt-1 w-4 h-4 rounded border-border bg-surface text-primary focus:ring-primary focus:ring-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-component mb-2">
              <h3
                className={clsx(
                  'font-medium text-size-lg',
                  item.isCompleted ? 'line-through text-text-muted' : 'text-text-primary'
                )}
              >
                {item.name}
              </h3>
              <span
                className={clsx(
                  'tag-sm rounded-button font-medium',
                  getPriorityClass(item.priority)
                )}
              >
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </span>
            </div>

            <p
              className={clsx(
                'text-size-sm mb-3',
                item.isCompleted ? 'line-through text-text-muted' : 'text-text-secondary'
              )}
            >
              {item.text || 'No description provided.'}
            </p>

            {item.tags?.length > 0 && (
              <div className="max-h-16 overflow-y-auto scrollbar-thin">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-sm bg-surface-hover rounded-button text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="text"
            size="sm"
            onClick={handleEdit}
            icon="Edit3"
            aria-label="Edit item"
          />
          <Button
            variant="text"
            size="sm"
            onClick={handleDelete}
            icon="Trash2"
            className="text-danger hover:text-danger-hover"
            aria-label="Delete item"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemItem;