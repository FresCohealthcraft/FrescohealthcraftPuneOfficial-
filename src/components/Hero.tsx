import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from "lucide-react";
import Logo from "./Logo";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF6E6] via-white to-white pt-5 pb-2 border-b border-[#1A1A1A]/5">
      
      {/* Decorative architectural layout detail line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-5">
          
          {/* Slogan pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-1.5 border border-[#38A325]/30 text-[#38A325] bg-[#38A325]/5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em]"
          >
            <Leaf className="w-3 h-3" />
            <span>Pure Wellness • Freshly Crafted Daily</span>
          </motion.div>

          {/* Main Header Tag */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4.5xl md:text-5xl lg:text-5.5xl leading-[1.1] font-serif italic tracking-tight text-[#1A1A1A]"
          >
            Nourish Your Body <br />
            With <span className="text-[#38A325]">Pure Wellness</span>
          </motion.h1>

          {/* Rich Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#1A1A1A]/70 max-w-xl text-xs sm:text-sm leading-relaxed font-normal"
          >
        Fresco Crafted with quality ingredients and natural goodness, every serving is designed to refresh, energize, and support a healthier lifestyle.
            
     </motion.p>

          {/* Unique Selling Points Highlights in compact beautiful badge pills */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-1.5 max-w-md w-full pt-0.5"
          >
            <div className="inline-flex items-center space-x-1 bg-[#38A325]/5 border border-[#38A325]/10 px-2 py-0.5 rounded-full">
              <Leaf className="w-3 h-3 text-[#38A325] shrink-0" />
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/85">Zero Added Sugar</span>
            </div>
            <div className="inline-flex items-center space-x-1 bg-[#38A325]/5 border border-[#38A325]/10 px-2 py-0.5 rounded-full">
              <Heart className="w-3 h-3 text-[#38A325] shrink-0" />
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/85">Hygiene Focused</span>
            </div>
            <div className="inline-flex items-center space-x-1 bg-[#38A325]/5 border border-[#38A325]/10 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#38A325] shrink-0" />
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/85">100% Organic</span>
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
}
