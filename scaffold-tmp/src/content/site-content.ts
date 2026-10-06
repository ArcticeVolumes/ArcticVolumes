// Content pulled from the old static site. Trimmed to only the two
// products with confirmed, finalized data (Bowtie, Split Rombus Trombus).
// Pentagon and the seven listing-only products (Wedge Slice Volume,
// Stackable Triangle, Triangle Pyramid, Asymmetric Triangle, Arrow,
// Keystone Triangle, Macro Triangle) are intentionally left out -- add
// them in once johnny finalizes those.

export const businessInfo = {
  name: "Arctic Volumes",
  ownerName: "Jonathan Messier",
  phone: "(519)-788-3156",
  instagram: "https://www.instagram.com/arctic_volumes/",
  hours: "Anytime",
  tagline: "Climb Beyond Ordinary",
  copyrightYear: 2025,
};

export const aboutPageContent = {
  companySection: {
    heading: "About Arctic Volumes",
    body: `Watching climbers move across the wall with an infinite amount of creativity makes us fascinated by the idea of how: the right shapes can completely transform the movement. How a subtle angle, a carefully placed edge, or an unexpected surface can change not just a route — but the entire experience of climbing it.

Arctic Volumes was built from that fascination.

At Arctic Volumes, we design and handcraft innovative climbing volumes that spark creativity, elevate route setting, and redefine how climbers interact with the wall. Our shapes don't just fill space — they create movement, inspire creativity, and turn walls into dynamic landscapes. We envision a future where climbing walls are not static surfaces, but evolving areas of creativity and challenges. Arctic Volumes strives to push the boundaries of modern route setting — shaping environments where athletes challenge limits, setters explore bold ideas, and every climb tells a story to climb beyond ordinary.`,
  },
  ownerSection: {
    heading: "About The Owner",
    subheading:
      "Nice to meet you! I'm Jonathan Messier — climber, routesetter, and the mind behind Arctic Volumes.",
    body: `Climbing has been a part of my life since high school. From my first sketchy outdoor send to the many friends I made along the way, I've always been fascinated by how the right shapes can inspire completely different styles of movement.

That fascination turned into a mission: to create rock climbing volumes that don't just fill space on a wall, but spark creativity in routesetters and ignite curiosity in climbers. As all projects go, many failures and flaws needed to be worked out. The friends I made along the way allowed me to push the boundaries of what I thought was possible. I design each piece with a balance of function, aesthetics, and durability. So they can withstand hard falls, heavy traffic, and still keep climbers guessing.

I believe climbing is more than a sport; it's a conversation between the wall and the climber. My volumes are built to make that conversation more interesting, whether you're chasing your first send, battling a comp crux, or simply enjoying a playful session with friends.

Every volume is handcrafted with attention to detail, tested to meet real-world demands, and designed to work across a variety of wall angles. If you're looking to refresh your gym, challenge your setters, or take your home wall to the next level, I'm here to help you climb beyond ordinary.`,
  },
};

export const homepageAboutBlurb = `Since high school, I've been obsessed with how the right shapes can inspire movement and creativity.

That passion became a mission: designing durable, functional, and visually striking volumes that spark ideas for setters and challenges for climbers.

Every piece is handcrafted, tested, and built to handle hard falls and heavy traffic — while keeping climbers guessing.

"For me, climbing is a conversation between the wall and the climber, and my volumes are here to make that conversation unforgettable and to make you climb beyond ordinary."`;

// -----------------------------------------------------------------------
// Products -- confirmed only
// -----------------------------------------------------------------------

export const colorOptions = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "turquoise",
  "purple",
  "white",
  "gray",
  "black",
] as const;

export interface ProductSeed {
  name: string;
  slug: string;
  brand: string;
  images: { src: string; alt: string }[];
  // priceCad is the single-unit price. pairPriceCad only exists for
  // products that customers can buy as a single or as a pair.
  sizePricing: { size: string; priceCad: number; pairPriceCad?: number }[];
  sellsAsPair: boolean;
  colorOptions: readonly string[];
  notes?: string;
}

export const products: ProductSeed[] = [
  {
    name: "Bowtie",
    slug: "bowtie",
    brand: "ArcticVolumes",
    images: [
      { src: "/images/bowtie main.jpg", alt: "Bowtie volume, main view" },
      { src: "/images/bowtie thumb1.jpg", alt: "Bowtie volume, angle 2" },
      { src: "/images/bowtie2.jpg", alt: "Bowtie volume, angle 3" },
      { src: "/images/bowtie 3d render.png", alt: "Bowtie volume, 3D render" },
    ],
    sizePricing: [
      { size: "12in", priceCad: 99.34 },
      { size: "24in", priceCad: 170.45 },
      { size: "36in", priceCad: 280.8 },
      { size: "48in", priceCad: 450.24 },
      { size: "60in", priceCad: 527.3 },
      { size: "72in", priceCad: 640.22 },
    ],
    sellsAsPair: false,
    colorOptions,
  },
    {
    name: "Split Rombus Trombus",
    slug: "split-rombus-trombus",
    brand: "ArcticVolumes",
    images: [
      { src: "/images/split rom 3.jpg", alt: "Split Rombus Trombus, main view" },
      { src: "/images/split trom 1.jpg", alt: "Split Rombus Trombus, angle 2" },
      { src: "/images/split trom with bowtie.jpg", alt: "Split Rombus Trombus paired with Bowtie" },
    ],
    sizePricing: [
      { size: "24in", priceCad: 75.3, pairPriceCad: 120.24 },
      { size: "36in", priceCad: 100.75, pairPriceCad: 199.99 },
      { size: "48in", priceCad: 120.3, pairPriceCad: 230.43 },
      { size: "60in", priceCad: 170.45, pairPriceCad: 320.65 },
      { size: "72in", priceCad: 225.67, pairPriceCad: 434.32 },
    ],
    sellsAsPair: true,
    colorOptions,
  },
];