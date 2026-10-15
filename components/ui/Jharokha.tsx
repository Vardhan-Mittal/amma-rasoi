"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/**
 * Carved-window frame. The outline traces itself, then the picture inside fades up.
 */
export function Jharokha({ children, className = "", innerClassName = "", draw = true }: { children: ReactNode; className?: string; innerClassName?: string; draw?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!draw || prefersReducedMotion()) return;
      const { gsap } = ensureGsap();
      const el = ref.current!;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.from(el.querySelectorAll(".jh-line"), { drawSVG: "50% 50%", duration: 1.1, ease: "power2.inOut", stagger: 0.12 })
        .from(el.querySelector(".jh-finial"), { scale: 0, transformOrigin: "50% 100%", duration: 0.4, ease: "back.out(2)" }, "-=0.4")
        .from(el.querySelector(".jh-inner"), { opacity: 0, scale: 1.04, duration: 0.8, ease: "power2.out" }, "-=0.7");
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg className="jh-finial absolute -top-7 left-1/2 z-10 h-8 w-10 -translate-x-1/2" viewBox="0 0 40 32" aria-hidden>
        <path d="M8 30 C8 18 32 18 32 30 Z" fill="#6B1A1A" />
        <circle cx="20" cy="14" r="5" fill="#F2B33D" />
        <path d="M20 9 V2" stroke="#F2B33D" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className={`jh-inner arch relative h-full w-full overflow-hidden bg-cream-deep ${innerClassName}`}>{children}</div>
      <svg className="pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path className="jh-line" d="M1 100 V33.5 A49 33 0 0 1 99 33.5 V100" fill="none" stroke="#6B1A1A" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <path className="jh-line" d="M3.2 100 V34 A46.8 31.5 0 0 1 96.8 34 V100" fill="none" stroke="#F2B33D" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
