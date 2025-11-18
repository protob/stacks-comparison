import { defineStore } from "pinia";
import type { Priority } from "@/types";

export const useFilterStore = defineStore("filter", () => {
  const searchQuery = ref("");
  const selectedPriority = ref<"all" | Priority>("all");
  const showCompleted = ref(false);
  const selectedTags = ref<string[]>([]);

  const hasActiveFilters = computed(() => {
    return searchQuery.value.trim() !== "" || selectedPriority.value !== "all" || selectedTags.value.length > 0;
  });

  const clearFilters = () => {
    searchQuery.value = "";
    selectedPriority.value = "all";
    showCompleted.value = false;
    selectedTags.value = [];
  };

  return {
    searchQuery,
    selectedPriority,
    showCompleted,
    selectedTags,
    hasActiveFilters,
    clearFilters,
  };
});
