"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist(); // ✅ Use context to get and remove items

  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">My Wishlist ❤️</h1>

        {/* If empty */}
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">
            No items yet. Go add your favorites!
          </p>
        ) : (
          // ✅ Show all wishlist items
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col"
              >
                <Link href={`/details/${item.id}`} className="flex-1">
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-700">{item.price} PKR</p>
                </Link>

                {/* 🗑️ Remove button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => toggleWishlist(item)}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
