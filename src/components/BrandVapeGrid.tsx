"use client";
import BrandProductsClient from './BrandProductsClient';

export default function BrandVapeGrid({ brand, category, sub }: { brand: string; category?: string; sub?: string }) {
	return (
		<div>
			{/* Client-side fetch + skeleton + pagination */}
			<BrandProductsClient brand={brand} category={category} sub={sub} />
		</div>
	);
}
