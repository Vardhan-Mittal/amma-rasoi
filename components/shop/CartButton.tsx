"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

/** Header cart drawn as a steel dabba; the lid pops open and snaps shut when a ladoo lands. */
export function CartButton() {
  const { count, setOpen } = useCart();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onBump = () => {
      if (prefersReducedMotion()) return;
      const { gsap } = ensureGsap();
      const el = ref.current!;
      gsap.timeline()
        .to(el.querySelector(".lid"), { rotate: -38, transformOrigin: "10% 100%", duration: 0.12 })
        .to(el.querySelector(".lid"), { rotate: 0, duration: 0.5, ease: "bounce.out" })
        .fromTo(el.querySelector(".body"), { scaleY: 0.85, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }, 0.12)
        .fromTo(el.querySelector(".count"), { scale: 1.8 }, { scale: 1, duration: 0.45, ease: "back.out(3)" }, 0.12);
    };
    window.addEventListener("amma:cart-bump", onBump);
    return () => window.removeEventListener("amma:cart-bump", onBump);
  }, []);

  return (
    <button
      ref={ref}
      id="cart-dabba"
      type="button"
      onClick={() => setOpen(true)}
      className="relative grid h-11 w-11 place-items-center rounded-full bg-cream text-maroon transition hover:bg-haldi"
      aria-label={`Aapka dabba — ${count} items`}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <g className="body">
          <rect x="6" y="13" width="20" height="14" rx="3" fill="#B8BCC2" />
          <rect x="6" y="13" width="20" height="14" rx="3" fill="none" stroke="#6B1A1A" strokeWidth="1.8" />
          <path d="M9 18h14" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
        </g>
        <g className="lid">
          <rect x="5" y="9" width="22" height="4" rx="1.5" fill="#D5D8DC" stroke="#6B1A1A" strokeWidth="1.8" />
          <rect x="13" y="6.5" width="6" height="2.5" rx="1" fill="#6B1A1A" />
        </g>
      </svg>
      <span
        className={`count absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-kesar px-1 text-xs font-bold text-white ${count ? "" : "opacity-0"}`}
      >
        {count}
      </span>
    </button>
  );
}
