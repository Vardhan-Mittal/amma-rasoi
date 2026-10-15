"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { rhyme } from "@/content/rhymes";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { Diya, Kite, PetalRain } from "@/components/motion/Ambient";
import { festivals } from "@/content/festivals";

export function FestivalOverlay({ id }: { id: string }) {
  if (id === "diwali")
    return (
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <Diya key={i} className="h-9 w-9" />
        ))}
      </div>
    );
  if (id === "rakhi") return <PetalRain count={10} />;
  return (
    <>
      <Kite className="absolute left-4 top-6 h-14 w-10" />
      <Kite className="absolute right-6 top-12 h-12 w-8" color="#1F6B5C" />
    </>
  );
}

const noop = () => () => {};

export function FestivalBoxes() {
  // current month on the client only, so the static page never guesses wrong
  const now = useSyncExternalStore(noop, () => new Date().getMonth(), () => null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20" aria-labelledby="fest-title">
      <p className="font-hand text-xl text-kesar">
        <T en="Tyohaar ke dabbe" hi="त्योहार के डब्बे" />
      </p>
      <h2 id="fest-title" className="font-display text-4xl text-maroon sm:text-5xl">
        <T en="Festival Boxes" hi="त्योहार बॉक्स" />
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {festivals.map((f, i) => {
          const live = now !== null && f.months.includes(now);
          const r = rhyme(f.rhymeId);
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-3xl bg-white/70 shadow-lg ${live ? "ring-4 ring-haldi" : ""}`}
            >
              {live && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3 z-10 rounded-full bg-kesar px-3 py-1 text-xs font-bold text-white"
                >
                  <T en="Abhi chal raha hai!" hi="अभी चल रहा है!" />
                </motion.span>
              )}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Illustration file={f.file} alt={f.title.en} mood={f.mood} sizes="(max-width:768px) 90vw, 30vw" />
                <FestivalOverlay id={f.id} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-maroon">
                  <T {...f.title} />
                </h3>
                <p className="mt-1 font-hand text-lg leading-snug text-kesar">
                  {r.lines[0]} {r.lines[1]}
                </p>
                <Link href={`/gifting#${f.id}`} className="mt-3 inline-block font-semibold text-maroon underline decoration-haldi decoration-2 underline-offset-4">
                  <T en="Box dekhiye →" hi="बॉक्स देखिए →" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
