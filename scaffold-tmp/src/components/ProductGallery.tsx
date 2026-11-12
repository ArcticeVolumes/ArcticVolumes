"use client";

import { useState } from "react";
import { imageSrc } from "@/lib/format";

interface Props {
  images: { src: string; alt: string }[];
}

export default function ProductGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc(active.src)}
        alt={active.alt}
        className="aspect-square w-full rounded object-cover"
      />

      <div className="mt-3 flex gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setActiveIndex(index)}
            className={`h-20 w-20 overflow-hidden rounded border-2 ${
              index === activeIndex ? "border-black" : "border-transparent"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc(image.src)}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}