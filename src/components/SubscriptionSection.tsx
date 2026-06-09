import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CartItem } from "../types";
import { Leaf, Calendar, Sparkles, CheckCircle2, ChevronRight, Gift, Trophy, ShieldAlert } from "lucide-react";

interface SubscriptionSectionProps {
  onAddToCartDirectly: (item: MenuItem) => void;
}

export default function SubscriptionSection({ onAddToCartDirectly }: SubscriptionSectionProps) {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState<string | null>(null);

  const weeklyPlans = [
    {
      id: "sub_monday",
      name: "Detox Monday",
      icon: "🌱",
      subtitle: "Detox Body + Sprouts Bowl",
      tags: ["Value Pack", "Immunity"],
      originalPrice: 158,
      price: 142,
      description: "Kickstart your week with our refreshing Detox Body Juice paired with a nutrient-rich SuperFood Sprouts Bowl for a naturally cleansing experience.",
      bgColor: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
      accentColor: "#10b981"
    },
    {
      id: "sub_tuesday",
      name: "Immunity Tuesday",
      icon: "🛡️",
      subtitle: "Immunity Booster + Classic Delight Cup",
      tags: ["Detox", "Full Day"],
      originalPrice: 178,
      price: 160,
      description: "Strengthen your immunity with our antioxidant-packed Immunity Booster Juice and a delicious Classic Delight Fruit Cup loaded with fresh fruits.",
      bgColor: "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-800",
      accentColor: "#f59e0b"
    },
    {
      id: "sub_wednesday",
      name: "Energy Wednesday",
      icon: "⚡",
      subtitle: "Vital Energy Drink + Protein Power Cup",
      tags: ["Detox", "Full Day"],
      originalPrice: 218,
      price: 196,
      description: "Recharge your day with our Vital Energy Drink and Protein Power Cup, crafted to provide sustained energy, protein, and wholesome nutrition.",
      bgColor: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-800",
      accentColor: "#ef4444"
    },
    {
      id: "sub_thursday",
      name: "Glow Thursday",
      icon: "✨",
      subtitle: "Skin Glow-up + Exotic Delight Cup",
      tags: ["Detox", "Full Day"],
      originalPrice: 188,
      price: 169,
      description: "Support healthy, radiant skin with our Skin Glow-Up Juice and Exotic Delight Fruit Cup filled with colorful fruits and natural goodness.",
      bgColor: "bg-fuchsia-100/40 hover:bg-fuchsia-100/70 border-fuchsia-400/10 hover:border-fuchsia-400/30 text-fuchsia-800",
      accentColor: "#d946ef"
    },
    {
      id: "sub_friday",
      name: "Fitness Friday",
      icon: "💪",
      subtitle: "Fat Burner + Paneer Sprouts Bowl",
      tags: ["Active High", "Low Carb"],
      originalPrice: 210,
      price: 189,
      description: "Stay active and focused with our Fat Burner Juice and SuperFood Paneer Sprouts Bowl, a perfect blend of protein, fiber, and wellness.",
      bgColor: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 hover:border-blue-500/30 text-blue-800",
      accentColor: "#3b82f6"
    },
    {
      id: "sub_saturday",
      name: "Refresh Saturday",
      icon: "🍉",
      subtitle: "ABC Drink + Banana Shake",
      tags: ["Weekend Prep", "Hydration"],
      originalPrice: 180,
      price: 162,
      description: "Refresh and revitalize with our classic ABC Drink and creamy Banana Shake, delivering hydration, vitamins, and natural energy.",
      bgColor: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
      accentColor: "#8b5cf6"
    }
  ];

  const monthlySubscriptions = [
    {
      id: "month_green_taster",
      name: "Daily Fresh Plan",
      icon: "🥝",
      subtitle: "30 Day Detox Cycle",
      deliveries: "30 deliveries",
      savings: "Save ₹447 off standard menu",
      price: 4023,
      benefits: [
        "1 Fresh organic fruit Juice daily",
        "1 Sprouts Bowl daily",
        "Flexible weekend timeslot choices",
        "Free delivery"
      ],
      popular: false,
      bgColor: "bg-white",
      accentColor: "#38A325",
      whatsappText: "Hi! I want to subscribe to the Basic Wellness Plan (₹4023) on FresCo Pune."
    },
    {
      id: "month_balanced_cleanse",
      name: "Protein Plus Plan",
      icon: "🥑",
      subtitle: "30 Days Cycle",
      deliveries: "30 deliveries (Morning 7-10AM)",
      savings: "Save ₹694 off standard menu",
      price: 6242,
      benefits: [
        "1 Power packed cups / Day",
        "1 Paneer Sprouts Bowl / Day",
        "1 premium Fruit Cup every Sunday",
        " Priority Morning Delivery (7–10 AM)",
        "Pause Subscription anytime via our portal/ WhatsApp"
      ],
      popular: true,
      bgColor: "bg-gradient-to-b from-white to-[#38A325]/5",
      accentColor: "#38A325",
      whatsappText: "Hi! I want to subscribe to the Premium Wellness Plan (₹6242) on FresCo Pune."
    },
    {
      id: "month_wellness_overhaul",
      name: "Full Wellness Overhaul",
      icon: "👑",
      subtitle: "30-Day Daily Fresh Wellness Goal",
      deliveries: "30 deliveries / month (Daily Morning Delivery)",
      savings: "Save ₹831 off standard retail menu",
      price: 7481,
      benefits: [
        "1 Fruit Juice or Green vitality juice / Day (Choose daily from our menu)",
        "1 Sprouts Bowl / Day",
        "1 premium Fruit Cup / Day",
        "1 Power packed cup every Sunday",
        "1 Paneer Sprouts Bowl every Sunday",
        "Premium thermal luxury bottle supplied on Day 1 (Co-branded FresCo)",
        "Zero hidden extra taxes, dedicated concierge Whatsapp service"
      ],
      popular: false,
      bgColor: "bg-white",
      accentColor: "#F26419",
      whatsappText: "Hi! I want to subscribe to the Full Wellness Overhaul Monthly Plan (₹7481) on FresCo Pune."
    }
  ];

  const handleAddWeeklyDay = (plan: typeof weeklyPlans[0]) => {
    // Map custom plan to a standard MenuItem object
    const menuItem: MenuItem = {
      id: plan.id,
      name: plan.name,
      category: "Detox & Wellness",
      price: plan.price,
      description: `${plan.subtitle} — ${plan.description}`,
      icon: plan.icon
    };
    onAddToCartDirectly(menuItem);
  };

  const handleMonthlySubscribe = (sub: typeof monthlySubscriptions[0]) => {
    setShowSubscriptionSuccess(sub.name);
    setTimeout(() => {
      setShowSubscriptionSuccess(null);
      // Construct perfect WhatsApp subscription order text
      const encodedText = encodeURIComponent(sub.whatsappText);
      window.open(`https://wa.me/918983363146?text=${encodedText}`, "_blank");
    }, 1500);
  };
 
  return (
    <section id="subscriptions" className="pt-3.5 pb-3 bg-gradient-to-br from-white via-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#38A325]/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-[#F26419]/5 rounded-full filter blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subscription Badge */}
        <div className="inline-flex items-center justify-center border border-[#38A325]/30 text-[#38A325] bg-transparent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Wellness Subscriptions
        </div>

        {/* Dynamic Headings */}
        <h2 className="text-3xl sm:text-4.5xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Fresco Healthcraft Wellness Plans
        </h2>
        <p className="mt-2 text-[#1A1A1A]/70 max-w-2xl mx-auto text-base sm:text-lg">
          Transform your daily wellness and save big with scheduled raw nourishment. Freshly prepared and delivered daily to your Pune doorstep.
        </p>

        {/* Tabs for switching between Weekly and Monthly subscriptions (Matched to user visual references) */}
        <div className="mt-5 mb-6 flex justify-center">
          <div className="bg-[#EFECE5] p-1 rounded-full inline-flex space-x-1 border border-[#1A1A1A]/5 shadow-inner">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`py-1.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "weekly"
                  ? "bg-[#38A325] text-white shadow-md"
                  : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Wellness Plan</span>
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`py-1.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === "monthly"
                  ? "bg-[#38A325] text-white shadow-md"
                  : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Monthly subscriptions</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "weekly" ? (
            <motion.div
              layout
              key="weekly"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Daily Wellness Slogan Title cards */}
              <div className="flex flex-col items-center justify-center max-w-4xl mx-auto mb-4 p-3.5 bg-[#F9F8F4] border border-[#1A1A1A]/10 rounded-2xl">
                <div className="flex items-center space-x-2 text-left">
                  <span className="text-xl">🌱</span>
                  <div>
                    <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-widest text-[#38A325]">
                      Standard 6-Day Nutrient Cycle Offer
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-550 leading-relaxed mt-0.5">
                      Order individual curated days with **10% Combo Discount** included. Every meal contains one master healthy juice pairing + high-fiber nutrient sprouts bowl.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-column Grid representing the 6 premium days of the week (Monday through Saturday) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 text-left max-w-5xl mx-auto">
                {weeklyPlans.map((plan) => (
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    key={plan.id}
                    className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top detail with icon and discount tag */}
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 bg-[#EFECE5] rounded-lg text-lg select-none">
                          {plan.icon}
                        </div>
                        <span className="bg-red-500 text-white text-[7px] sm:text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                          10% OFF
                        </span>
                      </div>

                      {/* Header values */}
                      <h3 className="font-serif italic text-sm sm:text-base text-[#1A1A1A] mt-2.5 font-semibold leading-tight">
                        {plan.name}
                      </h3>
                      <p className="text-[#38A325] font-bold text-[9px] sm:text-[10px] uppercase tracking-wide mt-0.5">
                        {plan.subtitle}
                      </p>

                      {/* Pill labels */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {plan.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-[#EFECE5]/40 text-[#1A1A1A]/60 px-1.5 py-0.5 border border-[#1A1A1A]/5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Specific daily menu combo description */}
                      <p className="text-[#1A1A1A]/75 text-[9.5px] sm:text-[11px] mt-2 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Footer values: Price with original strikes and dynamic green button */}
                    <div className="mt-3.5 pt-2 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-base sm:text-lg font-serif italic font-bold text-[#38A325]">
                          ₹{plan.price}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through font-mono">
                          ₹{plan.originalPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddWeeklyDay(plan)}
                        className="bg-[#1A1A1A] hover:bg-[#38A325] hover:scale-105 active:scale-95 text-white p-1.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm flex items-center justify-center"
                        title="Add this day's combo to Cart"
                      >
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              layout
              key="monthly"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Monthly Packages layout with highlights and custom benefits checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-5xl mx-auto text-left">
                {monthlySubscriptions.map((sub) => (
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    key={sub.id}
                    className={`rounded-xl p-3 sm:p-3.5 border hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative ${sub.bgColor} ${
                      sub.popular 
                        ? "border-[#38A325] shadow-md ring-2 ring-[#38A325]/10" 
                        : "border-[#1A1A1A]/10 shadow-sm"
                    }`}
                  >
                    {/* Popular Badge recommendation */}
                    {sub.popular && (
                      <span className="absolute -top-2 right-3 bg-[#38A325] text-white text-[7px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                        Best Seller
                      </span>
                    )}

                    <div>
                      {/* Icon & Title */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg sm:text-xl select-none shrink-0">{sub.icon}</span>
                        <div>
                          <h3 className="font-bold text-[12px] sm:text-sm text-[#1A1A1A] leading-tight">
                            {sub.name}
                          </h3>
                          <p className="text-[8px] sm:text-[9.2px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                            {sub.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Display pricing details */}
                      <div className="mt-2 p-2 bg-[#EFECE5]/35 rounded-lg border border-[#1A1A1A]/5 text-center">
                        <span className="text-[8px] text-gray-400 block font-mono leading-none">Monthly Subscription Fee</span>
                        <div className="flex items-baseline justify-center space-x-0.5 mt-0.5">
                          <span className="text-base sm:text-lg font-serif italic font-extrabold text-[#1A1A1A]">₹{sub.price}</span>
                          <span className="text-[8.5px] text-gray-500">/ month</span>
                        </div>
                        <span className="text-[7.5px] font-bold text-[#38A325] bg-[#38A325]/10 px-2.5 py-0.5 rounded-full inline-block mt-0.5 leading-none">
                          {sub.savings}
                        </span>
                      </div>

                      {/* Details block */}
                      <div className="mt-2.5 space-y-2 font-medium text-[9px] sm:text-[10px] text-gray-600">
                        <p className="font-bold text-[7.5px] uppercase text-[#1A1A1A]/40 tracking-wider">
                          Deliveries frequency:
                        </p>
                        <p className="text-[#1A1A1A] font-bold flex items-center gap-1 bg-[#38A325]/5 py-1 px-2.5 rounded-md border border-[#38A325]/15 text-[9px]">
                          <Calendar className="w-3 h-3 text-[#38A325]" />
                          <span>{sub.deliveries}</span>
                        </p>
                        
                        <p className="font-bold text-[7.5px] uppercase text-[#1A1A1A]/40 tracking-wider pt-0.5">
                          Exclusive Benefits:
                        </p>
                        <ul className="space-y-1 text-[8.5px] sm:text-[9.5px]">
                          {sub.benefits.map((b, i) => (
                            <li key={i} className="flex items-start space-x-1.5 text-[#1A1A1A]/85">
                              <CheckCircle2 className="w-3 h-3 text-[#38A325] shrink-0 mt-0.5" />
                              <span className="leading-tight">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Subscription verification activator trigger button */}
                    <div className="mt-3 pt-2 border-t border-[#1A1A1A]/5">
                      <button
                        onClick={() => handleMonthlySubscribe(sub)}
                        className={`w-full py-1.5 sm:py-2 rounded-lg font-bold text-[8.5px] sm:text-[9px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-1 shadow-sm ${
                          sub.popular
                            ? "bg-[#38A325] hover:bg-[#38A325]/95 text-white"
                            : "bg-[#1A1A1A] hover:bg-[#38A325] text-white"
                        }`}
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                        </svg>
                        <span>Activate via WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global floating notification success */}
        <AnimatePresence>
          {showSubscriptionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-8 py-4.5 rounded-2xl shadow-2xl flex items-center space-x-3.5 z-50 border border-white/10"
            >
              <div className="p-1 px-1.5 bg-[#38A325] rounded-full text-white text-xs">✔</div>
              <div>
                <p className="font-bold text-sm tracking-wide">Subscription Selected!</p>
                <p className="text-[10px] text-gray-400">Connecting to FresCo WhatsApp concierge to lock in {showSubscriptionSuccess}...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
