import React from "react";

export default function AboutUs() {
  const BENEFITS = [
    {
      id: "benefit-freshly-prepared",
      title: "100% Natural",
      desc: "We use only fresh, organic fruits and vegetables with no artificial preservatives or added sugars.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=240&h=240",
      alt: "Freshly prepared daily salad bowl"
    },
    {
      id: "benefit-clean-natural",
      title: "Health Focused",
      desc: "Every drink is crafted to maximize nutritional benefits and support your wellness journey.",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=240&h=240",
      alt: "Clean and natural fresh green juice bottle"
    },
    {
      id: "benefit-nutrition-matters",
      title: "Premium Quality",
      desc: "We source the finest ingredients from trusted local farmers and suppliers.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=240&h=240",
      alt: "Nutrition that matters healthy organic food bowl"
    },
    {
      id: "benefit-loved-thousands",
      title: "Fast Delivery",
      desc: "Quick doorstep delivery within 30 minutes to ensure maximum freshness.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=240&h=240",
      alt: "Loved by thousands glowing bubbles and hearts"
    }
  ];

  return (
    <section id="why-choose-us" className="py-10 sm:py-14 bg-white border-t border-neutral-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 id="why-choose-title" className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-6 sm:mb-8 text-left">
          Why Choose Fresco Healthcraft?
        </h2>

        {/* Responsive Benefits Grid */}
        <div id="benefits-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              id={`card-${benefit.id}`}
              className="bg-[#FAF9F5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-neutral-100 flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 min-h-[145px] overflow-hidden group"
            >
              {/* Left text column */}
              <div className="flex-1 text-center xs:text-left">
                <h3 className="text-xs sm:text-base font-black text-gray-900 leading-tight mb-1">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 font-bold leading-normal">
                  {benefit.desc}
                </p>
              </div>

              {/* Right image circle with nice overflow/styling */}
              <div className="relative w-12 h-12 xs:w-18 xs:h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 bg-white/50 flex items-center justify-center border border-white/80 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={benefit.image}
                  alt={benefit.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


