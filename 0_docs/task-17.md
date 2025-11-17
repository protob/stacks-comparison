Of course. Here is a detailed, step-by-step plan with all the necessary code changes to align the Vue.js application with the desired features from the React version and fix the main layout.

This is a comprehensive task list designed for an AI agent to execute flawlessly.

---

### **Task 1: Enhance the UI Store to Handle Pre-selected Categories**

**Objective:** Modify the `uiStore` to manage the state for a pre-selected category when adding a new item. This is the foundation for the new "+" button functionality.

**File to Modify:** `src/stores/uiStore.ts`

**Instructions:**
Replace the entire content of `src/stores/uiStore.ts` with the following code. The changes include adding `preselectedCategory` to the state and updating the `openForm` and `closeForm` actions to manage it.

```typescript
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner'; 
import type { NotificationType, Item } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false);
  const loadingMessage = ref<string | null>(null);
  const theme = useStorage<Theme>('theme', 'system');
  
  // Form state
  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null); // Added state

  const setIsLoading = (status: boolean, message?: string) => {
    isLoading.value = status;
    loadingMessage.value = message || null;
  };

  const showNotification = (type: NotificationType, message: string) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  // Modified openForm to accept an optional category
  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || null;
  };

  // Modified closeForm to reset the new state
  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    isLoading,
    loadingMessage,
    theme,
    isFormOpen,
    editingItem,
    preselectedCategory, // Expose new state
    setIsLoading,
    showNotification,
    setTheme,
    toggleTheme,
    openForm,
    closeForm,
  };
});
```

---

### **Task 2: Update the Item Form to Use the Pre-selected Category**

**Objective:** Make the `ItemForm` component aware of the `preselectedCategory` in the `uiStore` and use it to set the default value for the category input field.

**File to Modify:** `src/components/items/ItemForm.vue`

**Instructions:**
Replace the entire `<script setup>` section of `src/components/items/ItemForm.vue` with the code below. The template section remains unchanged. This change dynamically sets the form's default values based on the store.

```html
<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useAddItem } from '@/composables/useItemsApi';
import { itemFormSchema } from '@/schemas/itemSchema';
import { useUiStore } from '@/stores/uiStore';

const emit = defineEmits<{ close: [] }>();
const { mutate: addItem } = useAddItem();
const uiStore = useUiStore();

const currentTag = ref('');

const form = useForm({
  defaultValues: {
    name: '',
    text: '',
    priority: 'mid' as const,
    tags: [] as string[],
    // Use the preselected category from the store, or a default
    categories: [uiStore.preselectedCategory || 'general'] as [string],
  },
  onSubmit: async ({ value }) => {
    addItem(value, {
      onSuccess: () => emit('close'),
    });
  },
  validatorAdapter: zodValidator(),
});

const addTag = () => {
  const newTag = currentTag.value.trim();
  if (newTag && !form.state.values.tags.includes(newTag)) {
    form.setFieldValue('tags', [...form.state.values.tags, newTag]);
  }
  currentTag.value = '';
};

const removeTag = (tagToRemove: string) => {
  form.setFieldValue('tags', form.state.values.tags.filter(tag => tag !== tagToRemove));
};
</script>

<template>
  <!-- TEMPLATE REMAINS UNCHANGED -->
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>
      
      <form @submit.prevent="form.handleSubmit()" class="space-y-4">
        <!-- Name Field -->
        <form.Field name="name" :validators="{ onChange: itemFormSchema.shape.name }">
          <template #default="{ field }">
            <div>
              <Label>Task Name</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="e.g., Finalize project report"
              />
              <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <!-- Description Field -->
        <form.Field name="text" :validators="{ onChange: itemFormSchema.shape.text }">
          <template #default="{ field }">
            <div>
              <Label>Description</Label>
              <Input
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                placeholder="Add more details about the task..."
              />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
            </div>
          </template>
        </form.Field>

        <!-- Category Field -->
        <form.Field name="categories" :validators="{ onChange: itemFormSchema.shape.categories }">
           <template #default="{ field }">
             <div>
               <Label>Category</Label>
               <Input
                 :model-value="field.state.value[0]"
                 @update:model-value="field.handleChange([$event])"
                 placeholder="e.g., Work"
               />
               <p v-if="field.state.meta.errors.length" class="mt-1 text-sm text-destructive">
                {{ field.state.meta.errors[0] }}
              </p>
             </div>
           </template>
        </form.Field>

        <!-- Priority Field -->
        <form.Field name="priority">
          <template #default="{ field }">
            <div>
              <Label>Priority</Label>
              <RadioGroup
                :model-value="field.state.value"
                @update:model-value="field.handleChange"
                class="flex items-center gap-4 mt-2"
              >
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-low" value="low" />
                  <Label for="p-low">Low</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-mid" value="mid" />
                  <Label for="p-mid">Mid</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="p-high" value="high" />
                  <Label for="p-high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </template>
        </form.Field>

        <!-- Tags Field -->
        <div>
          <Label>Tags</Label>
          <div class="flex items-center gap-2 mt-2">
            <Input
              v-model="currentTag"
              @keydown.enter.prevent="addTag"
              placeholder="Add a tag..."
            />
            <Button type="button" variant="outline" @click="addTag">Add</Button>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <Badge
              v-for="tag in form.state.values.tags"
              :key="tag"
              variant="secondary"
              class="cursor-pointer"
              @click="removeTag(tag)"
            >
              {{ tag }} &times;
            </Badge>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="emit('close')">Cancel</Button>
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
```

---

### **Task 3: Add the "+" Icon Button to the Category Headers**

**Objective:** Display a "+" icon button next to each category title on the main items page. Clicking this button will open the item form with the corresponding category pre-filled.

**File to Modify:** `src/pages/ItemPage.vue`

**Instructions:**
Replace the entire content of `src/pages/ItemPage.vue` with the following. This adds the `Button` component next to the category title and hooks it up to the newly modified `openForm` action.

```html
<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemTree } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';
import { useUiStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';

const { data: itemTree, isLoading, error } = useItemTree();
const uiStore = useUiStore();

const filters = ref({
  searchQuery: '',
  selectedPriority: 'all' as const,
  showCompleted: true,
  selectedTags: [],
});

const { filteredItemTree, allTags, hasActiveFilters, clearFilters } = useItemFilters(
  computed(() => itemTree.value || {}),
  filters
);
</script>

<template>
  <MainLayout>
    <header class="mb-6">
      <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
      <!-- The main "Add New Item" button remains in the sidebar -->
    </header>

    <FilterBar
      v-model:search="filters.searchQuery"
      v-model:priority="filters.selectedPriority"
      v-model:showCompleted="filters.showCompleted"
      v-model:selectedTags="filters.selectedTags"
      :all-tags="allTags"
      :has-active-filters="hasActiveFilters"
      @clear="clearFilters"
    />

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else class="mt-6 space-y-8">
      <section v-for="(items, category) in filteredItemTree" :key="category">
        <div class="flex items-center gap-2 mb-4">
          <h2 class="font-semibold capitalize text-size-xl">{{ category }}</h2>
          <span class="text-sm text-text-muted">({{ items.length }})</span>
          <!-- Add "+" button here -->
          <Button variant="ghost" size="icon-sm" @click="uiStore.openForm(undefined, category)">
            <icon-lucide-plus class="w-4 h-4" />
          </Button>
        </div>
        <div class="grid gap-4">
          <ItemItem
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
      <div v-if="Object.keys(filteredItemTree).length === 0 && !isLoading" class="py-10 text-center text-text-muted">
        <p>No items found.</p>
        <p v-if="hasActiveFilters">Try adjusting your filters.</p>
      </div>
    </div>

    <!-- The ItemForm is now aware of the pre-selected category -->
    <ItemForm
      v-if="uiStore.isFormOpen"
      @close="uiStore.closeForm"
    />
  </MainLayout>
</template>
```

---

### **Task 4: Implement a Clean Grid-Based Main Layout**

**Objective:** Convert the main application layout from `flexbox` to `CSS Grid` to achieve better structural control and fix the padding/overlap issue, while respecting the existing design tokens.

#### **Step 4.1: Update the Sidebar Component**

**File to Modify:** `src/components/layout/AppSidebar.vue`

**Instructions:**
Remove the fixed-width class `w-72` from the `<aside>` element. The grid layout will now control the sidebar's width via the `--sidebar-width` CSS variable.

```html
<template>
  <!-- REMOVED w-72 from this line -->
  <aside class="flex flex-col p-4 border-r bg-surface border-border">
    <div class="p-2 mb-4">
      <h2 class="text-xl font-bold">TodoApp</h2>
    </div>
...
</template>
```

#### **Step 4.2: Update the Main Layout Component**

**File to Modify:** `src/layouts/MainLayout.vue`

**Instructions:**
Replace the entire content of `src/layouts/MainLayout.vue` with the code below. This implements the `grid` layout and adds `min-w-0` to the `<main>` element, which is the critical fix to prevent content from overflowing its grid cell and causing layout issues.

```html
<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <!-- 
    Layout changed from 'flex' to 'grid'.
    The grid columns are defined by our CSS variable for the sidebar and '1fr' for the main content.
    This provides a robust and token-based layout structure.
  -->
  <div class="grid min-h-screen" style="grid-template-columns: var(--sidebar-width) 1fr;">
    <!-- Sidebar: Width is now controlled by the grid template column -->
    <AppSidebar />

    <!-- 
      Main Content: 
      - 'min-w-0' is crucial. It prevents wide content (like long text without breaks) 
        from pushing past the boundaries of the grid cell, fixing the overlap issue.
      - 'flex-1' is removed as it's a flexbox property.
    -->
    <main class="min-w-0 overflow-y-auto">
      <div class="p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
        <TopBar />
        <div class="flex-1">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
```