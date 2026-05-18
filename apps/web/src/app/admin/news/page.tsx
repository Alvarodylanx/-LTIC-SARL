'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { format } from 'date-fns';

function NewsForm({ article, onSuccess }: { article?: any; onSuccess: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: article || { published: true } });
  const qc = useQueryClient();

  const onSubmit = async (data: any) => {
    try {
      if (article) { await api.patch(`/api/news/${article.id}`, data); toast.success('Article updated'); }
      else { await api.post('/api/news', data); toast.success('Article created'); }
      qc.invalidateQueries({ queryKey: ['admin-news'] });
      onSuccess();
    } catch (e: any) { toast.error(e.message || 'Failed'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Title (EN) *</Label><Input {...register('titleEn', { required: true })} className="mt-1" /></div>
        <div><Label>Title (FR) *</Label><Input {...register('titleFr', { required: true })} className="mt-1" /></div>
      </div>
      <div><Label>Slug *</Label><Input {...register('slug', { required: true })} className="mt-1" /></div>
      <div><Label>Image URL</Label><Input {...register('imageUrl')} className="mt-1" /></div>
      <div><Label>Category</Label><Input {...register('category')} className="mt-1" placeholder="e.g. Company News, Industry Insights" /></div>
      <div><Label>Summary (EN)</Label><Textarea {...register('summaryEn')} rows={2} className="mt-1" /></div>
      <div><Label>Summary (FR)</Label><Textarea {...register('summaryFr')} rows={2} className="mt-1" /></div>
      <div><Label>Content (EN)</Label><Textarea {...register('contentEn')} rows={5} className="mt-1" /></div>
      <div><Label>Content (FR)</Label><Textarea {...register('contentFr')} rows={5} className="mt-1" /></div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" {...register('published')} defaultChecked className="w-4 h-4" />
        <span className="text-sm">Published</span>
      </label>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
      </Button>
    </form>
  );
}

export default function AdminNewsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const qc = useQueryClient();

  const { data: articles, isLoading } = useQuery<any[]>({
    queryKey: ['admin-news'],
    queryFn: () => api.get('/api/news?limit=100'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/news/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-news'] }); toast.success('Article deleted'); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold">News Articles</h1><p className="text-muted-foreground mt-1">Manage news and insights</p></div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Add Article</Button>
      </div>

      {isLoading ? <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                {['Article', 'Category', 'Published', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles?.map((article) => (
                <tr key={article.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {article.imageUrl && (
                        <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                          <Image src={article.imageUrl} alt={article.titleEn} width={48} height={32} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <span className="font-medium text-sm line-clamp-1">{article.titleEn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{article.category || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${article.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{format(new Date(article.publishedAt), 'dd MMM yyyy')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(article); setModalOpen(true); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => { if (confirm('Delete this article?')) deleteMutation.mutate(article.id); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!articles?.length && <p className="text-center text-muted-foreground py-12">No articles yet</p>}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit Article' : 'Add Article'}</DialogTitle></DialogHeader>
          <NewsForm article={editing} onSuccess={() => setModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
