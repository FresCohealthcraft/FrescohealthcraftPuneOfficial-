import { useState, useEffect } from "react";
import { MenuItem, CartItem, PromoCoupon } from "./types";
import { MENU_ITEMS } from "./data";

// Import Custom Subcomponents
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuGrid from "./components/MenuGrid";
import SubscriptionSection from "./components/SubscriptionSection";
import SpecialOffers from "./components/SpecialOffers";
import HomeDeliveryBanner from "./components/HomeDeliveryBanner";
import AboutUs from "./components/AboutUs";
import CartDrawer from "./components/CartDrawer";
import AdminPortal from "./components/AdminPortal";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import Logo from "./components/Logo";

import { Sparkles, Leaf, MessageSquare, ShieldCheck, Heart, Instagram, Facebook, Youtube, Send } from "lucide-react";




export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCoupon | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Push and Pop window history state dynamically.
  // This intercepts the mobile system back button so that when a drawer or menu is open,
  // pressing "Back" closes the overlay instead of closing the browser tab or exiting the application!
  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isAdminOpen || isMobileMenuOpen;

    const handlePopState = (e: PopStateEvent) => {
      // If back button is pressed, close all open draw/menus first
      if (isCartOpen || isAdminOpen || isMobileMenuOpen) {
        setIsCartOpen(false);
        setIsAdminOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    if (isAnyModalOpen) {
      // Just opened a drawer/modal. Push state so back button has a virtual navigation step to pop.
      if (!window.history.state || !window.history.state.modalOpen) {
        window.history.pushState({ modalOpen: true }, "");
      }
    } else {
      // Handled manual closeness in the UI (e.g. clicking "x" close or screen backdrops).
      // We pop our custom modal state to keep browser back/forward history clean.
      if (window.history.state && window.history.state.modalOpen) {
        window.history.back();
      }
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isCartOpen, isAdminOpen, isMobileMenuOpen]);

  // Load cart state from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("fresco_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("fresco_cart", JSON.stringify(updatedCart));
  };

  // Add Item to cart directly without customization (standard)
  const handleAddToCartDirectly = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      (c) => c.menuItem.id === item.id && (!c.customIngredients || c.customIngredients.length === 0)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newCartItem: CartItem = {
        id: `${item.id}_std_${Date.now()}`,
        menuItem: item,
        quantity: 1,
        finalPrice: item.price,
        isCustomRecipe: false,
      };
      saveCart([...cartItems, newCartItem]);
    }
    
    // Auto-pop a small feedback of cart opening
    setIsCartOpen(true);
  };

  // Add multiple items to cart at once safely
  const handleBulkAddToCart = (items: MenuItem[]) => {
    setCartItems((prevItems) => {
      let updated = [...prevItems];
      items.forEach((item, index) => {
        const existingIndex = updated.findIndex(
          (c) => c.menuItem.id === item.id && (!c.customIngredients || c.customIngredients.length === 0)
        );

        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1
          };
        } else {
          const newCartItem: CartItem = {
            id: `${item.id}_std_${Date.now()}_${index}`,
            menuItem: item,
            quantity: 1,
            finalPrice: item.price,
            isCustomRecipe: false,
          };
          updated.push(newCartItem);
        }
      });
      localStorage.setItem("fresco_cart", JSON.stringify(updated));
      return updated;
    });
    setIsCartOpen(true);
  };

  // Add customized item from custom modal details
  const handleConfirmAddToCart = (cartItem: CartItem) => {
    saveCart([...cartItems, cartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === cartId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveCartItem = (cartId: string) => {
    const updated = cartItems.filter((item) => item.id !== cartId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
    setAppliedCoupon(null);
  };

  const handleApplyPromoCoupon = (coupon: PromoCoupon | null) => {
    setAppliedCoupon(coupon);
  };

  // Open official Whatsapp chat with custom pre-pended lines
  const handleGeneralChatWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello FresCo HealthCraft Pune Support, I visited your website and have a inquiry regarding subscriptions/orders!"
    );
    window.open(`https://wa.me/918983363146?text=${text}`, "_blank");
  };

  const scrollToMenuSection = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveSection("menu");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF6E6] via-white to-white text-[#1A1A1A] flex flex-col font-sans select-none antialiased">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartItems.reduce((acc, current) => acc + current.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Header Banner */}
        <div id="home">
          <Hero
            onExploreMenu={scrollToMenuSection}
          />
        </div>


        {/* 4. Menu options grid (matching Image 1) */}
        <MenuGrid
          onAddToCartDirectly={handleAddToCartDirectly}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* 4.5 Subscription Plans */}
        <SubscriptionSection
          onAddToCartDirectly={handleAddToCartDirectly}
          onAddBulkToCartDirectly={handleBulkAddToCart}
        />

        {/* 5. Special promotional offers Deals list (matching Image 2) */}
        <SpecialOffers
          onAddToCartDirectly={handleAddToCartDirectly}
        />

        {/* 6. Rounded free delivery announcement banner */}
        <HomeDeliveryBanner
          onOrderNow={scrollToMenuSection}
        />

        {/* 7. Crafting wellness About Us columns (matching Image 2) */}
        <AboutUs />

      </main>

      {/* 10. Ultimate Footer layouts (matching Redesigned Image) */}
      <footer className="bg-[#0C2D1C] text-white pt-12 pb-10 border-t border-emerald-950 relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-850/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Column 1: Logo & Slogan */}
            <div className="space-y-4 text-left">
              <div className="flex flex-col text-left select-none">
                <div className="flex items-center space-x-1.5">
                  <span className="font-sans font-bold text-2xl tracking-tight text-white">
                    Fresco
                  </span>
                  <Leaf className="w-4.5 h-4.5 text-[#F58220] fill-[#F58220]" />
                </div>
                <span className="text-[10px] font-black uppercase mt-1 leading-none text-[#F58220] tracking-[0.2em]">
                  HEALTHCRAFT
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-xs font-medium">
                We make healthy eating easy, tasty and convenient with our range of fresh sprouts, salads, fruit cups, and cold-pressed juices.
              </p>
            </div>

            {/* Column 2: Shop */}
            <div className="text-left">
              <h4 className="font-bold text-sm text-white tracking-wide mb-3 sm:mb-4">
                Shop
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li>
                  <button onClick={() => { setSearchTerm("sprouts"); scrollToMenuSection(); }} className="hover:text-[#9BD54E] transition-colors cursor-pointer text-left py-0.5">
                    Sprouts
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSearchTerm("cup"); scrollToMenuSection(); }} className="hover:text-[#9BD54E] transition-colors cursor-pointer text-left py-0.5">
                    Fruit Cups
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSearchTerm("juice"); scrollToMenuSection(); }} className="hover:text-[#9BD54E] transition-colors cursor-pointer text-left py-0.5">
                    Fresh Juices
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSearchTerm("vegetable"); scrollToMenuSection(); }} className="hover:text-[#9BD54E] transition-colors cursor-pointer text-left py-0.5">
                    Vegetable Juices
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSearchTerm("combo"); scrollToMenuSection(); }} className="hover:text-[#9BD54E] transition-colors cursor-pointer text-left py-0.5">
                    Combos
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Stay Connected */}
            <div className="text-left space-y-3">
              <h4 className="font-bold text-sm text-white tracking-wide">
                Stay Connected
              </h4>
              <p className="text-xs text-neutral-300 leading-normal font-medium max-w-xs">
                Get updates on offers and new healthy products.
              </p>
              
              {/* Subscription Input */}
              <div className="relative max-w-xs mt-1.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-xl text-xs py-2 px-3.5 pr-10 text-white placeholder-white/45 focus:outline-none focus:ring-1 focus:ring-[#9BD54E] transition-all"
                />
                <button 
                  onClick={() => {
                    alert("Thank you for subscribing! We've registered your email for premium updates.");
                  }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#9BD54E] hover:bg-[#86be3e] text-[#0C2D1C] rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Social Icons row */}
              <div className="flex items-center space-x-3 pt-2">
                <a 
                  href="https://instagram.com/fresco_healthcraft" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-3xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-3xs"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-3xs"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <button 
                  onClick={handleGeneralChatWhatsApp}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-3xs cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              {/* Admin Portal Toggle Link */}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-[11px] text-neutral-400 hover:text-white font-bold transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>🛡️ Admin Portal</span>
                </button>
              </div>

            </div>

          </div>

          {/* Copyright bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-xs">
            <p className="text-center sm:text-left">
              © 2026 FresCo HealthCraft. All rights reserved. Registered Trade Brand in Pune, MH.
            </p>
          </div>

        </div>
      </footer>

      {/* 11. Overlapping Floating WhatsApp Bubble for fast navigation */}
      <FloatingWhatsApp onChat={handleGeneralChatWhatsApp} />

      {/* 11.5 Responsive Active Subscription overlay for quick client tracking */}

      {/* 12. Modals Backdrop Overrides */}
      
      {/* Shopping Cart Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyPromoCoupon}
        onClearCart={handleClearCart}
      />

      {/* Store dispatch diagnostics admin center */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
