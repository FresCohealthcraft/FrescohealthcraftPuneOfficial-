import { motion } from "motion/react";
import { PromoCoupon } from "../types";
import { PROMO_COUPONS } from "../data";
import { Gift, Clock, Sparkles, Calendar, Check } from "lucide-react";

interface SpecialOffersProps {
  onApplyCoupon: (coupon: PromoCoupon) => void;
  appliedCouponCode?: string;
}

export default function SpecialOffers({ onApplyCoupon, appliedCouponCode }: SpecialOffersProps) {
  // Map icons dynamically
  const getIcon = (code: string) => {
    switch (code) {
      case "COMBO20":
        return <Gift className="w-5.5 h-5.5 text-[#4A8824]" />;
      case "HAPPY15":
        return <Clock className="w-5.5 h-5.5 text-[#F26419]" />;
      case "WELCOME25":
        return <Sparkles className="w-5.5 h-5.5 text-[#4A8824]" />;
      case "WEEKLY30":
        return <Calendar className="w-5.5 h-5.5 text-[#F26419]" />;
      default:
        return <Gift className="w-5.5 h-5.5 text-[#4A8824]" />;
    }
  };

  const getSubTags = (code: string) => {
    switch (code) {
      case "COMBO20":
        return ["Valid till month end", "Min. 2 items"];
      case "HAPPY15":
        return ["Daily 2 PM - 5 PM", "All items"];
      case "WELCOME25":
        return ["First order only", "No minimum order"];
      case "WEEKLY30":
        return ["Min 7 days subscription", "Daily fresh delivery"];
      default:
        return ["Limited period offer"];
    }
  };

  const handleClaim = (coupon: PromoCoupon) => {
    onApplyCoupon(coupon);
    
    // Smooth scroll into Cart/Checkout section to show benefits
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="offers" className="py-20 bg-[#EFECE5]/40 scroll-mt-20 border-y border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Special Offers Badge */}
        <div className="inline-flex items-center justify-center border border-[#4A8824]/30 text-[#4A8824] bg-transparent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Special Offers
        </div>

        {/* Display Title */}
        <h2 className="text-3xl sm:text-4.5xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
          Today's Special Deals
        </h2>
        <p className="mt-2 text-[#1A1A1A]/70 max-w-2xl mx-auto text-base sm:text-lg">
          Don't miss out on our amazing offers! Order now and save big on your favorite healthy drinks
        </p>

        {/* Deals Cards Grid matching the screenshot (2x2 layout on large desktops) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {PROMO_COUPONS.map((coupon) => {
            const isApplied = appliedCouponCode === coupon.code;
            const subTags = getSubTags(coupon.code);

            return (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                key={coupon.id}
                className="bg-white border border-[#1A1A1A]/10 rounded-3xl p-6 shadow-[0_4px_24_rgba(0,0,0,0.01)] hover:shadow-lg transition-all duration-300 text-left flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                {/* Left Side: Detail & Coupon metadata */}
                <div className="flex items-start space-x-4">
                  
                  {/* Icon Wrapper in corresponding background colors */}
                  <div className="p-4 bg-[#EFECE5] rounded-2xl shrink-0">
                    {getIcon(coupon.code)}
                  </div>

                  <div>
                    {/* Slogan title and Discount tag */}
                    <div className="flex items-center space-x-2.5">
                      <h3 className="font-bold text-base text-[#1A1A1A]">
                        {coupon.label}
                      </h3>
                      <span className="bg-[#4A8824]/10 text-[#4A8824] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {coupon.tag}
                      </span>
                    </div>

                    <p className="text-[#1A1A1A]/70 text-xs mt-1.5 leading-relaxed max-w-md">
                      {coupon.description}
                    </p>

                    {/* Pills labels for coupon validation specifications */}
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      <span className="bg-[#4A8824]/10 text-[#4A8824] text-xs font-bold px-2.5 py-1 rounded-md border border-[#4A8824]/10">
                        Simple Automatic Discount
                      </span>
                      {subTags.map((tag, i) => (
                        <span key={i} className="bg-[#F9F8F4]/50 border border-[#1A1A1A]/5 text-[#1A1A1A]/60 text-xs font-semibold px-2.5 py-1 rounded-md">
                          • {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Side / Button Action */}
                <div className="mt-5 md:mt-0 w-full md:w-auto shrink-0 pl-0 md:pl-4">
                  <button
                    onClick={() => handleClaim(coupon)}
                    className={`w-full md:w-auto px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer border uppercase tracking-wider ${
                      isApplied
                        ? "bg-[#4A8824] text-white border-[#4A8824]"
                        : "bg-transparent text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F8F4]"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        <span>Discount Applied!</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        <span>Apply Discount</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
