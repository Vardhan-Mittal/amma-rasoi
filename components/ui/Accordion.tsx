"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { L } from "@/content/types";
import { T } from "@/lib/lang";

export function Accordion({ items }: { items: { q: L; a: L }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-maroon/10 rounded-3xl bg-white/70">
      {items.map((it, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-maroon"
          >
            <T {...it.q} />
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-kesar" aria-hidden>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-6 pb-5 text-ink">
                  <T {...it.a} />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
