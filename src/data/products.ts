// src/data/product.ts
// FULL product data + categories, sizes, utilities
// Includes 13 rings, 12 bracelets, 6 pendants, 5 crossbody bags, 3 pocket watches
// Image paths point to /public/products/... (use <img src="..." /> or next/image with local paths)

export const PRODUCT_CATEGORIES = {
  rings: {
    name: "Rings",
    slug: "rings",
    description: "Signature & Statement Pieces",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&h=300",
  },
  bracelets: {
    name: "Bracelets",
    slug: "bracelets",
    description: "Leather & Metal Accents",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&h=300",
  },
  pendants: {
    name: "Pendants",
    slug: "pendants",
    description: "Contemporary Necklaces",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&h=300",
  },
  "crossbody-bags": {
    name: "Crossbody Bags",
    slug: "crossbody-bags",
    description: "Premium Leather Goods",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=300",
  },
  "pocket-watches": {
    name: "Pocket Watches",
    slug: "pocket-watches",
    description: "Timeless Mechanical Elegance",
    image:
      "https://images.unsplash.com/photo-1518554908854-49f1b0b0690e?auto=format&fit=crop&w=400&h=300",
  },
} as const;

export type CategorySlug = keyof typeof PRODUCT_CATEGORIES;

export const PRODUCT_SIZES = {
  rings: ["6", "7", "8", "9", "10", "11", "12"] as const,
  bracelets: ["S", "M", "L", "XL"] as const,
  pendants: ["One Size"] as const,
  "crossbody-bags": ["One Size"] as const,
  "pocket-watches": ["One Size"] as const,
} as const;

export const BRAND_INFO = {
  name: "Shahsawaar",
  tagline: "Where Royalty Meets Refinement",
  description:
    "Discover exquisite men's jewelry at Shahsawaar. Premium rings, bracelets, pendants, crossbody bags, and pocket watches where royalty meets refinement.",
  mission:
    "Creating exceptional jewelry that embodies the perfect balance of royal heritage and contemporary refinement.",
} as const;

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/rings", label: "Rings" },
  { href: "/bracelets", label: "Bracelets" },
  { href: "/pendants", label: "Pendants" },
  { href: "/crossbody-bags", label: "Crossbody Bags" },
  { href: "/pocket-watches", label: "Pocket Watches" },
  { href: "/about", label: "About" },
] as const;

// Utility functions
export function getCategoryTitle(categorySlug: string): string {
  return (
    PRODUCT_CATEGORIES[categorySlug as keyof typeof PRODUCT_CATEGORIES]?.name ||
    categorySlug
  );
}

export function getCategoryDescription(categorySlug: string): string {
  const descriptions: Record<string, string> = {
    rings:
      "Discover our exquisite collection of men's rings, from classic wedding bands to statement signet rings.",
    bracelets:
      "Explore sophisticated bracelets that blend leather, metal, and contemporary design.",
    pendants:
      "Find the perfect pendant to express your style with our contemporary necklace collection.",
    "crossbody-bags":
      "Premium leather crossbody bags designed for the modern gentleman.",
    "pocket-watches":
      "Traditional pocket watches crafted with precision for timeless elegance.",
  };
  return descriptions[categorySlug] || "Discover our premium collection.";
}

// Return price formatted with PKR. Modify as needed.
export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price.replace(/[^\d.]/g, '')) : price;
  return `PKR ${num}`;
}

export function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Product type
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // local path string such as "/products/rings/royal-ring.png"
  category: CategorySlug;
  sizes: readonly string[];
};

// Master product list (39 placeholder products)
// Images should be placed in /public/products/{category}/... to match the image paths below.
// Use <img src={product.image} /> or Next's <Image src={product.image} ... /> with local paths.
export const PRODUCTS: Product[] = [
  // ---- Rings (13) ----
  {
    id: "ring-1",
    name: "Capo - The Mafia Ring",
    description: "A luxurious ring crafted for modern gentlemen — polished and refined.",
    price: 1299,
    image: "/products/capo.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-2",
    name: "The Iron Seeker Ring - Adjustable Ring",
    description: "A timeless band for every occasion — understated and durable.",
    price: 1350,
    image: "/products/seeker.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-3",
    name: "Oblivion Ring",
    description: "Regal design inspired by royal crowns, with intricate detailing.",
    price: 599,
    image: "/products/oblivion.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-4",
    name: "Signet rings",
    description: "Bold and structured — a symbol of loyalty and strength.",
    price: 499,
    image: "/products/signet.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-5",
    name: "Ottoman Skull",
    description: "Rugged texture and heavy-duty finish, Norse-inspired.",
    price: 399,
    image: "/products/ottoman.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-6",
    name: "Crowned Sultan",
    description: "Dark-toned luxe ring with a modern mafia-inspired vibe.",
    price: 399,
    image: "/products/crowned.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-7",
    name: "Palmstar",
    description: "Classic Roman motifs reimagined for contemporary wear.",
    price: 399,
    image: "/products/palmstar.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-8",
    name: "The Tribe",
    description: "Egyptian-inspired patterns with a polished gold finish.",
    price: 399,
    image: "/products/tribe.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-9",
    name: "Swordmark",
    description: "Sharp geometry and dark accents for a striking silhouette.",
    price: 399,
    image: "/products/swordmark.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-10",
    name: "AV Tactical Signet",
    description: "Textured dragon-scale surface with bold character.",
    price: 399,
    image: "/products/AV.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-11",
    name: "Lionheart Crest",
    description: "Centerpiece gemstone with a refined setting.",
    price: 399,
    image: "/products/lionheart.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-12",
    name: "Crusader's Mark",
    description: "Industrial steel finish for a strong everyday statement.",
    price: 399,
    image: "/products/crusader.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },
  {
    id: "ring-13",
    name: "Dark tier Rings",
    description: "Industrial steel finish for a strong everyday statement.",
    price: 499,
    image: "/products/darktier.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
  },

  // ---- Bracelets (12) ----
  {
    id: "bracelet-10",
    name: "Yin Yang Couple Bracelet",
    description: "Chunky chain for a statement presence.",
    price: 1299,
    image: "/products/yinyang.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-1",
    name: "Greenforge Bracelet",
    description: "Premium leather cuff with a polished metal clasp.",
    price: 799,
    image: "/products/greenforge.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-2",
    name: "Deep Ocean Stone Bracelet ",
    description: "Classic chain link bracelet in stainless steel.",
    price: 1299,
    image: "/products/deep.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-3",
    name: "Galaxy Loop Stone Bracelet",
    description: "Semi-precious beaded bracelet for layered looks.",
    price: 1299,
    image: "/products/galaxy.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-4",
    name: "Vanta Drip Stone Bracelet",
    description: "Soft braided leather with a secure clasp.",
    price: 1299,
    image: "/products/vantadrip.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-5",
    name: "Autumn Ember Stone Sracelet",
    description: "Open torque bracelet with polished silver finish.",
    price: 1299,
    image: "/products/autumn.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-9",
    name: "Ashrock Bracelet",
    description: "Sleek minimalist metal band bracelet.",
    price: 799,
    image: "/products/ashrock.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-6",
    name: "The Ember Collection - Chain Bracelet",
    description: "Black onyx beads wrapped for a bold bracelet look.",
    price: 2199,
    image: "/products/ember.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-7",
    name: "Terra tones collection",
    description: "Gold-plated links for a luxe finish.",
    price: 650,
    image: "/products/terra.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-8",
    name: "The Dragon Reign",
    description: "Edgy studded bracelet for an urban look.",
    price: 1499,
    image: "/products/dragon.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-11",
    name: "Black leather drip",
    description: "Textured rope-style bracelet with secure knot clasp.",
    price: 1399,
    image: "/products/black.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },
  {
    id: "bracelet-12",
    name: "Braid theory - Rope Bracelet",
    description: "Polished bangle with brand signature engraving.",
    price: 450,
    image: "/products/bracelets/signature-bangle.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
  },

  // ---- Pendants (6) ----
  {
    id: "pendant-1",
    name: "The Iron Seeker - Compass Pendant",
    description: "Elegant silver cross pendant with clean lines.",
    price: 1499,
    image: "/products/compass.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-2",
    name: "Iron Howl - Spiked chain",
    description: "Compass-inspired pendant — symbolic and detailed.",
    price: 1299,
    image: "/products/spiked.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-3",
    name: "Vulture Drip - Pendant",
    description: "Bold pendant with dark stone inlay.",
    price: 1499,
    image: "/products/vulture.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-4",
    name: "Diamond Drip - Pendant",
    description: "Subtle diamond-accent pendant for refined shine.",
    price: 1199,
    image: "/products/diamond.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-5",
    name: "Roar of Haidar- Zulfaiqar Pendant",
    description: "Dark obsidian centerpiece for a mysterious look.",
    price: 1299,
    image: "/products/zulfiqar.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-6",
    name: "Starpiercer Pendant",
    description: "Interwoven knot pendant symbolizing unity.",
    price: 1299,
    image: "/products/starpiercer.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },
  {
    id: "pendant-7",
    name: "Twilight Drip Pendant",
    description: "Interwoven knot pendant symbolizing unity.",
    price: 1299,
    image: "/products/twilight.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
  },

  // ---- Crossbody Bags (5) ----
  {
    id: "bag-1",
    name: "Black Crossbody Bag ",
    description: "Premium leather crossbody bag for daily essentials.",
    price: 1799,
    image: "/products/crossbody.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
  },
  {
    id: "bag-2",
    name: "Urban Sling",
    description: "Compact sling bag built for city mobility.",
    price: 1799,
    image: "/products/crossbody-bags/urban-sling.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
  },
  {
    id: "bag-3",
    name: "Minimal Messenger",
    description: "Minimalist messenger-style crossbody with clean lines.",
    price: 1899,
    image: "/products/crossbody-bags/minimal-messenger.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
  },
  {
    id: "bag-4",
    name: "Tactical Satchel",
    description: "Durable satchel with tactical compartments.",
    price: 1999,
    image: "/products/crossbody-bags/tactical-satchel.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
  },
  {
    id: "bag-5",
    name: "Luxe Explorer",
    description: "Luxury-finished explorer bag for travel and style.",
    price: 2299,
    image: "/products/crossbody-bags/luxe-explorer.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
  },

  // ---- Pocket Watches (3) ----
  {
    id: "watch-1",
    name: "Shelby Seconds - Pocket Watch",
    description: "Classic vintage pocket watch with mechanical movement.",
    price: 2799,
    image: "/products/pocket.avif",
    category: "pocket-watches",
    sizes: PRODUCT_SIZES["pocket-watches"],
  },
  {
    id: "watch-2",
    name: "Shelby Seconds",
    description: "Precision pocket watch with an elegant dial.",
    price: 2799,
    image: "/products/pocket-watches/shelby-seconds.avif",
    category: "pocket-watches",
    sizes: PRODUCT_SIZES["pocket-watches"],
  },
  {
    id: "watch-3",
    name: "Midnight Gear",
    description: "Dark-toned pocket watch with bold numerals.",
    price: 2399,
    image: "/products/pocket-watches/midnight-gear.avif",
    category: "pocket-watches",
    sizes: PRODUCT_SIZES["pocket-watches"],
  },
];
