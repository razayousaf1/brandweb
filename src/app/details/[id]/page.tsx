"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

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

  // Get available sizes (defaults to all sizes if not specified)
  const availableSizes = product.availableSizes || product.sizes;

  // Check if a size is available
  const isSizeAvailable = (size: string) => {
    return availableSizes.includes(size);
  };

  const handleAddToCart = () => {
    // ✅ FIX 1: Check if product has multiple sizes and user hasn't selected one
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Check if selected size is available
    if (selectedSize && !isSizeAvailable(selectedSize)) {
      toast({
        title: "Size not available",
        description: `Size ${selectedSize} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    const sizeToAdd = selectedSize || product.sizes?.[0] || "";
    
    // Pass the full product object to addToCart
    addToCart(product, quantity, sizeToAdd);
    
    toast({
      title: "✅ Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    // ✅ FIX 2: Reset selection after adding to cart
    setSelectedSize("");
    setQuantity(1);
  };

  // ✅ FIX 3: Handle size selection with toggle behavior
  const handleSizeClick = (size: string) => {
    const available = isSizeAvailable(size);
    if (!available) return;
    
    // Toggle: if clicking the same size, deselect it
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-8 hover:bg-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Button>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Product Image */}
          <div className="flex justify-center bg-white rounded-2xl p-8 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-w-[500px] object-contain rounded-lg"
            />
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description || "Premium quality product crafted with care."}
              </p>
            </div>

            {/* ✅ Available Sizes with availability status */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Available Sizes:
                </Label>
                {product.sizes.length === 1 ? (
                  <p className="text-muted-foreground px-4 py-2 bg-secondary rounded-md inline-block">
                    {product.sizes[0]}
                  </p>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                      const available = isSizeAvailable(size);
                      return (
                        <button
                          key={size}
                          onClick={() => handleSizeClick(size)}
                          disabled={!available}
                          className={`px-4 py-2 border-2 rounded-md transition-all relative ${
                            selectedSize === size
                              ? "border-black bg-black text-white"
                              : available
                              ? "border-gray-300 hover:border-black cursor-pointer"
                              : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {size}
                          {/* ✅ Show "Not Available" label for out of stock sizes */}
                          {!available && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              N/A
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Quantity
              </Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-black text-white py-6 text-lg font-semibold hover:bg-black/90 transition-all hover:scale-105 active:scale-95"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            {/* Back Link */}
            <Link
              href={`/${product.category}`}
              className="text-blue-500 hover:underline block text-center mt-4"
            >
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}