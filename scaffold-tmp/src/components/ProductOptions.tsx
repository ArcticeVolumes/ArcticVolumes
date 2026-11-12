"use client";

import { useState } from "react";
import type { ProductSeed } from "@/content/site-content";
import { formatCad } from "@/lib/format";
import { addToCart } from "@/lib/cart";

// Swatch colors taken from the old site's color buttons.
const SWATCH_COLORS: Record<string, string> = {
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "rgb(28, 197, 28)",
  blue: "blue",
  turquoise: "aqua",
  purple: "blueviolet",
  white: "white",
  gray: "gray",
  black: "black",
};

type Pack = "single" | "pair";

export default function ProductOptions({
  product,
  stock,
}: {
  product: ProductSeed;
  // Units in stock per size. null means we could not load stock, in which
  // case nothing is blocked here and checkout does the real check.
  stock: Record<string, number> | null;
}) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [pack, setPack] = useState<Pack>("single");
  const [color, setColor] = useState("gray"); // gray is the universal default

  const selected = product.sizePricing[sizeIndex];

  // How many units are left for a size. Infinity when stock is unknown.
  function unitsLeft(size: string) {
    return stock ? stock[size] ?? 0 : Infinity;
  }
  const available = unitsLeft(selected.size);
  const outOfStock = available < 1;
  const pairUnavailable = available < 2; // a pair needs 2 units

  // If "pair" was chosen but this size cannot cover a pair, fall back to single.
  const activePack: Pack = pack === "pair" && pairUnavailable ? "single" : pack;

  const price =
    activePack === "pair" && selected.pairPriceCad !== undefined
      ? selected.pairPriceCad
      : selected.priceCad;

  function handleAddToCart() {
    addToCart({
      slug: product.slug,
      size: selected.size,
      pack: activePack,
      color,
    });
    // Temporary feedback until we build proper UI for this.
    console.log("Added to cart:", product.slug, selected.size, activePack, color);
  }

  return (
    <div>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-2xl">{formatCad(price)}</p>

      <h2 className="mt-6 mb-2 font-medium">Size</h2>
      <div className="flex flex-wrap gap-2">
        {product.sizePricing.map((option, index) => (
          <button
            key={option.size}
            onClick={() => setSizeIndex(index)}
            className={`rounded border px-4 py-2 ${
              index === sizeIndex ? "border-black bg-black text-white" : ""
            }`}
          >
            {option.size}
            {unitsLeft(option.size) < 1 && " (out of stock)"}
          </button>
        ))}
      </div>

      {product.sellsAsPair && (
        <>
          <h2 className="mt-6 mb-2 font-medium">Quantity</h2>
          <div className="flex gap-2">
            {(["single", "pair"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setPack(option)}
                disabled={option === "pair" && pairUnavailable}
                className={`rounded border px-4 py-2 capitalize disabled:opacity-40 ${
                  option === activePack ? "border-black bg-black text-white" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      <h2 className="mt-6 mb-2 font-medium">
        Color: <span className="font-normal capitalize">{color}</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {product.colorOptions.map((option) => (
          <button
            key={option}
            onClick={() => setColor(option)}
            aria-label={option}
            title={option}
            style={{ backgroundColor: SWATCH_COLORS[option] }}
            className={`h-9 w-9 rounded-full border-2 ${
              option === color
                ? "border-black ring-2 ring-offset-2"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {!outOfStock && pairUnavailable && product.sellsAsPair && (
        <p className="mt-4 text-sm text-gray-500">Only 1 left in this size.</p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={outOfStock}
        className="mt-8 w-full rounded bg-black py-3 text-white hover:bg-gray-800 disabled:opacity-40"
      >
        {outOfStock ? "Out of stock" : "Add to cart"}
      </button>
    </div>
  );
}