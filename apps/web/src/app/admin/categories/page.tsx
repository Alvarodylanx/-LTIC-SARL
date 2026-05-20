'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { MediaUpload } from '@/components/admin/MediaUpload';
import { translateText } from '@/lib/translate';

function CategoryForm({ category, onSuccess }: { category?: any; onSuccess: () => void }) {
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({ defaultValues: category });
  const qc = useQueryClient();
  const { L, language } = useLanguage();
  const [translating, setTranslating] = useState(false);

  const srcLang = language as 'en' | 'fr';
  const dstLang = language === 'en' ? 'fr' : 'en';
  const nameField = language === 'en' ? 'nameEn' : 'nameFr';
  const descField = language === 'en' ? 'descriptionEn' : 'descriptionFr';

  const onSubmit = async (data: any) => {
    setTranslating(true);
    try {
      const [translatedName, translatedDesc] = await Promise.all([
        translateText(data[nameField] || '', srcLang, dstLang),
        translateText(data[descField] || '', srcLang, dstLang),
      ]);
      if (language === 'en') {
        data.nameFr = translatedName;
        data.descriptionFr = translatedDesc;
      } else {
        data.nameEn = translatedName;
        data.descriptionEn = translatedDesc;
      }
    } finally {
      setTranslating(false);
    }
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

  const busy = isSubmitting || translating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>{language === 'en' ? 'Category Name (English)' : 'Nom de la catégorie (Français)'} *</Label>
        <Input {...register(nameField, { required: true })} className="mt-1" />
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'en'
            ? 'The French version will be auto-translated on save.'
            : 'La version anglaise sera traduite automatiquement à la sauvegarde.'}
        </p>
      </div>
      <div>
        <Label>Slug *</Label>
        <Input {...register('slug', { required: true })} className="mt-1" />
      </div>
      <div>
        <Label>{L({ en: 'Image / Video', fr: 'Image / Vidéo' })}</Label>
        <div className="mt-1">
          <MediaUpload value={watch('imageUrl') || ''} onChange={v => setValue('imageUrl', v)} />
        </div>
      </div>
      <div>
        <Label>{language === 'en' ? 'Description (English)' : 'Description (Français)'}</Label>
        <Textarea {...register(descField)} rows={2} className="mt-1" />
      </div>
      <Button type="submit" disabled={busy} className="w-full">
        {busy ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {translating ? L({ en: 'Translating…', fr: 'Traduction…' }) : L({ en: 'Saving…', fr: 'Sauvegarde…' })}
          </span>
        ) : category ? L({ en: 'Update Category', fr: 'Mettre à jour' }) : L({ en: 'Create Category', fr: 'Créer la catégorie' })}
      </Button>
    </form>
  );
}

export default function AdminCategoriesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const qc = useQueryClient();
  const { L, language } = useLanguage();

  const { data: categories, isLoading } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/api/categories'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/categories/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['categories'] }); toast.success('Category deleted'); setDeleteId(null); },
    onError: () => toast.error('Failed to delete'),
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{L({ en: 'Categories', fr: 'Catégories' })}</h1>
          <p className="text-muted-foreground mt-1">{L({ en: 'Manage product categories', fr: 'Gérez les catégories de produits' })}</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> {L({ en: 'Add Category', fr: 'Ajouter une catégorie' })}
        </Button>
      </div>

      {isLoading ? <div className="space-y-3">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> : (
        <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                {[L({ en: 'Name', fr: 'Nom' }), L({ en: 'Translation', fr: 'Traduction' }), 'Slug', L({ en: 'Products', fr: 'Produits' }), L({ en: 'Actions', fr: 'Actions' })].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories?.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-sm">{L({ en: cat.nameEn, fr: cat.nameFr })}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{language === 'en' ? cat.nameFr : cat.nameEn}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{cat.slug}</td>
                  <td className="px-4 py-3 text-sm">{cat.productCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(cat); setModalOpen(true); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(cat.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
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
          <DialogHeader><DialogTitle>{editing ? L({ en: 'Edit Category', fr: 'Modifier la catégorie' }) : L({ en: 'Add Category', fr: 'Ajouter une catégorie' })}</DialogTitle></DialogHeader>
          <CategoryForm category={editing} onSuccess={() => setModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => { if (!open) setDeleteId(null); }}
        title={L({ en: 'Delete Category?', fr: 'Supprimer la catégorie ?' })}
        description={L({ en: 'This action cannot be undone.', fr: 'Cette action est irréversible.' })}
        confirmLabel={L({ en: 'Delete', fr: 'Supprimer' })}
        onConfirm={() => { if (deleteId !== null) deleteMutation.mutate(deleteId); }}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
