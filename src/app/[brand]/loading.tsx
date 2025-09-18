export default function BrandLoading() {
  return (
    <section className="py-12 animate-pulse">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-10 bg-neutral-800 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-neutral-800 rounded h-28" />
          ))}
        </div>
      </div>
    </section>
  );
}
