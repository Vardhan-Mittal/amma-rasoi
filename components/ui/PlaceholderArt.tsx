import type { Mood } from "@/content/story";

const palettes: Record<Mood, { sky: [string, string]; ground: string; window: string; glow: string }> = {
  night: { sky: ["#141B33", "#2E3A66"], ground: "#2B1B12", window: "#3C4A7A", glow: "#E07A1F" },
  dawn: { sky: ["#F4A9A0", "#F7D9A0"], ground: "#8E5A2C", window: "#FFE3B8", glow: "#F2B33D" },
  station: { sky: ["#101A33", "#22325C"], ground: "#3A2A20", window: "#2E3F6E", glow: "#F2B33D" },
  festive: { sky: ["#F7D27A", "#F2B33D"], ground: "#9A4A1E", window: "#FFE9B8", glow: "#E07A1F" },
  dusk: { sky: ["#4E2457", "#E07A1F"], ground: "#4A1F1A", window: "#F2B33D", glow: "#F2B33D" },
  day: { sky: ["#FFF1C9", "#F7E7C6"], ground: "#C9952F", window: "#FFFFFF", glow: "#F2B33D" },
  warm: { sky: ["#F7D9A0", "#E9A93A"], ground: "#7A4520", window: "#FFF1C9", glow: "#E07A1F" },
  courtyard: { sky: ["#FBE3B0", "#F2B33D"], ground: "#B5562A", window: "#FFF6E5", glow: "#E07A1F" },
};

/**
 * Stand-in art shown until the real illustration is dropped into
 * public/illustrations/<file>. Draws a little Amma in her kitchen.
 */
export function PlaceholderArt({ mood = "warm", file, className = "" }: { mood?: Mood; file?: string; className?: string }) {
  const p = palettes[mood];
  const gid = `sky-${mood}`;
  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Illustration coming soon">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="1" stopColor={p.sky[1]} />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={p.glow} stopOpacity="0.7" />
            <stop offset="1" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <pattern id={`${gid}-dots`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.6" fill="#FFF6E5" opacity="0.9" />
          </pattern>
        </defs>
        <rect width="300" height="300" fill={`url(#${gid})`} />
        {/* jharokha window */}
        <path d="M40 200 V110 a50 46 0 0 1 100 0 V200 Z" fill={p.window} opacity="0.55" />
        <path d="M40 200 V110 a50 46 0 0 1 100 0 V200" fill="none" stroke="#6B1A1A" strokeWidth="5" opacity="0.6" />
        <path d="M90 64 V200 M40 140 H140" stroke="#6B1A1A" strokeWidth="3" opacity="0.35" />
        {/* floor */}
        <rect y="210" width="300" height="90" fill={p.ground} />
        <path d="M0 210 H300" stroke="#F2B33D" strokeWidth="3" opacity="0.6" />
        {/* chulha glow + kadhai */}
        <circle cx="70" cy="232" r="40" fill={`url(#${gid}-glow)`} />
        <path d="M38 222 h64 c0 14 -14 22 -32 22 s-32 -8 -32 -22z" fill="#2B1B12" />
        <ellipse cx="70" cy="222" rx="32" ry="5" fill="#D9902A" />
        <g opacity="0.8">
          {[58, 70, 82].map((x, i) => (
            <path key={x} d={`M${x} 214 q-5 -9 0 -18 q5 -9 0 -18`} stroke="#FFF6E5" strokeWidth="3" fill="none" strokeLinecap="round" className="anim-steam" style={{ animationDelay: `${i * 0.8}s` }} />
          ))}
        </g>
        {/* Amma */}
        <g transform="translate(190 120)">
          <path d="M-46 125 C-44 70 -30 52 0 52 C30 52 44 70 46 125 Z" fill="#6B1A1A" />
          <path d="M-30 58 C-50 80 -40 120 -36 125 L-14 125 C-20 100 -14 76 4 58 Z" fill="#F2B33D" />
          <path d="M-30 58 C-50 80 -40 120 -36 125 L-14 125 C-20 100 -14 76 4 58 Z" fill={`url(#${gid}-dots)`} opacity="0.5" />
          <circle cx="0" cy="22" r="26" fill="#E8B48A" />
          <path d="M-27 16 C-25 -10 25 -10 27 16 C20 4 -20 4 -27 16 Z" fill="#E9E4DA" />
          <circle cx="22" cy="2" r="10" fill="#E9E4DA" />
          <path d="M-30 18 C-36 -18 30 -24 32 10 C20 -8 -16 -10 -30 18 Z" fill="#F2B33D" opacity="0.9" />
          <circle cx="-9" cy="24" r="7" fill="none" stroke="#B88A2E" strokeWidth="2" />
          <circle cx="9" cy="24" r="7" fill="none" stroke="#B88A2E" strokeWidth="2" />
          <path d="M-2 24 h4" stroke="#B88A2E" strokeWidth="2" />
          <path d="M-13 24 q4 -3 8 0 M5 24 q4 -3 8 0" stroke="#3A2414" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="11" r="2.4" fill="#C0262D" />
          <path d="M-8 36 q8 7 16 0" stroke="#8E3B2E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="-15" cy="33" r="4" fill="#F29C8A" opacity="0.5" />
          <circle cx="15" cy="33" r="4" fill="#F29C8A" opacity="0.5" />
          {/* thali of ladoos */}
          <ellipse cx="-4" cy="96" rx="34" ry="8" fill="#C9952F" />
          {[-22, -10, 2, 14, -16, -4, 8, -10, 2].map((x, i) => (
            <circle key={i} cx={x} cy={i < 4 ? 90 : i < 7 ? 82 : 74} r="7" fill="#E9A93A" stroke="#B9741C" strokeWidth="1" />
          ))}
        </g>
      </svg>
      {file && (
        <span className="absolute bottom-2 right-2 rounded-full bg-cream/85 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-maroon shadow">
          🎨 {file}
        </span>
      )}
    </div>
  );
}
