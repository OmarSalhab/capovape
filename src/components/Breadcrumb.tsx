"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const items = [{ label: "Home", href: "/" }, ...segments.map((s, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { label, href };
  })];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 py-3">
      <ol className="flex items-center text-xs md:text-lg text-muted-foreground space-x-2">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          // On small screens collapse middle items
          if (items.length > 3 && idx > 0 && idx < items.length - 2) {
            if (idx === 1) {
              return (
                <li key={idx} className="hidden sm:inline">/</li>
              );
            }
            if (idx > 1) return null;
          }

          return (
            <li key={idx} className="flex items-center">
              {!isLast ? (
                <Link href={it.href} className="text-xs md:text-sm  hover:underline text-muted-foreground">
                  {it.label}
                </Link>
              ) : (
                <span className="text-xs md:text-sm font-semibold text-[var(--color-mafia)]">{it.label}</span>
              )}
              {!isLast && <span className="mx-2 text-muted-foreground">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
