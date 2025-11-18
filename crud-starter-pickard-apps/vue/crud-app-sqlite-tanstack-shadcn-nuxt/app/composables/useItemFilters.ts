import type { ItemTree, Item, Priority } from "@/types";

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: "all" | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: Ref<ItemTree | undefined>, filters: Ref<FilterOptions>) {
  const allTags = computed(() => {
    if (!itemTree.value) return [];

    const tags = new Set<string>();
    Object.values(itemTree.value).forEach((items) => {
      items.forEach((item) => {
        item.tags?.forEach((tag) => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  });

  const hasActiveFilters = computed(() => {
    return (
      filters.value.searchQuery.trim() !== "" ||
      filters.value.selectedPriority !== "all" ||
      !filters.value.showCompleted ||
      filters.value.selectedTags.length > 0
    );
  });

  const filteredItemTree = computed(() => {
    if (!itemTree.value) return {};

    const filtered: Record<string, Item[]> = {};

    Object.entries(itemTree.value).forEach(([categoryName, items]) => {
      const filteredItems = items.filter((item) => {
        if (filters.value.searchQuery.trim()) {
          const query = filters.value.searchQuery.toLowerCase();
          const matchesSearch =
            item.name.toLowerCase().includes(query) || item.text.toLowerCase().includes(query) || item.tags?.some((tag) => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        if (filters.value.selectedPriority !== "all" && item.priority !== filters.value.selectedPriority) {
          return false;
        }

        if (!filters.value.showCompleted && item.isCompleted) {
          return false;
        }

        if (filters.value.selectedTags.length > 0) {
          const hasMatchingTag = filters.value.selectedTags.some((selectedTag) => item.tags?.includes(selectedTag));
          if (!hasMatchingTag) return false;
        }

        return true;
      });

      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });

    return filtered;
  });

  const clearFilters = () => {
    filters.value = {
      searchQuery: "",
      selectedPriority: "all",
      showCompleted: true,
      selectedTags: [],
    };
  };

  return {
    allTags,
    hasActiveFilters,
    filteredItemTree,
    clearFilters,
  };
}
