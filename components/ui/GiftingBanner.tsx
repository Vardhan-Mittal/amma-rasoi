"use client";

import { motion } from "motion/react";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { PetalRain } from "@/components/motion/Ambient";

/** Painted teal-door banner with the page title over a maroon fade. */
export function GiftingBanner() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-xl sm:aspect-[16/9] lg:aspect-auto lg:h-[460px]">
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.2, 0.8, 0.2, 1] }}>
        <Illustration file="gifting-banner.png" alt="A painted Rajasthani doorway with clay pots, peacock feathers and a heap of haldi" mood="warm" priority sizes="(max-width:1152px) 100vw, 1152px" className="[&_img]:object-[60%_center]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/45 to-transparent" />
      <PetalRain count={12} />
      <div className="absolute inset-y-0 left-0 flex max-w-[75%] flex-col justify-end p-6 sm:max-w-md sm:justify-center sm:p-10">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-hand text-xl text-haldi sm:text-2xl">
          <T en="Mithaas baantiye" hi="मिठास बाँटिए" />
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="font-display text-4xl leading-tight text-cream sm:text-5xl">
          <T en="Gifting & Bulk Orders" hi="उपहार और थोक ऑर्डर" />
        </motion.h1>
      </div>
    </div>
  );
}
