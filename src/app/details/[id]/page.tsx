"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart(); // ✅ use context

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        <Link href="/rings" className="text-blue-500 hover:underline mt-4 block">
          Back to Rings
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1); // ✅ add 1 item
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Product Image */}
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Right: Product Details */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-[#800000] text-2xl mb-6">{formatPrice(product.price)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Sizes:</h3>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-[#800000] text-white px-6 py-3 rounded hover:bg-[#660000] transition"
        >
          Add to Cart
        </button>

        {/* Back to category link */}
        <Link
          href={`/${product.category}`}
          className="text-blue-500 hover:underline mt-6 block"
        >
          Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
      </div>
    </div>
  );
}
