"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";

export default function PocketWatchesPage() {
  const [products] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === "pocket-watches")
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>("craftsmanship");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const heritageFeatures = [
    {
      id: "craftsmanship",
      title: "Masterful Craftsmanship",
      icon: "🔧",
      description:
        "Each pocket watch represents centuries of horological tradition, with intricate movements crafted by skilled artisans.",
    },
    {
      id: "heritage",
      title: "Living Heritage",
      icon: "📜",
      description:
        "Own a piece of history with timepieces that have witnessed generations, carrying stories from bygone eras.",
    },
    {
      id: "precision",
      title: "Timeless Precision",
      icon: "⚙️",
      description:
        "Experience the mechanical poetry of gears and springs working in perfect harmony to measure life's precious moments.",
    },
    {
      id: "elegance",
      title: "Distinguished Elegance",
      icon: "✨",
      description:
        "Make a statement of sophistication with these symbols of refinement and classical gentleman's style.",
    },
  ];

  const formatTime = (date: Date) => ({
    hours: date.getHours() % 12 || 12,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ampm: date.getHours() >= 12 ? "PM" : "AM",
  });

  const time = currentTime ? formatTime(currentTime) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950 relative overflow-hidden">
      {/* Vintage Paper Texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 50% 10%, rgba(210, 180, 140, 0.1) 0%, transparent 50%)`,
            backgroundSize: "100px 100px, 80px 80px, 120px 120px",
          }}
        />
      </div>

      {/* Clockwork Gears Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-amber-400 rounded-full animate-spin-slow">
          <div className="absolute inset-4 border-2 border-yellow-400 rounded-full animate-spin-reverse" />
        </div>
        <div
          className="absolute bottom-32 left-16 w-24 h-24 border-2 border-orange-400 rounded-full animate-spin-slow"
          style={{ animationDelay: "2s" }}
        >
          <div className="absolute inset-3 border-2 border-amber-300 rounded-full animate-spin-reverse" />
        </div>
      </div>

      {/* Ambient Lights */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Hero Section with Clock */}
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div
          className={`transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          {/* Clock + Title */}
          <div className="text-center mb-12">
            {isLoaded && time && (
              <>
                <div className="inline-flex items-center justify-center w-64 h-64 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-800/40 to-yellow-800/40 rounded-full border-4 border-amber-600/50 shadow-2xl shadow-amber-900/50" />
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-6 bg-amber-300"
                        style={{
                          top: "10px",
                          left: "50%",
                          transformOrigin: "50% 86px",
                          transform: `translateX(-50%) rotate(${i * 30}deg)`,
                        }}
                      />
                    ))}
                    {/* Hour hand */}
                    <div
                      className="absolute w-1 h-12 bg-amber-400 rounded-full origin-bottom z-10"
                      style={{
                        bottom: "50%",
                        left: "50%",
                        transformOrigin: "50% 100%",
                        transform: `translateX(-50%) rotate(${(time.hours % 12) * 30 + time.minutes * 0.5}deg)`,
                      }}
                    />
                    {/* Minute hand */}
                    <div
                      className="absolute w-0.5 h-16 bg-yellow-300 rounded-full origin-bottom z-10"
                      style={{
                        bottom: "50%",
                        left: "50%",
                        transformOrigin: "50% 100%",
                        transform: `translateX(-50%) rotate(${time.minutes * 6}deg)`,
                      }}
                    />
                    {/* Second hand */}
                    <div
                      className="absolute w-px h-20 bg-red-400 rounded-full origin-bottom z-10"
                      style={{
                        bottom: "50%",
                        left: "50%",
                        transformOrigin: "50% 100%",
                        transform: `translateX(-50%) rotate(${time.seconds * 6}deg)`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-amber-200 text-2xl font-mono mb-4">
                  {String(time.hours).padStart(2, "0")}:
                  {String(time.minutes).padStart(2, "0")}:
                  {String(time.seconds).padStart(2, "0")} {time.ampm}
                </div>
              </>
            )}
          </div>

          <div className="text-center mb-16">
            <h1 className="font-serif text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-amber-100 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Pocket
              </span>
              <span className="block bg-gradient-to-r from-yellow-200 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                Watches
              </span>
            </h1>
            <p className="text-amber-200 text-xl max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Step into a world where time is not merely measured, but celebrated. Our collection of exquisite pocket watches represents the pinnacle of horological artistry.
            </p>
          </div>
        </div>
      </div>

      {/* Heritage Features */}
      <div className="container mx-auto px-4 mb-16">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-amber-100 mb-8">
              The Art of Timekeeping
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {heritageFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    selectedFeature === feature.id
                      ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-600/25"
                      : "bg-amber-900/30 text-amber-300 hover:bg-amber-800/40 border border-amber-700/40"
                  }`}
                >
                  <span className="text-lg">{feature.icon}</span>
                  {feature.title}
                </button>
              ))}
            </div>
            <div className="max-w-2xl mx-auto bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-8">
              <div className="text-6xl mb-4">
                {heritageFeatures.find((f) => f.id === selectedFeature)?.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-100 mb-4">
                {heritageFeatures.find((f) => f.id === selectedFeature)?.title}
              </h3>
              <p className="text-amber-200/80 text-lg leading-relaxed">
                {heritageFeatures.find((f) => f.id === selectedFeature)?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 pb-24">
        <div
          className={`transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-amber-100 mb-4">
              {products.length} Exquisite{" "}
              {products.length === 1 ? "Timepiece" : "Timepieces"}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group transform transition-all duration-600 hover:scale-105 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${900 + index * 120}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-amber-900/20 backdrop-blur-sm border border-amber-700/30 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/20 group-hover:bg-amber-900/30">
                  <ProductCard product={product} theme="amber" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
