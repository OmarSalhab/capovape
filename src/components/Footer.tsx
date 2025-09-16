import { Instagram, Phone, Mail, MapPin } from "lucide-react";

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
						<div className="w-8 h-8 rounded-full bg-[#141414] border border-[#3a2f15] grid place-items-center">
							🎩
						</div>{" "}
						<div
							className="font-mafia text-lg tracking-widest"
							style={{ color: "gold" }}
						>
							CAPO VAPE
						</div>{" "}
					</div>{" "}
					<p className="mt-3 text-sm mb-4">Premium devices. No-nonsense service.</p>{" "}
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
							<a className="hover:text-[#C5A66A]" href="#">
								All Products
							</a>
						</li>{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#">
								Pods
							</a>
						</li>{" "}
						<li>
							<a className="hover:text-[#C5A66A]" href="#">
								Disposables
							</a>
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
						1851 Lawrence Avenue East, Scarborough, ON
					</p>{" "}
					<p className="text-sm">(416) 555-0123</p>{" "}
					<p className="text-sm">support@capovape.ca</p>{" "}
				</div>{" "}
			</div>{" "}
			<div className="py-4 text-center text-xs text-[#F4EDE0]/60">
				© {new Date().getFullYear()} CAPO VAPE — All rights reserved.
			</div>{" "}
		</footer>
	);
}
