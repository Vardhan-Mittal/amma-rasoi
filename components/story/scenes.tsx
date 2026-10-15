"use client";

import { useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { grandchildren } from "@/content/family";
import { rhyme } from "@/content/rhymes";
import type { SceneId } from "@/content/story";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";
import { Diya } from "@/components/motion/Ambient";
import { Avatar } from "@/components/ui/Avatar";
import { DashedPath } from "@/components/motion/DashedPath";

type SceneProps = { section: RefObject<HTMLElement | null> };

/** Scrubbed timeline tied to the chapter section's scroll progress. */
function useScrub(scope: RefObject<SVGSVGElement | HTMLDivElement | null>, section: SceneProps["section"], build: (tl: gsap.core.Timeline, q: (s: string) => Element[]) => void, reduced?: (q: (s: string) => Element[]) => void) {
  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const root = scope.current!;
      const q = (s: string) => gsap.utils.toArray<Element>(root.querySelectorAll(s));
      if (prefersReducedMotion()) {
        reduced?.(q);
        return;
      }
      // The section ref isn't attached yet when this child effect runs, so find it from the DOM.
      const trigger = section.current ?? root.closest("section");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger, start: "top 60%", end: "bottom 80%", scrub: 0.7 },
      });
      build(tl, q);
    },
    { scope }
  );
}

const box = "pointer-events-none absolute inset-0 h-full w-full";

// 1 — jet streaks across, contrail becomes a route from the village to a snowy posting
function JetScene({ section }: SceneProps) {
  const ref = useRef<SVGSVGElement>(null);
  useScrub(ref, section, (tl, q) => {
    tl.fromTo(q(".jet"), { x: -80, y: 60 }, { x: 470, y: 8, duration: 1 })
      .from(q(".contrail"), { drawSVG: "0%", duration: 1 }, 0)
      .to(q(".contrail"), { opacity: 0, duration: 0.3 })
      .from(q(".route-card"), { y: 60, opacity: 0, duration: 0.3 }, "<")
      .from(q(".route"), { drawSVG: "0%", duration: 0.8 })
      .to(q(".route-dabba"), { motionPath: { path: "#jet-route", align: "#jet-route", alignOrigin: [0.5, 0.5] }, duration: 0.8 }, "<")
      .fromTo(q(".stamp"), { scale: 3, opacity: 0, rotate: -30, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, rotate: -12, duration: 0.25, ease: "back.out(3)" });
  });
  return (
    <svg ref={ref} viewBox="0 0 400 500" className={box} aria-hidden>
      <path className="contrail" d="M-60 70 C 100 52, 260 30, 470 8" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" strokeDasharray="1 0" />
      <g className="jet">
        <path d="M0 0 L34 -4 L44 0 L34 4 Z M12 -2 L4 -16 L10 -16 L22 -2 Z M12 2 L4 16 L10 16 L22 2 Z M2 -1 L-4 -8 L0 -8 L6 -1 Z M2 1 L-4 8 L0 8 L6 1Z" fill="#3A4A6B" transform="rotate(-14)" />
      </g>
      <g className="route-card">
        <rect x="24" y="352" width="352" height="124" rx="18" fill="#FFF6E5" opacity="0.95" stroke="#6B1A1A" strokeWidth="2" />
        <path id="jet-route" d="M70 440 C 140 370, 250 470, 330 400" fill="none" stroke="transparent" />
        <DashedPath maskClassName="route" d="M70 440 C 140 370, 250 470, 330 400" stroke="#6B1A1A" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <path d="M58 448 L70 436 L82 448 V458 H58 Z" fill="#6B1A1A" />
        <text x="70" y="472" textAnchor="middle" fontSize="12" fill="#3A2414" fontWeight="600">Gaon</text>
        <path d="M300 410 L318 384 L330 398 L342 378 L362 410 Z" fill="#8FA6C4" />
        <path d="M312 392 L318 384 L323 391 Z M337 386 L342 378 L347 386 Z" fill="#FFFFFF" />
        <text x="332" y="428" textAnchor="middle" fontSize="12" fill="#3A2414" fontWeight="600">Posting ❄</text>
        <g className="route-dabba" transform="translate(70 440)">
          <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#C7CBD1" stroke="#6B1A1A" strokeWidth="2" />
        </g>
        <g className="stamp" opacity="0">
          <rect x="230" y="362" width="120" height="30" rx="4" fill="none" stroke="#C0262D" strokeWidth="3" />
          <text x="290" y="383" textAnchor="middle" fontSize="14" fill="#C0262D" fontWeight="800" letterSpacing="1">DIWALI PARCEL</text>
        </g>
      </g>
    </svg>
  );
}

// 2 — a train chugs across with the scroll; the station board flips to "Amma Junction"
function TrainScene({ section }: SceneProps) {
  const ref = useRef<SVGSVGElement>(null);
  useScrub(ref, section, (tl, q) => {
    tl.fromTo(q(".train"), { x: -360 }, { x: 420, duration: 1 })
      .to(q(".board-front"), { scaleY: 0, transformOrigin: "50% 50%", duration: 0.08 }, 0.4)
      .set(q(".board-front"), { opacity: 0 })
      .fromTo(q(".board-back"), { scaleY: 0, opacity: 1, transformOrigin: "50% 50%" }, { scaleY: 1, duration: 0.08 });
  }, (q) => {
    const { gsap } = ensureGsap();
    gsap.set(q(".train"), { x: 40 });
    gsap.set(q(".board-front"), { opacity: 0 });
    gsap.set(q(".board-back"), { opacity: 1 });
  });
  return (
    <svg ref={ref} viewBox="0 0 400 500" className={box} aria-hidden>
      {/* station board */}
      <g transform="translate(250 40)">
        <rect x="0" y="0" width="130" height="46" rx="6" fill="#F2B33D" stroke="#3A2414" strokeWidth="3" />
        <path d="M30 46 V70 M100 46 V70" stroke="#3A2414" strokeWidth="4" />
        <g className="board-front">
          <text x="65" y="30" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3A2414">? ? ?</text>
        </g>
        <g className="board-back" opacity="0">
          <text x="65" y="20" textAnchor="middle" fontSize="14" fontWeight="800" fill="#3A2414">अम्मा जंक्शन</text>
          <text x="65" y="37" textAnchor="middle" fontSize="12" fontWeight="800" fill="#3A2414" letterSpacing="1">AMMA JN.</text>
        </g>
      </g>
      {/* lamp */}
      <g transform="translate(40 30)">
        <circle cx="10" cy="40" r="26" fill="#F2B33D" opacity="0.35" className="anim-glow" />
        <path d="M10 0 V30" stroke="#3A2414" strokeWidth="3" />
        <path d="M0 30 h20 l-4 16 h-12 z" fill="#F2B33D" stroke="#3A2414" strokeWidth="2" />
      </g>
      {/* track */}
      <rect x="0" y="470" width="400" height="8" fill="#5A4636" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 20} y="466" width="10" height="16" fill="#3A2A20" />
      ))}
      <rect x="0" y="464" width="400" height="3" fill="#9AA3AD" />
      {/* train */}
      <g className="train">
        {[0, 1].map((c) => (
          <g key={c} transform={`translate(${c * 115} 0)`}>
            <rect x="0" y="398" width="108" height="56" rx="8" fill="#7A1F1F" stroke="#3A2414" strokeWidth="2" />
            <rect x="0" y="398" width="108" height="10" rx="4" fill="#5A1414" />
            {[10, 38, 66].map((x, w) => (
              <g key={x}>
                <rect x={x + 2} y="414" width="22" height="18" rx="3" fill="#F7D27A" />
                {c === 1 && w === 1 && (
                  <g>
                    <rect x={x + 6} y="420" width="14" height="10" rx="2" fill="#C7CBD1" stroke="#3A2414" strokeWidth="1" />
                    <rect x={x + 5} y="418" width="16" height="3" rx="1" fill="#DDE0E4" stroke="#3A2414" strokeWidth="0.8" />
                  </g>
                )}
              </g>
            ))}
            <rect x="0" y="438" width="108" height="5" fill="#F2B33D" />
            <circle cx="22" cy="458" r="8" fill="#2B1B12" />
            <circle cx="86" cy="458" r="8" fill="#2B1B12" />
          </g>
        ))}
        {/* engine */}
        <g transform="translate(230 0)">
          <rect x="0" y="392" width="90" height="62" rx="10" fill="#1F4E79" stroke="#3A2414" strokeWidth="2" />
          <rect x="50" y="402" width="30" height="22" rx="4" fill="#F7D27A" />
          <path d="M90 420 L112 446 H90 Z" fill="#1F4E79" stroke="#3A2414" strokeWidth="2" />
          <rect x="16" y="374" width="16" height="20" rx="3" fill="#2B1B12" />
          <circle cx="104" cy="438" r="5" fill="#FFF6E5" className="anim-glow" />
          <circle cx="22" cy="458" r="9" fill="#2B1B12" />
          <circle cx="68" cy="458" r="9" fill="#2B1B12" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="24" cy="368" r="10" fill="#E8E2D6" className="anim-smoke" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </g>
      </g>
    </svg>
  );
}

// 3 — a marigold toran drops in, mehendi draws itself, shehnai notes float up
function GarlandScene({ section }: SceneProps) {
  const ref = useRef<SVGSVGElement>(null);
  useScrub(ref, section, (tl, q) => {
    tl.fromTo(q(".toran"), { y: -140 }, { y: 0, duration: 0.3, ease: "bounce.out" }).from(q(".mehendi"), { drawSVG: "0%", duration: 0.7, stagger: 0.05 });
  });
  const flowers = Array.from({ length: 13 }, (_, i) => {
    const x = 20 + i * 30;
    const y = 10 + Math.sin((i / 12) * Math.PI) * 16;
    return { x, y, c: i % 2 ? "#E07A1F" : "#F2B33D" };
  });
  return (
    <svg ref={ref} viewBox="0 0 400 500" className={box} aria-hidden>
      <g className="toran">
        <path d="M0 8 Q200 42 400 8" stroke="#1F6B5C" strokeWidth="3" fill="none" />
        {flowers.map((f, i) => (
          <g key={i}>
            <path d={`M${f.x} ${f.y} v${10 + (i % 3) * 4}`} stroke="#1F6B5C" strokeWidth="1.5" />
            <circle cx={f.x} cy={f.y} r="9" fill={f.c} />
            <circle cx={f.x} cy={f.y} r="4" fill="#C2501A" opacity="0.6" />
            <circle cx={f.x} cy={f.y + 14 + (i % 3) * 4} r="5" fill={i % 2 ? "#F2B33D" : "#E07A1F"} />
          </g>
        ))}
      </g>
      <g transform="translate(18 360)" fill="none" stroke="#8E3B1E" strokeWidth="2" strokeLinecap="round">
        <path className="mehendi" d="M60 110 C 10 100, 0 40, 40 20 C 70 5, 100 30, 85 60 C 75 80, 50 75, 50 60 C 50 45, 70 45, 70 58" />
        <path className="mehendi" d="M40 20 C 30 0, 50 -10, 60 5" />
        <path className="mehendi" d="M20 70 q10 -8 20 0 q10 8 20 0" />
        <path className="mehendi" d="M100 110 a12 12 0 1 1 24 0 a12 12 0 1 1 -24 0 M112 98 v-10 M100 110 h-10 M124 110 h10" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <text key={i} x={320 + (i % 2) * 30} y={420} fontSize="26" fill="#6B1A1A" className="anim-note" style={{ animationDelay: `${i * 1}s` }}>
          {i % 2 ? "♫" : "♪"}
        </text>
      ))}
    </svg>
  );
}

// 4a — the sky turns from gold to dusk and diyas light one by one
function DuskScene({ section }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  useScrub(ref, section, (tl, q) => {
    tl.fromTo(q(".dusk"), { opacity: 0 }, { opacity: 0.6, duration: 1 }).fromTo(q(".diya-flame"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 0.2 }, 0.2);
  });
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="dusk arch absolute inset-0 mix-blend-multiply" style={{ background: "linear-gradient(180deg, #3D1B52 0%, #8A3A5E 45%, #E07A1F 100%)", opacity: 0 }} />
      <div className="absolute inset-x-0 -bottom-5 flex justify-center gap-1 sm:gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="diya-flame">
            <Diya className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 4b — a chalkboard where the rhyme writes itself and the ladoo counter ticks up
function ChalkboardScene({ section }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const r = rhyme("ch4b");
  useScrub(ref, section, (tl, q) => {
    const counter = { n: 0 };
    const out = q(".counter");
    tl.from(q(".board"), { y: 80, opacity: 0, duration: 0.2 })
      .fromTo(q(".chalk-line"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4, stagger: 0.3 })
      .to(counter, { n: 42, duration: 0.5, onUpdate: () => out.forEach((o) => (o.textContent = String(Math.round(counter.n)))) });
  });
  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-[4%] bottom-[3%]" aria-hidden>
      <div className="board rounded-xl border-[6px] border-[#8E5A22] bg-[#24453A] p-4 shadow-2xl">
        {r.lines.map((l) => (
          <p key={l} className="chalk-line font-hand text-lg leading-snug text-white/90 sm:text-xl">
            {l}
          </p>
        ))}
        <p className="mt-2 font-hand text-base text-haldi">
          <span className="counter">0</span> bachche → <span className="counter">0</span> ladoo 🎉
        </p>
      </div>
      <span className="anim-shake absolute -right-2 -top-8 text-3xl">🔔</span>
    </div>
  );
}

// 4c — comic burst counts the son-in-law's ladoos, then GULP!
function JamaiScene({ section }: SceneProps) {
  const ref = useRef<SVGSVGElement>(null);
  useScrub(ref, section, (tl, q) => {
    q(".num").forEach((n, i) => {
      tl.fromTo(n, { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.1, ease: "back.out(3)" }, i * 0.18);
      if (i < 3) tl.to(n, { opacity: 0, duration: 0.05 }, i * 0.18 + 0.15);
    });
    tl.fromTo(q(".gulp"), { scale: 0, rotate: -20, transformOrigin: "50% 50%" }, { scale: 1, rotate: 8, duration: 0.15, ease: "back.out(3)" }, 0.85);
  });
  const star = (cx: number, cy: number, r1: number, r2: number) =>
    Array.from({ length: 24 }, (_, i) => {
      const r = i % 2 ? r2 : r1;
      const a = (i / 24) * Math.PI * 2;
      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
  return (
    <svg ref={ref} viewBox="0 0 400 500" className={box} aria-hidden>
      <polygon points={star(320, 90, 62, 44)} fill="#F2B33D" stroke="#6B1A1A" strokeWidth="3" />
      {[1, 2, 3, 4].map((n) => (
        <g key={n} className="num" opacity="0">
          <text x="320" y="104" textAnchor="middle" fontSize="44" fontWeight="900" fill="#6B1A1A" fontFamily="var(--font-yatra)">
            {n}
          </text>
        </g>
      ))}
      <g className="gulp">
        <polygon points={star(90, 400, 70, 48)} fill="#FFFFFF" stroke="#6B1A1A" strokeWidth="3" />
        <text x="90" y="412" textAnchor="middle" fontSize="30" fontWeight="900" fill="#C0262D" fontFamily="var(--font-yatra)">
          GULP!
        </text>
      </g>
    </svg>
  );
}

// 5 — the Ladoo Gang pops in counting; tap the shaking dabba to sneak a ladoo
function GangScene({ section }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stolen, setStolen] = useState(0);
  const [flying, setFlying] = useState<number[]>([]);
  const counts = ["Ek", "Do", "Teen", "Chaar", "Paanch", "Chhe"];
  useScrub(ref, section, (tl, q) => {
    tl.fromTo(q(".kid"), { scale: 0, y: 30 }, { scale: 1, y: 0, stagger: 0.12, duration: 0.15, ease: "back.out(3)" });
  });
  return (
    <div ref={ref} className="absolute inset-0" aria-label="Ladoo Gang">
      <div className="absolute inset-x-[14%] top-[9%] grid grid-cols-6 gap-1">
        {grandchildren.map((g, i) => (
          <div key={g.id} className="kid flex flex-col items-center">
            <Avatar m={g} size={34} />
            <span className="mt-0.5 rounded-full bg-maroon px-1.5 font-hand text-xs text-cream">{counts[i]}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[4%] right-[4%] flex flex-col items-end gap-2">
        <div className="relative">
          <AnimatePresence>
            {flying.map((id) => (
              <motion.span
                key={id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: -120 + (id % 5) * 30, y: -140, opacity: 0, scale: 0.6, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                onAnimationComplete={() => setFlying((f) => f.filter((x) => x !== id))}
                className="absolute left-4 top-0 block h-6 w-6 rounded-full"
                style={{ background: "radial-gradient(circle at 35% 35%, #F7D27A, #E9A93A 55%, #B9741C)" }}
              />
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => {
              setStolen((s) => s + 1);
              setFlying((f) => [...f, Date.now()]);
            }}
            className="anim-shake grid h-16 w-16 place-items-center rounded-2xl border-2 border-maroon bg-[#C7CBD1] text-3xl shadow-lg"
            aria-label="Dabbe se ek ladoo churao"
          >
            🫙
          </button>
        </div>
        <span className="rounded-full bg-cream/95 px-3 py-1 text-sm font-semibold text-maroon shadow" role="status">
          🤫 <T en="Ladoo chori hue" hi="लड्डू चोरी हुए" />: {stolen}
        </span>
      </div>
    </div>
  );
}

// 6 — wall calendar flips from 2006 to 2026 as the light softens
function CalendarScene({ section }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  useScrub(ref, section, (tl, q) => {
    const y = { v: 2006 };
    const out = q(".year");
    let last = 2006;
    tl.to(y, {
      v: 2026,
      duration: 1,
      onUpdate: () => {
        const v = Math.round(y.v);
        if (v === last) return;
        last = v;
        out.forEach((o) => (o.textContent = String(v)));
        ensureGsap().gsap.fromTo(q(".page"), { rotateX: -70 }, { rotateX: 0, duration: 0.25, ease: "power2.out", overwrite: true });
      },
    }).fromTo(q(".soft"), { opacity: 0 }, { opacity: 0.55, duration: 1 }, 0);
  });
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="soft arch absolute inset-0" style={{ background: "radial-gradient(circle at 20% 20%, rgb(255 236 200 / 0.9), transparent 60%)", opacity: 0 }} />
      <div className="absolute left-[8%] top-[24%] w-24 overflow-hidden rounded-lg bg-white shadow-xl sm:w-28" style={{ perspective: 400 }}>
        <div className="flex justify-around bg-maroon py-1.5">
          <span className="h-2 w-2 rounded-full bg-cream" />
          <span className="h-2 w-2 rounded-full bg-cream" />
        </div>
        <div className="page origin-top px-2 py-3 text-center" style={{ transformStyle: "preserve-3d" }}>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Saal</div>
          <div className="year font-display text-3xl text-maroon">2006</div>
        </div>
      </div>
      <span className="absolute bottom-[6%] left-[6%] rotate-[-8deg] rounded-full bg-haldi px-3 py-1 font-hand text-lg text-maroon-deep shadow">40 min, roz 🔥</span>
    </div>
  );
}

// 7 — wherever you are in India, a dabba can reach you
const home = { lon: 76.6, lat: 28.9 };
const cities = [
  ["Delhi", 77.2, 28.6], ["Jaipur", 75.8, 26.9], ["Chandigarh", 76.8, 30.7], ["Leh", 77.6, 34.2], ["Lucknow", 80.9, 26.8],
  ["Ahmedabad", 72.6, 23.0], ["Patna", 85.1, 25.6], ["Guwahati", 91.7, 26.1], ["Kolkata", 88.4, 22.6],
  ["Mumbai", 72.9, 19.1], ["Hyderabad", 78.5, 17.4], ["Bengaluru", 77.6, 12.97], ["Chennai", 80.3, 13.1], ["Kochi", 76.3, 9.9],
] as const;
const proj = (lon: number, lat: number) => ({ x: 40 + ((lon - 68) / 29) * 320, y: 30 + ((36 - lat) / 28) * 420 });

function DeliveryScene({ section }: SceneProps) {
  const ref = useRef<SVGSVGElement>(null);
  useScrub(ref, section, (tl, q) => {
    // let the family illustration breathe first, then the map takes over
    tl.to({}, { duration: 1.4 })
      .fromTo(q(".map-card"), { opacity: 0 }, { opacity: 1, duration: 0.15 })
      .fromTo(q(".home-pin"), { scale: 0, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.1, ease: "back.out(3)" })
      .from(q(".arc"), { drawSVG: "0%", duration: 0.25, stagger: 0.05 })
      .fromTo(q(".city"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.1, stagger: 0.05, ease: "back.out(3)" }, "<0.15");
  });
  const h = proj(home.lon, home.lat);
  return (
    <svg ref={ref} viewBox="0 0 400 500" className={box} aria-hidden>
      <g className="map-card">
        <rect x="16" y="16" width="368" height="468" rx="24" fill="#FFF6E5" opacity="0.93" />
        <text x="200" y="50" textAnchor="middle" fontSize="15" fontWeight="700" fill="#6B1A1A">Jahan bhi aap ho — dabba pahunchega</text>
      </g>
      {cities.map(([name, lon, lat]) => {
        const c = proj(lon, lat);
        const mx = (h.x + c.x) / 2 + (c.y - h.y) * 0.15;
        const my = (h.y + c.y) / 2 - Math.abs(c.x - h.x) * 0.25 - 20;
        return <DashedPath key={name} maskClassName="arc" d={`M${h.x} ${h.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`} stroke="#E07A1F" strokeWidth="1.8" strokeDasharray="3 4" />;
      })}
      {cities.map(([name, lon, lat]) => {
        const c = proj(lon, lat);
        return (
          <g key={name} className="city">
            <circle cx={c.x} cy={c.y} r="5" fill="#6B1A1A" />
            <text x={c.x + 8} y={c.y + 4} fontSize="11" fill="#3A2414">
              {name}
            </text>
          </g>
        );
      })}
      <g className="home-pin">
        <path d={`M${h.x} ${h.y} c-10 -14 -12 -20 -12 -26 a12 12 0 0 1 24 0 c0 6 -2 12 -12 26z`} fill="#C0262D" />
        <circle cx={h.x} cy={h.y - 26} r="5" fill="#FFF6E5" />
        <text x={h.x - 16} y={h.y + 16} fontSize="11" fontWeight="700" fill="#C0262D" textAnchor="end">
          Amma ki Rasoi
        </text>
      </g>
    </svg>
  );
}

const scenes: Record<SceneId, (p: SceneProps) => React.ReactNode> = {
  jet: JetScene,
  train: TrainScene,
  garland: GarlandScene,
  dusk: DuskScene,
  chalkboard: ChalkboardScene,
  jamai: JamaiScene,
  gang: GangScene,
  calendar: CalendarScene,
  delivery: DeliveryScene,
};

export function ChapterScene({ id, section }: { id: SceneId } & SceneProps) {
  const S = scenes[id];
  return <S section={section} />;
}
