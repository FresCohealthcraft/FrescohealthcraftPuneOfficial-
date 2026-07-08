import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingCart, Sparkles, ShieldAlert, PhoneCall, Home, ClipboardList, Calendar, Percent, Users, MessageSquare } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  onCartClick: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  onCartClick,
  isOpen: propsIsOpen,
  setIsOpen: propsSetIsOpen,
}: NavbarProps) {
  // Use state if props are not supplied, otherwise use controlled props
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  const isOpen = propsIsOpen !== undefined ? propsIsOpen : localIsOpen;
  const setIsOpen = propsSetIsOpen !== undefined ? propsSetIsOpen : setLocalIsOpen;

  const navLinks = [
    { name: "Home", id: "home", icon: <Home className="w-4 h-4" /> },
    { name: "Menu", id: "menu", icon: <ClipboardList className="w-4 h-4" /> },
    { name: "Wellness Plans", id: "subscriptions", icon: <Calendar className="w-4 h-4" /> },
    { name: "Special Offers", id: "offers", icon: <Percent className="w-4 h-4" /> },
    { name: "About Us", id: "about", icon: <Users className="w-4 h-4" /> },
    { name: "Contact", id: "contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const scroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    scroll();
    // Delay slightly to let layout adjust after the mobile drawer collapses
    setTimeout(scroll, 100);
    setTimeout(scroll, 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-15">
          
          {/* Left Column: Add to Cart (Shopping Cart) Icon */}
          <div className="flex items-center justify-start">
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-[#1A1A1A] hover:text-[#38A325] hover:bg-[#1A1A1A]/5 rounded-full transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1A1A] text-[9px] font-bold text-[#F9F8F4]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Center Column: Logo (FresCo HealthCraft) */}
          <div 
            className="flex items-center justify-center cursor-pointer group"
            onClick={() => handleLinkClick("home")}
          >
            <Logo size="sm" showTagline={true} />
          </div>

          {/* Right Column: 3 Line Menu Icon */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-[#1A1A1A] hover:text-[#38A325] hover:bg-[#1A1A1A]/5 rounded-full transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Slide-Down Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-[#1A1A1A]/10 overflow-hidden shadow-md"
          >
            <div className="max-w-xl mx-auto px-4 pt-4 pb-8 space-y-1 text-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-center w-full px-5 py-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all ${
                    activeSection === link.id
                      ? "bg-[#38A325]/10 text-[#38A325]"
                      : "text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]"
                  }`}
                >
                  <span className={`mr-2.5 ${activeSection === link.id ? "text-[#38A325]" : "text-[#1A1A1A]/50"}`}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </button>
              ))}
              <div className="pt-4 px-4 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLinkClick("menu");
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#1A1A1A] hover:bg-[#38A325] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all text-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Order Now on WhatsApp</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

