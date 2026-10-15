"use client";

import { useRef } from "react";
import { storyIntro, storyIntroMeaning } from "@/content/story";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";
import { RhymeWriter } from "@/components/motion/RhymeWriter";
import { DashedPath } from "@/components/motion/DashedPath";

const paths = [
  { id: "sky", d: "M200 330 C 180 250, 90 220, 70 90", label: "✈", text: { en: "Aasmaan", hi: "आसमान" } },
  { id: "rail", d: "M200 330 C 200 250, 200 180, 200 90", label: "🚂", text: { en: "Patri", hi: "पटरी" } },
  { id: "school", d: "M200 330 C 220 250, 310 220, 330 90", label: "📚", text: { en: "School", hi: "स्कूल" } },
];

/** Intro: one home, three dotted paths (sky, tracks, school), each carrying a tiny dabba. */
export function ThreePaths() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector(".paths-svg"), start: "top 75%", end: "bottom 35%", scrub: 0.8 } });
      tl.from(el.querySelectorAll(".p-line"), { drawSVG: "0%", duration: 1, stagger: 0.1, ease: "none" });
      el.querySelectorAll<SVGGElement>(".p-dabba").forEach((d, i) => {
        tl.to(d, { motionPath: { path: `#path-${paths[i].id}`, align: `#path-${paths[i].id}`, alignOrigin: [0.5, 0.5] }, duration: 1, ease: "none" }, 0.2 + i * 0.1);
      });
      tl.fromTo(el.querySelectorAll(".p-end"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.1, duration: 0.3, ease: "back.out(3)" }, ">-0.3");
    },
    { scope: root }
  );

  return (
    <section ref={root} id="intro" data-track="home" className="mx-auto max-w-4xl px-4 py-24 text-center">
      <p className="font-display text-2xl leading-relaxed text-maroon sm:text-4xl">
        <T {...storyIntro} />
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
        <T {...storyIntroMeaning} />
      </p>
      <svg viewBox="0 0 400 360" className="paths-svg mx-auto mt-10 w-full max-w-lg" role="img" aria-label="Three paths from home: to the sky, the railway and a school">
        {paths.map((p) => (
          <g key={p.id}>
            <path id={`path-${p.id}`} d={p.d} fill="none" stroke="transparent" />
            <DashedPath maskClassName="p-line" d={p.d} stroke="#6B1A1A" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
          </g>
        ))}
        {/* home */}
        <g>
          <path d="M170 335 L200 305 L230 335 V360 H170 Z" fill="#6B1A1A" />
          <rect x="192" y="340" width="16" height="20" fill="#F2B33D" />
        </g>
        {paths.map((p, i) => {
          const end = [{ x: 70, y: 70 }, { x: 200, y: 70 }, { x: 330, y: 70 }][i];
          return (
            <g key={p.id} className="p-end">
              <circle cx={end.x} cy={end.y} r="30" fill="#FFF6E5" stroke="#E07A1F" strokeWidth="3" />
              <text x={end.x} y={end.y + 9} textAnchor="middle" fontSize="26">
                {p.label}
              </text>
            </g>
          );
        })}
        {paths.map((p) => (
          <g key={p.id} className="p-dabba" transform="translate(200 330)">
            <rect x="-9" y="-7" width="18" height="14" rx="3" fill="#C7CBD1" stroke="#6B1A1A" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="mt-10 flex justify-center gap-6 text-sm font-semibold text-maroon sm:gap-16">
        {paths.map((p) => (
          <span key={p.id}>
            <T {...p.text} />
          </span>
        ))}
      </div>
      <RhymeWriter id="bridge" size="xl" align="center" className="mt-16" />
    </section>
  );
}
