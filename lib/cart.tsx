"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, formatINR } from "@/content/products";
import { site } from "@/content/site";

export type CartItem = { slug: string; size: string; qty: number };

// ---- tiny external store persisted to localStorage ----
const KEY = "amma-cart";
const EMPTY: CartItem[] = [];
let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function load(): CartItem[] {
  if (items) return items;
  try {
    const raw = localStorage.getItem(KEY);
    items = raw ? (JSON.parse(raw) as CartItem[]).filter((i) => getProduct(i.slug) && i.qty > 0) : [];
  } catch {
    items = [];
  }
  return items;
}

function save(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function priceOf(item: CartItem) {
  const p = getProduct(item.slug);
  return p?.sizes.find((s) => s.label === item.size)?.price ?? 0;
}

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  whatsappMessage: () => string;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const list = useSyncExternalStore(subscribe, load, () => EMPTY);
  const [open, setOpen] = useState(false);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    const prev = load();
    const i = prev.findIndex((x) => x.slug === slug && x.size === size);
    if (i === -1) return save([...prev, { slug, size, qty }]);
    const next = [...prev];
    next[i] = { ...next[i], qty: next[i].qty + qty };
    save(next);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    const prev = load();
    save(qty <= 0 ? prev.filter((x) => !(x.slug === slug && x.size === size)) : prev.map((x) => (x.slug === slug && x.size === size ? { ...x, qty } : x)));
  }, []);

  const clear = useCallback(() => save([]), []);

  const count = list.reduce((n, i) => n + i.qty, 0);
  const total = list.reduce((n, i) => n + priceOf(i) * i.qty, 0);

  const whatsappMessage = useCallback(() => {
    const lines = list.map((i) => {
      const p = getProduct(i.slug)!;
      return `• ${p.name.en} — ${i.size} × ${i.qty} = ${formatINR(priceOf(i) * i.qty)}`;
    });
    return [`Ram Ram Amma! 🙏 I'd like to order from ${site.name}:`, "", ...lines, "", `Total: ${formatINR(total)} (+ delivery)`, "", "Name:", "Delivery address & pincode:"].join("\n");
  }, [list, total]);

  const value = useMemo(
    () => ({ items: list, count, total, open, setOpen, add, setQty, clear, whatsappMessage }),
    [list, count, total, open, add, setQty, clear, whatsappMessage]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
