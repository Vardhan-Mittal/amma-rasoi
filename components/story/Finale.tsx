"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { family } from "@/content/family";
import { promises } from "@/content/story";
import { T } from "@/lib/lang";
import { Avatar } from "@/components/ui/Avatar";
import { PetalRain } from "@/components/motion/Ambient";

/** The whole family gathers around Amma in a circle, petals fall, and the order button appears. */
export function Finale() {
  const ring = family.filter((m) => m.id !== "amma");
  const amma = family.find((m) => m.id === "amma")!;

  return (
    <section data-track="ch7" className="relative overflow-hidden bg-maroon py-24 text-cream" aria-labelledby="finale-title">
      <PetalRain count={22} />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -100px 0px" }} className="relative mx-auto aspect-square w-full max-w-[340px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div variants={{ hidden: { scale: 0 }, show: { scale: 1 } }} transition={{ type: "spring", stiffness: 160, damping: 12 }}>
              <Avatar m={amma} size={104} />
            </motion.div>
          </div>
          {ring.map((m, i) => {
            const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(a) * 42;
            const y = Math.sin(a) * 42;
            // start scattered far outside, then gather into the ring
            const sx = Math.cos(a * 3 + i) * 160;
            const sy = Math.sin(a * 2 + i) * 160;
            return (
              <div key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + x}%`, top: `${50 + y}%` }} title={m.name}>
                <motion.div
                  variants={{ hidden: { x: sx, y: sy, opacity: 0, rotate: (i % 2 ? 1 : -1) * 90 }, show: { x: 0, y: 0, opacity: 1, rotate: 0 } }}
                  transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.3 + i * 0.06 }}
                >
                  <Avatar m={m} size={m.generation === "grandchild" ? 48 : 54} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.h2
          id="finale-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-12 font-display text-4xl sm:text-5xl"
        >
          <T en="Har dabbe mein Amma ka aashirwaad" hi="हर डब्बे में अम्मा का आशीर्वाद" />
        </motion.h2>
        <p className="mt-3 text-cream/80">
          <T en="Every box carries Amma's blessings — not just ladoos." hi="हर डब्बे में सिर्फ़ लड्डू नहीं, अम्मा का आशीर्वाद जाता है।" />
        </p>

        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {promises.map((p, i) => (
            <motion.li
              key={p.icon}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl bg-cream/10 px-4 py-3"
            >
              <span className="text-2xl" aria-hidden>
                {p.icon}
              </span>
              <T {...p.text} />
            </motion.li>
          ))}
        </ul>

        <p className="mt-10 font-hand text-3xl text-haldi">Kha le, beta. ❤️</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-wobble rounded-full bg-haldi px-7 py-3.5 text-lg font-bold text-maroon-deep shadow-lg">
            <T en="Order Karo" hi="ऑर्डर करो" />
          </Link>
          <Link href="/gifting" className="rounded-full border-2 border-cream/60 px-7 py-3.5 text-lg font-semibold hover:bg-cream/10">
            <T en="Gift a dabba" hi="डब्बा गिफ़्ट करें" />
          </Link>
        </div>
      </div>
    </section>
  );
}
