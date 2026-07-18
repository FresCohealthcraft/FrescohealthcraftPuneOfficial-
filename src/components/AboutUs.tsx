import React from "react";

// @ts-ignore
import Natural from "../assets/images/Natural.png";
// @ts-ignore
import HealthFocused from "../assets/images/Health-Focused.png";
// @ts-ignore
import PremiumQuality from "../assets/images/Premium-Quality.png";
// @ts-ignore
import FastDelivery from "../assets/images/Fast_Delivery.png";

export default function AboutUs() {
  const BENEFITS = [
    {
      id: "benefit-natural",
      title: "100% Natural",
      desc: "Fresh fruits & vegetables with no preservatives or artificial ingredients.",
      image: Natural,
      icon: "🌿",
      bgColor: "bg-gradient-to-b from-[#E2EFE0] via-[#EBF3EC] to-[#F1F6F0]",
      borderColor: "border-[#CDE1CE]",
      glowColor: "hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]",
      topIcon: "🌱",
      topIconBg: "bg-emerald-600"
    },
    {
      id: "benefit-health",
      title: "Health Focused",
      desc: "Rich in vitamins, minerals & daily nutrition.",
      image: HealthFocused,
      icon: "🥤",
      bgColor: "bg-gradient-to-b from-[#F7F5EE] via-[#FAF8F3] to-[#FCFAF5]",
      borderColor: "border-[#E9E4D6]",
      glowColor: "hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)]",
      topIcon: "⚡",
      topIconBg: "bg-amber-600"
    },
    {
      id: "benefit-premium",
      title: "Premium Quality",
      desc: "Fresh ingredients sourced from trusted local farms.",
      image: PremiumQuality,
      icon: "⭐",
      bgColor: "bg-gradient-to-b from-[#FFFDF6] via-[#FAF6EA] to-[#FCFAF5]",
      borderColor: "border-[#E5D7B7]",
      glowColor: "hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]",
      topIcon: "💎",
      topIconBg: "bg-teal-600"
    },
    {
      id: "benefit-delivery",
      title: "Fast Delivery",
      desc: "Freshly prepared and delivered quickly while preserving nutrition.",
      image: FastDelivery,
      icon: "🚚",
      bgColor: "bg-gradient-to-b from-[#F4F5F4] via-[#FAFBF9] to-white",
      borderColor: "border-[#E3E5E3]",
      glowColor: "hover:shadow-[0_20px_50px_rgba(30,41,59,0.08)]",
      topIcon: "🛵",
      topIconBg: "bg-stone-800"
    }
  ];

  return (
    <section id="why-choose-us" className="relative py-20 sm:py-28 bg-[#FCFBF8] overflow-hidden scroll-mt-20">
      
      {/* Decorative leaf backgrounds for elegant presentation (Matching the shared image vibe) */}
      <div className="absolute top-0 left-0 w-72 h-72 opacity-5 pointer-events-none select-none -translate-x-12 -translate-y-12">
        <svg className="w-full h-full text-emerald-800" viewBox="0 0 100 100" fill="currentColor">
          <path d="M10,90 Q30,70 60,60 T90,20 Q70,40 60,70 T10,90 Z" />
          <path d="M30,70 Q45,55 65,50 Q55,60 50,75 Z" opacity="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-5 pointer-events-none select-none translate-x-12 translate-y-12 transform scale-x-[-1]">
        <svg className="w-full h-full text-emerald-800" viewBox="0 0 100 100" fill="currentColor">
          <path d="M10,90 Q30,70 60,60 T90,20 Q70,40 60,70 T10,90 Z" />
          <path d="M30,70 Q45,55 65,50 Q55,60 50,75 Z" opacity="0.8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block matching the exact typography and details of the shared image */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center space-x-2.5 mb-2 select-none">
            {/* Left Leaf branch decorative SVG */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-700/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22C2 22 8 20 12 16C12 16 14 18 16 18C18 18 20 15 20 15" />
              <path d="M12 16C12 16 16 12 18 8C20 4 22 2 22 2C22 2 20 4 16 8C12 12 8 16 8 16" />
              <path d="M8 16C8 16 6 14 4 14C2 14 2 16 2 16" />
              <path d="M14 10C14 10 16 8 18 6" />
              <path d="M10 14C10 14 12 12 14 10" />
            </svg>
            
            <h2 className="text-2xl sm:text-3xl font-serif text-[#113E21] font-bold tracking-tight">
              Why Choose
            </h2>
            
            {/* Right Leaf branch decorative SVG */}
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-700/60 transform scale-x-[-1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22C2 22 8 20 12 16C12 16 14 18 16 18C18 18 20 15 20 15" />
              <path d="M12 16C12 16 16 12 18 8C20 4 22 2 22 2C22 2 20 4 16 8C12 12 8 16 8 16" />
              <path d="M8 16C8 16 6 14 4 14C2 14 2 16 2 16" />
              <path d="M14 10C14 10 16 8 18 6" />
              <path d="M10 14C10 14 12 12 14 10" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-[#113E21] tracking-tight leading-tight">
            FresCo HealthCraft?
          </h1>
          
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Crafting Wellness. Delivering Freshness Every Day.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div id="benefits-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-6xl mx-auto justify-items-center">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              id={`card-${benefit.id}`}
              className={`${benefit.bgColor} w-full max-w-[250px] rounded-[1.25rem] sm:rounded-[1.75rem] p-3 sm:p-5 md:p-6 border ${benefit.borderColor} shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col items-center justify-between transition-all duration-500 ${benefit.glowColor} hover:-translate-y-2 group relative overflow-hidden backdrop-blur-md`}
            >
              
              {/* Optional Top-Left Badge (matching the gorgeous 100% natural card in reference) */}
              {benefit.id === "benefit-natural" && (
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs shadow-md border border-white sm:border-2 z-20 transition-transform duration-500 group-hover:scale-110">
                  🌱
                </div>
              )}

              {/* Graphic/Illustration Showcase block with high-end effects */}
              <div className="w-full h-24 sm:h-36 md:h-44 flex items-center justify-center relative mb-2 sm:mb-4">
                
                {/* Card 1: 100% Natural Visual */}
                {benefit.id === "benefit-natural" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Glass Bubble background matching reference exactly */}
                    <div className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-emerald-100/40 via-white/40 to-emerald-200/30 border border-white/60 shadow-md backdrop-blur-xs flex items-center justify-center" />
                    
                    {/* Floating mini highlight bubble */}
                    <div className="absolute -bottom-1 right-3 sm:right-6 md:right-12 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/50 border border-white/80 shadow-xs backdrop-blur-xs" />
                    
                    {/* Main Image Container */}
                    <div className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center z-10 transition-transform duration-700 ease-out group-hover:scale-110">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        referrerPolicy="no-referrer"
                        className="w-[90%] h-[90%] object-cover rounded-full filter drop-shadow-[0_8px_16px_rgba(16,185,129,0.12)]"
                      />
                    </div>
                  </div>
                )}

                {/* Card 2: Health Focused Visual */}
                {benefit.id === "benefit-health" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Orbit lines / circles */}
                    <div className="absolute w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-dashed border-amber-300/30 animate-[spin_24s_linear_infinite]" />
                    
                    {/* Orbiting Wellness Badges from Reference image */}
                    <div className="absolute left-1 top-1 sm:left-4 sm:top-4 md:left-6 md:top-6 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      🍎
                    </div>
                    <div className="absolute left-0 top-12 sm:left-2 sm:top-16 md:left-3 md:top-20 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      🥦
                    </div>
                    <div className="absolute left-6 bottom-0 sm:left-8 sm:bottom-1 md:left-10 md:bottom-1 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      🍃
                    </div>
                    
                    {/* Center Bottle with Zoom on Hover */}
                    <div className="relative w-10 h-18 sm:w-14 sm:h-26 md:w-18 md:h-32 lg:w-20 lg:h-36 flex items-center justify-center z-10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        referrerPolicy="no-referrer"
                        className="h-full object-contain filter drop-shadow-[0_10px_20px_rgba(212,175,55,0.15)]"
                      />
                    </div>

                    <div className="absolute right-1 top-0.5 sm:right-4 sm:top-2 md:right-6 md:top-3 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      💧
                    </div>
                    <div className="absolute right-0 top-11 sm:right-2 sm:top-15 md:right-3 md:top-20 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      💪
                    </div>
                    <div className="absolute right-6 bottom-0 sm:right-8 sm:bottom-1 md:right-10 md:bottom-1 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] z-10 hover:scale-110 transition-transform duration-300">
                      ❤️
                    </div>
                  </div>
                )}

                {/* Card 3: Premium Quality Visual */}
                {benefit.id === "benefit-premium" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Golden Framed Dish representing Premium Handpicked Food from Reference */}
                    <div className="relative w-18 h-18 sm:w-26 sm:h-26 md:w-32 md:h-32 lg:w-36 lg:h-36 p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#FFF3CC] to-[#D4AF37] rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] shadow-md border border-[#E3C89B]/50 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-[-1deg]">
                      <div className="w-full h-full rounded-[0.85rem] sm:rounded-[1.35rem] md:rounded-[1.55rem] overflow-hidden border border-white sm:border-2 bg-white flex items-center justify-center">
                        <img
                          src={benefit.image}
                          alt={benefit.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Card 4: Fast Delivery Visual */}
                {benefit.id === "benefit-delivery" && (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
                    {/* Dynamic horizontal speed trails */}
                    <div className="absolute left-1 w-8 h-0.5 bg-[#113E21]/10 rounded-full transform -skew-x-12 opacity-60 group-hover:translate-x-8 transition-transform duration-700" />
                    <div className="absolute left-0 top-10 sm:top-12 w-12 h-0.5 bg-emerald-500/10 rounded-full transform -skew-x-12 opacity-60 animate-pulse group-hover:translate-x-12 transition-transform duration-700" />
                    <div className="absolute left-2 bottom-8 sm:bottom-10 w-14 h-0.5 bg-amber-500/10 rounded-full transform -skew-x-12 opacity-60 group-hover:translate-x-6 transition-transform duration-700" />
                    
                    {/* Delivery Package Image with elegant tilt & zoom */}
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center z-10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-1">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        referrerPolicy="no-referrer"
                        className="w-[95%] h-[95%] object-cover rounded-xl sm:rounded-2xl shadow-md border border-stone-200/40 filter drop-shadow-md"
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer Info with gorgeous display pairing */}
              <div className="text-center mt-1 sm:mt-2 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-1.5 text-[#113E21] mb-1 sm:mb-1.5">
                  <span className="text-xs sm:text-sm select-none">{benefit.icon}</span>
                  <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-serif font-bold tracking-tight leading-tight">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-stone-600 font-medium leading-normal sm:leading-relaxed max-w-[240px] mx-auto line-clamp-3 sm:line-clamp-none">
                  {benefit.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
