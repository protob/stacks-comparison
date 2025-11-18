import { useMemo, useState } from 'react';
import { useFilterStore } from '@/stores/useFilterStore';
import { ItemTree } from '@/lib/api/itemApi';
import type { Priority } from '@/types';

export function useItemFilters(itemTree: ItemTree) {
  // Global state from Sidebar
  const { searchQuery, selectedTags } = useFilterStore();
  
  // Local state for Main Page controls
  const [selectedPriority, setSelectedPriority] = useState<'all' | Priority>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  // Calculate all unique tags from tree
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(itemTree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [itemTree]);

  const filteredItemTree = useMemo(() => {
    const filtered: Record<string, any[]> = {};
    
    Object.entries(itemTree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Priority filter
        if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
          return false;
        }

        // Completion status filter
        if (!showCompleted && item.isCompleted) {
          return false;
        }

        // Tag filter
        if (selectedTags.length > 0) {
          const hasSelectedTag = selectedTags.some(tag => 
            item.tags?.includes(tag)
          );
          if (!hasSelectedTag) return false;
        }

        return true;
      });
      
      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });
    
    return filtered;
  }, [itemTree, searchQuery, selectedPriority, showCompleted, selectedTags]);

  const totalItems = useMemo(() => {
    return Object.values(itemTree).reduce((total, items) => total + items.length, 0);
  }, [itemTree]);

  const totalFilteredItems = useMemo(() => {
    return Object.values(filteredItemTree).reduce((total, items) => total + items.length, 0);
  }, [filteredItemTree]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           selectedPriority !== 'all' ||
           !showCompleted ||
           selectedTags.length > 0;
  }, [searchQuery, selectedPriority, showCompleted, selectedTags]);

  return {
    selectedPriority, setSelectedPriority,
    showCompleted, setShowCompleted,
    allTags,
    filteredItemTree,
    totalItems,
    totalFilteredItems,
    hasActiveFilters,
  };
}