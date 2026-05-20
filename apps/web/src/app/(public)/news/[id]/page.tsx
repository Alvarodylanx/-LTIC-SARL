import { Metadata } from 'next';
import NewsArticleContent from './NewsArticleContent';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const article = await fetch(`${API_URL}/api/news/${params.id}`, {
      next: { revalidate: 3600 },
    }).then((r) => (r.ok ? r.json() : null));

    if (!article) return { title: 'News | LTIC SARL' };

    return {
      title: `${article.titleEn} | LTIC SARL`,
      description: article.summaryEn || '',
      openGraph: {
        title: `${article.titleEn} | LTIC SARL`,
        description: article.summaryEn || '',
        images: article.imageUrl ? [{ url: article.imageUrl }] : [],
        type: 'article',
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return { title: 'News | LTIC SARL' };
  }
}

export default function NewsArticlePage() {
  return <NewsArticleContent />;
}
