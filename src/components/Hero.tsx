import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

// @ts-ignore
import ClassicDelightCupImg from "../assets/images/Classic-Delight-Cup.png";
// @ts-ignore
import ExoticDelightCupImg from "../assets/images/Exotic-Delight-Cup.png";
// @ts-ignore
import SproutsBowlImg from "../assets/images/Sprouts-Bowl.png";
// @ts-ignore
import PaneerSproutsBowlImg from "../assets/images/Paneer-Sprouts-Bowl.png";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto play slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      titleTop: "Nourish Your Body with",
      titleBottom: "Pure Wellness.",
      subtitle: "Fresh, healthy meals delivered daily.",
      buttonText: "ORDER NOW",
      // Image configuration
      mainImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop&auto=format&q=80", // Salad bowl
      overlayImage: ClassicDelightCupImg, // Fruit cup
      overlayScale: "scale-105 sm:scale-110",
      overlayOffset: "bottom-1 left-2 sm:left-4",
      mainRotation: "rotate-3",
    },
    {
      titleTop: "High Protein.",
      titleBottom: "SuperFood Bowls.",
      subtitle: "Sprout Bowl, Paneer Bowl Daily Energy.",
      buttonText: "ORDER NOW",
      mainImage: PaneerSproutsBowlImg, // Sprouts bowl
      overlayImage: SproutsBowlImg, // Wellness green drink
      overlayScale: "scale-[0.85] sm:scale-[0.9]",
      overlayOffset: "bottom-1 left-4 sm:left-6",
      mainRotation: "-rotate-2",
    },
    {
      titleTop: "Pure Juice,",
      titleBottom: "Pure You.",
      subtitle: "Natural, Fresh Healthy Juices.",
      buttonText: "ORDER NOW",
      mainImage: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&h=500&fit=crop&auto=format&q=80", // Premium juices background
      overlayImage: ExoticDelightCupImg, // Premium fruit cup
      overlayScale: "scale-100 sm:scale-105",
      overlayOffset: "bottom-2 left-2 sm:left-4",
      mainRotation: "rotate-0",
    }
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-6 border-b border-[#1A1A1A]/5">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Row Layout placing text/button on the left, and the sliding visual canvas on the right */}
        <div className="flex items-center justify-between gap-2 relative">
          
          {/* LEFT SIDE: Typography, CTA Button, Carousel Indicators */}
          <div className="flex-1 max-w-[55%] space-y-3 z-10 text-left">
            
            {/* Headline & Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-content-${activeSlide}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="space-y-1"
              >
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[40px] font-sans font-black tracking-tight leading-[1.15] text-[#1A1A1A]">
                  <span className="text-[#38A325] block">{current.titleTop}</span>
                  <span className="text-[#1A1A1A] block">{current.titleBottom}</span>
                </h1>
                
                <p className="text-gray-400 text-[11px] xs:text-xs sm:text-sm font-sans font-medium leading-relaxed">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Small Left-Aligned CTA Button */}
            <div className="pt-0.5">
              <button
                onClick={onExploreMenu}
                className="bg-[#38A325] hover:bg-[#2F891F] text-white px-5 sm:px-6 py-2 rounded-xl font-sans font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 transform active:scale-95 cursor-pointer border-none shadow-xs shrink-0"
              >
                <span>{current.buttonText}</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Left-Aligned Slider Dots (○ ● ○ selector under CTA button) */}
            <div className="flex items-center space-x-2 pl-1 pt-0.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? "bg-[#38A325] scale-110"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Compact Sliding Visual Canvas (Overlaps the right side elegantly) */}
          <div className="w-[45%] xs:w-[42%] max-w-[185px] sm:max-w-[220px] aspect-square relative flex items-center justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-content-${activeSlide}`}
                initial={{ opacity: 0, scale: 0.98, x: 5 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -5 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                {/* 1. MAIN BACKGROUND DISH (Salad bowl / Sprouts bowl) */}
                <div className="absolute right-0 top-1 w-[90%] aspect-square rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.03)] overflow-hidden border border-[#1A1A1A]/5 bg-white">
                  <motion.img
                    src={current.mainImage}
                    alt="Delicious wholesome gourmet dish prepared by FresCo"
                    className={`w-full h-full object-cover ${current.mainRotation}`}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 2. OVERLAYING FOREGROUND ITEM (Fruit Cup overlapping the bottom-left precisely) */}
                <div className="absolute bottom-0 -left-2 z-20 w-[45%] aspect-square flex items-center justify-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]">
                  <div className={`relative w-full h-full ${current.overlayScale} transition-transform`}>
                    <img
                      src={current.overlayImage}
                      alt="Complementary refresh wellness treat"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />

                    {/* Circular FresCo sticker badge on the cup center */}
                    
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

