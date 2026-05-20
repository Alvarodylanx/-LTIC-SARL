import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lticsarl.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const STATIC_ROUTES = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/categories', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/news', priority: 0.7, changeFrequency: 'daily' as const },
  { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/quote', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/tracking', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
];

async function fetchSafe<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, news] = await Promise.all([
    fetchSafe<{ slug: string; updatedAt?: string }>('/api/products?limit=500'),
    fetchSafe<{ slug: string; updatedAt?: string }>('/api/categories'),
    fetchSafe<{ id: number; publishedAt?: string }>('/api/news?limit=500'),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE_URL}/news/${n.id}`,
    lastModified: n.publishedAt ? new Date(n.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...newsEntries];
}
