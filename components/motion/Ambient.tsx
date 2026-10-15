// Small decorative loops (pure CSS, switched off under reduced motion).

export function SteamWisps({ className = "", count = 3 }: { className?: string; count?: number }) {
  return (
    <svg viewBox="0 0 60 70" className={`pointer-events-none ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={`M${15 + i * 15} 68 q-7 -12 0 -24 q7 -12 0 -24`}
          stroke="#FFF6E5"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className="anim-steam"
          style={{ animationDelay: `${i * 0.9}s`, opacity: 0 }}
        />
      ))}
    </svg>
  );
}

export function Diya({ className = "", lit = true }: { className?: string; lit?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {lit && <circle cx="20" cy="14" r="11" fill="#F2B33D" opacity="0.4" className="anim-glow" />}
      {lit && (
        <g className="anim-flicker">
          <path d="M20 3c3.5 5 5 8 5 11a5 5 0 0 1-10 0c0-3 1.5-6 5-11z" fill="#F2B33D" />
          <path d="M20 8c1.6 2.8 2.4 4.3 2.4 6a2.4 2.4 0 0 1-4.8 0c0-1.7.8-3.2 2.4-6z" fill="#FFF6E5" />
        </g>
      )}
      <path d="M4 22h32c0 7-7 11-16 11S4 29 4 22z" fill="#B5562A" />
      <path d="M4 22h32" stroke="#F2B33D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="27" r="1.3" fill="#F2B33D" />
      <circle cx="20" cy="29" r="1.3" fill="#F2B33D" />
      <circle cx="28" cy="27" r="1.3" fill="#F2B33D" />
    </svg>
  );
}

/** Drifting marigold petals. Deterministic layout so server and client match. */
export function PetalRain({ count = 14, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100;
        const delay = ((i * 1.7) % 9).toFixed(2);
        const dur = 7 + ((i * 13) % 6);
        const drift = ((i % 2 ? 1 : -1) * (20 + ((i * 11) % 50))).toString();
        const color = ["#F2B33D", "#E07A1F", "#F6C453", "#D9541E"][i % 4];
        return (
          <span
            key={i}
            className="petal absolute top-0 block h-3 w-2.5 rounded-[60%_40%_60%_40%]"
            style={{
              left: `${left}%`,
              background: color,
              animation: `petal-fall ${dur}s linear ${delay}s infinite`,
              ["--drift" as string]: `${drift}px`,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}

export function Kite({ className = "", color = "#E07A1F" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={`anim-kite ${className}`} aria-hidden>
      <path d="M20 2 L36 20 L20 38 L4 20 Z" fill={color} />
      <path d="M20 2 L20 38 M4 20 L36 20" stroke="#FFF6E5" strokeWidth="1.2" />
      <path d="M20 38 q-6 8 2 12 q8 4 0 9" stroke="#3A2414" strokeWidth="1" fill="none" />
    </svg>
  );
}
