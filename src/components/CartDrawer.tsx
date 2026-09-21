import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, PromoCoupon } from "../types";
import { PROMO_COUPONS } from "../data";
import { X, Trash2, Plus, Minus, ShoppingCart, Compass, Leaf, User, Phone, MapPin, Truck, Clock, Calendar, ChevronDown, ArrowRight, AlertCircle, ShieldAlert, Printer } from "lucide-react";
import OrderReceiptPoster from "./OrderReceiptPoster";
import { convertOrderToParsed, ParsedWhatsAppOrder } from "../utils/whatsappOrderParser";

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

export function resolveItemCustomSchedule(item: CartItem): string[] | null {
  // 1. Direct CartItem customSchedule property
  if (item.customSchedule && Array.isArray(item.customSchedule) && item.customSchedule.length > 0) {
    return item.customSchedule;
  }
  // 2. Schedule attached to menuItem
  if ((item.menuItem as any)?.customSchedule && Array.isArray((item.menuItem as any).customSchedule) && (item.menuItem as any).customSchedule.length > 0) {
    return (item.menuItem as any).customSchedule;
  }
  // 3. Extracted from menuItem description (matches lines with days)
  if (item.menuItem?.description) {
    const rawLines = item.menuItem.description.split("\n").map((l) => l.replace(/^[•\-\*\s]+/, "").trim()).filter(Boolean);
    const dayLines = rawLines.filter((l) => /(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Day\s*\d+)\s*[:\-]/i.test(l));
    if (dayLines.length > 0) {
      return dayLines;
    }
  }
  // 4. Fallback: retrieve from localStorage for custom plan subscriptions
  const itemName = (item.menuItem?.name || "").toLowerCase();
  if (itemName.includes("custom")) {
    const planType = itemName.includes("monthly") ? "monthly" : "weekly";
    const stored = localStorage.getItem(`fresco_custom_schedule_${planType}`) || localStorage.getItem("fresco_last_custom_schedule");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {}
    }
    // Also check fresco_active_sub_v2
    const activeSub = localStorage.getItem("fresco_active_sub_v2");
    if (activeSub) {
      try {
        const parsedSub = JSON.parse(activeSub);
        if (parsedSub?.customSchedule && Array.isArray(parsedSub.customSchedule) && parsedSub.customSchedule.length > 0) {
          return parsedSub.customSchedule;
        }
      } catch {}
    }
  }

  // 5. Presets for Standard Weekly Subscriptions
  if (itemName.includes("wellness cycle") || item.menuItem?.id === "sub_weekly_nutrient") {
    return [
      "Monday: Detox Body Drink + Sprouts Bowl (🌱)",
      "Tuesday: Immunity Booster Drink + Classic Delight Cup (🛡️)",
      "Wednesday: Vital Energy Drink + Protein Packed Cup (⚡)",
      "Thursday: Skin Glow-up Drink + Exotic Delight Cup (✨)",
      "Friday: Fat Burner Drink + 30G Protein Paneer Bowl (💪)",
      "Saturday: ABC Drink + Energy Boost Shake (💧)"
    ];
  }
  if (itemName.includes("fruit juice") || item.menuItem?.id === "sub_weekly_fruit_juice") {
    return [
      "Monday: Fresh Sweet Orange Juice (🍊)",
      "Tuesday: Bromelain-Rich Pineapple Juice (🍍)",
      "Wednesday: Sweet Lime (Mosambi) Natural Immunity Extract (🍈)",
      "Thursday: Fresh Apple Juice (🍎)",
      "Friday: Digestive Enzyme Papaya Juice (🍑)",
      "Saturday: Antioxidant Pomegranate Juice (🍷)"
    ];
  }
  if (itemName.includes("weight loss") || itemName.includes("fat burn") || item.menuItem?.id === "sub_weekly_fat_burn") {
    return [
      "Monday: Fat Burner Juice + 35g Protein Chicken Bowl (🔥)",
      "Tuesday: Detox Body Juice + Sprout Bowl (🌿)",
      "Wednesday: Gut Reset Juice + 30G Protein Paneer Bowl (🥒)",
      "Thursday: Fat Burner Juice + 35g Protein Chicken Bowl (🔥)",
      "Friday: Detox Body Juice + Sprout Bowl (🍃)",
      "Saturday: ABC Booster Juice + Power Packed Cup (❤️)",
      "Sunday: Gut Reset Juice + 30G Protein Paneer Bowl (🌱)"
    ];
  }

  // 6. Presets for Standard Monthly Subscriptions
  if (itemName.includes("daily fresh wellness") || item.menuItem?.id === "month_green_taster") {
    return [
      "30 Daily Fresh Cold-Pressed Juices",
      "15 Sprouts Bowls + 15 Classic Delight Cups",
      "Natural Detox, High in Protein & Micronutrients",
      "Free Pune Priority Morning Delivery"
    ];
  }
  if (itemName.includes("protein power") || item.menuItem?.id === "month_balanced_cleanse") {
    return [
      "30 x 30G Protein Paneer Bowls",
      "26 x Power Packed Cups",
      "4 x Premium Fruit Cups Every Sunday",
      "High Protein & Muscle Recovery Fuel"
    ];
  }
  if (itemName.includes("ultimate wellness") || item.menuItem?.id === "month_wellness_overhaul") {
    return [
      "30 x Daily Cold-Pressed Juices",
      "26 x Daily Sprouts Bowls + 26 x Premium Fruit Cups",
      "4 x Weekly Power Packed Cups + 4 x 30G Protein Paneer Bowls",
      "Complete 30-Day Elite Raw Nutrition with Free Delivery"
    ];
  }

  return null;
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
  const [receiptOrder, setReceiptOrder] = useState<ParsedWhatsAppOrder | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handlePreviewReceipt = () => {
    const resolvedDeliveryTime = deliveryTime === "Custom Time" ? (customTime.trim() ? `Custom (${customTime.trim()})` : "") : deliveryTime;
    const tempOrder = {
      customerName: customerName || "Valued Customer",
      phone: phoneNumber || "",
      address: addressDetails || "Pune",
      deliveryDate,
      deliveryTime: resolvedDeliveryTime,
      items: cartItems,
      totalBeforePromo,
      discountValue,
      payableAmount,
      promoApplied: appliedCoupon || undefined,
    };
    setReceiptOrder(convertOrderToParsed(tempOrder));
    setIsReceiptOpen(true);
  };

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

  // Validation Rule: Weekly Fruit Juice subscription requirement
  const hasWeeklyFruitJuice = cartItems.some((item) => {
    const id = item.menuItem.id;
    const name = item.menuItem.name.toLowerCase();
    return (
      id === "sub_weekly_fruit_juice" ||
      id.startsWith("sub_fj_") ||
      name.includes("weekly fruit juice")
    );
  });

  const selectedBowlItems = cartItems.filter((item) => {
    const id = item.menuItem.id;
    const name = item.menuItem.name.toLowerCase();
    const category = (item.menuItem.category || "").toLowerCase();

    if (id === "sub_weekly_fruit_juice" || id.startsWith("sub_fj_") || name.includes("weekly fruit juice")) {
      return false;
    }

    return (
      name.includes("bowl") ||
      category.includes("bowl") ||
      category.includes("super food sprouts bowls") ||
      category.includes("high protein meals") ||
      category.includes("power cups") ||
      name.includes("sprouts") ||
      name.includes("paneer") ||
      name.includes("chicken")
    );
  });

  const hasBowlItem = selectedBowlItems.length > 0;
  const assignedBowlNames = selectedBowlItems.map((i) => i.menuItem.name).join(", ");
  const isWeeklyFruitJuiceValid = !hasWeeklyFruitJuice || hasBowlItem;

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

    // Weekly Fruit Juice Validation Rule check: Bowl required
    if (hasWeeklyFruitJuice && !hasBowlItem) {
      alert(
        "⚠️ Weekly Fruit Juice Subscription Restriction:\n\nCustomers purchasing a Weekly Fruit Juice subscription cannot proceed to send an order unless they add at least one Bowl item (e.g., Sprouts Bowl, Paneer Sprouts Bowl, or Chicken Power Bowl) to their cart.\n\nPlease add a Bowl item to proceed!"
      );
      return;
    }

    const itemsSummary = cartItems
      .map((item, i) => {
        let details = "";

        // Check if item has a customized plan schedule (from Customize Plan or subscriptions)
        const schedule = resolveItemCustomSchedule(item);

        if (schedule && schedule.length > 0) {
          const isMonthly = item.menuItem.name.toLowerCase().includes("monthly");
          const planHeading = isMonthly ? "Selected 24-Day Menu & Schedule" : "Selected Menu & Daily Schedule";
          const formattedDays = schedule
            .map((line) => {
              const cleaned = line.replace(/^[•\-\*\s]+/, "").trim();
              const dayMatch = cleaned.match(/^([A-Za-z0-9\s]+)\s*[:\-]\s*(.*)$/);
              if (dayMatch && !cleaned.startsWith("🍹") && !cleaned.startsWith("🥗") && !cleaned.startsWith("🥣")) {
                const dayLabel = dayMatch[1].trim();
                let dayContent = dayMatch[2].trim();
                if (dayContent.toLowerCase() === "not selected" || !dayContent) {
                  dayContent = "Not selected (Rest / No delivery)";
                }
                return `   • *${dayLabel}:* ${dayContent}`;
              }
              return `   • ${cleaned}`;
            })
            .join("\n");
          details = `\n   📋 *${planHeading}:*\n${formattedDays}`;
        } else if (item.customIngredients?.length) {
          details = ` (${item.customIngredients.join(", ")})`;
        }

        return `${i + 1}. *${item.menuItem.name}* x ${item.quantity} - ₹${item.finalPrice * item.quantity}${details}`;
      })
      .join("\n\n");

    const weeklyAssignmentMsg = (hasWeeklyFruitJuice && hasBowlItem)
      ? `\n━━━━━━━━━━━━━━\n📌 *AUTOMATIC WEEKLY PLAN ASSIGNMENT:*\n• *Weekly Fruit Juice Subscription:* Paired with selected Bowl (*${assignedBowlNames}*)\n• *Scheduled Deliveries:* Automatically assigned to customer's weekly plan and included in scheduled weekly deliveries 🚚`
      : "";

    const orderMsg = `Hello FresCo HealthCraft Pune! I'd like to place an order:
━━━━━━━━━━━━━━
*Customer Name:* ${customerName}
*Phone / WhatsApp:* ${phoneNumber}
*Delivery Address:* ${addressDetails}
*Preferred Delivery:* ${deliveryDate} @ ${resolvedDeliveryTime}

*Order Items:*
${itemsSummary}${weeklyAssignmentMsg}

*Subtotal Amount:* ₹${totalBeforePromo}
${appliedCoupon ? `*Applied Offer:* ${appliedCoupon.label}${discountValue > 0 ? ` (- ₹${discountValue})` : ""}` : ""}
*Delivery Fees:* ${deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
━━━━━━━━━━━━━━
*Total Payable Amount:* *₹${payableAmount.toFixed(0)}*
━━━━━━━━━━━━━━
*Payment Mode:* Pay on Delivery (Cash / UPI scan)
*Total Payable Amount:* *₹${payableAmount.toFixed(0)}*
━━━━━━━━━━━━━━
Please accept my order request and share tracking updates on WhatsApp!`;

    const encoded = encodeURIComponent(orderMsg);

    const savedUser = localStorage.getItem("fresco_logged_in_user");
    let calculatedEmail = `${customerName.toLowerCase().replace(/\s+/g, "") || "user"}@gmail.com`;
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.email) calculatedEmail = parsed.email;
      } catch (e) {}
    }

    const newOrder = {
      id: `FCD_${Date.now()}`,
      customerName,
      address: addressDetails,
      phone: phoneNumber,
      email: calculatedEmail,
      items: cartItems.map((it) => ({
        ...it,
        customSchedule: resolveItemCustomSchedule(it) || it.customSchedule,
      })),
      rawText: orderMsg,
      totalBeforePromo,
      discountValue,
      payableAmount,
      promoApplied: appliedCoupon || undefined,
      status: "pending",
      puneLocation,
      deliveryDate,
      deliveryTime: resolvedDeliveryTime,
      weeklyFruitJuiceSubscription: hasWeeklyFruitJuice,
      assignedWeeklyBowl: (hasWeeklyFruitJuice && hasBowlItem) ? assignedBowlNames : undefined,
      scheduledWeeklyDeliveriesNote: (hasWeeklyFruitJuice && hasBowlItem)
        ? `Bowl (${assignedBowlNames}) automatically assigned to Weekly Fruit Juice Plan & included in scheduled weekly deliveries.`
        : undefined,
      timestamp: new Date().toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const existing = JSON.parse(localStorage.getItem("fresco_orders") || "[]");
    const updatedOrdersList = [newOrder, ...existing];
    localStorage.setItem("fresco_orders", JSON.stringify(updatedOrdersList));

    // Dispatch custom events to notify open Admin Portals in real time
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("fresco_orders_updated"));
    window.dispatchEvent(new CustomEvent("fresco_data_updated"));

    // BroadcastChannel message across tabs/windows
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const frescoChannel = new BroadcastChannel("fresco_realtime_channel");
        frescoChannel.postMessage({ type: "fresco_orders", data: updatedOrdersList });
        frescoChannel.close();
      } catch (e) {}
    }

    // Sync to logged-in user in localStorage
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
      }).catch(() => {});
    } catch (err) {
      // Local fallback
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
      }).catch(() => {});
    } catch (err) {
      // Local fallback
    }

    // Set receipt order for instant high-quality print and save
    const parsedReceipt = convertOrderToParsed(newOrder);
    setReceiptOrder(parsedReceipt);
    setIsReceiptOpen(true);

    // First, open WhatsApp immediately so it's a direct user-initiated action (prevents browser popup blocker)
    window.open(`https://wa.me/918983363146?text=${encoded}`, "_blank");

    onClearCart();
    onClose();
  };

  return (
    <>
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
                            {item.customIngredients && item.customIngredients.length > 0 && !item.customSchedule && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {item.customIngredients.map((ing, k) => {
                                  const isProtein = ing.toLowerCase().includes("protein");
                                  return (
                                    <span
                                      key={k}
                                      className={isProtein 
                                        ? "bg-purple-50 text-purple-900 text-[9.5px] font-bold px-2 py-0.5 rounded-lg border border-purple-200/80 flex items-center gap-1"
                                        : "bg-amber-50 text-amber-900 text-[9.5px] font-bold px-2 py-0.5 rounded-lg border border-amber-200/80 flex items-center gap-1"
                                      }
                                    >
                                      <span>{isProtein ? "💪" : "🍫"}</span>
                                      <span>{ing}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}

                            {/* Customized Plan Schedule Breakdown */}
                            {(() => {
                              const schedule = resolveItemCustomSchedule(item);

                              if (!schedule || schedule.length === 0) return null;

                              return (
                                <div className="mt-2 p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-[10px] space-y-1">
                                  <div className="font-extrabold text-[#2E7D32] flex items-center gap-1 text-[10.5px]">
                                    <span>📋</span>
                                    <span>Selected Daily Menu:</span>
                                  </div>
                                  <div className="space-y-0.5 text-stone-700 font-medium">
                                    {schedule.map((line, sIdx) => {
                                      const cleaned = line.replace(/^[•\-\*\s]+/, "").trim();
                                      const dayMatch = cleaned.match(/^([A-Za-z0-9\s]+)\s*[:\-]\s*(.*)$/);
                                      if (dayMatch && !cleaned.startsWith("🍹") && !cleaned.startsWith("🥗") && !cleaned.startsWith("🥣")) {
                                        const dayLabel = dayMatch[1].trim();
                                        const dayContent = dayMatch[2].trim();
                                        const isNotSelected = !dayContent || dayContent.toLowerCase().includes("not selected");
                                        return (
                                          <div key={sIdx} className="flex items-start gap-1 leading-snug">
                                            <span className="text-[#38A325] font-bold">•</span>
                                            <span className="font-semibold text-stone-900">{dayLabel}:</span>
                                            <span className={isNotSelected ? "text-stone-400 italic" : "text-stone-700"}>
                                              {isNotSelected ? "Rest / No item selected" : dayContent}
                                            </span>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={sIdx} className="flex items-start gap-1 leading-snug">
                                          <span className="text-[#38A325] font-bold">•</span>
                                          <span>{cleaned}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}

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

                {/* Weekly Fruit Juice Subscription Rule Notice */}
                {hasWeeklyFruitJuice && (
                  <div className={`p-3.5 rounded-2xl border text-left my-2 transition-all ${
                    hasBowlItem
                      ? "bg-emerald-50/90 border-emerald-300 text-emerald-900"
                      : "bg-amber-50/90 border-amber-300/90 text-amber-900 shadow-xs"
                  }`}>
                    <div className="flex items-start gap-2.5">
                      {hasBowlItem ? (
                        <ShieldAlert className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 text-xs">
                        <h4 className="font-extrabold uppercase tracking-wide text-[10.5px] text-[#1E4620]">
                          Weekly Fruit Juice Subscription Requirement
                        </h4>
                        <p className="mt-1 leading-snug font-medium text-[11px] text-stone-700">
                          To order Weekly Fruit Juice, please select at least <strong>1 Bowl item</strong> (e.g. Sprouts Bowl, Paneer Bowl, or Chicken Power Bowl).
                        </p>

                        <div className="mt-2 pt-2 border-t border-stone-200/60 space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-stone-600">Bowl Item Selection:</span>
                            <span className={hasBowlItem ? "text-emerald-700 font-extrabold" : "text-red-600 font-bold"}>
                              {hasBowlItem ? `✅ Added (${assignedBowlNames})` : "❌ Bowl Required"}
                            </span>
                          </div>

                          {hasBowlItem && (
                            <div className="mt-1 p-2 rounded-xl bg-emerald-100/80 border border-emerald-300/80 text-[#1E4620] text-[10.5px] font-semibold leading-tight flex items-start gap-1.5">
                              <span className="shrink-0 text-xs">🚚</span>
                              <span>
                                <strong>Automatic Assignment:</strong> Selected Bowl (<em>{assignedBowlNames}</em>) is automatically assigned to your Weekly Fruit Juice plan &amp; included in your scheduled weekly deliveries!
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Printable Receipt Poster */}
                <button
                  type="button"
                  onClick={handlePreviewReceipt}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#054A29] border border-emerald-200/80 py-2.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <Printer className="w-4 h-4 text-[#054A29]" />
                  <span>Preview &amp; Print Bill Poster</span>
                </button>

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

    {/* Order Receipt Poster Modal */}
    {receiptOrder && (
      <OrderReceiptPoster
        isOpen={isReceiptOpen}
        onClose={() => {
          setIsReceiptOpen(false);
          setReceiptOrder(null);
        }}
        order={receiptOrder}
      />
    )}
    </>
  );
}
