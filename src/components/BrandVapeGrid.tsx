"use client";
import BrandProductsClient, { ProductFromApi } from './BrandProductsClient';

export default function BrandVapeGrid({ products }: { products: ProductFromApi[] }) {
	return (
		<div>
			<BrandProductsClient products={products} />
		</div>
	);
}
