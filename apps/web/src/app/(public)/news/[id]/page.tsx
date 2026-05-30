import { Metadata } from 'next';
import NewsArticleContent from './NewsArticleContent';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchArticle(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/news/${id}`, {
      next: { revalidate: 3600 },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await fetchArticle(params.id);
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
}

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = await fetchArticle(params.id);
  return <NewsArticleContent initialArticle={article} />;
}
