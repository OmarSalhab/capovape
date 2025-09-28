"use client";
import { useEffect, useState } from 'react';
import VapeCard from './VapeCard';
import SkeletonGrid from './SkeletonGrid';

type ProductFromApi = {
  productId: string;
  title: string;
  price: number;
  image: string;
  briefDescription?: string;
  description?: string;
  inStock: boolean;
};

export default function BrandProductsClient({ brand, category, sub }: { brand: string; category?: string; sub?: string }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductFromApi[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const params = new URLSearchParams();
    params.set('brand', brand);
    params.set('page', String(page));
    if (category) params.set('category', category);
    if (sub) params.set('sub', sub);
    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data.ok) {
          setProducts(data.products || []);
          setTotalPages(data.totalPages || 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setProducts([]);
        setTotalPages(1);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [brand, category, sub, page]);

  return (
    <div>
      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p) => (
            <VapeCard
              key={p.productId}
              vape={{ id: p.productId, title: p.title, price: `$${p.price.toFixed(2)}`, image: p.image, desc: p.briefDescription, inStock: p.inStock }}
              brand={brand}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
          Prev
        </button>
        <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
        <button className="px-3 py-1 rounded border" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
