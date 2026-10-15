// Scans public/ for illustrations, product photos, music and voice files and
// writes content/generated/assets.json. Components read this manifest to decide
// whether to show the real file or the built-in placeholder, so the family can
// swap art and audio in just by dropping a file with the right name.
import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return [relative(pub, full).split("\\").join("/")];
  });
}

const all = walk(pub);
const pick = (prefix, exts) =>
  all.filter((p) => p.startsWith(prefix) && exts.some((e) => p.toLowerCase().endsWith(e)));

const images = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
const audio = [".mp3", ".m4a", ".ogg", ".wav"];

const manifest = {
  illustrations: pick("illustrations/", images),
  products: pick("products/", images),
  music: pick("audio/music/", audio),
  voice: pick("audio/voice/", audio),
};

mkdirSync(join(root, "content/generated"), { recursive: true });
writeFileSync(join(root, "content/generated/assets.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `assets manifest: ${manifest.illustrations.length} illustrations, ${manifest.products.length} product photos, ${manifest.music.length} music, ${manifest.voice.length} voice`
);
