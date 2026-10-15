"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { grandchildren } from "@/content/family";
import { getProduct } from "@/content/products";
import { T } from "@/lib/lang";
import { Avatar } from "@/components/ui/Avatar";

const counts = ["Ek", "Do", "Teen", "Chaar", "Paanch", "Chhe"];

/** The six grandchildren pop in one by one, counting in Hindi; each links to their favourite ladoo. */
export function LadooGang() {
  return (
    <section className="relative overflow-hidden py-20" aria-labelledby="gang-title">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-hand text-xl text-kesar">
          <T en="Meet the Ladoo Gang" hi="मिलिए लड्डू गैंग से" />
        </p>
        <h2 id="gang-title" className="font-display text-4xl text-maroon sm:text-5xl">
          <T en="Chhe Chhote Chor" hi="छह छोटे चोर" />
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          <T en="Six grandchildren, one dabba on the top shelf. Each one has a favourite — tap to try it." hi="छह बच्चे, ऊपर की शेल्फ़ पर एक डब्बा। हर एक का अपना फ़ेवरेट — छूकर चखिए।" />
        </p>
        <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -80px 0px" }} className="mt-10 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {grandchildren.map((g, i) => {
            const fav = getProduct(g.favourite)!;
            return (
              <motion.li
                key={g.id}
                variants={{ hidden: { scale: 0, rotate: -20, opacity: 0 }, show: { scale: 1, rotate: 0, opacity: 1 } }}
                transition={{ type: "spring", stiffness: 260, damping: 12, delay: i * 0.28 }}
              >
                <Link href={`/shop/${fav.slug}`} className="group flex flex-col items-center gap-2">
                  <motion.span whileHover={{ y: -10, rotate: [0, -8, 8, 0] }} whileTap={{ scale: 0.9 }} className="relative">
                    <Avatar m={g} size={84} />
                    <motion.span
                      variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                      transition={{ delay: i * 0.28 + 0.25, type: "spring" }}
                      className="absolute -right-2 -top-2 rounded-full bg-maroon px-2 py-0.5 font-hand text-sm text-cream"
                    >
                      {counts[i]}!
                    </motion.span>
                  </motion.span>
                  <span className="text-sm font-semibold text-maroon">{g.name}</span>
                  <span className="text-xs text-ink-soft group-hover:text-kesar">
                    ♥ <T {...fav.name} />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
          className="mt-8 font-hand text-2xl text-maroon"
        >
          Chhe chhote chor, ladoo le ke bhaage re! 🏃
        </motion.p>
      </div>
    </section>
  );
}
