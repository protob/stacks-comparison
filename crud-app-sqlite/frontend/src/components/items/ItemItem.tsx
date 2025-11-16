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
      case 'high': return 'bg-red-900/50 text-red-300 border border-red-800';
      case 'mid': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
      case 'low': return 'bg-green-900/50 text-green-300 border border-green-800';
      default: return 'bg-neutral-700 text-neutral-400';
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
    <div className="p-4 bg-neutral-800 border border-neutral-700 rounded">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start flex-1 min-w-0 gap-3">
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={handleToggleComplete}
            className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600 focus:ring-blue-500 focus:ring-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 
                className={clsx(
                  'font-medium text-lg',
                  item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'
                )}
              >
                {item.name}
              </h3>
              <span 
                className={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  getPriorityClass(item.priority)
                )}
              >
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </span>
            </div>
            
            <p 
              className={clsx(
                'text-sm mb-3',
                item.isCompleted ? 'line-through text-neutral-600' : 'text-neutral-400'
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
                      className="px-2 py-1 bg-neutral-700 rounded text-neutral-400 text-xs"
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
            className="text-red-400 hover:text-red-300"
            aria-label="Delete item"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemItem;