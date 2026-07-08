import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CartItem } from "../types";
import { X, Plus, Minus, ShoppingCart, Leaf } from "lucide-react";

interface OrderModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function OrderModal({ item, isOpen, onClose, onAddToCart }: OrderModalProps) {
  const [sugarCustom, setSugarCustom] = useState<string>("No Added Sugar");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  const addOnPrices: { [key: string]: number } = {
    "Chia Seeds": 15,
    "Basil Seeds (Sabja)": 10,
    "Wheatgrass Extract": 25,
    "Ginger Booster Shot": 15,
    "Organic Amla Shot": 20,
  };

  const sugarPrices: { [key: string]: number } = {
    "No Added Sugar": 0,
    "Mild Forest Honey": 10,
    "Ayurvedic Organic Rock Salt": 0,
    "Pure Jaggery Syrup": 15,
  };

  useEffect(() => {
    if (item) {
      setSugarCustom("No Added Sugar");
      setSelectedAddons([]);
      setQuantity(1);
      setNotes("");
    }
  }, [item]);

  if (!item) return null;

  const handleAddonClick = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate customized final Price per serving
  const addonCost = selectedAddons.reduce((acc, current) => acc + (addOnPrices[current] || 0), 0);
  const sugarCost = sugarPrices[sugarCustom] || 0;
  const singleItemCustomizedPrice = item.price + addonCost + sugarCost;
  const overallPrice = singleItemCustomizedPrice * quantity;

  // Add customized item to shopping cart state
  const handleConfirmAddToCart = () => {
    const formattedCustomDetails = [
      `Sweetener: ${sugarCustom}`,
      ...selectedAddons.map((a) => `Add-on: ${a}`),
      notes ? `Notes: ${notes}` : ""
    ].filter((detail) => detail !== "");

    const cartItem: CartItem = {
      id: `${item.id}_${Date.now()}`,
      menuItem: item,
      quantity,
      customIngredients: formattedCustomDetails,
      finalPrice: singleItemCustomizedPrice,
      isCustomRecipe: false,
    };

    onAddToCart(cartItem);
    onClose();
  };

  // Instant direct WhatsApp Checkout for single item convenience
  const handleDirectWhatsAppOrder = () => {
    const customText = [
      `Sweetener: ${sugarCustom}`,
      selectedAddons.length ? `Add-ons: ${selectedAddons.join(", ")}` : "",
      notes ? `Notes: ${notes}` : ""
    ].filter(Boolean).join(" | ");

    const orderMsg = `Hello FresCo HealthCraft Pune! I would like to order:
=============================
- *Item:* ${item.name} (${item.icon})
- *Quantity:* ${quantity} serving(s)
- *Customizations:* ${customText || "Standard/No modifications"}
- *Price:* ₹${item.price} each (Total: ₹${overallPrice})
- *Store Outlet:*FresCo HealthCraft Amanora Urban Plaza, Hadapsar, Pune
=============================
Please confirm my order and share payment details. Thank you!`;

    const encodedText = encodeURIComponent(orderMsg);
    window.open(`https://wa.me/918983363146?text=${encodedText}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#1A1A1A]/10 z-10 max-h-[90vh] flex flex-col"
          >
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#1A1A1A]/5 flex items-center justify-between bg-[#EFECE5]/40">
              <div className="flex items-center space-x-2.5">
                <span className="text-3xl select-none">{item.icon}</span>
                <div>
                  <h3 className="font-serif italic text-lg text-[#1A1A1A] leading-tight">
                    Customize {item.name}
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#38A325] mt-1">
                    Premium Healthy Choice
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#EFECE5] rounded-full text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content wrapper */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Product Slogan */}
              <div className="bg-[#F9F8F4] p-4 rounded-2xl text-xs text-[#1A1A1A]/70 leading-relaxed border border-[#1A1A1A]/5">
                <p className="font-bold text-[#1A1A1A]">Ingredients &amp; Taste:</p>
                <p className="mt-1 font-normal text-[#1A1A1A]/60">{item.description}</p>
              </div>

              {/* 1. Sugar Level / Sweetness Choice */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">
                  Step 1: Choose Sweetener Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(sugarPrices).map((sugar) => {
                    const price = sugarPrices[sugar];
                    const isSelected = sugarCustom === sugar;
                    return (
                      <button
                        key={sugar}
                        onClick={() => setSugarCustom(sugar)}
                        className={`p-3.5 rounded-2xl text-left text-xs border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-[#38A325] bg-[#38A325]/10 ring-0"
                            : "border-[#1A1A1A]/5 bg-white hover:bg-[#F9F8F4]"
                        }`}
                      >
                        <span className={`font-bold ${isSelected ? "text-[#38A325]" : "text-[#1A1A1A]"}`}>
                          {sugar}
                        </span>
                        <span className="text-[9px] font-bold text-[#1A1A1A]/40 uppercase mt-1 tracking-wider">
                          {price === 0 ? "Free / Default" : `+ ₹${price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Healthy Mix-ins / Add-ons Checklist */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">
                  Step 2: Add Healthy Boosters / Superfoods
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 border border-transparent">
                  {Object.keys(addOnPrices).map((addon) => {
                    const price = addOnPrices[addon];
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <div
                        onClick={() => handleAddonClick(addon)}
                        key={addon}
                        className={`p-3.5 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? "border-[#38A325] bg-[#38A325]/5"
                            : "border-[#1A1A1A]/5 bg-white hover:bg-[#F9F8F4]"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="h-4 w-4 rounded-md border-[#1A1A1A]/10 text-[#38A325] focus:ring-[#38A325] cursor-pointer"
                          />
                          <span className="font-bold text-[#1A1A1A]">{addon}</span>
                        </div>
                        <span className="font-mono font-bold text-[#38A325]">
                          + ₹{price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Pune Store Location Assistance (Amanora Plaza outlet) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/80">
                  Step 3: Outlet Store Location
                </label>
                <div className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl bg-[#EFECE5]/30 text-[#1A1A1A]/85 font-medium">
                  📍 FresCo HealthCraft, Amanora Urban Plaza, Hadapsar, Pune
                </div>
              </div>

              {/* 4. Custom instructions text area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A1A1A]/60">
                  Special Instructions or Allergies? (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please make it extra cold, no ice, add extra ginger..."
                  rows={2}
                  className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#38A325] focus:border-[#38A325] placeholder:text-gray-400"
                />
              </div>

              {/* 5. Quantity selector details */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/85">Assign Quantity</span>
                <div className="flex items-center space-x-3 bg-[#F9F8F4] p-1.5 rounded-full border border-[#1A1A1A]/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#1A1A1A]/60 hover:text-[#38A325] hover:bg-white rounded-full transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-xs font-extrabold text-[#1A1A1A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#1A1A1A]/60 hover:text-[#38A325] hover:bg-white rounded-full transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Bottom Pricing & CTAs bar */}
            <div className="p-5 border-t border-[#1A1A1A]/5 bg-[#F9F8F4] flex flex-col gap-3">
              
              {/* Computed Price layout breakdown */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest">Estimated Total</p>
                  <p className="text-xs text-[#1A1A1A]/60">
                    ₹{singleItemCustomizedPrice} x {quantity} drink(s)
                  </p>
                </div>
                <span className="text-3xl font-serif italic text-[#38A325]">
                  ₹{overallPrice}
                </span>
              </div>

              {/* Action Buttons grids */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                
                {/* Standard Add to general checkouting cart */}
                <button
                  type="button"
                  onClick={handleConfirmAddToCart}
                  className="bg-white hover:bg-[#EFECE5] text-[#1A1A1A] border border-[#1A1A1A]/10 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-1 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 mr-0.5" />
                  <span>Add to Cart</span>
                </button>

                {/* Instant WhatsApp Order button matching design with SVG */}
                <button
                  type="button"
                  onClick={handleDirectWhatsAppOrder}
                  className="bg-[#1A1A1A] hover:bg-[#38A325] text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest cursor-pointer flex items-center justify-center space-x-1.5 transition-colors"
                >
                  {/* Custom WhatsApp Icon Path */}
                  <svg
                    className="w-4 h-4 fill-current mr-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                  </svg>
                  <span>Order Now</span>
                </button>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

