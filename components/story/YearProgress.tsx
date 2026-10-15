"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, useGSAP } from "@/lib/motion";

/** A ladoo rolls down a side track as the story moves from 2006 to 2026. */
export function YearProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState(2006);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".story-chapter"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setYear(Number(e.target.getAttribute("data-year")));
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const first = document.querySelector(".story-chapter");
      const all = document.querySelectorAll(".story-chapter");
      const last = all[all.length - 1];
      if (!first || !last) return;
      gsap.to(ref.current!.querySelectorAll(".yp-ladoo"), {
        top: "100%",
        rotate: 1080,
        ease: "none",
        scrollTrigger: {
          trigger: first,
          endTrigger: last,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onToggle: (self) => setVisible(self.isActive),
        },
      });
      gsap.to(ref.current!.querySelector(".yp-bar"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: first, endTrigger: last, start: "top center", end: "bottom center", scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
      {/* desktop: vertical track on the right */}
      <div className="fixed right-5 top-1/2 z-30 hidden h-[50vh] -translate-y-1/2 lg:block">
        <div className="relative h-full w-1 rounded-full bg-maroon/15">
          <span className="yp-ladoo absolute left-1/2 top-0 block h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full shadow" style={{ background: "radial-gradient(circle at 35% 35%, #F7D27A, #E9A93A 55%, #B9741C)" }} />
        </div>
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-full bg-maroon px-2.5 py-1 font-display text-lg text-cream shadow">{year}</div>
      </div>
      {/* phones: thin bar under the header */}
      <div className="fixed inset-x-0 top-16 z-30 lg:hidden">
        <div className="yp-bar h-1 origin-left scale-x-0 bg-kesar" />
        <div className="absolute right-3 top-2 rounded-full bg-maroon/90 px-2 py-0.5 font-display text-sm text-cream">{year}</div>
      </div>
    </div>
  );
}
