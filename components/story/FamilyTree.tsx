"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { family, member, type Member } from "@/content/family";
import { getProduct } from "@/content/products";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";
import { Avatar } from "@/components/ui/Avatar";

// Tree layout in a 360×440 box: Amma at the roots, children on the branches, grandchildren at the top.
const W = 360;
const H = 440;
const pos: Record<string, { x: number; y: number; size: number }> = {
  amma: { x: 180, y: 392, size: 72 },
  sanjeev: { x: 42, y: 250, size: 52 }, pallavi: { x: 96, y: 250, size: 52 },
  rajeev: { x: 154, y: 238, size: 52 }, neha: { x: 208, y: 238, size: 52 },
  ritu: { x: 266, y: 250, size: 52 }, nitin: { x: 320, y: 250, size: 52 },
  nitya: { x: 34, y: 96, size: 48 }, vardhan: { x: 94, y: 70, size: 48 },
  paridhi: { x: 150, y: 96, size: 48 }, ammol: { x: 210, y: 70, size: 48 },
  harshi: { x: 266, y: 96, size: 48 }, daskh: { x: 326, y: 70, size: 48 },
};

const branches = [
  "M180 440 C 178 380, 184 330, 180 290",
  "M180 300 C 140 300, 90 290, 69 262",
  "M180 290 C 180 270, 181 260, 181 250",
  "M180 300 C 220 300, 270 290, 293 262",
  "M69 240 C 60 180, 40 140, 34 118", "M69 240 C 80 170, 90 120, 94 92",
  "M181 228 C 170 170, 155 130, 150 118", "M181 228 C 195 160, 205 120, 210 92",
  "M293 240 C 285 180, 270 140, 266 118", "M293 240 C 305 170, 320 120, 326 92",
];

const leaves = [
  [120, 280], [240, 280], [50, 170], [100, 150], [160, 160], [215, 150], [260, 170], [320, 150], [20, 130], [345, 120], [130, 60], [250, 50], [180, 40],
];

export function FamilyTree() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Member | null>(null);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector(".tree"), start: "top 75%", end: "center 45%", scrub: 0.8 } });
      tl.from(el.querySelectorAll(".branch"), { drawSVG: "0%", duration: 1, stagger: 0.08, ease: "none" })
        .fromTo(el.querySelectorAll(".leaf"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.03, duration: 0.2, ease: "back.out(3)" }, "-=0.6")
        .fromTo(el.querySelectorAll(".bloom"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: { each: 0.05, from: "end" }, duration: 0.25, ease: "back.out(2.5)" }, "-=0.8");
    },
    { scope: root }
  );

  const fav = open ? getProduct(open.favourite) : undefined;
  const parent = open?.of ? member(open.of) : undefined;

  return (
    <section ref={root} data-track="ch7" className="relative overflow-hidden bg-cream-deep py-24" aria-labelledby="tree-title">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-hand text-xl text-kesar">
          <T en="Ek ped, teen daaliyan, chhe phool" hi="एक पेड़, तीन डालियाँ, छह फूल" />
        </p>
        <h2 id="tree-title" className="font-display text-4xl text-maroon sm:text-5xl">
          <T en="Mittal Parivaar" hi="मित्तल परिवार" />
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          <T en="Tap anyone to hear their ladoo memory — and try their favourite." hi="किसी पर भी टैप करें — उनकी लड्डू वाली याद सुनिए और उनका फ़ेवरेट चखिए।" />
        </p>

        <div className="tree relative mx-auto mt-10 w-full max-w-[420px]" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
            {branches.map((d, i) => (
              <path key={i} className="branch" d={d} fill="none" stroke="#6E4523" strokeWidth={i === 0 ? 14 : i < 4 ? 8 : 5} strokeLinecap="round" />
            ))}
            {leaves.map(([x, y], i) => (
              <ellipse key={i} className="leaf" cx={x} cy={y} rx="9" ry="5" fill={i % 2 ? "#1F6B5C" : "#3E8E5F"} transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />
            ))}
          </svg>
          {family.map((m) => {
            const p = pos[m.id];
            return (
              <span key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>
                <button
                  type="button"
                  onClick={() => setOpen(m)}
                  className="bloom group block rounded-full"
                  aria-label={`${m.name} — ${m.relation.en}`}
                >
                  <span className="block transition-transform group-hover:scale-110 group-focus-visible:scale-110">
                    <Avatar m={m} size={p.size} />
                  </span>
                </button>
              </span>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[65] grid place-items-center bg-ink/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              onClick={(e) => e.stopPropagation()}
              initial={{ rotateY: 90, scale: 0.8 }}
              animate={{ rotateY: 0, scale: 1 }}
              exit={{ rotateY: -90, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformPerspective: 900 }}
              className="w-full max-w-sm rounded-3xl border-4 border-haldi bg-cream p-6 text-center shadow-2xl"
            >
              <Avatar m={open} size={96} className="mx-auto" />
              <h3 className="mt-3 font-display text-3xl text-maroon">{open.name}</h3>
              <p className="text-sm font-semibold text-kesar">
                <T {...open.relation} />
                {parent && open.generation === "spouse" && (
                  <>
                    {" · "}
                    <T en={`${parent.name} ke saath`} hi={`${parent.name} के साथ`} />
                  </>
                )}
              </p>
              <p className="mt-4 font-hand text-xl leading-snug text-ink">
                “<T {...open.memory} />”
              </p>
              {fav && (
                <Link href={`/shop/${fav.slug}`} className="mt-5 inline-block rounded-full bg-maroon px-5 py-2.5 font-semibold text-cream">
                  ♥ <T {...fav.name} /> →
                </Link>
              )}
              <button type="button" onClick={() => setOpen(null)} className="mt-3 block w-full text-sm text-ink-soft underline">
                <T en="Band karo" hi="बंद करो" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
