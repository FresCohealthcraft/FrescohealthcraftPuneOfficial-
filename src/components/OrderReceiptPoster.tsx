import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  X, 
  Share2, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Wallet, 
  Truck, 
  Coins, 
  Utensils, 
  Sparkles,
  MessageCircle
} from "lucide-react";
// @ts-ignore
import frescoLogo from "../assets/images/fresco_logo.png";
import { ParsedWhatsAppOrder } from "../utils/whatsappOrderParser";

interface OrderReceiptPosterProps {
  order: ParsedWhatsAppOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderReceiptPoster: React.FC<OrderReceiptPosterProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    if (!posterRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // High resolution (Retina/DPI quality)
        useCORS: true,
        backgroundColor: "#FCFBF7",
        logging: false,
        windowWidth: 700,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (order.customerName || "FresCo_Order").replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `FresCo_Receipt_${safeName}_${Date.now()}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Failed to download image. You can use the Print button to Save as PDF!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyWhatsAppText = () => {
    const textToCopy = order.rawText || `Hello FresCo HealthCraft Pune! I'd like to place an order:
━━━━━━━━━━━━━━
*Customer Name:* ${order.customerName}
*Phone / WhatsApp:* ${order.phone}
*Delivery Address:* ${order.address}
*Preferred Delivery:* ${order.preferredDelivery}

*Order Items:*
${order.items.map((it, idx) => {
  let details = "";
  if (it.customSchedule && it.customSchedule.length > 0) {
    const isMonthly = (it.name || "").toLowerCase().includes("monthly");
    const planHeading = isMonthly ? "Selected 24-Day Menu & Schedule" : "Selected Menu & Daily Schedule";
    const formattedDays = it.customSchedule
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
  } else if (it.customIngredients?.length) {
    details = ` (${it.customIngredients.join(", ")})`;
  }
  return `${idx + 1}. *${it.name}* x ${it.quantity} - ₹${it.totalPrice}${details}`;
}).join("\n\n")}

*Subtotal Amount:* ₹${order.subtotal}
*Delivery Fees:* ${order.deliveryFee === "FREE" ? "FREE" : `₹${order.deliveryFee}`}
━━━━━━━━━━━━━━
*Total Payable Amount:* *₹${order.totalPayable}*
━━━━━━━━━━━━━━
*Payment Mode:* ${order.paymentMode}
━━━━━━━━━━━━━━
Please accept my order request and share tracking updates on WhatsApp!`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const textToSend = order.rawText || `Hello FresCo HealthCraft Pune! I'd like to place an order for ${order.customerName}. Total: ₹${order.totalPayable}`;
    window.open(`https://wa.me/918983363146?text=${encodeURIComponent(textToSend)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Modal Shell */}
      <div className="relative w-full max-w-2xl my-auto bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[96vh]">
        
        {/* Top Control Action Bar (Screen Only, Hidden on Print) */}
        <div className="print:hidden bg-neutral-950 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-white tracking-wide flex items-center gap-1.5">
              <span>FresCo Order Receipt Poster</span>
              <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-700/40">
                WhatsApp Format
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
              title="Print A4 / Thermal Bill"
            >
              <Printer className="w-3.5 h-3.5 text-[#054A29]" />
              <span>Print Bill</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-3 py-1.5 bg-[#054A29] hover:bg-[#076337] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all disabled:opacity-50"
              title="Download as PNG Image"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Saving..." : "Save Image"}</span>
            </button>

            <button
              onClick={handleCopyWhatsAppText}
              className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
              title="Copy WhatsApp Order Message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
              title="Resend on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="w-7 h-7 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-xl flex items-center justify-center cursor-pointer transition-all ml-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Receipt Area */}
        <div className="overflow-y-auto p-2 sm:p-4 bg-neutral-900/60 flex justify-center">
          
          {/* Printable Poster Canvas */}
          <div
            id="fresco-printable-receipt"
            ref={posterRef}
            className="w-full max-w-[580px] bg-[#FCFBF7] text-neutral-900 rounded-[28px] p-5 sm:p-7 shadow-xl border border-[#E9E5D9] relative overflow-hidden font-sans print:shadow-none print:border-none print:m-0 print:p-4 print:w-full"
            style={{
              backgroundImage: "radial-gradient(#e5e7eb 0.75px, transparent 0.75px)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Top Left Leaf Decoration */}
            <svg
              className="absolute -top-4 -left-4 w-24 h-24 text-emerald-600/25 pointer-events-none select-none rotate-12"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M20,50 Q40,20 70,30 Q90,50 60,80 Q30,80 20,50 Z" />
              <path d="M20,50 Q50,55 70,30" stroke="#054A29" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>

            {/* Top Right Leaf & Rays Decoration */}
            <svg
              className="absolute -top-3 -right-3 w-28 h-28 text-emerald-700/20 pointer-events-none select-none -rotate-45"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M30,20 Q70,10 80,40 Q90,80 50,70 Q20,60 30,20 Z" />
              <path d="M30,20 Q55,45 80,40" stroke="#054A29" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>

            {/* 1. Header Section */}
            <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-emerald-900/10 pb-4">
              {/* Brand Logo & Tagline */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-emerald-800/15 shadow-xs flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={frescoLogo}
                    alt="FresCo HealthCraft Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl sm:text-2xl font-black text-[#0A4D27] tracking-tight font-serif leading-none">
                      FresCo
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#0A4D27] tracking-tight font-serif leading-none">
                      HealthCraft
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-900/70 tracking-wide mt-1">
                    Crafting Wellness, Nurturing Life
                  </p>
                </div>
              </div>

              {/* Doodled Top Right Badge */}
              <div className="flex flex-col items-start sm:items-end">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs select-none">
                  <span>✨</span>
                  <span className="font-serif italic text-sm">Hello</span>
                  <span>♡</span>
                </div>
                <div className="mt-0.5 bg-[#F6D365]/85 text-neutral-900 px-3 py-1 rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-2xs border border-amber-400/50 flex items-center gap-1">
                  <span>FresCo HealthCraft Pune!</span>
                </div>
                <div className="text-[9.5px] font-extrabold text-emerald-800/80 mt-1 flex items-center gap-1">
                  <span>Healthy Food Happy You!</span>
                  <span className="text-amber-500">☀️</span>
                </div>
              </div>
            </div>

            {/* Subtitle Statement */}
            <div className="text-center my-3">
              <h3 className="text-sm sm:text-base font-extrabold text-neutral-800 tracking-tight font-serif inline-block relative px-4">
                <span className="text-amber-500 text-xs mr-1">✦</span>
                I&apos;d like to place an order:
                <span className="text-amber-500 text-xs ml-1">✦</span>
              </h3>
            </div>

            {/* 2. Customer Details Card */}
            <div className="bg-[#EBF7EE] border border-[#D1ECD6] rounded-2xl p-3.5 sm:p-4 mb-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                {/* Customer Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#38A325] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-900/60">
                      Customer Name:
                    </div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 truncate">
                      {order.customerName || "Customer"}
                    </div>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#38A325] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-900/60">
                      Phone / WhatsApp:
                    </div>
                    <div className="text-xs sm:text-sm font-black font-mono text-neutral-900 truncate">
                      {order.phone || "Not specified"}
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="flex items-center gap-2.5 min-w-0 sm:border-t sm:border-emerald-900/10 sm:pt-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#38A325] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-900/60">
                      Delivery Address:
                    </div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 break-words leading-tight">
                      {order.address || "Pune"}
                    </div>
                  </div>
                </div>

                {/* Preferred Delivery */}
                <div className="flex items-center gap-2.5 min-w-0 sm:border-t sm:border-emerald-900/10 sm:pt-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#38A325] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Calendar className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-900/60">
                      Preferred Delivery:
                    </div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 leading-tight">
                      {order.preferredDelivery || "Standard Fresh Delivery"}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Order Items Section (Cream / Warm Card) */}
            <div className="bg-[#FFFDF4] border border-[#F4E6BD] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs mb-3.5">
              
              {/* Card Title */}
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-2.5 mb-3.5">
                <div className="flex items-center gap-2 text-neutral-900">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-sm sm:text-base font-black tracking-tight text-neutral-900">
                    Order Items
                  </span>
                  <span className="text-amber-500 font-bold select-none text-xs">⚡</span>
                </div>

                {order.items.some((i) => i.isWeeklyCustomPlan) && (
                  <span className="bg-[#FBE492] text-amber-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-400/60 shadow-2xs">
                    Customized for You! ✨
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3.5">
                {order.items.length === 0 ? (
                  <div className="text-xs text-neutral-400 py-2 text-center">No items listed.</div>
                ) : (
                  order.items.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Image or Icon */}
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-amber-900/10 shadow-2xs overflow-hidden flex items-center justify-center shrink-0 p-0.5">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <span className="text-2xl select-none">{item.icon || "🥤"}</span>
                            )}
                          </div>
                          
                          {/* Title & Quantity */}
                          <div className="min-w-0 text-left">
                            <h4 className="text-xs sm:text-sm font-black text-[#1C3B24] truncate">
                              {item.name}
                            </h4>
                            <div className="text-[11px] sm:text-xs font-bold text-neutral-600 font-mono mt-0.5">
                              x {item.quantity} - ₹{item.totalPrice || item.price * item.quantity}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-black text-neutral-900 font-mono">
                            ₹{item.totalPrice || item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Customized Schedule Breakdown (if applicable) */}
                      {item.customSchedule && item.customSchedule.length > 0 && (
                        <div className="bg-[#EEF7F0] border border-[#D5ECD9] rounded-xl p-3 text-left space-y-1.5 ml-14">
                          <div className="flex items-center gap-1.5 text-[10.5px] font-black text-[#196B36] uppercase tracking-wider">
                            <Utensils className="w-3.5 h-3.5" />
                            <span>Selected Customized Menu:</span>
                          </div>
                          <div className="space-y-1 font-mono text-[10.5px] sm:text-[11px] text-neutral-800">
                            {item.customSchedule.map((line, lIdx) => {
                              const [day, ...rest] = line.split(":");
                              const content = rest.join(":");
                              return (
                                <div key={lIdx} className="grid grid-cols-[72px_10px_1fr] items-baseline">
                                  <span className="font-bold text-emerald-900 font-sans">{day.trim()}</span>
                                  <span className="text-neutral-400">:</span>
                                  <span className="text-neutral-800 font-medium">{content ? content.trim() : line}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-amber-900/10 mt-4 pt-3 space-y-1.5 text-left text-xs">
                <div className="flex justify-between items-center text-neutral-700">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Coins className="w-3.5 h-3.5 text-amber-600" />
                    <span>Subtotal Amount:</span>
                  </span>
                  <span className="font-mono font-bold text-neutral-900">
                    ₹{order.subtotal}
                  </span>
                </div>

                {order.appliedOffer && (
                  <div className="flex justify-between items-center text-emerald-700">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Offer ({order.appliedOffer}):</span>
                    </span>
                    <span className="font-mono font-bold">
                      -₹{order.discountAmount || 0}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-neutral-700">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Delivery Fees:</span>
                  </span>
                  <span className={`font-mono font-black ${order.deliveryFee === "FREE" ? "text-emerald-700" : "text-neutral-900"}`}>
                    {order.deliveryFee === "FREE" ? "FREE" : `₹${order.deliveryFee}`}
                  </span>
                </div>
              </div>

              {/* Dashed Separator */}
              <div className="border-t-2 border-dashed border-[#E7D6A7] my-3.5" />

              {/* Total Payable Amount Banner */}
              <div className="bg-[#115E2D] text-white rounded-2xl p-2.5 sm:p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4 text-emerald-300" />
                  </div>
                  <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
                    Total Payable Amount:
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#09421E] px-3.5 py-1.5 rounded-xl border border-emerald-500/30 shrink-0">
                  <span className="text-amber-400 text-xs">⚡</span>
                  <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">
                    ₹{order.totalPayable}
                  </span>
                  <span className="text-amber-400 text-xs">⚡</span>
                </div>
              </div>

            </div>

            {/* 4. Payment Mode Row */}
            <div className="bg-[#EBF7EE] border border-[#D1ECD6] rounded-xl p-2.5 sm:p-3 mb-3 text-left flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#38A325] text-white flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="text-xs font-extrabold text-neutral-800">
                <span className="text-emerald-900/60 uppercase text-[9px] tracking-wider block">Payment Mode:</span>
                <span>{order.paymentMode || "Pay on Delivery (Cash / UPI scan)"}</span>
              </div>
            </div>

            {/* 5. WhatsApp Notice Card */}
            <div className="bg-[#EBF7EE] border border-[#CCE8D2] rounded-2xl p-3 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-4.5 h-4.5 fill-current" />
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-neutral-800 leading-snug">
                  Please accept my order request and share tracking updates on WhatsApp!
                </p>
              </div>

              <div className="text-amber-500 font-bold select-none text-sm shrink-0">
                = ♡ =
              </div>
            </div>

            {/* 6. Footer Botanical Doodle */}
            <div className="mt-4 pt-3 border-t border-emerald-900/10 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-[10px] tracking-widest uppercase">
                <span>🍃</span>
                <span>Fresh  •  Pure  •  Naturally You</span>
                <span>🍃</span>
              </div>
              <div className="text-[8.5px] font-mono text-neutral-400 mt-1">
                FresCo HealthCraft Pune | Pure Cold-Pressed Wellness & Nutrition
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderReceiptPoster;
