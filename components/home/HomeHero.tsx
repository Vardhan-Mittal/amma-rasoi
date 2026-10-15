"use client";

import Link from "next/link";
import { useRef } from "react";
import { ensureGsap, onIntroDone, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { rhyme } from "@/content/rhymes";
import { illustrationSrc } from "@/lib/assets";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { Diya, SteamWisps } from "@/components/motion/Ambient";
import { AmmaSunao } from "@/components/audio/AmmaSunao";

/** Carved jaali lattice used on the shutters. */
function Jaali() {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 200" aria-hidden>
      <defs>
        <pattern id="jaali" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#7A4A22" />
          <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#4A2A12" strokeWidth="2.2" />
          <circle cx="10" cy="10" r="3" fill="#4A2A12" />
          <circle cx="10" cy="10" r="1.4" fill="#C9952F" />
        </pattern>
      </defs>
      <rect width="100" height="200" fill="url(#jaali)" />
      <rect x="4" y="4" width="92" height="192" fill="none" stroke="#C9952F" strokeWidth="2" />
      <rect x="9" y="9" width="82" height="182" fill="none" stroke="#4A2A12" strokeWidth="3" />
    </svg>
  );
}

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const r = rhyme("hero");
  const layered = !!illustrationSrc("hero-bg.png") && !!illustrationSrc("hero-amma.png");

  useGSAP(
    () => {
      const { gsap, SplitText } = ensureGsap();
      const el = root.current!;
      const shutters = el.querySelectorAll(".shutter");
      if (prefersReducedMotion()) {
        gsap.set(shutters, { display: "none" });
        return;
      }
      const split = SplitText.create(el.querySelectorAll(".hero-rhyme-line"), { type: "words,chars", wordsClass: "inline-block", charsClass: "inline-block" });
      gsap.set(split.chars, { opacity: 0, y: 12 });
      gsap.set(el.querySelectorAll(".hero-fade"), { opacity: 0, y: 20 });

      const tl = gsap.timeline({ paused: true });
      tl.to(el.querySelector(".shutter-l"), { rotateY: -108, duration: 1.4, ease: "power3.inOut" }, 0)
        .to(el.querySelector(".shutter-r"), { rotateY: 108, duration: 1.4, ease: "power3.inOut" }, 0)
        .from(el.querySelector(".hero-art"), { scale: 1.15, duration: 1.8, ease: "power2.out" }, 0)
        .to(shutters, { opacity: 0, duration: 0.3 }, 1.2)
        .to(split.chars, { opacity: 1, y: 0, duration: 0.4, stagger: 0.025, ease: "back.out(2)" }, 0.6)
        .to(el.querySelectorAll(".hero-fade"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.0);
      const off = onIntroDone(() => tl.play());

      // gentle parallax: art drifts slower than the page, front props faster
      gsap.to(el.querySelector(".hero-art"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(el.querySelectorAll(".hero-front"), { yPercent: -40, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      // mouse parallax on desktop
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine)", () => {
        const amma = el.querySelector(".hero-amma");
        const xTo = gsap.quickTo(amma, "x", { duration: 0.8 });
        const move = (e: PointerEvent) => xTo((e.clientX / window.innerWidth - 0.5) * -18);
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });
      return () => {
        off();
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-maroon text-cream" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="hero-fade font-semibold tracking-wide text-haldi">
            <T en="Since 2006 · Mittal Parivaar ki rasoi se" hi="2006 से · मित्तल परिवार की रसोई से" />
          </p>
          <h1 id="hero-title" className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <span className="hero-rhyme-line block">{r.lines[0]}</span>
            <span className="hero-rhyme-line block text-haldi">{r.lines[1]}</span>
          </h1>
          <p className="hero-fade mt-5 max-w-lg text-lg text-cream/85">
            <T
              en="For 20 years Amma has roasted besan for 40 minutes, rolled every ladoo by hand, and packed it in a steel dabba for whoever was leaving home. Now she makes them for your family too."
              hi="बीस साल से अम्मा चालीस मिनट बेसन भूनती हैं, हर लड्डू हाथ से बाँधती हैं, और घर से जाने वाले हर बच्चे के लिए स्टील के डब्बे में पैक करती हैं। अब आपके परिवार के लिए भी।"
            />
          </p>
          <div className="hero-fade mt-7 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-wobble rounded-full bg-haldi px-6 py-3 text-lg font-bold text-maroon-deep shadow-lg shadow-black/20 hover:bg-kesar hover:text-cream">
              <T en="Order Karo" hi="ऑर्डर करो" />
            </Link>
            <Link href="/amma-ki-kahani" className="rounded-full border-2 border-cream/60 px-6 py-3 text-lg font-semibold hover:bg-cream/10">
              ▶ <T en="Amma ki Kahani" hi="अम्मा की कहानी" />
            </Link>
          </div>
          <div className="hero-fade mt-5">
            <AmmaSunao rhymeId="hero" tone="dark" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md" style={{ perspective: 1400 }}>
            {/* arch frame */}
            <div className="arch absolute inset-0 overflow-hidden border-[6px] border-haldi bg-cream-deep shadow-2xl shadow-black/40">
              <div className="hero-art absolute inset-[-6%]">
                {layered ? (
                  <>
                    <Illustration file="hero-bg.png" alt="" priority position="58% 50%" sizes="(max-width:1024px) 90vw, 40vw" />
                    <div className="hero-amma absolute inset-x-[8%] bottom-0 top-[14%]">
                      <Illustration file="hero-amma.png" alt="Amma holding a thali of ladoos" fit="contain" position="50% 100%" priority sizes="(max-width:1024px) 80vw, 35vw" />
                    </div>
                  </>
                ) : (
                  <div className="hero-amma absolute inset-0">
                    <Illustration file="hero.png" alt="Amma holding a thali of ladoos in her haveli kitchen" mood="warm" priority sizes="(max-width:1024px) 90vw, 40vw" />
                  </div>
                )}
              </div>
              {/* shutters */}
              <div className="shutter shutter-l absolute inset-y-0 left-0 w-1/2 origin-left" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
                <Jaali />
              </div>
              <div className="shutter shutter-r absolute inset-y-0 right-0 w-1/2 origin-right" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
                <Jaali />
              </div>
            </div>
            <svg className="absolute -top-8 left-1/2 h-10 w-14 -translate-x-1/2" viewBox="0 0 40 32" aria-hidden>
              <path d="M6 30 C6 16 34 16 34 30 Z" fill="#F2B33D" />
              <circle cx="20" cy="12" r="5" fill="#F2B33D" />
              <path d="M20 7 V0" stroke="#F2B33D" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {/* front props */}
            <Diya className="hero-front absolute -bottom-4 -left-4 h-16 w-16 drop-shadow-lg" />
            <Diya className="hero-front absolute -bottom-4 -right-4 h-16 w-16 drop-shadow-lg" />
            <SteamWisps className="hero-front absolute left-[14%] top-[48%] h-20 w-16 opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
