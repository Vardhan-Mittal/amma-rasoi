import type { Metadata } from "next";
import { festivals } from "@/content/festivals";
import { getProduct } from "@/content/products";
import { whatsappLink } from "@/content/site";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { RhymeWriter } from "@/components/motion/RhymeWriter";
import { FestivalOverlay } from "@/components/home/FestivalBoxes";
import { GiftingBanner } from "@/components/ui/GiftingBanner";

export const metadata: Metadata = {
  title: "Gifting & Bulk Orders",
  description: "Festival dabbas for Diwali, Rakhi and Sankranti, plus wedding and corporate ladoo orders from Amma Rasoi.",
};

const bulk = [
  { icon: "💍", title: { en: "Shaadi ke ladoo", hi: "शादी के लड्डू" }, text: { en: "Motichoor and besan by the hundred for weddings, sagai and bidaai.", hi: "शादी, सगाई और बिदाई के लिए सैकड़ों मोतीचूर और बेसन लड्डू।" } },
  { icon: "🏢", title: { en: "Corporate Diwali", hi: "कॉर्पोरेट दिवाली" }, text: { en: "Branded boxes with Amma's note for your team or clients.", hi: "आपकी टीम या क्लाइंट्स के लिए अम्मा के नोट वाले डब्बे।" } },
  { icon: "🎂", title: { en: "Birthdays & pooja", hi: "जन्मदिन और पूजा" }, text: { en: "Prasad-size ladoos for satyanarayan katha, griha pravesh and more.", hi: "सत्यनारायण कथा, गृह प्रवेश और पूजा के लिए प्रसाद वाले लड्डू।" } },
];

export default function GiftingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <GiftingBanner />

      <div className="mt-12 space-y-16">
        {festivals.map((f, i) => (
          <section key={f.id} id={f.id} className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
              <Illustration file={f.file} alt={f.title.en} mood={f.mood} sizes="(max-width:768px) 90vw, 45vw" />
              <FestivalOverlay id={f.id} />
            </div>
            <div>
              <h2 className="font-display text-4xl text-maroon">
                <T {...f.title} />
              </h2>
              <p className="mt-3 text-lg text-ink">
                <T {...f.blurb} />
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                <T en="Inside: " hi="अंदर: " />
                {f.contents.map((s) => getProduct(s)?.name.en).join(" · ")}
              </p>
              <RhymeWriter id={f.rhymeId} size="md" className="mt-5" />
              <a
                href={whatsappLink(`Ram Ram Amma! 🙏 I'd like to order the ${f.title.en}. How many boxes are available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wobble mt-5 inline-block rounded-full bg-maroon px-6 py-3 font-semibold text-cream"
              >
                💬 <T en="Box book karein" hi="बॉक्स बुक करें" />
              </a>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 rounded-[32px] bg-maroon p-8 text-cream sm:p-12" aria-labelledby="bulk-title">
        <h2 id="bulk-title" className="font-display text-4xl">
          <T en="Bada order? Amma taiyaar hai." hi="बड़े ऑर्डर? अम्मा तैयार हैं।" />
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {bulk.map((b) => (
            <li key={b.icon} className="rounded-2xl bg-cream/10 p-5">
              <div className="text-3xl" aria-hidden>
                {b.icon}
              </div>
              <h3 className="mt-2 font-display text-2xl text-haldi">
                <T {...b.title} />
              </h3>
              <p className="mt-1 text-cream/85">
                <T {...b.text} />
              </p>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink("Ram Ram Amma! 🙏 I'd like to discuss a bulk order.\n\nOccasion:\nDate:\nQuantity:\nCity:")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-haldi px-6 py-3 font-bold text-maroon-deep"
        >
          💬 <T en="Bulk order ki baat karein" hi="थोक ऑर्डर की बात करें" />
        </a>
      </section>
    </div>
  );
}
