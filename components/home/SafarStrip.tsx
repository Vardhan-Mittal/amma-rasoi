"use client";

import Link from "next/link";
import { useRef } from "react";
import { chapters } from "@/content/story";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";

/** "20 saal ka safar": chapter cards that slide sideways as you scroll down (desktop), swipeable on phones. */
export function SafarStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 64;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
        gsap.to(root.current!.querySelector(".safar-ladoo"), {
          rotate: 720,
          x: () => window.innerWidth - 120,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.6 },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-cream-deep py-14 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0" aria-labelledby="safar-title">
      <div className="mx-auto w-full max-w-6xl px-4">
        <p className="font-hand text-xl text-kesar">2006 → 2026</p>
        <h2 id="safar-title" className="font-display text-4xl text-maroon sm:text-5xl">
          <T en="20 saal ka safar" hi="20 साल का सफ़र" />
        </h2>
      </div>
      <div className="relative mt-8">
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 lg:overflow-visible lg:pl-[max(1rem,calc((100vw-72rem)/2+1rem))]">
          {chapters.map((c) => (
            <Link
              key={c.id}
              href={`/amma-ki-kahani#${c.id}`}
              className="group w-[78vw] max-w-[320px] shrink-0 snap-center rounded-[28px] bg-white/70 p-3 shadow-[0_10px_30px_-14px_rgb(107_26_26_/_0.45)] transition hover:-translate-y-1"
            >
              <div className="arch relative aspect-[4/5] overflow-hidden">
                <div className="h-full w-full transition duration-700 group-hover:scale-105">
                  <Illustration file={c.images[0]} alt={c.title.en} mood={c.mood} sizes="320px" />
                </div>
                <span className="absolute left-3 top-[34%] rounded-full bg-maroon px-3 py-1 font-display text-lg text-cream">{c.year}</span>
              </div>
              <div className="px-2 pb-2 pt-3">
                <div className="text-sm font-semibold text-kesar">
                  <T en={`Chapter ${c.number}`} hi={`अध्याय ${c.number}`} />
                </div>
                <div className="font-display text-2xl text-maroon">
                  <T {...c.title} />
                </div>
                <div className="text-sm text-ink-soft">
                  <T {...c.kicker} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* track the ladoo rolls along */}
        <div className="relative mx-4 hidden h-8 lg:block">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-maroon/30" />
          <span className="safar-ladoo absolute left-0 top-0 block h-8 w-8 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%, #F7D27A, #E9A93A 55%, #B9741C)" }} aria-hidden />
        </div>
      </div>
    </section>
  );
}
