import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, PromoCoupon } from "../types";
import { PROMO_COUPONS } from "../data";
import { X, Trash2, Plus, Minus, ShoppingCart, Compass } from "lucide-react";

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

    onClearCart();
    onClose();
    window.open(`https://wa.me/918983363146?text=${encoded}`, "_blank");
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
            <div className="p-5 border-b border-[#1A1A1A]/5 flex items-center justify-between bg-[#EFECE5]/40">
              <div className="flex items-center space-x-2.5">
                <ShoppingCart className="w-5 h-5 text-[#38A325]" />
                <div>
                  <h3 className="font-serif italic text-lg text-[#1A1A1A] leading-tight">
                    Your Wellness Cart
                  </h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#38A325] mt-1">
                    Freshness Prepared Upon Checkout
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#EFECE5] rounded-full text-gray-400 hover:text-gray-750 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <span className="text-6.5xl select-none animate-pulse">🥤</span>
                  <h4 className="font-bold text-[#1A1A1A] mt-4 text-[15px]">Our blender is waiting!</h4>
                  <p className="text-xs text-gray-400 mt-1.5 max-w-xs leading-normal mx-auto">
                    Your cart is completely empty. Head into our fresh menu options and add natural boosters to personalize your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-[#1A1A1A] hover:bg-[#38A325] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Selected Juices ({cartItems.length})
                      </span>
                      <button
                        onClick={onClearCart}
                        className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-[#1A1A1A]/10 p-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-all hover:border-[#1A1A1A]/20"
                        >
                          {/* Left Item Graphic */}
                          <div className="w-9 h-9 rounded-lg bg-[#EFECE5]/55 select-none flex items-center justify-center text-xl shrink-0">
                            {item.menuItem.icon}
                          </div>

                          {/* Center meta Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-[#1A1A1A] truncate leading-tight">
                              {item.menuItem.name}
                            </h4>
                            <p className="font-mono text-[11px] font-bold text-[#38A325] mt-0.5">
                              ₹{item.finalPrice}
                            </p>
                            
                            {/* Customizable additives lists */}
                            {item.customIngredients && item.customIngredients.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.customIngredients.map((ing, k) => (
                                  <span
                                    key={k}
                                    className="bg-[#EFECE5]/40 text-[#1A1A1A]/70 text-[9px] font-medium px-1.5 py-0.5 rounded border border-[#1A1A1A]/5"
                                  >
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Quantity togglers */}
                            <div className="flex items-center space-x-1.5 mt-1">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-0.5 bg-[#F9F8F4] hover:bg-[#EFECE5] rounded text-gray-400 transition-colors cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="w-4 text-center text-[10px] font-extrabold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 bg-[#F9F8F4] hover:bg-[#EFECE5] rounded text-gray-400 transition-colors cursor-pointer"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                          </div>

                          {/* Absolute Delete single item button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-300 hover:text-red-550 p-1 rounded-md transition-colors cursor-pointer mt-0.5 shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location & Field Detail inputs */}
                  <div className="border-t border-gray-105 pt-5 space-y-3 text-left">
                    <span className="text-xs font-bold text-[#1A1A1A]/80 uppercase tracking-widest flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-[#38A325] shrink-0" />
                      <span>Delivery Details &amp; Address</span>
                    </span>

                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Name)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 placeholder:text-gray-400"
                        required
                      />

                      <input
                        type="tel"
                        placeholder="WhatsApp Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 placeholder:text-gray-400"
                        required
                      />

                      <textarea
                        placeholder="Complete Street Address, Wing/Flat No, Landmark next to..."
                        value={addressDetails}
                        onChange={(e) => setAddressDetails(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 placeholder:text-gray-400"
                        required
                      />

                      {/* Delivery Date & Time Slot Column */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 pl-1 block text-left">
                            Delivery Date
                          </label>
                          <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 cursor-pointer text-left"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 pl-1 block text-left">
                            Delivery Time
                          </label>
                          <select
                            value={deliveryTime}
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 cursor-pointer text-left"
                            required
                          >
                            <option value="Morning (08:00 AM - 11:00 AM)">Morning (08:00 AM - 11:00 AM)</option>
                            <option value="Noon (11:00 AM - 02:00 PM)">Noon (11:00 AM - 02:00 PM)</option>
                            <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                            <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                            <option value="Custom Time">Custom Time...</option>
                          </select>
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
                            className="w-full text-xs p-3.5 border border-[#38A325]/30 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-white placeholder:text-gray-400 text-left"
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
              <div className="p-5 border-t border-[#1A1A1A]/10 bg-gradient-to-t from-[#F2FAED] to-white space-y-4">
                
                {/* Calculations summary lines */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Items Total Subtotal:</span>
                    <span className="font-semibold text-gray-800">₹{totalBeforePromo}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex flex-col gap-1.5 bg-[#38A325]/5 p-2.5 rounded-xl border border-[#38A325]/10 text-[#38A325]">
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

                  <div className="flex justify-between text-gray-500">
                    <div>
                      <span>Pune Express Delivery:</span>
                      {isFreeDelivery && (
                        <span className="text-[9px] text-[#38A325] font-bold ml-1.5 uppercase bg-[#38A325]/10 px-1.5 py-0.5 rounded-md border border-[#38A325]/10">
                          Free
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {isFreeDelivery ? "₹0" : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  {!isFreeDelivery && (
                    <p className="text-[10px] text-amber-600 font-bold leading-normal">
                      Add ₹{199 - totalBeforePromo} more of booster items to unlock FREE Pune Delivery!
                    </p>
                  )}

                  <div className="h-px bg-gray-200 my-2" />

                  <div className="flex justify-between text-sm items-center">
                    <span className="font-bold uppercase tracking-wider text-xs text-[#1A1A1A]">Total Payable Amount:</span>
                    <span className="text-2xl font-sans font-extrabold text-[#38A325]">
                      ₹{payableAmount.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Confirm & checkout button */}
                <button
                  onClick={handleCheckoutWhatsAppSubmit}
                  className="w-full bg-[#1A1A1A] hover:bg-[#38A325] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-98"
                >
                  <svg
                    className="w-4 h-4 fill-current mr-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                  </svg>
                  <span>Send Order On WhatsApp</span>
                </button>

              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    );
}
