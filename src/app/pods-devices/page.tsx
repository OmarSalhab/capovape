import Link from "next/link";

export default function PodsDevicesPage() {
  const cards = [
    {
      href: "/pods-devices/pods",
      title: "PODS",
      subtitle: "Flavor-forward, pocket-ready",
      bg: "bg-gradient-to-br from-[#0f2a1f] via-emerald-900/40 to-[#163b2a]",
      ring: "ring-1 ring-emerald-500/30",
      glow: "radial-gradient(55% 60% at 50% 50%, rgba(52,211,153,0.28), transparent)",
    },
    {
      href: "/pods-devices/devices",
      title: "DEVICES",
      subtitle: "Built for the long game",
      bg: "bg-gradient-to-br from-[#27272a] via-zinc-800/50 to-[#111112]",
      ring: "ring-1 ring-zinc-400/20",
      glow: "radial-gradient(55% 60% at 50% 50%, rgba(161,161,170,0.22), transparent)",
    },
  ];
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#C5A66A]">Pods & Devices</h1>
          <p className="mt-2 text-muted-foreground">Build your ritual with the right hardware.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} prefetch className="group relative block">
              <div className={`relative overflow-hidden rounded-2xl ${c.bg} ${c.ring} p-8 md:p-10 transition-transform duration-300 group-hover:scale-[1.01]`}
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
              >
                <div className="absolute -inset-6 opacity-20 blur-2xl" style={{ background: c.glow }} />
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">{c.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-white/80">{c.subtitle}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-white/90 text-sm">
                    Explore <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
