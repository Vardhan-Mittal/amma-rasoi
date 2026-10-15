import { reviews } from "@/content/reviews";
import { site, whatsappLink } from "@/content/site";
import { T } from "@/lib/lang";

/** Scrolling marquee of real reviews; until there are some, an invitation to write the first one. */
export function Reviews() {
  return (
    <section className="overflow-hidden bg-cream-deep py-16" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="reviews-title" className="font-display text-4xl text-maroon">
          <T en="Aapki Baatein" hi="आपकी बातें" />
        </h2>
      </div>
      {reviews.length > 0 ? (
        <div className="mt-8 flex w-max gap-5 px-4" style={{ animation: "marquee 40s linear infinite" }}>
          {[...reviews, ...reviews].map((r, i) => (
            <figure key={i} className="w-80 shrink-0 rounded-3xl bg-white/80 p-5 shadow" aria-hidden={i >= reviews.length}>
              <blockquote className="font-hand text-lg text-ink">“{r.text}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-maroon">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-6xl px-4">
          <div className="rounded-3xl border-2 border-dashed border-maroon/30 bg-white/60 p-8 text-center">
            <p className="font-hand text-2xl text-maroon">
              <T en="Amma is waiting to hear what you think." hi="अम्मा आपकी राय सुनने का इंतज़ार कर रही हैं।" />
            </p>
            <p className="mt-2 text-ink-soft">
              <T en="Tried our ladoos? Send us your review on WhatsApp and it'll appear right here." hi="लड्डू चखे? WhatsApp पर अपना रिव्यू भेजिए, वो यहीं दिखेगा।" />
            </p>
            <a href={whatsappLink(`Ram Ram ${site.name}! My review:`)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-mor px-5 py-2.5 font-semibold text-cream">
              💬 <T en="Send a review" hi="रिव्यू भेजें" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
