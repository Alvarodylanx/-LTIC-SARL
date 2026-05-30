import { Metadata } from 'next';
import ProductDetailContent from './ProductDetailContent';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchProduct(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) return { title: 'Product | LTIC SARL' };
  return {
    title: `${product.nameEn} | LTIC SARL`,
    description: product.descriptionEn || `${product.nameEn} — available from LTIC SARL, your global logistics and industrial supply partner.`,
    openGraph: {
      title: `${product.nameEn} | LTIC SARL`,
      description: product.descriptionEn || '',
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  return <ProductDetailContent initialProduct={product} />;
}
