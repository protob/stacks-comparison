// frontends/solid/src/pages/ItemPage.tsx
import { createSignal, createMemo, onMount, For, Show } from 'solid-js';
import { itemStore } from '@/stores/itemStore';
import { uiStore } from '@/stores/uiStore'; // Import uiStore for notifications
import { useItemFilters } from '@/hooks/useItemFilters';
import { slugify } from '@/utils/slugify';
import type { Item, UpdateItemPayload, CreateItemPayload, Priority, SingleCategory } from '@/types'; // Import payload types
import AppSidebar from '@/components/layout/AppSidebar';
import FilterBar from '@/components/layout/FilterBar';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ItemForm from '@/components/items/ItemForm';
import ItemItem from '@/components/items/ItemItem';
import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal';

const ItemPage = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedPriority, setSelectedPriority] = createSignal<'all' | Priority>('all');
  const [showCompleted, setShowCompleted] = createSignal(false);
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

  // Modal state
  const [showFormModal, setShowFormModal] = createSignal(false);
  const [editingItem, setEditingItem] = createSignal<Item | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = createSignal(false);
  const [prefilledCategory, setPrefilledCategory] = createSignal<string>('');

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = createSignal(false);
  const [itemToDelete, setItemToDelete] = createSignal<Item | null>(null);
  const [isDeleting, setIsDeleting] = createSignal(false);

  onMount(async () => {
    await itemStore.fetchItemTree();
  });

  const filtersAccessor = createMemo(() => ({
    searchQuery: searchQuery(),
    selectedPriority: selectedPriority(),
    showCompleted: showCompleted(),
    selectedTags: selectedTags()
  }));

  const { allTags, hasActiveFilters, filteredItemTree, totalItems, totalFilteredItems } = useItemFilters(
    () => itemStore.itemTree,
    filtersAccessor 
  );

  const deleteConfirmationMessage = createMemo(() => {
    const item = itemToDelete();
    const itemName = item?.name || 'this item';
    return `Are you sure you want to delete "<strong>${itemName}</strong>"? This action cannot be undone.`;
  });

  const retryFetch = async () => {
    await itemStore.fetchItemTree();
  };

  const openAddModal = (categoryName?: string) => {
    setEditingItem(null);
    setPrefilledCategory(categoryName || '');
    setShowFormModal(true);
  };

  const openEditModal = (item: Item) => {
    setEditingItem({ ...item });
    setPrefilledCategory(''); // Not prefilling category when editing
    setShowFormModal(true);
  };

  // formData comes from ItemForm's submissionPayload
  // It will have: name, text, priority, tags, categories ([string]), isCompleted
  const handleFormSubmit = async (formDataFromForm: {
    name: string;
    text: string;
    priority: Priority;
    tags: string[];
    categories: SingleCategory<string>;
    isCompleted: boolean;
  }) => {
    setIsSubmittingForm(true);
    try {
      const editing = editingItem();
      if (editing?.id) { // Editing existing item
        const originalCategorySlug = slugify(editing.categories[0]);
        
        // Construct UpdateItemPayload
        const updatePayload: UpdateItemPayload = {
          name: formDataFromForm.name,
          text: formDataFromForm.text,
          priority: formDataFromForm.priority,
          tags: formDataFromForm.tags,
          categories: formDataFromForm.categories, // New categories from form
          isCompleted: formDataFromForm.isCompleted,
        };
        await itemStore.updateItem(originalCategorySlug, editing.slug, updatePayload);
      } else { // Adding new item
        // Construct CreateItemPayload
        const createPayload: CreateItemPayload = {
          name: formDataFromForm.name,
          text: formDataFromForm.text,
          priority: formDataFromForm.priority,
          tags: formDataFromForm.tags,
          categories: formDataFromForm.categories,
        };
        // isCompleted is not part of CreateItemPayload; backend handles default
        await itemStore.addItem(createPayload);
      }
      setShowFormModal(false);
      setEditingItem(null);
      setPrefilledCategory('');
    } catch (error) {
      console.error("Error submitting form from ItemPage:", error);
      uiStore.showNotification('error', 'Failed to submit form. See console for details.');
    }
    finally {
      setIsSubmittingForm(false);
    }
  };

  const handleToggleComplete = async (item: Item) => {
    await itemStore.toggleItemCompletion(item);
  };

  const confirmDelete = (item: Item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const executeDelete = async () => {
    const item = itemToDelete();
    if (!item) return;
    
    setIsDeleting(true);
    try {
      const categorySlug = slugify(item.categories[0]);
      await itemStore.deleteItem(categorySlug, item.slug);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item from ItemPage:", error);
      uiStore.showNotification('error', 'Failed to delete item. See console for details.');
    }
    finally {
      setIsDeleting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedPriority('all');
    setShowCompleted(false);
    setSelectedTags([]);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingItem(null);
    setPrefilledCategory('');
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div class="flex min-h-screen">
      <AppSidebar
        searchQuery={searchQuery()} 
        onSearchQueryChange={setSearchQuery}
        searchPlaceholder="Search items..."
        availableTags={allTags} 
        selectedTags={selectedTags()} 
        onToggleTag={toggleTag}
        tagsLabel="TAGS"
        tagPrefix="#"
      />

      <div class="flex-1">
        <div class="container max-w-4xl px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-neutral-100 mb-1">Items</h1>
              <p class="text-neutral-400">
                {hasActiveFilters() ? `${totalFilteredItems()} of ${totalItems()}` : `${totalItems()} total`} items
              </p>
            </div>
            <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
              Add Item
            </Button>
          </div>

          <FilterBar
            selectedPriority={selectedPriority()}
            onPriorityChange={(priority) => setSelectedPriority(priority as Priority | 'all')}
            showCompleted={showCompleted()}
            onShowCompletedChange={setShowCompleted}
            priorityOptions={[
              { value: 'all', label: 'All' },
              { value: 'high', label: 'High' },
              { value: 'mid', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />

          <Show when={itemStore.isLoading && Object.keys(itemStore.itemTree).length === 0}>
            <div class="py-12 text-center">
              <Icon name="Loader2" class="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
              <p class="text-neutral-400">Loading items...</p>
            </div>
          </Show>
          
          <Show when={itemStore.error && Object.keys(itemStore.itemTree).length === 0}> {/* Show general error only if no items loaded */}
            <div class="p-6 text-center bg-red-900/20 border border-red-800 rounded">
              <Icon name="AlertTriangle" class="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p class="text-red-300 mb-3">{itemStore.error}</p>
              <Button onClick={retryFetch} variant="danger" size="sm">Retry</Button>
            </div>
          </Show>
          
          <Show when={!itemStore.isLoading && (!itemStore.error || Object.keys(itemStore.itemTree).length > 0) && Object.keys(filteredItemTree()).length === 0}>
            <div class="py-12 text-center">
              <Icon name="ClipboardList" class="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 class="text-xl font-semibold text-neutral-300 mb-2">
                {hasActiveFilters() ? 'No matching items' : 'No items yet'}
              </h2>
              <p class="text-neutral-500 mb-4">
                {hasActiveFilters() ? 'Try adjusting your filters or ' : 'Create your first item to get started or '}
                <Show when={itemStore.error}>
                  <span class="text-red-400">an error occurred: {itemStore.error} </span>
                  <Button onClick={retryFetch} variant="secondary" size="sm" class="ml-2">Retry Fetch</Button>
                </Show>
              </p>
              <Show when={hasActiveFilters()} fallback={
                <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
                  Create Item
                </Button>
              }>
                <Button onClick={clearAllFilters} variant="secondary">
                  Clear Filters
                </Button>
              </Show>
            </div>
          </Show>
          
          <Show when={Object.keys(filteredItemTree()).length > 0}>
            <div class="space-y-6">
              <For each={Object.entries(filteredItemTree())}>
                {([categoryName, categoryItems]) => (
                  <div>
                    <div class="flex items-center gap-3 pb-2 border-b border-neutral-700">
                      <Button 
                        variant="text" 
                        size="sm" 
                        icon="Plus" 
                        onClick={() => openAddModal(categoryName)}
                        class="text-neutral-400 hover:text-neutral-200"
                        aria-label={`Add item to ${categoryName}`}
                      />
                      <h2 class="text-lg font-medium text-neutral-200">{categoryName}</h2>
                      <span class="text-sm text-neutral-500">({categoryItems.length})</span>
                    </div>
                    
                    <div class="space-y-2 mt-3">
                      <For each={categoryItems}>
                        {(item) => (
                          <ItemItem
                            item={item}
                            onToggleComplete={handleToggleComplete}
                            onEdit={openEditModal}
                            onDelete={confirmDelete}
                          />
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>

      <Modal 
        isOpen={showFormModal()} 
        onClose={handleCloseFormModal} 
        title={editingItem() ? 'Edit Item' : 'New Item'}
        size="md"
      >
        <ItemForm
          item={editingItem()}
          isLoading={isSubmittingForm()}
          prefilledCategory={prefilledCategory()}
          onSubmit={handleFormSubmit} // onSubmit expects the specific form data shape
          onCancel={handleCloseFormModal}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={showDeleteConfirm()}
        onClose={handleCloseDeleteModal}
        onConfirm={executeDelete}
        title="Delete Item"
        message={deleteConfirmationMessage()}
        confirmText="Delete"
        isLoading={isDeleting()}
      />
    </div>
  );
};

export default ItemPage;