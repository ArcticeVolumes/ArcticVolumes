import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";
import { heroContent, homepageAboutBlurb } from "@/content/site-content";

export default function HomePage() {
  return (
    <main>
      {/* Hero. Static for now; the old site's carousel can come back in the UI pass. */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-4xl font-semibold">{heroContent.heading}</h1>
          <p className="mt-2 text-2xl">{heroContent.subheading}</p>
          <ul className="mt-6 space-y-1 text-gray-500">
            {heroContent.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link
            href="/store"
            className="mt-8 inline-block rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Shop Volumes
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Feature Products</h2>
        <p className="mb-8 text-gray-500">Newest Additions</p>
        <ProductGrid products={getAllProducts()} />
        <Link href="/store" className="mt-8 inline-block underline">
          More
        </Link>
      </section>

      {/* About blurb */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
          {homepageAboutBlurb.split("\n\n").map((paragraph) => (
            <p key={paragraph} className="mb-4">
              {paragraph}
            </p>
          ))}
          <Link href="/about" className="underline">
            Read More
          </Link>
        </div>
      </section>
    </main>
  );
}
