"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const HeroSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			id: 1,
			image: "/ALLO_SYNC_NOV2023_allo.ca_Available_Now_Mobile_Banner_750x970_bbf72983-cae7-419a-8881-9b675c52a98c_800x.png",
		},
		{
			id: 2,
			image: "/Allo-Subscription-BC-APR2025-WebBanner-Mobile-750x970_800x.png",
		},
		{
			id: 3,
			image: "/nic_warning_mobile_4dee37ea-ec44-4c94-8e32-82958de204d5.png",
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
								className="slider-item w-full flex-shrink-0 max-h-72"
							>
								<Image
									src={slide.image}
									alt="offers"
									width={300}
									height={288}
									className="object-fit h-72 w-full"
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
