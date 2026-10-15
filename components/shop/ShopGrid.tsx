"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { products, type Product } from "@/content/products";
import { useLang } from "@/lib/lang";
import { ProductCard } from "./ProductCard";

const filters: { id: "all" | Product["category"]; label: { en: string; hi: string } }[] = [
  { id: "all", label: { en: "Sab", hi: "सब" } },
  { id: "classic", label: { en: "Classic", hi: "क्लासिक" } },
  { id: "winter", label: { en: "Sardi special", hi: "सर्दी स्पेशल" } },
  { id: "festival", label: { en: "Tyohaar", hi: "त्योहार" } },
];

export function ShopGrid() {
  const [f, setF] = useState<(typeof filters)[number]["id"]>("all");
  const { t } = useLang();
  const list = f === "all" ? products : products.filter((p) => p.category === f);

  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
        {filters.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setF(x.id)}
            aria-pressed={f === x.id}
            className={`relative rounded-full px-4 py-2 font-semibold transition ${f === x.id ? "text-cream" : "text-maroon hover:bg-maroon/5"}`}
          >
            {f === x.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative">{t(x.label)}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
