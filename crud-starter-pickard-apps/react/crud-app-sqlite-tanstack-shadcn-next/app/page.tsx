'use client';

import { useState } from 'react';
import { ItemForm } from '@/components/items/ItemForm';
import { ItemItem } from '@/components/items/ItemItem';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useGetItemTree, useAddItem } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import { Plus } from 'lucide-react';

export default function Home() {
  const { data: itemTree, isLoading, error } = useGetItemTree();
  const addItem = useAddItem();
  
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState<string | undefined>(undefined);

  // Filter Logic
  const {
    filteredItemTree,
    hasActiveFilters,
    totalItems,
    totalFilteredItems,
    selectedPriority, setSelectedPriority,
    showCompleted, setShowCompleted,
  } = useItemFilters(itemTree || {});

  // Handler to open modal with specific category
  const handleAddByCategory = (category: string) => {
    setPreSelectedCategory(category);
    setIsOpen(true);
  };

  // Handler to open generic modal
  const handleAddNew = () => {
    setPreSelectedCategory(undefined);
    setIsOpen(true);
  };

  if (error) {
     return <div className="p-8 text-destructive">Error loading items: {error.message}</div>
  }

  return (
    <div className="w-full max-w-5xl p-8 mx-auto">
      {/* Header & Main Actions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-muted-foreground">
            {isLoading ? 'Loading...' : `Showing ${totalFilteredItems} of ${totalItems} items`}
          </p>
        </div>

        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="size-4" />
          New Item
        </Button>
      </div>

      {/* Filters Area */}
      <div className="p-4 mb-8 space-y-4 border rounded-lg bg-card border-border">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          
          {/* Priority Filter - Radio Group */}
          <div className="space-y-2">
            {/* <Label className="text-xs font-semibold uppercase text-muted-foreground">Priority</Label> */}
            <RadioGroup 
              value={selectedPriority} 
              onValueChange={(v: any) => setSelectedPriority(v)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all" className="font-normal cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="r-high" />
                <Label htmlFor="r-high" className="font-normal cursor-pointer">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="r-mid" />
                <Label htmlFor="r-mid" className="font-normal cursor-pointer">Mid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="r-low" />
                <Label htmlFor="r-low" className="font-normal cursor-pointer">Low</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="hidden w-px h-8 md:block bg-border" />

          {/* Show Completed Checkbox */}
          <div className="flex items-center pt-4 space-x-2 md:pt-0">
            <Checkbox 
              id="completed" 
              checked={showCompleted}
              onCheckedChange={(c) => setShowCompleted(!!c)}
            />
            <Label htmlFor="completed" className="font-medium cursor-pointer">Show Completed Items</Label>
          </div>
        </div>
      </div>

      {/* Item List Grouped by Category */}
      <div className="space-y-8">
        {isLoading ? (
           <div className="py-12 text-center text-muted-foreground">Loading items...</div>
        ) : Object.keys(filteredItemTree).length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed text-muted-foreground rounded-xl bg-muted/30">
            {hasActiveFilters ? 'No items match your filters.' : 'No items found. Create one!'}
          </div>
        ) : (
          Object.entries(filteredItemTree).map(([category, items]) => (
            <div key={category} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                
                {/* 1. The Marker (Fat Line) */}
                <span className="w-1.5 h-6 bg-primary rounded-full shrink-0"></span>

                {/* 2. The Plus Button */}
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  onClick={() => handleAddByCategory(category)}
                  title={`Add item to ${category}`}
                  className="w-6 h-6 p-0 -ml-1 text-muted-foreground hover:text-primary"
                >
                  <Plus className="size-4" />
                </Button>
                
                {/* 3. The Title and Count */}
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  {category}
                  <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full ml-1">
                    {items.length}
                  </span>
                </h3>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map(item => (
                  <ItemItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Shared Dialog for creating items */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{preSelectedCategory ? `Add to ${preSelectedCategory}` : 'Create New Item'}</DialogTitle>
          </DialogHeader>
          <ItemForm 
            // Pass the pre-selected category if available
            defaultValues={preSelectedCategory ? { categories: [preSelectedCategory] } : undefined}
            onSubmit={(data) => {
              addItem.mutate(data, {
                onSuccess: () => setIsOpen(false)
              });
            }}
            isSubmitting={addItem.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}