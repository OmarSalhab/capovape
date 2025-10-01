"use client";
import VapeCard from './VapeCard';

export type ProductFromApi = {
  productId: string;
  title: string;
  price: number;
  image: string;
  briefDescription?: string;
  description?: string;
  inStock: boolean;
  brand: string;
};

export default function BrandProductsClient({ products }: { products: ProductFromApi[] }) {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p) => (
            <VapeCard
              key={p.productId}
              vape={{
                id: p.productId,
                title: p.title,
                price: `$${p.price.toFixed(2)}`,
                image: p.image,
                desc: p.briefDescription,
                inStock: p.inStock,
              }}
              brand={p.brand}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">No products found.</div>
      )}
    </div>
  );
}
