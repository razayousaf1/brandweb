"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";

export default function BraceletsPage() {
  const [products] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === "bracelets")
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Animated Wave Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M0,400 C300,350 600,450 1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            className="animate-wave"
          />
          <path
            d="M0,450 C300,400 600,500 1200,450 L1200,800 L0,800 Z"
            fill="url(#waveGradient2)"
            className="animate-wave-reverse"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div
          className={`text-center transform transition-all duration-1200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="text-emerald-300 text-sm font-medium tracking-widest uppercase">
              Premium Collection
            </span>
            <div
              className="w-2 h-2 bg-teal-400 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <h1 className="font-serif text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Elegant
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Bracelets
            </span>
          </h1>

          <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Embrace elegance with our curated collection of luxury bracelets.
            From delicate chains to bold statement pieces, find the perfect
            accent for every moment and mood.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 pb-20">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`group transform transition-all duration-500 hover:scale-105 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${700 + index * 80}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 group-hover:bg-slate-800/40">
                    {/* 👇 Pass the theme here */}
                    <ProductCard product={product} theme="emerald" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-3xl font-serif font-bold text-slate-200 mb-4">
                No bracelets found
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                Please check back later for new arrivals.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed top-1/4 right-6 w-2 h-2 bg-emerald-400/40 rounded-full animate-ping" />
      <div
        className="fixed top-2/3 left-4 w-1.5 h-1.5 bg-teal-300/30 rounded-full animate-ping"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="fixed bottom-1/3 right-12 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}
