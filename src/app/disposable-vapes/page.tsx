import BrandGrid from "@/components/BrandGrid";
import { BRAND_LOGOS } from "@/lib/brandLogos";
import { headers } from "next/headers";

export default async function DisposableVapesPage() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/brands/available?category=disposable`, { cache: 'no-store' });
  const data = await res.json();
  const available = Array.isArray(data.brands) ? (data.brands as string[]) : [];
  const logos = BRAND_LOGOS.filter(b => available.includes(b.id));
  return (
    <BrandGrid
      title="Disposable Vapes"
      subtitle="Choose your house — tap a brand to explore"
      basePath="/"
      brands={logos}
    />
  );
}
