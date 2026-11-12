import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductOptions from "@/components/ProductOptions";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getStockForProduct } from "@/lib/inventory";

type Props = { params: Promise<{ slug: string }> };

// Re-read stock from the database at most once a minute, so pages stay fast
// but stock numbers stay reasonably fresh.
export const revalidate = 60;

// Tells Next.js which product pages to pre-build at build time.
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

// Gives each product page its own title/description for search engines.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Arctic Volumes`,
    description: `Handcrafted ${product.name} climbing volume. Canadian made.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const stock = await getStockForProduct(product.slug);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <ProductGallery images={product.images} />
      <ProductOptions product={product} stock={stock} />
    </main>
  );
}