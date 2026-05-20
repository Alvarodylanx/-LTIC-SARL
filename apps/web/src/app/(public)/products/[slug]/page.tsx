import { Metadata } from 'next';
import ProductDetailContent from './ProductDetailContent';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const product = await fetch(`${API_URL}/api/products/${encodeURIComponent(params.slug)}`, {
      next: { revalidate: 3600 },
    }).then((r) => (r.ok ? r.json() : null));

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
  } catch {
    return { title: 'Product | LTIC SARL' };
  }
}

export default function ProductDetailPage() {
  return <ProductDetailContent />;
}
