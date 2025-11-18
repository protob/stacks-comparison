import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { NotificationType, Item } from "@/types";

export const useUiStore = defineStore("ui", () => {
  const colorMode = useColorMode();

  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null);

  const isDark = computed(() => colorMode.value === "dark");

  const showNotification = (type: NotificationType, message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || (item ? item.categories[0] : null);
  };

  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    isDark,
    isFormOpen,
    editingItem,
    preselectedCategory,
    showNotification,
    toggleTheme,
    openForm,
    closeForm,
  };
});
