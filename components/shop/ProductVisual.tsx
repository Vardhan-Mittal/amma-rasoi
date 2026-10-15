import Image from "next/image";
import type { Product } from "@/content/products";
import { productPhotoSrc } from "@/lib/assets";
import { LadooArt } from "./LadooArt";

/** Real product photo when available (public/products/<slug>.jpg), else drawn ladoos. */
export function ProductVisual({ product, count = 6, className = "", sizes = "(max-width: 768px) 90vw, 30vw", priority }: { product: Product; count?: number; className?: string; sizes?: string; priority?: boolean }) {
  const src = productPhotoSrc(product.slug);
  if (src) {
    return (
      <div className={`relative aspect-[5/4] ${className}`}>
        <Image src={src} alt={product.name.en} fill sizes={sizes} priority={priority} className="rounded-2xl object-cover" />
      </div>
    );
  }
  return <LadooArt product={product} count={count} className={className} />;
}
