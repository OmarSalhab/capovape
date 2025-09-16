"use client";

import { useEffect, useState } from "react";

export default function AgeGate() {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		try {
			const ok = localStorage.getItem("capo_age_verified");
			if (!ok) setOpen(true);
		} catch (_) {
			setOpen(true);
		}
	}, []);

	const accept = () => {
		try {
			localStorage.setItem("capo_age_verified", "true");
		} catch (_) {}
		setOpen(false);
	};
	const decline = () => {
		window.location.href = "https://www.google.com";
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[100]">
			{" "}
			<div className="absolute inset-0 bg-black/80" />{" "}
			<div className="relative h-full w-full grid place-items-center p-4">
				{" "}
				<div className="w-full max-w-md rounded-2xl border border-[#3a2f15] bg-[#0B0B0B] text-[#F4EDE0] shadow-[0_0_0_1px_rgba(197,166,106,0.15)]">
					{" "}
					<div className="p-6">
						{" "}
						<div className="flex items-center gap-3">
							{" "}
							<div className="w-10 h-10 rounded-full bg-[#141414] border border-[#3a2f15] grid place-items-center">
								🎩
							</div>{" "}
							<h3
								className="font-mafia text-xl tracking-widest"
								style={{ color: "gold" }}
							>
								CAPO VAPE
							</h3>{" "}
						</div>{" "}
						<p className="mt-4 text-sm leading-relaxed">
							{" "}
							You must be{" "}
							<span className="text-[#C5A66A] font-semibold">
								19 years or older
							</span>{" "}
							to enter this site in Ontario.{" "}
						</p>{" "}
						<p className="mt-2 text-xs text-[#F4EDE0]/70">
							By clicking Enter, you verify that you are 19+ (or the legal age
							in your province/territory).{" "}
						</p>{" "}
						<div className="mt-6 grid grid-cols-2 gap-3">
							{" "}
							<button
								onClick={decline}
								className="px-4 py-2 rounded-full border border-[#3a2f15] text-[#F4EDE0]/80 hover:bg-black/40 transition text-sm"
							>
								Im under 19
							</button>{" "}
							<button
								onClick={accept}
								className="px-4 py-2 rounded-full border border-[#C5A66A] text-[#C5A66A] hover:bg-[#C5A66A] hover:text-black transition uppercase tracking-wide text-sm"
							>
								Enter (19+)
							</button>{" "}
						</div>{" "}
						<div className="mt-4 text-[10px] text-[#F4EDE0]/60">
							{" "}
							This site contains information about nicotine products. Nicotine
							is addictive.{" "}
						</div>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
}
