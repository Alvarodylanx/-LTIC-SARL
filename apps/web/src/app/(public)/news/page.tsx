'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { fadeInUp, scaleIn, stagger, staggerFast, viewportOnce } from '@/components/motion/variants';

export default function NewsPage() {
  const { L } = useLanguage();
  const { data: articles, isLoading } = useQuery<any[]>({
    queryKey: ['news'],
    queryFn: () => api.get('/api/news'),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-sidebar py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&auto=format&fit=crop&q=50"
            alt="News" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-sidebar/70 to-sidebar/80" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            {L({ en: 'News & Insights', fr: 'Actualités & Analyses' })}
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-sidebar-foreground mb-6">
            {L({ en: 'Industry News & Updates', fr: 'Actualités & Mises à Jour' })}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-sidebar-foreground/80 max-w-2xl mx-auto">
            {L({ en: 'Stay informed with the latest developments in global logistics, trade, and industrial supply.', fr: 'Restez informé des dernières évolutions en logistique mondiale, commerce et fournitures industrielles.' })}
          </motion.p>
        </motion.div>
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
            <motion.div variants={fadeInUp} initial="hidden" animate="show"
              className="flex flex-col items-center justify-center py-24 gap-4">
              <Newspaper className="h-16 w-16 text-muted-foreground/40" />
              <p className="text-muted-foreground text-lg">
                {L({ en: 'No news articles available yet.', fr: 'Aucun article disponible pour le moment.' })}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                  <motion.article key={article.id} variants={scaleIn}
                    whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col">
                    {article.imageUrl && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image src={article.imageUrl} alt={L({ en: article.titleEn, fr: article.titleFr })} fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
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
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight flex-1">
                        {L({ en: article.titleEn, fr: article.titleFr })}
                      </h2>
                      {(article.summaryEn || article.summaryFr) && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                          {L({ en: article.summaryEn || '', fr: article.summaryFr || '' })}
                        </p>
                      )}
                      <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                        <Link href={`/news/${article.id}`}
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all duration-200">
                          {L({ en: 'Read More', fr: 'Lire la Suite' })}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}


