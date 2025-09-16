"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Vape } from "./BrandVapeGrid";

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
				className="aspect-[4/5] overflow-hidden border border-[#222]"
				style={{
					background:
						"linear-gradient(135deg, rgba(45,10,10,1) 0%, rgba(45,10,10,1) 50%, rgba(10,10,10,1) 50%, rgba(10,10,10,1) 100%)",
				}}
			>
				{/* Out of stock sticker */}
				{vape.inStock === false && (
					<div className="absolute z-20 mt-1 ml-1 font-mono transform  bg-red-700 text-white px-2 py-1 md:px-3 md:py-1 text-xs font-semibold rounded shadow-lg">
						OUT OF STOCK
					</div>
				)}
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
