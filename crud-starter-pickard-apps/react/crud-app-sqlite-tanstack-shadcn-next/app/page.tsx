
'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ItemForm } from '@/components/items/ItemForm';
import { ItemItem } from '@/components/items/ItemItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useGetItemTree, useAddItem } from '@/hooks/useItemsApi';
import { useItemFilters } from '@/hooks/useItemFilters';
import type { Priority } from '@/types';
import { Plus, Search, Filter } from 'lucide-react';

export default function Home() {
  const { data: itemTree, isLoading, error } = useGetItemTree();
  const addItem = useAddItem();
  const [isOpen, setIsOpen] = useState(false);

  const {
    filteredItemTree,
    allTags,
    hasActiveFilters,
    totalItems,
    totalFilteredItems,
    searchQuery, setSearchQuery,
    selectedPriority, setSelectedPriority,
    showCompleted, setShowCompleted,
    selectedTags, setSelectedTags
  } = useItemFilters(itemTree || {});

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (error) {
     return <div className="p-8 text-red-500">Error loading items: {error.message}</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {/* Header & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Items Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              {isLoading ? 'Loading...' : `Showing ${totalFilteredItems} of ${totalItems} items`}
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                New Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
              </DialogHeader>
              <ItemForm 
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

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={selectedPriority} onValueChange={(v: any) => setSelectedPriority(v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="mid">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 bg-secondary/50 px-3 rounded-md">
              <Checkbox 
                id="completed" 
                checked={showCompleted}
                onCheckedChange={(c) => setShowCompleted(!!c)}
              />
              <Label htmlFor="completed" className="cursor-pointer">Show Completed</Label>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                <Filter className="size-3" />
                Tags:
              </div>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors border ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent border-input'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List Grouped by Category */}
        <div className="space-y-8">
          {isLoading ? (
             <div className="text-center py-12 text-muted-foreground">Loading items...</div>
          ) : Object.keys(filteredItemTree).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              {hasActiveFilters ? 'No items match your filters.' : 'No items found. Create one!'}
            </div>
          ) : (
            Object.entries(filteredItemTree).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground/80">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  {category}
                  <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <ItemItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
