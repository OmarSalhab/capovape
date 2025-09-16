"use client";
import { ArrowUpIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { Navbar } from "./NavBar";
import { Input } from "./ui/input";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Brands", href: "/#Brands" },
		{ name: "About", href: "/#about" },
		{ name: "Contact Us", href: "/#contact" },
	];

	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 300);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<header
				id="header"
				className=" border-b border-border py-4 px-6 md:py-4 font-cinzel"
			>
				<div
					className="hidden md:block text-[12px]"
					style={{ background: "#0c0c0c" }}
				>
					{" "}
					<div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between text-[#F4EDE0]/70">
						{" "}
						<div className="flex items-center gap-4">
							{" "}
							<span className="text-[#C5A66A]">
								<Phone className="w-4 h-4" />
							</span>{" "}
							<span>(416) 555-0123</span> <span className="opacity-40">•</span>{" "}
							<span className="text-[#C5A66A]">WhatsApp</span>{" "}
							<span>‪+1 416 555 0123‬</span>{" "}
						</div>{" "}
						<div className="flex items-center gap-3">
							{" "}
							<span className="text-[#C5A66A]">Hours:</span>{" "}
							<span>Mon–Sun 10:00–23:00</span>{" "}
						</div>{" "}
					</div>{" "}
				</div>
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center ">
						{/* Logo */}
						<Link href="/">
							<Image
								src="/favicon.ico"
								alt="Capo Logo"
								width={120}
								height={70}
							/>
						</Link>

						{/* Search Bar */}
						<div className="hidden md:block md:search-bar md:relative md:bg-muted md:border focus-within:border-b-red-600  md:rounded-full md:w-full md:max-w-md md:px-4 md:py-2">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
								<Input
									type="search"
									placeholder="Search premium vapes..."
									className="pl-10 bg-transparent border-none  placeholder:text-foreground  selection:text-red-600 text-lg"
								/>
							</div>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="text-foreground "
							>
								{isOpen ? (
									<X className="h-7 w-7" />
								) : (
									<Menu className="h-7 w-7" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden flex flex-col gap-2">
						<div className="search-bar relative bg-muted  border-l-3 focus-within:border-l-red-600  w-full max-w-md px-4 py-2">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
								<Input
									type="search"
									placeholder="Search premium vapes..."
									className="pl-10 bg-transparent border-none  placeholder:text-foreground  selection:text-red-600 text-[14px]"
								/>
							</div>
						</div>
						<div className=" flex flex-col justify-center items-center px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-black via-amber-400 to-black">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="block px-3 py-2 text-mafia-black font-serif font-semibold transition-colors text-[14px] uppercase"
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
				<Navbar />
			</header>
			{scrolled ? (
				<Link href="#header" className="">
					<div className="flex justify-center items-center fixed bottom-10 right-3 min-w-10 min-h-10 pt-2 bg-mafia rounded-md">
						<ArrowUpIcon className="w-5 h-5 text-black animate-bounce" />{" "}
					</div>
				</Link>
			) : (
				<></>
			)}
		</>
	);
};

export default Navigation;
