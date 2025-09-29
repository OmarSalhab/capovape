"use client";
import { ArrowUpIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { Navbar } from "./NavBar";
import { Input } from "./ui/input";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Brands", href: "/#brands" },
		{ name: "About", href: "/#about" },
		{ name: "Contact Us", href: "/#contact" },
	];

	const [scrolled, setScrolled] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Array<{ title: string; productId: string; brand?: string }>>([]);
	// loading state intentionally omitted (not displayed)
	const resultsRef = useRef<HTMLDivElement | null>(null);
	const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const router = useRouter();
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 300);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Debounced search
	useEffect(() => {
		if (!query || query.trim().length === 0) {
			setResults([]);
			return;
		}

		// kick off debounced search
		const id = setTimeout(async () => {
			try {
				const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
				if (res.ok) {
					const data = await res.json();
					setResults(data.products || []);
				} else {
					setResults([]);
				}
			} catch (err) {
				console.error('Search error', err);
				setResults([]);
			}
		}, 250);

		return () => clearTimeout(id);
	}, [query]);

	// Close results on outside click
	useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
				setResults([]);
			}
		}
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	// clear any pending blur timeout on unmount
	useEffect(() => {
		return () => {
			const toClear = blurTimeout.current;
			if (toClear) clearTimeout(toClear as unknown as number);
		};
	}, []);

	function handleInputBlur() {
		// delay hiding to allow click events on results to register
		blurTimeout.current = setTimeout(() => setResults([]), 150);
	}

	function handleInputFocus() {
		if (blurTimeout.current) {
			clearTimeout(blurTimeout.current as unknown as number);
			blurTimeout.current = null;
		}
	}

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
							<span>437-473-5223</span> <span className="opacity-40">•</span>{" "}
							<span className="text-[#C5A66A]">WhatsApp</span>{" "}
							<span>‪437-473-5223‬</span>{" "}
						</div>{" "}
						<div className="flex items-center gap-3">
							{" "}
							<span className="text-[#C5A66A]">Hours:</span>{" "}
							<span>Daily 12:00 PM–10:00 PM</span>{" "}
						</div>{" "}
					</div>{" "}
				</div>
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center ">
						{/* Logo */}
						<Link href="/">
							<Image src="/favicon.ico" alt="Capo Logo" width={120} height={70} />
						</Link>

						{/* Search Bar */}
						<div className="hidden md:block md:search-bar md:relative md:bg-muted md:border focus-within:border-b-red-600  md:rounded-full md:w-full md:max-w-md md:px-4 md:py-2">
							<div className="relative" ref={resultsRef}>
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
								<Input
									type="search"
									placeholder="Search premium vapes..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
									onBlur={handleInputBlur}
									onFocus={handleInputFocus}
									className="pl-10 bg-transparent border-none  placeholder:text-foreground  selection:text-red-600 text-lg"
								/>

								{/* Results dropdown */}
								{results.length > 0 && (
									<div className="absolute left-0 right-0 mt-2 bg-white text-black rounded shadow-lg z-50 max-h-64 overflow-auto">
										{results.map((r) => (
											<div key={r.productId} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => router.push(`/${r.brand || ''}/${r.productId}`)}>
												<div className="font-medium">{r.title}</div>
												<div className="text-xs text-muted-foreground">{r.brand}</div>
											</div>
										))}
									</div>
								)}
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
							<div className="relative" ref={resultsRef}>
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
								<Input
									type="search"
									placeholder="Search premium vapes..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
									onBlur={handleInputBlur}
									onFocus={handleInputFocus}
									className="pl-10 bg-transparent border-none  placeholder:text-foreground  selection:text-red-600 text-base"
								/>

								{/* Mobile results (same UI) */}
								{results.length > 0 && (
									<div className="absolute left-0 right-0 mt-2 bg-white text-black rounded shadow-lg z-50 max-h-64 overflow-auto">
										{results.map((r) => (
											<div key={r.productId} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setIsOpen(false); router.push(`/${r.brand || ''}/${r.productId}`); }}>
												<div className="font-medium">{r.title}</div>
												<div className="text-xs text-muted-foreground">{r.brand}</div>
											</div>
										))}
									</div>
								)}
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
					<div className="flex justify-center items-center fixed bottom-10 right-3 min-w-10 min-h-10 pt-2 bg-mafia rounded-md z-50">
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
