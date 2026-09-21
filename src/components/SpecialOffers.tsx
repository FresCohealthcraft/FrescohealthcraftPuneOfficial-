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


interface SpecialCardItem {
  id: string;
  name: string;
  badge: string;
  badgeIcon?: string;
  image: any;
  subtitle: string;
  description: string;
  tags: string[];
  price: number;
  originalPrice: number;
  saveAmount: number;
}

interface SpecialOffersProps {
  onAddToCartDirectly: (item: MenuItem) => void;
  cartItems: CartItem[];
  onUpdateCartQuantity: (cartId: string, quantity: number) => void;
  onRemoveCartItem: (cartId: string) => void;
}

const SPECIAL_CARDS: SpecialCardItem[] = [
  {
    id: "combo_glow_thursday",
    name: "Golden Glow Special",
    badge: "SKIN GLOW",
    badgeIcon: "✨",
    image: GoldenGlowSpecialImg,
    subtitle: "SKIN GLOW-UP JUICE + POWER PACKED CUP",
    description: "A refreshing beauty-focused pairing packed with fresh fruits, seeds and superfoods.",
    tags: ["Antioxidants", "Vitamin C", "Superfoods"],
    price: 199,
    originalPrice: 218,
    saveAmount: 19,
  },
  {
    id: "combo_fitness_friday",
    name: "Muscle-Refill Special",
    badge: "ATHLETE PICK",
    badgeIcon: "💪",
    image: MuscleRefillSpecialImg,
    subtitle: "FAT-BURNING + 35G PROTEIN CHICKEN BOWL",
    description: "A fitness-focused combination delivering protein, fiber and lasting energy.",
    tags: ["35g Protein", "High Fiber", "Fitness"],
    price: 299,
    originalPrice: 318,
    saveAmount: 19,
  },
  {
    id: "combo_detox_monday",
    name: "ABC Wellness Combo",
    badge: "POPULAR",
    badgeIcon: "🌱",
    image: ABCWellnessComboImg,
    subtitle: "ABC JUICE + SPROUTS BOWL",
    description: "Fresh ABC Juice paired with our protein-rich Sprouts Bowl for a refreshing wellness meal.",
    tags: ["Vitamins", "Antioxidants", "Fiber"],
    price: 161,
    originalPrice: 178,
    saveAmount: 17,
  },
  {
    id: "combo_immuno_tuesday",
    name: "Immunity Shield Special",
    badge: "IMMUNITY BOOST",
    badgeIcon: "🛡️",
    image: ImmunityShieldSpecialImg,
    subtitle: "IMMUNITY BOOSTER JUICE + EXOTIC DELIGHT CUP",
    description: "A refreshing antioxidant-rich pairing with fresh fruits and immunity-supporting ingredients.",
    tags: ["Vitamin C", "Antioxidants", "Fresh Fruits"],
    price: 179,
    originalPrice: 198,
    saveAmount: 19,
  },
];

export default function SpecialOffers({
  onAddToCartDirectly,
  cartItems = [],
  onUpdateCartQuantity,
  onRemoveCartItem,
}: SpecialOffersProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const card = scrollContainerRef.current.querySelector<HTMLElement>("[data-special-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 300;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(SPECIAL_CARDS.length - 1, index)));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (card: SpecialCardItem) => {
    const item: MenuItem = {
      id: card.id,
      name: card.name,
      price: card.price,
      category: "Special Offers",
      description: `${card.subtitle} — ${card.description}`,
      icon: card.badgeIcon || "⚡",
      image: card.image,
    };
    onAddToCartDirectly(item);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector<HTMLElement>("[data-special-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 300;
    
    if (direction === "left") {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector<HTMLElement>("[data-special-card]");
      const cardWidth = card ? card.offsetWidth + 20 : 300;
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    } else {
      scrollByAmount("left");
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeIndex < SPECIAL_CARDS.length - 1) {
      scrollToCard(activeIndex + 1);
    } else {
      scrollByAmount("right");
    }
  };

  return (
    <section id="offers" className="py-10 sm:py-14 bg-[#EDF3EF] scroll-mt-16 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot 1:1 */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-neutral-300/80 text-[#1B4D2E] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase mb-2.5 shadow-2xs">
            <span className="text-[12px] leading-none">⚡</span>
            <span>SPECIAL COMBOS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight font-serif">
            Curated Wellness Combos
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-700 mt-1.5">
            Smart nutrition pairings. Better value. One easy order.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Freshly prepared • Made to order • Save up to 10%
          </p>
        </div>

        {/* Carousel / Cards Outer Wrapper */}
        <div className="relative flex items-center">
          
          {/* Left Arrow Button (Always clickable and functional) */}
          <button
            id="special-card-prev-btn"
            type="button"
            onClick={handlePrev}
            aria-label="Previous special card"
            className="flex absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 border border-neutral-200/90 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-800" strokeWidth={2.4} />
          </button>

          {/* Right Arrow Button (Always clickable and functional) */}
          <button
            id="special-card-next-btn"
            type="button"
            onClick={handleNext}
            aria-label="Next special card"
            className="flex absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 border border-neutral-200/90 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-800" strokeWidth={2.4} />
          </button>

          {/* Cards Grid / Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-5 pb-3 px-1 sm:px-2 scrollbar-none snap-x snap-mandatory scroll-smooth w-full"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {SPECIAL_CARDS.map((card) => {
              const existingCartItem = cartItems.find(
                (c) => c.menuItem.id === card.id && (!c.customIngredients || c.customIngredients.length === 0)
              );
              const isFavorite = !!favorites[card.id];

              return (
                <div
                  key={card.id}
                  id={`special-card-${card.id}`}
                  data-special-card="true"
                  className="bg-white border border-neutral-200/90 rounded-[24px] p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between shrink-0 w-[275px] xs:w-[290px] sm:w-[300px] lg:w-[calc(25%-16px)] snap-start text-left"
                >
                  <div>
                    {/* 1. Top Image Box */}
                    <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F6F8F6] mb-3.5">
                      {/* Top-Left Category Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-2xs text-[9.5px] font-extrabold text-neutral-900 tracking-wider uppercase">
                        {card.badgeIcon && <span className="text-[11px] leading-none">{card.badgeIcon}</span>}
                        <span>{card.badge}</span>
                      </div>

                      {/* Top-Right Favorite / Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(card.id, e)}
                        aria-label={`Save ${card.name} to favorites`}
                        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs border border-neutral-200/80 shadow-2xs flex items-center justify-center hover:bg-white transition-transform active:scale-90 cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors ${
                            isFavorite ? "fill-red-500 text-red-500" : "text-neutral-700"
                          }`}
                          strokeWidth={2}
                        />
                      </button>

                      {/* Product Banner Image */}
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* 2. Title & Subtitle */}
                    <h3 className="font-bold text-[17px] sm:text-[18px] text-neutral-950 leading-snug tracking-tight">
                      {card.name}
                    </h3>
                    <p className="text-[10px] sm:text-[10.5px] font-extrabold text-[#1B4D2E] tracking-wider uppercase mt-1 leading-tight">
                      {card.subtitle}
                    </p>

                    {/* 3. Description */}
                    <p className="text-[11.5px] sm:text-[12px] text-neutral-600 mt-1.5 leading-relaxed line-clamp-2 min-h-[34px]">
                      {card.description}
                    </p>

                    {/* 4. Nutrient / Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {card.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#F0F3F1] text-neutral-700 text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 5. Pricing & Action Button */}
                  <div className="mt-4 pt-2">
                    {/* Price Row */}
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="text-[19px] sm:text-[20px] font-black text-neutral-950 tracking-tight leading-none">
                        ₹{card.price}
                      </span>
                      <span className="text-[12px] sm:text-[13px] text-neutral-400 line-through font-medium leading-none">
                        ₹{card.originalPrice}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-[#1B4D2E] tracking-wider ml-1 leading-none">
                        SAVE ₹{card.saveAmount}
                      </span>
                    </div>

                    {/* Add to Cart Button / Quantity Controller */}
                    {existingCartItem ? (
                      <div className="w-full flex items-center justify-between bg-[#F0F5F2] text-[#1B4D2E] border border-[#1B4D2E]/25 rounded-full h-[44px] px-2 select-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (existingCartItem.quantity > 1) {
                              onUpdateCartQuantity(existingCartItem.id, existingCartItem.quantity - 1);
                            } else {
                              onRemoveCartItem(existingCartItem.id);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-[#1B4D2E]/20 hover:bg-[#1B4D2E]/10 rounded-full text-[#1B4D2E] cursor-pointer transition-colors active:scale-95 shadow-2xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>

                        <span className="text-[11.5px] font-extrabold tracking-wider uppercase text-[#1B4D2E]">
                          {existingCartItem.quantity} Added
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(card);
                          }}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-[#1B4D2E]/20 hover:bg-[#1B4D2E]/10 rounded-full text-[#1B4D2E] cursor-pointer transition-colors active:scale-95 shadow-2xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(card)}
                        className="w-full py-2.5 sm:py-3 rounded-full bg-[#183B1E] hover:bg-[#122D17] active:scale-[0.98] text-white font-extrabold text-[12px] uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {SPECIAL_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "w-4 bg-[#183B1E]" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
 
