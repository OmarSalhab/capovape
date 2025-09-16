import VapeCard from "./VapeCard";

export type Vape = {
	id: string;
	title: string;
	price: string;
	image: string;
	desc?: string;
	inStock?: boolean;
};

const mockVapes: Vape[] = [
	{
		id: "capo-uno",
		title: "Capo Uno",
		price: "$19.99",
		image: "/Ultra500-R01-1st-BlueRaspberry20mg.png",
		desc: "Classic rich tobacco with a hint of espresso.",
		inStock: true,
	},
	{
		id: "capo-due",
		title: "Capo Due",
		price: "$24.99",
		image: "/capo-vape-2.png",
		desc: "Smooth vanilla cream with bold throat hit.",
		inStock: false,
	},
	{
		id: "capo-tre",
		title: "Capo Tre ",
		price: "$22.49",
		image: "/capo-vape-3.png",
		desc: "Dark berry fusion with smoky undertones.",
		inStock: true,
	},
	{
		id: "capoas-tre",
		title: "Capo Tre",
		price: "$22.49",
		image: "/capo-vape-3.png",
		desc: "Dark berry fusion with smoky undertones.",
		inStock: false,
	},
];

export default function BrandVapeGrid({ brand }: { brand: string }) {
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

				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
					{mockVapes.map((v) => (
						<VapeCard key={v.id} vape={v} brand={brand} />
					))}
				</div>
			</div>
		</section>
	);
}
