import BrandVapeGrid from "@/components/BrandVapeGrid";
import React from "react";

export default function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  // Next 15+ params is a promise; unwrap using React.use
  const unwrapped = React.use(params);
  const brand = unwrapped.brand;
  return <BrandVapeGrid brand={brand} />;
}
 