import { splitProps } from 'solid-js';
import Button from '../common/Button';
import type { Item, Priority } from '@/types';

interface ItemItemProps {
  item: Item;
  onToggleComplete: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemItem = (props: ItemItemProps) => {
  const [local, _] = splitProps(props, ['item', 'onToggleComplete', 'onEdit', 'onDelete']);

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-900/50 text-red-300 border border-red-800';
      case 'mid': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
      case 'low': return 'bg-green-900/50 text-green-300 border border-green-800';
      default: return 'bg-neutral-700 text-neutral-400';
    }
  };

  const handleToggleComplete = () => {
    local.onToggleComplete(local.item);
  };

  const handleEdit = () => {
    local.onEdit(local.item);
  };

  const handleDelete = () => {
    local.onDelete(local.item);
  };

  return (
    <div class="p-4 bg-neutral-800 border border-neutral-700 rounded">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start flex-1 min-w-0 gap-3">
          <input
            type="checkbox"
            checked={local.item.isCompleted}
            onChange={handleToggleComplete}
            class="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600 focus:ring-blue-500 focus:ring-1"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <h3 
                class={clsx(
                  'font-medium text-lg',
                  local.item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'
                )}
              >
                {local.item.name}
              </h3>
              <span 
                class={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  getPriorityClass(local.item.priority)
                )}
              >
                {local.item.priority.charAt(0).toUpperCase() + local.item.priority.slice(1)}
              </span>
            </div>
            
            <p 
              class={clsx(
                'text-sm mb-3',
                local.item.isCompleted ? 'line-through text-neutral-600' : 'text-neutral-400'
              )}
            >
              {local.item.text || 'No description provided.'}
            </p>
            
            <Show when={local.item.tags?.length > 0}>
              <div class="max-h-16 overflow-y-auto scrollbar-thin">
                <div class="flex flex-wrap gap-1">
                  <For each={local.item.tags}>
                    {(tag) => (
                      <span class="px-2 py-1 bg-neutral-700 rounded text-neutral-400 text-xs">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
        
        <div class="flex gap-1">
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
            class="text-red-400 hover:text-red-300"
            aria-label="Delete item"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemItem;