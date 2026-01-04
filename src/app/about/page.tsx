"use client";

import { Crown, Gem, Shield, Award, Users, Globe, ArrowRight, Star, Check } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Crown,
      title: "Premium Materials & Craftsmanship",
      description: "Each piece is made using only the finest materials, blending quality with timeless design.",
      image: "/banner/about1.png"
    },
    {
      icon: Gem,
      title: "Timeless Design Philosophy",
      description: "Our designs merge heritage with modern aesthetics for the discerning gentleman.",
      image: "/banner/about2.png"
    },
    {
      icon: Shield,
      title: "Lifetime Quality Guarantee",
      description: "We stand behind every creation with a comprehensive quality guarantee.",
      image: "/banner/about3.png"
    }
  ];

  const processSteps = [
    {
      step: "Design",
      description: "Concepts and sketches that balance elegance, strength, and modern style.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
      step: "Materials",
      description: "Carefully selected metals, leathers, and gemstones for perfection.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      step: "Crafting",
      description: "Skilled artisans handcraft each piece with precision and attention to detail.",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    },
    {
      step: "Quality",
      description: "Every item undergoes rigorous checks before reaching you.",
      image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
  ];

  const achievements = [
    { number: "2025", label: "Founded" },
    { number: "100+", label: "Handcrafted Pieces" },
    { number: "50+", label: "Happy Clients" },
    { number: "24/7", label: "Customer Support" }
  ];

  const testimonialHighlights = [
    "Exceptional craftsmanship that speaks to the soul",
    "Each piece tells a story of elegance and strength",
    "Premium quality that stands the test of time"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900"
          style={{
            backgroundImage: `linear-gradient(rgba(128,0,32,0.85), rgba(128,0,32,0.85)), url('/banner/tent.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-maroon-900/20" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <Crown className="w-16 h-16 mx-auto text-white mb-4" />
          </div>
          <h1 className="font-serif text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Shahsawaar
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-light">
            Drips for the New King
          </p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Elevating men's accessories with elegance, strength, and timeless style since 2025
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{achievement.number}</div>
                <div className="text-gray-300">{achievement.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Story - Enhanced with Visual Elements */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <span className="text-red-900 font-semibold text-lg tracking-wider uppercase">Our Heritage</span>
                <h2 className="font-serif text-5xl font-bold text-gray-900 mt-2 mb-6">
                  The Story of a <span className="text-red-900">Valiant Rider</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-800">
                  Founded in 2025 and rooted in the cultural richness of Lahore, Shahsawaar represents more than just premium accessories — we embody a legacy.
                </p>
                <p>
                  <strong className="text-red-900">"Shahsawaar"</strong> — a Persian term meaning "a valiant rider" — speaks to the leader within every modern gentleman. Our brand channels this spirit of courage, strength, and nobility into every meticulously crafted piece.
                </p>
                <p>
                  From commanding rings that speak of power to elegant bracelets that whisper sophistication, from meaningful pendants that tell your story to premium crossbody bags that carry your essentials with style — each creation is designed for those who don't just follow trends, they set them.
                </p>
                
                <div className="pt-6">
                  <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">What Sets Us Apart</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonialHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-red-900 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <img
                  src="/banner/tent1.png"
                  alt="Master craftsman working on premium jewelry"
                  className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
                
                <div className="absolute -bottom-8 -left-8 bg-red-900 text-white p-8 rounded-2xl shadow-2xl">
                  <p className="font-serif text-xl font-bold">
                    Crafting Excellence<br />
                    <span className="text-red-200">Since 2025</span>
                  </p>
                </div>
                
                <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <Star className="w-8 h-8 text-red-900 mb-2" />
                  <p className="font-semibold text-gray-900">Premium Quality</p>
                  <p className="text-sm text-gray-600">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values - Enhanced Cards */}
      <section className="py-24 bg-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-white font-semibold text-lg tracking-wider uppercase">Our Foundation</span>
            <h2 className="font-serif text-5xl font-bold mt-2 mb-6">
              Mission & Values
            </h2>
            <p className="text-xl text-red-100 max-w-4xl mx-auto leading-relaxed">
              Every Shahsawaar creation is guided by unwavering principles of excellence, embodying the perfect fusion of traditional craftsmanship and contemporary sophistication.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-800 to-red-900 border border-red-700 hover:border-white/50 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-900/50 to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-red-900" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold mb-4 text-white group-hover:text-red-200 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-red-100 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process - Visual Timeline */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-red-900 font-semibold text-lg tracking-wider uppercase">Our Process</span>
            <h2 className="font-serif text-5xl font-bold text-gray-900 mt-2 mb-6">
              Craftsmanship Journey
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Behind every Shahsawaar piece lies a meticulous process that honors traditional techniques while embracing modern precision and innovation.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-red-800 to-red-900 hidden lg:block"></div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-12`}>
                  <div className="lg:w-1/2 relative">
                    <div className="relative group">
                      <img
                        src={step.image}
                        alt={step.step}
                        className="rounded-2xl shadow-2xl w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-2xl" />
                    </div>
                  </div>

                  <div className="lg:w-1/2 relative">
                    {/* ✅ Removed the timeline dot completely */}
  
                     <div className={`${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'} text-center lg:text-left`}>
                      {/* ✅ Removed the mobile dot too */}
    
                      <h3 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                           {step.step}
                      </h3>
                       <p className="text-xl text-gray-700 leading-relaxed">
                           {step.description}
                       </p>
                     </div>
                   </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(128,0,32,0.95) 0%, rgba(153,27,27,0.95) 100%), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Crown className="w-16 h-16 mx-auto mb-8 text-white" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Begin Your Legacy
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto font-light">
            Ready to discover accessories that embody the spirit of a valiant rider? Your journey toward timeless elegance starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/pendants"
              className="group inline-flex items-center bg-white text-red-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
            >
              Explore Collections
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/shahsawaarofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-900 transition-all duration-300"
            >
              <Users className="mr-2 w-5 h-5" />
              Connect With Us
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Lifetime Guarantee</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Master Crafted</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Global Heritage</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Personal Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}