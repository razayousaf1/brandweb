"use client";

import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext"; 
import { useWishlist } from "@/contexts/WishlistContext"; // ✅ import wishlist

interface ProductCardProps {
  product: Product;
  theme?: "amber" | "green" | "pink" | "blue" | "rose" | "violet";
}

export default function ProductCard({ product, theme = "amber" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // ✅ use wishlist hook

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // ✅ prevent navigation
    addToCart(product.id, 1); // ✅ match your CartContext signature
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
      <Card className="product-card cursor-pointer border-none shadow-sm bg-transparent">
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
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
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
            <ShoppingCart
              size={20}
              className={`${priceClass} cursor-pointer transition-all duration-200 transform hover:scale-110`}
              onClick={handleCartClick}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
