import AboutSection from "@/components/AboutSection";
import AgeGate from "@/components/AgeGate";
import BrandsSection from "@/components/BrandsSection";
import Hero from "@/components/Hero";
import HeroSlider from "@/components/HeroSlider";
import Head from "next/head";

export default function Home() {
	return (
		<div className="font-sans">
			<Head>
				<title>CapoVape Canada | Premium Vapes & E-Liquids</title>
				<meta
					name="description"
					content="Discover CapoVape Canada’s wide selection of premium vapes, e-liquids, pods, and accessories. Shop the latest vape devices and flavors for an exceptional vaping experience."
				/>
				<link rel="icon" href="/capovape-logo.jpg" />
				<meta
					name="keywords"
					content="vape Canada, CapoVape, e-liquids, vape pods, vape devices, premium vapes, vaping accessories, vape shop Canada"
				/>
				<link rel="canonical" href="https://capovape.ca" />

				{/* Open Graph (for Facebook, LinkedIn, etc.) */}
				<meta
					property="og:title"
					content="CapoVape Canada | Premium Vapes & E-Liquids"
				/>
				<meta
					property="og:description"
					content="Shop CapoVape Canada for high-quality vapes, e-liquids, pods, and accessories. Enjoy the latest flavors and devices for an unbeatable vaping experience."
				/>
				<meta property="og:url" content="https://capovape.ca" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/capovape-logo.jpg" />

				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="UTF-8" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="CapoVape Canada | Premium Vapes & E-Liquids"
				/>
				<meta
					name="twitter:description"
					content="Discover CapoVape Canada’s premium vapes, pods, e-liquids, and accessories. Shop now for the best vaping experience."
				/>
				<meta name="twitter:image" content="/capovape-logo.jpg" />
			</Head>

			<main className="">
				<HeroSlider />
				<Hero/>
				<BrandsSection />
				<AboutSection />
				<AgeGate/>
			</main>
		</div>
	);
}
