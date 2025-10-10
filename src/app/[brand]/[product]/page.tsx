import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import Accordion from "@/components/Accordion";
import dbConnect from "../../../../lib/mongoose";
import Product, { IProduct } from "../../../../models/Product";
import type { Metadata } from 'next';

const SITE = 'https://capovape.ca';
const DEFAULT_IMAGE = '/capovape-logo.jpg';

export async function generateMetadata({ params }: { params: Promise<{ product: string; brand: string }> }): Promise<Metadata> {
  const { product: productId } = await params;
  await dbConnect();
  const doc = await Product.findOne({ productId }).select({ title: 1, brand: 1, image: 1, briefDescription: 1 }).lean();
  if (!doc) return { title: 'Product not found' };
  const url = `${SITE}/${encodeURIComponent(doc.brand)}/${encodeURIComponent(productId)}`;
  const title = `${doc.title} by ${doc.brand}`;
  const description = doc.briefDescription || 'Explore premium vapes at CapoVape Canada.';
  const image = doc.image || DEFAULT_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function VapeDetail({ params }: { params: Promise<{ product: string; brand: string }> }) {
  // Next.js dynamic route segments are named after the folder/file names.
  // This route is /[brand]/[product] so the param is `product` (not `id`).
  const { product: productId, brand } = await params;

  if (!productId) return notFound();

  await dbConnect();
  const product = await Product.findOne({ productId }).lean() as IProduct | null;
    
    
  if (!product) {
    // Use Next's notFound() to render a 404 page and stop rendering the route.
    return notFound();
  }
  
  const brief = product.briefDescription || '';
  const full = product.description || '';

  // JSON-LD Product schema for rich results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: product.image || DEFAULT_IMAGE,
    description: brief || full || 'Premium vape product from CapoVape Canada',
    sku: product.productId,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE}/${brand}/${product.productId}`,
      itemCondition: 'https://schema.org/NewCondition',
    },
  } as const;

  const items = [
    { id: "description", title: "Product Details", content: <p>{full}</p> },
    { id: "specs", title: "Device Specifications", content: (
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          {product.specification && Object.entries(product.specification).map(([k,v]) => (
            <li key={k}><strong>{k}:</strong> {String(v)}</li>
          ))}
        </ul>
      ) },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* JSON-LD for product rich results */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href={`/${brand}`} className="text-sm md:text-md text-muted-foreground underline">&larr; Back to {brand}</Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">
          <div className="w-full">
            <div className="w-full bg-black/60 rounded-md  flex items-center justify-center">
              <img src={product.image || '/capovape-logo.jpg'} alt={product.title} sizes="(max-width: 640px) 90vw, 640px" className="object-fill max-h-[70vh]" />
            </div>
          </div>

          <div>
            <h1 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] text-[var(--color-mafia)]">{product.title}</h1>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">{brief}</p>
            <div className="mt-4 text-2xl md:text-3xl text-[#F4EDE0] font-semibold">${product.price.toFixed(2)}</div>

            {/* Stock badge */}
            <div className="mt-3">
              {product.inStock === false ? (
                <div className="inline-block px-3 py-1 rounded-full bg-red-700 text-white text-sm font-medium">Out of stock</div>
              ) : (
                <div className="inline-block px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium">In stock</div>
              )}
            </div>

            <Accordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
