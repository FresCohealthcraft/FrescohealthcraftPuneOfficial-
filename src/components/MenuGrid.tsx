import { useState } from "react";
import { MenuItem } from "../types";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Leaf, HelpCircle, CheckCircle } from "lucide-react";

interface MenuProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirectly: (item: MenuItem) => void;
}

export default function MenuGrid({ onSelectItem, onAddToCartDirectly }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "Fruit Juices": return "🍊";
      case "Vegetable Juices": return "🥦";
      case "Smoothies": return "🍓";
      case "Detox & Wellness": return "🌿";
      default: return "🥤";
    }
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (searchTerm) {
      // If there is any search keyword, return matches within the selected category if one is active, or anywhere in the store if none is active
      return selectedCategory ? (item.category === selectedCategory && matchesSearch) : matchesSearch;
    }
    
    // Otherwise, only show if selected
    return selectedCategory ? item.category === selectedCategory : false;
  });

  return (
    <section id="menu" className="py-20 bg-[#F9F8F4] scroll-mt-20 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Our Menu Badge */}
        <div className="inline-flex items-center justify-center border border-[#4A8824]/30 text-[#4A8824] bg-transparent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Our Menu
        </div>

        {/* Display Headings */}
        <h2 className="text-3xl sm:text-4.5xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Fresh & Delicious Options
        </h2>
        <p className="mt-2 text-[#1A1A1A]/70 max-w-2xl mx-auto text-base sm:text-lg">
          Choose from our wide variety of freshly prepared juices, smoothies, and wellness drinks
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative px-4">
          <input
            type="text"
            placeholder="Search healthy juices, smoothies, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[#1A1A1A]/15 rounded-full focus:outline-none focus:ring-1 focus:ring-[#4A8824] focus:border-[#4A8824] text-sm bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-8 top-3.5" />
        </div>

        {/* Categories filters (matching updated specification) */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5 px-4 max-w-4xl mx-auto">
          {MENU_CATEGORIES.filter((category) => category !== "All").map((category) => {
            const isActive = selectedCategory === category;
            const emoji = getCategoryEmoji(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(isActive ? null : category)}
                className={`py-2 px-5 text-xs font-bold uppercase tracking-wider cursor-pointer rounded-full transition-all duration-300 flex items-center space-x-1.5 shadow-sm active:scale-98 ${
                  isActive
                    ? "bg-[#4A8824] text-white shadow-none"
                    : "bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 hover:bg-[#EFECE5]/40"
                }`}
              >
                <span>{emoji}</span>
                <span>{category}</span>
                {isActive && <span className="ml-1 text-[10px] text-white/80">✕</span>}
              </button>
            );
          })}
        </div>

        {/* Collapse Guided Placeholder Screen if no category selected and no active search queries */}
        {!selectedCategory && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="mt-12 bg-white rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto border border-[#1A1A1A]/5 shadow-[0_20px_50px_rgba(74,136,36,0.04)] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Ambient abstract green background blur to add modern elegance */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#4A8824]/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#EFECE5]/40 blur-3xl pointer-events-none" />

            {/* Bouncing down finger nested inside an infinitely floating motion container */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-5xl sm:text-6xl select-none"
            >
              👇
            </motion.div>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold font-serif text-[#1A1A1A] tracking-tight">
              Explore Our Wellness Menu
            </h3>
            
            <p className="mt-2.5 text-xs sm:text-sm text-[#1A1A1A]/60 max-w-md leading-relaxed">
              We extract each recipe fresh using high-retention pressing techniques. Select a juice category above or click below to reveal active organic creations!
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md z-10">
              {MENU_CATEGORIES.filter((c) => c !== "All").map((cat, index) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 14,
                    delay: index * 0.08 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    borderColor: "rgba(74,136,36,0.35)",
                    boxShadow: "0 10px 20px -10px rgba(74,136,36,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#F9F8F4] rounded-2xl text-[#1A1A1A]/80 border border-[#1A1A1A]/5 cursor-pointer transition-all flex items-center justify-center space-x-2.5"
                >
                  <span className="text-lg">{getCategoryEmoji(cat)}</span>
                  <span>{cat.replace(" Juices", "")}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu Items Grid */}
        <motion.div 
          layout
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8 px-1 sm:px-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 140, 
                  damping: 16,
                  delay: (index % 4) * 0.04 
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(26,26,26,0.08)"
                }}
                key={item.id}
                className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-2.5 sm:p-5.5 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-[#4A8824]/30 transition-all duration-300 flex flex-col justify-between h-full text-left group"
              >
                <div>
                  
                  {/* Image/Emoji wrapper Container */}
                  <div className="relative w-full aspect-video rounded-xl sm:rounded-2.5xl bg-[#EFECE5] select-none flex items-center justify-center text-3.5xl sm:text-5.5xl mb-2 sm:mb-5 overflow-hidden transition-transform group-hover:scale-[1.01] duration-300">
                    <span className="transition-transform duration-300 group-hover:rotate-6">
                      {item.icon}
                    </span>
                    
                    {/* Popular Tag Badge */}
                    {item.popular && (
                      <span className="absolute top-1 right-1 sm:top-3.5 sm:right-3.5 bg-[#F26419] text-white text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-3 py-0.5 rounded-full shadow-sm uppercase tracking-widest">
                        Popular
                      </span>
                    )}
 
                    {/* Quick healthy nutrition overlay symbol */}
                    <span className="absolute bottom-1 left-1 text-[8px] sm:text-[10px] font-bold text-[#4A8824] bg-white/90 border border-[#1A1A1A]/5 px-1 sm:px-2 py-0.5 rounded-md flex items-center gap-1 scale-90 uppercase tracking-wider">
                      <Leaf className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#4A8824]" />
                      <span className="hidden xs:inline">100% Pure</span>
                      <span className="xs:hidden">Pure</span>
                    </span>

                    {/* Interactive quick direct add floating bottom-right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartDirectly(item);
                      }}
                      className="absolute bottom-1 right-1 p-1 sm:p-2 bg-white hover:bg-[#4A8824] hover:text-[#F9F8F4] text-[#4A8824] rounded-full border border-[#1A1A1A]/10 transition-colors cursor-pointer shadow-sm z-10"
                      title="Quick Add standard to Cart"
                    >
                      <ShoppingBag className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
  
                  {/* Title & Description */}
                  <h3 className="text-xs sm:text-base font-bold text-[#1A1A1A] group-hover:text-[#4A8824] transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[9px] sm:text-xs text-[#1A1A1A]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
 
                {/* Bottom line with price and button */}
                <div className="mt-2.5 sm:mt-5 pt-2.5 sm:pt-4 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[13px] sm:text-2xl font-bold font-serif text-[#4A8824] leading-none">
                      ₹{item.price}
                    </span>
                    <span className="text-[7.5px] sm:text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A]/40 mt-1 leading-none">
                      per serving
                    </span>
                  </div>
 
                  <button
                    onClick={() => onSelectItem(item)}
                    className="bg-[#1A1A1A] hover:bg-[#4A8824] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-colors shrink-0"
                  >
                    {/* Custom WhatsApp Icon Path */}
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current mr-0.5 sm:mr-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                    </svg>
                    <span>Order</span>
                  </button>
                </div>
 
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (selectedCategory || searchTerm) && (
          <div className="mt-12 bg-white rounded-3xl p-10 max-w-md mx-auto border border-[#1A1A1A]/10">
            <span className="text-5xl">🥤</span>
            <p className="mt-4 text-[#1A1A1A] font-bold text-sm">No juices match your filter</p>
            <p className="text-[#1A1A1A]/60 text-xs mt-1.5">Try selecting another category or typing another descriptive keyword.</p>
            <button 
              onClick={() => { setSelectedCategory(null); setSearchTerm(""); }}
              className="mt-4 text-[#4A8824] font-bold text-xs uppercase tracking-wider underline cursor-pointer hover:text-[#3B6C1C]"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
