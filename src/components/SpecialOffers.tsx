import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CartItem } from "../types";
import { Plus, Minus, Star, Sparkles, Flame, CheckCircle, Heart, Zap, Shield, Dumbbell, Activity, Leaf, ChevronLeft, ChevronRight } from "lucide-react";

// @ts-ignore
import ABCWellnessComboImg from "../assets/images/ABC_Wellness_Combo.png";


// @ts-ignore
import ImmunityShieldSpecialImg from "../assets/images/Immunity_Shield_Special.png";

// @ts-ignore
import GoldenGlowSpecialImg from "../assets/images/Golden_Glow_Special.png";

// @ts-ignore
import MuscleRefillSpecialImg from "../assets/images/Muscle_Refill_Special.png";

interface ComboItem {
  id: string;
  name: string;
  icon: string;
  image1: any;
  image2?: any;
  subtitle: string;
  description: string;
  originalPrice: number;
  price: number;
  category: string;
  tag: string;
  tagIcon: string;
  rating: string;
  reviews: string;
  badgeColor: string;
  saveTagColor: string;
  saveAmount: number;
  savePercentText: string;
  imgBg: string;
  nutrientTags: any[];
}

interface SpecialOffersProps {
  onAddToCartDirectly: (item: MenuItem) => void;
  cartItems: CartItem[];
  onUpdateCartQuantity: (cartId: string, quantity: number) => void;
  onRemoveCartItem: (cartId: string) => void;
}

const DYNAMIC_ITEM_COMBOS: ComboItem[] = [

  {
    id: "combo_glow_thursday",
    name: "Golden Glow Special",
    icon: "✨",
    image1: GoldenGlowSpecialImg,
    subtitle: "SKIN GLOW-UP JUICE + POWER PACKED CUP",
    description: "A beauty-boosting combination of our Skin Glow-Up Juice and signature Power Packed Cup, crafted with fresh fruits, seeds & superfoods.",
    originalPrice: 218,
    price: 199,
    category: "Detox & Wellness",
    tag: "SKIN GLOW",
    tagIcon: "sparkles",
    rating: "4.8",
    reviews: "95+ orders",
    badgeColor: "bg-[#a855f7] text-white",
    saveTagColor: "bg-[#f3e8ff] text-[#a855f7] border border-[#e9d5ff]",
    saveAmount: 19,
    savePercentText: "SAVE 10% ┘",
    imgBg: "bg-[#EAEFF2]", // soft premium cool grey/blue
    nutrientTags: [
     
    ]
  },
  {
    id: "combo_fitness_friday",
    name: "Muscle-Refill Special",
    icon: "💪",
    image1: MuscleRefillSpecialImg,
    subtitle: "FAT-BURNING + 35G PROTEIN CHICKEN BOWL",
    description: "A fitness-focused pairing of our Fat-Burning Juice and fresh high-protein Chicken Bowl, delivering protein, fiber & lasting energy.",
    originalPrice: 318,
    price: 299,
    category: "Detox & Wellness",
    tag: "ATHLETE PICK",
    tagIcon: "dumbbell",
    rating: "4.8",
    reviews: "80+ orders",
    badgeColor: "bg-[#3b82f6] text-white",
    saveTagColor: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
    saveAmount: 19,
    savePercentText: "SAVE 9% ┘",
    imgBg: "bg-[#E9F3EB]", // soft clean sage/green
    nutrientTags: [
     
    ]
  },
  {
    id: "combo_detox_monday",
    name: "ABC Wellness Combo",
    icon: "🌱",
    image1: ABCWellnessComboImg,
    subtitle: "ABC JUICE + SPROUTS BOWL",
    description: "Fresh ABC Juice (Apple, Beetroot & Carrot) paired with a protein-rich sprouts bowl, naturally rich in vitamins, antioxidants, and fiber for complete daily wellness.",
    originalPrice: 178,
    price: 161,
    category: "Detox & Wellness",
    tag: "POPULAR",
    tagIcon: "leaf",
    rating: "4.9",
    reviews: "120+ orders",
    badgeColor: "bg-[#2E7D32] text-white",
    saveTagColor: "bg-[#2E7D32] text-white",
    saveAmount: 17,
    savePercentText: "SAVE 10% ┘",
    imgBg: "bg-[#F3EFE9]", // warm premium cream like Curd
    nutrientTags: [
     
    ]
  },
  {
    id: "combo_immuno_tuesday",
    name: "Immunity Shield Special",
    icon: "🛡️",
    image1: ImmunityShieldSpecialImg,
    subtitle: "IMMUNITY BOOSTER JUICE + EXOTIC DELIGHT CUP",
    description: "A powerful blend of antioxidant-rich Immunity Booster Juice and our signature Exotic Delight Fruit Cup, crafted to support your immunity & keep you fresh.",
    originalPrice: 198,
    price: 179,
    category: "Detox & Wellness",
    tag: "IMMUNITY BOOST",
    tagIcon: "shield",
    rating: "4.9",
    reviews: "180+ orders",
    badgeColor: "bg-[#f97316] text-white",
    saveTagColor: "bg-[#ffedd5] text-[#f97316] border border-[#fed7aa]",
    saveAmount: 19,
    savePercentText: "SAVE 10% ┘",
    imgBg: "bg-[#F3B917]", // stunning bright golden yellow like Garlic Yogurt
    nutrientTags: [
      
    ]
  },

];

export default function SpecialOffers({
  onAddToCartDirectly,
  cartItems = [],
  onUpdateCartQuantity,
  onRemoveCartItem
}: SpecialOffersProps) {
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto sliding timer for the curated daily special combos
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % DYNAMIC_ITEM_COMBOS.length;
        if (scrollContainerRef.current) {
          const cardWidth = 310;
          scrollContainerRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: "smooth"
          });
        }
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    // Width of card is 290px + gap of 20px = 310px
    const cardWidth = 310;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(DYNAMIC_ITEM_COMBOS.length - 1, index)));
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 310;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="offers" className="pt-10 pb-12 bg-[#E1EAE3] scroll-mt-20 border-y border-neutral-200/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Special Offers Badge */}
        <div className="inline-flex items-center justify-center border border-[#FFFF00]/15 text-white bg-[#1E4620] px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-xs select-none">
          ⚡ Special Combos
        </div>

        {/* Display Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#1A1A1A] font-extrabold tracking-tight leading-tight">
          Curated  Wellness Combos
        </h2>
        <p className="mt-1 text-[#1A1A1A]/70 max-w-lg mx-auto text-xs sm:text-sm">
          Add our popular nutrition pairings directly to your delivery in one click. Completely raw, fresh, and hand-prepared.
        </p>

        {/* Curated horizontal list with smooth horizontal scroll way */}
        <div className="relative mt-8 group/slider w-full max-w-lg sm:max-w-xl md:max-w-4xl mx-auto">
          {/* Left Arrow Button - Positioned at corner-center of the active card's image area */}
          <button 
            onClick={() => {
              const prevIndex = (activeIndex - 1 + DYNAMIC_ITEM_COMBOS.length) % DYNAMIC_ITEM_COMBOS.length;
              scrollToCard(prevIndex);
            }}
            className="absolute left-2 md:-left-5 top-[119px] -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#1E4620] border border-neutral-200/60 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs hover:border-[#1E4620]/30"
            title="Previous Combo"
          >
            <ChevronLeft className="w-5 h-5 text-[#1E4620]" strokeWidth={3} />
          </button>

          {/* Right Arrow Button - Positioned at corner-center of the active card's image area */}
          <button 
            onClick={() => {
              const nextIndex = (activeIndex + 1) % DYNAMIC_ITEM_COMBOS.length;
              scrollToCard(nextIndex);
            }}
            className="absolute right-2 md:-right-5 top-[119px] -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#1E4620] border border-neutral-200/60 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs hover:border-[#1E4620]/30"
            title="Next Combo"
          >
            <ChevronRight className="w-5 h-5 text-[#1E4620]" strokeWidth={3} />
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex overflow-x-auto gap-5 pb-4 px-4 scrollbar-none snap-x snap-mandatory scroll-smooth w-full justify-start md:justify-center"
          >
            {DYNAMIC_ITEM_COMBOS.map((combo) => {
              const existingCartItem = cartItems.find(
                (c) => c.menuItem.id === combo.id && (!c.customIngredients || c.customIngredients.length === 0)
              );
              const isAdded = !!existingCartItem || addedItem === combo.id;
              const isFavorite = !!favorites[combo.id];

              return (
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  key={combo.id}
                  className="bg-white border border-neutral-200/50 rounded-[28px] p-4.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 text-left flex flex-col justify-between group relative shrink-0 w-[275px] xs:w-[290px] snap-center select-none"
                >
                  {/* 1. Image Container (Top block) */}
                  <div 
                    style={{ height: "202.4px" }}
                    className={`relative w-full ${combo.imgBg} rounded-[22px] overflow-hidden flex items-end justify-center p-3 select-none mb-3.5`}
                  >
                    {/* Badge pinned on the top-left */}
                    <div className={`absolute top-3 left-3 z-30 flex items-center space-x-1 px-2.5 py-1 rounded-full text-[8.5px] font-black uppercase tracking-wider shadow-xs ${combo.badgeColor}`}>
                      {combo.tagIcon === "leaf" && <Leaf className="w-2.5 h-2.5" />}
                      {combo.tagIcon === "shield" && <Shield className="w-2.5 h-2.5" />}
                      {combo.tagIcon === "sparkles" && <Sparkles className="w-2.5 h-2.5" />}
                      {combo.tagIcon === "dumbbell" && <Dumbbell className="w-2.5 h-2.5" />}
                      <span>{combo.tag}</span>
                    </div>

                    {/* Favorite/Heart Button pinned on top-right */}
                    <button 
                      onClick={(e) => toggleFavorite(combo.id, e)}
                      className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/45 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xs hover:bg-white/60 transition-colors active:scale-90 cursor-pointer"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-neutral-800"}`} 
                        strokeWidth={2} 
                      />
                    </button>

                    {/* Overlapping Products Composition or Single Image */}
                    <div className="relative w-full h-[95%] flex items-end justify-center">
                      {combo.image2 ? (
                        <>
                          {/* Image 1: Drink (Left side, standing tall) */}
                          <div className="absolute left-[4%] bottom-0 w-[46%] h-[95%] flex items-end justify-center z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                            <img
                              src={combo.image1}
                              alt={`${combo.name} Drink`}
                              referrerPolicy="no-referrer"
                              className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.12)]"
                            />
                          </div>
                          {/* Image 2: Bowl / Cup (Right side, in front) */}
                          <div className="absolute right-[4%] bottom-0 w-[56%] h-[82%] flex items-end justify-center z-20 transition-transform duration-500 group-hover:scale-[1.03] group-hover:translate-x-0.5">
                            <img
                              src={combo.image2}
                              alt={`${combo.name} Bowl`}
                              referrerPolicy="no-referrer"
                              className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_12px_rgba(0,0,0,0.16)]"
                            />
                          </div>
                        </>
                      ) : (
                        /* Single high-end image (e.g. ABC Wellness Combo) */
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
                          <img
                            src={combo.image1}
                            alt={combo.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-[22px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Content Area */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>

                      {/* Bold Heading & Subheading */}
                      <div className="mt-1.5">
                        <h3 className="font-extrabold text-[18px] sm:text-[19px] text-[#1A1A1A] leading-tight font-sans tracking-tight line-clamp-1">
                          {combo.name}
                        </h3>
                        <p className="text-[#38A325] text-[9.5px] font-black uppercase tracking-wider mt-0.5 font-sans truncate">
                          {combo.subtitle}
                        </p>
                      </div>

                      {/* Detailed Description */}
                      <p className="text-neutral-500 text-[11px] mt-2 leading-relaxed font-normal">
                        {combo.description}
                      </p>

                      {/* Nutrition Chips section exactly as per shared image */}
                      <div className="mt-3">
                        <span className="text-[10px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">Nutrition</span>
                        <div className="flex flex-wrap gap-1.5 select-none">
                          {combo.nutrientTags.map((tag, tIdx) => (
                            <div 
                              key={tIdx} 
                              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-md border text-[9.5px] font-bold tracking-tight shadow-2xs ${tag.color}`}
                            >
                              <span className="text-[10px]">{tag.icon}</span>
                              <span>{tag.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom pricing & add to cart button */}
                    <div className="mt-4.5 pt-3.5 border-t border-neutral-100 flex flex-col gap-3">
                      {/* Price display with originalPrice struck through and savings badge */}
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-[18px] font-sans font-black text-neutral-900 leading-none">₹{combo.price}</span>
                        {combo.originalPrice && combo.originalPrice > combo.price && (
                          <span className="text-neutral-400 line-through text-[14px] font-sans font-semibold">₹{combo.originalPrice}</span>
                        )}
                        {combo.originalPrice && combo.originalPrice > combo.price && (
                          <span className="text-[9px] bg-[#E1EAE3] text-[#1E4620] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                            Save ₹{combo.originalPrice - combo.price}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart button stretching full-width of card */}
                      {existingCartItem ? (
                        <div className="w-full flex items-center justify-between bg-[#F1F6F2] text-[#1E4620] border border-[#1E4620]/30 rounded-full h-[48px] px-2.5 select-none transition-all duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (existingCartItem.quantity > 1) {
                                onUpdateCartQuantity(existingCartItem.id, existingCartItem.quantity - 1);
                              } else {
                                onRemoveCartItem(existingCartItem.id);
                              }
                            }}
                            className="w-9 h-9 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-full text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-xs"
                            title="Decrease Quantity"
                          >
                            <Minus className="w-4 h-4" strokeWidth={3} />
                          </button>
                          
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-[12px] font-black tracking-wider uppercase text-[#1E4620]">
                              {existingCartItem.quantity} Added
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const item: MenuItem = {
                                id: combo.id,
                                name: combo.name,
                                price: combo.price,
                                category: combo.category,
                                description: `${combo.subtitle} — ${combo.description}`,
                                icon: combo.icon
                              };
                              onAddToCartDirectly(item);
                            }}
                            className="w-9 h-9 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-full text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-xs"
                            title="Increase Quantity"
                          >
                            <Plus className="w-4 h-4" strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(combo)}
                          className="w-full py-3.5 rounded-full text-[12px] font-black tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer uppercase shadow-xs active:scale-[0.98] bg-[#1E4620] text-white hover:bg-[#15311a] hover:shadow-[0_4px_12px_rgba(20,83,45,0.18)]"
                        >
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots (Exactly as per shared image layout) */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {DYNAMIC_ITEM_COMBOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? "w-4 bg-[#1E4620]" 
                  : "w-2 bg-[#9BAFA0]/75 hover:bg-[#9BAFA0]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
