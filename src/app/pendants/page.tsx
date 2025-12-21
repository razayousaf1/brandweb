"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";

export default function PendantsPage() {
  const [products] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === "pendants")
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div
          className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-purple-300 rounded-full animate-twinkle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[60%] left-[15%] w-0.5 h-0.5 bg-pink-300 rounded-full animate-twinkle"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[80%] left-[70%] w-1 h-1 bg-indigo-300 rounded-full animate-twinkle"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Nebula Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500/15 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "6s" }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-24 text-center">
        <h1
          className={`font-serif text-7xl lg:text-8xl font-bold mb-6 leading-tight transform transition-all duration-1500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <span className="block bg-gradient-to-r from-purple-200 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
            Mystical
          </span>
          <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            Pendants
          </span>
        </h1>
        <p
          className={`text-slate-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed transform transition-all duration-1500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Discover sacred symbols and meaningful designs in our enchanting
          pendant collection. Each piece carries its own story, ready to become
          part of your personal journey.
        </p>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`group transform transition-all duration-600 hover:scale-105 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 80}ms` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 hover:border-purple-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 group-hover:bg-slate-800/30">
                    {/* 👇 Pass theme prop */}
                    <ProductCard product={product} theme="purple" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="text-4xl font-serif font-bold text-slate-200 mb-6">
                No pendants found
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                Please check back later for new arrivals.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Stars */}
      <div className="fixed top-[5%] right-[10%] w-2 h-2 bg-purple-300/60 rounded-full animate-twinkle" />
      <div
        className="fixed top-[30%] left-[5%] w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-twinkle"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-[20%] right-[15%] w-1 h-1 bg-indigo-300/50 rounded-full animate-twinkle"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
