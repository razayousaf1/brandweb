"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";

export default function CrossbodyBagsPage() {
  const [products] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === "crossbody-bags")
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-stone-900 relative overflow-hidden">
      {/* Urban Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-orange-400/5 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-rose-500/8 to-pink-400/5 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/6 to-purple-400/4 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "8s" }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 pt-24 pb-16 text-center">
        <h1
          className={`font-serif text-6xl lg:text-7xl font-bold mb-6 leading-tight transform transition-all duration-1200 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <span className="block bg-gradient-to-r from-slate-200 via-amber-200 to-rose-300 bg-clip-text text-transparent">
            Crossbody
          </span>
          <span className="block bg-gradient-to-r from-rose-300 via-amber-300 to-slate-200 bg-clip-text text-transparent">
            Collection
          </span>
        </h1>

        <p
          className={`text-slate-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed transform transition-all duration-1200 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Effortless style meets practical design. Discover crossbody bags that
          adapt to your dynamic lifestyle, offering the perfect blend of fashion,
          function, and freedom of movement.
        </p>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
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
                  <div className="relative overflow-hidden rounded-3xl bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 hover:border-amber-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 group-hover:bg-slate-800/30">
                    {/* 👇 Pass amber theme */}
                    <ProductCard product={product} theme="amber" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="text-4xl font-serif font-bold text-slate-200 mb-6">
                No crossbody bags found
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                Please check back later for new arrivals.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-[15%] right-[8%] w-2 h-2 bg-amber-400/40 rounded-full animate-pulse" />
      <div
        className="fixed top-[70%] left-[3%] w-1.5 h-1.5 bg-rose-400/30 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed bottom-[30%] right-[12%] w-1 h-1 bg-violet-400/40 rounded-full animate-pulse"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
