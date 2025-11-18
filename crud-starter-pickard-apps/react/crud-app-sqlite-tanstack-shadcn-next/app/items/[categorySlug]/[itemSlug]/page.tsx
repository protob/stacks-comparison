'use client';

import { useParams, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { ItemForm } from '@/components/items/ItemForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { useItemsApi } from '@/hooks/useItemsApi';
import { useDeleteItem } from '@/hooks/useItemsApi';
import { useUiStore } from '@/stores/useUiStore';
import { Item } from '@/types';
import { formatDate } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { items } = useItemsApi();
  const deleteItemMutation = useDeleteItem();
  const { showSuccessToast, showErrorToast } = useUiStore();
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const categorySlug = params.categorySlug as string;
  const itemSlug = params.itemSlug as string;

  const item = items?.find(
    (item) => item.categorySlug === categorySlug && item.slug === itemSlug
  );

  useEffect(() => {
    if (items && !item) {
      showErrorToast('Item not found');
      router.push('/');
    }
  }, [item, items, router, showErrorToast]);

  const handleEdit = () => {
    setEditingItem(item || null);
  };

  const handleDelete = async () => {
    if (item && window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItemMutation.mutateAsync(item.id);
        showSuccessToast('Item deleted successfully');
        router.push('/');
      } catch (error) {
        showErrorToast('Failed to delete item');
      }
    }
  };

  const handleEditSuccess = () => {
    setEditingItem(null);
    showSuccessToast('Item updated successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading item...</p>
              </div>
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
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            {/* Item Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{item.title}</CardTitle>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Tag className="size-3" />
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="size-3" />
                        {formatDate(item.createdAt)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                      className="gap-2"
                    >
                      <Edit className="size-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      disabled={deleteItemMutation.isPending}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description || 'No description provided.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h4 className="font-medium mb-1">Category</h4>
                      <p className="text-muted-foreground">{item.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Priority Level</h4>
                      <p className="text-muted-foreground capitalize">{item.priority}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Created</h4>
                      <p className="text-muted-foreground">{formatDate(item.createdAt)}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Last Updated</h4>
                      <p className="text-muted-foreground">{formatDate(item.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Item ID:</span>
                    <p className="text-muted-foreground font-mono">{item.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">Category Slug:</span>
                    <p className="text-muted-foreground font-mono">{item.categorySlug}</p>
                  </div>
                  <div>
                    <span className="font-medium">Item Slug:</span>
                    <p className="text-muted-foreground font-mono">{item.slug}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Dialog */}
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