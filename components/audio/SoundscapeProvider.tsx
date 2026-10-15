"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { tracks, type TrackId } from "@/content/music";
import { musicSrc } from "@/lib/assets";
import { audioContext, FilePlayer, SynthPlayer, type Player } from "./players";

const BASE_VOLUME = 0.4;
const DUCKED_VOLUME = 0.15;
const CROSSFADE_MS = 2000;

type SoundCtx = {
  /** user has unlocked audio with a tap */
  enabled: boolean;
  muted: boolean;
  playing: boolean;
  current: TrackId | null;
  start: () => void;
  toggle: () => void;
  duck: (on: boolean) => void;
};

const Ctx = createContext<SoundCtx>({
  enabled: false,
  muted: true,
  playing: false,
  current: null,
  start: () => {},
  toggle: () => {},
  duck: () => {},
});

export const useSoundscape = () => useContext(Ctx);

export function SoundscapeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(true);
  // the section under the middle of the screen, remembered per page
  const [seen, setSeen] = useState<{ path: string; id: TrackId } | null>(null);
  const desired = seen && seen.path === pathname ? seen.id : null;
  const [hidden, setHidden] = useState(false);
  const [ducked, setDucked] = useState(false);

  const players = useRef(new Map<TrackId, Player>());
  const active = useRef<TrackId | null>(null);
  const stopTimers = useRef(new Map<TrackId, ReturnType<typeof setTimeout>>());

  const getPlayer = useCallback((id: TrackId) => {
    let p = players.current.get(id);
    if (!p) {
      const src = musicSrc(id);
      p = src ? new FilePlayer(src) : new SynthPlayer(tracks[id].synth);
      players.current.set(id, p);
    }
    return p;
  }, []);

  const start = useCallback(() => {
    const ctx = audioContext();
    ctx?.resume?.();
    setEnabled(true);
    setMuted(false);
    try {
      localStorage.setItem("amma-music", "on");
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    if (!enabled || muted) {
      start();
      return;
    }
    setMuted(true);
    try {
      localStorage.setItem("amma-music", "off");
    } catch {}
  }, [enabled, muted, start]);

  const duck = useCallback((on: boolean) => setDucked(on), []);

  // Returning visitors who left music on: resume on their first interaction.
  useEffect(() => {
    let pref: string | null = null;
    try {
      pref = localStorage.getItem("amma-music");
    } catch {}
    if (pref !== "on") return;
    const resume = () => start();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [start]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Which section is crossing the middle of the screen decides the track.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-track]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSeen({ path: pathname, id: e.target.getAttribute("data-track") as TrackId });
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Crossfade to the target track.
  const target = enabled && !muted && !hidden ? desired : null;
  useEffect(() => {
    const prev = active.current;
    if (prev === target) return;

    if (prev) {
      const p = players.current.get(prev);
      p?.fadeTo(0, CROSSFADE_MS);
      const t = setTimeout(() => p?.stop(), CROSSFADE_MS + 100);
      stopTimers.current.set(prev, t);
    }
    if (target) {
      const pending = stopTimers.current.get(target);
      if (pending) clearTimeout(pending);
      const p = getPlayer(target);
      p.play();
      p.fadeTo(ducked ? DUCKED_VOLUME : BASE_VOLUME, CROSSFADE_MS);
    }
    active.current = target;
    // ducked is handled by the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getPlayer]);

  useEffect(() => {
    const id = active.current;
    if (!id) return;
    players.current.get(id)?.fadeTo(ducked ? DUCKED_VOLUME : BASE_VOLUME, 400);
  }, [ducked]);

  useEffect(() => {
    const map = players.current;
    return () => map.forEach((p) => p.stop());
  }, []);

  return (
    <Ctx.Provider value={{ enabled, muted, playing: target !== null, current: target, start, toggle, duck }}>
      {children}
    </Ctx.Provider>
  );
}
