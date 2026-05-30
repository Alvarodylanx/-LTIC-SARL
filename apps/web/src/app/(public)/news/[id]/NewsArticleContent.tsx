'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { fadeInUp, fadeInLeft, stagger, viewportOnce } from '@/components/motion/variants';

export default function NewsArticlePage({ initialArticle }: { initialArticle?: any }) {
  const { id } = useParams<{ id: string }>();
  const { L } = useLanguage();

  const { data: article, isLoading, isError } = useQuery<any>({
    queryKey: ['news', id],
    queryFn: () => api.get(`/api/news/${id}`),
    initialData: initialArticle ?? undefined,
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: L({ en: article.titleEn, fr: article.titleFr }),
    description: L({ en: article.summaryEn || '', fr: article.summaryFr || '' }),
    image: article.imageUrl ? [article.imageUrl] : undefined,
    datePublished: article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'LTIC SARL',
      url: 'https://www.lticsarl.com',
    },
    author: { '@type': 'Organization', name: 'LTIC SARL' },
  };

  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <motion.div variants={stagger} initial="hidden" animate="show"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={fadeInLeft} className="mb-8">
          <Breadcrumb items={[
            { label: L({ en: 'Home', fr: 'Accueil' }), href: '/' },
            { label: L({ en: 'News', fr: 'Actualités' }), href: '/news' },
            { label: L({ en: article.titleEn, fr: article.titleFr }) },
          ]} />
        </motion.div>

        {article.imageUrl && (
          <motion.div variants={fadeInUp}
            className="relative aspect-video rounded-2xl overflow-hidden mb-8 group">
            <Image src={article.imageUrl} alt={L({ en: article.titleEn, fr: article.titleFr })} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
          {article.category && (
            <span className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 font-medium">{article.category}</span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(article.publishedAt), 'dd MMMM yyyy')}
          </span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight mb-8">
          {L({ en: article.titleEn, fr: article.titleFr })}
        </motion.h1>

        <motion.div variants={fadeInUp} className="prose prose-slate max-w-none">
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
        </motion.div>
      </motion.div>
    </div>
  );
}
