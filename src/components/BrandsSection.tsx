import Link from "next/link";

type Card = {
	href: string;
	title: string;
	subtitle: string;
	bg: string; // tailwind classes for background
	ring: string; // ring/border color classes
	glow: string; // css background for glow
};

const cards: Card[] = [
	{
		href: "/disposable-vapes",
		title: "DISPOSABLE VAPES",
		subtitle: "Ready when you are",
		bg: "bg-gradient-to-br from-[#3a321f] via-[#C5A66A]/40 to-[#6e5a2b]",
		ring: "ring-1 ring-[#C5A66A]/40",
		glow: "radial-gradient(55% 60% at 50% 50%, rgba(197,166,106,0.35), transparent)",
	},
	{
		href: "/pods-devices",
		title: "PODS & DEVICES",
		subtitle: "Build your ritual",
		bg: "bg-gradient-to-br from-[#0f2a1f] via-emerald-900/40 to-[#163b2a]",
		ring: "ring-1 ring-emerald-500/30",
		glow: "radial-gradient(55% 60% at 50% 50%, rgba(52,211,153,0.28), transparent)",
	},
	{
		href: "/e-liquids",
		title: "E-LIQUIDS",
		subtitle: "Bottled excellence",
		bg: "bg-gradient-to-br from-[#3a3a1f] via-yellow-700/40 to-[#6b5f1d]",
		ring: "ring-1 ring-yellow-400/30",
		glow: "radial-gradient(55% 60% at 50% 50%, rgba(250,204,21,0.28), transparent)",
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
					Handpicked brands trusted by Toronto’s connoisseurs — quality you can
					rely on.
				</p>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
					{cards.map((c) => (
						<Link key={c.href} href={c.href} prefetch className="group relative block">
							<div className={`relative md:h-52 overflow-hidden rounded-2xl ${c.bg} ${c.ring} p-8 md:p-10 transition-transform duration-300 group-hover:scale-[1.01]`}
								style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
							>
								<div className="absolute -inset-6 opacity-20 blur-2xl" style={{ background: c.glow }} />
								<div className="relative">
									<h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
										{c.title}
									</h3>
									<p className="mt-2 text-sm md:text-base text-white/80">
										{c.subtitle}
									</p>
									<div className="mt-6 inline-flex items-center gap-2 text-white/90 text-sm">
										Explore
										<span className="transition-transform group-hover:translate-x-0.5">→</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
