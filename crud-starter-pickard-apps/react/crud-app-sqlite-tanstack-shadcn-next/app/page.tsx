
'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ItemForm } from '@/components/items/ItemForm';
import { ItemItem } from '@/components/items/ItemItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Filter } from 'lucide-react';
import { useItemsApi } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import { Item, Priority } from '@/types';
import { useUiStore } from '@/stores/useUiStore';

export default function HomePage() {
  const { items, isLoading, error } = useItemsApi();
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedPriority, 
    setSelectedPriority,
    filteredItems 
  } = useItemFilters(items || []);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const { showSuccessToast, showErrorToast } = useUiStore();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    showSuccessToast('Item created successfully!');
  };

  const handleEditSuccess = () => {
    setEditingItem(null);
    showSuccessToast('Item updated successfully!');
  };

  const handleError = (message: string) => {
    showErrorToast(message);
  };

  const priorities: Priority[] = ['low', 'medium', 'high'];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">Error loading items: {error.message}</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Items Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Manage and track your items with priority levels
                </p>
              </div>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="size-4" />
                Add Item
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="size-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                      <Input
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <Select
                      value={selectedPriority}
                      onValueChange={(value) => setSelectedPriority(value as Priority | 'all')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Active Filters */}
                {(searchQuery || selectedPriority !== 'all') && (
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedPriority !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Priority: {selectedPriority}
                        <button
                          onClick={() => setSelectedPriority('all')}
                          className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{items?.length || 0}</div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{filteredItems.length}</div>
                  <p className="text-sm text-muted-foreground">Filtered Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {items?.filter(item => item.priority === 'high').length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </CardContent>
              </Card>
            </div>

            {/* Items List */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery || selectedPriority !== 'all'
                      ? 'No items match your filters.'
                      : 'No items yet. Create your first item!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemItem
                    key={item.id}
                    item={item}
                    onEdit={setEditingItem}
                  />
                ))}
              </div>
            )}

            {/* Create Item Dialog */}
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Item</DialogTitle>
                </DialogHeader>
                <ItemForm
                  onSuccess={handleCreateSuccess}
                  onCancel={() => setShowCreateForm(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Edit Item Dialog */}
            <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                </DialogHeader>
                {editingItem && (
                  <ItemForm
                    item={editingItem}
                    onSuccess={handleEditSuccess}
                    onCancel={() => setEditingItem(null)}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
