import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

interface ContactSectionProps {
  onStartOrdering: () => void;
  onGeneralChat: () => void;
}

export default function ContactSection({ onStartOrdering, onGeneralChat }: ContactSectionProps) {
  return (
    <section id="contact" className="py-8 bg-gradient-to-t from-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Grid Layout matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column Card: Contact Information */}
          <div className="bg-white border border-[#1A1A1A]/10 rounded-3xl p-6.5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="space-y-6">
              
              <h3 className="text-lg font-bold text-[#1A1A1A]">
                Contact Information
              </h3>

              <div className="space-y-4.5">
                
                {/* Location */}
                <a
                  href="https://maps.google.com/?q=Amanora+Urban+Plaza,+near+Sanjay+medico,+Amanora+Park+Town,+Hadapsar,+Pune,+Maharashtra+411028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3.5 group cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <div className="p-2.5 bg-[#EFECE5] text-[#38A325] rounded-xl mt-0.5 shrink-0 group-hover:bg-[#38A325] group-hover:text-white transition-all duration-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#38A325] transition-all duration-200">Our Location</h4>
                    <p className="text-xs text-[#1A1A1A]/70 mt-1 leading-normal max-w-xs group-hover:text-[#1A1A1A] group-hover:underline transition-all duration-200">
                      Amanora Urban Plaza, near Sanjay medico, Amanora Park Town, Hadapsar, Pune, Maharashtra 411028
                    </p>
                  </div>
                </a>

                {/* Phone / WhatsApp */}
                <a
                  href="tel:+918983363146"
                  className="flex items-start space-x-3.5 group cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <div className="p-2.5 bg-[#EFECE5] text-[#38A325] rounded-xl mt-0.5 shrink-0 group-hover:bg-[#38A325] group-hover:text-white transition-all duration-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#38A325] transition-all duration-200">Phone / WhatsApp</h4>
                    <p className="text-xs text-[#1A1A1A] mt-0.5 font-semibold group-hover:text-[#38A325] group-hover:underline transition-all duration-200">
                      +91 89833 63146
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:frescofruit.pune@gmail.com"
                  className="flex items-start space-x-3.5 group cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <div className="p-2.5 bg-[#EFECE5] text-[#38A325] rounded-xl mt-0.5 shrink-0 group-hover:bg-[#38A325] group-hover:text-white transition-all duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#38A325] transition-all duration-200">Email</h4>
                    <p className="text-xs text-[#1A1A1A]/70 mt-0.5 font-medium group-hover:text-[#38A325] group-hover:underline transition-all duration-200">
                      frescofruit.pune@gmail.com
                    </p>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 bg-[#EFECE5] text-[#38A325] rounded-xl mt-0.5 shrink-0">
                    <Clock className="w-5 h-5 text-[#38A325]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1A1A]">Working Hours</h4>
                    <div className="text-xs text-[#1A1A1A]/75 mt-1 space-y-0.5">
                      <p>Mon - Sat: 7:00 AM - 9:00 PM</p>
                      <p>Sunday: 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Click general chat button styled to image specifications */}
            <div className="mt-8">
              <button
                onClick={onGeneralChat}
                className="w-full bg-[#1A1A1A] hover:bg-[#38A325] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                {/* Custom WhatsApp Icon Path */}
                <svg
                  className="w-4.5 h-4.5 fill-current mr-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
            </div>

          </div>

           {/* Right Column Card: Solid Slate 3-Step Ordering Guide */}
          <div className="bg-[#38A325] text-white rounded-3xl p-6.5 sm:p-8 shadow-[0_12px_40px_rgba(74,136,36,0.12)] flex flex-col justify-between border border-[#38A325]/80">
            
            <div className="space-y-6">
              
              <h3 className="text-xl font-serif italic tracking-tight text-[#F9F8F4]">
                Order in 3 Simple Steps
              </h3>

              <div className="space-y-5">
                
                {/* Step 1 */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9F8F4] text-[#38A325] flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Browse Our Menu</h4>
                    <p className="text-xs text-[#F9F8F4]/80 leading-relaxed mt-0.5">
                      Choose from 50+ healthy, organic fresh drinks.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9F8F4] text-[#38A325] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Send Order on WhatsApp</h4>
                    <p className="text-xs text-[#F9F8F4]/80 leading-relaxed mt-0.5">
                      Customize, click order, and easily confirm the checkout cart.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#F9F8F4] text-[#38A325] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Get Fresh Delivery</h4>
                    <p className="text-xs text-[#F9F8F4]/80 leading-relaxed mt-0.5">
                      Within 30 minutes at your door, prepared completely fresh.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Start Ordering Action Button */}
            <div className="mt-8 pt-4">
              <button
                onClick={onStartOrdering}
                className="w-full bg-[#F9F8F4] hover:bg-[#EFECE5] text-[#1A1A1A] py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest transition-all cursor-pointer shadow-md duration-300 flex items-center justify-center space-x-1.5"
              >
                <span>Start Ordering Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
