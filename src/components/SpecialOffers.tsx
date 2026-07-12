import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../types";
import { Plus, Star, Sparkles, Flame, CheckCircle, Heart } from "lucide-react";

// Import local premium images
// @ts-ignore
import SproutsBowlImg from "../assets/images/Sprouts-Bowl.png";
// @ts-ignore
import chickenPowerBowlImg from "../assets/images/Chicken-Power-Bowl.png";
// @ts-ignore
import PaneerSproutsBowlImg from "../assets/images/Paneer-Sprouts-Bowl.png";
// @ts-ignore
import ExoticDelightCupImg from "../assets/images/Exotic-Delight-Cup.png";
// @ts-ignore
import ProteinPowerCupImg from "../assets/images/Protein-Cup.png";
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
    description: "Fresh ABC Juice (Apple, Beetroot & Carrot) paired with our protein-rich Sprouts Bowl to provide natural energy, essential nutrients & wellness.",
    originalPrice: 179,
    price: 161,
    category: "Detox & Wellness",
    tag: "POPULAR",
    tagIcon: "leaf",
    rating: "4.9",
    reviews: "120+ orders",
    badgeColor: "bg-[#38A325] text-white",
    saveTagColor: "bg-[#38A325] text-white",
    saveAmount: 18,
    nutrientTags: [
      { text: "Energy Boost", icon: "zap", color: "bg-orange-50 text-orange-600 border-orange-100" },
      { text: "High Protein", icon: "leaf", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      { text: "Immunity", icon: "shield", color: "bg-green-50 text-green-600 border-green-100" }
    ]
  },
  {
    id: "combo_immuno_tuesday",
    name: "Immunity Shield Special",
    icon: "🛡️",
    image1: ImmunityBoosterImg,
    image2: ExoticDelightCupImg,
    subtitle: "IMMUNITY BOOSTER JUICE + EXOTIC DELIGHT CUP",
    description: "A powerful blend of antioxidant-rich Immunity Booster Juice and our signature Exotic Delight Fruit Cup, crafted to support your immunity & keep you fresh.",
    originalPrice: 199,
    price: 179,
    category: "Detox & Wellness",
    tag: "IMMUNITY BOOST",
    tagIcon: "shield",
    rating: "4.9",
    reviews: "180+ orders",
    badgeColor: "bg-[#f97316] text-white",
    saveTagColor: "bg-[#ffedd5] text-[#f97316] border border-[#fed7aa]",
    saveAmount: 20,
    nutrientTags: [
      { text: "Immunity", icon: "shield", color: "bg-orange-50 text-orange-600 border-orange-100" },
      { text: "Antioxidant Rich", icon: "leaf", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      { text: "Naturally Energizing", icon: "zap", color: "bg-green-50 text-green-600 border-green-100" }
    ]
  },
  {
    id: "combo_glow_thursday",
    name: "Golden Glow Special",
    icon: "✨",
    image1: SkinGlowUpImg,
    image2: ProteinPowerCupImg,
    subtitle: "SKIN GLOW-UP JUICE + POWER PACKED CUP",
    description: "A beauty-boosting combination of our Skin Glow-Up Juice and signature Power Packed Cup, crafted with fresh fruits, seeds & superfoods.",
    originalPrice: 210,
    price: 189,
    category: "Detox & Wellness",
    tag: "SKIN GLOW",
    tagIcon: "sparkles",
    rating: "4.8",
    reviews: "95+ orders",
    badgeColor: "bg-[#a855f7] text-white",
    saveTagColor: "bg-[#f3e8ff] text-[#a855f7] border border-[#e9d5ff]",
    saveAmount: 21,
    nutrientTags: [
      { text: "Glowing Skin", icon: "sparkles", color: "bg-purple-50 text-purple-600 border-purple-100" },
      { text: "Detox", icon: "leaf", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      { text: "Healthy Fats", icon: "heart", color: "bg-green-50 text-green-600 border-green-100" }
    ]
  },
  {
    id: "combo_fitness_friday",
    name: "Muscle-Refill Special",
    icon: "💪",
    image1: FatBurnerImg,
    image2: chickenPowerBowlImg,
    subtitle: "FAT-BURNING + 35G PROTEIN CHICKEN BOWL",
    description: "A fitness-focused pairing of our Fat-Burning Juice and fresh high-protein Chicken Bowl, delivering protein, fiber & lasting energy.",
    originalPrice: 329,
    price: 299,
    category: "Detox & Wellness",
    tag: "ATHLETE PICK",
    tagIcon: "dumbbell",
    rating: "4.8",
    reviews: "80+ orders",
    badgeColor: "bg-[#3b82f6] text-white",
    saveTagColor: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
    saveAmount: 30,
    nutrientTags: [
      { text: "High Protein", icon: "dumbbell", color: "bg-blue-50 text-blue-600 border-blue-100" },
      { text: "Fat-Burning", icon: "leaf", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      { text: "Energy", icon: "zap", color: "bg-green-50 text-green-600 border-green-100" }
    ]
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
    <section id="offers" className="pt-8 pb-12 bg-gradient-to-b from-white via-[#FCFDFC] to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Special Offers Badge */}
        <div className="inline-flex items-center justify-center border border-[#FFFF00]/30 text-white bg-[#e47200] px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-xs select-none">
          ⚡ Daily Special Combos
        </div>

        {/* Display Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#1A1A1A] font-extrabold tracking-tight leading-tight">
          Curated Daily Wellness Combos
        </h2>
        <p className="mt-1 text-[#1A1A1A]/70 max-w-lg mx-auto text-xs sm:text-sm">
          Add our popular daily nutrition pairings directly to your delivery in one click. Completely raw, fresh, and hand-prepared.
        </p>

        {/* Curated vertical list to look exactly like the shared image */}
        <div className="mt-8 flex flex-col gap-5 max-w-3xl mx-auto">
          {DYNAMIC_ITEM_COMBOS.map((combo) => {
            const isAdded = addedItem === combo.id;

            return (
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                key={combo.id}
                className="bg-white border border-[#1A1A1A]/5 rounded-[24px] p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6 group relative overflow-hidden"
              >
                {/* 1. Image Container (Left block) */}
                <div className="relative w-full sm:w-[230px] h-[170px] sm:h-[190px] bg-gradient-to-br from-[#f4f7f3] to-[#e4ede0] rounded-2xl overflow-hidden flex items-end justify-center p-3 flex-shrink-0 select-none">
                  {/* Badge pinned on the top-left */}
                  <div className={`absolute top-3 left-3 z-30 flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-xs ${combo.badgeColor}`}>
                    {combo.tagIcon === "leaf" && <Leaf className="w-2.5 h-2.5" />}
                    {combo.tagIcon === "shield" && <Shield className="w-2.5 h-2.5" />}
                    {combo.tagIcon === "sparkles" && <Sparkles className="w-2.5 h-2.5" />}
                    {combo.tagIcon === "dumbbell" && <Dumbbell className="w-2.5 h-2.5" />}
                    <span>{combo.tag}</span>
                  </div>

                  {/* Overlapping Products Composition */}
                  <div className="relative w-full h-[90%] flex items-end justify-center">
                    {/* Image 1: Drink (Left side, standing tall) */}
                    <div className="absolute left-[3%] bottom-0 w-[48%] h-[95%] flex items-end justify-center z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                      <img
                        src={combo.image1}
                        alt={`${combo.name} Drink`}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.12)]"
                      />
                    </div>
                    {/* Image 2: Bowl / Cup (Right side, in front) */}
                    <div className="absolute right-[3%] bottom-0 w-[58%] h-[82%] flex items-end justify-center z-20 transition-transform duration-500 group-hover:scale-[1.03] group-hover:translate-x-0.5">
                      <img
                        src={combo.image2}
                        alt={`${combo.name} Bowl`}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.16)]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Right Content Area */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    {/* Rating & Save Tag Row */}
                    <div className="flex items-center justify-between">
                      {/* Left side: Rating */}
                      <div className="flex items-center space-x-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="font-extrabold text-[#1A1A1A]">{combo.rating}</span>
                        <span className="text-gray-400 font-medium">({combo.reviews})</span>
                      </div>

                      {/* Right side: Save Amount pill */}
                      <div className={`px-2.5 py-0.5 rounded-[8px] text-[10px] font-extrabold tracking-tight ${combo.saveTagColor}`}>
                        Save ₹{combo.saveAmount}
                      </div>
                    </div>

                    {/* Bold Heading & Subheading */}
                    <div className="mt-2">
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1A1A1A] leading-snug font-sans tracking-tight">
                        {combo.name}
                      </h3>
                      <p className="text-[#38A325] text-[10px] sm:text-xs font-black uppercase tracking-wider mt-0.5 font-sans">
                        {combo.subtitle}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-1.5 leading-relaxed font-normal">
                      {combo.description}
                    </p>
                  </div>

                  {/* Bottom nutrient pills & price/add row */}
                  <div className="mt-4 pt-3 border-t border-[#1A1A1A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Nutrient pills list */}
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {combo.nutrientTags.map((tag, tIdx) => (
                        <div key={tIdx} className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full border text-[9px] font-extrabold tracking-tight ${tag.color}`}>
                          {tag.icon === "zap" && <Zap className="w-2.5 h-2.5" strokeWidth={2.5} />}
                          {tag.icon === "shield" && <Shield className="w-2.5 h-2.5" strokeWidth={2.5} />}
                          {tag.icon === "leaf" && <Leaf className="w-2.5 h-2.5" strokeWidth={2.5} />}
                          {tag.icon === "sparkles" && <Sparkles className="w-2.5 h-2.5" />}
                          {tag.icon === "heart" && <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" />}
                          {tag.icon === "dumbbell" && <Dumbbell className="w-2.5 h-2.5" strokeWidth={2.5} />}
                          <span>{tag.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Action Button flex box */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-base sm:text-lg font-sans font-extrabold text-[#38A325]">₹{combo.price}</span>
                        <span className="text-xs text-gray-400 line-through font-medium">₹{combo.originalPrice}</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(combo)}
                        className={`px-5 py-1.5 rounded-full text-[11px] font-black transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer uppercase tracking-wider active:scale-95 shadow-xs ${
                          isAdded
                            ? "bg-[#38A325]/10 text-[#38A325] border border-[#38A325]/30"
                            : "bg-[#38A325] text-white hover:bg-[#2d821d] hover:shadow-xs transition-all"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                            <span>ADD</span>
                          </>
                        )}
                      </button>
                    </div>
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

