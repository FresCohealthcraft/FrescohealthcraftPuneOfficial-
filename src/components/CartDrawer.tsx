import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, PromoCoupon } from "../types";
import { PROMO_COUPONS } from "../data";
import { X, Trash2, Plus, Minus, ShoppingCart, Compass, Leaf, User, Phone, MapPin, Truck, Clock, Calendar, ChevronDown, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  appliedCoupon: PromoCoupon | null;
  onApplyCoupon: (coupon: PromoCoupon | null) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onClearCart,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [puneLocation, setPuneLocation] = useState("Pune");
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [deliveryTime, setDeliveryTime] = useState("Morning (08:00 AM - 11:00 AM)");
  const [customTime, setCustomTime] = useState("");

  const getShortDescription = (desc: string) => {
    if (!desc) return "";
    const parts = desc.split("•").map(p => p.trim());
    if (parts.length > 1) {
      return parts.slice(0, 2).join(" • ");
    }
    return desc.length > 35 ? desc.slice(0, 32) + "..." : desc;
  };

  useEffect(() => {
    if (isOpen) {
      const savedUser = localStorage.getItem("fresco_logged_in_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name && !customerName) setCustomerName(parsed.name);
          if (parsed.phone && !phoneNumber) setPhoneNumber(parsed.phone);
          if (parsed.address && !addressDetails) setAddressDetails(parsed.address);
        } catch (e) {}
      }
    }
  }, [isOpen]);

  // Checkout flow state and helpers

  // Calculate prices
  const totalBeforePromo = cartItems.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  
  // Calculate coupon deductions
  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountAmount && appliedCoupon.discountAmount > 0) {
      discountValue = appliedCoupon.discountAmount;
    } else if (appliedCoupon.discountPercentage && appliedCoupon.discountPercentage > 0) {
      discountValue = parseFloat(((totalBeforePromo * appliedCoupon.discountPercentage) / 100).toFixed(2));
    }
  }
  
  // Apply logic for Free delivery threshold
  const isFreeDelivery = totalBeforePromo >= 199;
  const deliveryCharge = isFreeDelivery ? 0 : 30;
  const payableAmount = Math.max(0, totalBeforePromo - discountValue + deliveryCharge);

  const handleApplyPromoCode = () => {
    setPromoError("");
    const matched = PROMO_COUPONS.find(
      (c) => c.code.toUpperCase() === promoInput.trim().toUpperCase()
    );

    if (matched) {
      onApplyCoupon(matched);
      setPromoInput("");
    } else {
      setPromoError("Invalid promotional code");
    }
  };

  const handleCheckoutWhatsAppSubmit = () => {
    const resolvedDeliveryTime = deliveryTime === "Custom Time" ? (customTime.trim() ? `Custom (${customTime.trim()})` : "") : deliveryTime;
    
    if (!phoneNumber || !customerName || !addressDetails || !deliveryDate || !resolvedDeliveryTime) {
      if (deliveryTime === "Custom Time" && !customTime.trim()) {
        alert("Please enter your preferred custom delivery time!");
      } else {
        alert("Please fill in your Delivery Details (Name, WhatsApp Number, Address, Date and Time) first!");
      }
      return;
    }

    const itemsSummary = cartItems
      .map((item, i) => {
        const customizationInfo = item.customIngredients?.length
          ? ` (${item.customIngredients.join(", ")})`
          : "";
        return `${i + 1}. *${item.menuItem.name}* x ${item.quantity} - ₹${item.finalPrice * item.quantity}${customizationInfo}`;
      })
      .join("\n");

    const orderMsg = `Hello FresCo HealthCraft Pune! I'd like to place an order:
=============================
*Customer Name:* ${customerName}
*Phone / WhatsApp:* ${phoneNumber}
*Delivery Address:* ${addressDetails}
*Preferred Delivery:* ${deliveryDate} @ ${resolvedDeliveryTime}

*Order Items:*
${itemsSummary}

*Subtotal Amount:* ₹${totalBeforePromo}
${appliedCoupon ? `*Applied Offer:* ${appliedCoupon.label}${discountValue > 0 ? ` (- ₹${discountValue})` : ""}` : ""}
*Delivery Fees:* ${deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
=============================
*Total Payable Amount:* *₹${payableAmount.toFixed(0)}*
=============================
*Payment Mode:* Pay on Delivery (Cash / UPI scan)
=============================
Please accept my order request and share tracking updates on WhatsApp!`;

    const encoded = encodeURIComponent(orderMsg);

    const newOrder = {
      id: `FCD_${Date.now()}`,
      customerName,
      address: addressDetails,
      phone: phoneNumber,
      itemsCount: cartItems.length,
      items: cartItems,
      payableAmount,
      status: "pending",
      puneLocation,
      deliveryDate,
      deliveryTime: resolvedDeliveryTime,
      timestamp: new Date().toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const existing = JSON.parse(localStorage.getItem("fresco_orders") || "[]");
    localStorage.setItem("fresco_orders", JSON.stringify([newOrder, ...existing]));

    // Sync to logged-in user in localStorage
    const savedUser = localStorage.getItem("fresco_logged_in_user");
    if (!savedUser) {
      const newUser = {
        name: customerName,
        phone: phoneNumber,
        email: `${customerName.toLowerCase().replace(/\s+/g, "") || "user"}@gmail.com`,
        address: addressDetails
      };
      localStorage.setItem("fresco_logged_in_user", JSON.stringify(newUser));
    } else {
      try {
        const parsed = JSON.parse(savedUser);
        parsed.address = addressDetails;
        parsed.name = customerName;
        parsed.phone = phoneNumber;
        localStorage.setItem("fresco_logged_in_user", JSON.stringify(parsed));
      } catch (e) {}
    }

    // POST new order to live server
    try {
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    } catch (err) {
      console.error("Error pushing order to server database:", err);
    }

    // POST new customer info to live server
    try {
      const serverCust = {
        id: `cust_${Date.now()}`,
        name: customerName,
        phone: phoneNumber,
        email: `${customerName.toLowerCase().replace(/\s+/g, "") || "user"}@gmail.com`,
        address: addressDetails,
        status: "Active",
        ordersCount: existing.length + 1,
        totalSpent: existing.reduce((sum: number, o: any) => sum + (o.payableAmount || 0), 0) + payableAmount,
      };
      fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverCust),
      });
    } catch (err) {
      console.error("Error pushing customer to server database:", err);
    }

    // First, open WhatsApp immediately so it's a direct user-initiated action (prevents browser popup blocker)
    window.open(`https://wa.me/918983363146?text=${encoded}`, "_blank");

    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-110 flex outline-none">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#1A1A1A]/10"
          >
            
            {/* Header */}
            <div className="p-4.5 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-[#38A325] shrink-0 shadow-sm border border-[#E8F5E9]/80">
                  <ShoppingCart className="w-5 h-5 text-[#38A325]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px] text-stone-900 leading-tight">
                    Your Wellness Cart
                  </h3>
                  <p className="text-[11.5px] text-stone-550 font-medium mt-0.5">
                    Freshness prepared upon checkout
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-50 border border-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <span className="text-6.5xl select-none animate-pulse">🥤</span>
                  <h4 className="font-bold text-stone-900 mt-4 text-[15px]">Our blender is waiting!</h4>
                  <p className="text-xs text-stone-500 mt-1.5 max-w-xs leading-normal mx-auto font-medium">
                    Your cart is completely empty. Head into our fresh menu options and add natural boosters to personalize your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-[#121212] hover:bg-[#38A325] text-white px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-850 flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-[#38A325] fill-[#38A325]/10 shrink-0" />
                        <span>Selected Juices</span>
                      </span>
                      <button
                        onClick={onClearCart}
                        className="text-xs font-bold text-stone-400 hover:text-stone-650 transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-stone-100 p-3 rounded-2xl flex items-start justify-between gap-3 transition-all hover:shadow-xs"
                        >
                          {/* Left Item Graphic */}
                          {item.menuItem.image ? (
                            <img
                              src={item.menuItem.image}
                              className="w-14 h-14 rounded-2xl object-cover shrink-0 bg-stone-50 border border-stone-100 shadow-2xs"
                              alt={item.menuItem.name}
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-[#EFECE5]/55 select-none flex items-center justify-center text-2xl shrink-0 border border-stone-100">
                              {item.menuItem.icon}
                            </div>
                          )}

                          {/* Details Content */}
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-extrabold text-[13px] text-stone-900 leading-snug">
                                {item.menuItem.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-stone-300 hover:text-stone-500 p-0.5 rounded-md transition-colors cursor-pointer mt-0.5 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-stone-400 mt-0.5 font-semibold leading-tight">
                              {getShortDescription(item.menuItem.description)}
                            </p>
                            
                            {/* Customizable additives lists */}
                            {item.customIngredients && item.customIngredients.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {item.customIngredients.map((ing, k) => (
                                  <span
                                    key={k}
                                    className="bg-neutral-50 text-stone-600 text-[9px] font-semibold px-2 py-0.5 rounded-lg border border-stone-100"
                                  >
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Quantity and Price Row */}
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center space-x-3 bg-stone-100/65 rounded-full px-2 py-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-stone-100/40 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
                                >
                                  <Minus className="w-2.5 h-2.5 text-stone-500" />
                                </button>
                                <span className="w-4 text-center text-xs font-black text-stone-850">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-stone-100/40 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
                                >
                                  <Plus className="w-2.5 h-2.5 text-stone-500" />
                                </button>
                              </div>
                              <span className="font-extrabold text-[13.5px] text-[#1E4620]">
                                ₹{item.finalPrice * item.quantity}
                              </span>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Details & Form input fields */}
                  <div className="border-t border-stone-100 pt-5 space-y-3 text-left">
                    <span className="text-xs font-bold text-stone-850 uppercase tracking-widest flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-[#38A325] shrink-0" />
                      <span>Delivery &amp; Address</span>
                    </span>

                    <div className="space-y-3">
                      {/* Name input */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full text-xs pl-11 pr-4 py-3.5 border border-neutral-200/90 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] focus:outline-none bg-white placeholder:text-stone-400 text-stone-800 font-medium transition-all"
                          required
                        />
                      </div>

                      {/* WhatsApp number */}
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="tel"
                          placeholder="WhatsApp Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full text-xs pl-11 pr-4 py-3.5 border border-neutral-200/90 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] focus:outline-none bg-white placeholder:text-stone-400 text-stone-800 font-medium transition-all"
                          required
                        />
                      </div>

                      {/* Complete Address */}
                      <div className="relative">
                        <MapPin className="absolute left-4 top-[18px] w-4 h-4 text-stone-400" />
                        <textarea
                          placeholder="Complete Street Address, Wing/Flat, Landmark..."
                          value={addressDetails}
                          onChange={(e) => setAddressDetails(e.target.value)}
                          rows={2}
                          className="w-full text-xs pl-11 pr-4 py-3.5 border border-neutral-200/90 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] focus:outline-none bg-white placeholder:text-stone-400 text-stone-800 font-medium resize-none leading-relaxed transition-all"
                          required
                        />
                      </div>

                      {/* Delivery Date & Time */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full text-xs pl-4 pr-10 py-3.5 border border-neutral-200/90 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] focus:outline-none bg-white text-stone-800 font-medium cursor-pointer transition-all"
                            required
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>

                        <div className="relative">
                          <select
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="w-full text-xs pl-4 pr-10 py-3.5 border border-neutral-200/90 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] focus:outline-none bg-white text-stone-800 font-medium appearance-none cursor-pointer transition-all"
                            required
                          >
                            <option value="Morning (08:00 AM - 11:00 AM)">Morning</option>
                            <option value="Noon (11:00 AM - 02:00 PM)">Noon</option>
                            <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon</option>
                            <option value="Evening (05:00 PM - 08:00 PM)">Evening</option>
                            <option value="Custom Time">Custom Time...</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Custom Time Input Field */}
                      {deliveryTime === "Custom Time" && (
                        <div className="space-y-1 animate-fadeIn transition-all duration-300">
                          <label className="text-[10px] font-black uppercase tracking-wider text-[#38A325] pl-1 block text-left">
                            Specify Custom Time
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 04:30 PM, or As soon as possible"
                            value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            className="w-full text-xs p-3.5 border border-[#38A325]/30 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-white placeholder:text-gray-400 text-stone-800 font-medium text-left"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Checkout Sticky Bottom Section */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-stone-100 bg-white space-y-4 shrink-0">
                
                {/* Calculations summary lines */}
                <div className="space-y-3.5 text-xs text-stone-500 font-medium">
                  <div className="flex justify-between items-center px-1">
                    <span>Subtotal</span>
                    <span className="font-extrabold text-stone-850 text-[13px]">₹{totalBeforePromo}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex flex-col gap-1 bg-[#38A325]/5 p-2.5 rounded-xl border border-[#38A325]/10 text-[#38A325]">
                      <div className="flex justify-between font-bold">
                        <span>Applied Offer:</span>
                        <span>{appliedCoupon.label}</span>
                      </div>
                      {discountValue > 0 && (
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Discount Deducted:</span>
                          <span>- ₹{discountValue}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center px-1">
                    <span>Express Delivery</span>
                    <span className="font-extrabold text-stone-850 text-[13px]">
                      {isFreeDelivery ? "₹0" : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  {/* Progress Banner card */}
                  <div className="bg-[#F6FAF7] border border-[#1E4620]/5 p-3.5 rounded-2xl">
                    <div className="flex justify-between items-center text-[11px] font-bold text-stone-700 mb-2">
                      <div className="flex items-center gap-1.5 text-stone-800">
                        <Truck className="w-4 h-4 text-[#38A325]" />
                        <span>
                          {isFreeDelivery 
                            ? "You have unlocked FREE delivery!" 
                            : `₹${199 - totalBeforePromo} away from FREE delivery`
                          }
                        </span>
                      </div>
                      <span className="text-stone-400">
                        {isFreeDelivery ? "100%" : `${Math.round(Math.min(100, (totalBeforePromo / 199) * 100))}%`}
                      </span>
                    </div>
                    
                    {/* Progress Bar Track & Fill */}
                    <div className="w-full h-1.5 bg-[#E2ECE5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#38A325] rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${Math.min(100, (totalBeforePromo / 199) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Total Payable Row */}
                  <div className="flex justify-between items-center py-2.5 px-1 border-t border-b border-stone-100 my-4">
                    <span className="font-black text-stone-900 text-[13px] uppercase tracking-wider">Total Payable</span>
                    <div className="flex items-center gap-1.5 text-[#38A325]">
                      <Clock className="w-4 h-4" />
                      <span className="text-2xl font-black tracking-tight">
                        ₹{payableAmount.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm & checkout button */}
                <button
                  onClick={handleCheckoutWhatsAppSubmit}
                  className="w-full bg-[#121212] hover:bg-black text-white p-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-between transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#121212] transition-colors shrink-0 shadow-2xs">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                      </svg>
                    </div>
                    <span className="font-extrabold text-[13px] tracking-wide">Send Order on WhatsApp</span>
                  </div>
                  <ArrowRight className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    );
}
