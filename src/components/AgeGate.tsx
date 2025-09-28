"use client";

import { useEffect, useState, useRef } from "react";

export default function AgeGate() {
	const [open, setOpen] = useState<boolean>(false);
	const enterRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		try {
			const ok = localStorage.getItem("capo_age_verified");
			if (!ok) setOpen(true);
		} catch {
			setOpen(true);
		}
	}, []);

	const accept = () => {
		try {
			localStorage.setItem("capo_age_verified", "true");
		} catch {
			// ignore storage failures
		}
		setOpen(false);
	};
	const decline = () => {
		window.location.href = "https://www.google.com";
	};

	// focus primary button and allow ESC to decline
	useEffect(() => {
		if (!open) return;
		enterRef.current?.focus();
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") decline();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="agegate-title"
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			{/* Panel */}
			<div className="relative z-10 w-full max-w-md rounded-2xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/95 border border-neutral-700/40 shadow-lg p-6">
				<header className="flex items-center gap-4">
					<div className="flex-none">
						<div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-md grid place-items-center text-black font-semibold">
							CV
						</div>
					</div>
					<div className="flex-1">
						<h2 id="agegate-title" className="text-lg font-semibold text-white">
							Age verification
						</h2>
						<p className="text-sm text-neutral-300/80">Please confirm your age</p>
					</div>
				</header>

				<hr className="my-4 border-neutral-700/40" />

				<div className="text-sm text-neutral-200 space-y-3">
					<p>
						To access this site you must be <strong>19 years or older</strong> (or
						the legal age in your jurisdiction). By entering you confirm your age.
					</p>
					<p className="text-xs text-neutral-400">
						This site contains information about nicotine products. Nicotine is
						addictive.
					</p>
				</div>

				<footer className="mt-6 flex gap-3">
					<button
						onClick={decline}
						className="flex-1 rounded-full border border-neutral-600/60 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700/30 transition"
					>
						Leave
					</button>
					<button
						ref={enterRef}
						onClick={accept}
						className="flex-1 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 text-sm transition shadow-sm"
						aria-label="Enter site - 19 or older"
					>
						Enter (19+)
					</button>
				</footer>
			</div>
		</div>
	);
}
