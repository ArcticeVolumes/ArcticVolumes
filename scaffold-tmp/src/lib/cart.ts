// Client-side cart persisted in localStorage.
// Stores references only, never prices. Prices are looked up from the
// product data at render time, and checkout must re-validate on the server.

export type Pack = "single" | "pair";

export interface CartLine {
  slug: string;
  size: string;
  pack: Pack;
  color: string;
  quantity: number;
}

const CART_KEY = "arctic_volumes_cart";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCart(): CartLine[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupted or blocked storage should not crash the page.
    return [];
  }
}

function saveCart(cart: CartLine[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Storage full or blocked (private mode). Cart just won't persist.
  }
  window.dispatchEvent(new Event("cart-updated"));
}

function sameLine(a: CartLine, b: Omit<CartLine, "quantity">) {
  return (
    a.slug === b.slug &&
    a.size === b.size &&
    a.pack === b.pack &&
    a.color === b.color
  );
}

export function addToCart(line: Omit<CartLine, "quantity">, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => sameLine(item, line));

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...line, quantity });
  }
  saveCart(cart);
}

export function updateQuantity(
  line: Omit<CartLine, "quantity">,
  quantity: number
) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((item) => !sameLine(item, line));
  } else {
    const existing = cart.find((item) => sameLine(item, line));
    if (existing) existing.quantity = quantity;
  }
  saveCart(cart);
}

export function removeFromCart(line: Omit<CartLine, "quantity">) {
  saveCart(getCart().filter((item) => !sameLine(item, line)));
}

export function clearCart() {
  saveCart([]);
}

// How many physical units one cart line consumes from inventory.
// A pair is 2 units of the same stock pool.
export function unitsPerLine(line: CartLine): number {
  return (line.pack === "pair" ? 2 : 1) * line.quantity;
}
