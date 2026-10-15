"use client";

import { useEffect, useRef, useState } from "react";
import { rhyme } from "@/content/rhymes";
import { voiceSrc } from "@/lib/assets";
import { useSoundscape } from "./SoundscapeProvider";

function startAudio(src: string, onDone: () => void) {
  const a = new Audio(src);
  a.onended = onDone;
  a.play().catch(onDone);
  return a;
}

/**
 * Plays the rhyme in Amma's recorded voice (public/audio/voice/<rhymeId>.mp3).
 * Until recordings exist, the browser's Hindi voice reads it as a stand-in.
 */
export function AmmaSunao({ rhymeId, tone = "light" }: { rhymeId: string; tone?: "light" | "dark" }) {
  const { duck } = useSoundscape();
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const src = voiceSrc(rhymeId);

  useEffect(() => () => {
    audio.current?.pause();
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
  }, []);

  const done = () => {
    setPlaying(false);
    duck(false);
  };

  const play = () => {
    if (playing) {
      audio.current?.pause();
      window.speechSynthesis?.cancel();
      done();
      return;
    }
    duck(true);
    setPlaying(true);
    if (src) {
      audio.current = startAudio(src, done);
      return;
    }
    const synth = window.speechSynthesis;
    if (!synth) return done();
    const u = new SpeechSynthesisUtterance(rhyme(rhymeId).lines.join(" "));
    u.lang = "hi-IN";
    u.rate = 0.85;
    u.pitch = 1.1;
    const hindi = synth.getVoices().find((v) => v.lang.startsWith("hi"));
    if (hindi) u.voice = hindi;
    u.onend = done;
    u.onerror = done;
    synth.cancel();
    synth.speak(u);
  };

  const base =
    tone === "dark"
      ? "border-cream/60 text-cream hover:bg-cream/10"
      : "border-maroon/40 text-maroon hover:bg-maroon/5";

  return (
    <button
      type="button"
      onClick={play}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${base}`}
      aria-label={playing ? "Stop" : "Amma ki awaaz mein suniye"}
      title={src ? "Amma ki awaaz" : "Sample voice — Amma's recording coming soon"}
    >
      {playing ? (
        <span className="flex h-4 items-end gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 rounded-sm bg-current"
              style={{ height: "100%", animation: `bob 0.6s ${i * 0.15}s ease-in-out infinite` }}
            />
          ))}
        </span>
      ) : (
        <span aria-hidden>▶</span>
      )}
      Amma Sunao
    </button>
  );
}
