"use client";
import { motion } from "motion/react";
import Image from "next/image";
export default function Hero() {
	return (
		<section className="relative pt-20 font-cinzel" aria-label="Hero">
			{" "}
			{/* Dramatic lighting */}{" "}
			<div className="absolute inset-0 -z-10">
				{" "}
				<div
					className="w-full h-full"
					style={{
						background:
							"radial-gradient(1200px 600px at 20% -10%, rgba(255,255,255,0.06), transparent), radial-gradient(800px 400px at 80% 10%, rgba(197,166,106,0.08), transparent), linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.6)),",
					}}
				/>{" "}
			</div>
			<div className="mx-auto max-w-6xl px-4 pb-14 grid md:grid-cols-2 gap-8 items-center justify-center">
				<div>
					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="font-semibold text-mafia text-[39px] md:text-5xl leading-tight text-center uppercase"
						
					>
						The Godfather<br/> of Vape
						
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.05 }}
						className="mt-4 text-[#F4EDE0]/80 text-center"
					>
						Premium devices. No-nonsense service.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className="mt-6 flex items-center gap-3 justify-center font-serif"
					>
						<a
							href="#shop"
							className="px-5 py-2 rounded-md border border-[#C5A66A] text-[#C5A66A] tracking-wide uppercase text-sm hover:bg-[#C5A66A] hover:text-black transition"
						>
							Shop All
						</a>
						<a
							href="#contact"
							className="px-5 py-2 rounded-md bg-[#C5A66A] text-black tracking-wide uppercase text-sm hover:bg-[#A98B4A] transition"
						>
							Find Us
						</a>
					</motion.div>
				</div>
				<div className="relative">
					{/* Replace with an actual product/ambience photo */}
					<div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#3a2f15] bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(197,166,106,0.12)]">
						<img
							src="/favicon.ico"
							alt="Capo Vape showcase"
							className="w-full h-full object-cover object-center opacity-90 p-5"
						/>
					</div>
					{/* Soft spotlight */}
					<div
						className="pointer-events-none absolute -top-8 -right-8 w-56 h-56 rounded-full blur-[80px] opacity-30"
						style={{ background: "gold" }}
					/>
				</div>
			</div>
		</section>
	);
}
