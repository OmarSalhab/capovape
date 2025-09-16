"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const mockVapes = [
  {
    id: "capo-uno",
    title: "Capo Uno",
    price: "$19.99",
    image: "/capo-vape-1.png",
    desc: "Classic rich tobacco with a hint of espresso.",
  },
  {
    id: "capo-due",
    title: "Capo Due",
    price: "$24.99",
    image: "/capo-vape-2.png",
    desc: "Smooth vanilla cream with bold throat hit.",
  },
  {
    id: "capo-tre",
    title: "Capo Tre",
    price: "$22.49",
    image: "/capo-vape-3.png",
    desc: "Dark berry fusion with smoky undertones.",
  },
];

import React from "react";

export default function VapeDetail({ params }: { params: Promise<{ id: string; brand: string }> }) {
  const unwrapped = React.use(params);
  const { id, brand } = unwrapped;
  const vape = mockVapes.find((v) => v.id === id) ?? mockVapes[0];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4">
        <Link href={`/${brand}`} className="text-sm text-muted-foreground underline">&larr; Back to {brand}</Link>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-6 bg-gradient-to-b from-[#080808] to-[#0f0f0f] p-6 rounded-lg border border-[#222] shadow-xl">
          <div className="md:flex md:gap-6 items-center">
            <div className="md:w-1/2 flex items-center justify-center bg-black/60 rounded-md p-4">
              <Image src={vape.image} alt={vape.title} width={420} height={240} className="object-contain" />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h2 className="text-2xl font-serif text-[#C5A66A]">{vape.title}</h2>
              <p className="mt-2 text-muted-foreground">{vape.desc}</p>
              <div className="mt-4 text-2xl text-[#F4EDE0] font-semibold">{vape.price}</div>
              <div className="mt-6">
                <button className="px-5 py-2 rounded-full bg-[#C5A66A] text-black font-semibold">Add to cart</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
