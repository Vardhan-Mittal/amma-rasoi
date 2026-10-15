"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ensureGsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { T } from "@/lib/lang";

const steps = [
  { icon: "🫙", title: { en: "Ghee — no kanjoosi", hi: "घी — कोई कंजूसी नहीं" }, text: { en: "Pure desi ghee goes in first. Amma measures it with her eyes, never a spoon.", hi: "पहले शुद्ध देसी घी। अम्मा आँखों से नापती हैं, चम्मच से नहीं।" } },
  { icon: "🔥", title: { en: "40-minute bhunai", hi: "चालीस मिनट की भुनाई" }, text: { en: "Besan on a slow flame, stirred until it turns from pale to deep gold. Not 35 minutes. Forty.", hi: "धीमी आँच पर बेसन, जब तक हल्के से गहरा सुनहरा न हो जाए। पैंतीस नहीं, चालीस मिनट।" } },
  { icon: "🤲", title: { en: "Haath se bandhe", hi: "हाथ से बँधे" }, text: { en: "Every ladoo is rolled by hand while still warm. No machine knows how much pressure is just right.", hi: "हर लड्डू गरम-गरम हाथ से बाँधा जाता है। मशीन को सही दबाव नहीं पता।" } },
  { icon: "📦", title: { en: "Dabba band", hi: "डब्बा बंद" }, text: { en: "Packed fresh, with a handwritten note from the family — and on its way to you.", hi: "ताज़ा पैक, परिवार के हाथ से लिखे नोट के साथ — और आपकी ओर रवाना।" } },
];

/** Scroll-linked recipe: ghee pours, besan turns gold, hands roll, the dabba lid closes. */
export function KaiseBantaHai() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const { gsap } = ensureGsap();
      const el = root.current!;
      const q = (s: string) => el.querySelectorAll(s);
      const timer = el.querySelector(".timer");
      if (prefersReducedMotion()) {
        gsap.set(q(".besan"), { attr: { fill: "#D9902A" } });
        return;
      }
      const clock = { m: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el.querySelector(".steps"), start: "top 60%", end: "bottom 70%", scrub: 0.8 },
      });
      // 1. ghee
      tl.to(q(".ghee-jar"), { rotate: -70, transformOrigin: "80% 80%", duration: 0.6 })
        .fromTo(q(".ghee-stream"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.5 }, "<0.2")
        .fromTo(q(".ghee-level"), { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.6 }, "<0.2")
        .to(q(".ghee-jar, .ghee-stream"), { opacity: 0, duration: 0.3 })
        // 2. bhunai
        .fromTo(q(".besan"), { attr: { fill: "#F3DFA2" }, opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(q(".besan"), { attr: { fill: "#C9801F" }, duration: 1.4 })
        .to(q(".spoon"), { rotate: 720, transformOrigin: "50% 95%", duration: 1.4 }, "<")
        .to(clock, { m: 40, duration: 1.4, onUpdate: () => { if (timer) timer.textContent = `${Math.round(clock.m)} min`; } }, "<")
        .fromTo(q(".stage-steam"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<")
        // 3. hands
        .to(q(".kadhai-group"), { x: -70, scale: 0.75, transformOrigin: "50% 100%", duration: 0.5 })
        .fromTo(q(".hands"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4 }, "<0.2")
        .to(q(".hands-orbit"), { rotate: 720, transformOrigin: "200px 150px", duration: 1 })
        .fromTo(q(".made"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.25, duration: 0.3, ease: "back.out(2)" }, "<0.2")
        // 4. dabba
        .to(q(".hands"), { opacity: 0, duration: 0.3 })
        .fromTo(q(".dabba"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "<")
        .to(q(".made"), { y: 40, x: (i: number) => [-14, 0, 14][i] ?? 0, scale: 0.7, duration: 0.5, stagger: 0.1 })
        .fromTo(q(".dabba-lid"), { y: -60, rotate: -30, transformOrigin: "0% 100%" }, { y: 0, rotate: 0, duration: 0.4, ease: "bounce.out" })
        .fromTo(q(".stamp"), { scale: 3, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-maroon text-cream" aria-labelledby="kaise-title">
      <div className="mx-auto max-w-6xl px-4 pt-20">
        <p className="font-hand text-xl text-haldi">
          <T en="Amma's method, step by step" hi="अम्मा का तरीक़ा, क़दम दर क़दम" />
        </p>
        <h2 id="kaise-title" className="font-display text-4xl sm:text-5xl">
          <T en="Kaise Banta Hai" hi="कैसे बनता है" />
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 lg:grid-cols-2">
        <div className="sticky top-20 z-0 h-[52svh] lg:h-[80vh]">
          <svg viewBox="0 0 300 260" className="h-full w-full" role="img" aria-label="Ghee, besan roasting, hands rolling ladoos, packing in a dabba">
            {/* chulha */}
            <g className="kadhai-group">
              <path d="M70 230 h160 l-12 24 h-136 z" fill="#8E3B1E" />
              <g className="anim-flicker" style={{ transformOrigin: "150px 230px" }}>
                <path d="M120 230 q10 -26 18 -8 q6 -20 14 -2 q8 -18 16 4 q6 -12 12 6z" fill="#F2B33D" />
                <path d="M132 230 q8 -16 14 -4 q6 -12 12 0 q6 -10 10 4z" fill="#E07A1F" />
              </g>
              <path d="M70 180 h160 c0 30 -36 48 -80 48 s-80 -18 -80 -48z" fill="#2B1B12" />
              <path d="M58 186 q-14 0 -14 10 M242 186 q14 0 14 10" stroke="#2B1B12" strokeWidth="8" fill="none" strokeLinecap="round" />
              <ellipse className="ghee-level" cx="150" cy="182" rx="74" ry="9" fill="#F7E08A" />
              <ellipse className="besan" cx="150" cy="182" rx="74" ry="11" fill="#F3DFA2" opacity="0" />
              <g className="spoon">
                <rect x="147" y="100" width="6" height="84" rx="3" fill="#C9952F" />
              </g>
              <g className="stage-steam" opacity="0">
                {[120, 150, 180].map((x, i) => (
                  <path key={x} d={`M${x} 168 q-8 -14 0 -28 q8 -14 0 -28`} stroke="#FFF6E5" strokeWidth="4" fill="none" strokeLinecap="round" className="anim-steam" style={{ animationDelay: `${i * 0.8}s` }} />
                ))}
              </g>
              <text className="timer" x="150" y="72" textAnchor="middle" fill="#F2B33D" fontSize="22" fontFamily="var(--font-kalam)">
                0 min
              </text>
            </g>
            {/* ghee jar */}
            <g className="ghee-jar">
              <rect x="210" y="40" width="44" height="56" rx="10" fill="#C9952F" />
              <rect x="214" y="34" width="36" height="10" rx="3" fill="#8E6A1E" />
              <text x="232" y="74" textAnchor="middle" fontSize="11" fill="#4A1010" fontWeight="700">GHEE</text>
            </g>
            <path className="ghee-stream" d="M214 60 C 196 90, 176 120, 166 176" stroke="#F7E08A" strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* hands rolling */}
            <g className="hands" opacity="0">
              <circle cx="200" cy="150" r="16" fill="#E9A93A" />
              <g className="hands-orbit">
                <ellipse cx="200" cy="124" rx="26" ry="12" fill="#E8B48A" stroke="#B87C55" strokeWidth="2" />
                <ellipse cx="200" cy="176" rx="26" ry="12" fill="#D9A27A" stroke="#B87C55" strokeWidth="2" />
              </g>
            </g>
            {/* made ladoos */}
            {[170, 200, 230].map((x) => (
              <g key={x} className="made">
                <circle cx={x} cy="205" r="13" fill="#E9A93A" stroke="#B9741C" strokeWidth="1.5" />
                <circle cx={x - 4} cy="201" r="2" fill="#F7D27A" />
              </g>
            ))}
            {/* dabba */}
            <g className="dabba" opacity="0">
              <rect x="166" y="210" width="68" height="44" rx="8" fill="#C7CBD1" stroke="#6B1A1A" strokeWidth="3" />
              <path d="M174 226 h52" stroke="#FFF" strokeWidth="2" opacity="0.7" />
              <g className="dabba-lid">
                <rect x="162" y="200" width="76" height="12" rx="4" fill="#DDE0E4" stroke="#6B1A1A" strokeWidth="3" />
                <rect x="190" y="193" width="20" height="8" rx="3" fill="#6B1A1A" />
              </g>
            </g>
            <g className="stamp" opacity="0">
              <circle cx="262" cy="196" r="26" fill="none" stroke="#F2B33D" strokeWidth="3" strokeDasharray="4 3" />
              <text x="262" y="193" textAnchor="middle" fill="#F2B33D" fontSize="10" fontWeight="700">TAAZA</text>
              <text x="262" y="206" textAnchor="middle" fill="#F2B33D" fontSize="9">✓ Amma</text>
            </g>
          </svg>
        </div>
        <ol className="steps relative z-10 space-y-[40svh] pb-[20svh] pt-[10svh] lg:space-y-[45vh]">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0.25, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-35% 0px -35% 0px" }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-haldi/30 bg-maroon-deep/90 p-6 shadow-xl"
            >
              <div className="text-3xl" aria-hidden>
                {s.icon}
              </div>
              <h3 className="mt-2 font-display text-2xl text-haldi">
                {i + 1}. <T {...s.title} />
              </h3>
              <p className="mt-2 text-cream/85">
                <T {...s.text} />
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
