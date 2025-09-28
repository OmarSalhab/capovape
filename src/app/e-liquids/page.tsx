import BrandGrid from "@/components/BrandGrid";
import { BRAND_LOGOS } from "@/lib/brandLogos";
import { headers } from "next/headers";

export default async function ELiquidsPage() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/brands/available?category=e-liquids`, { cache: 'no-store' });
  const data = await res.json();
  const available = Array.isArray(data.brands) ? (data.brands as string[]) : [];
  const logos = BRAND_LOGOS.filter(b => available.includes(b.id));
  return (
    <BrandGrid
      title="E‑Liquids"
      subtitle="Explore bottled excellence by brand"
      basePath="/e-liquids"
      brands={logos}
    />
  );
}
