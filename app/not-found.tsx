import Link from "next/link";
import { rhyme } from "@/content/rhymes";
import { T } from "@/lib/lang";
import { Illustration } from "@/components/ui/Illustration";

export default function NotFound() {
  const r = rhyme("404");
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <div className="anim-bob h-56 w-56 overflow-hidden rounded-full border-4 border-haldi shadow-xl">
        <Illustration file="404.png" alt="Amma with a lantern in a village lane" mood="night" sizes="224px" />
      </div>
      <p className="mt-6 font-display text-6xl text-maroon">404</p>
      <p className="mt-3 font-hand text-3xl leading-snug text-maroon">
        {r.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
      <Link href="/" className="mt-8 rounded-full bg-maroon px-6 py-3 font-semibold text-cream">
        <T en="Rasoi mein wapas →" hi="रसोई में वापस →" />
      </Link>
    </div>
  );
}
