export default function DisposableLoading() {
  return (
    <section className="py-12 animate-pulse">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-8 bg-neutral-800 rounded w-48 mb-2" />
        <div className="h-4 bg-neutral-800/80 rounded w-72 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-md overflow-hidden border border-[#222]">
              <div className="aspect-[4/5] bg-neutral-800" />
              <div className="p-2">
                <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-neutral-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
