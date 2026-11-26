import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Volumes | Arctic Volumes",
  description: "Handcrafted, Canadian made climbing volumes.",
};

export default function StorePage() {
  return (
    <main className="w-full py-12">
      <h1 className="mb-2 px-4 text-center">Volumes</h1>
      <ProductGrid products={getAllProducts()} />
    </main>
  );
}
