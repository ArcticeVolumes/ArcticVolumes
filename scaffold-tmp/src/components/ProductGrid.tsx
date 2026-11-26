import Link from "next/link";
import type { ProductSeed } from "@/content/site-content";
import { formatCad, imageSrc } from "@/lib/format";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M2 3h2.6l.5 2H21l-2 8.5H7.6L5.2 4.9 4.9 4H2V3zm6 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );
}

// Product cards, styled like the old site's ".pro" cards. Used by the store
// page and the homepage. The whole card links to the product page.
export default function ProductGrid({ products }: { products: ProductSeed[] }) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        // "From" price is the cheapest single, never a pair price.
        const startingPrice = Math.min(
          ...product.sizePricing.map((size) => size.priceCad)
        );
        const image = product.cardImage ?? product.images[0];

        return (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="product-card"
          >
            <div className="product-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc(image.src)} alt={image.alt} />
            </div>
            <div className="product-card-text">
              <span className="product-card-brand">{product.brand}</span>
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-price">From {formatCad(startingPrice)}</p>
            </div>
            <span className="product-card-cart">
              <CartIcon />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
