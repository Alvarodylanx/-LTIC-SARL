'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { format } from 'date-fns';

function ProductForm({ product, categories, onSuccess }: { product?: any; categories: any[]; onSuccess: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    defaultValues: product || { featured: false, available: true },
  });
  const qc = useQueryClient();

  const onSubmit = async (data: any) => {
    try {
      if (product) {
        await api.patch(`/api/products/${product.id}`, data);
        toast.success('Product updated');
      } else {
        await api.post('/api/products', data);
        toast.success('Product created');
      }
      qc.invalidateQueries({ queryKey: ['admin-products'] });
      onSuccess();
    } catch (e: any) {
      toast.error(e.message || 'Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name (English) *</Label>
          <Input {...register('nameEn', { required: true })} className="mt-1" />
        </div>
        <div>
          <Label>Name (French) *</Label>
          <Input {...register('nameFr', { required: true })} className="mt-1" />
        </div>
      </div>
      <div>
        <Label>Slug *</Label>
        <Input {...register('slug', { required: true })} className="mt-1" />
      </div>
      <div>
        <Label>Category *</Label>
        <Select onValueChange={(v) => setValue('categoryId', Number(v))} defaultValue={product?.categoryId?.toString()}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c.id} value={c.id.toString()}>{c.nameEn}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input {...register('imageUrl')} className="mt-1" />
      </div>
      <div>
        <Label>Description (English)</Label>
        <Textarea {...register('descriptionEn')} rows={3} className="mt-1" />
      </div>
      <div>
        <Label>Description (French)</Label>
        <Textarea {...register('descriptionFr')} rows={3} className="mt-1" />
      </div>
      <div>
        <Label>Specifications</Label>
        <Textarea {...register('specifications')} rows={3} className="mt-1" />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('featured')} className="w-4 h-4" />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('available')} className="w-4 h-4" defaultChecked />
          <span className="text-sm">Available</span>
        </label>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
}

export default function AdminProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const qc = useQueryClient();

  const { data: products, isLoading } = useQuery<any[]>({
    queryKey: ['admin-products'],
    queryFn: () => api.get('/api/products?limit=200'),
  });
  const { data: categories } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/api/categories'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/products/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); toast.success('Product deleted'); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Added</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.nameEn} width={40} height={40} className="w-full h-full object-cover" />
                        ) : <Package className="h-5 w-5 text-muted-foreground m-auto mt-2.5" />}
                      </div>
                      <span className="font-medium text-sm">{product.nameEn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{product.categoryName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{format(new Date(product.createdAt), 'dd MMM yyyy')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(product); setModalOpen(true); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => { if (confirm('Delete this product?')) deleteMutation.mutate(product.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm product={editing} categories={categories || []} onSuccess={() => setModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
