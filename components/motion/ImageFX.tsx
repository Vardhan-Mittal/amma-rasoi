import type { CSSProperties } from "react";
import { imageFx, type Fx } from "@/content/imageFx";
import { illustrationSrc } from "@/lib/assets";
import { PetalRain } from "./Ambient";

const CONTAINER = 4 / 5; // story frames are 4:5

/** Map an image-space point to container-space percentages for object-fit: cover. */
function mapper(aspect: number, position?: string) {
  const [px, py] = (position ?? "50% 50%").split(" ").map((v) => parseFloat(v) / 100);
  if (aspect > CONTAINER) {
    const v = CONTAINER / aspect;
    const off = (1 - v) * (px ?? 0.5);
    return { x: (x: number) => (x - off) / v, y: (y: number) => y, sx: 1 / v, sy: 1 };
  }
  const v = aspect / CONTAINER;
  const off = (1 - v) * (py ?? 0.5);
  return { x: (x: number) => x, y: (y: number) => (y - off) / v, sx: 1, sy: 1 / v };
}

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
// deterministic pseudo-random so server and client render the same
const rnd = (i: number, salt: number) => ((Math.sin(i * 127.1 + salt * 311.7) * 43758.5453) % 1 + 1) % 1;

function Effect({ fx, m, i }: { fx: Fx; m: ReturnType<typeof mapper>; i: number }) {
  switch (fx.type) {
    case "glow": {
      const s = fx.size * m.sx * 100;
      return (
        <span
          className="fx-glow absolute rounded-full mix-blend-screen"
          style={{
            left: pct(m.x(fx.x)),
            top: pct(m.y(fx.y)),
            width: `${s}%`,
            aspectRatio: "1",
            translate: "-50% -50%",
            background: `radial-gradient(circle, rgba(${fx.color},0.55) 0%, rgba(${fx.color},0.18) 40%, rgba(${fx.color},0) 70%)`,
            animationDuration: `${fx.speed ?? 1.2}s`,
          }}
        />
      );
    }
    case "embers":
      return (
        <>
          {Array.from({ length: fx.count ?? 8 }, (_, k) => (
            <span
              key={k}
              className="fx-ember absolute h-1 w-1 rounded-full bg-[#FFB347]"
              style={{
                left: `calc(${pct(m.x(fx.x))} + ${(rnd(k, i) - 0.5) * 30}px)`,
                top: pct(m.y(fx.y)),
                animationDelay: `${(rnd(k, i + 3) * 2.5).toFixed(2)}s`,
                animationDuration: `${(1.8 + rnd(k, i + 7) * 1.6).toFixed(2)}s`,
                ["--dx" as string]: `${((rnd(k, i + 9) - 0.5) * 40).toFixed(0)}px`,
              } as CSSProperties}
            />
          ))}
        </>
      );
    case "steam":
    case "smoke":
      return (
        <span className="absolute" style={{ left: pct(m.x(fx.x)), top: pct(m.y(fx.y)), translate: "-50% -100%" }}>
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className={`${fx.type === "smoke" ? "fx-smoke" : "fx-steam"} absolute left-0 top-0 block rounded-full`}
              style={{
                width: fx.type === "smoke" ? 46 : 26 * (("size" in fx && fx.size) || 1),
                height: fx.type === "smoke" ? 46 : 26 * (("size" in fx && fx.size) || 1),
                marginLeft: (k - 1) * 12,
                animationDelay: `${k * 1.1}s`,
              }}
            />
          ))}
        </span>
      );
    case "snow":
      return (
        <>
          {Array.from({ length: fx.count ?? 30 }, (_, k) => (
            <span
              key={k}
              className="fx-snow absolute top-0 block rounded-full bg-white"
              style={{
                left: `${(rnd(k, 1) * 100).toFixed(1)}%`,
                width: 2 + rnd(k, 2) * 4,
                height: 2 + rnd(k, 2) * 4,
                opacity: 0.6 + rnd(k, 3) * 0.4,
                animationDelay: `${(rnd(k, 4) * 6).toFixed(2)}s`,
                animationDuration: `${(5 + rnd(k, 5) * 5).toFixed(2)}s`,
                ["--dx" as string]: `${((rnd(k, 6) - 0.5) * 60).toFixed(0)}px`,
              } as CSSProperties}
            />
          ))}
        </>
      );
    case "motes":
      return (
        <>
          {Array.from({ length: fx.count ?? 10 }, (_, k) => (
            <span
              key={k}
              className="fx-mote absolute block h-1.5 w-1.5 rounded-full bg-[#FFF3C4]"
              style={{
                left: pct(m.x(fx.x + rnd(k, i) * fx.w)),
                top: pct(m.y(fx.y + rnd(k, i + 1) * fx.h)),
                animationDelay: `${(rnd(k, i + 2) * 5).toFixed(2)}s`,
                animationDuration: `${(5 + rnd(k, i + 3) * 4).toFixed(2)}s`,
              }}
            />
          ))}
        </>
      );
    case "rays":
      return (
        <span
          className="fx-rays absolute block mix-blend-screen"
          style={{
            left: pct(m.x(fx.x)),
            top: pct(m.y(fx.y)),
            width: "140%",
            height: "34%",
            transformOrigin: "0% 50%",
            rotate: `${fx.angle}deg`,
            translate: "0 -50%",
            background:
              "repeating-linear-gradient(90deg, rgba(255,240,200,0) 0 6%, rgba(255,240,200,0.22) 9%, rgba(255,240,200,0) 14%), linear-gradient(90deg, rgba(255,236,190,0.35), rgba(255,236,190,0) 80%)",
            clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 55%)",
          }}
        />
      );
    case "petals":
      return <PetalRain count={fx.count ?? 10} />;
    case "fireflies":
      return (
        <>
          {Array.from({ length: fx.count ?? 10 }, (_, k) => (
            <span
              key={k}
              className="fx-firefly absolute block h-1.5 w-1.5 rounded-full bg-[#FFE27A] shadow-[0_0_8px_3px_rgba(255,214,90,0.7)]"
              style={{
                left: `${(5 + rnd(k, 11) * 90).toFixed(1)}%`,
                top: `${(10 + rnd(k, 12) * 70).toFixed(1)}%`,
                animationDelay: `${(rnd(k, 13) * 4).toFixed(2)}s`,
                animationDuration: `${(3 + rnd(k, 14) * 3).toFixed(2)}s`,
              }}
            />
          ))}
        </>
      );
    case "sparkle":
      return (
        <span className="absolute" style={{ left: pct(m.x(fx.x)), top: pct(m.y(fx.y)) }}>
          {["✦", "✧", "✦"].map((c, k) => (
            <span
              key={k}
              className="fx-sparkle absolute text-lg text-[#FFE27A]"
              style={{ left: (k - 1) * 22, top: -k * 10, animationDelay: `${k * 0.5}s` }}
            >
              {c}
            </span>
          ))}
        </span>
      );
  }
}

/** Ambient motion matched to a specific illustration (fire, steam, snow, light…). */
export function ImageFX({ file, position }: { file: string; position?: string }) {
  const cfg = imageFx[file];
  if (!cfg || !illustrationSrc(file)) return null;
  const m = mapper(cfg.aspect, position);
  return (
    <div className="fx-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {cfg.fx.map((fx, i) => (
        <Effect key={i} fx={fx} m={m} i={i} />
      ))}
    </div>
  );
}
