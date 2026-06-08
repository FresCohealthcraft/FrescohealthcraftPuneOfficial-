import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Leaf, Sparkles, Heart } from "lucide-react";

interface FruitSlide {
  id: number;
  name: string;
  emoji: string;
  badge: string;
  description: string;
  primaryBenefit: string;
  vitamins: string[];
  color: string;
  glowColor: string;
  category: string;
}

const FRUIT_SLIDES: FruitSlide[] = [
  {
    id: 1,
    name: "Vibrant Country Oranges",
    emoji: "🍊",
    badge: "Immunity Shield",
    description: "Sourced locally from premium orchards, our country oranges undergo standard low-temperature pressing to preserve pure Vitamin C, ensuring maximum immune defense and vital cell hydration.",
    primaryBenefit: "Fights cellular fatigue, stimulates organic collagen, and delivers instant bio-available energy.",
    vitamins: ["Vitamin C", "Folate", "Beta-Carotene", "Potassium"],
    color: "from-orange-400 to-amber-500",
    glowColor: "rgba(243, 156, 18, 0.25)",
    category: "Fruit Juices",
  },
  {
    id: 2,
    name: "Crisp Green Apples",
    emoji: "🍏",
    badge: "Digestive Cleanse",
    description: "Cold-extracted green granny smith apples that retain their precious prebiotic fibers and natural pectin to gently stimulate hepatic function and boost your gut intelligence.",
    primaryBenefit: "Lowers blood lipemia, stabilizes healthy sugar levels, and clears gastrointestinal heat.",
    vitamins: ["Pectin Enzyme", "Vitamin K", "Polyphenols", "Iron"],
    color: "from-emerald-400 to-green-500",
    glowColor: "rgba(46, 204, 113, 0.25)",
    category: "Fruit Juices",
  },
  {
    id: 3,
    name: "Ripe Ruby Pomegranates",
    emoji: "🍎",
    badge: "Antioxidant Powerhouse",
    description: "Pre-checked rich seeds delivering deep red punicalagins. Punicalagins have three times the antioxidant activity of red wine or green tea to support vascular elasticity.",
    primaryBenefit: "Protects cardiac lining, enhances hemoglobin levels, and defends against free-radical damage.",
    vitamins: ["Polyphenols", "Vitamin E", "Folic Acid", "Potassium"],
    color: "from-red-500 to-rose-600",
    glowColor: "rgba(231, 76, 60, 0.25)",
    category: "Fresco Power Juices",
  },
  {
    id: 4,
    name: "Farm-Fresh Cucumber, Mint & Ginger",
    emoji: "🥒",
    badge: "Hydration Booster",
    description: "An alkaline botanical trifecta loaded with cooling chlorophyll, digestive gingerol, and natural structuring mineral silica to refresh your system on hot days.",
    primaryBenefit: "Regulates internal temperature, flushes metabolic acids, and reduces system bloating.",
    vitamins: ["Chlorophyll", "Silica Mineral", "Gingerol", "Vitamin A"],
    color: "from-teal-400 to-emerald-500",
    glowColor: "rgba(26, 188, 156, 0.25)",
    category: "Green Vitality Juice",
  },
  {
    id: 5,
    name: "Rich Sun-Kissed Mangoes",
    emoji: "🥭",
    badge: "Tropical Vitality",
    description: "Selected hand-harvested Alphonso slices containing natural enzymes like amylase and high concentrations of carotenoids that promote eye performance and cellular recovery.",
    primaryBenefit: "Sustains clean physical energy, supports vision longevity, and beautifies dermal tissues.",
    vitamins: ["Vitamin A", "Vitamin E", "Amylase Enzymes", "Copper"],
    color: "from-yellow-400 to-orange-500",
    glowColor: "rgba(241, 196, 15, 0.25)",
    category: "Shakes",
  },
  {
    id: 6,
    name: "Deep Blood Beetroot",
    emoji: "🥬",
    badge: "Cellular Nitrates",
    description: "Earth-purified red beets that contain essential dietary nitrates. These nitrates readily convert into nitric oxide to naturally increase vasodilation and sport performance.",
    primaryBenefit: "Maximizes oxygen delivery, reduces muscle recovery intervals, and sharpens cognitive processing.",
    vitamins: ["Nitrates", "Natural Betanin", "Vitamin B6", "Manganese"],
    color: "from-fuchsia-500 to-purple-600",
    glowColor: "rgba(155, 89, 182, 0.25)",
    category: "Fresco Power Juices",
  }
];

interface FruitSliderProps {
  onSelectItem: (category: string) => void;
}

export default function FruitSlider({ onSelectItem }: FruitSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto sliding carousel rotation trace
  useEffect(() => {
    const handleAutoPlay = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardWidth = 296; // 280px item width + 16px gap
        
        let nextScroll = scrollLeft + cardWidth;
        if (nextScroll >= maxScroll + 10) {
          nextScroll = 0;
        }
        
        scrollContainerRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    };

    const interval = setInterval(handleAutoPlay, 5500);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 296;
      const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = 296;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), FRUIT_SLIDES.length - 1));
    }
  };

  const handleSelectDot = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 296;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#F2FAED] via-white to-white border-b border-[#1A1A1A]/5">
      
      {/* Soft aesthetic leaf/light layout accent circles */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#38A325]/3 blur-3xl pointer-events-none -z-15" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-amber-500/3 blur-3xl pointer-events-none -z-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Section context */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 border border-[#38A325]/25 text-[#38A325] bg-white px-4 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_2px_12px_rgba(56,163,37,0.03)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Ingredients &amp; Sourcing</span>
          </div>

          <h2 className="text-2xl sm:text-3.5xl font-serif text-[#1A1A1A] leading-tight tracking-tight">
             Premium Sourced Ingredients
          </h2>
          
          <p className="text-xs sm:text-sm text-[#1A1A1A]/60 max-w-xl leading-relaxed">
            Click on any small rectangular recipe card below to instantly filter our Pune express delivery menu and discover compatible combinations!
          </p>
        </div>

        {/* Carousel Horizontal Card Track Container */}
        <div className="relative mx-auto mt-4 px-2 select-none group">
          
          {/* Main Horizontal scrolling track: list of 4 cards on desktop */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {FRUIT_SLIDES.map((slide) => (
              <div
                key={slide.id}
                onClick={() => onSelectItem(slide.category)}
                className="w-[280px] h-[195px] shrink-0 bg-white border border-[#1A1A1A]/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#38A325]/45 hover:shadow-lg transition-all duration-300 relative overflow-hidden snap-start cursor-pointer group/card"
              >
                {/* Micro corner dynamic color highlight block */}
                <div 
                  className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: slide.glowColor }}
                />

                <div className="space-y-2.5">
                  {/* Card Header row */}
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F2EE] border border-[#1A1A1A]/5 flex items-center justify-center text-xl shadow-sm group-hover/card:scale-110 transition-transform duration-300 shrink-0">
                      {slide.emoji}
                    </div>
                    
                    <div className="text-left min-w-0">
                      <h4 className="font-serif italic font-bold text-[#1A1A1A] text-xs sm:text-[13px] tracking-tight truncate group-hover/card:text-[#38A325] transition-colors">
                        {slide.name}
                      </h4>
                      <span className="inline-block text-[8px] font-extrabold uppercase tracking-widest bg-[#38A325]/8 text-[#38A325] border border-[#38A325]/10 px-1.5 py-0.5 rounded mt-0.5">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  {/* Benefit details line-clamp description */}
                  <p className="text-[10.5px] text-[#1A1A1A]/65 leading-relaxed text-left">
                    {slide.description}
                  </p>
                </div>

                {/* Footer and key micro elements */}
                <div className="space-y-1.5 border-t border-[#1A1A1A]/5 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {slide.vitamins.slice(0, 3).map((vit, idx) => (
                      <span 
                        key={idx} 
                        className="bg-[#EFECE5]/40 border border-[#1A1A1A]/5 px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-0.5"
                      >
                        <span className="text-[7.5px]">🧬</span> {vit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-[#1A1A1A]/40 mt-1">
                    <span className="text-[9.2px] text-[#38A325] lowercase italic font-medium font-serif">
                      {slide.category}
                    </span>
                    <span className="flex items-center space-x-0.5 group-hover/card:text-[#38A325] transition-colors">
                      <span>Explore formulas</span>
                      <span className="group-hover/card:translate-x-0.5 transition-transform inline-block">➔</span>
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Scrolling Left/Right Chevron Controller Handles */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none z-10 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scroll("left")}
              className="w-8.5 h-8.5 rounded-full bg-white border border-[#1A1A1A]/10 hover:border-[#38A325] text-[#1A1A1A] hover:text-[#38A325] flex items-center justify-center shadow-md pointer-events-auto cursor-pointer active:scale-95 transition-all -ml-1 sm:-ml-4 bg-white/95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8.5 h-8.5 rounded-full bg-white border border-[#1A1A1A]/10 hover:border-[#38A325] text-[#1A1A1A] hover:text-[#38A325] flex items-center justify-center shadow-md pointer-events-auto cursor-pointer active:scale-95 transition-all -mr-1 sm:-mr-4 bg-white/95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Small Dot Selection progress Indicator Bar */}
          <div className="flex justify-center space-x-2 mt-5">
            {FRUIT_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelectDot(index)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? "w-6 bg-[#38A325]" : "w-1.5 bg-[#1A1A1A]/15 hover:bg-[#1A1A1A]/35"
                }`}
                aria-label={`Go to slide index ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
