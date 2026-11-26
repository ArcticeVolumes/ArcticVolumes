// Content pulled from the old static site. Trimmed to only the two
// products with confirmed, finalized data (Bowtie, Split Rombus Trombus).
// Pentagon and the seven listing-only products (Wedge Slice Volume,
// Stackable Triangle, Triangle Pyramid, Asymmetric Triangle, Arrow,
// Keystone Triangle, Macro Triangle) are intentionally left out -- add
// them in once johnny finalizes those.

export const businessInfo = {
  name: "Arctic Volumes",
  ownerName: "Jonathan Messier",
  instagram: "https://www.instagram.com/arctic_volumes/",
  hours: "Anytime",
  tagline: "Climb Beyond Ordinary",
  copyrightYear: 2025,
  // Web3Forms access key for the contact form (same one the old site used).
  // This key is meant to be public: it only lets people send messages to
  // the inbox it is tied to.
  web3formsAccessKey: "82785d15-dfa7-4dbd-b48f-8b6e75ee8682",
};

// Homepage hero carousel. Same photos, order and captions as the old site.
// "position" says which area of the photo the caption sits in.
export type HeroLineStyle = "eyebrow" | "heading" | "giant" | "sub" | "canadian";

export interface HeroSlide {
  src: string;
  alt: string;
  caption?: {
    position: "bottom-left" | "lower-middle" | "right-upper" | "right-middle";
    lines: { style: HeroLineStyle; text: string }[];
  };
}

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/web/hero-1.jpg",
    alt: "Two small Arctic Volumes pieces on a concrete floor",
    caption: {
      position: "bottom-left",
      lines: [
        { style: "eyebrow", text: "Volumes Hand Crafted." },
        { style: "heading", text: "Ready to Send." },
        { style: "heading", text: "Climb Beyond Ordinary." },
        { style: "canadian", text: "Canadian made" },
      ],
    },
  },
  {
    src: "/images/web/hero-2.jpg",
    alt: "Climber on a large volume while a crowd watches",
  },
  {
    src: "/images/web/hero-3.jpg",
    alt: "Small triangle volumes in several colors",
    caption: {
      position: "lower-middle",
      lines: [{ style: "heading", text: "Sustainably Sourced from Canada." }],
    },
  },
  {
    src: "/images/web/hero-4.jpg",
    alt: "Climber on a gym wall set with Arctic Volumes pieces",
    caption: {
      position: "right-upper",
      lines: [
        { style: "giant", text: "Unmatched Texture" },
        { style: "heading", text: "Built to Outlast the Wall." },
        { style: "sub", text: "Designed to endure constant abuse without fading." },
      ],
    },
  },
  {
    src: "/images/web/hero-5.jpg",
    alt: "Large pyramid volume on a red climbing wall",
    caption: {
      position: "right-middle",
      lines: [
        { style: "heading", text: "Unbreakable. Unshakeable. Unmatched." },
        { style: "canadian", text: "Canadian made" },
      ],
    },
  },
  {
    src: "/images/web/hero-6.jpg",
    alt: "Routesetters installing large volumes in a climbing gym",
  },
];

// About page photos.
export const aboutImages = {
  company: {
    src: "/images/web/about-company.jpg",
    alt: "Jonathan building a volume with a nail gun",
  },
  owner: {
    src: "/images/web/about-owner.jpg",
    alt: "Jonathan Messier outside his workshop",
  },
};

// About page collage: columns of 2, 3 and 2 photos, same order as the old site.
export const aboutGalleryColumns: { src: string; alt: string }[][] = [
  [
    { src: "/images/web/about-gallery-1.jpg", alt: "Jonathan inspecting a cut plywood panel" },
    { src: "/images/web/about-gallery-2.jpg", alt: "Jonathan cutting plywood with a track saw" },
  ],
  [
    { src: "/images/web/about-gallery-3.jpg", alt: "Sketchbook, plywood pieces and a drill on a deck" },
    { src: "/images/web/about-gallery-4.jpg", alt: "Jonathan holding a small finished volume" },
    { src: "/images/web/about-gallery-5.jpg", alt: "Jonathan checking a part" },
  ],
  [
    { src: "/images/web/about-gallery-6.jpg", alt: "Jonathan gluing a volume together" },
    { src: "/images/web/about-gallery-7.jpg", alt: "Jonathan spraying a finished volume" },
  ],
];

// Homepage photo gallery: three columns of four, same order as the old site.
export const homeGalleryColumns: { src: string; alt: string }[][] = [
  [
    { src: "/images/web/gallery-01.jpg", alt: "Stack of colorful triangle volumes" },
    { src: "/images/web/gallery-02.jpg", alt: "Climbing shoe on a blue Arctic Volumes pyramid" },
    { src: "/images/web/gallery-03.jpg", alt: "Volumes mounted on a gym wall" },
    { src: "/images/web/gallery-04.jpg", alt: "Volume close-up on a gym wall" },
  ],
  [
    { src: "/images/web/gallery-05.jpg", alt: "Two grey volumes on a concrete floor" },
    { src: "/images/web/gallery-06.jpg", alt: "Blue volumes on a red climbing wall" },
    { src: "/images/web/gallery-07.jpg", alt: "Dark volume on a light climbing wall" },
    { src: "/images/web/gallery-08.jpg", alt: "Arctic Volumes piece in use at a gym" },
  ],
  [
    { src: "/images/web/gallery-09.jpg", alt: "Setters mounting large white volumes" },
    { src: "/images/web/gallery-10.jpg", alt: "Setter drilling a volume onto the wall" },
    { src: "/images/web/gallery-11.jpg", alt: "Setter on a ladder installing a volume" },
    { src: "/images/web/gallery-12.jpg", alt: "Setting day at the climbing gym" },
  ],
];

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

Every volume is handcrafted with attention to detail, tested to meet real-world demands, and designed to work across a variety of wall angles. If you're looking to refresh your gym, challenge your setters, or take your home wall to the next level, I'm here to help you climb beyond ordinary. Whether you're setting a new route or exploring fresh challenges, my volumes are crafted to inspire creativity and elevate your climbing experience. With a focus on innovation and quality, they transform walls into dynamic spaces where climbers can push their limits and discover new possibilities.`,
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
  // Drawing shown on the store and homepage cards (the old site used 3D
  // renders there). Falls back to the first photo when not set.
  cardImage?: { src: string; alt: string };
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
    cardImage: { src: "/images/web/card-bowtie.png", alt: "Bowtie volume drawing" },
    brand: "ArcticVolumes",
    images: [
      { src: "/images/web/bowtie-main.jpg", alt: "Bowtie volume, main view" },
      { src: "/images/web/bowtie-angle-2.jpg", alt: "Bowtie volume, angle 2" },
      { src: "/images/web/bowtie-angle-3.jpg", alt: "Bowtie volume, angle 3" },
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
    cardImage: { src: "/images/web/card-split-rombus-trombus.png", alt: "Split Rombus Trombus volume drawing" },
    brand: "ArcticVolumes",
    images: [
      { src: "/images/web/split-rombus-main.jpg", alt: "Split Rombus Trombus, main view" },
      { src: "/images/web/split-rombus-angle-2.jpg", alt: "Split Rombus Trombus, angle 2" },
      { src: "/images/web/split-rombus-with-bowtie.jpg", alt: "Split Rombus Trombus paired with Bowtie" },
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