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
import PaneerSproutsBowlImg from "../assets/images/Paneer-Power-Bowl.png";

// @ts-ignore
import PaneerPowerBowlImg from "../assets/images/Paneer-Power-Bowl.png";

// @ts-ignore
import chickenPowerBowlImg from "../assets/images/Chicken-Power-Bowl.png";

interface HeroProps {
  onExploreMenu: () => void;
}

// Subtle grid of dots to match the corner grid patterns in the shared image
const DotGrid = ({ className }: { className?: string; key?: any }) => (
  <svg 
    width="50" 
    height="50" 
    viewBox="0 0 50 50" 
    fill="none" 
    opacity="0.14" 
    className={`absolute pointer-events-none text-stone-600 ${className}`}
  >
    <circle cx="5" cy="5" r="1.5" fill="currentColor" />
    <circle cx="15" cy="5" r="1.5" fill="currentColor" />
    <circle cx="25" cy="5" r="1.5" fill="currentColor" />
    <circle cx="35" cy="5" r="1.5" fill="currentColor" />
    <circle cx="45" cy="5" r="1.5" fill="currentColor" />
    <circle cx="5" cy="15" r="1.5" fill="currentColor" />
    <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    <circle cx="25" cy="15" r="1.5" fill="currentColor" />
    <circle cx="35" cy="15" r="1.5" fill="currentColor" />
    <circle cx="45" cy="15" r="1.5" fill="currentColor" />
    <circle cx="5" cy="25" r="1.5" fill="currentColor" />
    <circle cx="15" cy="25" r="1.5" fill="currentColor" />
    <circle cx="25" cy="25" r="1.5" fill="currentColor" />
    <circle cx="35" cy="25" r="1.5" fill="currentColor" />
    <circle cx="45" cy="25" r="1.5" fill="currentColor" />
    <circle cx="5" cy="35" r="1.5" fill="currentColor" />
    <circle cx="15" cy="35" r="1.5" fill="currentColor" />
    <circle cx="25" cy="35" r="1.5" fill="currentColor" />
    <circle cx="35" cy="35" r="1.5" fill="currentColor" />
    <circle cx="45" cy="35" r="1.5" fill="currentColor" />
    <circle cx="5" cy="45" r="1.5" fill="currentColor" />
    <circle cx="15" cy="45" r="1.5" fill="currentColor" />
    <circle cx="25" cy="45" r="1.5" fill="currentColor" />
    <circle cx="35" cy="45" r="1.5" fill="currentColor" />
    <circle cx="45" cy="45" r="1.5" fill="currentColor" />
  </svg>
);

// High-end premium floating leaf SVG matching the shared image
const FloatingLeaf = ({ className, delay = 0 }: { className?: string; delay?: number; key?: any }) => (
  <motion.div
    animate={{ 
      y: [0, -5, 0],
      rotate: [0, 4, 0]
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute pointer-events-none z-30 ${className}`}
  >
    <svg 
      width="22" 
      height="22" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="text-[#2E7D32]/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
    >
      <path 
        d="M2 22C2 22 6 18 12 17C18 16 22 11 22 2C22 2 13 2 8 8C3 14 2 22 2 22Z" 
        fill="currentColor" 
      />
      <path 
        d="M2 22C2 22 8 15 15 11" 
        stroke="#1E4620" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  </motion.div>
);

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
      id: "slide_1",
      titleMarkup: (
        <>
          <span className="text-[#2E7D32] block">Nourish Your</span>
          <span className="text-[#2E7D32] block">Body with</span>
          <span className="text-[#1A1A1A] block">Pure Wellness.</span>
        </>
      ),
      subtitle: "Fresh Juices, Protein Bowls, Fruit Cups, Sprouts, and Wholesome Meals.",
      buttonText: "ORDER NOW",
      // Image Configuration
      mainImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&auto=format&q=80", // Salad bowl
      overlayImage: ClassicDelightCupImg, // Fruit cup
      overlayType: "fruit_cup",
      bgGradient: "from-[#EAF4EB] via-[#F3FAF4] to-[#E5F2E6]",
      bgCircleColor: "bg-[#D6ECD5]", // Lighter green circle behind bowl
      dotGrids: [
        { className: "top-4 right-4" },
        { className: "bottom-4 left-4" }
      ],
      leaves: [
        { className: "top-20 right-[42%] sm:right-[38%]", delay: 0.5 },
        { className: "bottom-10 right-4", delay: 1.2 }
      ]
    },
    {
      id: "slide_2",
      titleMarkup: (
        <>
          <span className="text-[#2E7D32] block">35g High-Quality</span>
          <span className="text-[#1A1A1A] block">Protein Meals.</span>
        </>
      ),
      subtitle: "Chicken Bowl, Paneer Bowl, Sprouts Bowl Daily Energy.",
      buttonText: "ORDER NOW",
      mainImage: chickenPowerBowlImg, // Grilled chicken protein bowl
      overlayImage: PaneerPowerBowlImg, // Paneer bowl for the polaroid frame
      overlayType: "polaroid",
      bgGradient: "from-[#E7F3F5] via-[#F2FAF9] to-[#DFECED]",
      bgCircleColor: "bg-[#D5EBEB]", // Lighter bluish-sage circle behind bowl
      dotGrids: [
        { className: "top-4 right-4" }
      ],
      leaves: [
        { className: "bottom-12 right-2", delay: 0.2 },
        { className: "top-14 right-[38%]", delay: 0.8 }
      ]
    },
    {
      id: "slide_3",
      titleMarkup: (
        <>
          <span className="text-[#2E7D32] block">Pure Juice,</span>
          <span className="text-[#1A1A1A] block">Pure You.</span>
        </>
      ),
      subtitle: "Natural, Fresh Healthy Juices.",
      buttonText: "ORDER NOW",
      mainImage: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&h=600&fit=crop&auto=format&q=80", // Orange juice selection
      overlayImage: ExoticDelightCupImg, // Premium fruit cup
      overlayType: "fruit_cup",
      bgGradient: "from-[#FEF7E8] via-[#FFFDF5] to-[#FAF3DD]",
      bgCircleColor: "bg-[#F7ECC0]", // Lighter golden cream circle behind juice
      dotGrids: [
        { className: "top-4 right-4" }
      ],
      leaves: [
        { className: "bottom-8 right-32 sm:right-40", delay: 0.4 },
        { className: "top-16 right-[35%]", delay: 1.1 }
      ]
    }
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative w-full overflow-hidden bg-white pt-2.5 pb-4 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Active slide styled beautifully with full-bleed content backgrounds matching shared image */}
        <div className={`relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden p-4 xs:p-5 sm:p-7 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.01)] border border-[#1A1A1A]/5 min-h-[190px] xs:min-h-[210px] sm:min-h-[260px] md:min-h-[290px] flex items-center transition-all duration-700 bg-gradient-to-br ${current.bgGradient}`}>
          
          {/* Subtle Dot Grids */}
          {current.dotGrids.map((dg, index) => (
            <DotGrid key={`dot-grid-${index}`} className={dg.className} />
          ))}

          {/* Floating leaves */}
          {current.leaves.map((l, index) => (
            <FloatingLeaf key={`leaf-${index}`} className={l.className} delay={l.delay} />
          ))}

          {/* Row Layout placing text/button on the left, and the sliding visual canvas on the right */}
          <div className="w-full flex items-center justify-between gap-4 md:gap-8 relative z-10">
            
            {/* LEFT SIDE: Typography, CTA Button, Carousel Indicators */}
            <div className="flex-1 max-w-[55%] sm:max-w-[50%] space-y-2.5 sm:space-y-3.5 text-left">
              
              {/* Headline & Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-content-${activeSlide}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <h1 className="text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-[34px] font-sans font-black tracking-tight leading-[1.12] text-[#1A1A1A]">
                    {current.titleMarkup}
                  </h1>
                  
                  <p className="text-stone-500 text-[9px] xs:text-[9.5px] sm:text-xs md:text-sm font-sans font-medium leading-relaxed max-w-sm sm:max-w-md">
                    {current.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Small Left-Aligned CTA Button */}
              <div className="pt-0.5">
                <button
                  onClick={onExploreMenu}
                  className="bg-[#2E7D32] hover:bg-[#1E4620] text-white px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full font-sans font-black text-[9px] sm:text-[10.5px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1 transform active:scale-95 cursor-pointer border-none shadow-sm shrink-0"
                >
                  <span>{current.buttonText}</span>
                  <span className="text-[10px] sm:text-xs font-bold">→</span>
                </button>
              </div>

              {/* Left-Aligned Slider Dots under CTA button exactly as per shared image layout */}
              <div className="flex items-center space-x-2 pl-1 pt-0.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx
                        ? "bg-[#2E7D32] scale-110"
                        : "bg-stone-300 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

            {/* RIGHT SIDE: Visual Canvas with overlapping products and background shape */}
            <div className="w-[45%] sm:w-[50%] max-w-[130px] sm:max-w-[210px] md:max-w-[250px] aspect-square relative flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-content-${activeSlide}`}
                  initial={{ opacity: 0, scale: 0.96, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.96, x: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* 1. Lighter background circle behind the bowl */}
                  <div className={`absolute w-[95%] h-[95%] rounded-full ${current.bgCircleColor} transition-colors duration-500`} />

                  {/* 2. MAIN BACKGROUND DISH */}
                  <div className="relative w-[85%] h-[85%] rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden border border-white/40 bg-white z-10">
                    <img
                      src={current.mainImage}
                      alt="Premium delicious wholesome dish prepared by FresCo"
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 3. OVERLAYING FOREGROUND ITEM */}
                  {current.overlayType === "polaroid" ? (
                    /* Elegant Polaroid frame representing the Paneer Bowl in Slide 2 */
                    <div className="absolute bottom-0 -left-2 z-20 w-[45%] aspect-square flex items-center justify-center drop-shadow-[0_8px_px_rgba(0,0,0,0.08)]">
                      <div className={`relative w-full h-full ${current.overlayScale} transition-transform`}>
                        <img
                          src={current.overlayImage}
                          alt="Special recipe bowl"
                          className="w-full h-full object-cover scale-[1.05]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Standard overlaying premium Fruit Cup precisely overlapping bottom-left */
                    <div className="absolute bottom-0 -left-3 sm:-left-6 z-20 w-[42%] aspect-square flex items-center justify-center drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
                      <img
                        src={current.overlayImage}
                        alt="Complementary refresh wellness treat"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
