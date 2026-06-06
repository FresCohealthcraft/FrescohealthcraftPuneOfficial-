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
import ContactSection from "./components/ContactSection";
import OrderModal from "./components/OrderModal";
import CartDrawer from "./components/CartDrawer";
import AdminPortal from "./components/AdminPortal";
import FruitSlider from "./components/FruitSlider";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Logo from "./components/Logo";

import { Sparkles, Leaf, MessageSquare, ShieldCheck, Heart } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCoupon | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [dailyOffer, setDailyOffer] = useState({
    title: "Summer Citrus Splendor BOGO Boost",
    description: "Get a complimentary Ayurvedic ginger shot with any premium Orange or Pineapple fresh juice ordered today!",
    tag: "TODAY'S SPECIAL",
    code: "GINGERBOOST"
  });

  // Load cart state and daily offer from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("fresco_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }

    const savedOffer = localStorage.getItem("fresco_daily_offer");
    if (savedOffer) {
      try {
        setDailyOffer(JSON.parse(savedOffer));
      } catch (e2) {
        console.error("Failed to parse daily offer storage", e2);
      }
    }
  }, []);

  const handleUpdateDailyOffer = (updated: typeof dailyOffer) => {
    setDailyOffer(updated);
    localStorage.setItem("fresco_daily_offer", JSON.stringify(updated));
  };

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

  // Map AI recommendations to trigger order popup of standard options
  const handleSelectItemByName = (name: string) => {
    const found = MENU_ITEMS.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedItem(found);
    } else {
      // Find relative
      const relative = MENU_ITEMS.find((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      if (relative) setSelectedItem(relative);
    }
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
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Header Banner */}
        <div id="home">
          <Hero
            onExploreMenu={scrollToMenuSection}
          />
        </div>

        {/* Fruit Slider Showcase */}
        <FruitSlider 
          onSelectItem={(categoryName) => {
            setSelectedCategory(categoryName);
            setSearchTerm(""); // Reset search to display the slider category immediately
            const element = document.getElementById("menu");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActiveSection("menu");
          }}
        />

        {/* 3. Prime Daily Promotional Offer Section */}
        <section className="py-10 bg-[#38A325] text-[#F9F8F4] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/[0.06] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left description */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <span className="text-4xl sm:text-5xl mt-1 shrink-0 animate-pulse select-none">🎁</span>
                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <span className="bg-[#F9F8F4] text-[#38A325] text-[9.5px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                      {dailyOffer.tag || "TODAY'S SPECIAL"}
                    </span>
                    <span className="text-white/65 text-[11px] font-mono uppercase tracking-wider font-semibold">
                      Pune Daily Spotlight
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif italic tracking-tight text-white leading-tight">
                    {dailyOffer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                    {dailyOffer.description}
                  </p>
                </div>
              </div>

              {/* Right claim button */}
              <button
                onClick={() => {
                  if (dailyOffer.code) {
                    const matchedCoupon = {
                      id: "daily_custom",
                      code: dailyOffer.code,
                      label: dailyOffer.title,
                      tag: dailyOffer.tag || "DAILY",
                      discountPercentage: 20, // default daily special gets 20% off
                      description: dailyOffer.description,
                    };
                    handleApplyPromoCoupon(matchedCoupon);
                    setIsCartOpen(true);
                  } else {
                    scrollToMenuSection();
                  }
                }}
                className="bg-[#F9F8F4] hover:bg-white text-[#1A1A1A] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md cursor-pointer transition-all shrink-0 border border-transparent"
              >
                Claim This Discount
              </button>
            </div>
          </div>
        </section>

        {/* 4. Menu options grid (matching Image 1) */}
        <MenuGrid
          onSelectItem={(item) => setSelectedItem(item)}
          onAddToCartDirectly={handleAddToCartDirectly}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* 4.5 Subscription Plans */}
        <SubscriptionSection
          onAddToCartDirectly={handleAddToCartDirectly}
        />

        {/* 5. Special promotional offers Deals list (matching Image 2) */}
        <SpecialOffers
          onApplyCoupon={handleApplyPromoCoupon}
          appliedCouponCode={appliedCoupon?.code}
        />

        {/* 6. Rounded free delivery announcement banner */}
        <HomeDeliveryBanner
          onOrderNow={scrollToMenuSection}
        />

        {/* 7. Crafting wellness About Us columns (matching Image 2) */}
        <AboutUs />

        {/* 9. Contact Us info card and steps columns (matching Image 2) */}
        <ContactSection
          onStartOrdering={scrollToMenuSection}
          onGeneralChat={handleGeneralChatWhatsApp}
        />

      </main>

      {/* 10. Ultimate Footer layouts (matching Image 3) */}
      <footer className="bg-[#1A1A1A] text-[#F9F8F4] pt-16 pb-8 border-t border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Logo and Slogans Column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <Logo size="sm" lightText={true} showTagline={false} />
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

      {/* 12. Modals Backdrop Overrides */}
      
      {/* Product Customization order modal */}
      <OrderModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleConfirmAddToCart}
      />

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
        dailyOffer={dailyOffer}
        onUpdateDailyOffer={handleUpdateDailyOffer}
      />

    </div>
  );
}
