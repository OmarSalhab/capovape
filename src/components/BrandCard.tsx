"use client";
import Image from "next/image";
import { useState } from "react";

export default function BrandCard({
	brand,
}: {
	brand: { id: string; image: string };
}) {
	const [showButton, setShowButton] = useState(false);

	// Detect mobile (simple, can be improved)
	const isMobile =
		typeof window !== "undefined" &&
		window.matchMedia("(pointer: coarse)").matches;

	const handleCardClick = () => {
		if (isMobile) setShowButton((prev) => !prev);
	};

	return (
		<div
			className="relative group w-full aspect-[4/6] max-w-[160px] md:max-w-[200px] mx-auto border border-black rounded-xs overflow-hidden bg-black/80 shadow-sm transition-all duration-300"
			onClick={handleCardClick}
			tabIndex={0}
			style={{ touchAction: "manipulation" }}
		>
			<div className="flex items-center justify-center w-full h-full bg-primary transition-colors duration-300 group-hover:bg-black/50">
				<Image
					src={brand.image}
					width={120}
					height={120}
					alt="brand logo"
					className="object-contain max-h-24"
					priority
				/>
			</div>
			{/* Overlay for hover/click */}
			<div
				className={`
                    absolute bottom-0 left-0 w-full flex justify-center
                    transition-all duration-300
                    ${
											isMobile
												? showButton
													? "translate-y-0 opacity-100"
													: "translate-y-full opacity-0"
												: "group-hover:translate-y-0 group-hover:opacity-100 translate-y-full opacity-0"
										}
                `}
				style={{ pointerEvents: isMobile && !showButton ? "none" : "auto" }}
			>
				<button
					className="mb-3 px-4 py-2 bg-red-600 text-white rounded-full shadow-lg text-sm font-semibold transition hover:bg-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-400"
					onClick={(e) => e.stopPropagation()}
				>
					Show Products
				</button>
			</div>
		</div>
	);
}
