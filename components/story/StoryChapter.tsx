"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { Chapter } from "@/content/story";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { Jharokha } from "@/components/ui/Jharokha";
import { RhymeWriter } from "@/components/motion/RhymeWriter";
import { ChapterScene } from "./scenes";
import { ImageFX } from "@/components/motion/ImageFX";

const card = "rounded-3xl bg-cream/95 p-6 shadow-[0_12px_40px_-16px_rgb(107_26_26_/_0.45)] backdrop-blur lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none";

/**
 * One chapter: a sticky jharokha picture (slow Ken Burns zoom, cross-fading
 * between the chapter's images, with an animated scene on top) while the
 * story beats scroll past. On phones the beats slide over the picture.
 */
export function StoryChapter({ chapter: c }: { chapter: Chapter }) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const { gsap } = ensureGsap();
      const el = section.current!;
      const imgs = el.querySelectorAll(".kb-img");
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      tl.fromTo(el.querySelector(".kb"), { scale: 1.18 }, { scale: 1, duration: 1 }, 0);
      imgs.forEach((img, i) => {
        if (i === 0) return;
        tl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.3 + (i - 1) * (0.5 / Math.max(1, imgs.length - 1)));
      });
      gsap.from(el.querySelector(".ch-number"), { yPercent: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
    },
    { scope: section }
  );

  return (
    <section ref={section} id={c.id} data-track={c.track} data-year={c.year} className="story-chapter relative" aria-labelledby={`${c.id}-title`}>
      <div className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-2 lg:gap-14">
        {/* sticky visual */}
        <div className="sticky top-16 z-0 flex h-[calc(100svh-4rem)] items-center justify-center py-8">
          <div className="relative aspect-[4/5] w-full max-w-[480px] lg:h-full lg:max-h-[600px] lg:w-auto">
            <Jharokha className="h-full w-full">
              <div className="kb absolute inset-0">
                {c.images.map((img, i) => (
                  <div key={img} className="kb-img absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <Illustration file={img} alt={`${c.title.en} — illustration ${i + 1}`} mood={c.mood} position={c.focus?.[img]} sizes="(max-width:1024px) 90vw, 45vw" />
                    <ImageFX file={img} position={c.focus?.[img]} />
                  </div>
                ))}
              </div>
            </Jharokha>
            <ChapterScene id={c.scene} section={section} />
          </div>
        </div>

        {/* story beats */}
        <div className="pointer-events-none relative z-10 -mt-[55svh] [&>*]:pointer-events-auto space-y-[48svh] pb-[40svh] lg:mt-0 lg:space-y-[32vh] lg:py-[28vh]">
          <header className={card}>
            <div className="ch-number font-display text-7xl leading-none text-haldi lg:text-8xl" aria-hidden>
              {c.number}
            </div>
            <p className="mt-2 font-semibold uppercase tracking-widest text-kesar">
              {c.year} · <T {...c.kicker} />
            </p>
            <h2 id={`${c.id}-title`} className="mt-1 font-display text-4xl text-maroon sm:text-5xl">
              <T {...c.title} />
            </h2>
          </header>
          {c.beats.map((b, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className={`${card} text-xl leading-relaxed text-ink sm:text-2xl`}
            >
              <T {...b} />
            </motion.p>
          ))}
          {c.quote && (
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              className={`${card} border-l-4 border-kesar font-hand text-2xl text-maroon sm:text-3xl lg:pl-5`}
            >
              <T {...c.quote} />
            </motion.blockquote>
          )}
          <div className={card}>
            <RhymeWriter id={c.rhymeId} size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
