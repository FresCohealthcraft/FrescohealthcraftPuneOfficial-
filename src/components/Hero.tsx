import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from "lucide-react";
import Logo from "./Logo";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF6E6] via-white to-white pt-12 pb-20 border-b border-[#1A1A1A]/5">
      
      {/* Decorative architectural layout detail line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Prominent High-Contrast Brand Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 pb-7 bg-white/95 border border-[#1A1A1A]/5 rounded-[3rem] shadow-[0_20px_50px_rgba(56,163,37,0.06)] backdrop-blur-md"
          >
            <Logo size="lg" showTagline={true} layout="vertical" />
          </motion.div>

          {/* Slogan pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 border border-[#38A325]/35 text-[#38A325] bg-[#38A325]/5 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>100% Pure & Fresh in Pune</span>
          </motion.div>

          {/* Main Header Tag */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7.5xl leading-[0.92] font-serif italic tracking-tighter text-[#1A1A1A]"
          >
            Nourish Your Body <br />
            With <span className="text-[#38A325]">Pure Wellness</span>
          </motion.h1>

          {/* Rich Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#1A1A1A]/70 max-w-2xl text-base sm:text-lg leading-relaxed font-normal"
          >
            FresCo HealthCraft brings you 100% raw, organic natural wellness elixirs, functional green smoothies, and clinical Ayurvedic boosters right to your Pune doorstep. No concentrates, no pasteurization, just pure liquid life.
          </motion.p>

          {/* Unique Selling Points Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-2"
          >
            <div className="flex items-center justify-center space-x-2.5 bg-[#38A325]/5 border border-[#38A325]/10 backdrop-blur-sm p-3.5 rounded-2xl">
              <Leaf className="w-4.5 h-4.5 text-[#38A325] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Zero Added Sugar</span>
            </div>
            <div className="flex items-center justify-center space-x-2.5 bg-[#38A325]/5 border border-[#38A325]/10 backdrop-blur-sm p-3.5 rounded-2xl">
              <Heart className="w-4.5 h-4.5 text-[#38A325] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Heart Healthy</span>
            </div>
            <div className="flex items-center justify-center space-x-2.5 bg-[#38A325]/5 border border-[#38A325]/10 backdrop-blur-sm p-3.5 rounded-2xl">
              <ShieldCheck className="w-4.5 h-4.5 text-[#38A325] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Fresh Pressed</span>
            </div>
          </motion.div>

          {/* Primary Action Button sets */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4"
          >
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#1A1A1A] hover:bg-[#38A325] text-[#F9F8F4] px-8 py-4 rounded-full font-bold text-[12px] uppercase tracking-wider transition-all duration-300 shadow-none hover:shadow-md transform active:scale-95 cursor-pointer animate-bounce"
            >
              <span>Browse Menu</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
