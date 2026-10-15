import type { Metadata } from "next";
import { site, whatsappLink } from "@/content/site";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";
import { Jharokha } from "@/components/ui/Jharokha";

export const metadata: Metadata = { title: "Contact", description: "Talk to the Mittal family at Amma Rasoi." };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 py-14 md:grid-cols-2">
      <Jharokha className="mx-auto aspect-[4/5] w-full max-w-sm">
        <Illustration file="order-confirmed.png" alt="Amma lighting the chulha" mood="warm" sizes="(max-width:768px) 80vw, 40vw" />
      </Jharokha>
      <div>
        <h1 className="font-display text-5xl text-maroon">
          <T en="Ram Ram! 🙏" hi="राम राम! 🙏" />
        </h1>
        <p className="mt-3 text-lg text-ink">
          <T en="The quickest way to reach us is WhatsApp — someone from the family will reply, usually within a few hours." hi="हमसे बात करने का सबसे जल्दी तरीक़ा WhatsApp है — परिवार में से कोई कुछ घंटों में जवाब देगा।" />
        </p>
        <a href={whatsappLink("Ram Ram Amma Rasoi! 🙏")} target="_blank" rel="noopener noreferrer" className="btn-wobble mt-6 inline-block rounded-full bg-mor px-6 py-3 text-lg font-semibold text-cream">
          💬 WhatsApp {site.phoneDisplay}
        </a>
        <dl className="mt-8 space-y-3 text-ink">
          <div>
            <dt className="font-semibold text-maroon">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="underline decoration-haldi underline-offset-4">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-maroon">
              <T en="Rasoi" hi="रसोई" />
            </dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt className="font-semibold text-maroon">FSSAI</dt>
            <dd>{site.fssai}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
