Here is the update to move the category "+" buttons to the left side, directly before the category name, matching your requirement.

### **Step 1: Update Main Page Layout**

We will modify the flex container in the category header to align items to the start (left) and place the "Add" button before the category title.

**1.1 Update `/home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next/app/page.tsx`**

```tsx
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
    <div className="p-8 max-w-5xl mx-auto w-full">
      {/* Header & Main Actions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            {isLoading ? 'Loading...' : `Showing ${totalFilteredItems} of ${totalItems} items`}
          </p>
        </div>

        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="size-4" />
          New Item
        </Button>
      </div>

      {/* Filters Area */}
      <div className="bg-card border border-border rounded-lg p-4 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          {/* Priority Filter - Radio Group */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase">Priority</Label>
            <RadioGroup 
              value={selectedPriority} 
              onValueChange={(v: any) => setSelectedPriority(v)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all" className="cursor-pointer font-normal">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="r-high" />
                <Label htmlFor="r-high" className="cursor-pointer font-normal">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="r-mid" />
                <Label htmlFor="r-mid" className="cursor-pointer font-normal">Mid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="r-low" />
                <Label htmlFor="r-low" className="cursor-pointer font-normal">Low</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="hidden md:block h-8 w-px bg-border" />

          {/* Show Completed Checkbox */}
          <div className="flex items-center space-x-2 pt-4 md:pt-0">
            <Checkbox 
              id="completed" 
              checked={showCompleted}
              onCheckedChange={(c) => setShowCompleted(!!c)}
            />
            <Label htmlFor="completed" className="cursor-pointer font-medium">Show Completed Items</Label>
          </div>
        </div>
      </div>

      {/* Item List Grouped by Category */}
      <div className="space-y-8">
        {isLoading ? (
           <div className="text-center py-12 text-muted-foreground">Loading items...</div>
        ) : Object.keys(filteredItemTree).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
            {hasActiveFilters ? 'No items match your filters.' : 'No items found. Create one!'}
          </div>
        ) : (
          Object.entries(filteredItemTree).map(([category, items]) => (
            <div key={category} className="space-y-4">
              {/* Category Header with Left-aligned Add Button */}
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  onClick={() => handleAddByCategory(category)}
                  title={`Add item to ${category}`}
                  className="text-muted-foreground hover:text-primary -ml-2"
                >
                  <Plus className="size-4" />
                </Button>
                
                <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  {category}
                  <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full ml-1">
                    {items.length}
                  </span>
                </h3>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
```

### **Step 2: Verify**

Run the server to check the new layout.

```bash
bun dev
```