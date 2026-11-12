import "server-only";
import Stripe from "stripe";

// Server-side Stripe client. The secret key must never reach the browser,
// so this file is only importable from server code (route handlers, server
// components). The "server-only" import makes the build fail if a client
// component ever imports it by mistake.

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing. Add it to .env.local.");
}

export const stripe = new Stripe(secretKey);
