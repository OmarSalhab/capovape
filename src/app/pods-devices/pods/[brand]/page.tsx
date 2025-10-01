import BrandVapeGrid from "@/components/BrandVapeGrid";
import type { Metadata } from 'next';
import { brandLabel } from "@/lib/brands";
import { ProductFromApi } from '@/components/BrandProductsClient';

const SITE = 'https://capovape.ca';
const DEFAULT_IMAGE = '/capovape-logo.jpg';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  const label = brandLabel(brand);
  const title = `${label} Pods in Canada`;
  const description = `Shop ${label} pods at CapoVape Canada.`;
  const url = `${SITE}/pods-devices/pods/${encodeURIComponent(brand)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, images: [{ url: DEFAULT_IMAGE }] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_IMAGE] },
  };
}

export default async function PodsBrandPage({ params }: { params: Promise<{ brand: string }>}) {
  const { brand } =await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(
    `${baseUrl}/api/products/pods/${encodeURIComponent(brand)}`,
    { cache: 'force-cache' }
  );
  const data = await res.json();
  const products: ProductFromApi[] = data.products || [];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#C5A66A]">
            {brand.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="mt-2 text-muted-foreground">A curated selection — Capo&apos;s finest.</p>
        </header>
        <BrandVapeGrid products={products} />
      </div>
    </section>
  );
}
