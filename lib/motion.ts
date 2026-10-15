"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Registers GSAP plugins once (client only). */
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, useGSAP);
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSmallScreen() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

// ---- intro loader handshake: hero shutters wait for the loader to finish ----
type Listener = () => void;
let introDone = false;
const listeners = new Set<Listener>();

export function markIntroDone() {
  introDone = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function onIntroDone(fn: Listener) {
  if (introDone) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
