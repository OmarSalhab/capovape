import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-10 border-t border-[#1d1a12] bg-black">
			{" "}
			<div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-8 text-[#F4EDE0]/80">
				{" "}
				<div>
					{" "}
					<div className="flex items-center gap-3">
						{" "}
						<Image src="/favicon.ico" alt="Capo Logo" width={100} height={70} />
					</div>{" "}
					<p className="mt-3 text-sm mb-4">
						Premium devices. No-nonsense service.
					</p>{" "}
					<div className="flex space-x-4">
						<a
							href="https://www.instagram.com/capovape.ca"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-mafia-gray hover:bg-white/30 p-3 transition-colors border border-white"
						>
							<Instagram size={20} className="text-primary" />
						</a>
					</div>
				</div>{" "}
				<div>
					{" "}
					<h4 className="text-[#C5A66A] font-mafia tracking-wider">
						Shop
					</h4>{" "}
					<ul className="mt-3 space-y-2 text-sm">
						{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#brands">
								All Products
							</a>
						</li>{" "}
						<li>
							<Link className="hover:text-[#C5A66A]" href="/pods-devices">
								Pods
							</Link>
						</li>{" "}
						<li>
							<Link className="hover:text-[#C5A66A]" href="/disposable-vapes">
								Disposables
							</Link>
						</li>{" "}
					</ul>{" "}
				</div>{" "}
				<div>
					{" "}
					<h4 className="text-[#C5A66A] font-mafia tracking-wider">
						Info
					</h4>{" "}
					<ul className="mt-3 space-y-2 text-sm">
						{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#contact">
								Find Us
							</a>
						</li>{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#">
								Age Verification
							</a>
						</li>{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#">
								Returns
							</a>
						</li>{" "}
					</ul>{" "}
				</div>{" "}
				<div id="contact">
					{" "}
					<h4 className="text-[#C5A66A] font-mafia tracking-wider">
						Contact
					</h4>{" "}
					<p className="mt-3 text-sm">
						1851 Lawrence Ave E, Scarborough, ON M1R 2Y3
					</p>{" "}
					<p className="text-sm">437-473-5223</p>{" "}
					<p className="text-sm">support@capovape.ca</p>{" "}
				</div>{" "}
			</div>{" "}
			<div className="py-4 text-center text-xs text-[#F4EDE0]/60">
				© {new Date().getFullYear()} SOLVENEAR — All rights reserved.
			</div>{" "}
		</footer>
	);
}
