"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  type CartLine,
} from "@/lib/cart";
import { getProductBySlug } from "@/lib/products";
import { formatCad } from "@/lib/format";

// Unit price for one cart line, looked up from product data (never from
// localStorage). Returns undefined if the product or size no longer exists.
function getLinePrice(line: CartLine): number | undefined {
  const product = getProductBySlug(line.slug);
  const sizeOption = product?.sizePricing.find((s) => s.size === line.size);
  if (!sizeOption) return undefined;
  if (line.pack === "pair") return sizeOption.pairPriceCad;
  return sizeOption.priceCad;
}

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  // The server has no localStorage, so we only render real cart contents
  // after mounting in the browser. This avoids a hydration mismatch.
  const [loaded, setLoaded] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function sync() {
      setLines(getCart());
      setLoaded(true);
    }
    sync();
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  async function handleCheckout() {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout.");
        setCheckingOut(false);
        return;
      }
      // Send the customer to Stripe's hosted payment page.
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setCheckingOut(false);
    }
  }

  if (!loaded) return <p className="p-8">Loading cart...</p>;

  if (lines.length === 0) {
    return (
      <div className="p-8">
        <p>Your cart is empty.</p>
        <Link href="/store" className="underline">
          Back to store
        </Link>
      </div>
    );
  }

  const total = lines.reduce((sum, line) => {
    const unitPrice = getLinePrice(line);
    return unitPrice === undefined ? sum : sum + unitPrice * line.quantity;
  }, 0);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8">
      <h1 className="mb-6 text-2xl font-semibold">Your cart</h1>

      <ul className="divide-y">
        {lines.map((line) => {
          const product = getProductBySlug(line.slug);
          const unitPrice = getLinePrice(line);
          const key = `${line.slug}-${line.size}-${line.pack}-${line.color}`;

          if (!product || unitPrice === undefined) {
            return (
              <li key={key} className="py-4 text-sm text-red-600">
                An item in your cart is no longer available.{" "}
                <button className="underline" onClick={() => removeFromCart(line)}>
                  Remove
                </button>
              </li>
            );
          }

          const lineTotal = unitPrice * line.quantity;

          return (
            <li key={key} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
              <div className="min-w-0 basis-full sm:flex-1 sm:basis-0">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  {line.size} / {line.pack} / {line.color}
                </p>
                <p className="text-sm text-gray-500">{formatCad(unitPrice)} each</p>
              </div>

              <input
                type="number"
                min={1}
                value={line.quantity}
                onChange={(e) =>
                  updateQuantity(line, parseInt(e.target.value, 10) || 0)
                }
                className="w-16 rounded border px-2 py-1 text-center"
              />

              <p className="m-0 flex-1 text-right text-base sm:w-32 sm:flex-none">{formatCad(lineTotal)}</p>

              <button
                className="py-2 text-sm text-gray-500 underline"
                onClick={() => removeFromCart(line)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
        <span>Total</span>
        <span>{formatCad(total)}</span>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        className="mt-6 w-full rounded bg-black py-3 text-white disabled:opacity-50"
        onClick={handleCheckout}
        disabled={checkingOut}
      >
        {checkingOut ? "Redirecting..." : "Proceed to checkout"}
      </button>
    </div>
  );
}
