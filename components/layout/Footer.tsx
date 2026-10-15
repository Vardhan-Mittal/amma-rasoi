import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { T } from "@/lib/lang";
import { MandanaBorder } from "@/components/motion/Dividers";
import { RhymeWriter } from "@/components/motion/RhymeWriter";

export function Footer() {
  return (
    <footer className="mt-auto bg-maroon text-cream">
      <div className="bg-cream">
        <MandanaBorder />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Image src="/brand/logo.png" alt="Amma Rasoi logo" width={128} height={128} className="mb-4 h-32 w-32 rounded-full bg-cream" />
          <div className="font-display text-3xl">Amma Rasoi</div>
          <p className="mt-1 text-cream/70">
            <T en={`By the ${site.family} · Since 2006`} hi={`${site.family} की ओर से · 2006 से`} />
          </p>
          <RhymeWriter id="footer" tone="dark" size="md" showMeaning={false} className="mt-5" />
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-3 text-cream/85">
          <Link href="/amma-ki-kahani" className="hover:text-haldi"><T en="Amma ki Kahani" hi="अम्मा की कहानी" /></Link>
          <Link href="/shop" className="hover:text-haldi"><T en="All Ladoos" hi="सारे लड्डू" /></Link>
          <Link href="/gifting" className="hover:text-haldi"><T en="Gifting & Bulk" hi="उपहार और थोक" /></Link>
          <Link href="/faq" className="hover:text-haldi"><T en="Delivery & FAQ" hi="डिलीवरी और सवाल" /></Link>
          <Link href="/contact" className="hover:text-haldi"><T en="Contact" hi="संपर्क" /></Link>
        </nav>
        <div className="space-y-1 text-cream/85">
          <p>💬 WhatsApp: {site.phoneDisplay}</p>
          <p>✉️ {site.email}</p>
          <p>📍 {site.address}</p>
          <p className="pt-3 text-sm text-cream/60">{site.fssai}</p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-sm text-cream/60">
        © {2026} {site.name} · <T en="Made with desi ghee and a lot of pyaar" hi="देसी घी और ढेर सारे प्यार से बना" />
      </div>
    </footer>
  );
}
