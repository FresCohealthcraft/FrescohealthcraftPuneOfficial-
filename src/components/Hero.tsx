import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from "lucide-react";
// @ts-ignore
import heroJuiceSelection from "../assets/images/hero_juice_selection_1780435834149.png";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F9F8F4] pt-12 pb-20 border-b border-[#1A1A1A]/5">
      
      {/* Decorative architectural layout detail line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and Text Columns */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7">
            
            {/* Slogan pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 border border-[#4A8824]/35 text-[#4A8824] bg-transparent px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]"
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
              With <span className="text-[#4A8824]">Pure Wellness</span>
            </motion.h1>

            {/* Rich Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#1A1A1A]/70 max-w-xl text-base sm:text-lg leading-relaxed font-normal"
            >
              FresCo HealthCraft brings you 100% raw, organic natural wellness elixirs, functional green smoothies, and clinical Ayurvedic boosters right to your Pune doorstep. No concentrates, no pasteurization, just pure liquid life.
            </motion.p>

            {/* Unique Selling Points Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg pt-2"
            >
              <div className="flex items-center space-x-2.5 bg-[#EFECE5]/60 border border-[#1A1A1A]/5 backdrop-blur-sm p-3 rounded-2xl">
                <Leaf className="w-4.5 h-4.5 text-[#4A8824] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Zero Added Sugar</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-[#EFECE5]/60 border border-[#1A1A1A]/5 backdrop-blur-sm p-3 rounded-2xl">
                <Heart className="w-4.5 h-4.5 text-[#4A8824] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Heart Healthy</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-[#EFECE5]/60 border border-[#1A1A1A]/5 backdrop-blur-sm p-3 rounded-2xl">
                <ShieldCheck className="w-4.5 h-4.5 text-[#4A8824] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">Fresh Pressed</span>
              </div>
            </motion.div>

            {/* Primary Action Button sets */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
            >
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#F9F8F4] px-8 py-4 rounded-full font-bold text-[12px] uppercase tracking-wider transition-all duration-300 shadow-none hover:shadow-md transform active:scale-95 cursor-pointer"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </motion.div>

          </div>

          {/* Right Hero Visuals with beautiful animated Juice Cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Main Premium visual card representation representing the drinks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[340px] bg-white rounded-3xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-[#1A1A1A]/10 overflow-hidden"
            >

               {/* Juicy illustration circle representation with real premium custom product photography */}
              <div className="w-full h-44 bg-[#EFECE5] rounded-2.5xl mb-6 shadow-md relative group overflow-hidden border border-[#1A1A1A]/5">
                <img 
                  src={heroJuiceSelection}
                  alt="FresCo Premium Fresh Juices"
                  className="w-full h-full object-cover rounded-2.5xl transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Fresh Orange Juice</h3>
                  <span className="text-xl font-bold text-[#4A8824]">₹80</span>
                </div>
                <p className="text-xs text-[#1A1A1A]/75 leading-relaxed">
                  Freshly squeezed Country oranges. Super rich booster source of vitamin C. Absolute defense support.
                </p>
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#F26419] text-[10px] font-bold bg-[#F26419]/11 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    <span>⚡ Energy</span>
                  </div>
                  <button 
                    onClick={onExploreMenu}
                    className="text-xs font-bold text-[#1A1A1A] hover:text-[#4A8824] cursor-pointer flex items-center"
                  >
                    <span>Customize Order</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
