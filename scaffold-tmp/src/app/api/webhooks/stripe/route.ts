import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

// POST /api/webhooks/stripe
// Stripe calls this directly (not the customer's browser) when a payment
// finishes. That makes it the reliable place to record orders: it still
// runs if the customer closes the tab before the success page loads.

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  // The signature check needs the exact raw body, so read it as text.
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Proves the request really came from Stripe and was not forged.
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("Webhook signature check failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status !== "paid") break; // e.g. delayed bank payment, wait for the async event

      const orderId = session.metadata?.order_id;
      if (!orderId) {
        console.error("Paid session has no order_id:", session.id);
        break;
      }

      const shipping = session.collected_information?.shipping_details;
      const paymentIntent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null;

      const { data, error } = await supabaseAdmin.rpc("finalize_paid_order", {
        p_order_id: orderId,
        p_payment_intent: paymentIntent,
        p_email: session.customer_details?.email ?? null,
        p_name: shipping?.name ?? session.customer_details?.name ?? null,
        p_address: shipping?.address ?? null,
      });

      if (error) {
        console.error("finalize_paid_order failed:", error);
        // A 500 makes Stripe retry later, which is what we want here.
        return NextResponse.json({ error: "Could not record order." }, { status: 500 });
      }
      console.log(`Order ${orderId}: ${data}`);
      break;
    }

    case "checkout.session.expired": {
      // Customer abandoned the Stripe page. Close the pending order.
      const orderId = event.data.object.metadata?.order_id;
      if (orderId) {
        await supabaseAdmin
          .from("orders")
          .update({ status: "cancelled" })
          .eq("id", orderId)
          .eq("status", "pending");
      }
      break;
    }

    default:
      // Ignore event types we don't use.
      break;
  }

  // Tell Stripe we received it.
  return NextResponse.json({ received: true });
}
