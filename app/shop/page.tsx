import type { Metadata } from "next";
import { T } from "@/lib/lang";
import { site } from "@/content/site";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Ladoo",
  description: "Besan, motichoor, gond, methi, churma, dry fruit and til ladoos — hand-rolled in desi ghee and made fresh to order.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-hand text-xl text-kesar">
        <T en="Har ladoo, haath se" hi="हर लड्डू, हाथ से" />
      </p>
      <h1 className="font-display text-5xl text-maroon">
        <T en="Amma ke Ladoo" hi="अम्मा के लड्डू" />
      </h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{site.deliveryNote}</p>
      <div className="mt-8">
        <ShopGrid />
      </div>
    </div>
  );
}
