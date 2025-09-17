import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import Accordion from "@/components/Accordion";
import dbConnect from "../../../../lib/mongoose";
import Product, { IProduct } from "../../../../models/Product";

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
        <Link href={`/${brand}`} className="text-sm md:text-md text-muted-foreground underline">&larr; Back to {brand}</Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">
          <div className="w-full">
            <div className="w-full bg-black/60 rounded-md  flex items-center justify-center">
              <Image src={product.image || '/capovape-logo.jpg'} alt={product.title} width={640} height={640} className="object-fill max-h-[70vh]" />
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
