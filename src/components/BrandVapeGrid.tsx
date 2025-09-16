"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Vape = {
	id: string;
	title: string;
	price: string;
	image: string;
	desc?: string;
};

const mockVapes: Vape[] = [
	{
		id: "capo-uno",
		title: "Capo Uno",
		price: "$19.99",
		image: "/Ultra500-R01-1st-BlueRaspberry20mg.png",
		desc: "Classic rich tobacco with a hint of espresso.",
	},
	{
		id: "capo-due",
		title: "Capo Due",
		price: "$24.99",
		image: "/capo-vape-2.png",
		desc: "Smooth vanilla cream with bold throat hit.",
	},
	{
		id: "capo-tre",
		title: "Capo Tre ",
		price: "$22.49",
		image: "/capo-vape-3.png",
		desc: "Dark berry fusion with smoky undertones.",
	},
	{
		id: "capoas-tre",
		title: "Capo Tre",
		price: "$22.49",
		image: "/capo-vape-3.png",
		desc: "Dark berry fusion with smoky undertones.",
	},
];

function VapeCard({ vape, brand }: { vape: Vape; brand: string }) {
	return (
		<motion.article
			whileHover={{ scale: 1.03 }}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35 }}
			className="group rounded-md overflow-hidden shadow-lg"
		>
			<div
				className="aspect-square overflow-hidden border border-[#222]"
				style={{
					background:
						"linear-gradient(135deg, rgba(45,10,10,1) 0%, rgba(45,10,10,1) 50%, rgba(10,10,10,1) 50%, rgba(10,10,10,1) 100%)",
				}}
			>
				<Link
					href={`/${brand}/${vape.id}`}
					className="text-xs text-[#F4EDE0] opacity-80 hover:opacity-100"
				>
					<div className="w-full h-full grid place-items-center p-4">
						<Image
							src={vape.image}
							alt={vape.title}
							width={380}
							height={380}
							className="object-contain max-h-[100%]"
						/>
					</div>
				</Link>
			</div>

			<div className="mt-3 px-1">
				<h3 className="text-xl font-cinzel tracking-wide text-[var(--color-mafia)] uppercase text-wrap overflow-ellipsis">
					{vape.title} 
				</h3>
				<div className="mt-2 flex items-center justify-between">
					<div className="text-md sm:text-lg text-white font-medium font-serif">
						{vape.price}
					</div>
				</div>
			</div>
		</motion.article>
	);
}

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
