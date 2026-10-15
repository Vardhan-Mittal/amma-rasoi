"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { formatINR, type Product } from "@/content/products";
import { member } from "@/content/family";
import { rhyme } from "@/content/rhymes";
import { T } from "@/lib/lang";
import { AddToCart } from "./AddToCart";
import { ProductVisual } from "./ProductVisual";

/** Product on a brass thali; tilts in 3D under the pointer and staggers in on scroll. */
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 });
  const fav = product.favouriteOf ? member(product.favouriteOf) : undefined;
  const r = rhyme(product.rhymeId);
  const mid = product.sizes[1] ?? product.sizes[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.div
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const b = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - b.left) / b.width - 0.5);
          my.set((e.clientY - b.top) / b.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col rounded-3xl border border-maroon/10 bg-white/70 p-5 shadow-[0_10px_30px_-12px_rgb(107_26_26_/_0.35)] backdrop-blur"
      >
        {fav && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-mor px-2.5 py-1 text-xs font-semibold text-cream" style={{ transform: "translateZ(30px)" }}>
            {fav.emoji} {fav.name} <T en="ka favourite" hi="का फ़ेवरेट" />
          </span>
        )}
        <Link href={`/shop/${product.slug}`} className="block" aria-label={product.name.en}>
          <motion.div whileHover={{ rotate: 4, scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} style={{ transform: "translateZ(40px)" }}>
            <ProductVisual product={product} count={9} className="mx-auto mt-6 w-full max-w-[260px]" />
          </motion.div>
        </Link>
        <div className="mt-3 flex flex-1 flex-col" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display text-2xl text-maroon">
            <Link href={`/shop/${product.slug}`} className="hover:underline">
              <T {...product.name} />
            </Link>
          </h3>
          <p className="text-sm text-ink-soft">
            <T {...product.tagline} />
          </p>
          <p className="mt-2 font-hand text-lg leading-snug text-kesar">{r.lines[0]}</p>
          <div className="mt-auto pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-ink">{formatINR(mid.price)}</span>
              <span className="text-sm text-ink-soft">{mid.label}</span>
            </div>
            <AddToCart slug={product.slug} size={mid.label} className="mt-3 w-full whitespace-nowrap" />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
