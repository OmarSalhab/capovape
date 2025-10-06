"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const touchStartX = useRef<number | null>(null);
	const touchCurrentX = useRef<number | null>(null);
	const isSwiping = useRef(false);

	const slides = [
		{
			id: 1,
			image:
				"/offer.webp",
		},
	];

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
		touchCurrentX.current = e.touches[0].clientX;
		isSwiping.current = true;
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (!isSwiping.current) return;
		touchCurrentX.current = e.touches[0].clientX;
	};

	const onTouchEnd = () => {
		if (!isSwiping.current || touchStartX.current === null || touchCurrentX.current === null) {
			isSwiping.current = false;
			touchStartX.current = null;
			touchCurrentX.current = null;
			return;
		}
		const dx = touchCurrentX.current - touchStartX.current;
		const threshold = 40; // px
		if (dx > threshold) {
			// swipe right -> previous
			prevSlide();
		} else if (dx < -threshold) {
			// swipe left -> next
			nextSlide();
		}

		isSwiping.current = false;
		touchStartX.current = null;
		touchCurrentX.current = null;
	};

	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, [nextSlide]);

	return (
		<section className="relative ">
			<div className="slider-container relative overflow-hidden rounded-xl border border-border">
				<div className="relative overflow-hidden">
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
					>
						{slides.map((slide) => (
							<div
								key={slide.id}
								className="slider-item w-full flex-shrink-0 max-h-52"
							>
								{/* <Image
									src={slide.image}
									alt="offers"
									width={300}
									height={288}
									className="object-fit h-72 w-full"
								/> */}
								<Image
									src={slide.image}
									alt="offers"
									width={600}
									height={240}
									className="w-full h-full object-fill object-center "
								/>
							</div>
						))}
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						className="absolute hidden md:block left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-mafia-dark/80 border border-border text-muted-foreground hover:text-mafia-gold hover:border-mafia-gold transition-all"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={nextSlide}
						className="absolute hidden md:block right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-mafia-dark/80 border border-border text-muted-foreground hover:text-mafia-gold hover:border-mafia-gold transition-all"
					>
						<ChevronRight className="w-6 h-6" />
					</button>

					{/* Dots Indicator */}
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`w-3 h-3 rounded-full transition-all ${
									currentSlide === index
										? "bg-mafia"
										: "bg-mafia-gray border border-border"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSlider;
