"use client";
import Image from "next/image";
import Link from "next/link";
import type { BrandLogo } from "@/lib/brandLogos";
import { BRAND_LOGOS } from "@/lib/brandLogos";

function joinPath(basePath: string, id: string) {
	if (!basePath || basePath === "/") return `/${id}`;
	return `${basePath.replace(/\/$/, "")}/${id}`;
}

export default function BrandGrid({
	title,
	subtitle,
	basePath = "/",
  brands = BRAND_LOGOS,
}: {
	title?: string;
	subtitle?: string;
	basePath?: string;
	brands?: BrandLogo[];
}) {
	return (
		<section className="py-12">
			<div className="mx-auto max-w-6xl px-4">
				{(title || subtitle) && (
					<header className="mb-8">
						{title && (
							<h2 className="text-center text-xl md:text-3xl tracking-[0.12em] text-[#C5A66A] ">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mt-2 text-center text-muted-foreground text-sm md:text-md">
								{subtitle}
							</p>
						)}
					</header>
				)}

				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 md:gap-6">
					{brands.map((brand) => {
						const href = joinPath(basePath, brand.id);
						const label = brand.id
							.replace(/[-_]/g, " ")
							.replace(/\b\w/g, (c) => c.toUpperCase());
						return (
							<Link
								key={brand.id}
								href={href}
								className="group relative"
								aria-label={label}
								prefetch={true}
							>
								<div
									className="aspect-square rounded-full p-[2px] transition-transform duration-300 group-hover:scale-[1.03]"
									style={{
										background:
											"conic-gradient(from 180deg, #C5A66A, #8f753f, #C5A66A)",
										boxShadow:
											"0 0 0 1px rgba(197,166,106,0.35), 0 6px 22px rgba(0,0,0,0.45)",
									}}
								>
									<div className="rounded-full h-full w-full bg-black/80 grid place-items-center border border-[#3a2f15]">
										<Image
											src={brand.image}
											alt={label}
											width={200}
											height={200}
											loading="lazy"
											className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-90 group-hover:opacity-100 transition mix-blend-screen"
										/>
									</div>
								</div>
								<div className="mt-3 text-center text-[#F4EDE0] text-sm tracking-wide opacity-90 group-hover:opacity-100">
									{label}
								</div>
								<div
									className="absolute -inset-2 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"
									style={{
										background:
											"radial-gradient(40% 40% at 50% 50%, #C5A66A, transparent)",
									}}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
