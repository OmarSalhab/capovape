"use client";
import Image from "next/image";
// framer-motion not needed in this page (Accordion handles animations)
import Link from "next/link";

const mockVapes = [
  {
    id: "capo-uno",
    title: "Capo Uno",
    price: "$19.99",
    image: "/Allo-Subscription-BC-APR2025-WebBanner-Mobile-750x970_800x.png",
    desc: "Classic rich tobacco with a hint of espresso.",
    inStock: true,
  },
  {
    id: "capo-due",
    title: "Capo Due",
    price: "$24.99",
    image: "/capo-vape-2.png",
    desc: "Smooth vanilla cream with bold throat hit.",
    inStock: false,
  },
  {
    id: "capo-tre",
    title: "Capo Tre",
    price: "$22.49",
    image: "/capo-vape-3.png",
    desc: "Dark berry fusion with smoky undertones.",
    inStock: true,
  },
];

import React from "react";
import Accordion from "@/components/Accordion";

export default function VapeDetail({ params }: { params: Promise<{ id: string; brand: string }> }) {
  const unwrapped = React.use(params);
  const { id, brand } = unwrapped;
  const vape = mockVapes.find((v) => v.id === id) ?? mockVapes[0];

  const items = [
    { id: "description", title: "Product Details", content: <p>{vape.desc}</p> },
    { id: "specs", title: "Device Specifications", content: (
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>E-Liquid Capacity: 2mL</li>
          <li>Battery: Built-in</li>
          <li>Nicotine Strength: 20mg/mL</li>
        </ul>
      ) },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Link href={`/${brand}`} className="text-sm md:text-md text-muted-foreground underline">&larr; Back to {brand}</Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">
          <div className="w-full">
            <div className="w-full bg-black/60 rounded-md  flex items-center justify-center">
              <Image src={vape.image} alt={vape.title} width={640} height={640} className="object-fill max-h-[70vh]" />
            </div>
          </div>

          <div>
            <h1 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] text-[var(--color-mafia)]">{vape.title}</h1>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">{vape.desc}</p>
            <div className="mt-4 text-2xl md:text-3xl text-[#F4EDE0] font-semibold">{vape.price}</div>

            {/* Stock badge */}
            <div className="mt-3">
              {vape.inStock === false ? (
                <div className="inline-block px-3 py-1 rounded-full bg-red-700 text-white text-sm font-medium">Out of stock</div>
              ) : (
                <div className="inline-block px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium">In stock</div>
              )}
            </div>

            <Accordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
