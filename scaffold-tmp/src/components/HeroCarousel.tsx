"use client";

import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/content/site-content";

const AUTO_ADVANCE_MS = 12000; // same timing as the old site

// Small red maple leaf drawn inline (the old site loaded an icon font for it).
function MapleLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <polygon points="12,1 14,6 17,4.5 16,10 20,8.5 19,11.5 23,13 18,16 19,19 13,18 13,23 11,23 11,18 5,19 6,16 1,13 5,11.5 4,8.5 8,10 7,4.5 10,6" />
    </svg>
  );
}

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (offset: number) => {
      // Wraps around at both ends.
      setActive((current) => (current + offset + slides.length) % slides.length);
    },
    [slides.length]
  );

  // Fade to the next photo on a timer. The timer restarts whenever the slide
  // changes, so clicking an arrow gives the new photo its full time. People
  // who ask their device for reduced motion get no auto-cycling.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, go]);

  return (
    <section className="hero" aria-label="Image carousel">
      <button
        className="hero-button prev"
        onClick={() => go(-1)}
        aria-label="Previous photo"
      >
        &#8656;
      </button>
      <button
        className="hero-button next"
        onClick={() => go(1)}
        aria-label="Next photo"
      >
        &#8658;
      </button>

      <ul>
        {slides.map((slide, index) => (
          <li
            key={slide.src}
            className={`hero-slide ${index === active ? "active" : ""}`}
            aria-hidden={index !== active}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              // Only the first photo loads immediately; the rest load quietly after.
              loading={index === 0 ? "eager" : "lazy"}
            />

            {slide.caption && (
              <div className={`hero-caption ${slide.caption.position}`}>
                {slide.caption.lines.map((line) => (
                  <p key={line.text} className={`hero-line ${line.style}`}>
                    {line.style === "canadian" && <MapleLeaf />}
                    {line.text}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
