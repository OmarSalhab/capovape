"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { Navbar } from "./NavBar";
import { Input } from "./ui/input";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Brands", href: "#Brand" },
		{ name: "About", href: "#about" },
		{ name: "Contact Us", href: "#contact" },
	];
	return (
		<header className=" border-b border-border py-4 px-6 md:py-4 ">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center ">
					{/* Logo */}
					<Image src="/favicon.ico" alt="Capo Logo" width={100} height={50} />

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
	);
};

export default Navigation;
