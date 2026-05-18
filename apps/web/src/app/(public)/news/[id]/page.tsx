'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { L } = useLanguage();

  const { data: article, isLoading, isError } = useQuery<any>({
    queryKey: ['news', id],
    queryFn: () => api.get(`/api/news/${id}`),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="aspect-video w-full rounded-xl mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="space-y-3">
          {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">{L({ en: 'Article Not Found', fr: 'Article Introuvable' })}</h1>
        <Link href="/news" className="text-primary hover:underline">{L({ en: '← Back to News', fr: '← Retour aux Actualités' })}</Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {L({ en: 'Back to News', fr: 'Retour aux Actualités' })}
        </Link>

        {article.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image src={article.imageUrl} alt={L({ en: article.titleEn, fr: article.titleFr })} fill className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          {article.category && (
            <span className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 font-medium">{article.category}</span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(article.publishedAt), 'dd MMMM yyyy')}
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-8">
          {L({ en: article.titleEn, fr: article.titleFr })}
        </h1>

        <div className="prose prose-slate max-w-none">
          {(L({ en: article.contentEn || article.summaryEn || '', fr: article.contentFr || article.summaryFr || '' }))
            .split('\n\n')
            .map((para: string, i: number) => (
              para.startsWith('**') ? (
                <h3 key={i} className="text-xl font-bold mt-6 mb-3">{para.replace(/\*\*/g, '')}</h3>
              ) : para.startsWith('1.') || para.startsWith('-') ? (
                <ul key={i} className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {para.split('\n').map((line: string, j: number) => (
                    <li key={j} className="text-sm">{line.replace(/^[\d]+\.\s|-\s/, '')}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              )
            ))}
        </div>
      </div>
    </div>
  );
}
