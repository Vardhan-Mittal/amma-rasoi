// Living-picture effects layered on top of each illustration.
// Coordinates are fractions of the image itself (0–1), so they stay on the
// fire, lamp or kadhai however the picture is cropped.
export type Fx =
  | { type: "glow"; x: number; y: number; size: number; color: string; speed?: number }
  | { type: "embers"; x: number; y: number; count?: number }
  | { type: "steam"; x: number; y: number; size?: number }
  | { type: "smoke"; x: number; y: number }
  | { type: "snow"; count?: number }
  | { type: "motes"; x: number; y: number; w: number; h: number; count?: number }
  | { type: "rays"; x: number; y: number; angle: number }
  | { type: "petals"; count?: number }
  | { type: "fireflies"; count?: number }
  | { type: "sparkle"; x: number; y: number };

const FIRE = "255,150,40";
const LAMP = "255,210,110";

export const imageFx: Record<string, { aspect: number; fx: Fx[] }> = {
  "ch1-night.png": {
    aspect: 956 / 624,
    fx: [
      { type: "glow", x: 0.51, y: 0.9, size: 0.55, color: FIRE, speed: 0.9 },
      { type: "embers", x: 0.51, y: 0.86, count: 10 },
      { type: "steam", x: 0.46, y: 0.68 },
    ],
  },
  "ch1-gate.png": {
    aspect: 956 / 624,
    fx: [
      { type: "rays", x: 0.92, y: 0.05, angle: 215 },
      { type: "motes", x: 0.45, y: 0.1, w: 0.5, h: 0.5, count: 10 },
    ],
  },
  "ch1-posting.png": {
    aspect: 956 / 624,
    fx: [
      { type: "snow", count: 40 },
      { type: "glow", x: 0.21, y: 0.2, size: 0.3, color: LAMP, speed: 1.6 },
      { type: "glow", x: 0.95, y: 0.86, size: 0.35, color: FIRE, speed: 0.8 },
      { type: "embers", x: 0.95, y: 0.82, count: 8 },
    ],
  },
  "ch2-rail.png": {
    aspect: 956 / 624,
    fx: [
      { type: "glow", x: 0.35, y: 0.24, size: 0.22, color: LAMP, speed: 2.2 },
      { type: "glow", x: 0.51, y: 0.37, size: 0.18, color: LAMP, speed: 1.8 },
      { type: "smoke", x: 0.58, y: 0.42 },
      { type: "steam", x: 0.76, y: 0.82, size: 0.6 },
    ],
  },
  "ch3-bahu.png": {
    aspect: 1024 / 687,
    fx: [
      { type: "steam", x: 0.29, y: 0.52 },
      { type: "glow", x: 0.29, y: 0.7, size: 0.3, color: FIRE, speed: 0.9 },
      { type: "glow", x: 0.63, y: 0.15, size: 0.22, color: LAMP, speed: 1.7 },
      { type: "petals", count: 8 },
    ],
  },
  "ch4-bidaai.png": {
    aspect: 956 / 624,
    fx: [
      { type: "glow", x: 0.33, y: 0.26, size: 0.12, color: LAMP, speed: 1.1 },
      { type: "glow", x: 0.83, y: 0.56, size: 0.16, color: LAMP, speed: 2.4 },
      { type: "fireflies", count: 12 },
    ],
  },
  "ch4-teacher.png": {
    aspect: 956 / 624,
    fx: [
      { type: "rays", x: 0.02, y: 0.12, angle: 125 },
      { type: "motes", x: 0.05, y: 0.15, w: 0.6, h: 0.6, count: 14 },
    ],
  },
  "ch4-jamai.png": {
    aspect: 1024 / 687,
    fx: [
      { type: "sparkle", x: 0.18, y: 0.4 },
      { type: "motes", x: 0.2, y: 0.1, w: 0.6, h: 0.5, count: 8 },
    ],
  },
  "ch5-ladoo-gang.png": {
    aspect: 956 / 624,
    fx: [
      { type: "rays", x: 0.95, y: 0.3, angle: 240 },
      { type: "motes", x: 0.5, y: 0.2, w: 0.45, h: 0.5, count: 12 },
      { type: "glow", x: 0.93, y: 0.88, size: 0.2, color: FIRE, speed: 0.9 },
    ],
  },
  "ch6-hands.png": {
    aspect: 956 / 624,
    fx: [
      { type: "glow", x: 0.31, y: 0.93, size: 0.16, color: LAMP, speed: 1 },
      { type: "glow", x: 0.22, y: 0.84, size: 0.28, color: FIRE, speed: 0.85 },
      { type: "steam", x: 0.22, y: 0.62 },
      { type: "rays", x: 0.06, y: 0.12, angle: 130 },
      { type: "motes", x: 0.05, y: 0.15, w: 0.4, h: 0.5, count: 8 },
    ],
  },
  "ch7-family.png": {
    aspect: 1024 / 572,
    fx: [
      { type: "petals", count: 14 },
      { type: "glow", x: 0.91, y: 0.9, size: 0.2, color: FIRE, speed: 0.9 },
    ],
  },
};
