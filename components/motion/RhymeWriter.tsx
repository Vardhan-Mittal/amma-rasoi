"use client";

import { useRef } from "react";
import { rhyme } from "@/content/rhymes";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { AmmaSunao } from "@/components/audio/AmmaSunao";

type Props = {
  id: string;
  tone?: "light" | "dark";
  size?: "md" | "lg" | "xl";
  align?: "left" | "center";
  showMeaning?: boolean;
  showVoice?: boolean;
  className?: string;
};

const sizes = { md: "text-xl sm:text-2xl", lg: "text-2xl sm:text-3xl", xl: "text-3xl sm:text-4xl lg:text-5xl" };

/** A rhyme that writes itself in Amma's handwriting when it scrolls into view. */
export function RhymeWriter({ id, tone = "light", size = "lg", align = "left", showMeaning = true, showVoice = true, className = "" }: Props) {
  const r = rhyme(id);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap, SplitText } = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const lines = el.querySelectorAll(".rhyme-line");
      const split = SplitText.create(lines, { type: "words,chars", wordsClass: "inline-block", charsClass: "inline-block" });
      const swash = el.querySelector(".swash");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.from(split.chars, { opacity: 0, y: 10, rotate: -8, duration: 0.35, stagger: 0.022, ease: "back.out(2)" });
      if (swash) tl.from(swash, { drawSVG: "0%", duration: 0.7, ease: "power2.inOut" }, "-=0.3");
      tl.from(el.querySelectorAll(".rhyme-after"), { opacity: 0, y: 6, duration: 0.4, stagger: 0.1 }, "-=0.3");
      return () => split.revert();
    },
    { scope: root }
  );

  const color = tone === "dark" ? "text-haldi" : "text-maroon";
  const sub = tone === "dark" ? "text-cream/75" : "text-ink-soft";

  return (
    <figure ref={root} className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <blockquote className={`font-hand ${sizes[size]} leading-snug ${color}`}>
        {r.lines.map((l, i) => (
          <span key={i} className="rhyme-line block">
            {l}
          </span>
        ))}
      </blockquote>
      <svg viewBox="0 0 200 12" className={`mt-1 h-3 w-40 ${align === "center" ? "mx-auto" : ""}`} aria-hidden>
        <path className="swash" d="M2 8 C 50 0, 90 12, 130 5 S 185 4, 198 7" fill="none" stroke="#E07A1F" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {(showMeaning || showVoice) && (
        <figcaption className={`rhyme-after mt-2 flex flex-wrap items-center gap-3 text-sm ${sub} ${align === "center" ? "justify-center" : ""}`}>
          {showVoice && <AmmaSunao rhymeId={id} tone={tone} />}
          {showMeaning && <span className="italic">{r.meaning}</span>}
        </figcaption>
      )}
    </figure>
  );
}
