import { useMemo, useState } from 'react';
import type { Item, Priority } from '@/types';

export function useItemFilters(items: Item[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Priority filter
      if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedPriority]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedPriority !== 'all';

  return {
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    filteredItems,
    hasActiveFilters,
  };
}