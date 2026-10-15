"use client";

import { ensureGsap, prefersReducedMotion } from "./motion";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("amma:toast", { detail: message }));
}

/** Ladoo flies in an arc from the button into the cart dabba, whose lid snaps shut. */
export function flyToCart(from: HTMLElement, color = "#E9A93A") {
  const target = document.getElementById("cart-dabba");
  const bump = () => window.dispatchEvent(new Event("amma:cart-bump"));
  window.dispatchEvent(new Event("amma:show-header"));
  if (!target || prefersReducedMotion()) return bump();
  const { gsap } = ensureGsap();
  const a = from.getBoundingClientRect();
  const r = target.getBoundingClientRect();
  // if the header is still sliding back in, aim for where the cart will land
  const b = r.bottom < 0 ? { left: r.left, width: r.width, top: 10, height: r.height } : r;
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - 12}px`,
    top: `${a.top + a.height / 2 - 12}px`,
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `radial-gradient(circle at 35% 35%, #F7D27A, ${color} 55%, #8E5A22)`,
    boxShadow: "0 2px 6px rgb(74 16 16 / 0.4)",
    zIndex: "95",
    pointerEvents: "none",
  });
  document.body.appendChild(el);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  gsap.to(el, {
    duration: 0.85,
    ease: "power1.inOut",
    motionPath: { path: [{ x: 0, y: 0 }, { x: dx * 0.45, y: Math.min(dy, 0) - 140 }, { x: dx, y: dy }], curviness: 1.4 },
    rotate: 540,
    scale: 0.6,
    onComplete: () => {
      el.remove();
      bump();
    },
  });
}
