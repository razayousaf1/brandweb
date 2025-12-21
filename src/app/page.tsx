"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone, MessageCircle, ArrowRight, Crown, Star, Sparkles, Heart, Shield, Award } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/data/products";

export default function Home() {
  // Featured products by ID
  const featuredProductIds = ["ring-1", "ring-2", "pendant-1", "pendant-2", "pendant-3", "pendant-4", "watch-1", "bag-1"];
  const featuredProducts = featuredProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const statsData = [
    { number: "500+", label: "Happy Kings", icon: Crown },
    { number: "1000+", label: "Pieces Crafted", icon: Sparkles },
    { number: "24/7", label: "Royal Support", icon: Shield },
    { number: "100%", label: "Satisfaction", icon: Award }
  ];

  const testimonials = [
    {
      quote: "Shahsawaar pieces don't just look expensive, they feel like heirlooms.",
      author: "Ahmed K.",
      role: "CEO, Tech Startup",
      rating: 5
    },
    {
      quote: "Finally found accessories that match my ambition and style.",
      author: "Hassan M.",
      role: "Creative Director", 
      rating: 5
    },
    {
      quote: "The quality and craftsmanship exceeded my expectations completely.",
      author: "Omar S.",
      role: "Investment Banker",
      rating: 5
    }
  ];

  return (
    <main className="w-full">
      {/* Enhanced Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 py-12 overflow-hidden">
        <Image
          src="/hero/website-banner1.jpg"
          alt="Banner"
          fill
          className="object-cover -z-20 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#800000]/30 -z-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-white/30 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-white/40 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-white/20 rounded-full animate-pulse hidden lg:block"></div>

        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div className="mb-8">
            <Crown className="w-16 h-16 mx-auto text-white mb-6 drop-shadow-lg" />
            <div className="flex items-center justify-center space-x-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-yellow-400 ml-2 font-semibold">Trusted by 500+ Kings</span>
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-extrabold mb-6 tracking-wide text-center">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Shahsawaar
            </span>
          </h1>
          
          <p className="text-2xl lg:text-3xl italic mb-4 text-center max-w-3xl mx-auto font-light">
            Where Royalty Meets Refinement
          </p>
          
          <p className="text-lg mb-12 text-center max-w-2xl mx-auto opacity-90 leading-relaxed">
            Discover premium accessories crafted for the modern king. Each piece tells a story of elegance, strength, and timeless masculinity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/rings"
              className="group px-10 py-4 bg-white text-[#800000] font-bold rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300 flex items-center"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#800000] transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Royal Essentials Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white text-black py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Crown className="w-6 h-6 text-[#800000]" />
              <span className="text-sm uppercase tracking-widest text-[#800000] font-semibold">Why Choose Shahsawaar</span>
              <Crown className="w-6 h-6 text-[#800000]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Our Royal <span className="text-[#800000]">Essentials</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The hallmarks of every Shahsawaar experience - where premium quality meets exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 - Enhanced */}
            <div className="group border-2 border-gray-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all duration-300 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#800000] to-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-base font-bold text-[#800000]">👑 24/7 Royal Support</span>
              </div>
              <div className="relative mb-6">
                <Image
                  src="/features/f6.png"
                  alt="Royal Support"
                  width={180}
                  height={180}
                  className="mx-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Always at Your Service</h3>
              <p className="text-gray-700 leading-relaxed">
                Our court is always open. Whether it's a question, styling advice, or delivery updates — we're here whenever you summon us.
              </p>
            </div>

            {/* Card 2 - Enhanced */}
            <div className="group border-2 border-gray-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all duration-300 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#800000] to-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-base font-bold text-[#800000]">👑 Luxury Within Reach</span>
              </div>
              <div className="relative mb-6">
                <Image
                  src="/features/f4.jpg"
                  alt="Luxury Within Reach"
                  width={180}
                  height={180}
                  className="mx-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Noble Pricing</h3>
              <p className="text-gray-700 leading-relaxed">
                Premium quality shouldn't break the bank. We craft luxury with fairness, making elegance accessible to every modern king.
              </p>
            </div>

            {/* Card 3 - Enhanced */}
            <div className="group border-2 border-gray-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all duration-300 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#800000] to-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-base font-bold text-[#800000]">✨ Personal Styling</span>
              </div>
              <div className="relative mb-6">
                <Image
                  src="/features/f2.jpg"
                  alt="Personalized Styling Advice"
                  width={180}
                  height={180}
                  className="mx-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
              <p className="text-gray-700 leading-relaxed">
                Need styling advice for a royal occasion? Our experts provide personalized recommendations to match your unique aura.
              </p>
            </div>

            {/* Card 4 - Enhanced */}
            <div className="group border-2 border-gray-100 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all duration-300 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#800000] to-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              
              <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-base font-bold text-[#800000]">🎁 Premium Packaging</span>
              </div>
              <div className="relative mb-6">
                <Image
                  src="/features/f3.jpg"
                  alt="Good Vibes in a Box"
                  width={180}
                  height={180}
                  className="mx-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Royal Unboxing</h3>
              <p className="text-gray-700 leading-relaxed">
                Every order arrives in luxurious branded packaging, creating an unforgettable unboxing experience worthy of royalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Collection Section */}
      <section className="w-full bg-white text-black py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#800000]" />
              <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Featured Collection</span>
              <Sparkles className="w-6 h-6 text-[#800000]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="text-[#800000]">DRIPS '25</span> FOR OUR KINGS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked pieces that define modern royalty. Each item represents the pinnacle of craftsmanship and style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/details/${product.id}`}
                className="group border-2 border-gray-100 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl hover:border-[#800000]/20 transition-all duration-300 block bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#800000] text-white px-3 py-1 rounded-bl-lg rounded-tr-3xl text-xs font-semibold">
                  FEATURED
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-red-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={280}
                    className="mx-auto rounded-xl group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Shahsawaar</p>
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#800000] transition-colors">{product.name}</h4>
                  <div className="flex justify-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-[#800000]">{formatPrice(product.price)}</p>
                  
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/bracelets"
              className="inline-flex items-center px-8 py-4 bg-[#800000] text-white font-bold rounded-full hover:bg-red-800 transition-all duration-300 shadow-lg group"
            >
              View All Collections
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="w-full bg-gray-900 text-white py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-white" />
              <span className="text-sm uppercase tracking-widest text-gray-300 font-semibold">Testimonials</span>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              What Our <span className="text-[#800000]">Kings</span> Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-[#800000]/50 transition-all duration-300">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Banners Section */}
      <section className="w-full bg-white text-black py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* 2 Big Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Banner 1 */}
            <Link
              href="/gifts"
              className="group relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/banner/forhim.png"
                alt="Gifts for Him"
                width={600}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#800000]/30 flex flex-col justify-center items-center text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-3xl font-bold mb-2">Gifts for Him</h3>
                <p className="text-yellow-400 font-semibold text-lg mb-4">Handpicked Jewellery Sets</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">Explore Gifts</span>
                </div>
              </div>
            </Link>

            {/* Banner 2 */}
            <Link
              href="/collection"
              className="group relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/banner/advice.png"
                alt="Featured This Month"
                width={600}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#800000]/30 flex flex-col justify-center items-center text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-3xl font-bold mb-2">Featured This Month</h3>
                <p className="text-yellow-400 font-semibold text-lg mb-4">The King's Picks</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">Shop Now</span>
                </div>
              </div>
            </Link>
          </div>

          {/* 4 Category Cards */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Shop by <span className="text-[#800000]">Category</span></h2>
              <p className="text-xl text-gray-600">Discover the perfect piece for every occasion</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { href: "/rings", img: "/banner/rings.jpg", title: "Rings", subtitle: "Stack It. Flex It" },
                { href: "/bracelets", img: "/banner/bracelets.jpg", title: "Bracelets", subtitle: "Strap In. King" },
                { href: "/pendants", img: "/banner/pendants.jpg", title: "Pendants", subtitle: "Hang The Heat" },
                { href: "/pocket-watches", img: "/banner/pocket.jpg", title: "Pocket Watches", subtitle: "Flex The Past" }
              ].map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={category.img}
                    alt={category.title}
                    width={400}
                    height={300}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-1">{category.title}</h3>
                    <p className="text-yellow-400 font-semibold mb-4">{category.subtitle}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white text-black py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Form */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
              <div className="mb-8">
                <Crown className="w-12 h-12 text-[#800000] mb-4" />
                <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                  Connect with <br />the <span className="text-[#800000]">Royal Court</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Have questions? Need styling advice? We're here to help you find your perfect piece.
                </p>
              </div>
              
              <form 
                action="https://formspree.io/f/xgvlpgwd" 
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="w-full border-b-2 border-gray-200 focus:border-[#800000] focus:outline-none py-3 text-lg bg-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="w-full border-b-2 border-gray-200 focus:border-[#800000] focus:outline-none py-3 text-lg bg-transparent"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-[#800000] focus:outline-none py-3 text-lg bg-transparent"
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can serve you..."
                  rows={4}
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-[#800000] focus:outline-none py-3 text-lg bg-transparent resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="group w-full bg-[#800000] text-white px-8 py-4 rounded-full hover:bg-red-800 transition-all duration-300 font-bold text-lg flex items-center justify-center shadow-lg"
                >
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Your satisfaction is our highest priority. Reach out through any channel that suits your preference.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-[#800000]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#800000]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Royal Hotline</p>
                    <p className="text-gray-700">+92 314 8812243</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-[#800000]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#800000]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Royal Mail</p>
                    <p className="text-gray-700">shahsawaarofficial25@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <p className="text-lg font-semibold text-gray-900 mb-6">Follow Our Royal Journey</p>
                <div className="flex space-x-6">
                  <Link href="https://www.instagram.com" target="_blank" 
                    className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </Link>
                  <Link href="mailto:shahsawaarofficial25@gmail.com" target="_blank"
                    className="w-14 h-14 bg-gradient-to-br from-[#800000] to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <Mail className="w-7 h-7 text-white" />
                  </Link>
                  <Link href="https://wa.me/923148812243" target="_blank"
                    className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <MessageCircle className="w-7 h-7 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Signup */}
      <section className="bg-gradient-to-r from-[#800000] to-red-800 text-white py-20 px-6 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Crown className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Join the <span className="text-yellow-400">Royal Circle</span>
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Be the first to discover new collections, exclusive offers, and styling tips crafted for kings.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your royal email address"
                className="flex-grow px-6 py-4 rounded-full text-black bg-white border-2 border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="group bg-yellow-500 hover:bg-yellow-400 px-8 py-4 rounded-full font-bold text-black text-lg transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                Join Now
                <Crown className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </form>
            
            <div className="text-center mt-8">
              <div className="flex items-center justify-center space-x-6 text-red-200">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">No Spam</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Exclusive Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span className="text-sm">VIP Treatment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-red-200">Royal Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">Weekly</div>
              <div className="text-red-200">Style Updates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">First</div>
              <div className="text-red-200">Access to Drops</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}