import Head from "next/head";
import Image from "next/image";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
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
				<meta
					property="og:image"
					content="/capovape-logo.jpg"
				/>

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
				<meta
					name="twitter:image"
					content="/capovape-logo.jpg"
				/>
			</Head>

			<main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
				<Image
					src="/capovape-logo.jpg"
					alt="Capovape logo"
					width={200}
					height={42}
					priority
				/>

				<Image
					src="/coming-soon.webp"
					alt="coming soon.."
					width={140}
					height={52}
					priority
				/>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border  border-solid border-transparent transition-colors flex items-center justify-center bg-yellow-400 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-semibold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
						href="https://www.instagram.com/capovape.ca"
						target="_blank"
						rel="noopener noreferrer"
					>
						Follow us @capovape.ca →
					</a>
				</div>
			</main>
		</div>
	);
}
