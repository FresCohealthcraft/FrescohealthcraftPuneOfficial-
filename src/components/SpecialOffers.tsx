import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../types";
import { Plus, Star, Sparkles, Flame, CheckCircle, Heart } from "lucide-react";

interface SpecialOffersProps {
  onAddToCartDirectly: (item: MenuItem) => void;
}

const DYNAMIC_ITEM_COMBOS = [
    {
      id: "combo_detox_monday",
      name: "Detox Duo Combo",
      icon: "🌱",
      subtitle: "Any Green Vitality Juice + Paneer Sprouts Bowl",
    description: "A refreshing green juice paired with our protein-rich Paneer Sprouts Bowl to support natural detoxification, sustained energy, and daily wellness.",
    originalPrice: 169,
    price: 152,
      category: "Detox & Wellness",
      tag: "BESTSELLER",
      badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/10",
      glowColor: "shadow-emerald-500/5 hover:border-emerald-500/20"
    },
    {
      id: "combo_immuno_tuesday",
      name: "Immunity Shield Special",
      icon: "🛡️",
      subtitle: "Immunity Booster Juice + Exotic Delight Cup",
  description: "A powerful blend of antioxidant-rich Immunity Booster Juice and our signature Exotic Delight Fruit Cup, crafted to support immunity, vitality, and everyday wellness.",    originalPrice: 198,
      price: 178,
      category: "Detox & Wellness",
      tag: "IMMUNITY BOOST",
      badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/10",
      glowColor: "shadow-amber-500/5 hover:border-amber-500/20"
    },
    {
      id: "combo_glow_thursday",
      name: "Golden Glow Special",
      icon: "✨",
      subtitle: "Skin Glow-Up Juice + Power packed Cup",
  description: "A beauty-boosting combination of our Skin Glow-Up Juice and signature Power Packed Cup, crafted with fresh fruits, seeds, and nutrient-rich ingredients to support healthy skin and everyday vitality.",    originalPrice: 208,
      price: 187,
      category: "Detox & Wellness",
      tag: "SKIN GLOW",
      badgeColor: "bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-100",
      glowColor: "shadow-fuchsia-500/5 hover:border-fuchsia-500/20"
    },
    { 
      id: "combo_fitness_friday",
      name: "Muscle-Refill Special",
      icon: "💪",
      subtitle: "Fat-Burning + Paneer Sprouts Bowl",
      description: "A fitness-focused pairing of our Fat-Burning Juice and fresh Paneer Sprouts Bowl, delivering protein, fiber, and nutrient-rich ingredients to keep you energized and satisfied throughout the day.",    originalPrice:178 ,
      price:160 ,
      category: "Detox & Wellness",
      tag: "ATHLETE PREP",
      badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/10",
      glowColor: "shadow-blue-500/5 hover:border-blue-500/20"
    }
  ];


export default function SpecialOffers({ onAddToCartDirectly }: SpecialOffersProps) {
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (plan: typeof DYNAMIC_ITEM_COMBOS[0]) => {
    // Map to a MenuItem structure
    const item: MenuItem = {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      category: plan.category,
      description: `${plan.subtitle} — ${plan.description}`,
      icon: plan.icon
    };
    onAddToCartDirectly(item);
    
    // Short temporary pop confirmation
    setAddedItem(plan.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 1200);
  };

  return (
    <section id="offers" className="pt-2 pb-6 bg-gradient-to-tr from-[#FCFDFC] via-white to-[#F2FAED] scroll-mt-20 border-y border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Special Offers Badge */}
        <div className="inline-flex items-center justify-center border border-[#FFFF00]/30 text-[#ffffff] bg-[#e47200]/100 px-3 py-1 rounded-full text-[8.5px] font-semibold uppercase tracking-wider mb-2">
          Daily Specials Combo's
        </div>

        {/* Display Title */}
        <h2 className="text-xl sm:text-2xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Curated Daily Wellness Combos
        </h2>
        <p className="mt-1 text-[#1A1A1A]/70 max-w-md mx-auto text-xs sm:text-sm">
          Add our popular daily nutrition pairings directly to your delivery in one click. Completely raw, fresh, and hand-prepared.
        </p>

        {/* Dynamic Item Combos Cards Grid */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto px-2">
          {DYNAMIC_ITEM_COMBOS.map((combo) => {
            const isAdded = addedItem === combo.id;

            return (
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                key={combo.id}
                className={`bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between ${combo.glowColor}`}
              >
                <div>
                  {/* Top: Icon, Badges, Metrics */}
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-[#EFECE5] rounded-xl text-lg sm:text-xl select-none shadow-inner">
                      {combo.icon}
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 border rounded-full uppercase tracking-wider ${combo.badgeColor}`}>
                        {combo.tag}
                      </span>
                      <div className="flex items-center space-x-0.5 text-[9px] sm:text-[10px]">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#1A1A1A]/90">{combo.rating}</span>
                        <span className="text-gray-400 text-[8px]">({combo.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Header Titles */}
                  <div className="mt-3">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1A1A1A] leading-tight font-sans">
                      {combo.name}
                    </h3>
                    <p className="text-[#38A325] text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider mt-1 font-sans">
                      {combo.subtitle}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-[#1A1A1A]/75 text-[9px] sm:text-[11px] mt-1.5 leading-relaxed">
                    {combo.description}
                  </p>

                  {/* High Quality Features Banner */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5 bg-[#F9F8F4] p-1.5 rounded-lg border border-[#1A1A1A]/5">
                    <div className="flex items-center space-x-1 text-[7.5px] sm:text-[8.5px] font-bold text-gray-500 uppercase tracking-widest">
                      <span className="text-[#38A325]">✔</span> <span>10% Save</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[7.5px] sm:text-[8.5px] font-bold text-gray-500 uppercase tracking-widest">
                      <span className="text-[#38A325]">✔</span> <span>Sprouts</span>
                    </div>
                  </div>
                </div>

                {/* Footer and Price / Action buttons */}
                <div className="mt-3.5 pt-2.5 border-t border-[#1A1A1A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[7.5px] font-bold text-gray-400 uppercase tracking-wider block">Combo Price</span>
                    <div className="flex items-baseline space-x-1 mt-0.5">
                      <span className="text-base sm:text-lg font-serif italic font-extrabold text-[#38A325]">₹{combo.price}</span>
                      <span className="text-[10px] text-gray-400 line-through">₹{combo.originalPrice}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto">
                    <button
                      onClick={() => handleAddToCart(combo)}
                      className={`w-full sm:w-auto px-2.5 py-1.5 rounded-lg text-[8.5px] sm:text-[9.5px] font-bold transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer uppercase tracking-wider active:scale-95 shadow-sm ${
                        isAdded
                          ? "bg-[#38A325] text-white border border-[#38A325]"
                          : "bg-transparent text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 animate-bounce" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

