import { useItemStore } from '@/stores/useItemStore';
import { useItemFilters } from '@/hooks/useItemFilters';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';
import AppSidebar from '@/components/layout/AppSidebar';
import FilterBar from '@/components/layout/FilterBar';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ItemForm from '@/components/items/ItemForm';
import ItemItem from '@/components/items/ItemItem';
import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal';

const ItemPage = () => {
  const { itemTree, isLoading, error, fetchItemTree, addItem, updateItem, toggleItemCompletion, deleteItem } = useItemStore();
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [prefilledCategory, setPrefilledCategory] = useState<string>('');

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Use filtering hook
  const { allTags, hasActiveFilters, filteredItemTree, totalItems, totalFilteredItems } = useItemFilters(
    itemTree,
    { searchQuery, selectedPriority, showCompleted, selectedTags }
  );

  // Initialize data
  useEffect(() => {
    fetchItemTree();
  }, [fetchItemTree]);

  // Computed values
  const deleteConfirmationMessage = useMemo(() => {
    const itemName = itemToDelete?.name || 'this item';
    return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
  }, [itemToDelete]);

  // Event handlers
  const retryFetch = useCallback(async () => {
    await fetchItemTree();
  }, [fetchItemTree]);

  const openAddModal = useCallback((categoryName?: string) => {
    setEditingItem(null);
    setPrefilledCategory(categoryName || '');
    setShowFormModal(true);
  }, []);

  const openEditModal = useCallback((item: Item) => {
    setEditingItem({ ...item });
    setPrefilledCategory('');
    setShowFormModal(true);
  }, []);

  const handleFormSubmit = useCallback(async (formData: any) => {
    setIsSubmittingForm(true);
    try {
      if (editingItem?.id) {
        const originalCategorySlug = slugify(editingItem.categories[0]);
        await updateItem(originalCategorySlug, editingItem.slug, formData);
      } else {
        await addItem(formData);
      }
      setShowFormModal(false);
      setEditingItem(null);
      setPrefilledCategory('');
    } finally {
      setIsSubmittingForm(false);
    }
  }, [editingItem, updateItem, addItem]);

  const handleToggleComplete = useCallback(async (item: Item) => {
    await toggleItemCompletion(item);
  }, [toggleItemCompletion]);

  const confirmDelete = useCallback((item: Item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  }, []);

  const executeDelete = useCallback(async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      const categorySlug = slugify(itemToDelete.categories[0]);
      await deleteItem(categorySlug, itemToDelete.slug);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }, [itemToDelete, deleteItem]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedPriority('all');
    setShowCompleted(false);
    setSelectedTags([]);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setShowFormModal(false);
    setEditingItem(null);
    setPrefilledCategory('');
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AppSidebar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        searchPlaceholder="Search items..."
        availableTags={allTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        tagsLabel="TAGS"
        tagPrefix="#"
      />

      {/* Main Content */}
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
            <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
              Add Item
            </Button>
          </div>

          {/* Top Filters Bar */}
          <FilterBar
            selectedPriority={selectedPriority}
            onPriorityChange={(priority) => setSelectedPriority(priority as any)}
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
            priorityOptions={[
              { value: 'all', label: 'All' },
              { value: 'high', label: 'High' },
              { value: 'mid', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />

          {/* Loading State */}
          {isLoading && Object.keys(itemTree).length === 0 && (
            <div className="py-12 text-center">
              <Icon name="Loader2" className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
              <p className="text-neutral-400">Loading items...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="p-6 text-center bg-red-900/20 border border-red-800 rounded">
              <Icon name="AlertTriangle" className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-red-300 mb-3">{error}</p>
              <Button onClick={retryFetch} variant="danger" size="sm">Retry</Button>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && Object.keys(filteredItemTree).length === 0 && (
            <div className="py-12 text-center">
              <Icon name="ClipboardList" className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-neutral-300 mb-2">
                {hasActiveFilters ? 'No matching items' : 'No items yet'}
              </h2>
              <p className="text-neutral-500 mb-4">
                {hasActiveFilters ? 'Try adjusting your filters' : 'Create your first item to get started'}
              </p>
              {hasActiveFilters ? (
                <Button onClick={clearAllFilters} variant="secondary">
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={() => openAddModal()} variant="primary" icon="Plus">
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
                      variant="text" 
                      size="sm" 
                      icon="Plus" 
                      onClick={() => openAddModal(categoryName)}
                      className="text-neutral-400 hover:text-neutral-200"
                      aria-label={`Add item to ${categoryName}`}
                    />
                    <h2 className="text-lg font-medium text-neutral-200">{categoryName}</h2>
                    <span className="text-sm text-neutral-500">({categoryItems.length})</span>
                  </div>
                  
                  {/* Items in this category */}
                  <div className="space-y-2 mt-3">
                    {categoryItems.map((item) => (
                      <ItemItem
                        key={item.id}
                        item={item}
                        onToggleComplete={handleToggleComplete}
                        onEdit={openEditModal}
                        onDelete={confirmDelete}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={showFormModal} 
        onClose={handleCloseFormModal} 
        title={editingItem ? 'Edit Item' : 'New Item'}
        size="md"
      >
        <ItemForm
          item={editingItem}
          isLoading={isSubmittingForm}
          prefilledCategory={prefilledCategory}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDeleteModal
        isOpen={showDeleteConfirm}
        onClose={handleCloseDeleteModal}
        onConfirm={executeDelete}
        title="Delete Item"
        message={deleteConfirmationMessage}
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ItemPage;