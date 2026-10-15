"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/content/products";

const R = 17;
const ROWS = [5, 4, 3, 2, 1];

function positions(count: number) {
  const out: { x: number; y: number }[] = [];
  let left = count;
  ROWS.forEach((n, row) => {
    const take = Math.min(n, left);
    left -= take;
    const width = (take - 1) * R * 2;
    for (let i = 0; i < take; i++) out.push({ x: 100 - width / 2 + i * R * 2, y: 118 - row * 26 });
  });
  return out;
}

/** Hand-drawn pile of ladoos on a brass thali. `count` 1–15; new ones drop in. */
export function LadooArt({ product, count = 6, className = "" }: { product: Pick<Product, "slug" | "art">; count?: number; className?: string }) {
  const { art, slug } = product;
  const id = `lg-${slug}`;
  const pts = positions(Math.max(1, Math.min(15, count)));
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-label="Ladoos on a brass thali">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor={art.speck} />
          <stop offset="0.45" stopColor={art.base} />
          <stop offset="1" stopColor={art.shade} />
        </radialGradient>
        <linearGradient id={`${id}-brass`} x1="0" x2="1">
          <stop offset="0" stopColor="#A87A22" />
          <stop offset="0.5" stopColor="#E8C46A" />
          <stop offset="1" stopColor="#A87A22" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="140" rx="92" ry="16" fill="#8B6416" />
      <ellipse cx="100" cy="136" rx="92" ry="16" fill={`url(#${id}-brass)`} />
      <ellipse cx="100" cy="135" rx="74" ry="10" fill="#D6AE4E" />
      <AnimatePresence initial={false}>
        {pts.map((p, i) => (
          <motion.g
            key={i}
            initial={{ y: -140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <circle cx={p.x} cy={p.y} r={R} fill={`url(#${id})`} />
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} cx={p.x - 9 + ((k * 7 + i * 3) % 18)} cy={p.y - 8 + ((k * 5 + i * 7) % 16)} r={1.1} fill={art.speck} opacity={0.9} />
            ))}
            {art.topping && <path d={`M${p.x - 4} ${p.y - 12} l5 -3 l2 3 z`} fill={art.topping} />}
          </motion.g>
        ))}
      </AnimatePresence>
    </svg>
  );
}
