"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatINR, getProduct } from "@/content/products";
import { rhyme } from "@/content/rhymes";
import { site, whatsappLink } from "@/content/site";
import { priceOf, useCart } from "@/lib/cart";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { LadooArt } from "./LadooArt";

export function CartDrawer() {
  const { items, open, setOpen, setQty, total, whatsappMessage } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const empty = rhyme("empty-cart");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Aapka dabba"
            data-lenis-prevent
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* dabba lid header */}
            <motion.div
              initial={{ rotateX: -90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
              style={{ transformOrigin: "top" }}
              className="flex items-center justify-between border-b-4 border-haldi bg-maroon px-5 py-4 text-cream"
            >
              <h2 className="font-display text-2xl">
                <T en="Aapka Dabba" hi="आपका डब्बा" />
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full text-2xl hover:bg-cream/10" aria-label="Close">
                ×
              </button>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center pt-6 text-center">
                  <div className="anim-bob h-48 w-48 overflow-hidden rounded-full">
                    <Illustration file="empty-cart.png" alt="Amma peering into an empty dabba" mood="warm" sizes="200px" />
                  </div>
                  <p className="mt-5 font-hand text-2xl leading-snug text-maroon">
                    {empty.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                  <Link href="/shop" onClick={() => setOpen(false)} className="mt-5 rounded-full bg-maroon px-5 py-2.5 font-semibold text-cream">
                    <T en="Ladoo chuniye →" hi="लड्डू चुनिए →" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((i) => {
                      const p = getProduct(i.slug)!;
                      return (
                        <motion.li
                          key={`${i.slug}-${i.size}`}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 60, height: 0 }}
                          className="flex items-center gap-3 rounded-2xl bg-white/80 p-3"
                        >
                          <LadooArt product={p} count={Math.min(15, i.qty * 3)} className="h-16 w-20 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-maroon">
                              <T {...p.name} />
                            </div>
                            <div className="text-sm text-ink-soft">
                              {i.size} · {formatINR(priceOf(i))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button type="button" className="h-8 w-8 rounded-full bg-cream-deep font-bold text-maroon" onClick={() => setQty(i.slug, i.size, i.qty - 1)} aria-label="Ek kam">
                              −
                            </button>
                            <span className="w-6 text-center font-semibold">{i.qty}</span>
                            <button type="button" className="h-8 w-8 rounded-full bg-cream-deep font-bold text-maroon" onClick={() => setQty(i.slug, i.size, i.qty + 1)} aria-label="Ek aur">
                              +
                            </button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-maroon/10 bg-white/60 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-ink-soft">
                    <T en="Total" hi="कुल" />
                  </span>
                  <span className="text-2xl font-bold text-maroon">{formatINR(total)}</span>
                </div>
                <p className="mt-1 text-xs text-ink-soft">{site.deliveryNote}</p>
                <a
                  href={whatsappLink(whatsappMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wobble mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-mor px-5 py-3 font-semibold text-cream shadow-md"
                >
                  <span aria-hidden>💬</span> <T en="Order on WhatsApp" hi="WhatsApp पर ऑर्डर करें" />
                </a>
                <p className="mt-2 text-center text-xs text-ink-soft">
                  <T en="UPI & card checkout coming soon" hi="UPI और कार्ड पेमेंट जल्द आ रहा है" />
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
