import { useState, useCallback, useMemo, useEffect } from 'react';
import { useGetItemTree, useAddItem, useUpdateItem, useToggleItemCompletion, useDeleteItem } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import { useSearch } from '@/App';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';
import FilterBar from '@/components/layout/FilterBar';
import { ItemForm } from '@/components/items/ItemForm';
import ItemItem from '@/components/items/ItemItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';

export default function ItemPage() {
  const { data: itemTree = {}, isLoading, error } = useGetItemTree();
  const { searchQuery, selectedTags, setAvailableTags, clearSearch, clearTags } = useSearch();
  const addItemMutation = useAddItem();
  const updateItemMutation = useUpdateItem();
  const toggleItemCompletion = useToggleItemCompletion();
  const deleteItemMutation = useDeleteItem();
  
  // Filter state
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  // Modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  // Use filtering hook
  const { allTags, hasActiveFilters, filteredItemTree, totalItems, totalFilteredItems } = useItemFilters(
    itemTree,
    { searchQuery, selectedPriority, showCompleted, selectedTags }
  );

  // Update available tags in the context when they change
  useEffect(() => {
    setAvailableTags(allTags);
  }, [allTags, setAvailableTags]);

  // Computed values
  const deleteConfirmationMessage = useMemo(() => {
    const itemName = itemToDelete?.name || 'this item';
    return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
  }, [itemToDelete]);

  // Event handlers
  const openAddModal = useCallback((categoryName?: string) => {
    setEditingItem(null);
    setShowFormModal(true);
  }, []);

  const openEditModal = useCallback((item: Item) => {
    setEditingItem({ ...item });
    setShowFormModal(true);
  }, []);

  const handleFormSubmit = useCallback(async (formData: any) => {
    try {
      if (editingItem?.id) {
        const originalCategorySlug = slugify(editingItem.categories[0]);
        await updateItemMutation.mutateAsync({
          categorySlug: originalCategorySlug,
          itemSlug: editingItem.slug,
          payload: formData
        });
      } else {
        await addItemMutation.mutateAsync(formData);
      }
      setShowFormModal(false);
      setEditingItem(null);
    } catch (error) {
      // Error handling is done in the mutation
    }
  }, [editingItem, updateItemMutation, addItemMutation]);

  const confirmDelete = useCallback((item: Item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  }, []);

  const executeDelete = useCallback(async () => {
    if (!itemToDelete) return;
    
    try {
      const categorySlug = slugify(itemToDelete.categories[0]);
      await deleteItemMutation.mutateAsync({ categorySlug, itemSlug: itemToDelete.slug });
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      // Error handling is done in the mutation
    }
  }, [itemToDelete, deleteItemMutation]);



  const clearAllFilters = useCallback(() => {
    setSelectedPriority('all');
    setShowCompleted(false);
    clearSearch();
    clearTags();
  }, [clearSearch, clearTags]);

  const handleCloseFormModal = useCallback(() => {
    setShowFormModal(false);
    setEditingItem(null);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  }, []);

  return (
    <div className="flex-1">
      <div className="container max-w-4xl px-4 py-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-100 mb-1">Items</h1>
            <p className="text-neutral-400">
              {hasActiveFilters ? `${totalFilteredItems} of ${totalItems}` : `${totalItems} total`} items
            </p>
          </div>
            <Button onClick={() => openAddModal()}>
              Add Item
            </Button>
        </div>



        {/* Top Filters Bar */}
        <FilterBar
          selectedPriority={selectedPriority}
          onPriorityChange={(priority) => setSelectedPriority(priority as any)}
          showCompleted={showCompleted}
          onShowCompletedChange={setShowCompleted}
        />

        {/* Loading State */}
        {isLoading && Object.keys(itemTree).length === 0 && (
          <div className="py-12 text-center">
            <div className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2">⟳</div>
            <p className="text-neutral-400">Loading items...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="p-6 text-center bg-red-900/20 border border-red-800 rounded">
            <div className="w-8 h-8 text-red-400 mx-auto mb-2">⚠</div>
            <p className="text-red-300 mb-3">{error.message}</p>
            <Button onClick={() => window.location.reload()} variant="destructive">
              Retry
            </Button>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && Object.keys(filteredItemTree).length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 text-neutral-600 mx-auto mb-4">📋</div>
            <h2 className="text-xl font-semibold text-neutral-300 mb-2">
              {hasActiveFilters ? 'No matching items' : 'No items yet'}
            </h2>
            <p className="text-neutral-500 mb-4">
              {hasActiveFilters ? 'Try adjusting your filters' : 'Create your first item to get started'}
            </p>
            {hasActiveFilters ? (
              <Button onClick={clearAllFilters} variant="outline">
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => openAddModal()}>
                Create Item
              </Button>
            )}
          </div>
        )}
        
        {/* Items Grouped by Category */}
        {!isLoading && !error && Object.keys(filteredItemTree).length > 0 && (
          <div className="space-y-6">
            {Object.entries(filteredItemTree).map(([categoryName, categoryItems]) => (
              <div key={categoryName}>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-neutral-700">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => openAddModal(categoryName)}
                    className="text-neutral-400 hover:text-neutral-200"
                    aria-label={`Add item to ${categoryName}`}
                  >
                    +
                  </Button>
                  <h2 className="text-lg font-medium text-neutral-200">{categoryName}</h2>
                  <span className="text-sm text-neutral-500">({categoryItems.length})</span>
                </div>
                
                {/* Items in this category */}
                <div className="space-y-2 mt-3">
                  {categoryItems.map((item) => (
                    <ItemItem
                      key={item.id}
                      item={item}
                      onToggleComplete={() => toggleItemCompletion(item)}
                      onEdit={openEditModal}
                      onDelete={confirmDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        <Dialog open={showFormModal} onOpenChange={handleCloseFormModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'New Item'}</DialogTitle>
            </DialogHeader>
            <ItemForm
              item={editingItem}
              isSubmitting={addItemMutation.isPending || updateItemMutation.isPending}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseFormModal}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDeleteModal
          isOpen={showDeleteConfirm}
          onClose={handleCloseDeleteModal}
          onConfirm={executeDelete}
          title="Delete Item"
          description={deleteConfirmationMessage}
        />
      </div>
    </div>
  );
}