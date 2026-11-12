import Link from "next/link";
import type { ProductSeed } from "@/content/site-content";
import { formatCad, imageSrc } from "@/lib/format";

// Grid of product cards. Used by the store page and the homepage.
export default function ProductGrid({ products }: { products: ProductSeed[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        // "From" price is the cheapest single, never a pair price.
        const startingPrice = Math.min(
          ...product.sizePricing.map((size) => size.priceCad)
        );
        const cover = product.images[0];

        return (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc(cover.src)}
              alt={cover.alt}
              className="aspect-square w-full rounded object-cover"
            />
            <h2 className="mt-3 font-medium group-hover:underline">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500">
              From {formatCad(startingPrice)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
