import { useState, useEffect } from "react";
import { MenuItem, CartItem, PromoCoupon } from "./types";
import { MENU_ITEMS } from "./data";
import { motion, AnimatePresence } from "motion/react";

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

import { Sparkles, Leaf, MessageSquare, ShieldCheck, Heart, Check } from "lucide-react";




export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCoupon | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toasts, setToasts] = useState<{ id: number; message: string; icon?: string }[]>([]);

  const showToast = (message: string, icon?: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

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
    
    // Show non-intrusive beautiful toast feedback instead of popping open the cart drawer
    showToast(`${item.name} added to cart!`, "🥤");
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
    showToast(`${items.length} items added to your wellness plan!`, "🥗");
  };

  // Add customized item from custom modal details
  const handleConfirmAddToCart = (cartItem: CartItem) => {
    saveCart([...cartItems, cartItem]);
    showToast(`${cartItem.menuItem.name} customized & added!`, "✨");
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
          cartItems={cartItems}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onRemoveCartItem={handleRemoveCartItem}
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

      {/* 10. Ultimate Footer layouts (matching Image 3) */}
      <footer className="bg-[#1A1A1A] text-[#F9F8F4] pt-16 pb-8 border-t border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Logo and Slogans Column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <Logo size="sm" lightText={true} showTagline={true} />
              <p className="text-xs text-[#F9F8F4]/70 max-w-sm leading-relaxed">
                Your trusted partner for fresh, healthy, and delicious juices. We bring nature's raw goodness right to your Pune doorstep with our high-retention extraction technology and fast delivery operations.
              </p>
            </div>

            {/* Quick Links column */}
            <div className="md:col-span-3 text-left">
              <h4 className="font-bold text-[11px] text-[#38A325] uppercase tracking-[0.25em]">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-[#F9F8F4]/70">
                <li>
                  <button onClick={() => { setActiveSection("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={scrollToMenuSection} className="hover:text-white transition-colors cursor-pointer text-left">
                    Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection("subscriptions"); document.getElementById("subscriptions")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Wellness Plans
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection("offers"); document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Special Offers
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection("about"); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveSection("contact"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    Contact
                  </button>
                </li>
                <li className="pt-2 border-t border-white/5">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="text-[#EFECE5]/80 hover:text-white font-extrabold transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <span>🛡️ Admin Portal</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Official Contact Column */}
            <div className="md:col-span-4 text-left space-y-4">
              <h4 className="font-bold text-[11px] text-[#38A325] uppercase tracking-[0.25em]">
                Contact Us
              </h4>
              <div className="text-xs text-[#F9F8F4]/70 space-y-2.5 leading-relaxed">
                <p>
                  <a href="tel:+918983363146" className="hover:text-white hover:underline transition-colors cursor-pointer">
                    📞 +91 89833 63146
                  </a>
                </p>
                <p>
                  <a href="mailto:frescofruit.pune@gmail.com" className="hover:text-white hover:underline transition-colors cursor-pointer">
                    ✉ frescofruit.pune@gmail.com
                  </a>
                </p>
                <p className="max-w-xs leading-normal">
                  <a 
                    href="https://maps.google.com/?q=Amanora+Urban+Plaza,+near+Sanjay+medico,+Amanora+Park+Town,+Hadapsar,+Pune,+Maharashtra+411028"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    📍 Amanora Urban Plaza, near Sanjay medico, Amanora Park Town, Hadapsar, Pune, Maharashtra 411028
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Social and Copyright bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#F9F8F4]/50 text-xs">
            <p className="text-center sm:text-left">
              © 2026 FresCo HealthCraft. All rights reserved. Registered Trade Brand in Pune, MH.
            </p>
            <div className="flex space-x-3 select-none">
              <button onClick={() => window.open("https://wa.me/918983363146", "_blank")} className="hover:text-white hover:bg-white/10 transition-colors cursor-pointer bg-white/5 p-2 px-3 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-wider">
                💬 WhatsApp
              </button>
              <button onClick={() => window.open("https://instagram.com/fresco_healthcraft", "_blank")} className="hover:text-white hover:bg-white/10 transition-colors cursor-pointer bg-white/5 p-2 px-3 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-wider">
                📸 Instagram
              </button>
              <button onClick={handleGeneralChatWhatsApp} className="hover:text-white hover:bg-white/10 transition-colors cursor-pointer bg-white/5 p-2 px-3 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-wider font-mono">
                👥 Contact Chat
              </button>
            </div>
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

      {/* Dynamic Toast Notifications */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full sm:w-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              className="bg-white border-2 border-[#38A325]/15 text-[#1A1A1A] p-3 rounded-2xl shadow-[0_10px_25px_-5px_rgba(56,163,37,0.1)] flex items-center gap-3 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full bg-[#38A325]/10 flex items-center justify-center text-lg shrink-0 select-none">
                {toast.icon || "✓"}
              </div>
              <div className="flex-1 text-xs font-bold leading-tight pr-2">
                {toast.message}
              </div>
              <div className="text-[10px] uppercase font-black tracking-wider text-[#38A325] bg-[#38A325]/10 px-2 py-0.5 rounded-full">
                Added
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
