import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../types";
import { Plus, Star, Sparkles, Flame, CheckCircle, Heart } from "lucide-react";

// Import local premium images
// @ts-ignore
import SproutsBowlImg from "../assets/images/Sprouts-Bowl.png";
// @ts-ignore
import PaneerSproutsBowlImg from "../assets/images/Paneer-Sprouts-Bowl.png";
// @ts-ignore
import ExoticDelightCupImg from "../assets/images/Exotic-Delight-Cup.png";
// @ts-ignore
import ProteinPowerCupImg from "../assets/images/Protein-Power-Cup.png";
// @ts-ignore
import ABCDriknImg from "../assets/images/ABC-Drink.png";
// @ts-ignore
import ImmunityBoosterImg from "../assets/images/Immunity-Booster.png";
// @ts-ignore
import SkinGlowUpImg from "../assets/images/Skin-Glow-up.png";
// @ts-ignore
import FatBurnerImg from "../assets/images/Fat-Burner.png";

interface SpecialOffersProps {
  onAddToCartDirectly: (item: MenuItem) => void;
}

const DYNAMIC_ITEM_COMBOS = [
  {
    id: "combo_detox_monday",
    name: "ABC Wellness Combo",
    icon: "🌱",
    image1: ABCDriknImg,
    image2: SproutsBowlImg,
    subtitle: "ABC JUICE + SPROUTS BOWL",
    description: "Fresh ABC Juice (Apple, Beetroot & Carrot) paired with our protein-rich Sprouts Bowl to provide natural energy, essential nutrients, and daily wellness support.",
    originalPrice: 178,
    price: 161,
    category: "Detox & Wellness",
    tag: "POPULAR",
    rating: "4.9",
    reviews: "220+ ordered",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/10",
    glowColor: "shadow-emerald-500/5 hover:border-emerald-500/20"
  },
  {
    id: "combo_immuno_tuesday",
    name: "Immunity Shield Special",
    icon: "🛡️",
    image1: ImmunityBoosterImg,
    image2: ExoticDelightCupImg,
    subtitle: "Immunity Booster Juice + Exotic Delight Cup",
    description: "A powerful blend of antioxidant-rich Immunity Booster Juice and our signature Exotic Delight Fruit Cup, crafted to support immunity, vitality, and everyday wellness.",
    originalPrice: 198,
    price: 179,
    category: "Detox & Wellness",
    tag: "IMMUNITY BOOST",
    rating: "4.9",
    reviews: "180+ ordered",
    badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/10",
    glowColor: "shadow-amber-500/5 hover:border-amber-500/20"
  },
  {
    id: "combo_glow_thursday",
    name: "Golden Glow Special",
    icon: "✨",
    image1: SkinGlowUpImg,
    image2: ProteinPowerCupImg,
    subtitle: "Skin Glow-Up Juice + Power Packed Cup",
    description: "A beauty-boosting combination of our Skin Glow-Up Juice and signature Power Packed Cup, crafted with fresh fruits, seeds, and nutrient-rich ingredients to support healthy skin and everyday vitality.",
    originalPrice: 218,
    price: 199,
    category: "Detox & Wellness",
    tag: "SKIN GLOW",
    rating: "4.8",
    reviews: "140+ ordered",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-100",
    glowColor: "shadow-fuchsia-500/5 hover:border-fuchsia-500/20"
  },
  { 
    id: "combo_fitness_friday",
    name: "Muscle-Refill Special",
    icon: "💪",
    image1: FatBurnerImg,
    image2: PaneerSproutsBowlImg,
    subtitle: "Fat-Burning + Paneer Sprouts Bowl",
    description: "A fitness-focused pairing of our Fat-Burning Juice and fresh Paneer Sprouts Bowl, delivering protein, fiber, and nutrient-rich ingredients to keep you energized and satisfied throughout the day.",
    originalPrice: 198,
    price: 179,
    category: "Detox & Wellness",
    tag: "ATHLETE PREP",
    rating: "4.8",
    reviews: "90+ ordered",
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
    <section id="offers" className="pt-4 pb-8 bg-gradient-to-tr from-[#FCFDFC] via-white to-[#F2FAED] scroll-mt-20 border-y border-[#1A1A1A]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Special Offers Badge */}
        <div className="inline-flex items-center justify-center border border-[#FFFF00]/30 text-white bg-[#e47200] px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm select-none">
          Daily Special Combos
        </div>

        {/* Display Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Curated Daily Wellness Combos
        </h2>
        <p className="mt-0.5 text-[#1A1A1A]/70 max-w-md mx-auto text-[11px] sm:text-xs">
          Add our popular daily nutrition pairings directly to your delivery in one click. Completely raw, fresh, and hand-prepared.
        </p>

        {/* Dynamic Item Combos Cards Grid - Re-engineered into a modern layout matching the requested card UI */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto px-2">
          {DYNAMIC_ITEM_COMBOS.map((combo) => {
            const isAdded = addedItem === combo.id;

            return (
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                key={combo.id}
                className="bg-[#F5F8F4] border border-[#38A325]/12 rounded-[18px] p-3 sm:p-4 hover:shadow-sm hover:border-[#38A325]/30 transition-all duration-300 text-left flex flex-row items-center justify-between gap-3 sm:gap-4 group relative overflow-hidden"
              >
                {/* Text and interaction content on the left */}
                <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                  <div>
                    {/* Top Tag Badges & Rating */}
                    <div className="flex items-center space-x-2 select-none">
                      <span className={`text-[6.5px] sm:text-[7.5px] font-extrabold px-1.5 py-0.5 border rounded-full uppercase tracking-wider ${combo.badgeColor}`}>
                        {combo.tag}
                      </span>
                      <div className="flex items-center space-x-0.5 text-[8.5px] sm:text-[9.5px]">
                        <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#1A1A1A]/90">{combo.rating}</span>
                        <span className="text-gray-400 text-[7.5px]">({combo.reviews})</span>
                      </div>
                    </div>

                    {/* Bold Heading & Subheading */}
                    <div className="mt-1.5">
                      <h3 className="font-black text-xs sm:text-sm md:text-base text-[#1A1A1A] leading-tight font-sans tracking-tight">
                        {combo.name}
                      </h3>
                      <p className="text-[#38A325] text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest mt-0.5 font-sans">
                        {combo.subtitle}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-[#1A1A1A]/70 text-[9px] sm:text-[10px] mt-1 leading-relaxed font-medium line-clamp-2">
                      {combo.description}
                    </p>
                  </div>

                  {/* Pricing and Action Button Column */}
                  <div className="pt-1.5 border-t border-[#1A1A1A]/5 flex flex-row items-center justify-between gap-2 mt-1.5">
                    <div>
                      <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider block">Combo Price</span>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="text-xs sm:text-sm font-sans font-extrabold text-[#38A325]">₹{combo.price}</span>
                        <span className="text-[9.5px] text-gray-400 line-through font-medium">₹{combo.originalPrice}</span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => handleAddToCart(combo)}
                        className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8.5px] sm:text-[9px] font-black transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer uppercase tracking-wider active:scale-95 shadow-xs ${
                          isAdded
                            ? "bg-[#38A325] text-white border border-[#38A325]"
                            : "bg-[#1A1A1A] text-white hover:bg-[#38A325] hover:shadow-xs transition-all duration-250"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2.5} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two Overlapping Circular Images (Juice + Bowl) on the right, matching the user request for two images */}
                <div className="relative w-[76px] h-[76px] xs:w-[86px] xs:h-[86px] sm:w-[110px] sm:h-[110px] flex-shrink-0 select-none mr-1 sm:mr-2">
                  {/* Image 1: Drink (Offset left-top) */}
                  <div className="absolute top-0 left-0 w-[46px] h-[46px] xs:w-[52px] xs:h-[52px] sm:w-[68px] sm:h-[68px] rounded-full overflow-hidden bg-white border border-neutral-100/80 flex items-center justify-center p-0.5 shadow-md z-10 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                    <img
                      src={combo.image1}
                      alt={`${combo.name} Drink`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {/* Image 2: Bowl / Cup (Offset right-bottom) */}
                  <div className="absolute bottom-0 right-0 w-[48px] h-[48px] xs:w-[56px] xs:h-[56px] sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden bg-white border border-neutral-100/80 flex items-center justify-center p-0.5 shadow-lg z-0 transition-all duration-500 group-hover:scale-105 group-hover:translate-x-1 group-hover:translate-y-1">
                    <img
                      src={combo.image2}
                      alt={`${combo.name} Bowl`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
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

