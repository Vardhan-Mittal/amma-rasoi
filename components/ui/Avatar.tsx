import Image from "next/image";
import type { Member } from "@/content/family";
import { illustrationSrc } from "@/lib/assets";

const tints: Record<Member["generation"], string> = {
  amma: "from-haldi to-kesar",
  child: "from-kesar to-maroon",
  spouse: "from-mor to-[#2E8B74]",
  grandchild: "from-[#F6C453] to-haldi",
};

/** Family portrait if public/illustrations/family/<id>.png exists, else an emoji badge. */
export function Avatar({ m, size = 64, className = "" }: { m: Member; size?: number; className?: string }) {
  const src = illustrationSrc(`family/${m.id}.png`);
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-cream bg-gradient-to-br shadow-md ${tints[m.generation]} ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={m.name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span aria-hidden style={{ fontSize: size * 0.48 }}>
          {m.emoji}
        </span>
      )}
    </span>
  );
}
