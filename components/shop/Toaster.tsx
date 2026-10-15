"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Toaster() {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setMsg({ id: Date.now(), text: (e as CustomEvent<string>).detail });
      clearTimeout(t);
      t = setTimeout(() => setMsg(null), 2400);
    };
    window.addEventListener("amma:toast", on);
    return () => {
      window.removeEventListener("amma:toast", on);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.id}
            initial={{ y: -30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="rounded-full border-2 border-haldi bg-maroon px-5 py-2.5 font-hand text-lg text-cream shadow-xl"
          >
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
