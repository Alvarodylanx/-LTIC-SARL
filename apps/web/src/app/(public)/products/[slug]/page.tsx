'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { L } = useLanguage();

  const { data: allProducts, isLoading } = useQuery<any[]>({
    queryKey: ['products', 'all'],
    queryFn: () => api.get('/api/products?limit=200'),
  });

  const product = allProducts?.find((p) => p.slug === slug);

  const { data: relatedProducts } = useQuery<any[]>({
    queryKey: ['products', 'related', product?.categoryId],
    queryFn: () => api.get(`/api/products?categoryId=${product!.categoryId}&limit=5`),
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">{L({ en: 'Product Not Found', fr: 'Produit Introuvable' })}</h1>
        <Button asChild><Link href="/products">{L({ en: 'Back to Products', fr: 'Retour aux Produits' })}</Link></Button>
      </div>
    );
  }

  const related = relatedProducts?.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {L({ en: 'Back to Products', fr: 'Retour aux Produits' })}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={L({ en: product.nameEn, fr: product.nameFr })} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground/30" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            {product.categoryName && (
              <span className="inline-block bg-primary/10 text-primary text-xs rounded-full px-3 py-1 mb-4">
                {product.categoryName}
              </span>
            )}
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {L({ en: product.nameEn, fr: product.nameFr })}
            </h1>
            <div className="mb-6">
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${product.available ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                <CheckCircle2 className="h-4 w-4" />
                {product.available ? L({ en: 'Available', fr: 'Disponible' }) : L({ en: 'Unavailable', fr: 'Indisponible' })}
              </span>
            </div>
            {(product.descriptionEn || product.descriptionFr) && (
              <div className="prose prose-sm max-w-none text-muted-foreground mb-8 leading-relaxed">
                <p>{L({ en: product.descriptionEn || '', fr: product.descriptionFr || '' })}</p>
              </div>
            )}
            {product.specifications && (
              <div className="mb-8">
                <h3 className="font-bold mb-3">{L({ en: 'Specifications', fr: 'Spécifications' })}</h3>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{product.specifications}</pre>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <Link href={`/quote?product=${encodeURIComponent(L({ en: product.nameEn, fr: product.nameFr }))}`}>
                  {L({ en: 'Request a Quote', fr: 'Demander un Devis' })}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1">
                <Link href="/contact">{L({ en: 'Contact Us', fr: 'Nous Contacter' })}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related && related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">{L({ en: 'Related Products', fr: 'Produits Similaires' })}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                    {p.imageUrl && <Image src={p.imageUrl} alt={L({ en: p.nameEn, fr: p.nameFr })} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">{L({ en: p.nameEn, fr: p.nameFr })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
