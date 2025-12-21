"use client";
import { useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function RingsPage() {
  const [products] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === "rings")
  );
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (filter === "all") return true;
      return (
        product.material?.toLowerCase().includes(filter.toLowerCase()) ||
        product.style?.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/5 to-amber-300/10 animate-pulse" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/5 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="font-serif text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-6">
              Exquisite Rings
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover our handcrafted collection of timeless rings, where each
              piece tells a story of elegance and sophistication.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`transform transition-all duration-500 hover:scale-105 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-slate-800/40 backdrop-blur-sm border transition-all duration-300 ${
                      hoveredCard === product.id
                        ? "border-amber-400/50 shadow-2xl shadow-amber-500/20"
                        : "border-slate-700/50 hover:border-slate-600/50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {/* 👇 Pass the theme here */}
                    <ProductCard product={product} theme="amber" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-300 mb-3">
                No rings match your criteria
              </h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your filters to see more options
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSortBy("featured");
                }}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Lights */}
      <div
        className="fixed top-1/2 left-4 w-2 h-2 bg-amber-400/30 rounded-full animate-ping"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="fixed top-1/3 right-8 w-1 h-1 bg-yellow-300/40 rounded-full animate-ping"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-1/4 left-8 w-1.5 h-1.5 bg-amber-300/20 rounded-full animate-ping"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
