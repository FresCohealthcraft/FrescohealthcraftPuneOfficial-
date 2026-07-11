import React, { useState, useEffect } from "react";
import { MenuItem, CartItem } from "../types";
import { MENU_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Leaf, Minus } from "lucide-react";
// @ts-ignore
import orangeJuiceImg from "../assets/images/Orange-Juice.png";
// @ts-ignore
import classicDelightCupImg from "../assets/images/Classic-Delight-Cup.png";
// @ts-ignore
import sproutsBowlImg from "../assets/images/Sprouts-Bowl.png";
// @ts-ignore
import cucumberJuiceImg from "../assets/images/Cucumber-Juice.png";
// @ts-ignore
import vitalEnergyDrinkImg from "../assets/images/Vital-Energy-Drink.png";
// @ts-ignore
import mangoShakeImg from "../assets/images/Mango-Shake.png";
// @ts-ignore
import grapesChocofrostImg from "../assets/images/White-Sprinkle.png";
// @ts-ignore
import chickenPowerBowlImg from "../assets/images/Chicken-Power-Bowl.png";

// @ts-ignore
import ProteinPowerCupImg from "../assets/images/Protein-Power-Cup.png";

// @ts-ignore
import MuskmelonShakeImg from "../assets/images/Muskmelon-Shake.png";


const PREMIUM_ITEMS: Record<string, {
  title: string;
  size: string;
  badge: string;
  subLabel?: string;
  bottomColor: string;
  nutrients: Array<{ emoji: string; value: string; pillClass: string }>;
}> = {
  "Protein-Power-Cup": {
    title: "Power Packed Cup",
    size: "250G",
    badge: "Nutritious",
    subLabel: "VALUE CUP",
    bottomColor: "bg-orange-500",
    nutrients: [
      
    ]
  },
  "Classic-Delight-Cup": {
    title: "Classic Delight Cup",
    size: "350G",
    badge: "8-9 FRUITS",
    subLabel: "FRUIT CUP",
    bottomColor: "bg-rose-500",
    nutrients: [
   
    ]
  },
  "Exotic-Delight-Cup": {
    title: "Exotic Delight Cup",
    size: "350G",
    badge: "13-14 FRUITS",
    subLabel: "PREMIUM CUP",
    bottomColor: "bg-violet-600",
    nutrients: [

    ]
  },
  "Chicken-Power-Bowl": {
    title: "35g Protein Chicken Bowl",
    size: "400G",
    badge: "HIGH PROTEIN",
    bottomColor: "bg-[#38A325]",
    nutrients: [
      
    ]
  },
  "Sprouts-Bowl": {
    title: "Superfood Sprouts Bowl",
    size: "300G",
    badge: "SUPERFOOD",
    bottomColor: "bg-[#EAB308]",
    nutrients: [
      
    ]
  },
  
  "Paneer-Power-Bowl": {
    title: "30G Protein Paneer Bowl",
    size: "400G",
    badge: "HIGH PROTEIN",
    
    bottomColor: "bg-pink-500",
    nutrients: [
     
    ]
  }
};


// Helper to provide 3 distinct, beautiful point-wise benefits for any health item
export function getItemBenefits(item: MenuItem): string[] {
  if (item.benefits && item.benefits.length > 0) {
    return item.benefits;
  }

  const name = item.name.toLowerCase();
  
  if (name.includes("watermelon")) {
    return [
      "Keeps You Hydrated",
      "Supports Heart Health",
      "Rich in Antioxidants"
    ];
  }
  if (name.includes("mosambi")) {
    return [
      "Vitamin C immunity booster",
      "Supporting digestion",
      "Everyday energy."
    ];
  }
  if (name.includes("pineapple")) {
    return [
      "Active digestive enzymes",
      "Rich in bone-strengthening Manganese",
      "Natural premium energy source"
    ];
  }
  if (name.includes("mango")) {
    return [
      "Rich in Vitamin A for eye health",
      "Energy boost packed with natural sweetness",
      "Revitalizing freshness"
    ];
  }
  if (name.includes("apple")) {
    return [
      "Natural antioxidants",
      "Supporting energy",
      "Immunity, and everyday wellness"
    ];
  }
  if (name.includes("orange")) {
    return [
      "Supercharged clinical Vitamin C",
      "Natural energy,",
      "Immunity-boosting goodness"
    ];
  }
  

  if (name.includes("ganga jamuna juice")) {
    return [
      "Mosambi + pinapple, packed with vitamin c",
      "Preserves living immune-bioenzymes",
      "Naturally hydrating & sugar-crash free"  
    ];
  }
if (name.includes("pomegranate")) {
    return [
      "Polyphenolic arterial support",
      "Promotes fresh oxygenated blood",
      "Combats general cellular fatiguing"
    ];
  }

  if (name.includes("nimbu pani juice")) {
    return [
      "Detox drink that refreshes,",
      "Restores natural energy instantlyd",
      "keep hydrates"
    ];
  }

   if (name.includes("muskmelon juice")) {
    return [
      "Polyphenolic arterial support",
      "Promotes fresh oxygenated blood",
      "Combats general cellular fatiguing"
    ];
  }

  if (name.includes("papaya")) {
    return [
      "Active high-grade papain digestion",
      "Fiber to clear abdominal heavy fat",
      "Skin renewing vitamins & folate"
    ];
  }

  if (name.includes("beetroot")) {
    return [
      "Lower blood pressure",
      "Boost athletic stamina",
      "Liver health"
    ];
  }
  if (name.includes("cucumber")) {
    return [
      "Deep alkalizing system cooling",
      "Natural hydration & skin repair",
      "Silica for hair and nail integrity"
    ];
  }

   if (name.includes("tomato juice")) {
    return [
      "Boost heart health",
      "support your immune system and skin",
      "Rich in antioxidants"
    ];
  }

  if (name.includes("karela juice")) {
    return [
      "Supports healthy blood sugar",
      "Boosts digestive health",
      "Natural detox powerhouse"
    ];
  }

  if (name.includes("carrot")) {
    return [
      "supporting eye health",
      "Glowing skin, and natural vitality",
      "Naturally rich in antioxidants"
    ];
  }

  if (name.includes("palak juice")) {
    return [
      "Rich in iron",
      "Antioxidants, and daily nourishment",
      "Rich in antioxidants"
    ];
  }

  if (name.includes("lauki juice")) {
    return [
      "Ntioxidants, and daily nourishment",
      "Naturally low in calories",
      "Nutrients for everyday wellness"
    ];
  }

  if (name.includes("ash gourd juice")) {
    return [
      "Aids digestion",
      "Supports weight loss",
      "Flushes out toxins"
    ];
  }


   if (name.includes("power packed cups")) {
    return [
      "Fuel Your Day Naturally",
      "Power, Protein & Fresh Fruit",
      "Protein & Fiber for Lasting Energy"
    ];
  }


   if (name.includes("classic delight cup")) {
    return [
      "Fresh Fruit Goodness in Every Bite",
      "Naturally Sweet & Nourishing",
      "Rich in Vitamins & Fiber."
    ];
  }


   if (name.includes("exotic delight cup")) {
    return [
      "Boost of Vitamins & Antioxidants",
      "Rich in Antioxidants & Natural Goodness",
      "Bursting with Tropical Freshness"
    ];
  }


  if (name.includes("Super food sprouts bowl")) {
    return [
      "Plant Protein & Fiber",
      "Protein-Rich Fuel for Daily Wellness",
      "Nutrient-Dense Goodness in Every Bite"
    ];
  }
  if (name.includes("Super food paneer sprouts bowl")) {
    return [
      "High Protein, High Satisfaction",
      "Powerful Blend of Protein & Fiber",
      "High Protein, High Satisfaction"
    ];
  }


  if (name.includes("abc drink") ) {
    return [
      "Supports Natural Detox & Vitality",
      "Antioxidant-Rich Daily Wellness Boost",
      "Nourish, Cleanse & Revitalize Naturally"
    ];
  }

  if (name.includes("immunity booster") ) {
    return [
      "Supports Natural Immune Defense",
      "Strengthen Wellness, Naturally",
      "Daily Immune Support & Vitality"
    ];
  }

  if (name.includes("super women") ) {
    return [
      "Supports Energy, Vitality & Balance",
      "Nourishment Designed for Women’s Wellness",
      "Empowering Wellness in Every Sip"
    ];
  }

  if (name.includes("detox body") ) {
    return [
      "Refresh, Cleanse & Rejuvenate Naturally",
      "Supports Natural Cleansing & Hydration",
      "Feel Lighter, Fresher & Revitalized"
    ];
  }

   if (name.includes("stress relief") ) {
    return [
      "Promotes Calm & Relaxation Naturally",
      "Sip Your Way to Serenity",
      "Helps Ease Stress & Restore Balance"
    ];
  }

   if (name.includes("iron rich") ) {
    return [
      "Supports Healthy Iron & Energy Levels",
      "Rich in Iron for Strength & Stamina",
      "Boost Energy, Naturally"
    ];
  }

   if (name.includes("skin glow-up") ) {
    return [
      "Radiant Skin from Within",
      "Glow Naturally, Every Day",
      "Nourishes Healthy, Glowing Skin"
    ];
  }

if (name.includes("liver cleanser") ) {
    return [
      "Refreshing Support for Everyday Wellness",
      "Hydrate, Refresh & Rejuvenate Naturally",
      "Clean, Green Boost for Vitality."
    ];
  }

  if (name.includes("heart care") ) {
    return [
      "Supports Heart Health Naturally",
      "Nourish Your Heart, Naturally",
      "Heart-Friendly Nutrition in Every Sip"
    ];
  }

  if (name.includes("fat burner") ) {
    return [
      "Supports an Active Lifestyle Naturally",
      "Fuel for Your Fitness Journey",
      "Boost Your Day with Natural Energy"
    ];
  }

   if (name.includes("vital energy drink") ) {
    return [
      "Natural Energy for Your Day",
      "Revitalize, Refresh & Recharge",
      "Clean Energy in Every Sip"
    ];
  }

   if (name.includes("gut reset") ) {
    return [
      "Happy Gut, Happy You",
      "Supports Digestive Wellness Naturally",
      "Refresh & Restore Digestive Balance"
    ];
  }

  if (name.includes("clear vision") ) {
    return [
      "Supports Eye Health Naturally",
      "Eye-Friendly Nutrition in Every Sip",
      "See the Day with Clarity"
    ];
  }
  if (name.includes("make your own (any 5)") ) {
    return [
      "Your Choice, Your Wellness",
      "Crafted Fresh, Just for You",
      "Personalized Nutrition in Every Sip"
    ];
  }

 if (name.includes("banana shake") ) {
    return [
      "Potassium & Natural Energy",
      "Rich in Potassium & Natural Energy",
      "Fuel Your Day with Natural Goodness."
    ];
  }

  if (name.includes("apple shake") ) {
    return [
      "Rich in Fiber & Natural Antioxidants",
      "Fresh Energy from Real Apples",
      "Refreshing Nutrition in Every Sip"
    ];
  }

  if (name.includes("muskmelon shake") ) {
    return [
      "Hydrating Goodness with Every Sip",
      "Naturally Refreshing & Nourishing",
      "Rich in Vitamins & Hydration"
    ];
  }

  if (name.includes("mango shake") ) {
    return [
      "Rich in Vitamins & Natural Energy",
      "Naturally Sweet, Energizing & Nourishing",
      "Packed with Antioxidants & Vitality"
    ];
  }

   if (name.includes("oreo shake") ) {
    return [
      "Creamy Oreo Bliss in Every Sip",
      "The Ultimate Cookies & Cream Delight",
      "Rich, Creamy & Irresistibly Delicious"
    ];
  }

   if (name.includes("energy boost shake") ) {
    return [
      "Natural Energy in Every Sip",
      "Fuel Your Day with Lasting Vitality",
      "Power Up Naturally"
    ];
  }

   if (name.includes("coconut caramel frozen banana") ) {
    return [
      "Tropical Indulgence, Naturally Sweet",
      "Real Fruit, Rich Flavor, Pure Enjoyment",
      "Island-Inspired Sweetness in Every Bite."
    ];
  }

   if (name.includes("white sprinkle frozen banana") ) {
    return [
      "Real Banana, Frozen Perfection",
      "Refreshing Treat with Real Fruit Goodness",
      "Refreshing Treat with Real Fruit Goodness"
    ];
  }

   if (name.includes("peanut caramel frozen banana") ) {
    return [
      "Protein-Packed Indulgence",
      "Nutty Protein Meets Natural Banana Goodness",
      "Energy & Flavor in Every Bite"
    ];
  }

   if (name.includes("oreo white frozen banana") ) {
    return [
      "Creamy Banana Meets Cookie Crunch",
      "White Chocolate Bliss with Every Bite",
      "Frozen Banana Goodness, Elevated"
    ];
  }

   if (name.includes("biscoff crunch frozen banana") ) {
    return [
      "Real Banana, Irresistible Crunch",
      "Creamy Banana Meets Biscoff Bliss",
      "Crunchy, Creamy & Delightfully Indulgent"
    ];
  }

   if (name.includes("dubai kunafa pistachio frozen banana") ) {
    return [
      "Kunafa Meets Creamy Pistachio Bliss",
      "Luxurious Blend of Crunch & Creaminess",
      "Inspired by Dubai, Crafted for Indulgence"
    ];
  }

   if (name.includes("apple chocofrost candy") ) {
    return [
      "Fresh Apple, Chocolate Delight",
      "Fruit Meets Premium Chocolate",
      "Blend of Fruit & Indulgence"
    ];
  }

   if (name.includes("grapes chocofrost candy") ) {
    return [
      "Juicy Grapes, Chocolate Bliss",
      "Real Fruit, Premium Chocolate",
      "Bursting with Fruity Goodness"
    ];
  }

   if (name.includes("mango chocofrost candy") ) {
    return [
      "Tropical Mango, Chocolate Bliss",
      "Sweet Mango Meets Rich Chocolate",
      "Perfect Fusion of Fruit & Chocolate"
    ];
  }

  return [
    "No chemical additives or flavorings",
    "Hand-pressed fresh daily on order",
    "Native bio-available vitamins & ions"
  ];
}

interface MenuProps {
  onAddToCartDirectly: (item: MenuItem) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartItems: CartItem[];
  onUpdateCartQuantity: (cartId: string, quantity: number) => void;
  onRemoveCartItem: (cartId: string) => void;
}

const CATEGORIES = [
  { name: "Fruit Juices", image: orangeJuiceImg, value: "Fruit Juices" },
  { name: "Power Cups", image: ProteinPowerCupImg, value: "Power Cups" },
  { name: "High Protein Meals", image: chickenPowerBowlImg, value: "High Protein Meals" },
  { name: "Green Juice", image: cucumberJuiceImg, value: "Green Vitality Juice" },
  { name: "FresCo Power Juices", image: vitalEnergyDrinkImg, value: "Fresco Power Juices" },
  { name: "Shakes", image: MuskmelonShakeImg, value: "Shakes" },
  { name: "Choco Frozen Banana", image: grapesChocofrostImg, value: "Specials" }
];

export default function MenuGrid({ 
  onAddToCartDirectly,
  searchTerm,
  setSearchTerm,
  cartItems,
  onUpdateCartQuantity,
  onRemoveCartItem
}: MenuProps) {
 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      setSelectedCategory(null);
    }
  }, [searchTerm]);

  const getCartItemInfo = (itemId: string) => {
    // Find a standard (non-customized) cart item first
    const found = cartItems.find(
      (c) => c.menuItem.id === itemId && (!c.customIngredients || c.customIngredients.length === 0)
    );
    if (found) {
      return { quantity: found.quantity, cartId: found.id };
    }
    
    // Fallback: sum of all quantities for this item
    const allOfThisType = cartItems.filter((c) => c.menuItem.id === itemId);
    if (allOfThisType.length > 0) {
      return { 
        quantity: allOfThisType.reduce((acc, c) => acc + c.quantity, 0), 
        cartId: allOfThisType[0].id // use the first one's id for any updates
      };
    }
    
    return { quantity: 0, cartId: "" };
  };

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
    <section id="menu" className={`pt-2 ${selectedCategory || searchTerm ? "pb-12" : "pb-2"} bg-white scroll-mt-10 border-t border-[#1A1A1A]/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

         {/* Free Home Delivery Highlight Line */}
        <div className="relative bg-gradient-to-r from-[#3AA324] via-[#32981E] to-[#247E11] text-white rounded-[16px] p-3 sm:p-4 shadow-[0_6px_24px_rgba(56,163,37,0.06)] overflow-hidden z-10 border border-[#38A325]/35">
          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[#38A325]/10 border border-[#38A325]/20 text-[#ffffff] font-black uppercase tracking-widest rounded-full shadow-xs min-w-[291px] w-auto">
            <span className="inline-block animate-pulse rounded-full bg-[#ffffff]" style={{ fontSize: "30px", lineHeight: "32px", width: "6.7639px", height: "10px" }} />
            <span className="pl-0 flex items-center justify-center" style={{ width: "267.139px", height: "22.5px", fontSize: "17px" }}>🚚 FREE HOME DELIVERY </span>
          </span>
        </div>



        {/* CATEGORIES CARD VIEW: Displayed beautifully as a main category selector card */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="mt-4 bg-[#FDFDFD] border border-neutral-200/50 rounded-[2.5rem] pt-6 px-4 pb-8 sm:pt-8 sm:px-8 sm:pb-10 max-w-2xl mx-auto shadow-[0_10px_35px_-8px_rgba(26,26,26,0.025)] flex flex-col items-center text-center relative overflow-hidden mb-8"
        >
          {/* Soft ambient background glow */}
          <div className="absolute -top-24 -left-24 w-40 h-40 rounded-full bg-[#38A325]/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-40 h-40 rounded-full bg-[#EFECE5]/40 blur-3xl pointer-events-none" />

          {/* Centered header: OUR DAILY MENU with elegant green decorative elements */}
          <div className="flex items-center justify-center space-x-2.5 sm:space-x-3.5 mb-6 sm:mb-8 mt-1 z-10 select-none">
            <span className="text-[#38A325] text-xs sm:text-sm font-bold tracking-widest flex items-center">
              <span className="opacity-40 mr-1">─</span>⊹
            </span>
            <h2 className="text-[13px] sm:text-sm md:text-base font-black text-[#1A1A1A] tracking-[0.22em] uppercase font-sans">
              MENU
            </h2>
            <span className="text-[#38A325] text-xs sm:text-sm font-bold tracking-widest flex items-center">
              ⊹<span className="opacity-40 ml-1">─</span>
            </span>
          </div>

          {/* Circular Category Buttons layout (4 in one line) */}
          <div className="flex flex-wrap justify-center gap-x-2.5 sm:gap-x-8 gap-y-5 sm:gap-y-7 max-w-[400px] xs:max-w-[440px] sm:max-w-[720px] mx-auto px-1 z-10">
            {CATEGORIES.map((cat, idx) => {
              const isActive = selectedCategory === cat.name;
              return (
                <motion.button
                  key={cat.name}
                  onClick={() => {
                    if (isActive) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(cat.name);
                      setSearchTerm(""); // clear search term to show full category items
                      // Smoothly scroll down to the category results section
                      setTimeout(() => {
                        const element = document.getElementById("categories-results-anchor");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 100);
                    }
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 14,
                    delay: idx * 0.04
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2.5 group cursor-pointer focus:outline-none shrink-0 w-auto min-w-[84px] sm:min-w-[112px] px-1"
                >
                  {/* Perfect circle image frame with light cream background */}
                  <div
                    className={`w-[76px] h-[76px] xs:w-[82px] xs:h-[82px] sm:w-[104px] sm:h-[104px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 bg-[#FAF9F5]/40 border ${
                      isActive
                        ? "border-[#38A325] ring-4 ring-[#38A325]/15 scale-105 shadow-md bg-white"
                        : "border-neutral-200/55 hover:border-[#38A325]/40 hover:scale-105 shadow-[0_3px_12px_rgba(0,0,0,0.01)] hover:bg-white"
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-[88%] h-[88%] rounded-full object-cover"
                      style={
                        cat.name === "Fruit Juices"
                          ? { width: "102.9444px", height: "114.9444px" }
                          : cat.name === "Power Cups"
                          ? { width: "102.9444px", height: "114.9444px" }
                          : cat.name === "High Protein Meals"
                          ? { width: "94.2222px", height: "85.3056px" }
                          : cat.name === "Super Food Sprouts Bowls"
                          ? { width: "102.9444px", height: "114.9444px" }
                          : cat.name === "Green Juice"
                          ? { width: "102.9444px", height: "114.9444px" }
                          : cat.name === "FresCo Power Juices"
                          ? { width: "102.9444px", height: "114.9444px" }
                          : cat.name === "Shakes"
                          ? { width: "102.9444px", height: "115.9444px" }
                          : cat.name === "Choco Frozen"
                          ? { width: "102.9444px", height: "106.9444px" }
                          : undefined
                      }
                    />
                  </div>
                  {/* Category Label below circle */}
                  <span
                    className={`text-[9.5px] sm:text-xs font-bold tracking-tight text-center transition-colors font-sans whitespace-nowrap ${
                      isActive ? "text-[#38A325] font-black" : "text-gray-700 group-hover:text-[#38A325]"
                    }`}
                  >
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll anchor target for category clicks */}
        <div id="categories-results-anchor" className="scroll-mt-24 sm:scroll-mt-28" />

        {/* Selected Category breadcrumbs / header */}
        {(selectedCategory || searchTerm) && (
          <div className="max-w-4xl mx-auto flex items-center justify-between mb-6 px-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Showing Results For</span>
              <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#38A325]">{selectedCategory || `"${searchTerm}"`}</span>
                <span className="text-xs font-normal text-gray-400">({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})</span>
              </h3>
            </div>
            <button
              onClick={() => { setSelectedCategory(null); setSearchTerm(""); }}
              className="text-gray-400 hover:text-[#38A325] text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1 focus:outline-none border-none bg-transparent cursor-pointer"
            >
              Clear Filter ✕
            </button>
          </div>
        )}

        {/* Menu Items Grid - Conditionally rendered when a category is selected or search is active */}
        {(selectedCategory || searchTerm) && (
          <>
            <motion.div 
              layout
              className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 px-1 sm:px-2 max-w-5xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const premiumInfo = PREMIUM_ITEMS[item.id];
                  const cartItemInfo = getCartItemInfo(item.id);
                  if (premiumInfo) {
                    return (
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
                          y: -4,
                          boxShadow: "0 12px 24px -8px rgba(26,26,26,0.12)"
                        }}
                        key={item.id}
                        className="relative bg-white border border-[#1A1A1A]/10 rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#38A325]/30 transition-all duration-300 flex flex-col justify-between h-full text-left group overflow-hidden pb-6 min-h-[510px]"
                      >
                        {/* 1. Image Container with Badges */}
                        <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden bg-neutral-50/50 flex items-center justify-center z-0 shrink-0">
                          {item.image ? (
                            <img 
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl">
                              {item.icon}
                            </div>
                          )}
                          
                          {/* Badges Overlay */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-[#38A325] text-white text-[8px] sm:text-[9.5px] font-black px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                              {premiumInfo.badge}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-neutral-100/90 backdrop-blur-xs text-neutral-800 text-[8px] sm:text-[9.5px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                              {premiumInfo.size}
                            </span>
                          </div>
                        </div>

                        {/* 2. Text Content */}
                        <div className="flex-1 flex flex-col justify-between mt-4">
                          <div>
                            {/* Title with Sprout Icon */}
                            <h3 className="text-sm sm:text-base font-black text-neutral-900 uppercase tracking-tight leading-snug flex items-center gap-1.5 flex-wrap">
                              <span>{premiumInfo.title}</span>
                              <span className="text-[#38A325] text-xs sm:text-sm"></span>
                            </h3>

                            {/* Description */}
                            <p className="mt-1.5 text-[10.5px] sm:text-[11.5px] text-neutral-500 font-medium leading-relaxed line-clamp-3">
                              {item.description}
                            </p>

                            {/* Nutrition Pills */}
                            {premiumInfo.nutrients && premiumInfo.nutrients.length > 0 && (
                              <div className="mt-3.5 flex flex-wrap gap-1 sm:gap-1.5">
                                {premiumInfo.nutrients.map((nut, i) => (
                                  <span 
                                    key={i} 
                                    className={`border ${nut.pillClass} text-[7.5px] sm:text-[8.5px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-2xs`}
                                  >
                                    <span>{nut.emoji}</span>
                                    <span>{nut.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}

                             {/* Dynamic Point-wise Benefits for Premium Items */}
                             <div className="mt-2 pt-2 border-t border-[#1A1A1A]/5 space-y-1">
                               <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-[#38A325] block mb-0.5">
                                 Key Benefits
                               </span>
                               {getItemBenefits(item).map((benefit, idx) => (
                                 <div key={idx} className="flex items-center space-x-1.5 text-[8.5px] xs:text-[9px] sm:text-[9.5px] text-emerald-800/80 font-semibold leading-tight">
                                   <span className="w-1 h-1 rounded-full bg-[#38A325] shrink-0" />
                                   <span className="truncate">{benefit}</span>
                                 </div>
                               ))}
                             </div>
                          </div>

                          {/* 3. Bottom Row: Price, Sublabel & Button */}
                          <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-1.5 w-full">
                            <div className="flex flex-col">
                              <span className="text-lg sm:text-xl font-black font-sans text-neutral-900 leading-none">
                                ₹{item.price}
                              </span>
                              {premiumInfo.subLabel && (
                                <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-neutral-400 mt-1 leading-none">
                                  {premiumInfo.subLabel}
                                </span>
                              )}
                            </div>

                            {cartItemInfo.quantity > 0 ? (
                              <div className="flex items-center bg-[#38A325] text-white rounded-xl overflow-hidden shadow-md select-none shrink-0 border border-transparent h-[32px] sm:h-[38px]">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (cartItemInfo.quantity > 1) {
                                      onUpdateCartQuantity(cartItemInfo.cartId, cartItemInfo.quantity - 1);
                                    } else {
                                      onRemoveCartItem(cartItemInfo.cartId);
                                    }
                                  }}
                                  className="px-2.5 sm:px-3 h-full flex items-center justify-center hover:bg-[#2c821c] active:bg-[#1a550f] cursor-pointer transition-colors"
                                >
                                  <Minus className="w-3 h-3 stroke-[3]" />
                                </button>
                                <span className="px-1 sm:px-2 text-xs sm:text-sm font-black min-w-[20px] text-center">
                                  {cartItemInfo.quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCartDirectly(item);
                                  }}
                                  className="px-2.5 sm:px-3 h-full flex items-center justify-center hover:bg-[#2c821c] active:bg-[#1a550f] cursor-pointer transition-colors"
                                >
                                  <Plus className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAddToCartDirectly(item);
                                }}
                                className="px-4 py-1.5 sm:px-5 sm:py-2.5 bg-[#38A325] hover:bg-[#2c821c] active:bg-[#1a550f] text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer transition-all border border-transparent shadow-xs active:scale-95 hover:scale-103 shrink-0"
                              >
                                <Plus className="w-3 h-3 stroke-[3]" />
                                <span>Add</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
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
                        y: -4,
                        boxShadow: "0 12px 24px -8px rgba(26,26,26,0.1)"
                      }}
                      key={item.id}
                      className="bg-white border border-[#1A1A1A]/10 rounded-[18px] p-3 sm:p-4.5 shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:border-[#38A325]/45 transition-all duration-300 flex flex-col justify-between h-full text-left group"
                    >
                    <div>
                      
                      {/* Image/Emoji wrapper Container */}
                      <div className="relative w-full aspect-[1.2/1] rounded-2xl bg-[#EFECE5] select-none flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4 overflow-hidden transition-transform group-hover:scale-[1.02] duration-300">
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
                      <p className="mt-1 mb-2 text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-[#1A1A1A]/60 leading-normal select-none font-medium">
                        {item.description}
                      </p>

                      {/* Dynamic Point-wise Benefits */}
                      {!["Shakes", "Specials", "Fruit Juices", "Green Vitality Juice"].includes(item.category || "") && (
                        <div className="mt-1.5 pt-1.5 border-t border-[#1A1A1A]/5 space-y-1">
                          <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-[#38A325] block mb-1">
                            Key Benefits
                          </span>
                          {getItemBenefits(item).map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-1.5 text-[8.5px] xs:text-[9px] sm:text-[9.5px] text-emerald-800/80 font-semibold leading-tight">
                              <span className="w-1 h-1 rounded-full bg-[#38A325] shrink-0" />
                              <span className="truncate">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    
                    </div>
     
                     {/* Bottom line with price and action column (Add to Cart + Order in one line) */}
                    <div className="mt-3.5 pt-2 border-t border-[#1A1A1A]/5 flex flex-row items-center justify-between gap-1.5 w-full">
                      <div className="flex flex-col shrink-0">
                        <span className="text-sm xs:text-base sm:text-lg font-extrabold font-sans text-[#38A325] leading-none">
                          ₹{item.price}
                        </span>
                        <span className="text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A]/40 mt-0.5 leading-none">
                          per serving
                        </span>
                      </div>
     
                      <div className="flex flex-row items-center gap-1 shrink-0">
                        {cartItemInfo.quantity > 0 ? (
                          <div className="flex items-center bg-[#1A1A1A] hover:bg-[#2c821c]/15 hover:border-[#38A325]/20 border border-transparent text-white rounded-full overflow-hidden select-none h-5.5 sm:h-7 shadow-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (cartItemInfo.quantity > 1) {
                                  onUpdateCartQuantity(cartItemInfo.cartId, cartItemInfo.quantity - 1);
                                } else {
                                  onRemoveCartItem(cartItemInfo.cartId);
                                }
                              }}
                              className="w-5.5 sm:w-7 h-full flex items-center justify-center hover:bg-[#38A325] cursor-pointer transition-colors"
                              title="Decrease Quantity"
                            >
                              <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={2.5} />
                            </button>
                            <span className="px-1 text-[10px] sm:text-xs font-black min-w-[16px] text-center">
                              {cartItemInfo.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCartDirectly(item);
                              }}
                              className="w-5.5 sm:w-7 h-full flex items-center justify-center hover:bg-[#38A325] cursor-pointer transition-colors"
                              title="Increase Quantity"
                            >
                              <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={2.5} />
                            </button>
                          </div>
                        ) : (
                          /* Add to Cart Button */
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCartDirectly(item);
                            }}
                            className="w-5.5 h-5.5 sm:w-7 sm:h-7 bg-[#1A1A1A] hover:bg-[#38A325] active:bg-[#111111] text-white rounded-full flex items-center justify-center cursor-pointer transition-all border border-transparent shadow-xs active:scale-95 hover:scale-105 shrink-0"
                            title="Add to Cart"
                          >
                            <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                          </button>
                        )}
                      </div>
                    </div>
     
                  </motion.div>
                )})}
              </AnimatePresence>
            </motion.div>

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
          </>
        )}

      </div>
    </section>
  );
}

