import { Leaf, Heart, Award, ShieldAlert, Navigation } from "lucide-react";

export default function AboutUs() {
  const USP_CARDS = [
    {
      id: "usp_1",
      icon: <Leaf className="w-5.5 h-5.5 text-[#38A325]" />,
      title: "100% Natural",
      desc: "We use only fresh, organic fruits and vegetables with no artificial preservatives or added sugars."
    },
    {
      id: "usp_2",
      icon: <Heart className="w-5.5 h-5.5 text-[#F26419]" />,
      title: "Health Focused",
      desc: "Every drink is crafted to maximize nutritional benefits and support your wellness journey."
    },
    {
      id: "usp_3",
      icon: <Award className="w-5.5 h-5.5 text-[#38A325]" />,
      title: "Premium Quality",
      desc: "We source the finest ingredients from trusted local farmers and suppliers."
    },
    {
      id: "usp_4",
      icon: <Navigation className="w-5.5 h-5.5 text-[#F26419]" />,
      title: "Fast Delivery",
      desc: "Quick doorstep delivery within 30 minutes to ensure maximum freshness."
    }
  ];

  return (
    <section id="about" className="pt-3 pb-8 bg-gradient-to-b from-white via-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Side Description + Left Stats, Right Side USP Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
            
            {/* About Us Badge */}
            <div className="inline-flex items-center justify-center border border-[#38A325]/30 text-[#38A325] bg-transparent px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
              About Us
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3.5xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
              Crafting Wellness, <br />
              <span className="text-[#38A325]">One Fresh Bite & Sip at a Time</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-2.5 text-[#1A1A1A]/75 text-xs sm:text-sm leading-relaxed">
              <p> 
                At FresCo HealthCraft, we believe healthy living begins with fresh, natural nutrition. From cold-pressed juices and vitality drinks to protein-packed cups, fruit bowls, and wholesome sprouts, every item is thoughtfully crafted to nourish your body and energize your day.              </p>
              <p>
                At FresCo HealthCraft, we believe healthy living begins with fresh, natural nutrition. From cold-pressed juices and vitality drinks to protein-packed cups, fruit bowls, and wholesome sprouts, every item is thoughtfully crafted to nourish your body and energize your day.              </p>
            </div>

          </div>

          {/* Right Column: USPs Grid matching representation */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 w-full">
            {USP_CARDS.map((usp) => (
              <div
                key={usp.id}
                className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:-translate-y-0.5 hover:shadow-md duration-300"
              >
                
                {/* Icon wrapper */}
                <div className="p-1.5 sm:p-2 bg-[#EFECE5] text-[#38A325] inline-flex rounded-lg mb-2">
                  {usp.icon}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] font-sans">
                  {usp.title}
                </h3>

                <p className="mt-1 text-[10px] sm:text-xs text-[#1A1A1A]/70 leading-relaxed line-clamp-3">
                  {usp.desc}
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
