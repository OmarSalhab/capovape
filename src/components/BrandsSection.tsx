import Image from "next/image";
import Link from "next/link";

const Brands = [
	{ id: "allo", image: "/ALLO_Logo-410x205_500x.png" },
	{
		id: "beast",
		image: "/flavour-beast-logo-icon-age-gate-wht_500x_trans.png",
	},
	{
		id: "ovns",
		image: "/OVNS-Logo.webp",
	},
];
export default function BrandsSection() {
	return (
		<section
			id="brands"
			className="relative py-12 md:py-16"
			style={{
				background: `radial-gradient(600px 220px at 20% -10%, rgba(197,166,106,0.05), transparent),
	radial-gradient(500px 260px at 80% 0%, rgba(197,166,106,0.07), transparent)`,
			}}
		>
			<div className="mx-auto max-w-6xl px-4">
				<h2 className="text-center text-xl md:text-3xl tracking-[0.12em] text-[#C5A66A] ">
					Curated Houses
				</h2>
				<p className="mt-2 text-center text-muted-foreground text-sm md:text-md">
					Handpicked brands trusted by Toronto’s connoisseurs — quality you can rely on.
				</p>

				<div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 md:gap-6">
					{Brands.map((brand) => {
						// link to the brand route (e.g. /allo)
						const href = `/${brand.id}`;
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
										<img
											src={brand.image}
											alt={label}
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
								></div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
