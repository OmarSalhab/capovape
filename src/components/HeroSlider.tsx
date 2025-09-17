"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			image:
				"/nic_warning_mobile_82fcaa6f-dab0-41b9-89a3-bde10b0370c5.webp",
		},
		{
			id: 2,
			image: "/nic_warning_mobile_82fcaa6f-dab0-41b9-89a3-bde10b0370c5.webp",
		},
		{
			id: 3,
			image: "/nic_warning_mobile_82fcaa6f-dab0-41b9-89a3-bde10b0370c5.webp",
		},
	];

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section className="relative ">
			<div className="slider-container relative overflow-hidden rounded-xl border border-border">
				<div className="relative overflow-hidden">
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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
								<img
									src={slide.image}
									alt="offers"
									className="w-full h-full object-contain object-center opacity-60"
								/>
							</div>
						))}
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-mafia-dark/80 border border-border text-muted-foreground hover:text-mafia-gold hover:border-mafia-gold transition-all"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-mafia-dark/80 border border-border text-muted-foreground hover:text-mafia-gold hover:border-mafia-gold transition-all"
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
