export default function ProductLoading() {
  return (
    <section className="py-12 animate-pulse">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-neutral-800 rounded" />
          <div className="space-y-4">
            <div className="h-6 bg-neutral-800 rounded w-2/3" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-10 bg-neutral-800 rounded w-1/3" />
          </div>
        </div>
      </div>
    </section>
  );
}
