import BrandCard from "./BrandCard";

const Brands = [
	{ id: "allo", image: "/ALLO_Logo-410x205_500x.png" },
	{
		id: "beast",
		image: "/flavour-beast-logo-icon-age-gate-wht_500x_trans.png",
	},
];
export default function BrandsSection() {
	return (
		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0.5  bg-mafia-dark py-6 px-2">
			{Brands.map((brand, idx) => {
				return <BrandCard key={idx} brand={brand} />;
			})}
		</div>
	);
}
