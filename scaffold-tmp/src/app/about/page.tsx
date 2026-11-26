import type { Metadata } from "next";
import {
  aboutGalleryColumns,
  aboutImages,
  aboutPageContent,
  businessInfo,
} from "@/content/site-content";

export const metadata: Metadata = {
  title: "About | Arctic Volumes",
  description: "The story behind Arctic Volumes and its handcrafted climbing volumes.",
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export default function AboutPage() {
  const { companySection, ownerSection } = aboutPageContent;

  return (
    <main>
      {/* 1. About the company: text left, photo right */}
      <section className="about-band">
        <div className="about-band-inner">
          <div className="about-band-text">
            <h1>{companySection.heading}</h1>
            <Paragraphs text={companySection.body} />
          </div>
          <div className="about-band-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={aboutImages.company.src} alt={aboutImages.company.alt} />
          </div>
        </div>
      </section>

      {/* 2. About the owner: photo left, text right */}
      <section className="about-band">
        <div className="about-band-inner reverse">
          <div className="about-band-text">
            <h2 className="about-band-title">{ownerSection.heading}</h2>
            <h3>{ownerSection.subheading}</h3>
            <Paragraphs text={ownerSection.body} />
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
          <div className="about-band-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aboutImages.owner.src}
              alt={aboutImages.owner.alt}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 3. Workshop photo collage */}
      <section className="about-gallery">
        <div className="home-gallery-box">
          {aboutGalleryColumns.map((column, index) => (
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
