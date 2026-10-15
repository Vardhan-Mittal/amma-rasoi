import manifest from "@/content/generated/assets.json";

const ill = new Set<string>(manifest.illustrations);
const prod = new Set<string>(manifest.products);
const music = new Set<string>(manifest.music);
const voice = new Set<string>(manifest.voice);

/** Returns the public URL of an illustration if the file exists, else null. */
export function illustrationSrc(name: string): string | null {
  const key = `illustrations/${name}`;
  return ill.has(key) ? `/${key}` : null;
}

/** Real product photo: public/products/<slug>.(jpg|png|webp) */
export function productPhotoSrc(slug: string): string | null {
  for (const ext of [".webp", ".jpg", ".jpeg", ".png", ".avif"]) {
    const key = `products/${slug}${ext}`;
    if (prod.has(key)) return `/${key}`;
  }
  return null;
}

export function musicSrc(id: string): string | null {
  for (const ext of [".mp3", ".m4a", ".ogg"]) {
    const key = `audio/music/${id}${ext}`;
    if (music.has(key)) return `/${key}`;
  }
  return null;
}

export function voiceSrc(id: string): string | null {
  for (const ext of [".mp3", ".m4a", ".ogg"]) {
    const key = `audio/voice/${id}${ext}`;
    if (voice.has(key)) return `/${key}`;
  }
  return null;
}
