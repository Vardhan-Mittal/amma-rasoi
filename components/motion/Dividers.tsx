"use client";

import { useRef } from "react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/** Band of bandhani tie-dye dots that pop in one by one. */
export function BandhaniDivider({ tone = "maroon" }: { tone?: "maroon" | "cream" }) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (prefersReducedMotion()) return;
      gsap.from(ref.current!.querySelectorAll(".dot"), {
        scale: 0,
        transformOrigin: "center",
        duration: 0.4,
        ease: "back.out(3)",
        stagger: { each: 0.012, from: "center" },
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    },
    { scope: ref }
  );
  const n = 40;
  const bg = tone === "maroon" ? "#6B1A1A" : "#FFF6E5";
  const dot = tone === "maroon" ? "#FFF6E5" : "#6B1A1A";
  return (
    <svg ref={ref} viewBox={`0 0 ${n * 24} 28`} preserveAspectRatio="xMidYMid slice" className="block h-7 w-full" aria-hidden>
      <rect width="100%" height="28" fill={bg} />
      {Array.from({ length: n }, (_, i) => {
        const cx = i * 24 + 12;
        const accent = i % 3 === 1 ? "#F2B33D" : dot;
        return (
          <g key={i} className="dot" style={{ transformBox: "fill-box" }}>
            <circle cx={cx} cy={9} r={2.2} fill={accent} />
            <circle cx={cx - 5} cy={14} r={2.2} fill={accent} />
            <circle cx={cx + 5} cy={14} r={2.2} fill={accent} />
            <circle cx={cx} cy={19} r={2.2} fill={accent} />
          </g>
        );
      })}
    </svg>
  );
}

/** Mandana folk-art border that draws itself as you scroll. */
export function MandanaBorder({ color = "#6B1A1A" }: { color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (prefersReducedMotion()) return;
      gsap.from(ref.current!.querySelectorAll("path"), {
        drawSVG: "0%",
        duration: 1.4,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    },
    { scope: ref }
  );
  const unit = 60;
  const n = 16;
  return (
    <svg ref={ref} viewBox={`0 0 ${unit * n} 40`} preserveAspectRatio="xMidYMid slice" className="block h-10 w-full" aria-hidden>
      <path d={`M0 20 H${unit * n}`} stroke={color} strokeWidth="1.5" fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const x = i * unit + unit / 2;
        return (
          <path
            key={i}
            d={`M${x - 18} 20 Q${x - 9} 4 ${x} 20 Q${x + 9} 36 ${x + 18} 20 M${x} 8 L${x + 6} 20 L${x} 32 L${x - 6} 20 Z`}
            stroke={color}
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
