"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { tracks } from "@/content/music";
import { useSoundscape } from "./SoundscapeProvider";

/** Floating diya button: flame lit = music playing. */
export function MuteDiya() {
  const { enabled, muted, current, toggle } = useSoundscape();
  const on = enabled && !muted;
  // show the track name briefly each time the music changes
  const [seen, setSeen] = useState<string | null>(null);
  const label = current && seen !== current ? tracks[current].label : null;

  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => setSeen(current), 2600);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Music band karein (mute)" : "Sangeet chalu karein (play music)"}
        className="group grid h-12 w-12 place-items-center sm:h-14 sm:w-14 rounded-full border-2 border-haldi bg-maroon shadow-lg shadow-maroon/30 transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
          {on && <circle cx="24" cy="18" r="12" fill="#F2B33D" opacity="0.35" className="anim-glow" />}
          <g className={on ? "anim-flicker" : ""} style={{ opacity: on ? 1 : 0.25 }}>
            <path d="M24 6c4 6 6 9 6 13a6 6 0 0 1-12 0c0-4 2-7 6-13z" fill="#F2B33D" />
            <path d="M24 12c2 3.5 3 5.5 3 7.5a3 3 0 0 1-6 0c0-2 1-4 3-7.5z" fill="#FFF6E5" />
          </g>
          <path d="M8 28h32c0 7-7 12-16 12S8 35 8 28z" fill="#C9952F" />
          <path d="M8 28h32" stroke="#FFF6E5" strokeWidth="2" strokeLinecap="round" />
          {!on && <path d="M10 10l28 28" stroke="#FFF6E5" strokeWidth="3" strokeLinecap="round" />}
        </svg>
      </button>
      <AnimatePresence>
        {on && label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="rounded-full bg-maroon/90 px-3 py-1 text-sm text-cream shadow"
            role="status"
          >
            ♪ {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
