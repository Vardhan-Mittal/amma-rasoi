import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/content/products";
import { ProductDetail } from "@/components/shop/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name.en, description: p.description.en } : {};
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
