import BrandVapeGrid from "@/components/BrandVapeGrid";
import React from "react";
import type { Metadata } from 'next';
import { brandLabel } from "@/lib/brands";

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

export default function PodsBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = React.use(params);
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#C5A66A]">
            {brand.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="mt-2 text-muted-foreground">A curated selection — Capo&apos;s finest.</p>
        </header>
        <BrandVapeGrid brand={brand} category="pods-devices" sub="pods" />
      </div>
    </section>
  );
}
