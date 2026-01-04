// src/data/products.ts
// FULL product data + categories, sizes, utilities

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
  rings: ["8", "9", "10", "11", "12"] as const,
  bracelets: ["free size"] as const,
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

// ✅ Updated Product type with availableSizes
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategorySlug;
  sizes: readonly string[]; // All possible sizes
  availableSizes?: readonly string[]; // Sizes currently in stock
};

// Master product list with available sizes
export const PRODUCTS: Product[] = [
  // ---- Rings (13) ----
  {
    id: "ring-1",
    name: "Capo - The Mafia Ring",
    description: "A luxurious ring crafted for modern gentlemen — polished and refined.",
    price: 1200,
    image: "/products/capo.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11"], // Example: size 12 not available
  },
  {
    id: "ring-2",
    name: "The Iron Seeker Ring - Adjustable Ring",
    description: "A timeless band for every occasion — understated and durable.",
    price: 1200,
    image: "/products/seeker.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"], // All sizes available
  },
  {
    id: "ring-3",
    name: "Oblivion Ring",
    description: "Regal design inspired by royal crowns, with intricate detailing.",
    price: 1200,
    image: "/products/oblivion.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["9", "10", "11"], // Only 9, 10, 11 available
  },
  {
    id: "ring-4",
    name: "Signet rings",
    description: "Bold and structured — a symbol of loyalty and strength.",
    price: 500,
    image: "/products/signet.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-5",
    name: "Ottoman Skull",
    description: "Rugged texture and heavy-duty finish, Norse-inspired.",
    price: 400,
    image: "/products/ottoman.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-6",
    name: "Crowned Sultan",
    description: "Dark-toned luxe ring with a modern mafia-inspired vibe.",
    price: 400,
    image: "/products/crowned.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-7",
    name: "Palmstar",
    description: "Classic Roman motifs reimagined for contemporary wear.",
    price: 400,
    image: "/products/palmstar.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-8",
    name: "The Tribe",
    description: "Egyptian-inspired patterns with a polished gold finish.",
    price: 400,
    image: "/products/tribe.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-9",
    name: "Swordmark",
    description: "Sharp geometry and dark accents for a striking silhouette.",
    price: 400,
    image: "/products/swordmark.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-10",
    name: "AV Tactical Signet",
    description: "Textured dragon-scale surface with bold character.",
    price: 400,
    image: "/products/AV.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-11",
    name: "Lionheart Crest",
    description: "Centerpiece gemstone with a refined setting.",
    price: 400,
    image: "/products/lionheart.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-12",
    name: "Crusader's Mark",
    description: "Industrial steel finish for a strong everyday statement.",
    price: 400,
    image: "/products/crusader.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "ring-13",
    name: "Dark tier Rings",
    description: "Industrial steel finish for a strong everyday statement.",
    price: 500,
    image: "/products/darktier.avif",
    category: "rings",
    sizes: PRODUCT_SIZES.rings,
    availableSizes: ["8", "9", "10", "11", "12"],
  },

  // ---- Bracelets (11) ----
  {
    id: "bracelet-10",
    name: "Yin Yang Couple Bracelet",
    description: "Chunky chain for a statement presence.",
    price: 1300,
    image: "/products/yinyang.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-1",
    name: "Greenforge Bracelet",
    description: "Premium leather cuff with a polished metal clasp.",
    price: 800,
    image: "/products/greenforge.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-2",
    name: "Deep Ocean Stone Bracelet",
    description: "Classic chain link bracelet in stainless steel.",
    price: 1300,
    image: "/products/deep.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-3",
    name: "Galaxy Loop Stone Bracelet",
    description: "Semi-precious beaded bracelet for layered looks.",
    price: 1300,
    image: "/products/galaxy.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-4",
    name: "Vanta Drip Stone Bracelet",
    description: "Soft braided leather with a secure clasp.",
    price: 1300,
    image: "/products/vantadrip.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-5",
    name: "Autumn Ember Stone Bracelet",
    description: "Open torque bracelet with polished silver finish.",
    price: 1300,
    image: "/products/autumn.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-9",
    name: "Ashrock Bracelet",
    description: "Sleek minimalist metal band bracelet.",
    price: 1300,
    image: "/products/ashrock.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-6",
    name: "The Ember Collection - Chain Bracelet",
    description: "Black onyx beads wrapped for a bold bracelet look.",
    price: 2000,
    image: "/products/ember.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-7",
    name: "Terra tones collection",
    description: "Gold-plated links for a luxe finish.",
    price: 600,
    image: "/products/terra.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-8",
    name: "The Dragon Reign",
    description: "Edgy studded bracelet for an urban look.",
    price: 2000,
    image: "/products/dragon.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },
  {
    id: "bracelet-11",
    name: "Black leather drip",
    description: "Textured rope-style bracelet with secure knot clasp.",
    price: 1500,
    image: "/products/black.avif",
    category: "bracelets",
    sizes: PRODUCT_SIZES.bracelets,
    availableSizes: ["free size"],
  },

  // ---- Pendants (7) ----
  {
    id: "pendant-1",
    name: "The Iron Seeker - Compass Pendant",
    description: "Elegant silver cross pendant with clean lines.",
    price: 1500,
    image: "/products/compass.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-2",
    name: "Iron Howl - Spiked chain",
    description: "Compass-inspired pendant — symbolic and detailed.",
    price: 1500,
    image: "/products/spiked.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-3",
    name: "Vulture Drip - Pendant",
    description: "Bold pendant with dark stone inlay.",
    price: 1500,
    image: "/products/vulture.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-4",
    name: "Diamond Drip - Pendant",
    description: "Subtle diamond-accent pendant for refined shine.",
    price: 1500,
    image: "/products/diamond.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-5",
    name: "Roar of Haidar- Zulfaiqar Pendant",
    description: "Dark obsidian centerpiece for a mysterious look.",
    price: 1500,
    image: "/products/zulfiqar.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-6",
    name: "Starpiercer Pendant",
    description: "Interwoven knot pendant symbolizing unity.",
    price: 1500,
    image: "/products/starpiercer.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },
  {
    id: "pendant-7",
    name: "Twilight Drip Pendant",
    description: "Interwoven knot pendant symbolizing unity.",
    price: 1700,
    image: "/products/twilight.avif",
    category: "pendants",
    sizes: PRODUCT_SIZES.pendants,
    availableSizes: ["One Size"],
  },

  // ---- Crossbody Bags (1) ----
  {
    id: "bag-1",
    name: "Black Crossbody Bag",
    description: "Premium crossbody bag for daily essentials.",
    price: 1800,
    image: "/products/crossbody.avif",
    category: "crossbody-bags",
    sizes: PRODUCT_SIZES["crossbody-bags"],
    availableSizes: ["One Size"],
  },

  // ---- Pocket Watches (1) ----
  {
    id: "watch-1",
    name: "Shelby Seconds - Pocket Watch",
    description: "Classic vintage pocket watch with mechanical movement.",
    price: 2500,
    image: "/products/pocket.avif",
    category: "pocket-watches",
    sizes: PRODUCT_SIZES["pocket-watches"],
    availableSizes: ["One Size"],
  },
];