'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Package, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';

export default function ProductsPage() {
  const { L } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const { data: categories } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/api/categories'),
  });

  const { data: products, isLoading } = useQuery<any[]>({
    queryKey: ['products', selectedCategory],
    queryFn: () => api.get(`/api/products${selectedCategory ? `?categoryId=${selectedCategory}` : ''}`),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-sidebar py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&auto=format&fit=crop&q=50" alt="Products" fill className="object-cover opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{L({ en: 'Industrial Catalog', fr: 'Catalogue Industriel' })}</p>
          <h1 className="text-5xl font-bold tracking-tight text-sidebar-foreground mb-6">{L({ en: 'Our Products', fr: 'Nos Produits' })}</h1>
          <p className="text-xl text-sidebar-foreground/80 max-w-2xl mx-auto">
            {L({ en: 'Premium certified industrial equipment, supplies, and materials — sourced globally, delivered reliably.', fr: 'Équipements industriels certifiés premium, fournitures et matériaux — approvisionnés mondialement, livrés de façon fiable.' })}
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 z-40 bg-muted/95 border-b backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              {L({ en: 'Filter:', fr: 'Filtrer:' })}
            </div>
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${!selectedCategory ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground hover:bg-primary/10 hover:text-primary border-border'}`}
            >
              {L({ en: 'All', fr: 'Tous' })}
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground hover:bg-primary/10 hover:text-primary border-border'}`}
              >
                {L({ en: cat.nameEn, fr: cat.nameFr })}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="border rounded-xl overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-9 w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : !products?.length ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Package className="h-16 w-16 text-muted-foreground/40" />
              <p className="text-muted-foreground text-lg">{L({ en: 'No products found in this category', fr: 'Aucun produit trouvé dans cette catégorie' })}</p>
              <Button variant="outline" onClick={() => setSelectedCategory(undefined)}>
                {L({ en: 'View All Products', fr: 'Voir Tous les Produits' })}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={L({ en: product.nameEn, fr: product.nameFr })} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {product.categoryName && (
                      <span className="inline-block bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mb-2">
                        {product.categoryName}
                      </span>
                    )}
                    <h3 className="font-bold text-sm leading-tight mb-3 group-hover:text-primary transition-colors">
                      {L({ en: product.nameEn, fr: product.nameFr })}
                    </h3>
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/products/${product.slug}`}>{L({ en: 'View Details', fr: 'Voir les Détails' })}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
