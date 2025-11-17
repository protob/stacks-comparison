# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** pon, 17 lis 2025, 23:21:48 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/vue/crud-app-sqlite-tanstack-shadcn-nuxt

---

## `components/items/ItemForm.vue`
```
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
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>
      
      <form @submit.prevent="form.handleSubmit()" class="space-y-4">
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

        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" @click="emit('close')">Cancel</Button>
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
```

## `components/items/ItemItem.vue`
```
<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useUpdateItem, useDeleteItem } from '@/composables/useItemsApi';
import { formatDate } from '@/utils/helpers';
import { useUiStore } from '@/stores/uiStore';
import type { Item } from '@/types';

const props = defineProps<{ item: Item }>();

const { mutate: updateItem } = useUpdateItem();
const { mutate: deleteItem } = useDeleteItem();
const uiStore = useUiStore();

const toggleComplete = () => {
  updateItem({
    id: props.item.id,
    payload: { isCompleted: !props.item.isCompleted },
  });
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    deleteItem(props.item.id);
  }
};
</script>

<template>
  <Card :class="{ 'opacity-60': item.isCompleted }">
    <CardContent class="flex items-start gap-4 p-4">
      <Checkbox
        :checked="item.isCompleted"
        @update:checked="toggleComplete"
        class="mt-1"
      />
      <div class="flex-1">
        <div class="flex items-center justify-between">
            <h3 
              class="font-semibold text-size-lg"
              :class="{ 'line-through text-text-muted': item.isCompleted }"
            >
              {{ item.name }}
            </h3>
             <Badge :class="`tag-priority-${item.priority} tag-sm`" variant="outline">
               {{ item.priority }}
             </Badge>
        </div>
        <p class="mb-3 text-text-secondary">{{ item.text }}</p>

        <div class="flex items-center justify-between">
            <p class="text-xs text-text-muted">{{ formatDate(item.createdAt) }}</p>
            <div class="flex gap-2">
                <Button size="sm" variant="ghost" @click="uiStore.openForm(item)">
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" @click="handleDelete">
                    <Icon name="lucide:trash-2" class="w-4 h-4" />
                </Button>
            </div>
        </div>

        <div class="flex gap-2 mt-3">
          <Badge v-for="tag in item.tags" :key="tag" variant="secondary">{{ tag }}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
```

## `components/layout/TopBar.vue`
```
<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header class="flex items-center justify-end pb-4 mb-4 border-b border-border">
    <nav class="flex items-center gap-4">
      <NuxtLink 
        to="/" 
        :class="route.path === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        Home
      </NuxtLink>
      <NuxtLink 
        to="/about" 
        :class="route.path === '/about' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'"
      >
        About
      </NuxtLink>
    </nav>
  </header>
</template>
```

## `components/layout/AppSidebar.vue`
```
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUiStore } from '@/stores/uiStore';

const searchQuery = ref('');
const allTags = ref(['project', 'personal', 'work']);
const selectedTags = ref<string[]>([]);

const uiStore = useUiStore();

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};
</script>

<template>
  <aside class="flex flex-col p-4 border-r bg-surface border-border">
    <div class="p-2 mb-4">
      <h2 class="text-xl font-bold">TodoApp</h2>
    </div>

    <div class="flex-1 space-y-4">
      <div class="px-2">
        <Input v-model="searchQuery" placeholder="Search tasks..." />
      </div>

      <Separator />

      <div class="px-2">
        <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            :variant="selectedTags.includes(tag) ? 'default' : 'outline'"
            size="sm"
            class="rounded-full"
          >
            {{ tag }}
          </Button>
        </div>
      </div>

      <div class="px-2 mt-4">
        <Button class="w-full" @click="uiStore.openForm()">
          + Add Item
        </Button>
      </div>
    </div>

    <div class="mt-auto">
      <Button variant="ghost" @click="uiStore.toggleTheme()" class="justify-start w-full">
        <Icon v-if="!uiStore.isDark" name="lucide:sun" class="w-4 h-4" />
        <Icon v-else name="lucide:moon" class="w-4 h-4" />
      </Button>
    </div>
  </aside>
</template>
```

## `components/layout/FilterBar.vue`
```
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

defineProps<{
  priority: string;
  showCompleted: boolean;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  'update:priority': [value: string];
  'update:showCompleted': [value: boolean];
  'clear': [];
}>();
</script>

<template>
  <div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Label class="block mb-2">Priority</Label>
        <RadioGroup
          :model-value="priority"
          @update:model-value="emit('update:priority', $event as string)"
          class="flex items-center gap-4"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-all" value="all" />
            <Label for="r-all">All</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-low" value="low" />
            <Label for="r-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-mid" value="mid" />
            <Label for="r-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r-high" value="high" />
            <Label for="r-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label class="block mb-2">Status</Label>
        <div class="flex items-center gap-2">
          <Checkbox
            id="show-completed"
            :checked="showCompleted"
            @update:checked="emit('update:showCompleted', $event as boolean)"
          />
          <Label for="show-completed">Show Completed</Label>
        </div>
      </div>
    </div>

    <Button
      v-if="hasActiveFilters"
      variant="ghost"
      size="sm"
      @click="emit('clear')"
      class="mt-4"
    >
      Clear Filters
    </Button>
  </div>
</template>
```

## `tsconfig.json`
```
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}

```

## `lib/utils.ts`
```
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## `package.json`
```
{
  "name": "shadcn-simple-nuxt",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@nuxt/icon": "2.1.0",
    "@pinia/nuxt": "0.11.3",
    "@tanstack/vue-query": "^5.91.2",
    "@vueuse/core": "^14.0.0",
    "@vueuse/nuxt": "14.0.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-vue-next": "^0.553.0",
    "nuxt": "^4.2.1",
    "pinia": "^3.0.4",
    "radix-vue": "^1.9.17",
    "reka-ui": "^2.6.0",
    "shadcn-nuxt": "2.3.3",
    "tailwind-merge": "^3.4.0",
    "vue": "^3.5.24",
    "vue-router": "^4.6.3",
    "vue-sonner": "^2.0.9"
  },
  "devDependencies": {
    "@peterbud/nuxt-query": "^1.2.0",
    "@tailwindcss/vite": "^4.1.17",
    "tailwindcss": "^4.1.17",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5.9.3"
  }
}

```

## `utils/slugify.ts`
```
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

## `utils/helpers.ts`
```
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
```

## `stores/uiStore.ts`
```
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import type { NotificationType, Item } from '@/types';

type Theme = 'light' | 'dark' | 'system';

export const useUiStore = defineStore('ui', () => {
  const theme = useStorage<Theme>('theme', 'system');
  
  const isFormOpen = ref(false);
  const editingItem = ref<Item | null>(null);
  const preselectedCategory = ref<string | null>(null);

  const isDark = computed(() => theme.value === 'dark');

  const showNotification = (type: NotificationType, message: string) => {
    switch (type) {
      case 'success': toast.success(message); break;
      case 'error': toast.error(message); break;
      case 'warning': toast.warning(message); break;
      case 'info': toast.info(message); break;
      default: toast(message);
    }
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  const openForm = (item?: Item, category?: string) => {
    isFormOpen.value = true;
    editingItem.value = item || null;
    preselectedCategory.value = category || (item ? item.categorySlug : null);
  };

  const closeForm = () => {
    isFormOpen.value = false;
    editingItem.value = null;
    preselectedCategory.value = null;
  };

  return {
    theme,
    isFormOpen,
    editingItem,
    preselectedCategory,
    isDark,
    showNotification,
    toggleTheme,
    openForm,
    closeForm,
  };
});
```

## `stores/itemStore.ts`
```
import { defineStore } from 'pinia';

export const useItemStore = defineStore('item', () => {
  const clientOnlyState = ref('Ready');

  const setClientOnlyState = (value: string) => {
    clientOnlyState.value = value;
  };

  return {
    clientOnlyState,
    setClientOnlyState,
  };
});
```

## `layouts/default.vue`
```
<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <div class="grid min-h-screen" style="grid-template-columns: var(--sidebar-width) 1fr;">
    <AppSidebar />
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

## `README.md`
```
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

## `schemas/itemSchema.ts`
```
import { z } from 'zod';
import type { SingleCategory } from '@/types';

export const itemFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z.string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high']),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]) as z.ZodType<SingleCategory<string>>,
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
```

## `composables/useItemFilters.ts`
```
import type { ItemTree, Item, Priority } from '@/types';

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: Ref<ItemTree>, filters: Ref<FilterOptions>) {
  const allTags = computed(() => {
    const tags = new Set<string>();
    Object.values(itemTree.value).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  });

  const hasActiveFilters = computed(() => {
    return filters.value.searchQuery.trim() !== '' ||
           filters.value.selectedPriority !== 'all' ||
           !filters.value.showCompleted ||
           filters.value.selectedTags.length > 0;
  });

  const filteredItemTree = computed(() => {
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(itemTree.value).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        if (filters.value.searchQuery.trim()) {
          const query = filters.value.searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        if (filters.value.selectedPriority !== 'all' && item.priority !== filters.value.selectedPriority) {
          return false;
        }

        if (!filters.value.showCompleted && item.isCompleted) {
          return false;
        }

        if (filters.value.selectedTags.length > 0) {
          const hasMatchingTag = filters.value.selectedTags.some(selectedTag =>
            item.tags?.includes(selectedTag)
          );
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
      searchQuery: '',
      selectedPriority: 'all',
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
```

## `composables/useThemeUpdater.ts`
```
import { useUiStore } from '@/stores/uiStore';

export function useThemeUpdater() {
  const uiStore = useUiStore();
  const colorMode = useColorMode();

  watch(
    () => uiStore.theme,
    (newTheme) => {
      colorMode.preference = newTheme;
    },
    { immediate: true }
  );
}
```

## `composables/useItemsApi.ts`
```
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getItemTree, getItemBySlug, createItem, updateItem, deleteItem } from '@/api/itemApi';
import { useUiStore } from '@/stores/uiStore';
import type { CreateItemPayload, UpdateItemPayload } from '@/types';

export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

export function useItemTree() {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
  });
}

export function useItemDetail(categorySlug: Ref<string>, itemSlug: Ref<string>) {
  return useQuery({
    queryKey: computed(() => itemKeys.detail(categorySlug.value, itemSlug.value)),
    queryFn: () => getItemBySlug(categorySlug.value, itemSlug.value),
    enabled: computed(() => !!categorySlug.value && !!itemSlug.value),
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to create item');
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateItemPayload }) =>
      updateItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to update item');
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const uiStore = useUiStore();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message || 'Failed to delete item');
    },
  });
}
```

## `types/index.ts`
```
export type Priority = 'low' | 'mid' | 'high';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type SingleCategory<T = number> = [T];

export interface Item {
  id: number;
  name: string;
  text: string;
  priority: Priority;
  isCompleted: boolean;
  slug: string;
  tags?: string[];
  categories: SingleCategory<number>;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export interface UpdateItemPayload extends Partial<CreateItemPayload> {
  isCompleted?: boolean;
}

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };
```

## `app/components/ui/button/Button.vue`
```
<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>

```

## `app/components/ui/button/index.ts`
```
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        "default": "h-9 px-4 py-2 has-[>svg]:px-3",
        "sm": "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>

```

## `app/components/ui/checkbox/Checkbox.vue`
```
<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn('peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
         props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Check class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

```

## `app/components/ui/checkbox/index.ts`
```
export { default as Checkbox } from "./Checkbox.vue"

```

## `app/components/ui/label/Label.vue`
```
<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Label } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>

```

## `app/components/ui/label/index.ts`
```
export { default as Label } from "./Label.vue"

```

## `app/components/ui/input/Input.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
  >
</template>

```

## `app/components/ui/input/index.ts`
```
export { default as Input } from "./Input.vue"

```

## `app/components/ui/sonner/Sonner.vue`
```
<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-vue-next"
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>

```

## `app/components/ui/sonner/index.ts`
```
export { default as Toaster } from "./Sonner.vue"

```

## `app/components/ui/dialog/DialogDescription.vue`
```
<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogDescription, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwardedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>

```

## `app/components/ui/dialog/DialogClose.vue`
```
<script setup lang="ts">
import type { DialogCloseProps } from "reka-ui"
import { DialogClose } from "reka-ui"

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <DialogClose
    data-slot="dialog-close"
    v-bind="props"
  >
    <slot />
  </DialogClose>
</template>

```

## `app/components/ui/dialog/DialogScrollContent.vue`
```
<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
            props.class,
          )
        "
        v-bind="{ ...$attrs, ...forwarded }"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          class="absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
        >
          <X class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

```

## `app/components/ui/dialog/DialogTrigger.vue`
```
<script setup lang="ts">
import type { DialogTriggerProps } from "reka-ui"
import { DialogTrigger } from "reka-ui"

const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <DialogTrigger
    data-slot="dialog-trigger"
    v-bind="props"
  >
    <slot />
  </DialogTrigger>
</template>

```

## `app/components/ui/dialog/DialogHeader.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="cn('flex flex-col gap-2 text-center sm:text-left', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/dialog/DialogTitle.vue`
```
<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogTitle, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    :class="cn('text-lg leading-none font-semibold', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

```

## `app/components/ui/dialog/Dialog.vue`
```
<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { DialogRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot
    v-slot="slotProps"
    data-slot="dialog"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>

```

## `app/components/ui/dialog/DialogFooter.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/dialog/DialogContent.vue`
```
<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { X } from "lucide-vue-next"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps & { class?: HTMLAttributes["class"], showCloseButton?: boolean }>(), {
  showCloseButton: true,
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )"
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        data-slot="dialog-close"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <X />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

```

## `app/components/ui/dialog/index.ts`
```
export { default as Dialog } from "./Dialog.vue"
export { default as DialogClose } from "./DialogClose.vue"
export { default as DialogContent } from "./DialogContent.vue"
export { default as DialogDescription } from "./DialogDescription.vue"
export { default as DialogFooter } from "./DialogFooter.vue"
export { default as DialogHeader } from "./DialogHeader.vue"
export { default as DialogOverlay } from "./DialogOverlay.vue"
export { default as DialogScrollContent } from "./DialogScrollContent.vue"
export { default as DialogTitle } from "./DialogTitle.vue"
export { default as DialogTrigger } from "./DialogTrigger.vue"

```

## `app/components/ui/dialog/DialogOverlay.vue`
```
<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogOverlay } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80', props.class)"
  >
    <slot />
  </DialogOverlay>
</template>

```

## `app/components/ui/radio-group/RadioGroup.vue`
```
<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RadioGroupRoot
    v-slot="slotProps"
    data-slot="radio-group"
    :class="cn('grid gap-3', props.class)"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>

```

## `app/components/ui/radio-group/RadioGroupItem.vue`
```
<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { CircleIcon } from "lucide-vue-next"
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="relative flex items-center justify-center"
    >
      <slot>
        <CircleIcon class="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

```

## `app/components/ui/radio-group/index.ts`
```
export { default as RadioGroup } from "./RadioGroup.vue"
export { default as RadioGroupItem } from "./RadioGroupItem.vue"

```

## `app/components/ui/separator/Separator.vue`
```
<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        props.class,
      )
    "
  />
</template>

```

## `app/components/ui/separator/index.ts`
```
export { default as Separator } from "./Separator.vue"

```

## `app/components/ui/card/CardTitle.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <h3
    data-slot="card-title"
    :class="cn('leading-none font-semibold', props.class)"
  >
    <slot />
  </h3>
</template>

```

## `app/components/ui/card/CardFooter.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center px-6 [.border-t]:pt-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/card/Card.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/card/CardAction.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-action"
    :class="cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/card/CardDescription.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </p>
</template>

```

## `app/components/ui/card/CardContent.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/card/CardHeader.vue`
```
<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', props.class)"
  >
    <slot />
  </div>
</template>

```

## `app/components/ui/card/index.ts`
```
export { default as Card } from "./Card.vue"
export { default as CardAction } from "./CardAction.vue"
export { default as CardContent } from "./CardContent.vue"
export { default as CardDescription } from "./CardDescription.vue"
export { default as CardFooter } from "./CardFooter.vue"
export { default as CardHeader } from "./CardHeader.vue"
export { default as CardTitle } from "./CardTitle.vue"

```

## `app/components/ui/badge/Badge.vue`
```
<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants["variant"]
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

```

## `app/components/ui/badge/index.ts`
```
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
         "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>

```

## `app/lib/utils.ts`
```
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## `app/app.vue`
```
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import { useThemeUpdater } from '@/composables/useThemeUpdater';

useThemeUpdater();
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster position="top-right" rich-colors />
  </div>
</template>

```

## `app/assets/tailwind.css`
```
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

## `app/plugins/ssr-width.ts`
```
import { provideSSRWidth } from '@vueuse/core'
// for shadcn
export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})

```

## `app/plugins/vue-sonner.ts`
```
// plugins/vue-sonner.ts
import { Toaster } from 'vue-sonner'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Toaster', Toaster)
})

```

## `assets/css/main.css`
```
/*
 * MODERNIST DESIGN SYSTEM - Tailwind v4 CSS-First for Todo App
 * Clean, minimal, functional - inspired by Bauhaus & Swiss typography
 * Optimized for Vue with fluid responsiveness, vertical rhythm, proportions
 */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Define layer order for cascade control */
@layer base, components, utilities;

/* ============================================
   BASE CONSTRAINTS - Minimum viewport
   ============================================ */
@layer base {
  html {
    min-width: 320px;
  }

  body {
    min-width: 320px;
  }
}

/* ============================================
   DESIGN TOKENS - Three-tier architecture
   ============================================ */

@theme {
  /* =========================
     1. PRIMITIVE TOKENS - Raw values
     ========================= */

  /* Grayscale Palette - OKLCH for better perceptual uniformity */
  --color-gray-0:   oklch(1.000 0.000 0);      /* Pure white */
  --color-gray-50:  oklch(0.985 0.002 247);
  --color-gray-100: oklch(0.973 0.003 247);
  --color-gray-200: oklch(0.935 0.006 247);
  --color-gray-300: oklch(0.869 0.010 247);
  --color-gray-400: oklch(0.707 0.015 247);
  --color-gray-500: oklch(0.539 0.018 247);
  --color-gray-600: oklch(0.428 0.020 247);
  --color-gray-700: oklch(0.321 0.020 247);
  --color-gray-800: oklch(0.215 0.019 247);
  --color-gray-900: oklch(0.141 0.015 247);
  --color-gray-950: oklch(0.075 0.010 247);    /* Near black */

  /* Primary Palette - Blue for trust & professionalism */
  --color-blue-50:  oklch(0.96 0.025 240);  /* Very light blue */
  --color-blue-100: oklch(0.92 0.045 240);
  --color-blue-200: oklch(0.86 0.075 240);
  --color-blue-300: oklch(0.78 0.115 240);
  --color-blue-400: oklch(0.68 0.165 240);
  --color-blue-500: oklch(0.58 0.215 240);
  --color-blue-600: oklch(0.50 0.220 240);
  --color-blue-700: oklch(0.42 0.200 240);
  --color-blue-800: oklch(0.35 0.175 240);
  --color-blue-900: oklch(0.30 0.150 240);

  /* Accent Colors - Semantic use for Todo app */
  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-500: oklch(0.647 0.190 142);
  --color-green-600: oklch(0.519 0.195 142);

  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-500:  oklch(0.637 0.237 27);
  --color-red-600:  oklch(0.577 0.237 27);

  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);

  /* Typography Scale - Modular (1.2 ratio) - Fluid with clamp for auto scaling */
  --font-size-xs:   clamp(0.625rem, 0.6rem + 0.125vw, 0.694rem);     /* 10-11px */
  --font-size-sm:   clamp(0.75rem, 0.72rem + 0.14vw, 0.833rem);      /* 12-13px */
  --font-size-base: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);        /* 14-16px */
  --font-size-lg:   clamp(1.05rem, 0.99rem + 0.3vw, 1.2rem);         /* 17-19px */
  --font-size-xl:   clamp(1.26rem, 1.188rem + 0.36vw, 1.44rem);      /* 20-23px */
  --font-size-2xl:  clamp(1.512rem, 1.425rem + 0.435vw, 1.728rem);   /* 24-28px */
  --font-size-3xl:  clamp(1.814rem, 1.71rem + 0.52vw, 2.074rem);     /* 29-33px */
  --font-size-4xl:  clamp(2.177rem, 2.052rem + 0.625vw, 2.488rem);   /* 35-40px */
  --font-size-5xl:  clamp(2.612rem, 2.462rem + 0.75vw, 2.986rem);    /* 42-48px */

  /* Spacing - Custom Fluid Scale */
  --spacing-fluid-4: clamp(1rem, 0.8rem + 1vw, 2rem);
  --spacing-fluid-6: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  --spacing-fluid-8: clamp(2rem, 1.6rem + 2vw, 4rem);
  
  /* Layout */
  --sidebar-width: clamp(200px, 15vw, 280px);
}

/* ============================================
   CSS CUSTOM PROPERTIES
   ============================================ */

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.145 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.145 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.145 0 0);
  
  /* Custom Semantic Tokens */
  --color-text-primary: oklch(0.141 0.015 247);
  --color-text-secondary: oklch(0.428 0.020 247);
  --color-text-muted: oklch(0.539 0.018 247);
  --color-surface: oklch(0.985 0.002 247);
  --color-priority-mid-bg: oklch(0.987 0.021 91);
  --color-priority-mid-text: oklch(0.659 0.181 75);
  --color-success-light: oklch(0.971 0.018 142);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.922 0 0);

  /* Custom Semantic Tokens */
  --color-text-primary: oklch(0.985 0.002 247);
  --color-text-secondary: oklch(0.707 0.015 247);
  --color-text-muted: oklch(0.539 0.018 247);
  --color-surface: oklch(0.215 0.019 247);
  --color-priority-mid-bg: oklch(0.769 0.183 84);
  --color-priority-mid-text: oklch(0.075 0.010 247);
  --color-success-light: oklch(0.519 0.195 142 / 20%);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}

@layer utilities {
  .text-size-xs { font-size: var(--font-size-xs); }
  .text-size-sm { font-size: var(--font-size-sm); }
  .text-size-base { font-size: var(--font-size-base); }
  .text-size-lg { font-size: var(--font-size-lg); }
  .text-size-xl { font-size: var(--font-size-xl); }
  .text-size-2xl { font-size: var(--font-size-2xl); }
  .text-size-3xl { font-size: var(--font-size-3xl); }

  .p-fluid-4 { padding: var(--spacing-fluid-4); }
  .p-fluid-6 { padding: var(--spacing-fluid-6); }
  .p-fluid-8 { padding: var(--spacing-fluid-8); }

  .tag-sm {
    display: inline-flex;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    font-size: var(--font-size-xs);
    font-weight: 500;
  }
  
  .tag-priority-low {
    @apply bg-green-500/20 text-green-400 rounded-full;
  }
  .tag-priority-mid {
    background-color: var(--color-priority-mid-bg);
    color: var(--color-priority-mid-text);
    @apply rounded-full;
  }
  .tag-priority-high {
    @apply bg-red-500/20 text-red-400 rounded-full;
  }
}
```

## `pages/about.vue`
```
<template>
  <div class="space-y-6">
    <header>
      <h1 class="font-bold text-size-3xl">About This Application</h1>
    </header>
    
    <div class="p-6 border rounded-lg bg-surface border-border">
      <p class="mb-4 text-text-secondary">
        This is a modern, responsive Nuxt frontend for managing items. It leverages the full power of the TanStack suite and modern tooling for a superior developer experience and a fully type-safe workflow.
      </p>
      
      <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>
      
      <ul class="space-y-2 list-disc list-inside text-text-secondary">
        <li>
          <strong class="font-medium text-text-primary">Nuxt 3:</strong> For building a performant, server-rendered Vue application.
        </li>
        <li>
          <strong class="font-medium text-text-primary">TanStack Query (Vue Query):</strong> Manages all server state, handling data fetching, caching, and synchronization effortlessly.
        </li>
        <li>
          <strong class="font-medium text-text-primary">TanStack Form (Vue Form):</strong> Ensures performant and 100% type-safe forms from validation to submission.
        </li>
        <li>
          <strong class="font-medium text-text-primary">Pinia:</strong> Provides simple and type-safe global state management for client-side UI state.
        </li>
         <li>
          <strong class="font-medium text-text-primary">Shadcn Nuxt:</strong> A collection of beautifully designed, accessible components.
        </li>
        <li>
          <strong class="font-medium text-text-primary">Tailwind CSS:</strong> Powers styling with a custom, token-based, and fluidly responsive design system.
        </li>
      </ul>
    </div>
  </div>
</template>
```

## `pages/items/[categorySlug]/[itemSlug].vue`
```
<script setup lang="ts">
import { useItemDetail } from '@/composables/useItemsApi';
import { formatDate } from '@/utils/helpers';

const route = useRoute();
const router = useRouter();

const categorySlug = computed(() => route.params.categorySlug as string);
const itemSlug = computed(() => route.params.itemSlug as string);

const { data: item, isLoading, error } = useItemDetail(categorySlug, itemSlug);
</script>

<template>
  <div class="container mx-auto p-fluid-6">
    <button @click="router.back()" class="mb-4 text-primary hover:underline">
      ← Back
    </button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="item" class="p-6 rounded-lg bg-surface">
      <h1 class="mb-4 font-bold text-size-2xl">{{ item.name }}</h1>
      <p class="mb-4 text-text-secondary">{{ item.text }}</p>
      <div class="flex items-center gap-2 mb-4">
        <span class="tag-sm" :class="`tag-priority-${item.priority}`">{{ item.priority }}</span>
        <span v-if="item.isCompleted" class="px-2 py-1 text-xs font-medium rounded-full tag-sm bg-success-light">Completed</span>
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {{ formatDate(item.createdAt) }}</p>
        <p>Updated: {{ formatDate(item.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>
```

## `pages/index.vue`
```
<script setup lang="ts">
import { useItemTree, itemKeys } from '@/composables/useItemsApi';
import { useItemFilters } from '@/composables/useItemFilters';
import FilterBar from '@/components/layout/FilterBar.vue';
import ItemItem from '@/components/items/ItemItem.vue';
import ItemForm from '@/components/items/ItemForm.vue';
import { useUiStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { getItemTree } from '@/api/itemApi';

// Data fetching for the page
const { data: itemTree, isLoading, error } = await useAsyncData('itemTree', getItemTree, {
  default: () => ({}),
});
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
  <div>
    <header class="mb-6">
      <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
    </header>

    <FilterBar
      v-model:priority="filters.selectedPriority"
      v-model:showCompleted="filters.showCompleted"
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
          <Button variant="ghost" size="icon-sm" @click="uiStore.openForm(undefined, category)">
            <Icon name="lucide:plus" class="w-4 h-4" />
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

    <ItemForm
      v-if="uiStore.isFormOpen"
      @close="uiStore.closeForm"
    />
  </div>
</template>
```

## `nuxt.config.ts`
```
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/icon', 
    'shadcn-nuxt', 
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@peterbud/nuxt-query'
  ],

  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation', 'useQueryClient'],
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5000,
        },
      },
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  css: ['~/assets/css/main.css'],

  vite: {
    // Note: @tailwindcss/vite is not needed here as the Nuxt Tailwind module handles it.
  },

  alias: {
    '@': '/.',
  }
})
```

## `api/itemApi.ts`
```
import { get, post, patch, del } from './apiClient';
import type { Item, ItemTree, CreateItemPayload, UpdateItemPayload } from '@/types';

export const getItemTree = () => get<ItemTree>('/items/tree');

export const getItemBySlug = (categorySlug: string, itemSlug: string) =>
  get<Item>(`/items/${categorySlug}/${itemSlug}`);

export const createItem = (payload: CreateItemPayload) =>
  post<Item, CreateItemPayload>('/items', payload);

export const updateItem = (id: number, payload: UpdateItemPayload) =>
  patch<Item, UpdateItemPayload>(`/items/${id}`, payload);

export const deleteItem = (id: number) =>
  del<{ deleted: boolean }>(`/items/${id}`);
```

## `api/apiClient.ts`
```
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '@/types';

// In a real app, this would come from an environment variable
const API_URL_BASE = 'http://localhost:3000/api';

export const apiClient = ofetch.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  async onResponseError({ response }) {
    console.error('API Error:', response.status, response._data);
  },
});

const unwrapResult = async <T>(resultPromise: Promise<T>): Promise<T> => {
  try {
    const result = await resultPromise;
    // The actual data is often nested in a 'data' property in standardized APIs
    return (result as any).data || result;
  } catch (error: any) {
    const message = error.data?.message || error.message || 'An unknown error occurred';
    const newError = new Error(message);
    (newError as any).statusCode = error.response?.status || 500;
    (newError as any).details = error.data?.details;
    throw newError;
  }
};

export const get = <T>(endpoint: string) =>
  unwrapResult(apiClient.get<T>(endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(apiClient.post<TResponse>(endpoint, { body: data }));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(apiClient.patch<TResponse>(endpoint, { body: data }));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(apiClient.delete<TResponse>(endpoint));
```

## `components.json`
```
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "assets/css/main.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}

```

