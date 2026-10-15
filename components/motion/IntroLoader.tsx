"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, markIntroDone } from "@/lib/motion";

/**
 * First-visit loader (≤1.6 s): a kadhai stirs besan from pale to gold, a ladoo
 * rolls out, then the curtain lifts.
 */
export function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-pending")) {
      markIntroDone();
      return;
    }
    const { gsap } = ensureGsap();
    const el = root.current!;
    const tl = gsap.timeline({ onComplete: () => html.classList.remove("intro-pending") });
    tl.to(el.querySelector(".spoon"), { rotate: 360, duration: 1, ease: "none", transformOrigin: "50% 100%" }, 0)
      .fromTo(el.querySelector(".besan"), { attr: { fill: "#F3DFA2" } }, { attr: { fill: "#D9902A" }, duration: 1.1, ease: "power1.in" }, 0)
      .from(el.querySelectorAll(".char"), { opacity: 0, y: 6, stagger: 0.02, duration: 0.3 }, 0.1)
      .fromTo(el.querySelector(".ladoo"), { x: -60, rotate: -360, opacity: 0 }, { x: 0, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, 0.9)
      .add(() => markIntroDone(), 1.25)
      .to(el, { yPercent: -100, duration: 0.55, ease: "power3.inOut" }, 1.25);
    return () => {
      tl.kill();
      html.classList.remove("intro-pending");
      markIntroDone();
    };
  }, []);

  const line = "Besan bhun raha hai… thoda sabar, beta.";

  return (
    <div ref={root} className="intro-overlay fixed inset-0 z-[100] hidden place-items-center bg-maroon text-cream" aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 160 110" className="w-44">
          {[60, 80, 100].map((x, i) => (
            <path key={x} d={`M${x} 40 q-6 -10 0 -20 q6 -10 0 -20`} stroke="#FFF6E5" strokeWidth="3" fill="none" strokeLinecap="round" className="anim-steam" style={{ animationDelay: `${i * 0.4}s`, opacity: 0.6 }} />
          ))}
          <g className="spoon">
            <rect x="96" y="10" width="5" height="48" rx="2" fill="#C9952F" transform="rotate(25 98 58)" />
          </g>
          <ellipse className="besan" cx="80" cy="60" rx="50" ry="10" fill="#F3DFA2" />
          <path d="M22 58h116c0 22-26 38-58 38S22 80 22 58z" fill="#2B1B12" />
          <path d="M14 62q-8 0-8 6M146 62q8 0 8 6" stroke="#2B1B12" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g className="ladoo">
            <circle cx="140" cy="96" r="10" fill="#E9A93A" />
            <circle cx="137" cy="93" r="2" fill="#F7D27A" />
            <circle cx="143" cy="99" r="1.5" fill="#B9741C" />
          </g>
        </svg>
        <p className="px-6 text-center font-hand text-2xl text-haldi" aria-label={line}>
          {line.split(" ").map((w, i) => (
            <span key={i} className="inline-block whitespace-nowrap">
              {w.split("").map((c, j) => (
                <span key={j} className="char inline-block">
                  {c}
                </span>
              ))}
              &nbsp;
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
