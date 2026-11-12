"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";

// Shows how many items are in the cart. The cart lives in localStorage,
// which the server cannot see, so this reads it in the browser and updates
// whenever the cart changes (our own "cart-updated" event, or another tab).
export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function sync() {
      setCount(getCart().reduce((sum, line) => sum + line.quantity, 0));
    }
    sync();
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return <span>Cart ({count})</span>;
}
