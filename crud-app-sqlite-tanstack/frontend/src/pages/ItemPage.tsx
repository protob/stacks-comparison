import { useState } from 'react';
import { useGetItemTree } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import ItemItem from '@/components/items/ItemItem';
import { useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';

export default function ItemPage() {
  const { data: itemTree = {}, isLoading, error } = useGetItemTree();
  const [searchQuery, setSearchQuery] = useState('');
  
  // The filter hook can remain as it is pure logic
  const { filteredItemTree, totalFilteredItems } = useItemFilters(itemTree, {
      searchQuery,
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
  });
  
  const toggleItemCompletion = useToggleItemCompletion();
  const deleteItemMutation = useDeleteItem();

  if (isLoading) return <div>Loading items...</div>;
  if (error) return <div className="text-danger">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-border rounded-md"
        />
      </div>
      <p className="text-text-muted">{totalFilteredItems} items found.</p>
      <div className="space-y-6">
        {Object.entries(filteredItemTree).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-size-lg font-bold mb-2 capitalize border-b border-border pb-1">
              {category.replace(/-/g, ' ')}
            </h2>
            <div className="space-y-2">
              {items.map(item => (
                <ItemItem
                  key={item.id}
                  item={item}
                  onToggleComplete={() => toggleItemCompletion(item)}
                  onEdit={() => {}} // Placeholder for now
                  onDelete={() => deleteItemMutation.mutate({ categorySlug: category, itemSlug: item.slug })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}