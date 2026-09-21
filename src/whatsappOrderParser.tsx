import { Order, CartItem } from "../types";

export interface ParsedWhatsAppItem {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image?: string;
  icon?: string;
  isWeeklyCustomPlan?: boolean;
  customSchedule?: string[];
  customIngredients?: string[];
}

export interface ParsedWhatsAppOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  preferredDelivery: string;
  items: ParsedWhatsAppItem[];
  subtotal: number;
  discountValue: number;
  deliveryFee: string | number;
  totalPayable: number;
  paymentMode: string;
  rawText?: string;
  timestamp: string;
}

export function convertOrderToParsed(order: any): ParsedWhatsAppOrder {
  const items: ParsedWhatsAppItem[] = (order.items || []).map((it: any) => {
    const isCustom = 
      Boolean(it.isCustomRecipe) ||
      (it.menuItem?.name || it.name || "").toLowerCase().includes("custom") ||
      Boolean(it.customSchedule?.length);

    let resolvedSchedule: string[] | undefined = it.customSchedule;
    if (!resolvedSchedule && it.menuItem?.customSchedule) {
      resolvedSchedule = it.menuItem.customSchedule;
    }
    if (!resolvedSchedule && it.menuItem?.description) {
      const rawLines = it.menuItem.description.split("\n").map((l: string) => l.replace(/^[•\-\*\s]+/, "").trim()).filter(Boolean);
      const dayLines = rawLines.filter((l: string) => /(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Day\s*\d+)\s*[:\-]/i.test(l));
      if (dayLines.length > 0) {
        resolvedSchedule = dayLines;
      }
    }
    if (!resolvedSchedule && (it.menuItem?.name || it.name || "").toLowerCase().includes("custom")) {
      const isMonthly = (it.menuItem?.name || it.name || "").toLowerCase().includes("monthly");
      const key = isMonthly ? "fresco_custom_schedule_monthly" : "fresco_custom_schedule_weekly";
      const stored = localStorage.getItem(key) || localStorage.getItem("fresco_last_custom_schedule");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            resolvedSchedule = parsed;
          }
        } catch {}
      }
    }

    return {
      name: it.menuItem?.name || it.name || "Healthy Item",
      quantity: it.quantity || 1,
      price: it.finalPrice || it.price || it.menuItem?.price || 0,
      totalPrice: (it.finalPrice || it.price || it.menuItem?.price || 0) * (it.quantity || 1),
      image: it.menuItem?.image || it.image,
      icon: it.menuItem?.icon || it.icon || "🥤",
      isWeeklyCustomPlan: isCustom,
      customSchedule: resolvedSchedule,
      customIngredients: it.customIngredients,
    };
  });

  const deliveryFee = order.deliveryCharge === 0 || order.deliveryFee === 0 || order.deliveryFee === "FREE" ? "FREE" : (order.deliveryFee || order.deliveryCharge || 0);

  return {
    id: order.id || `FCD_${Date.now()}`,
    customerName: order.customerName || "Customer",
    phone: order.phone || "",
    address: order.address || "",
    preferredDelivery: order.preferredDelivery || (order.deliveryDate ? `${order.deliveryDate} @ ${order.deliveryTime || ""}` : "Standard Delivery"),
    items,
    subtotal: order.totalBeforePromo || order.subtotal || 0,
    discountValue: order.discountValue || 0,
    deliveryFee,
    totalPayable: order.payableAmount || order.totalPayable || 0,
    paymentMode: order.paymentMode || "Pay on Delivery (Cash / UPI scan)",
    rawText: order.rawText,
    timestamp: order.timestamp || new Date().toLocaleString("en-IN"),
  };
}

export function parseWhatsAppOrderText(text: string): ParsedWhatsAppOrder | null {
  try {
    if (!text || !text.trim()) return null;

    const getMatch = (regex: RegExp) => {
      const m = text.match(regex);
      return m ? m[1].trim() : "";
    };

    const customerName = getMatch(/\*Customer Name:\*\s*([^\n\r]+)/i) || "Valued Customer";
    const phone = getMatch(/\*Phone \/ WhatsApp:\*\s*([^\n\r]+)/i) || "";
    const address = getMatch(/\*Delivery Address:\*\s*([^\n\r]+)/i) || "";
    const preferredDelivery = getMatch(/\*Preferred Delivery:\*\s*([^\n\r]+)/i) || "Standard Delivery";

    const items: ParsedWhatsAppItem[] = [];
    // Match lines like: 1. *Item Name* x 2 - ₹500
    const itemRegex = /(\d+)\.\s*\*([^*]+)\*\s*x\s*(\d+)\s*-\s*₹\s*(\d+)/g;
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
      items.push({
        name: match[2].trim(),
        quantity: parseInt(match[3], 10) || 1,
        price: Math.round((parseInt(match[4], 10) || 0) / (parseInt(match[3], 10) || 1)),
        totalPrice: parseInt(match[4], 10) || 0,
        icon: "🥤",
      });
    }

    const subtotalStr = getMatch(/\*Subtotal Amount:\*\s*₹\s*(\d+)/i);
    const subtotal = subtotalStr ? parseInt(subtotalStr, 10) : items.reduce((s, i) => s + i.totalPrice, 0);

    const totalStr = getMatch(/\*Total Payable Amount:\*\s*\*?₹?\s*(\d+)\*?/i);
    const totalPayable = totalStr ? parseInt(totalStr, 10) : subtotal;

    const deliveryFeeMatch = getMatch(/\*Delivery Fees:\*\s*([^\n\r]+)/i);
    const deliveryFee = deliveryFeeMatch.toUpperCase().includes("FREE") ? "FREE" : (parseInt(deliveryFeeMatch.replace(/[^\d]/g, ""), 10) || "FREE");

    const paymentMode = getMatch(/\*Payment Mode:\*\s*([^\n\r]+)/i) || "Pay on Delivery";

    return {
      id: `WA_${Date.now()}`,
      customerName,
      phone,
      address,
      preferredDelivery,
      items,
      subtotal,
      discountValue: 0,
      deliveryFee,
      totalPayable,
      paymentMode,
      rawText: text,
      timestamp: new Date().toLocaleString("en-IN"),
    };
  } catch (err) {
    console.error("Error parsing WhatsApp order text:", err);
    return null;
  }
}
