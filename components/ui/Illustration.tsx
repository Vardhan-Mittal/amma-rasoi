import Image from "next/image";
import { illustrationSrc } from "@/lib/assets";
import type { Mood } from "@/content/story";
import { PlaceholderArt } from "./PlaceholderArt";

type Props = {
  file: string;
  alt: string;
  mood?: Mood;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** object-fit for the real image */
  fit?: "cover" | "contain";
  /** CSS object-position, to keep the subject in frame when cropped */
  position?: string;
};

/** Real illustration if public/illustrations/<file> exists, otherwise drawn placeholder. */
export function Illustration({ file, alt, mood, sizes = "(max-width: 1024px) 100vw, 50vw", priority, className = "", fit = "cover", position }: Props) {
  const src = illustrationSrc(file);
  if (!src) return <PlaceholderArt mood={mood} file={file} className={className} />;
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={fit === "cover" ? "object-cover" : "object-contain"} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}
