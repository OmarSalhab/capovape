"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Vape = {
	id: string;
	title: string;
	price: string;
	image?: string;
	desc: string | undefined;
	inStock: boolean;
};
export default function VapeCard({
	vape,
	brand,
}: {
	vape: Vape;
	brand: string;
}) {
	return (
		<motion.article
			whileHover={{ scale: 1.03 }}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35 }}
			className="group rounded-md overflow-hidden shadow-lg"
		>
			<div
				className="aspect-[4/5] relative overflow-hidden border border-[#222] bg-transparent"
			>
				{/* Out of stock sticker */}
				{vape.inStock === false && (
					<div className="absolute z-20 mt-1 ml-1 font-mono transform  bg-red-700 text-white px-2 py-1 md:px-3 md:py-1 text-xs font-semibold rounded shadow-lg">
						OUT OF STOCK
					</div>
				)}
				<Link href={`/${brand}/${vape.id}`} className="block w-full h-full">
					<div className="w-full h-full relative">
						{vape.image ? (
							<Image
								src={vape.image}
								alt={vape.title}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							/>
						) : (
							<div className="w-full h-full bg-[#111] flex items-center justify-center text-xs text-muted-foreground">No image</div>
						)}
					</div>
				</Link>
			</div>

			<div className="mt-3 px-1">
				<h3 className="text-sm sm:text-lg font-cinzel tracking-wide text-[var(--color-mafia)] uppercase text-wrap overflow-ellipsis">
					{vape.title}
				</h3>
				<div className="mt-2 flex items-center justify-between">
					<div className="text-sm sm:text-md sm:text-lg text-gray-100 font-medium font-serif">
						{vape.price}
					</div>
				</div>
			</div>
		</motion.article>
	);
}
