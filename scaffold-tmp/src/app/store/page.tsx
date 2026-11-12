import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Volumes | Arctic Volumes",
  description: "Handcrafted, Canadian made climbing volumes.",
};

export default function StorePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold">Volumes</h1>
      <ProductGrid products={getAllProducts()} />
    </main>
  );
}
