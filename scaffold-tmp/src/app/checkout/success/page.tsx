import Link from "next/link";
import { stripe } from "@/lib/stripe";
import ClearCartOnMount from "@/components/ClearCartOnMount";

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="p-8">
        <p>No order found.</p>
        <Link href="/store" className="underline">Back to store</Link>
      </div>
    );
  }

  let session;
  try {
    // Ask Stripe directly. Never trust the URL alone to prove payment.
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return (
      <div className="p-8">
        <p>We could not find that order.</p>
        <Link href="/store" className="underline">Back to store</Link>
      </div>
    );
  }

  const paid = session.payment_status === "paid";

  return (
    <div className="mx-auto max-w-2xl p-8">
      {paid ? (
        <>
          <ClearCartOnMount />
          <h1 className="mb-4 text-2xl font-semibold">Thank you for your order</h1>
          <p>
            A confirmation will be sent to {session.customer_details?.email ?? "your email"}.
          </p>
          <p className="mt-2 text-sm text-gray-500">Order reference: {session.id}</p>
        </>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-semibold">Payment not completed</h1>
          <p>Your payment has not gone through. Your cart is still saved.</p>
          <Link href="/cart" className="underline">Back to cart</Link>
        </>
      )}
    </div>
  );
}
