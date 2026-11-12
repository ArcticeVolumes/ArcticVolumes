"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

// Empties the browser cart once, after a confirmed payment.
export default function ClearCartOnMount() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
