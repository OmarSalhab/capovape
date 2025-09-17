import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {  Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Header";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CapoVape Canada",
	description:
		"Discover CapoVape Canada’s wide selection of premium vapes, e-liquids, pods, and accessories. Shop the latest vape devices and flavors for an exceptional vaping experience.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${geistMono.variable} antialiased`}>
				<Navigation />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
