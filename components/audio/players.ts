"use client";

import { Howl, Howler } from "howler";
import type { SynthSpec } from "@/content/music";

export interface Player {
  play(): void;
  fadeTo(volume: number, ms: number): void;
  stop(): void;
}

/** Real music file, looped. */
export class FilePlayer implements Player {
  private howl: Howl;
  constructor(src: string) {
    this.howl = new Howl({ src: [src], loop: true, volume: 0, preload: true });
  }
  play() {
    if (!this.howl.playing()) this.howl.play();
  }
  fadeTo(volume: number, ms: number) {
    this.howl.fade(this.howl.volume(), volume, ms);
  }
  stop() {
    this.howl.pause();
  }
}

/** Shares Howler's AudioContext so one user gesture unlocks both. */
export function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  // Touching Howler.ctx lazily creates the shared context.
  const ctx = (Howler as unknown as { ctx?: AudioContext }).ctx;
  if (ctx) return ctx;
  new Howl({ src: ["data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="] });
  return (Howler as unknown as { ctx?: AudioContext }).ctx ?? null;
}

/**
 * Placeholder music: a soft tanpura-like drone (Sa + Pa) with a gentle plucked
 * melody and a dholak-style thump, so the chapter crossfades are audible
 * before real recordings exist.
 */
export class SynthPlayer implements Player {
  private out: GainNode | null = null;
  private drones: OscillatorNode[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private nextTime = 0;
  private step = 0;

  constructor(private spec: SynthSpec) {}

  play() {
    const ctx = audioContext();
    if (!ctx || this.out) return;
    const out = ctx.createGain();
    out.gain.value = 0;
    out.connect(ctx.destination);
    this.out = out;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    lp.connect(out);
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.12;
    droneGain.connect(lp);
    for (const [mult, detune] of [[1, 0], [1.5, 3], [2, -4], [0.5, 0]] as const) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = this.spec.root * mult;
      o.detune.value = detune;
      o.connect(droneGain);
      o.start();
      this.drones.push(o);
    }

    this.nextTime = ctx.currentTime + 0.1;
    this.step = 0;
    const beat = 60 / this.spec.bpm / 2; // eighth notes
    this.timer = setInterval(() => {
      while (this.nextTime < ctx.currentTime + 0.2) {
        this.schedule(ctx, this.nextTime, beat);
        this.nextTime += beat;
        this.step++;
      }
    }, 50);
  }

  private schedule(ctx: AudioContext, t: number, beat: number) {
    const out = this.out;
    if (!out) return;
    const { pattern, scale, root, wave, brightness } = this.spec;
    const idx = pattern[this.step % pattern.length];
    if (idx >= 0) {
      const semis = scale[idx % scale.length];
      const f = root * 2 * Math.pow(2, semis / 12);
      const o = ctx.createOscillator();
      o.type = wave;
      o.frequency.value = f;
      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = brightness;
      const g = ctx.createGain();
      const peak = wave === "sine" || wave === "triangle" ? 0.22 : 0.07;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + beat * 2.4);
      o.connect(filt).connect(g).connect(out);
      o.start(t);
      o.stop(t + beat * 2.5);
    }
    // soft dholak-ish thump on beats 1 and 3 of each bar
    if (this.step % 4 === 0) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.25, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + 0.3);
    }
  }

  fadeTo(volume: number, ms: number) {
    const ctx = audioContext();
    if (!ctx || !this.out) return;
    const g = this.out.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setValueAtTime(g.value, ctx.currentTime);
    g.linearRampToValueAtTime(volume * 0.6, ctx.currentTime + ms / 1000);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.drones.forEach((o) => {
      try {
        o.stop();
      } catch {}
    });
    this.drones = [];
    this.out?.disconnect();
    this.out = null;
  }
}
