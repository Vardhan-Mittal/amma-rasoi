import type { Metadata } from "next";
import { T } from "@/lib/lang";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "Delivery & FAQ", description: "How Amma Rasoi ladoos are made, shipped and stored." };

// TODO: confirm delivery areas, timelines and policies with the family.
const faqs = [
  { q: { en: "Are the ladoos made fresh?", hi: "क्या लड्डू ताज़ा बनते हैं?" }, a: { en: "Yes. Amma starts roasting after your order comes in. We dispatch within 2 days.", hi: "हाँ। आपका ऑर्डर आने के बाद अम्मा भुनाई शुरू करती हैं। 2 दिन में डिस्पैच।" } },
  { q: { en: "Where do you deliver?", hi: "कहाँ-कहाँ डिलीवरी होती है?" }, a: { en: "Across India by courier. Delivery usually takes 3–6 days depending on your pincode.", hi: "पूरे भारत में कूरियर से। पिनकोड के हिसाब से 3–6 दिन।" } },
  { q: { en: "How long do they last?", hi: "कितने दिन चलते हैं?" }, a: { en: "Each ladoo lists its shelf life — from 7 days (motichoor) to 30 days (gond, methi, til, dry fruit). Keep them in an airtight dabba, away from sunlight.", hi: "हर लड्डू की शेल्फ़ लाइफ़ लिखी है — 7 दिन (मोतीचूर) से 30 दिन (गोंद, मेथी, तिल, ड्राई फ्रूट)। एयरटाइट डब्बे में, धूप से दूर रखें।" } },
  { q: { en: "Is it really pure desi ghee?", hi: "क्या सच में शुद्ध देसी घी है?" }, a: { en: "Always. No vanaspati, no preservatives, no shortcuts. Amma would never allow it.", hi: "हमेशा। कोई वनस्पति नहीं, कोई प्रिज़र्वेटिव नहीं। अम्मा कभी नहीं मानेंगी।" } },
  { q: { en: "How do I pay?", hi: "पेमेंट कैसे करें?" }, a: { en: "Right now orders are confirmed on WhatsApp and paid by UPI. Online checkout is coming soon.", hi: "अभी ऑर्डर WhatsApp पर कन्फ़र्म होते हैं और पेमेंट UPI से। ऑनलाइन चेकआउट जल्द।" } },
  { q: { en: "Can I send a gift with a personal note?", hi: "क्या पर्सनल नोट के साथ गिफ़्ट भेज सकते हैं?" }, a: { en: "Of course — tell us the message on WhatsApp and Ritu will write it by hand.", hi: "बिल्कुल — WhatsApp पर मैसेज बताइए, ऋतु हाथ से लिखेगी।" } },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-5xl text-maroon">
        <T en="Sawaal-Jawaab" hi="सवाल-जवाब" />
      </h1>
      <p className="mt-2 text-ink-soft">
        <T en="Delivery, freshness and everything else you might want to ask Amma." hi="डिलीवरी, ताज़गी और वो सब जो आप अम्मा से पूछना चाहें।" />
      </p>
      <div className="mt-8">
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
