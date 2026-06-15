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
    { name: "Wellness combo's", id: "offers", icon: <Calendar className="w-4 h-4" /> },
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
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleLinkClick("home")}
          >
            <Logo size="sm" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer duration-300 ${
                  activeSection === link.id
                    ? "text-[#38A325]"
                    : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38A325] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Special Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-[#1A1A1A] hover:text-[#38A325] hover:bg-[#1A1A1A]/5 rounded-full transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
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

            {/* Main Order CTA Button as seen in layout */}
            <button
              onClick={() => handleLinkClick("menu")}
              className="hidden lg:flex items-center space-x-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>

            {/* Mobile navigation toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1A1A1A]"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#1A1A1A]/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center w-full text-left px-5 py-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all ${
                    activeSection === link.id
                      ? "bg-[#38A325]/10 text-[#38A325]"
                      : "text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]"
                  }`}
                >
                  <span className={`mr-3 ${activeSection === link.id ? "text-[#38A325]" : "text-[#1A1A1A]/50"}`}>
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
                  className="w-full flex items-center justify-center space-x-2 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white py-3 rounded-xl font-bold uppercase tracking-wider transition-all text-xs"
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
