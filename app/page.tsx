import Link from "next/link";
import { products } from "@/content/products";
import { promises } from "@/content/story";
import { T } from "@/lib/lang";
import { HomeHero } from "@/components/home/HomeHero";
import { SafarStrip } from "@/components/home/SafarStrip";
import { LadooGang } from "@/components/home/LadooGang";
import { KaiseBantaHai } from "@/components/home/KaiseBantaHai";
import { FestivalBoxes } from "@/components/home/FestivalBoxes";
import { Reviews } from "@/components/home/Reviews";
import { ProductCard } from "@/components/shop/ProductCard";
import { BandhaniDivider } from "@/components/motion/Dividers";

export default function Home() {
  const favourites = products.slice(0, 4);
  return (
    <div data-track="home">
      <HomeHero />
      <BandhaniDivider />

      <section className="mx-auto max-w-6xl px-4 py-20" aria-labelledby="fav-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-hand text-xl text-kesar">
              <T en="Taaza, haath se bane" hi="ताज़ा, हाथ से बने" />
            </p>
            <h2 id="fav-title" className="font-display text-4xl text-maroon sm:text-5xl">
              <T en="Amma ke Favourites" hi="अम्मा के फ़ेवरेट" />
            </h2>
          </div>
          <Link href="/shop" className="font-semibold text-maroon underline decoration-haldi decoration-2 underline-offset-4">
            <T en="Saare ladoo dekhiye →" hi="सारे लड्डू देखिए →" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favourites.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <SafarStrip />
      <LadooGang />
      <KaiseBantaHai />
      <FestivalBoxes />

      <section className="bg-maroon py-14 text-cream" aria-label="Our promise">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.icon} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream/10 text-2xl" aria-hidden>
                {p.icon}
              </span>
              <span className="font-semibold">
                <T {...p.text} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Reviews />
    </div>
  );
}
