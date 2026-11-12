import { products, type ProductSeed } from "@/content/site-content";

// The one place that decides where products come from. When products move
// to Supabase, only the bodies of these functions change.

export function getAllProducts(): ProductSeed[] {
  return products;
}

export function getProductBySlug(slug: string): ProductSeed | undefined {
  return products.find((product) => product.slug === slug);
}