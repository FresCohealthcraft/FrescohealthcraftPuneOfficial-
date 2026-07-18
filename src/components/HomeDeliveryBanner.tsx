import { motion } from "motion/react";
import { Truck, ShieldCheck, Lock, Heart, ArrowRight } from "lucide-react";

interface HomeDeliveryBannerProps {
  onOrderNow: () => void;
}

export default function HomeDeliveryBanner({ onOrderNow }: HomeDeliveryBannerProps) {
  return (
    <section className="py-2 bg-transparent border-t border-[#1A1A1A]/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* GREEN DELIVERY BANNER CONTAINER */}
        <div className="relative bg-gradient-to-r from-[#3AA324] via-[#32981E] to-[#247E11] text-white rounded-[16px] p-3 sm:p-4 shadow-[0_6px_24px_rgba(56,163,37,0.06)] overflow-hidden z-10 border border-[#38A325]/35">
          
          {/* Subtle Background leafy blur highlights */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 blur-xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-black/10 blur-2xl rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            {/* Left Column: Scooter Boy SVG Illustration + Steam/Wind trail */}
            <div className="flex items-center justify-center shrink-0">
              <svg viewBox="0 0 180 120" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Soft Shadow for wheels/scooter */}
                <ellipse cx="90" cy="104" rx="55" ry="6" fill="black" fillOpacity="0.1" />

                {/* Wind/Steam trail behind the carrier box */}
                <path d="M15 22C20 22 22 20 25 24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                <path d="M8 32C15 32 18 30 22 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
                <path d="M12 45C18 45 20 42 24 48" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

                {/* Delivery Box (Light gray/silver cooler) */}
                <rect x="34" y="32" width="28" height="32" rx="4" fill="#E2E5E0" stroke="#BAC0B5" strokeWidth="1.5" />
                {/* Box highlights */}
                <rect x="38" y="36" width="20" height="24" rx="2" fill="#F0F2EE" />
                <path d="M34 48H62" stroke="#BAC0B5" strokeWidth="1" />

                {/* Scooter rear chassis & wheel guard */}
                <path d="M50 82C50 68 74 66 84 72L98 88" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
                <path d="M50 82C50 68 74 66 84 72L98 88" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

                {/* Wheels (Front & Back) */}
                <circle cx="62" cy="92" r="14" fill="#2E302D" stroke="#FFFFFF" strokeWidth="3.5" />
                <circle cx="62" cy="92" r="6" fill="#787C75" />
                <circle cx="62" cy="92" r="2.5" fill="#E2E5E0" />
                
                <circle cx="128" cy="92" r="14" fill="#2E302D" stroke="#FFFFFF" strokeWidth="3.5" />
                <circle cx="128" cy="92" r="6" fill="#787C75" />
                <circle cx="128" cy="92" r="2.5" fill="#E2E5E0" />

                {/* Scooter floorboard & Front column */}
                <path d="M84 88H112L124 55" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M116 52L125 80" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />

                {/* Scooter handlebars */}
                <path d="M118 48H128" stroke="#1A1C19" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="123" cy="46" r="2" fill="#FFD700" />

                {/* Delivery Rider */}
                <path d="M84 62L88 80H100" stroke="#1F2937" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* White sneakers */}
                <rect x="96" y="78" width="9" height="4.5" rx="1.5" fill="#F3F4F6" />
                <path d="M96 82.5H105" stroke="#F97316" strokeWidth="1" />

                {/* Torso (Jersey - charcoal grey) */}
                <path d="M78 48L85 66" stroke="#374151" strokeWidth="11" strokeLinecap="round" />

                {/* Arm reaching to handlebar */}
                <path d="M82 51L104 53L118 50" stroke="#374151" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="118" cy="50" r="2.5" fill="#FDBA74" />

                {/* Neck & Face */}
                <path d="M84 41L85 45" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="86" cy="37" r="7.5" fill="#FDBA74" />

                {/* Orange Safety Helmet with Visor */}
                <path d="M78 35C78 26 93 26 93 35H78Z" fill="#F97316" />
                <circle cx="85.5" cy="33.5" r="7.5" fill="#F97316" />
                <path d="M82 39L84 43L87 39" stroke="#111827" strokeWidth="1.5" fill="none" />
                <path d="M88 33C92 33 93 35 94 37" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Middle Column: Typography */}
            <div className="flex-1 text-center md:text-left space-y-0.5">
              <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-tight text-white font-sans">
                Free Delivery on Orders Above ₹199!              
                </h3>
            </div>

            {/* Right Column: Pill Outlined Button */}
            <div className="shrink-0">
              <button
                onClick={onOrderNow}
                className="group/btn bg-transparent hover:bg-white hover:text-[#38A325] text-white border-2 border-white/80 hover:border-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center space-x-1.5 shadow-xs"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-350 group-hover/btn:translate-x-1" strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>

        {/* BOTTOM FEATURES BADGES ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mt-3.5 px-1">
          {/* Feature 1 */}
          <div className="flex items-center space-x-2 p-1.5 bg-transparent select-none">
            <div className="p-1.5 bg-[#38A325]/8 text-[#38A325] rounded-full shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-[10.5px] sm:text-xs font-extrabold text-[#1A1A1A]">Safe & Hygienic</h4>
              <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 font-medium">Packaging</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center space-x-2 p-1.5 bg-transparent select-none">
            <div className="p-1.5 bg-[#38A325]/8 text-[#38A325] rounded-full shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-[10.5px] sm:text-xs font-extrabold text-[#1A1A1A]">On-time</h4>
              <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 font-medium">Delivery</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center space-x-2 p-1.5 bg-transparent select-none">
            <div className="p-1.5 bg-[#38A325]/8 text-[#38A325] rounded-full shrink-0">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-[10.5px] sm:text-xs font-extrabold text-[#1A1A1A]">Secure</h4>
              <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 font-medium">Payments</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center space-x-2 p-1.5 bg-transparent select-none">
            <div className="p-1.5 bg-[#38A325]/8 text-[#38A325] rounded-full shrink-0">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} fill="currentColor" fillOpacity={0.15} />
            </div>
            <div className="text-left leading-tight">
              <h4 className="text-[10.5px] sm:text-xs font-extrabold text-[#1A1A1A]">Made with Love</h4>
              <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 font-medium">Everyday</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


