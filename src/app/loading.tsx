export default function Loading() {
  return (
    <main className="animate-pulse">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-44 md:h-64 bg-neutral-800 rounded-lg mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <div className="h-6 bg-neutral-800 rounded w-3/4" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-800 rounded w-5/6" />
          </div>
          <div className="col-span-1 space-y-4">
            <div className="h-6 bg-neutral-800 rounded w-full" />
            <div className="h-40 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
