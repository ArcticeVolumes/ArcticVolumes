import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getProductBySlug } from "@/lib/products";
import { unitsPerLine, type CartLine } from "@/lib/cart";

// POST /api/checkout
// 1. Validates the cart references and rebuilds every price from our own
//    product data (the browser never decides prices).
// 2. Checks stock (a pair uses 2 units).
// 3. Saves a pending order in Supabase.
// 4. Creates a Stripe Checkout session tagged with that order's id.
// The Stripe webhook later marks the order paid and decrements stock.

const MAX_QUANTITY_PER_LINE = 20;

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.slug === "string" &&
    typeof v.size === "string" &&
    (v.pack === "single" || v.pack === "pair") &&
    typeof v.color === "string" &&
    typeof v.quantity === "number" &&
    Number.isInteger(v.quantity) &&
    v.quantity >= 1 &&
    v.quantity <= MAX_QUANTITY_PER_LINE
  );
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request.");
  }

  const lines = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(lines) || lines.length === 0 || !lines.every(isCartLine)) {
    return badRequest("Your cart is invalid or empty.");
  }

  // ---- 1. Validate and price every line from our own data ----
  const priced: {
    line: CartLine;
    productName: string;
    unitPriceCents: number;
    units: number;
  }[] = [];

  for (const line of lines) {
    const product = getProductBySlug(line.slug);
    const sizeOption = product?.sizePricing.find((s) => s.size === line.size);

    if (!product || !sizeOption) {
      return badRequest("An item in your cart is no longer available.");
    }
    if (!product.colorOptions.includes(line.color)) {
      return badRequest(`Invalid color for ${product.name}.`);
    }

    let unitPriceCad: number;
    if (line.pack === "pair") {
      if (!product.sellsAsPair || sizeOption.pairPriceCad === undefined) {
        return badRequest(`${product.name} is not sold as a pair in that size.`);
      }
      unitPriceCad = sizeOption.pairPriceCad;
    } else {
      unitPriceCad = sizeOption.priceCad;
    }

    priced.push({
      line,
      productName: product.name,
      // Stripe and our database use whole cents. Round to avoid float issues.
      unitPriceCents: Math.round(unitPriceCad * 100),
      units: unitsPerLine(line),
    });
  }

  // ---- 2. Stock check ----
  // Add up the units needed per product + size, since a single and a pair of
  // the same size draw from the same stock pool.
  const needed = new Map<string, { slug: string; size: string; units: number; name: string }>();
  for (const p of priced) {
    const key = `${p.line.slug}|${p.line.size}`;
    const entry = needed.get(key) ?? { slug: p.line.slug, size: p.line.size, units: 0, name: p.productName };
    entry.units += p.units;
    needed.set(key, entry);
  }

  const slugs = [...new Set(priced.map((p) => p.line.slug))];
  const { data: stockRows, error: stockError } = await supabaseAdmin
    .from("inventory")
    .select("product_slug, size, stock_units")
    .in("product_slug", slugs);

  if (stockError) {
    console.error("Stock lookup failed:", stockError);
    return NextResponse.json({ error: "Could not check stock. Please try again." }, { status: 500 });
  }

  for (const need of needed.values()) {
    const row = stockRows?.find((r) => r.product_slug === need.slug && r.size === need.size);
    const available = row?.stock_units ?? 0; // no row means out of stock
    if (available < need.units) {
      return badRequest(
        available === 0
          ? `${need.name} (${need.size}) is out of stock.`
          : `Only ${available} of ${need.name} (${need.size}) left in stock. A pair counts as 2.`
      );
    }
  }
  // Note: this check does not reserve stock. If two people buy the last unit
  // at the same moment, the webhook flags the second order as needs_review.

  // ---- 3. Save a pending order ----
  const totalCents = priced.reduce((sum, p) => sum + p.unitPriceCents * p.line.quantity, 0);

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({ total_cents: totalCents, currency: "cad" })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Order insert failed:", orderError);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }

  const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
    priced.map((p) => ({
      order_id: order.id,
      product_slug: p.line.slug,
      size: p.line.size,
      pack: p.line.pack,
      color: p.line.color,
      quantity: p.line.quantity,
      units: p.units,
      unit_price_cents: p.unitPriceCents,
    }))
  );

  if (itemsError) {
    console.error("Order items insert failed:", itemsError);
    await supabaseAdmin.from("orders").delete().eq("id", order.id);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }

  // ---- 4. Create the Stripe Checkout session ----
  const origin = process.env.SITE_URL ?? new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: order.id,
      metadata: { order_id: order.id },
      line_items: priced.map((p) => ({
        quantity: p.line.quantity,
        price_data: {
          currency: "cad",
          unit_amount: p.unitPriceCents,
          product_data: {
            name: `${p.productName} (${p.line.size}, ${p.line.pack}, ${p.line.color})`,
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["CA"] },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    await supabaseAdmin.from("orders").update({ status: "cancelled" }).eq("id", order.id);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
