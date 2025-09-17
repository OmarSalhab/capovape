export default function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-[4/5] animate-pulse overflow-hidden border border-[#222] "
				style={{
					background:
						"linear-gradient(135deg, rgba(45,10,10,0.4) 0%, rgba(45,10,10,0.4) 50%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,1) 100%)",
				}} />
      ))}
    </div>
  );
}
