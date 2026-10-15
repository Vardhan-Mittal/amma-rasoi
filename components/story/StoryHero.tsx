"use client";

import { motion } from "motion/react";
import { useSoundscape } from "@/components/audio/SoundscapeProvider";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { PetalRain, Diya } from "@/components/motion/Ambient";
import { T } from "@/lib/lang";

export function StoryHero() {
  const { start, enabled, muted } = useSoundscape();
  const on = enabled && !muted;

  return (
    <section data-track="home" className="relative grid min-h-[calc(100svh-4rem)] place-items-center overflow-hidden bg-maroon px-4 text-center text-cream">
      <PetalRain count={16} className="opacity-60" />
      <div className="relative">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-hand text-2xl text-haldi">
          20 saal · ek kadhai · pura Mittal parivaar
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
          className="mt-3 font-display text-5xl sm:text-7xl"
        >
          <T en="Amma ki Kahani" hi="अम्मा की कहानी" />
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 flex justify-center gap-4">
          <Diya className="h-10 w-10" />
          <Diya className="h-10 w-10" />
          <Diya className="h-10 w-10" />
        </motion.div>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (!on) start();
            scrollToId("intro");
          }}
          className="mt-8 rounded-full bg-haldi px-8 py-4 text-xl font-bold text-maroon-deep shadow-xl shadow-black/30"
        >
          🎵 <T en="Kahani Shuru Karein" hi="कहानी शुरू करें" />
        </motion.button>
        <p className="mt-3 text-sm text-cream/70">
          <T en="With music · headphones lagaiye 🎧" hi="संगीत के साथ · हेडफ़ोन लगाइए 🎧" />
        </p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="mt-10 text-3xl text-haldi" aria-hidden>
          ↓
        </motion.div>
      </div>
    </section>
  );
}
