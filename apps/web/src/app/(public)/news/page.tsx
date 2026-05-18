'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Newspaper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';

export default function NewsPage() {
  const { L } = useLanguage();
  const { data: articles, isLoading } = useQuery<any[]>({
    queryKey: ['news'],
    queryFn: () => api.get('/api/news'),
  });

  return (
    <>
      <section className="relative bg-sidebar py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&auto=format&fit=crop&q=50"
            alt="News"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {L({ en: 'News & Insights', fr: 'Actualités & Analyses' })}
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-sidebar-foreground mb-6">
            {L({ en: 'Industry News & Updates', fr: 'Actualités & Mises à Jour' })}
          </h1>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="border rounded-xl overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-5 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : !articles?.length ? (
            <div className="text-center py-24">
              <Newspaper className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {L({ en: 'No news articles available yet.', fr: 'Aucun article disponible pour le moment.' })}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  {article.imageUrl && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={L({ en: article.titleEn, fr: article.titleFr })}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span className="bg-primary/10 text-primary text-xs rounded-full px-2.5 py-0.5 font-medium">
                          {article.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.publishedAt), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {L({ en: article.titleEn, fr: article.titleFr })}
                    </h2>
                    {(article.summaryEn || article.summaryFr) && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                        {L({ en: article.summaryEn || '', fr: article.summaryFr || '' })}
                      </p>
                    )}
                    <Link href={`/news/${article.id}`} className="text-primary text-sm font-medium hover:underline">
                      {L({ en: 'Read More →', fr: 'Lire la Suite →' })}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
