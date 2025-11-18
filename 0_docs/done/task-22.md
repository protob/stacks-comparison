here is working direcotry `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite`

do `cd /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite`

### Phase 1: Fix Global State (The "Uncaught SyntaxError" Fix)

The current implementation uses Svelte 4 `writable` stores but tries to import them as named exports in `ItemPage.svelte`. We will convert this to a **Svelte 5 Reactive Class**.

#### STEP 1: Rewrite `src/lib/stores/uiStore.ts`
**Action:** Overwrite the file `src/lib/stores/uiStore.ts` with the following code. This changes it to use the `$state` rune.

```typescript
// src/lib/stores/uiStore.ts
import { toast } from 'svelte-sonner';
import type { NotificationType, Item } from '$lib/types';

export type Theme = 'light' | 'dark' | 'system';

class UiStore {
  // State
  theme = $state<Theme>('system');
  isFormOpen = $state(false);
  preselectedCategory = $state<string | null>(null);
  editingItem = $state<Item | null>(null);

  // Actions
  openForm(item?: Item, categorySlug?: string) {
    this.editingItem = item ?? null;
    if (categorySlug) {
      this.preselectedCategory = categorySlug;
    } else if (item?.categorySlug) {
      this.preselectedCategory = item.categorySlug;
    }
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.preselectedCategory = null;
    this.editingItem = null;
  }

  toggleTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else if (this.theme === 'dark') this.theme = 'system';
    else this.theme = 'light';
  }

  showNotification(type: NotificationType, message: string) {
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
      default:
        toast.info(message);
        break;
    }
  }
}

export const uiStore = new UiStore();
```

#### STEP 2: Fix Imports in `src/lib/pages/ItemPage.svelte`
**Action:** Update `src/lib/pages/ItemPage.svelte` to consume the new store correctly.
**Change:** Remove destructured imports from the store. Use `uiStore.isFormOpen` directly.

```svelte
<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { useItemTree } from '$lib/api/itemsQuery';
  import { useItemFilters } from '$lib/utils/useItemFilters';
  import FilterBar from '$lib/components/layout/FilterBar.svelte';
  import ItemItem from '$lib/components/items/ItemItem.svelte';
  import ItemForm from '$lib/components/items/ItemForm.svelte';
  import { uiStore } from '$lib/stores/uiStore'; // <-- Only import the singleton
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import { Plus } from 'lucide-svelte'; // Import icon directly

  const itemTreeQuery = useItemTree();
  const dispatch = createEventDispatcher();

  let filters = $state({
    searchQuery: '',
    selectedPriority: 'all' as const,
    showCompleted: true,
    selectedTags: [] as string[],
  });

  // Use derived for reactive calculations in Svelte 5
  let filterResults = $derived(useItemFilters($itemTreeQuery.data || {}, filters));
  let filteredItemTree = $derived(filterResults.filteredItemTree);
  let allTags = $derived(filterResults.allTags);
  let hasActiveFilters = $derived(filterResults.hasActiveFilters);

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
  }

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout onNavigate={handleNavigate}>
  <header class="mb-6">
    <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
  </header>

  <!-- Bind props using Svelte 5 syntax -->
  <FilterBar
    bind:search={filters.searchQuery}
    bind:priority={filters.selectedPriority}
    bind:showCompleted={filters.showCompleted}
    bind:selectedTags={filters.selectedTags}
    {allTags}
    {hasActiveFilters}
    on:clear={clearFilters}
  />

  {#if $itemTreeQuery.isLoading}
    <div>Loading...</div>
  {:else if $itemTreeQuery.error}
    <div>Error: {$itemTreeQuery.error.message}</div>
  {:else}
    <div class="mt-6 space-y-8">
      {#each Object.entries(filteredItemTree) as [category, items]}
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-semibold capitalize text-size-xl">{category}</h2>
            <span class="text-sm text-text-muted">({items.length})</span>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onclick={() => uiStore.openForm(undefined, category)}
            >
              <Plus class="w-4 h-4" />
            </Button>
          </div>
          <div class="grid gap-4">
            {#each items as item (item.id)}
              <ItemItem {item} />
            {/each}
          </div>
        </section>
      {/each}
      {#if Object.keys(filteredItemTree).length === 0 && !$itemTreeQuery.isLoading}
        <div class="py-10 text-center text-text-muted">
          <p>No items found.</p>
          {#if hasActiveFilters}
            <p>Try adjusting your filters.</p>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Access store property directly -->
  {#if uiStore.isFormOpen}
    <ItemForm onClose={() => uiStore.closeForm()} />
  {/if}
</MainLayout>
```

---

### Phase 2: Fix Icons & Props (The Warnings Fix)

The console warnings regarding "unused export property" and "ambiguous self-closing tags" must be resolved by updating components to Svelte 5 syntax and proper `lucide-svelte` usage.

#### STEP 3: Fix `src/lib/components/layout/AppSidebar.svelte`
**Action:** Overwrite the file. Fix imports to use explicit `lucide-svelte` components instead of `<icon-lucide-...>`. Update state to use Runes.

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { uiStore } from '$lib/stores/uiStore';
  import { Sun, Moon } from 'lucide-svelte';

  let searchQuery = $state('');
  let allTags = ['project', 'personal', 'work'];
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  }
</script>

<aside class="flex flex-col p-4 border-r bg-surface border-border">
  <div class="p-2 mb-4">
    <h2 class="text-xl font-bold">TodoApp</h2>
  </div>

  <div class="flex-1 space-y-4">
    <!-- Search -->
    <div class="px-2">
      <Input bind:value={searchQuery} placeholder="Search tasks..." />
    </div>

    <Separator />

    <!-- Tags Section -->
    <div class="px-2">
      <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag (tag)}
          <Button
            onclick={() => toggleTag(tag)}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            size="sm"
            class="rounded-full"
          >
            {tag}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Add New Item Button -->
    <div class="px-2 mt-4">
      <Button class="w-full" onclick={() => uiStore.openForm()}>
        + Add Item
      </Button>
    </div>
  </div>

  <!-- Footer / Theme Toggle -->
  <div class="mt-auto">
    <Button variant="ghost" onclick={() => uiStore.toggleTheme()} class="justify-start w-full">
      {#if uiStore.theme !== 'dark'}
        <Sun class="w-4 h-4" />
      {:else}
        <Moon class="w-4 h-4" />
      {/if}
    </Button>
  </div>
</aside>
```

#### STEP 4: Fix `src/lib/components/layout/FilterBar.svelte`
**Action:** Overwrite file. Convert `export let` to `$props()` destructuring to fix the "unused export" warnings.

```svelte
<script lang="ts">
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  let { 
    priority = $bindable('all'),
    showCompleted = $bindable(true),
    hasActiveFilters = false,
    allTags = [],
    selectedTags = $bindable([]),
    search = $bindable('')
  } = $props();

  const dispatch = createEventDispatcher();

  function handleClear() {
    dispatch('clear');
  }
</script>

<div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <Label class="block mb-2">Priority</Label>
      <RadioGroup bind:value={priority} class="flex items-center gap-4">
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
          bind:checked={showCompleted}
        />
        <Label for="show-completed">Show Completed</Label>
      </div>
    </div>
  </div>

  {#if hasActiveFilters}
    <Button
      variant="ghost"
      size="sm"
      onclick={handleClear}
      class="mt-4"
    >
      Clear Filters
    </Button>
  {/if}
</div>
```

#### STEP 5: Fix `src/lib/components/items/ItemItem.svelte`
**Action:** Overwrite file. Update icons and props.

```svelte
<script lang="ts">
   import { Badge } from '$lib/components/ui/badge';
   import { Button } from '$lib/components/ui/button';
   import { Checkbox } from '$lib/components/ui/checkbox';
   import { useUpdateItem, useDeleteItem } from '$lib/api/itemsQuery';
   import { formatDate } from '$lib/utils/helpers';
   import { uiStore } from '$lib/stores/uiStore';
   import type { Item } from '$lib/types';
   import { Pencil, Trash2 } from 'lucide-svelte';
 
   let { item } = $props<{ item: Item }>();
 
   const { mutate: updateItem } = useUpdateItem();
   const { mutate: deleteItem } = useDeleteItem();
 
   function toggleComplete() {
     updateItem({
       id: item.id,
       payload: { isCompleted: !item.isCompleted },
     });
   }
 
   function handleDelete() {
     if (confirm('Are you sure you want to delete this item?')) {
       deleteItem(item.id);
     }
   }
 </script>
 
<div class="flex items-start gap-4 p-4 border rounded-lg bg-card opacity-60" class:opacity-100={!item.isCompleted}>
    <div class="mt-1">
      <Checkbox
        checked={item.isCompleted}
        onchange={toggleComplete}
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
          <h3 
            class="text-lg font-semibold"
            class:line-through={item.isCompleted}
            class:text-muted-foreground={item.isCompleted}
          >
            {item.name}
          </h3>
           <Badge class="tag-priority-{item.priority}" variant="outline">
             {item.priority}
           </Badge>
      </div>
      <p class="mb-3 text-muted-foreground">{item.text}</p>

      <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
          <div class="flex gap-2">
              <Button size="sm" variant="ghost" onclick={() => uiStore.openForm(item)}>
                  <Pencil class="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onclick={handleDelete}>
                  <Trash2 class="w-4 h-4" />
              </Button>
          </div>
      </div>

      <div class="flex gap-2 mt-3">
        {#each item.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
        {/each}
      </div>
    </div>
</div>
```

---

### Phase 3: Fix Form Logic & Adapter

The existing `ItemForm.svelte` uses `createEventDispatcher` mixed with `onclick` which might be flaky in Svelte 5. We should ensure the form works with the new store.

#### STEP 6: Fix `src/lib/components/items/ItemForm.svelte`
**Action:** Overwrite file. Update to use `$props` for callbacks and fix store integration.

```svelte
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  import { useAddItem, useUpdateItem } from '$lib/api/itemsQuery'; // Import update hook
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { uiStore } from '$lib/stores/uiStore';

  let { onClose } = $props<{ onClose: () => void }>();

  const { mutate: addItem } = useAddItem();
  const { mutate: updateItem } = useUpdateItem();

  let currentTag = $state('');
  
  // Initialize form data based on uiStore.editingItem
  let formData = $state({
    name: uiStore.editingItem?.name || '',
    text: uiStore.editingItem?.text || '',
    priority: (uiStore.editingItem?.priority || 'mid') as 'low' | 'mid' | 'high',
    tags: uiStore.editingItem?.tags ? [...uiStore.editingItem.tags] : [] as string[],
    categories: [uiStore.preselectedCategory || (uiStore.editingItem?.categories?.[0] ? String(uiStore.editingItem.categories[0]) : 'general')] as [string],
  });

  let errors = $state<Record<string, string>>({});

  function validateForm() {
    errors = {};
    const result = itemFormSchema.safeParse(formData);
    
    if (!result.success) {
      result.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      categories: [formData.categories[0]] as [string] // Ensure tuple type for API
    };

    const onSuccess = () => {
      if (onClose) onClose();
    };

    if (uiStore.editingItem) {
      updateItem({
        id: uiStore.editingItem.id,
        payload: payload
      }, { onSuccess });
    } else {
      addItem(payload, { onSuccess });
    }
  }

  function addTag() {
    const newTag = currentTag.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      formData.tags = [...formData.tags, newTag];
    }
    currentTag = '';
  }

  function removeTag(tagToRemove: string) {
    formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  }
</script>

<Dialog open={true} onOpenChange={(open) => !open && onClose()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{uiStore.editingItem ? 'Edit Task' : 'Add New Task'}</DialogTitle>
    </DialogHeader>
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
      <!-- Name Field -->
      <div>
        <Label for="name">Task Name</Label>
        <Input
          id="name"
          bind:value={formData.name}
          placeholder="e.g., Finalize project report"
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Description Field -->
      <div>
        <Label for="text">Description</Label>
        <Input
          id="text"
          bind:value={formData.text}
          placeholder="Add more details about task..."
        />
        {#if errors.text}
          <p class="mt-1 text-sm text-destructive">{errors.text}</p>
        {/if}
      </div>

      <!-- Category Field -->
      <div>
        <Label for="category">Category</Label>
        <Input
          id="category"
          bind:value={formData.categories[0]}
          placeholder="e.g., Work"
        />
        {#if errors.categories}
          <p class="mt-1 text-sm text-destructive">{errors.categories}</p>
        {/if}
      </div>

      <!-- Priority Field -->
      <div>
        <Label>Priority</Label>
        <RadioGroup
          bind:value={formData.priority}
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

      <!-- Tags Field -->
      <div>
        <Label>Tags</Label>
        <div class="flex items-center gap-2 mt-2">
          <Input
            bind:value={currentTag}
            onkeydown={handleKeydown}
            placeholder="Add a tag..."
          />
          <Button type="button" variant="outline" onclick={addTag}>Add</Button>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each formData.tags as tag (tag)}
            <Badge
              variant="secondary"
              class="cursor-pointer"
              onclick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
        <Button type="submit">{uiStore.editingItem ? 'Update' : 'Create'} Task</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

---

### Phase 4: Clean Up `AboutPage.svelte`

#### STEP 7: Fix `src/lib/pages/AboutPage.svelte`
**Action:** Overwrite file. Remove the unused `navigate` prop export.

```svelte
<!-- src/lib/pages/AboutPage.svelte -->
<script lang="ts">
  import MainLayout from '$lib/components/layout/MainLayout.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ navigate: string }>();

  function handleNavigate(path: string) {
    dispatch('navigate', path);
  }
</script>

<MainLayout onNavigate={handleNavigate}>
  <div class="space-y-6">
    <header>
      <h1 class="font-bold text-size-3xl">About This Application</h1>
    </header>

    <div class="p-6 border rounded-lg bg-surface border-border">
      <p class="mb-4 text-text-secondary">
        This is a modern, responsive Svelte 5 frontend for managing items.
      </p>

      <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>

      <ul class="space-y-2 list-disc list-inside text-text-secondary">
        <li>
          <span class="font-medium text-text-primary">Svelte 5:</span>
          For building a reactive and performant user interface with Runes.
        </li>
        <li>
          <span class="font-medium text-text-primary">TanStack Query (Svelte Query):</span>
          Manages all server state.
        </li>
        <li>
          <span class="font-medium text-text-primary">shadcn-svelte:</span>
          UI Component library.
        </li>
        <li>
          <span class="font-medium text-text-primary">Tailwind CSS v4:</span>
          Styling.
        </li>
      </ul>
    </div>
  </div>
</MainLayout>
```

### Phase 5: Utils Update

#### STEP 8: Fix `src/lib/utils/themeUpdater.ts`
**Action:** Update theme updater to work with the new `UiStore` class logic.

```typescript
// src/lib/utils/themeUpdater.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Access theme via the effect derived from the store state
    $effect(() => {
      const theme = uiStore.theme;
      const html = document.documentElement;
      
      if (theme === 'system') {
        const isDark = media.matches;
        if (isDark) html.classList.add('dark');
        else html.classList.remove('dark');
      } else if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });

    const mediaListener = () => {
      if (uiStore.theme === 'system') {
        const html = document.documentElement;
        if (media.matches) html.classList.add('dark');
        else html.classList.remove('dark');
      }
    };

    media.addEventListener('change', mediaListener);

    return () => {
      media.removeEventListener('change', mediaListener);
    };
  });
}
```