"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
  theme?: "amber" | "green" | "pink" | "blue" | "rose" | "violet";
}

export default function ProductCard({ product, theme = "amber" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart - pass the full product object
    addToCart(product, 1, product.sizes[0]);
    
    // Show "Added to cart" popup
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000); // Hide after 2 seconds
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });
  };

  // Define theme colors
  const themeColors: Record<string, string> = {
    amber: "text-amber-400 hover:text-amber-300",
    green: "text-emerald-400 hover:text-emerald-300",
    pink: "text-pink-400 hover:text-pink-300",
    blue: "text-sky-400 hover:text-sky-300",
    rose: "text-rose-400 hover:text-rose-300",
    violet: "text-violet-400 hover:text-violet-300",
  };

  const priceClass = themeColors[theme] || themeColors["amber"];
  const isFavorite = isInWishlist(product.id);

  return (
    <Link href={`/details/${product.id}`} className="block group">
      <Card className="product-card cursor-pointer border-none shadow-sm bg-transparent relative">
        {/* ✅ "Added to cart" popup message */}
        {showAddedMessage && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
            <Check size={20} className="text-green-400" />
            <span className="font-semibold">Added to cart!</span>
          </div>
        )}

        {/* Product Image */}
        <div className="overflow-hidden rounded-t-xl relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[12rem] object-contain rounded-t-md transition-transform duration-300 group-hover:scale-105"
          />
          {/* ❤️ Wishlist Icon */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-all"
          >
            <Heart
              size={20}
              className={`transition-all duration-200 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-white hover:text-red-400"
              }`}
            />
          </button>
        </div>

        {/* Card Content */}
        <CardContent className="p-3">
          <h3 className="font-serif text-lg font-semibold mb-1 text-slate-200">
            {product.name}
          </h3>
          {/* Price + Cart Icon */}
          <div className="flex items-center justify-between">
            <p className={`text-base font-semibold ${priceClass}`}>
              {product.price} PKR
            </p>
            {/* ✅ Cart icon with hover effect and popup on click */}
            <button
              onClick={handleCartClick}
              className={`${priceClass} cursor-pointer transition-all duration-200 transform hover:scale-125 active:scale-150 p-2 rounded-full hover:bg-white/10`}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}