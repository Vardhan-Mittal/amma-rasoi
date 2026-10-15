import type { Metadata, Viewport } from "next";
import { Kalam, Mukta, Yatra_One } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { CartProvider } from "@/lib/cart";
import { SoundscapeProvider } from "@/components/audio/SoundscapeProvider";
import { MuteDiya } from "@/components/audio/MuteDiya";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Toaster } from "@/components/shop/Toaster";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IntroLoader } from "@/components/motion/IntroLoader";
import { introScript } from "@/lib/intro-script";
import { LadooCursor } from "@/components/motion/LadooCursor";

const yatra = Yatra_One({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-yatra", display: "swap" });
const kalam = Kalam({ weight: ["400", "700"], subsets: ["latin", "devanagari"], variable: "--font-kalam", display: "swap" });
const mukta = Mukta({ weight: ["400", "500", "600", "700"], subsets: ["latin", "devanagari"], variable: "--font-mukta", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Amma Rasoi — Amma ke haath ke ladoo", template: "%s · Amma Rasoi" },
  description:
    "20 years of Amma's hand-rolled ladoos in pure desi ghee — made by the Mittal family for every child who misses home. Besan, motichoor, gond, churma and more, made fresh to order.",
  icons: { icon: "/brand/icon-256.png", apple: "/brand/icon-256.png" },
};

export const viewport: Viewport = {
  themeColor: "#6B1A1A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${yatra.variable} ${kalam.variable} ${mukta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="block-print flex min-h-screen flex-col">
        <LangProvider>
          <CartProvider>
            <SoundscapeProvider>
              <a href="#main" className="sr-only z-[200] rounded bg-maroon px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
                Skip to content
              </a>
              <IntroLoader />
              <SmoothScroll />
              <Header />
              <main id="main" className="flex-1 pt-16">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <Toaster />
              <MuteDiya />
              <LadooCursor />
            </SoundscapeProvider>
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
