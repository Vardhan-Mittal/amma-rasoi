"use client";

import { useRef } from "react";
import { getProduct } from "@/content/products";
import { rhyme } from "@/content/rhymes";
import { useCart } from "@/lib/cart";
import { flyToCart, toast } from "@/lib/events";
import { useLang } from "@/lib/lang";

export function AddToCart({ slug, size, qty = 1, className = "", label }: { slug: string; size: string; qty?: number; className?: string; label?: string }) {
  const { add } = useCart();
  const { t } = useLang();
  const ref = useRef<HTMLButtonElement>(null);
  const p = getProduct(slug);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        add(slug, size, qty);
        flyToCart(ref.current!, p?.art.base);
        toast(`${rhyme("add").lines[0]} 😄`);
      }}
      className={`btn-wobble inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-5 py-2.5 font-semibold text-cream shadow-md shadow-maroon/20 transition hover:bg-maroon-deep ${className}`}
    >
      <span aria-hidden>＋</span>
      {label ?? t({ en: "Dabbe mein daalo", hi: "डब्बे में डालो" })}
    </button>
  );
}
