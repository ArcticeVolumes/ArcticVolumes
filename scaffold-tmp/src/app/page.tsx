import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";
import {
  aboutPageContent,
  businessInfo,
  heroSlides,
  homeGalleryColumns,
  homepageAboutBlurb,
} from "@/content/site-content";

export default function HomePage() {
  const aboutParagraphs = homepageAboutBlurb.split("\n\n");

  return (
    <main className="home">
      {/* The page's main heading, for search engines and screen readers.
          The visible headline text lives on the hero photos. */}
      <h1 className="sr-only">
        {businessInfo.name}: handcrafted, Canadian made climbing volumes
      </h1>

      {/* 1. Hero carousel (slides under the translucent header) */}
      <HeroCarousel slides={heroSlides} />

      {/* 2. Feature products */}
      <section className="home-products">
        <div className="section-heading">
          <h2>Feature Products</h2>
          <p>Newest Additions</p>
        </div>
        <ProductGrid products={getAllProducts()} />
      </section>

      {/* 3. About me */}
      <section className="home-about">
        <div className="home-about-inner">
          <div className="home-about-text">
            <h2>About Me</h2>
            <h3>{aboutPageContent.ownerSection.subheading}</h3>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href="/about" className="home-about-link">
              Read More
            </Link>
            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Arctic Volumes on Instagram"
              className="home-about-social"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>

          <div className="home-about-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/web/about-jonathan.jpg"
              alt="Jonathan Messier with one of his volumes"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 4. Call to action banner */}
      <section className="home-banner">
        <h4>Volume Details</h4>
        <h2>
          The <span>BEST</span> volumes you can get.
        </h2>
        <Link href="/store" className="btn-normal">
          Explore More
        </Link>
      </section>

      {/* 5. Photo gallery */}
      <section className="home-gallery">
        <div className="home-gallery-heading">
          <h3>
            Photos <span>Gallery</span>
          </h3>
        </div>
        <div className="home-gallery-box">
          {homeGalleryColumns.map((column, index) => (
            <div key={index} className="home-gallery-column">
              {column.map((photo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
