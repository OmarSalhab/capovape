export default function PodsDevicesLoading() {
  return (
    <section className="py-12 animate-pulse">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-8 bg-neutral-800 rounded w-56 mb-2" />
        <div className="h-4 bg-neutral-800/80 rounded w-64 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#222] p-10">
              <div className="h-6 bg-neutral-800 rounded w-24 mb-2" />
              <div className="h-4 bg-neutral-800 rounded w-40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
