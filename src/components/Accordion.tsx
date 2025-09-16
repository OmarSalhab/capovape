"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3 mt-6">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="border border-[#222] rounded-md overflow-hidden bg-[rgba(10,10,10,0.6)]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#F4EDE0]"
            >
              <span className="font-serif text-[var(--color-mafia)]">{it.title}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="px-4 pb-4 text-sm text-muted-foreground"
                  style={{ overflow: "hidden" }}
                >
                  <div className="pt-2">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
