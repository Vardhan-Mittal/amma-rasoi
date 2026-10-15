"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { L } from "@/content/types";

export type Lang = "en" | "hi";

const KEY = "amma-lang";
const EVENT = "amma:lang";

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (s: L) => string }>({
  lang: "en",
  setLang: () => {},
  t: (s) => s.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, read, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const t = useCallback((s: L) => (lang === "hi" && s.hi ? s.hi : s.en), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Renders bilingual text; usable from server components. */
export function T({ en, hi }: L) {
  const { lang } = useLang();
  return <>{lang === "hi" && hi ? hi : en}</>;
}
