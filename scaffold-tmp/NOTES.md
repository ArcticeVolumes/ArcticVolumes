# Arctic Volumes rebuild: running notes

## Fix before launch
- [x] Compressed product images into `public/images/web/` (200-400 KB each). Originals kept in `public/images/`.
- [ ] Optional: serve images via Next `Image` during the UI pass.
- [x] Real site title and description set in `src/app/layout.tsx`.
- [x] Homepage built (static hero, featured products, about blurb). Carousel left for the UI pass.
- [x] Font is now Cuprum (old site's font), self-hosted at build by next/font. Geist removed.
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
- [ ] Create Gradient Buttons to fit the image instead of arrows for the homepage.

## Verified (automated: tsc, eslint, build, route responses)
- [x] /store, /products/bowtie, /products/split-rombus-trombus return 200; unknown slug returns 404

## Needs manual click-through
- [x] Gallery thumbnails switch the main image
- [x] Size buttons update price
- [x] Single/Pair toggle on Split Rombus Trombus updates price
- [x] Bowtie shows no pair toggle
- [ ] Add to cart creates a line on /cart
- [ ] Same options added twice bumps quantity; Single vs Pair are separate lines
- [x] Quantity change, Remove, and page refresh all behave
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
## UI pass (goal: match the old site one-to-one)
- [x] Foundation: brand color tokens, Cuprum font, base text sizes, dark mode removed (`globals.css`).
- [x] Header: translucent slate bar, white logo that shrinks on scroll, underline on current page, Cart link added.
- [x] Footer: light grey, Contact and About columns, inline Instagram icon.
- [x] Button styles `.btn-normal` and `.btn-white` defined (not used yet).
- [ ] Store page: "Arctic Volumes" title with blue rule, rounded cards with pale green border, teal price, cart icon.
- [x] Homepage: hero carousel (6 photos, 12s auto-fade, arrows), feature products, About Me band, Volume Details banner, photo gallery.
- [x] Product cards restyled (pale green border, teal price, cart badge), using the 3D drawings. Shared by homepage and store.
- [x] Homepage images compressed into `public/images/web/` (33 MB down to 4.6 MB).
- [x] About page: two pale blue bands (company, owner) and the workshop photo collage.
- [x] Contact page: navy-to-pale-blue gradient, pill fields, Submit button with the arrow volume as a send icon (large, white background removed).
- [ ] Store page title banner (waiting on the stars decision), Product page, Cart, Checkout success.
- [x] Responsive check: every page tested at 320, 390, 768, 1280 and 1920px wide. No sideways scrolling.
- RULE for the UI pass: every page we style gets checked at phone, tablet and desktop widths before it is called done.
