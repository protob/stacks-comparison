// frontends/solid/src/hooks/useItemFilters.ts
import { createMemo } from 'solid-js';
import type { Item, Priority, ItemTree } from '@/types';

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTreeGetter: () => ItemTree, filtersAccessor: () => FilterOptions) {

  const itemTree = createMemo(() => {
    const tree = itemTreeGetter();
    return tree;
  });

  const _allTags = createMemo(() => { // Renamed to avoid conflict in return
    const tree = itemTree();
    const tags = new Set<string>();
    Object.values(tree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  });

  const _hasActiveFilters = createMemo(() => { // Renamed
    const currentFilters = filtersAccessor();
    return currentFilters.searchQuery.trim() !== '' ||
           currentFilters.selectedPriority !== 'all' ||
           currentFilters.showCompleted || // Corrected: showCompleted means filter is active if true
           currentFilters.selectedTags.length > 0;
  });

  const _filteredItemTree = createMemo(() => { // Renamed
    const tree = itemTree();
    const currentFilters = filtersAccessor();
    
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(tree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        if (currentFilters.searchQuery.trim()) {
          const query = currentFilters.searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            (item.text && item.text.toLowerCase().includes(query)) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        if (currentFilters.selectedPriority !== 'all' && item.priority !== currentFilters.selectedPriority) {
          return false;
        }

        if (!currentFilters.showCompleted && item.isCompleted) {
          return false;
        }

        if (currentFilters.selectedTags.length > 0) {
          const hasSelectedTag = currentFilters.selectedTags.some(tag => 
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
  });

  const _totalItems = createMemo(() => { // Renamed
    return Object.values(itemTree()).reduce((total, items) => total + items.length, 0);
  });

  const _totalFilteredItems = createMemo(() => { // Renamed
    return Object.values(_filteredItemTree()).reduce((total, items) => total + items.length, 0);
  });

  // Return the accessors directly
  return {
    allTags: _allTags,
    hasActiveFilters: _hasActiveFilters,
    filteredItemTree: _filteredItemTree,
    totalItems: _totalItems,
    totalFilteredItems: _totalFilteredItems,
  };
}