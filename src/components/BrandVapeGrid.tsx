"use client";
import BrandProductsClient from './BrandProductsClient';

export default function BrandVapeGrid({ brand }: { brand: string }) {
	return (
		<div>
			{/* Client-side fetch + skeleton + pagination */}
			<BrandProductsClient brand={brand} />
		</div>
	);
}
