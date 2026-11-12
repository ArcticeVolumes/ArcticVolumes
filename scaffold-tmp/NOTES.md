# Arctic Volumes rebuild: running notes

## Fix before launch
- [x] Compressed product images into `public/images/web/` (200-400 KB each). Originals kept in `public/images/`.
- [ ] Optional: serve images via Next `Image` during the UI pass.
- [x] Real site title and description set in `src/app/layout.tsx`.
- [x] Homepage built (static hero, featured products, about blurb). Carousel left for the UI pass.
- [ ] Remove or self-host Geist font if we want zero dependency on Google Fonts.
- [x] Header with nav and live cart count, footer on every page.
- [x] About and Contact pages (contact form uses Web3Forms, same key as the old site).
- [x] Stock shown on product pages (out of stock sizes, pair disabled under 2 units). Refreshes every 60s.
- [ ] PLACEHOLDERS: `/privacy` and `/terms` need real content before launch.
- [ ] Test the contact form once (sends a real message to the friend's inbox).
- [ ] If the first size is out of stock, the page still opens on it. Consider defaulting to the first in-stock size.
- [ ] Cart quantity input: add a max once stock exists.

## Housekeeping
- [ ] Move the Next.js project from `scaffold-tmp/` to the repo root on the `nextjs-rebuild` branch.
- [ ] Delete old HTML/CSS/JS files once the new site covers them.
- [ ] Check what `CNAME` is for before deleting it (domain/hosting).
- [ ] Add Pentagon and other products once the friend finalizes them.
- [ ] Git is currently on branch `new-main`, not `nextjs-rebuild`. Confirm which branch we want.

## Verified (automated: tsc, eslint, build, route responses)
- [x] /store, /products/bowtie, /products/split-rombus-trombus return 200; unknown slug returns 404

## Needs manual click-through
- [ ] Gallery thumbnails switch the main image
- [ ] Size buttons update price
- [ ] Single/Pair toggle on Split Rombus Trombus updates price
- [ ] Bowtie shows no pair toggle
- [ ] Add to cart creates a line on /cart
- [ ] Same options added twice bumps quantity; Single vs Pair are separate lines
- [ ] Quantity change, Remove, and page refresh all behave
- [ ] localStorage `arctic_volumes_cart` holds no prices

## Data and schema (later)
- [ ] Supabase schema: add `pair_price_cents` on variants and `pack_type` on order_items.
- [ ] Pair purchase uses 2 units of the same inventory pool (`unitsPerLine` in cart.ts).
- [ ] Swap `src/lib/products.ts` to read from Supabase (functions become async).

## Checkout
- [x] Stripe Checkout session in CAD, built in `src/app/api/checkout/route.ts`; prices re-read from `products.ts`, never from the browser.
- [x] Success page at `/checkout/success` verifies payment with Stripe, then clears the cart.
- [ ] Test the full flow with card 4242 4242 4242 4242 (needs manual run).
- [ ] Shipping cost (flat rate or per size) once the friend decides courier pricing.
- [ ] Tax (GST/HST/PST): ask the friend if registered, then decide Stripe Tax vs fixed rates.
- [ ] Shipping countries: currently Canada only. Confirm with the friend.
- [x] Stock check at checkout (pair = 2 units) and pending order saved before Stripe.
- [x] Webhook at `/api/webhooks/stripe` marks orders paid and decrements stock.
- [ ] Test webhook locally with the Stripe CLI.
- [ ] Create live webhook endpoint in friend's Stripe account at launch.
- [ ] Set `SITE_URL` env var on the production server so redirect URLs are correct.

## Ask the Johnny
- [ ] Email automation preference
- [ ] Weight and dimensions per size (for shipping)
- [ ] Domain and hosting ownership
- [ ] Should we allow for account creation?