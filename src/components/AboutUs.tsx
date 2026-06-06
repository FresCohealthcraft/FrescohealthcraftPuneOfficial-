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
    <section id="about" className="py-12 bg-gradient-to-b from-white via-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Side Description + Left Stats, Right Side USP Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* About Us Badge */}
            <div className="inline-flex items-center justify-center border border-[#38A325]/30 text-[#38A325] bg-transparent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              About Us
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4.5xl font-serif italic text-[#1A1A1A] tracking-tight leading-tight">
              Crafting Wellness, <br />
              <span className="text-[#38A325]">One Sip at a Time</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-[#1A1A1A]/75 text-base leading-relaxed">
              <p>
                At FresCo HealthCraft, we believe that good health starts with what you drink. Our journey began with a simple mission: to bring the freshest, most nutritious juices to your doorstep.
              </p>
              <p>
                Every juice we craft is made with love, using hand-picked fruits and vegetables that are washed, prepared, and blended fresh just for you. We never use concentrates, artificial flavors, or preservatives - just pure, natural goodness.
              </p>
            </div>

            {/* Stat Counters side-by-side */}
            <div className="grid grid-cols-2 gap-4 w-full pt-4 max-w-sm">
              <div className="bg-white border border-[#1A1A1A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.015)] rounded-3xl p-5 text-center">
                <span className="text-4xl font-serif font-extrabold text-[#38A325] block">5+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/50 mt-1.5 block">Years Experience</span>
              </div>
              <div className="bg-white border border-[#1A1A1A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.015)] rounded-3xl p-5 text-center">
                <span className="text-4xl font-serif font-extrabold text-[#38A325] block">10K+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/50 mt-1.5 block">Orders Delivered</span>
              </div>
            </div>

          </div>

          {/* Right Column: USPs Grid matching representation */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {USP_CARDS.map((usp) => (
              <div
                key={usp.id}
                className="bg-white border border-[#1A1A1A]/10 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform hover:-translate-y-1 hover:shadow-md duration-300"
              >
                
                {/* Icon wrapper */}
                <div className="p-3 bg-[#EFECE5] text-[#38A325] inline-flex rounded-2xl mb-4">
                  {usp.icon}
                </div>

                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {usp.title}
                </h3>

                <p className="mt-2 text-xs text-[#1A1A1A]/70 leading-relaxed">
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
