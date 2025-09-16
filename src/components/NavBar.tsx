import Link from "next/link";

export function Navbar() {
	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Brands", href: "/#Brands" },
		{ name: "About", href: "/#about" },
		{ name: "Contact Us", href: "/#contact" },
	];

	return (
		<nav className="container mx-auto px-4 font-cinzel">
			<div className="hidden md:flex md:items-center md:h-16 md:justify-around">
				{/* Desktop Navigation */}
				<div className="hidden md:flex md:items-center md:gap-12">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="font-serif text-muted-foreground hover:text-foreground transition-colors font-medium text-lg uppercase"
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
