import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {  Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Header";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const SITE = "https://capovape.ca";
const DEFAULT_TITLE = "CapoVape Canada | Premium Vapes, E‑Liquids, Pods";
const DEFAULT_DESC = "Discover premium disposables, e‑liquids, pods and devices at CapoVape Canada. Curated brands, fair prices, fast local service.";
const DEFAULT_IMAGE = "/capovape-logo.jpg";

export const metadata: Metadata = {
	metadataBase: new URL(SITE),
	title: {
		default: DEFAULT_TITLE,
		template: "%s | CapoVape Canada",
	},
	description: DEFAULT_DESC,
	applicationName: "CapoVape Canada",
	alternates: {
		canonical: SITE,
	},
	openGraph: {
		type: "website",
		url: SITE,
		title: DEFAULT_TITLE,
		description: DEFAULT_DESC,
		siteName: "CapoVape Canada",
		images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: "CapoVape" }],
		locale: "en_CA",
	},
	twitter: {
		card: "summary_large_image",
		site: "@capovape",
		creator: "@capovape",
		title: DEFAULT_TITLE,
		description: DEFAULT_DESC,
		images: [DEFAULT_IMAGE],
	},
	icons: {
		icon: "/favicon.ico",
	},
	other: {
		"geo.region": "CA-ON",
		"geo.placename": "Toronto",
		"geo.position": "43.6532;-79.3832",
		ICBM: "43.6532, -79.3832",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${geistMono.variable} antialiased`}>
				<ToastProvider>
					<Navigation />
					{children}
					<Footer />
					<Analytics />
				</ToastProvider>
			</body>
		</html>
	);
}
