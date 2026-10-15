"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLang } from "@/lib/lang";
import { CartButton } from "@/components/shop/CartButton";

const nav = [
  { href: "/", label: { en: "Ghar", hi: "घर" } },
  { href: "/amma-ki-kahani", label: { en: "Amma ki Kahani", hi: "अम्मा की कहानी" } },
  { href: "/shop", label: { en: "Ladoo", hi: "लड्डू" } },
  { href: "/gifting", label: { en: "Gifting", hi: "उपहार" } },
  { href: "/faq", label: { en: "FAQ", hi: "सवाल" } },
  { href: "/contact", label: { en: "Contact", hi: "संपर्क" } },
];

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const [hidden, setHidden] = useState(false);
  // remembers the page the menu was opened on, so navigating closes it
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menu = menuPath === pathname;
  const { scrollY } = useScroll();

  useEffect(() => {
    const show = () => setHidden(false);
    window.addEventListener("amma:show-header", show);
    return () => window.removeEventListener("amma:show-header", show);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !menu);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-haldi bg-maroon/95 text-cream backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Amma Rasoi — home">
          <Image src="/brand/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full bg-cream object-cover" priority />
          <span className="font-display text-xl leading-none sm:text-2xl">Amma Rasoi</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="relative rounded-full px-3 py-2 text-[15px] font-medium hover:text-haldi" aria-current={isActive(n.href) ? "page" : undefined}>
              {isActive(n.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-0 rounded-full bg-cream/12 ring-1 ring-haldi/60" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative">{t(n.label)}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="rounded-full border border-cream/40 px-3 py-1.5 text-sm font-semibold hover:bg-cream/10"
            aria-label={lang === "en" ? "हिंदी में देखें" : "View in English"}
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <CartButton />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream/10 lg:hidden"
            onClick={() => setMenuPath(menu ? null : pathname)}
            aria-expanded={menu}
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <motion.path animate={{ d: menu ? "M5 5L19 19" : "M4 7H20" }} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <motion.path animate={{ opacity: menu ? 0 : 1 }} d="M4 12H20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <motion.path animate={{ d: menu ? "M5 19L19 5" : "M4 17H20" }} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-cream/15 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="space-y-1 px-4 py-3">
              {nav.map((n, i) => (
                <motion.li key={n.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <Link href={n.href} className={`block rounded-xl px-3 py-3 text-lg ${isActive(n.href) ? "bg-cream/10 text-haldi" : ""}`}>
                    {t(n.label)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
