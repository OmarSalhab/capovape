import BrandVapeGrid from "@/components/BrandVapeGrid";
import React, { Suspense } from "react";

export default function BrandPage({
	params,
}: {
	params: Promise<{ brand: string }>;
}) {
	// Next 15+ params is a promise; unwrap using React.use
	const unwrapped = React.use(params);
	const brand = unwrapped.brand;
	return (
		<section className="py-12">
			<div className="mx-auto max-w-6xl px-4">
				<header className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif text-[#C5A66A]">
						{brand
							.replace(/[-_]/g, " ")
							.replace(/\b\w/g, (c) => c.toUpperCase())}
					</h1>
					<p className="mt-2 text-muted-foreground">
						A curated selection &#8212; Capo&apos;s finest.
					</p>
				</header>
			<Suspense fallback={<p>Loading...</p>}>
				<BrandVapeGrid brand={brand} />
			</Suspense>
			</div>
		</section>
	);
}
