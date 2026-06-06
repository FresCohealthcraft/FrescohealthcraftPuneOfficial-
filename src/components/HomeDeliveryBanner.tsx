interface HomeDeliveryBannerProps {
  onOrderNow: () => void;
}

export default function HomeDeliveryBanner({ onOrderNow }: HomeDeliveryBannerProps) {
  return (
    <section className="py-4 bg-transparent border-t border-[#1A1A1A]/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Animated Slate Container mimicking Editorial Image Layout */}
        <div className="relative bg-[#38A325] text-white rounded-3xl p-8 sm:p-11 shadow-[0_12px_40px_rgba(56,163,37,0.12)] overflow-hidden text-center z-10 border border-[#38A325]/80">
          
          {/* Subtle Background leafy highlights in container */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 blur-xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-black/10 blur-2xl rounded-full" />
          
          {/* Vector Slogan content */}
          <div className="relative flex flex-col items-center max-w-3xl mx-auto space-y-4">
            
            <h3 className="text-2xl sm:text-3.5xl font-serif italic tracking-tight leading-tight text-[#F9F8F4]">
              Free Delivery on Orders Above ₹199!
            </h3>
            
            <p className="text-[#F9F8F4]/80 text-sm leading-relaxed max-w-2xl font-normal">
              Order your favorite healthy juices &amp; smoothies and enjoy zero-cost doorstep delivery. Quick service meticulously made fresh and guaranteed at your door within 30 minutes!
            </p>

            <div className="pt-2">
              <button
                onClick={onOrderNow}
                className="bg-[#F9F8F4] hover:bg-[#EFECE5] text-[#1A1A1A] px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center space-x-1.5"
              >
                <span>Order Now</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
