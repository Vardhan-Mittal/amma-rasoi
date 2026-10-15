"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { formatINR, type Product } from "@/content/products";
import { member } from "@/content/family";
import { whatsappLink } from "@/content/site";
import { T, useLang } from "@/lib/lang";
import { Jharokha } from "@/components/ui/Jharokha";
import { RhymeWriter } from "@/components/motion/RhymeWriter";
import { SteamWisps } from "@/components/motion/Ambient";
import { AddToCart } from "./AddToCart";
import { ProductVisual } from "./ProductVisual";

/** Product page body: pick a size and quantity and watch the ladoos pile up on the thali. */
export function ProductDetail({ product: p }: { product: Product }) {
  const { t } = useLang();
  const [size, setSize] = useState(p.sizes[1]?.label ?? p.sizes[0].label);
  const [qty, setQty] = useState(1);
  const s = p.sizes.find((x) => x.label === size)!;
  const pile = Math.min(15, Math.max(1, Math.round((s.grams / 250) * 2 * qty)));
  const fav = p.favouriteOf ? member(p.favouriteOf) : undefined;

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-2">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Jharokha className="mx-auto aspect-[4/5] w-full max-w-md">
          <div className="absolute inset-0 grid place-items-end bg-gradient-to-b from-haldi/40 to-cream-deep pb-8">
            <SteamWisps className="absolute left-1/2 top-[18%] h-24 w-20 -translate-x-1/2 opacity-90" />
            <ProductVisual product={p} count={pile} className="w-[88%]" priority />
          </div>
        </Jharokha>
        <p className="mt-4 text-center text-sm text-ink-soft" aria-live="polite">
          <T en={`About ${Math.round(s.grams / 40) * qty} ladoos in your order`} hi={`आपके ऑर्डर में लगभग ${Math.round(s.grams / 40) * qty} लड्डू`} />
        </p>
      </div>

      <div>
        {fav && (
          <span className="inline-block rounded-full bg-mor px-3 py-1 text-sm font-semibold text-cream">
            {fav.emoji} {fav.name} <T en="ka favourite" hi="का फ़ेवरेट" />
          </span>
        )}
        <h1 className="mt-3 font-display text-5xl text-maroon">
          <T {...p.name} />
        </h1>
        <p className="mt-1 text-lg text-kesar">
          <T {...p.tagline} />
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink">
          <T {...p.description} />
        </p>

        <RhymeWriter id={p.rhymeId} className="mt-6" />

        <fieldset className="mt-8">
          <legend className="font-semibold text-maroon">
            <T en="Size" hi="वज़न" />
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.sizes.map((x) => (
              <label key={x.label} className={`relative cursor-pointer rounded-2xl border-2 px-4 py-2.5 transition ${size === x.label ? "border-maroon text-cream" : "border-maroon/20 text-maroon hover:border-maroon/50"}`}>
                <input type="radio" name="size" value={x.label} checked={size === x.label} onChange={() => setSize(x.label)} className="sr-only" />
                {size === x.label && <motion.span layoutId="size-pill" className="absolute inset-0 rounded-[14px] bg-maroon" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative block font-semibold">{x.label}</span>
                <span className="relative block text-sm opacity-80">{formatINR(x.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-inner">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 rounded-full font-bold text-maroon hover:bg-cream-deep" aria-label={t({ en: "Ek kam", hi: "एक कम" })}>
              −
            </button>
            <motion.span key={qty} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="w-8 text-center text-lg font-bold" aria-live="polite">
              {qty}
            </motion.span>
            <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} className="h-10 w-10 rounded-full font-bold text-maroon hover:bg-cream-deep" aria-label={t({ en: "Ek aur", hi: "एक और" })}>
              +
            </button>
          </div>
          <div className="text-2xl font-bold text-maroon">{formatINR(s.price * qty)}</div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <AddToCart slug={p.slug} size={size} qty={qty} className="px-7 py-3 text-lg" />
          <a
            href={whatsappLink(`Ram Ram Amma! 🙏 I'd like ${qty} × ${p.name.en} (${size}). Total ${formatINR(s.price * qty)}.\n\nName:\nAddress & pincode:`)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-mor px-6 py-3 text-lg font-semibold text-mor hover:bg-mor hover:text-cream"
          >
            💬 <T en="Seedha WhatsApp" hi="सीधे WhatsApp" />
          </a>
        </div>

        <dl className="mt-10 grid gap-4 rounded-3xl bg-white/70 p-6 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-maroon">
              <T en="Kya kya pada hai" hi="क्या-क्या पड़ा है" />
            </dt>
            <dd className="mt-1 text-ink-soft">{p.ingredients.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-maroon">
              <T en="Kitne din chalega" hi="कितने दिन चलेगा" />
            </dt>
            <dd className="mt-1 text-ink-soft">{p.shelfLife}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
