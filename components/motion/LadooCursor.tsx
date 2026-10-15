"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

/** A little ladoo that trails the mouse on desktop and grows over buttons. */
export function LadooCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const { gsap } = ensureGsap();
    const el = dot.current!;
    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    gsap.set(el, { opacity: 0 });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.to(el, { opacity: 1, duration: 0.2 });
      xTo(e.clientX + 14);
      yTo(e.clientY + 14);
      const interactive = (e.target as HTMLElement).closest("a,button,[role=button],input,select,label");
      gsap.to(el, { scale: interactive ? 1.7 : 1, duration: 0.25 });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-3.5 w-3.5 rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 35%, #F7D27A, #E9A93A 55%, #B9741C)",
        boxShadow: "0 1px 3px rgb(74 16 16 / 0.35)",
      }}
    />
  );
}
