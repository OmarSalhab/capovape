import BrandVapeGrid from "@/components/BrandVapeGrid";
import React from "react";

export default function DevicesBrandPage({ params }: { params: Promise<{ brand: string }> }) {
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
        <BrandVapeGrid brand={brand} category="pods-devices" sub="devices" />
      </div>
    </section>
  );
}
