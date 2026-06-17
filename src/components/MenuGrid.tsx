import { useState } from "react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Leaf } from "lucide-react";

interface MenuProps {
  onAddToCartDirectly: (item: MenuItem) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CATEGORIES = [
  { name: "FRUIT JUICES", emoji: "🍊", value: "Fruit Juices" },
  { name: "GREEN VITALITY JUICE", emoji: "🥤", value: "Green Vitality Juice" },
  { name: "POWER CUPS", emoji: "🥤", value: "Power Cups" },
  { name: "SUPER FOOD SPROUTS BOWLS", emoji: "🌱", value: "Super Food Sprouts Bowls" },
  { name: "FRESCO POWER JUICES", emoji: "🥤", value: "Fresco Power Juices" },
  { name: "SHAKES", emoji: "🥤", value: "Shakes" },
  { name: "Choco Signature", emoji: "🌟", value: "Specials" }
];

export default function MenuGrid({ 
  onAddToCartDirectly,
  searchTerm,
  setSearchTerm
}: MenuProps) {
 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = item.name.toLowerCase().includes(searchLower) ||
                          item.description.toLowerCase().includes(searchLower) ||
                          item.category.toLowerCase().includes(searchLower);
    
    if (searchTerm && !matchesSearch) {
      return false;
    }
    
    if (selectedCategory) {
      const catMapping = CATEGORIES.find(c => c.name === selectedCategory);
      if (catMapping) {
        return item.category === catMapping.value;
      }
    }
    
    return true;
  });

  return (
    <section id="menu" className="pt-2 pb-3 bg-gradient-to-b from-[#F2FAED] via-white to-[#FCFDFC] scroll-mt-10 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Our Menu Badge */}
        <div className="inline-flex items-center justify-center border border-[#FFFF00]/30 text-[#ffffff] bg-[#e47200]/100 px-3 py-1 rounded-full text-[15px] font-semibold uppercase tracking-wider mb-2">
          Our Menu
        </div>

        {/* Display Headings */}
        <h2 className="text-xl sm:text-1xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Freshly Crafted for Every Wellness Goal
        </h2>
        <p className="mt-1 text-[#1A1A1A]/70 max-w-md mx-auto text-xs sm:text-sm">
        Explore our selection of fresh juices, wellness drinks, sprouts bowls, fruit cups, protein cups, shakes, and healthy delights.       
         </p>

        {/* Search Bar */}
        <div className="mt-4 max-w-md mx-auto relative px-4">
          <input
            type="text"
            placeholder="Search healthy juices, smoothies, ingredients..."
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              if (val.trim() !== "") {
                setSelectedCategory(null);
              }
            }}
            className="w-full pl-11 pr-10 py-3 border border-[#1A1A1A]/15 rounded-full focus:outline-none focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] text-sm bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-8 top-3.5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-8 top-3.5 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors focus:outline-none p-0.5 cursor-pointer text-xs font-bold"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Top categories pill filters - wrapped and centered on all screens to prevent horizontal overflow */}
        <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 max-w-4xl mx-auto mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                className={`py-1.5 sm:py-2 px-3 sm:px-4 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest cursor-pointer rounded-full transition-all duration-350 flex items-center space-x-1 sm:space-x-1.5 shadow-xs active:scale-95 border ${
                  isActive
                    ? "bg-[#38A325] text-white border-[#38A325] shadow-sm"
                    : "bg-white text-[#1A1A1A]/90 border-[#1A1A1A]/10 hover:bg-neutral-50"
                }`}
              >
                <span className="shrink-0 select-none text-xs sm:text-sm">{cat.emoji}</span>
                <span>{cat.name}</span>
                {isActive && <span className="ml-1 text-[8px] sm:text-[9px] text-white/80">✕</span>}
              </button>
            );
          })}
        </div>

        {/* Guided placeholder screen matching the shared image layout */}
        {!selectedCategory && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="mt-4 bg-white border border-[#1A1A1A]/10 rounded-[2rem] pt-5 px-5 pb-4 sm:pt-7 sm:px-8 sm:pb-5 max-w-xl mx-auto shadow-[0_4px_30px_rgba(26,26,26,0.01)] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Ambient background decoration */}
            <div className="absolute -top-24 -left-24 w-40 h-40 rounded-full bg-[#38A325]/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-40 h-40 rounded-full bg-[#EFECE5]/40 blur-3xl pointer-events-none" />

            {/* Bouncing gold index finger pointing down */}
            <motion.div
              animate={{ 
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl sm:text-5xl select-none filter drop-shadow-sm mb-3"
            >
              👇
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-tight leading-tight font-extrabold animate-fade-in">
              Explore Our Wellness Menu
            </h3>
            
            <p className="mt-2 text-[11px] sm:text-xs text-[#1A1A1A]/60 max-w-md leading-relaxed">
Every item is thoughtfully prepared using premium natural ingredients to deliver freshness, flavor, and balanced nutrition in every sip and bite.
            </p>

            {/* Inner categories rectangular buttons matching the inner grid in standard mockup */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg z-10">
              {CATEGORIES.map((cat, idx) => {
                // Determine label to fit inside the inner box (e.g., "FRUIT", "FRESCO POWER" to match the screenshot)
                let cardLabel = cat.name;
                if (cat.name === "FRUIT JUICES") cardLabel = "FRUIT";
                else if (cat.name === "GREEN VITALITY JUICE") cardLabel = "GREEN VITALITY";
                else if (cat.name === "SUPER FOOD SPROUTS BOWLS") cardLabel = "SPROUTS BOWLS";
                else if (cat.name === "FRESCO POWER JUICES") cardLabel = "FRESCO POWER";

                return (
                  <motion.button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 14,
                      delay: idx * 0.04
                    }}
                    whileHover={{ 
                      scale: 1.015, 
                      y: -1,
                      borderColor: "rgba(56,163,37,0.3)",
                      backgroundColor: "rgba(239,236,229,0.3)"
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="py-1.5 px-2 text-[9.5px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#F9F8F4] text-[#1A1A1A]/90 border border-[#1A1A1A]/10 rounded-lg cursor-pointer transition-all flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span className="text-sm xs:text-base select-none shrink-0">{cat.emoji}</span>
                    <span className="truncate">{cardLabel}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Menu Items Grid - Only rendered when category is selected or searching */}
        {(selectedCategory || searchTerm) && (
          <motion.div 
            layout
            className="mt-6 sm:mt-8 grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 px-1 sm:px-2 max-w-4xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 140, 
                  damping: 16,
                  delay: (index % 3) * 0.03 
                }}
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 20px -6px rgba(26,26,26,0.06)"
                }}
                key={item.id}
                className="bg-white border border-[#1A1A1A]/10 rounded-[16px] p-2.5 sm:p-4 shadow-[0_1.5px_10px_rgba(0,0,0,0.01)] hover:border-[#38A325]/30 transition-all duration-300 flex flex-col justify-between h-full text-left group"
              >
                <div>
                  
                  {/* Image/Emoji wrapper Container */}
                  <div className="relative w-full aspect-[4/3] rounded-xl bg-[#EFECE5] select-none flex items-center justify-center text-3xl sm:text-4xl mb-2.5 sm:mb-3.5 overflow-hidden transition-transform group-hover:scale-[1.01] duration-300">
                    {item.image ? (
                      <img 
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="transition-transform duration-300 group-hover:rotate-6">
                        {item.icon}
                      </span>
                    )}
                    
                    {/* Popular Tag Badge */}
                    {item.popular && (
                      <span className="absolute top-1.5 right-1.5 bg-[#F26419] text-white text-[6.5px] xs:text-[7.5px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-widest">
                        Popular
                      </span>
                    )}
 
                    {/* Quick healthy nutrition overlay symbol */}
                    <span className="absolute bottom-1.5 left-1.5 text-[6.5px] xs:text-[7.5px] sm:text-[8px] font-bold text-[#38A325] bg-white/90 border border-[#1A1A1A]/5 px-1 py-0.5 rounded flex items-center gap-0.5 scale-90 uppercase tracking-wider">
                      <Leaf className="w-2 h-2 text-[#38A325]" />
                      <span>Pure</span>
                    </span>

                  </div>
   
                  {/* Title & Description */}
                  <h3 className="text-xs xs:text-sm sm:text-[15px] font-extrabold text-[#1A1A1A] group-hover:text-[#38A325] transition-colors duration-200 leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-[#1A1A1A]/60 leading-normal select-none">
                    {item.description}
                  </p>
                </div>
 
                {/* Bottom line with price and action column (Add to Cart + Order in one line) */}
                <div className="mt-3.5 pt-2 border-t border-[#1A1A1A]/5 flex flex-row items-center justify-between gap-1.5 w-full">
                  <div className="flex flex-col shrink-0">
                    <span className="text-sm xs:text-base sm:text-lg font-bold font-serif text-[#38A325] leading-none">
                      ₹{item.price}
                    </span>
                    <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A]/40 mt-0.5 leading-none">
                      per serving
                    </span>
                  </div>
 
                  <div className="flex flex-row items-center gap-1 shrink-0">
                    {/* Add to Cart Button */}
                     <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartDirectly(item);
                      }}
                      className="w-7 h-7 sm:w-8.5 sm:h-8.5 bg-[#1A1A1A] hover:bg-[#38A325] active:bg-[#111111] text-white rounded-full flex items-center justify-center cursor-pointer transition-all border border-transparent shadow-xs active:scale-95 hover:scale-105 shrink-0"
                      title="Add to Cart"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
 
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

        {filteredItems.length === 0 && (
          <div className="mt-12 bg-white rounded-3xl p-10 max-w-md mx-auto border border-[#1A1A1A]/10">
            <span className="text-5xl">🥤</span>
            <p className="mt-4 text-[#1A1A1A] font-bold text-sm">No juices match your filter</p>
            <p className="text-[#1A1A1A]/60 text-xs mt-1.5">Try selecting another category or typing another descriptive keyword.</p>
            <button 
              onClick={() => { setSelectedCategory(null); setSearchTerm(""); }}
              className="mt-4 text-[#38A325] font-bold text-xs uppercase tracking-wider underline cursor-pointer hover:text-[#38A325]/80"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
