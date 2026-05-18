'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

function CategoryForm({ category, onSuccess }: { category?: any; onSuccess: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: category });
  const qc = useQueryClient();

  const onSubmit = async (data: any) => {
    try {
      if (category) {
        await api.patch(`/api/categories/${category.id}`, data);
        toast.success('Category updated');
      } else {
        await api.post('/api/categories', data);
        toast.success('Category created');
      }
      qc.invalidateQueries({ queryKey: ['categories'] });
      onSuccess();
    } catch (e: any) { toast.error(e.message || 'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Name (English) *</Label><Input {...register('nameEn', { required: true })} className="mt-1" /></div>
        <div><Label>Name (French) *</Label><Input {...register('nameFr', { required: true })} className="mt-1" /></div>
      </div>
      <div><Label>Slug *</Label><Input {...register('slug', { required: true })} className="mt-1" /></div>
      <div><Label>Image URL</Label><Input {...register('imageUrl')} className="mt-1" /></div>
      <div><Label>Description (English)</Label><Textarea {...register('descriptionEn')} rows={2} className="mt-1" /></div>
      <div><Label>Description (French)</Label><Textarea {...register('descriptionFr')} rows={2} className="mt-1" /></div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
}

export default function AdminCategoriesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const qc = useQueryClient();

  const { data: categories, isLoading } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/api/categories'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/categories/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['categories'] }); toast.success('Category deleted'); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold">Categories</h1><p className="text-muted-foreground mt-1">Manage product categories</p></div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Category</Button>
      </div>

      {isLoading ? <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                {['Name (EN)', 'Name (FR)', 'Slug', 'Products', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories?.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-sm">{cat.nameEn}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{cat.nameFr}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{cat.slug}</td>
                  <td className="px-4 py-3 text-sm">{cat.productCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(cat); setModalOpen(true); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => { if (confirm('Delete this category?')) deleteMutation.mutate(cat.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? 'Edit Category' : 'Add Category'}</DialogTitle></DialogHeader>
          <CategoryForm category={editing} onSuccess={() => setModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
