import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
  import { MenuItem, CartItem } from "../types";
  import { MENU_ITEMS } from "../data";
  import { Leaf, Calendar, Sparkles, CheckCircle2, ChevronRight, Gift, Trophy, ShieldAlert, Sliders, Clock, Settings, Pause, Play, RefreshCw, AlertCircle, Trash2, Plus, ChevronDown, Check, MessageSquare, ShieldCheck, Truck } from "lucide-react";

  // @ts-ignore
  import DetoxBodyImg from "../assets/images/Detox-Body.png";
  // @ts-ignore
  import SproutsBowlImg from "../assets/images/Sprouts-Bowl.png";
  // @ts-ignore
  import ImmunityBoosterImg from "../assets/images/Immunity-Booster.png";
  // @ts-ignore
  import ClassicDelightCupImg from "../assets/images/Classic-Delight-Cup.png";
  // @ts-ignore
  import VitalEnergyDrinkImg from "../assets/images/Vital-Energy-Drink.png";
  // @ts-ignore
  import ProteinPowerCupImg from "../assets/images/Protein-Cup.png";
  // @ts-ignore
  import SkinGlowUpImg from "../assets/images/Skin-Glow-up.png";
  // @ts-ignore
  import ExoticDelightCupImg from "../assets/images/Exotic-Delight-Cup.png";
  // @ts-ignore
  import FatBurnerImg from "../assets/images/Fat-Burner.png";
  // @ts-ignore
  import PaneerSproutsBowlImg from "../assets/images/Paneer-Sprouts-Bowl.png";
  // @ts-ignore
  import ABCDriknImg from "../assets/images/ABC-Drink.png";
  // @ts-ignore
  import EnergyBoostShakeImg from "../assets/images/Energy-Boost-Shake.png";

  // @ts-ignore
  import chickenPowerBowlImg from "../assets/images/Chicken-Power-Bowl.png";

  // @ts-ignore
  import OrangeJuiceImg from "../assets/images/Orange-Juice.png";
  // @ts-ignore
  import PineappleJuiceImg from "../assets/images/Pineapple-Juice.png";
  // @ts-ignore
  import MosambiJuiceImg from "../assets/images/Mosambi_Juice.png";
  // @ts-ignore
  import AppleJuiceImg from "../assets/images/Apple-Juice.png";
  // @ts-ignore
  import PapayaJuiceImg from "../assets/images/Papaya-Juice.png";
  // @ts-ignore
  import PomegranateJuiceImg from "../assets/images/Pomegranate-Juice.png";

  // @ts-ignore
  import GutResetImg from "../assets/images/Gut-Reset.png";

  interface SubscriptionSectionProps {
    onAddToCartDirectly: (item: MenuItem) => void;
    onAddBulkToCartDirectly: (items: MenuItem[]) => void;
  }

  const JUICE_OPTIONS = MENU_ITEMS.filter(item =>
    ["Fruit Juices", "Green Vitality Juice", "Fresco Power Juices", "Shakes"].includes(item.category)
  ).map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    icon: item.icon || "🥤",
    image: item.image,
    desc: item.description
  }));

  const SNACK_OPTIONS = MENU_ITEMS.filter(item =>
      ["Power Cups", "High Protein Meals", "Super Food Sprouts Bowls", "Specials"].includes(item.category)
    ).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      icon: item.icon || "🥗",
      image: item.image,
      desc: item.description
    }));

  export default function SubscriptionSection({ onAddToCartDirectly, onAddBulkToCartDirectly }: SubscriptionSectionProps) {
    const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "custom" | null>("monthly");
    const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState<string | null>(null);
    const [showSubscriptionItems, setShowSubscriptionItems] = useState(true);

    const handleExploreToggle = () => {
      const nextState = !showSubscriptionItems;
      setShowSubscriptionItems(nextState);
      if (nextState) {
        setTimeout(() => {
          const element = document.getElementById("explore-plans-container");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    };

    const handleJumpToExplore = () => {
      const nextState = !showSubscriptionItems;
      setShowSubscriptionItems(nextState);
      if (nextState) {
        setTimeout(() => {
          const element = document.getElementById("explore-plans-container");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
      }
    };

    // Interactive Onboarding Profile Modal
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileForm, setProfileForm] = useState({
      name: "",
      phone: "",
      location: "Pune",
      address: ""
    });
    const [pendingPlan, setPendingPlan] = useState<any>(null);
    const [showTerminateConfirm, setShowTerminateConfirm] = useState(false);

    // Dynamic user subscription tracker (Weekly or Monthly) for real-time customer website interaction till new renewal
    const [activePlan, setActivePlan] = useState<{
      id: string;
      name: string;
      type: "weekly" | "monthly";
      price: number;
      startDate: string;
      renewalDate: string;
      deliveriesCompleted: number;
      totalDeliveries: number;
      status: "active" | "paused";
      customerName: string;
      customerPhone: string;
      customerLocation: string;
      customerAddress: string;
    } | null>(() => {
      const saved = localStorage.getItem("fresco_active_sub_v2");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") return parsed;
        } catch (e) {}
      }
      // By default, no subscription is selected, letting the user choose one
      return null;
    });

    const updateActivePlan = (newPlan: any) => {
      if (newPlan) {
        // Keep customer details consistent across switches or set defaults
        const mergedPlan = {
          customerName: newPlan.customerName || activePlan?.customerName || "",
          customerPhone: newPlan.customerPhone || activePlan?.customerPhone || "",
          customerLocation: newPlan.customerLocation || activePlan?.customerLocation || "",
          customerAddress: newPlan.customerAddress || activePlan?.customerAddress || "",
          ...newPlan
        };
        
        setActivePlan(mergedPlan);
        localStorage.setItem("fresco_active_sub_v2", JSON.stringify(mergedPlan));

        // Synchronize back to fresco_subscriptions list
        const subs = JSON.parse(localStorage.getItem("fresco_subscriptions") || "[]");
        const index = subs.findIndex((s: any) => s.id === mergedPlan.id || (s.customerPhone && s.customerPhone === mergedPlan.customerPhone && s.name === mergedPlan.name));
        if (index > -1) {
          subs[index] = { ...subs[index], ...mergedPlan };
        } else {
          subs.unshift(mergedPlan);
        }
        localStorage.setItem("fresco_subscriptions", JSON.stringify(subs));
      } else {
        const oldPlan = activePlan;
        setActivePlan(null);
        localStorage.removeItem("fresco_active_sub_v2");
        if (oldPlan) {
          const subs = JSON.parse(localStorage.getItem("fresco_subscriptions") || "[]");
          const filtered = subs.filter((s: any) => s.id !== oldPlan.id);
          localStorage.setItem("fresco_subscriptions", JSON.stringify(filtered));
        }
      }
      // Dispatch cross-tab storage event so active admin screen updates instantly
      window.dispatchEvent(new Event("storage"));
    };

    React.useEffect(() => {
      const handleStorageUpdate = () => {
        const saved = localStorage.getItem("fresco_active_sub_v2");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === "object") {
              setActivePlan(parsed);
            }
          } catch (e) {}
        } else {
          setActivePlan(null);
        }
      };
      window.addEventListener("storage", handleStorageUpdate);
      return () => {
        window.removeEventListener("storage", handleStorageUpdate);
      };
    }, []);

    const handleSaveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      if (!profileForm.name.trim() || !profileForm.phone.trim() || !profileForm.address.trim()) {
        alert("Please enter Name, Phone/WhatsApp, and Delivery Address to continue.");
        return;
      }

      const finalPlanDetails = {
        ...pendingPlan,
        customerName: profileForm.name.trim(),
        customerPhone: profileForm.phone.trim(),
        customerLocation: "Pune",
        customerAddress: profileForm.address.trim()
      };

      // Extract temporary checkout helpers
      const { bulkItems, singleItem, whatsappText, isWhatsApp, customWhatsAppTemplate, ...cleanPlan } = finalPlanDetails;

      // Set active plan!
      updateActivePlan(cleanPlan);

      // Add items directly to cart state
      if (bulkItems) {
        onAddBulkToCartDirectly(bulkItems);
      }
      if (singleItem) {
        onAddToCartDirectly(singleItem);
      }

      setShowProfileModal(false);
      setPendingPlan(null);

      // Show custom success screen with plan name
      setShowSubscriptionSuccess(cleanPlan.name);

      setTimeout(() => {
        let coreMessage = "";
        if (customWhatsAppTemplate) {
          coreMessage = customWhatsAppTemplate;
        } else if (whatsappText) {
          coreMessage = whatsappText;
        } else {
          coreMessage = `Hi! I want to subscribe to ${cleanPlan.name} (Price: ₹${cleanPlan.price}) on FresCo HealthrCaft. Please activate my cycle dispatch immediately!`;
        }

        const textWithUser = `*Hello FresCo HealthCraft! I'd like to place an order:* 🥤\n\n${coreMessage}\n\n*My Delivery Address Profile*:\n👤 Name: ${profileForm.name.trim()}\n📞 WhatsApp: ${profileForm.phone.trim()}\n🛵 Address: ${profileForm.address.trim()}\n\nPlease dispatch this subscription directly to my doorstep!`;
        const encodedText = encodeURIComponent(textWithUser);
        window.open(`https://wa.me/918983363146?text=${encodedText}`, "_blank");
        setShowSubscriptionSuccess(null);
      }, 1200);
    };

    // Selected daily customization options for Monday to Saturday (allowing multiple selection)
    const [customDays, setCustomDays] = useState<Record<string, { juiceIds: string[]; snackIds: string[] }>>({
      sub_monday: { juiceIds: [], snackIds: [] },
      sub_tuesday: { juiceIds: [], snackIds: [] },
      sub_wednesday: { juiceIds: [], snackIds: [] },
      sub_thursday: { juiceIds: [], snackIds: [] },
      sub_friday: { juiceIds: [], snackIds: [] },
      sub_saturday: { juiceIds: [], snackIds: [] },
    });

    const [customCycleType, setCustomCycleType] = useState<"weekly" | "monthly">("weekly");
    const [selectedCustomDay, setSelectedCustomDay] = useState<string>("sub_monday");

    const dayNames: Record<string, { label: string; icon: string; title: string }> = {
      sub_monday: { label: "Monday", icon: "🌱", title: "Detox Day" },
      sub_tuesday: { label: "Tuesday", icon: "🛡️", title: "Immunity Day" },
      sub_wednesday: { label: "Wednesday", icon: "⚡", title: "Energy Day" },
      sub_thursday: { label: "Thursday", icon: "✨", title: "Glow Day" },
      sub_friday: { label: "Friday", icon: "💪", title: "Fitness Day" },
      sub_saturday: { label: "Saturday", icon: "💧", title: "Refresh Day" },
    };

    interface WeeklyCyclePlanItem {
      id: string;
      name: string;
      icon: string;
      image1?: any;
      image2?: any;
      subtitle: string;
      tags?: string[];
      price: number;
      originalPrice?: number;
      bgColor: string;
      accentColor: string;
    }

    const getPlanDisplay = (name: string) => {
      const trimmed = name.trim();
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1];
        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        if (daysOfWeek.includes(lastPart.toLowerCase())) {
          return {
            day: lastPart.charAt(0).toUpperCase() + lastPart.slice(1).toLowerCase(),
            label: parts.slice(0, parts.length - 1).join(" ")
          };
        }
        const firstPart = parts[0];
        if (daysOfWeek.includes(firstPart.toLowerCase())) {
          return {
            day: firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase(),
            label: parts.slice(1).join(" ")
          };
        }
      }
      return {
        day: trimmed,
        label: ""
      };
    };

    const weeklyPlans: WeeklyCyclePlanItem[] = [
        {
        id: "sub_monday",
        name: "Detox Monday",
        icon: "🌱",
        image1: DetoxBodyImg,
        image2: SproutsBowlImg,
        subtitle: "Detox Body Drink + Sprouts Bowl",
        tags: ["Value Pack", "Immunity"],
        price: 178,
        bgColor: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981"
      },
      {
        id: "sub_tuesday",
        name: "Immunity Tuesday",
        icon: "🛡️",
        image1: ImmunityBoosterImg,
        image2: ClassicDelightCupImg,
        subtitle: "Immunity Booster Drink+ Classic Delight Cup",
        tags: ["Detox", "Full Day"],
        price: 178,
        bgColor: "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-800",
        accentColor: "#f59e0b"
      },
      {
        id: "sub_wednesday",
        name: "Energy Wednesday",
        icon: "⚡",
        image1: VitalEnergyDrinkImg,
        image2: ProteinPowerCupImg,
        subtitle: "Vital Energy Drink + Protein Packed Cup",
        tags: ["Detox", "Full Day"],
        price: 218,
        bgColor: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-800",
        accentColor: "#ef4444"
      },
      {
        id: "sub_thursday",
        name: "Glow Thursday",
        icon: "✨",
        image1: SkinGlowUpImg,
        image2: ExoticDelightCupImg,
        subtitle: "Skin Glow-up Drink + Exotic Delight Cup",
        tags: ["Detox", "Full Day"],
        price: 198,
        bgColor: "bg-fuchsia-100/40 hover:bg-fuchsia-100/70 border-fuchsia-400/10 hover:border-fuchsia-400/30 text-fuchsia-800",
        accentColor: "#d946ef"
      },
      {
        id: "sub_friday",
        name: "Fitness Friday",
        icon: "💪",
        image1: FatBurnerImg,
        image2: PaneerSproutsBowlImg,
        subtitle: "Fat Burner Drink + 30G Protein Paneer Bowl",
        tags: ["Active High", "Low Carb"],
        price: 198,
        bgColor: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 hover:border-blue-500/30 text-blue-800",
        accentColor: "#3b82f6"
      },
      {
        id: "sub_saturday",
        name: "Refresh Saturday",
        icon: "💧",
        image1: ABCDriknImg,
        image2: EnergyBoostShakeImg,
        subtitle: "ABC Drink + Energy Boost Shake",
        tags: ["Weekend Prep", "Hydration"],
        price: 238,
        bgColor: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6"
      }
    ];

    const fruitJuicePlans: WeeklyCyclePlanItem[] = [
      {
        id: "sub_fj_monday",
        name: "Orange monday",
        icon: "🍊",
        image1: OrangeJuiceImg,
        image2: OrangeJuiceImg,
        subtitle: "Fresh Sweet Orange Juice",
        price: 79,
        bgColor: "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-800",
        accentColor: "#f59e0b"
      },

      {
        id: "sub_fj_tuesday",
        name: "Pineapple Tuesday",
        icon: "🍍",
        image1: PineappleJuiceImg,
        image2: PineappleJuiceImg,
        subtitle: "Bromelain-Rich Refreshing Pineapple Juice",
        price: 69,
        bgColor: "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308"
      },
      {
        id: "sub_fj_wednesday",
        name: "Mosambi Wednesday",
        icon: "🍈 ",
        image1: MosambiJuiceImg,
        image2: MosambiJuiceImg,
        subtitle: "Sweet Lime Natural Immunity Extract",
        price: 69,
        bgColor: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981"
      },
      {
        id: "sub_fj_thursday",
        name: "Apple thursday",
        icon: "🍎",
        image1: AppleJuiceImg,
        image2: AppleJuiceImg,
        subtitle: "Provides hydration and essential nutrients.",
        price: 79,
        bgColor: "bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/10 hover:border-rose-500/30 text-rose-800",
        accentColor: "#f43f5e"
      },
      {
        id: "sub_fj_friday",
        name: "Papaya Friday",
        icon: "🍑",
        image1: PapayaJuiceImg,
        image2: PapayaJuiceImg,
        subtitle: "Rich in digestive enzymes and nutrients.",
        price: 69,
        bgColor: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6"
      },
      {
        id: "sub_fj_saturday",
        name: "Pomegranate Saturday",
        icon: "🍷",
        image1: PomegranateJuiceImg,
        image2: PomegranateJuiceImg,
        subtitle: "Rich in antioxidants, helping support heart health and overall wellness.",
        price: 149,
        bgColor: "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6"
      }
    ];

    const fatBurnPlans: WeeklyCyclePlanItem[] = [
      {
        id: "sub_fb_monday",
        name: "Fat Burn Monday",
        icon: "🔥",
        image1: FatBurnerImg,
        image2: chickenPowerBowlImg,
        subtitle: "Fat Burner Juice + 35g Protein Chicken Bowl",
        price: 198,
        bgColor: "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981"
      },
      {
        id: "sub_fb_tuesday",
        name: "Detox Tuesday",
        icon: "🌿",
        image1: DetoxBodyImg,
        image2: SproutsBowlImg,
        subtitle: "Detox Body Juice + Sprout Bowl",
        price: 178,
        bgColor: "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308"
      },
      {
        id: "sub_fb_wednesday",
        name: "Gut Reset Wednesday",
        icon: "🥒",
        image1: GutResetImg,
        image2: PaneerSproutsBowlImg,
        subtitle: "Gut Reset Juice + 30G Protein Paneer Bowl",
        price: 218,
        bgColor: "bg-green-500/5 hover:bg-green-500/10 border-green-500/10 hover:border-green-500/30 text-green-800",
        accentColor: "#22c55e"
      },
      {
        id: "sub_fb_thursday",
        name: "Fat Burn Thursday",
        icon: "🔥",
        image1: FatBurnerImg,
        image2: chickenPowerBowlImg,
        subtitle: "Fat Burner Juice + 35g Protein Chicken Bowl",
        price: 178,
        bgColor: "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10 hover:border-orange-500/30 text-orange-800",
        accentColor: "#f97316"
      },
      {
        id: "sub_fb_friday",
        name: "Detox Friday",
        icon: "🍃",
        image1: DetoxBodyImg,
        image2: SproutsBowlImg,
        subtitle: "Detox Body Juice + Sprout Bowl",
        price: 178,
        bgColor: "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308"      
      },
      {
        id: "sub_fb_saturday",
        name: "ABC Booster Saturday",
        icon: "❤️",
        image1: ABCDriknImg,
        image2: ProteinPowerCupImg,
        subtitle: "ABC Juice + Power Packed Cup",
        price: 218,
        bgColor: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-100",
        accentColor: "#ef4444"
      },
      {
        id: "sub_fb_sunday",
        name: "Gut Reset Sunday",
        icon: "🌱",
        image1: GutResetImg,
        image2: PaneerSproutsBowlImg,
        subtitle: "Gut Reset Juice + 30G Protein Paneer Bowl",
        price: 198,
        bgColor: "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-100",
        accentColor: "#ef4444"
      }
    ];

    const monthlySubscriptions = [
      {
        id: "month_green_taster",
        name: "Daily Fresh Wellness Plan",
        icon: "🌿",
        subtitle: "30 Days of Fresh Nutrition",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹518 off standard menu",
        price: 4222,
        benefits: [
          "🍹 30 Fresh Juices",
          "🥗 15 Sprouts Bowls + 15 Classic Delight Cups",
          "🌿 Supports Natural Detox",
          "💪 Rich in Vitamins & Minerals",
          "🚚 Free Delivery",
          "📱  WhatsApp Support"
        ],
        popular: false,
        bgColor: "bg-white",
        accentColor: "#38A325",
        whatsappText: "Hi! I want to subscribe to the Daily fresh plan (₹4222) on FresCo HealthCraft."
      },
      {
        id: "month_balanced_cleanse",
        name: "Protein Power Plan",
        icon: "💪",
        subtitle: "30 Days of Strength & Wellness",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹683 off standard menu",
        price: 8777,
        benefits: [
          "🥣 30 30G Protein Paneer Bowl",
          "🍓 26 Power Packed Cups",
          "🍍 Premium Fruit Cup Every Sunday",
          "⚡ High Protein & Fiber",
          "🚚 Priority Morning Delivery",
          "⏸  Pause Anytime",
          "📱  Priority WhatsApp Support",
          "💪 Rich in Omega-3, Vitamins, and Minerals",
          
        ],
        popular: true,
        bgColor: "bg-gradient-to-b from-white to-[#38A325]/5",
        accentColor: "#38A325",
        whatsappText: "Hi! I want to subscribe to the protein power plan (₹5799) on FresCo HealthCraft."
      },
      {
        id: "month_wellness_overhaul",
    name: "Ultimate Wellness Elite Plan",
        icon: "👑",
    subtitle: "Complete 30-Day Nutrition Journey",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹983 off standard retail menu",
        price: 7999 ,
        benefits: [
          "🍹 Daily Juice",
          "🥗 Daily Sprouts Bowl",
          "🍓 Daily Premium Fruit Cup",
          "💪 Weekly Power Packed Cup",
          "🥣 Weekly Paneer Bowl",
          "📱  WhatsApp Support",
          "🚚 Free Delivery",
          "⭐ Priority Order Handling",
          "📅 Pause or Reschedule Anytime"
        ],
        popular: false,
        bgColor: "bg-white",
        accentColor: "#F26419",
        whatsappText: "Hi! I want to subscribe to the full Ultimate Wellness Elite Plan (₹7481) on FresCo HealthCraft."
      }
    ];

    const handleAddWeeklyDay = (plan: typeof weeklyPlans[0]) => {
      // Map custom plan to a standard MenuItem object
      const menuItem: MenuItem = {
        id: plan.id,
        name: plan.name,
        category: "Detox & Wellness",
        price: plan.price,
        description: plan.subtitle,
        icon: plan.icon
      };
      onAddToCartDirectly(menuItem);
    };

    const promptRegistrationForPlan = (planData: any, options?: { bulkItems?: MenuItem[], singleItem?: MenuItem, isWhatsApp?: boolean, whatsappText?: string, customWhatsAppTemplate?: string }) => {
      setPendingPlan({
        ...planData,
        ...options
      });
      setProfileForm({
        name: activePlan?.customerName || "Enter your name",
        phone: activePlan?.customerPhone || "Contact Number",
        location: "Pune",
        address: activePlan?.customerAddress || "Enter Address"
      });
      setShowProfileModal(true);
    };

    const handleAddAllWeeklyDays = () => {
      const itemsToBulkAdd: MenuItem[] = weeklyPlans.map(plan => ({
        id: plan.id,
        name: plan.name,
        category: "Detox & Wellness",
        price: plan.price,
        description: plan.subtitle,
        icon: plan.icon
      }));
      promptRegistrationForPlan({
        id: "sub_weekly_nutrient",
        name: "FrsCo 6-Day Wellness Cycle",
        type: "weekly",
        price: 1199,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: 6,
        status: "active"
      }, { bulkItems: itemsToBulkAdd });
    };

    const handleAddFruitJuiceDay = (plan: typeof fruitJuicePlans[0]) => {
      const menuItem: MenuItem = {
        id: plan.id,
        name: plan.name,
        category: "Detox & Wellness",
        price: plan.price,
        description: plan.subtitle,
        icon: plan.icon
      };
      onAddToCartDirectly(menuItem);
    };

    const handleAddAllFruitJuiceDays = () => {
      const itemsToBulkAdd: MenuItem[] = fruitJuicePlans.map(plan => ({
        id: plan.id,
        name: plan.name,
        category: "Detox & Wellness",
        price: plan.price,
        description: plan.subtitle,
        icon: plan.icon
      }));
      promptRegistrationForPlan({
        id: "sub_weekly_fruit_juice",
        name: "weekly fruit juice",
        type: "weekly",
        price: 469,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: 6,
        status: "active"
      }, { bulkItems: itemsToBulkAdd });
    };

    const handleAddAllFatBurnDays = () => {
      const itemsToBulkAdd: MenuItem[] = fatBurnPlans.map(plan => ({
        id: plan.id,
        name: plan.name,
        category: "Detox & Wellness",
        price: plan.price,
        description: plan.subtitle,
        icon: plan.icon
      }));
      promptRegistrationForPlan({
        id: "sub_weekly_fat_burn",
        name: "7 days weight loss transformation",
        type: "weekly",
        price: 1666,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: 6,
        status: "active"
      }, { bulkItems: itemsToBulkAdd });
    };

    const handleMonthlySubscribe = (sub: typeof monthlySubscriptions[0]) => {
      promptRegistrationForPlan({
        id: sub.id,
        name: sub.name,
        type: "monthly",
        price: sub.price,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: 30,
        status: "active"
      }, { isWhatsApp: true, whatsappText: sub.whatsappText });
    };

    const calculateCustomSubtotal = () => {
      let subtotal = 0;
      Object.keys(customDays).forEach((dayId) => {
        const selections = customDays[dayId];
        if (selections.juiceIds) {
          selections.juiceIds.forEach(id => {
            const juice = JUICE_OPTIONS.find(j => j.id === id);
            if (juice) subtotal += juice.price;
          });
        }
        if (selections.snackIds) {
          selections.snackIds.forEach(id => {
            const snack = SNACK_OPTIONS.find(s => s.id === id);
            if (snack) subtotal += snack.price;
          });
        }
      });
      return customCycleType === "monthly" ? subtotal * 4 : subtotal;
    };

    const customDiscountPercentage = 8;
    const customSubtotal = calculateCustomSubtotal();
    const customSavings = Math.round(customSubtotal * (customDiscountPercentage / 100));
    const customFinalPrice = customSubtotal - customSavings;

    const handleAddCustomPlanToCart = () => {
      const scheduleSummary = Object.keys(customDays).map(dayId => {
        const dayLabel = dayNames[dayId].label;
        const selections = customDays[dayId];
        const juicesStr = JUICE_OPTIONS.filter(j => selections.juiceIds?.includes(j.id)).map(j => j.icon).join("");
        const snacksStr = SNACK_OPTIONS.filter(s => selections.snackIds?.includes(s.id)).map(s => s.icon).join("");
        return `${dayLabel}: ${juicesStr || "❌"} + ${snacksStr || "❌"}`;
      }).join(", ");

      const customMenuItem: MenuItem = {
        id: `custom_plan_${customCycleType}_${Date.now()}`,
        name: customCycleType === "monthly" ? "My Custom Monthly Plan" : "My Custom Weekly Plan",
        category: "Detox & Wellness",
        price: customFinalPrice,
        description: `Custom schedule (${customCycleType === "monthly" ? "24 deliveries" : "6 deliveries"}): ${scheduleSummary}`,
        icon: customCycleType === "monthly" ? "👑" : "✨"
      };

      promptRegistrationForPlan({
        id: `custom_plan_${customCycleType}`,
        name: customCycleType === "monthly" ? "My Custom Monthly Plan" : "My Custom Weekly Plan",
        type: customCycleType,
        price: customFinalPrice,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + (customCycleType === "monthly" ? 30 : 7) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: customCycleType === "monthly" ? 24 : 6,
        status: "active"
      }, { singleItem: customMenuItem });
    };

    const handleCustomWhatsAppSubscribe = () => {
      const scheduleDetails = Object.keys(customDays).map(dayId => {
        const day = dayNames[dayId].label;
        const selections = customDays[dayId];
        const juicesStr = JUICE_OPTIONS.filter(j => selections.juiceIds?.includes(j.id)).map(j => `${j.name} (${j.icon})`).join(" + ");
        const snacksStr = SNACK_OPTIONS.filter(s => selections.snackIds?.includes(s.id)).map(s => `${s.name} (${s.icon})`).join(" + ");
        return `- ${day}: ${juicesStr || "None"} + ${snacksStr || "None"}`;
      }).join("\n");

      const message = `Hi! I want to activate a Custom ${customCycleType === "monthly" ? "Monthly (24-Day)" : "Weekly (6-Day)"} Wellness Plan of ₹${customFinalPrice} on FresCo HealthrCaft.\n\nMy Custom Schedule:\n${scheduleDetails}\n\nSubtotal: ₹${customSubtotal}\nDiscount (${customDiscountPercentage}%): -₹${customSavings}\nTotal Payable: ₹${customFinalPrice}`;

      promptRegistrationForPlan({
        id: `custom_plan_${customCycleType}`,
        name: customCycleType === "monthly" ? "Custom Monthly Plan" : "Custom Weekly Plan",
        type: customCycleType,
        price: customFinalPrice,
        startDate: new Date().toISOString().split("T")[0],
        renewalDate: new Date(Date.now() + (customCycleType === "monthly" ? 30 : 7) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        deliveriesCompleted: 0,
        totalDeliveries: customCycleType === "monthly" ? 24 : 6,
        status: "active"
      }, { isWhatsApp: true, customWhatsAppTemplate: message });
    };

    const getTodayItemForPlan = (planId: string, customDayIndex?: number) => {
      const dayIndex = customDayIndex !== undefined ? customDayIndex : (activePlan ? activePlan.deliveriesCompleted : 0);
      const totalD = activePlan ? activePlan.totalDeliveries : 6;

      if (activePlan && dayIndex >= totalD) {
        return {
          juice: "Subscription Cycle Completed! 🎉",
          description: "All scheduled drops have been successfully completed and delivered to Pune. Thank you!",
          icon: "🌿"
        };
      }

      const daysArr = ["sub_monday", "sub_tuesday", "sub_wednesday", "sub_thursday", "sub_friday", "sub_saturday"];
      const targetDayKey = daysArr[dayIndex % 6];

      if (planId === "sub_weekly_nutrient") {
        const dayPlan = weeklyPlans.find(p => p.id === targetDayKey) || weeklyPlans[0];
        return { juice: dayPlan.name, description: dayPlan.subtitle, icon: dayPlan.icon };
      } else if (planId === "sub_weekly_fruit_juice") {
        const matchKey = targetDayKey.replace("sub_", "sub_fj_");
        const dayPlan = fruitJuicePlans.find(p => p.id === matchKey) || fruitJuicePlans[0];
        return { juice: dayPlan.name, description: dayPlan.subtitle, icon: dayPlan.icon };
      } else if (planId?.startsWith("custom_plan")) {
        const config = customDays[targetDayKey] || customDays["sub_monday"];
        const juices = JUICE_OPTIONS.filter(j => config.juiceIds?.includes(j.id));
        const snacks = SNACK_OPTIONS.filter(s => config.snackIds?.includes(s.id));
        const juiceNames = juices.map(j => j.name).join(", ") || "No juice selected";
        const snackNames = snacks.map(s => s.name).join(", ") || "No snack selected";
        const primaryIcon = juices[0]?.icon || "🥤";
        return {
          juice: juiceNames,
          description: `Custom Pairing: ${juiceNames} + ${snackNames}`,
          icon: primaryIcon
        };
      } else {
        if (planId?.includes("green_taster")) {
          return { juice: "Daily Fresh Fruit Juice", icon: "🥝", description: "Fresh organic juice + Daily Sprouts Bowl" };
        } else if (planId?.includes("balanced_cleanse")) {
          return { juice: "Daily Protein Cup", icon: "🥑", description: "Protein rich snack + Daily Organic Sprouts Bowl" };
        } else {
          const dayPlan = weeklyPlans.find(p => p.id === targetDayKey) || weeklyPlans[0];
          return { juice: dayPlan.name, icon: dayPlan.icon, description: `Wellness Overhaul Drop: ${dayPlan.subtitle}` };
        }
      }
    };

    const handleRenewSimulatedPlan = () => {
      if (!activePlan) return;
      const isMonthly = activePlan.type === "monthly";
      const addedDays = isMonthly ? 30 : 7;
      const nextRenewal = new Date(new Date(activePlan.renewalDate).getTime() + addedDays * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      
      updateActivePlan({
        ...activePlan,
        renewalDate: nextRenewal,
        deliveriesCompleted: 0,
        status: "active"
      });
      
      setShowSubscriptionSuccess(`Successfully Renewed ${activePlan.name}! Extended to ${nextRenewal}`);
      setTimeout(() => {
        setShowSubscriptionSuccess(null);
      }, 3000);
    };

    const handleTogglePausePlan = () => {
      if (!activePlan) return;
      const nextStatus = activePlan.status === "active" ? "paused" : "active";
      updateActivePlan({
        ...activePlan,
        status: nextStatus
      });
      setShowSubscriptionSuccess(`Subscription ${nextStatus === "active" ? "Resumed" : "Paused"}!`);
      setTimeout(() => {
        setShowSubscriptionSuccess(null);
      }, 2000);
    };

    const handleSendActivePlanWhatsApp = () => {
      if (!activePlan) return;
      
      if (!activePlan.customerName) {
        setPendingPlan(activePlan);
        setProfileForm({
          name: "",
          phone: "",
          location: "Pune",
          address: ""
        });
        setShowProfileModal(true);
        return;
      }

      const { name, type, price, customerName, customerPhone, customerAddress } = activePlan;
      const message = `*Hello FresCo HealthCraft! I'd like to place an order:* \n\nI just selected and activated this Subscription Plan on the website!\n\n📋 *Subscription Plan:* ${name}\n💳 *Billing Cycle:* ${type === "monthly" ? "Monthly" : "Weekly"}\n💰 *Price:* ₹${price}\n📍 *Status:* Active / Confirmed\n\n👤 *Subscriber Delivery Profile*:\n👤 Name: ${customerName}\n📞 WhatsApp: ${customerPhone}\n🛵 Address: ${customerAddress}\n\nPlease dispatch this subscription directly to my doorstep!`;

      const encodedText = encodeURIComponent(message);
      window.open(`https://wa.me/918983363146?text=${encodedText}`, "_blank");
    };

    const handleSimulatorDropdownSelect = (val: string) => {
      if (val === "none") {
        updateActivePlan(null);
        return;
      }

      let planData: any = null;
      if (val === "sub_weekly_nutrient") {
        planData = {
          id: "sub_weekly_nutrient",
          name: "Fresco 6-Day Wellness Cycle",
          type: "weekly",
          price: 1018,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active"
        };
      } else if (val === "sub_weekly_fruit_juice") {
        planData = {
          id: "sub_weekly_fruit_juice",
          name: "Weekly Fruit Juice",
          type: "weekly",
          price: 425,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active"
        };
      } else if (val === "month_green_taster") {
        planData = {
          id: "month_green_taster",
          name: "7-Days Weight Loss Transformation",
          type: "monthly",
          price: 4023,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 30,
          status: "active"
        };
      } else if (val === "month_balanced_cleanse") {
        planData = {
          id: "month_balanced_cleanse",
          name: "Daily Fresh Wellness Plan",
          type: "monthly",
          price: 6242,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 30,
          status: "active"
        };
      } else if (val === "month_wellness_overhaul") {
        planData = {
          id: "month_wellness_overhaul",
          name: "Protein Power Plan",
          type: "monthly",
          price: 7481,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 30,
          status: "active"
        };
      } else if (val === "custom_plan_custom") {
        planData = {
          id: "custom_plan_custom",
          name: "Ultimate Wellness Elite Plan",
          type: "weekly",
          price: 950,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          deliveriesCompleted: 1,
          totalDeliveries: 6,
          status: "active"
        };
      }

      if (!planData) return;

      // Prompt high-fidelity demo/real checkout modal so registration metadata triggers WhatsApp and registers in the admin portal
      promptRegistrationForPlan(planData);
    };
  
    return (
      <section id="subscriptions" className="pt-3.5 pb-3 bg-gradient-to-br from-white via-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10 relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#38A325]/5 rounded-full filter blur-3xl -z-10" />
        <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-[#F26419]/5 rounded-full filter blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Subscription Badge */}
          <div className="inline-flex items-center justify-center text-white bg-[#F26419] px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-xs">
            Wellness Subscriptions Plan's
          </div>

          {/* Dynamic Headings */}
          <p className="mt-2 mb-4 text-[#1A1A1A]/75 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Transform your daily wellness and save big with scheduled raw nourishment.
            <br />
            Freshly prepared and delivered daily to your doorstep.
          </p>

          <div id="explore-plans-container" className="scroll-mt-24">
            {/* Tabs for switching between Weekly and Monthly subscriptions (Matched to user visual references) */}
            <div className="mt-5 mb-6 flex justify-center">
            <div className="bg-[#EFECE5] p-1 rounded-3xl sm:rounded-full inline-flex flex-col sm:flex-row gap-1 border border-[#1A1A1A]/5 shadow-inner">
              <button
                onClick={() => setActiveTab("weekly")}
                className={`py-1.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  activeTab === "weekly"
                    ? "bg-[#38A325] text-white shadow-md font-extrabold"
                    : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Weekly Subscription Plan</span>
              </button>
              <button
                onClick={() => setActiveTab("monthly")}
                className={`py-1.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  activeTab === "monthly"
                    ? "bg-[#38A325] text-white shadow-md font-extrabold"
                    : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Monthly Subscription Plan</span>
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`py-1.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  activeTab === "custom"
                    ? "bg-[#38A325] text-white shadow-md font-extrabold"
                    : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize Your Plan</span>
                <span className="bg-[#F26419]/95 text-white text-[7px] font-black px-1.5 py-0.5 rounded ml-1 tracking-widest leading-none">BUILDER</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === null && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl mx-auto text-center py-16 px-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38A325]/10 text-[#38A325] mb-5 border border-[#38A325]/20 shadow-xs">
                  <Sparkles className="w-7 h-7 animate-pulse text-[#38A325]" />
                </div>
                <h3 className="font-serif italic text-lg sm:text-xl text-[#1A1A1A] font-extrabold tracking-tight">Choose Your Wellness Journey</h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/60 mt-2.5 max-w-sm mx-auto leading-relaxed font-sans font-medium">
                  Please select a subscription plan above to explore our Weekly, Monthly, or completely Customized wellness subscription cycles.
                </p>
              </motion.div>
            )}

            {activeTab === "weekly" && (
              <motion.div
                layout
                key="weekly"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 px-2"
              >
                {/* Card 1: Standard 6-Day Nutrient Cycle Schedule */}
                <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4.5 shadow-sm text-left flex flex-col justify-between h-full">
                  <div>
                    {/* Master Header */}
                    <div className="flex flex-row items-center justify-between border-b border-[#1A1A1A]/10 pb-2.5 mb-2.5 gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl select-none">🌱</span>
                        <div>
                          <h3 className="font-serif italic text-sm sm:text-base text-gray-900 font-bold leading-tight">
                            FresCo 6-Day Wellness Cycle
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-normal">
                            A curated Monday-to-Saturday breakfast routing with raw juices, fruit cups & sprout bowls.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Internal Days Layout - Unified elegant rows inside ONE card */}
                    <div className="divide-y divide-[#1A1A1A]/5">
                      {weeklyPlans.map((plan) => {
                        const { day, label } = getPlanDisplay(plan.name);
                        return (
                          <div
                            key={plan.id}
                            className="py-2 flex flex-row items-center justify-between gap-3 text-left transition-all hover:bg-neutral-50/70 px-1 sm:px-2 rounded-lg"
                          >
                            {/* Day indicator & title */}
                            <div className="flex items-center space-x-3 shrink-0 w-[125px] xs:w-[150px] sm:w-[170px]">
                              {/* Two overlapping images representing the combo, or one single centered image */}
                              <div className="relative w-11 h-11 sm:w-13 sm:h-13 shrink-0 select-none">
                                {plan.image1 && plan.image2 && plan.image1 !== plan.image2 ? (
                                  <>
                                    <div className="absolute top-0 left-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm z-10 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image1}
                                        alt="item 1"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow z-0 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image2}
                                        alt="item 2"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm flex items-center justify-center p-0.5 mx-auto">
                                    <img
                                      src={plan.image1}
                                      alt="item"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                {label ? (
                                  <>
                                    <span className="inline-block bg-[#38A325]/12 text-[#38A325] text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider leading-none">
                                      {day}
                                    </span>
                                    <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight mt-0.5">
                                      {label}
                                    </h4>
                                  </>
                                ) : (
                                  <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                                    {day}
                                  </h4>
                                )}
                              </div>
                            </div>

                            {/* Combo details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-650 text-xs sm:text-sm font-medium leading-normal">
                                {plan.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bulk Add Action Button Container */}
                  <div className="border-t border-[#1A1A1A]/10 pt-3 mt-3 flex items-center justify-between gap-3">
                    <div className="text-left font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block leading-none">Combo Price</span>
                      <div className="flex items-baseline space-x-1.5 mt-1">
                        <span className="text-sm sm:text-lg font-extrabold text-[#38A325] leading-none">₹1199</span>
                        <span className="text-[13px] text-gray-400 line-through leading-none font-medium">₹1308</span>
                      </div>
                    </div>
                    <button
                      onClick={handleAddAllWeeklyDays}
                      className="bg-[#38A325] hover:bg-[#2F891F] active:scale-95 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 shadow-xs hover:shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Subscribe Now</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Weekly Fruit Juice */}
                <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4.5 shadow-sm text-left flex flex-col justify-between h-full">
                  <div>
                    {/* Master Header */}
                    <div className="flex flex-row items-center justify-between border-b border-[#1A1A1A]/10 pb-2.5 mb-2.5 gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl select-none">🍹</span>
                        <div>
                          <h3 className="font-serif italic text-sm sm:text-base text-gray-900 font-bold leading-tight">
                            Weekly Fruit Juice
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-normal">
                            A curated Monday-to-Saturday pure organic fresh juices.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Internal Days Layout - Pure juices elegant rows */}
                    <div className="divide-y divide-[#1A1A1A]/5">
                      {fruitJuicePlans.map((plan) => {
                        const { day, label } = getPlanDisplay(plan.name);
                        return (
                          <div
                            key={plan.id}
                            className="py-2 flex flex-row items-center justify-between gap-3 text-left transition-all hover:bg-neutral-50/70 px-1 sm:px-2 rounded-lg"
                          >
                            {/* Day indicator & title */}
                            <div className="flex items-center space-x-3 shrink-0 w-[125px] xs:w-[150px] sm:w-[170px]">
                              {/* Two overlapping images representing the combo, or one single centered image */}
                              <div className="relative w-11 h-11 sm:w-13 sm:h-13 shrink-0 select-none">
                                {plan.image1 && plan.image2 && plan.image1 !== plan.image2 ? (
                                  <>
                                    <div className="absolute top-0 left-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm z-10 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image1}
                                        alt="item 1"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow z-0 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image2}
                                        alt="item 2"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm flex items-center justify-center p-0.5 mx-auto">
                                    <img
                                      src={plan.image1}
                                      alt="item"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                {label ? (
                                  <>
                                    <span className="inline-block bg-[#38A325]/12 text-[#38A325] text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider leading-none">
                                      {day}
                                    </span>
                                    <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight mt-0.5">
                                      {label}
                                    </h4>
                                  </>
                                ) : (
                                  <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                                    {day}
                                  </h4>
                                )}
                              </div>
                            </div>

                            {/* Combo details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-650 text-xs sm:text-sm font-medium leading-normal">
                                {plan.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bulk Add Action Button Container */}
                  <div className="border-t border-[#1A1A1A]/10 pt-3 mt-3 flex items-center justify-between gap-3">
                    <div className="text-left font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block leading-none">Combo Price</span>
                      <div className="flex items-baseline space-x-1.5 mt-1">
                        <span className="text-sm sm:text-lg font-extrabold text-[#38A325] leading-none">₹469</span>
                        <span className="text-[13px] text-gray-400 line-through leading-none font-medium">₹514</span>
                      </div>
                    </div>
                    <button
                      onClick={handleAddAllFruitJuiceDays}
                      className="bg-[#38A325] hover:bg-[#2F891F] active:scale-95 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 shadow-xs hover:shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Subscribe Now</span>
                    </button>
                  </div>
                </div>

                {/* Card 3: Weekly Fat Burn */}
                <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 sm:p-4.5 shadow-sm text-left flex flex-col justify-between h-full">
                  <div>
                    {/* Master Header */}
                    <div className="flex flex-row items-center justify-between border-b border-[#1A1A1A]/10 pb-2.5 mb-2.5 gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl select-none">🔥</span>
                        <div>
                          <h3 className="font-serif italic text-sm sm:text-base text-gray-900 font-bold leading-tight">
                            7-Days Weight Loss Transformation
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-normal">
                            Scientifically curated juice & protein bowl plan to support healthy weight management.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Internal Days Layout - Fat burn elegant rows */}
                    <div className="divide-y divide-[#1A1A1A]/5">
                      {fatBurnPlans.map((plan) => {
                        const { day, label } = getPlanDisplay(plan.name);
                        return (
                          <div
                            key={plan.id}
                            className="py-2 flex flex-row items-center justify-between gap-3 text-left transition-all hover:bg-neutral-50/70 px-1 sm:px-2 rounded-lg"
                          >
                            {/* Day indicator & title */}
                            <div className="flex items-center space-x-3 shrink-0 w-[125px] xs:w-[150px] sm:w-[170px]">
                              {/* Two overlapping images representing the combo, or one single centered image */}
                              <div className="relative w-11 h-11 sm:w-13 sm:h-13 shrink-0 select-none">
                                {plan.image1 && plan.image2 && plan.image1 !== plan.image2 ? (
                                  <>
                                    <div className="absolute top-0 left-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm z-10 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image1}
                                        alt="item 1"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden bg-white border border-neutral-100 shadow z-0 flex items-center justify-center p-0.5">
                                      <img
                                        src={plan.image2}
                                        alt="item 2"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-neutral-100 shadow-sm flex items-center justify-center p-0.5 mx-auto">
                                    <img
                                      src={plan.image1}
                                      alt="item"
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                {label ? (
                                  <>
                                    <span className="inline-block bg-[#38A325]/12 text-[#38A325] text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider leading-none">
                                      {day}
                                    </span>
                                    <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight mt-0.5">
                                      {label}
                                    </h4>
                                  </>
                                ) : (
                                  <h4 className="font-sans text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                                    {day}
                                  </h4>
                                )}
                              </div>
                            </div>

                            {/* Combo details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-650 text-xs sm:text-sm font-medium leading-normal">
                                {plan.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bulk Add Action Button Container */}
                  <div className="border-t border-[#1A1A1A]/10 pt-3 mt-3 flex items-center justify-between gap-3">
                    <div className="text-left font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block leading-none">Combo Price</span>
                      <div className="flex items-baseline space-x-1.5 mt-1">
                        <span className="text-sm sm:text-lg font-extrabold text-[#38A325] leading-none">₹1666</span>
                        <span className="text-[13px] text-gray-400 line-through leading-none font-medium">₹1806</span>
                      </div>
                    </div>
                    <button
                      onClick={handleAddAllFatBurnDays}
                      className="bg-[#38A325] hover:bg-[#2F891F] active:scale-95 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-300 shadow-xs hover:shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Subscribe Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "monthly" && (
              <motion.div
                layout
                key="monthly"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Monthly Packages layout with highlights and custom benefits checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-5xl mx-auto text-left">
                  {monthlySubscriptions.map((sub) => (
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      key={sub.id}
                      className={`rounded-xl p-3 sm:p-3.5 border hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative ${sub.bgColor} ${
                        sub.popular 
                          ? "border-[#38A325] shadow-md ring-2 ring-[#38A325]/10" 
                          : "border-[#1A1A1A]/10 shadow-sm"
                      }`}
                    >
                      {/* Popular Badge recommendation */}
                      {sub.popular && (
                        <span className="absolute -top-2 right-3 bg-[#38A325] text-white text-[7px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                          Best Seller
                        </span>
                      )}

                      <div>
                        {/* Icon & Title */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg sm:text-xl select-none shrink-0">{sub.icon}</span>
                          <div>
                            <h3 className="font-bold text-[12px] sm:text-sm text-[#1A1A1A] leading-tight">
                              {sub.name}
                            </h3>
                            <p className="text-[8px] sm:text-[9.2px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                              {sub.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Display pricing details */}
                        <div className="mt-2 p-2 bg-[#EFECE5]/35 rounded-lg border border-[#1A1A1A]/5 text-center">
                          <span className="text-[8px] text-gray-400 block font-mono leading-none">Monthly Subscription Fee</span>
                          <div className="flex items-baseline justify-center space-x-0.5 mt-0.5">
                            <span className="text-base sm:text-lg font-sans font-extrabold text-[#1A1A1A]">₹{sub.price}</span>
                            <span className="text-[8.5px] text-gray-500">/ month</span>
                          </div>
                          <span className="text-[7.5px] font-bold text-[#38A325] bg-[#38A325]/10 px-2.5 py-0.5 rounded-full inline-block mt-0.5 leading-none">
                            {sub.savings}
                          </span>
                        </div>

                        {/* Details block */}
                        <div className="mt-2.5 space-y-2 font-medium text-[9px] sm:text-[10px] text-gray-600">
                          <p className="font-bold text-[7.5px] uppercase text-[#1A1A1A]/40 tracking-wider">
                            Deliveries frequency:
                          </p>
                          <p className="text-[#1A1A1A] font-bold flex items-center gap-1 bg-[#38A325]/5 py-1 px-2.5 rounded-md border border-[#38A325]/15 text-[9px]">
                            <Calendar className="w-3 h-3 text-[#38A325]" />
                            <span>{sub.deliveries}</span>
                          </p>
                          
                          <p className="font-bold text-[7.5px] uppercase text-[#1A1A1A]/40 tracking-wider pt-0.5">
                            Exclusive Benefits:
                          </p>
                          <ul className="space-y-1 text-[8.5px] sm:text-[9.5px]">
                            {sub.benefits.map((b, i) => (
                              <li key={i} className="flex items-start text-[#1A1A1A]/85">
                                <span className="leading-tight">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Subscription verification activator trigger button */}
                      <div className="mt-3 pt-2 border-t border-[#1A1A1A]/5">
                        <button
                          onClick={() => handleMonthlySubscribe(sub)}
                          className={`w-full py-1.5 sm:py-2 rounded-lg font-bold text-[8.5px] sm:text-[9px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-1 shadow-sm ${
                            sub.popular
                              ? "bg-[#38A325] hover:bg-[#38A325]/95 text-white"
                              : "bg-[#1A1A1A] hover:bg-[#38A325] text-white"
                          }`}
                        >
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                          </svg>
                          <span>Activate via WhatsApp</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "custom" && (
              <motion.div
                layout
                key="custom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Description Alert Card */}
                <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-4 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-amber-500/5 border border-emerald-500/20 rounded-2xl text-left gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-0.5">🎨</span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm uppercase tracking-widest text-[#38A325]">
                        Fresco Dynamic Custom Builder
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-605 mt-1 leading-relaxed">
                        Build your ultimate personalized Monday-to-Saturday healthy breakfast & juice combo schedule. Choose the perfect daily match for your personal fitness goal!
                      </p>
                    </div>
                  </div>
                  
                </div>

                {/* Main custom plan workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-5xl mx-auto text-left">
                  
                  {/* 1. Day List Selector (Column span 3) */}
                  <div className="lg:col-span-3 space-y-2">
                    <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Select Day to Customize</p>
                    <div className="flex flex-row overflow-x-auto lg:flex-col gap-1.5 pb-2 lg:pb-0 scrollbar-none w-full">
                      {Object.keys(dayNames).map((dayId) => {
                        const isSelected = selectedCustomDay === dayId;
                        const config = customDays[dayId] || { juiceIds: [], snackIds: [] };
                        const selectedJuices = JUICE_OPTIONS.filter(j => config.juiceIds?.includes(j.id));
                        const selectedSnacks = SNACK_OPTIONS.filter(s => config.snackIds?.includes(s.id));

                        const juicesDisplay = selectedJuices.length > 0 
                          ? `${selectedJuices.map(j => j.icon).join("")} ${selectedJuices.map(j => j.name.replace(" Juice", "").replace(" Shake", "").replace(" Drink", "")).join(", ")}`
                          : "❌ No drinks selected";
                        const snacksDisplay = selectedSnacks.length > 0 
                          ? `${selectedSnacks.map(s => s.icon).join("")} ${selectedSnacks.map(s => s.name.replace(" Sprouts Bowl", "").replace(" Platter", "")).join(", ")}`
                          : "❌ No snack selected";
                        
                        return (
                          <button
                            key={dayId}
                            onClick={() => setSelectedCustomDay(dayId)}
                            className={`w-36 lg:w-full text-left p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
                              isSelected
                                ? "bg-[#38A325]/10 border-[#38A325] shadow-xs"
                                : "bg-white border-[#1A1A1A]/10 hover:border-[#38A325]/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[11px] text-gray-900 flex items-center gap-1">
                                <span>{dayNames[dayId].icon}</span>
                                <span>{dayNames[dayId].label}</span>
                              </span>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#38A325]" />}
                            </div>
                            <div className="mt-0.5 text-[8.5px] text-gray-500 whitespace-normal break-words leading-tight">
                              {juicesDisplay}
                            </div>
                            <div className="text-[8.5px] text-gray-400 whitespace-normal break-words mt-0.5 leading-tight">
                              + {snacksDisplay}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Options selector panel (Column span 6) */}
                  <div className="lg:col-span-6 space-y-3 bg-white border border-[#1A1A1A]/10 rounded-xl p-3.5 shadow-xs">
                    <div>
                      <span className="bg-[#38A325]/10 text-[#38A325] text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                        Active Configuration
                      </span>
                      <h3 className="font-serif italic text-base text-gray-900 mt-0.5 font-semibold flex items-center gap-1">
                        <span>{dayNames[selectedCustomDay].icon}</span>
                        <span> {dayNames[selectedCustomDay].label}'s Match</span>
                      </h3>
                    </div>

                    {/* Option A: Fresh Juices */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#1A1A1A] flex items-center justify-between">
                        <span>1. Choose fresh Juice/Drink</span>
                        <span className="text-[9px] text-[#38A325] font-bold">Select Multiple</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {JUICE_OPTIONS.map((j) => {
                          const isActive = customDays[selectedCustomDay]?.juiceIds?.includes(j.id);
                          return (
                            <div
                              key={j.id}
                              onClick={() => setCustomDays(prev => {
                                const currentIds = prev[selectedCustomDay]?.juiceIds || [];
                                const newIds = currentIds.includes(j.id)
                                  ? currentIds.filter(id => id !== j.id)
                                  : [...currentIds, j.id];
                                return {
                                  ...prev,
                                  [selectedCustomDay]: { ...prev[selectedCustomDay], juiceIds: newIds }
                                };
                              })}
                              className={`p-1.5 px-2 rounded-lg border text-left cursor-pointer transition-all flex items-center space-x-2 relative ${
                                isActive
                                  ? "border-[#38A325] bg-[#38A325]/5 shadow-xs"
                                  : "border-gray-200 hover:border-gray-400 bg-white"
                              }`}
                            >
                              {j.image ? (
                                <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-white border border-neutral-100/60 flex-shrink-0 flex items-center justify-center p-0.5 shadow-xs">
                                  <img
                                    src={j.image}
                                    alt={j.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                </div>
                              ) : (
                                <span className="text-base select-none mt-0.5">{j.icon}</span>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-[10px] text-gray-900 block whitespace-normal break-words leading-tight">{j.name}</span>
                                <span className="text-[8.5px] text-[#38A325] font-bold block mt-0.5 font-sans">₹{j.price}</span>
                                <p className="text-[8px] text-gray-500 mt-0.5 leading-tight">{j.desc}</p>
                              </div>
                              {isActive && (
                                <span className="absolute top-1.5 right-1.5 text-[#38A325]">
                                  <CheckCircle2 className="w-3 h-3 fill-none stroke-current" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Option B: Healthy Snacks */}
                    <div className="space-y-1.5 pt-1.5 border-t border-[#1A1A1A]/5">
                      <label className="text-[11px] font-bold text-[#1A1A1A] flex items-center justify-between">
                        <span>2. Choose Bowl / Fruits up/ Addon</span>
                        <span className="text-[9px] text-[#38A325] font-bold">Select Multiple</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {SNACK_OPTIONS.map((s) => {
                          const isActive = customDays[selectedCustomDay]?.snackIds?.includes(s.id);
                          return (
                            <div
                              key={s.id}
                              onClick={() => setCustomDays(prev => {
                                const currentIds = prev[selectedCustomDay]?.snackIds || [];
                                const newIds = currentIds.includes(s.id)
                                  ? currentIds.filter(id => id !== s.id)
                                  : [...currentIds, s.id];
                                return {
                                  ...prev,
                                  [selectedCustomDay]: { ...prev[selectedCustomDay], snackIds: newIds }
                                };
                              })}
                              className={`p-1.5 px-2 rounded-lg border text-left cursor-pointer transition-all flex items-center space-x-2 relative ${
                                isActive
                                  ? "border-[#38A325] bg-[#38A325]/5 shadow-xs"
                                  : "border-gray-200 hover:border-gray-400 bg-white"
                              }`}
                            >
                              {s.image ? (
                                <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-white border border-neutral-100/60 flex-shrink-0 flex items-center justify-center p-0.5 shadow-xs">
                                  <img
                                    src={s.image}
                                    alt={s.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                </div>
                              ) : (
                                <span className="text-base select-none mt-0.5">{s.icon}</span>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-[10px] text-gray-900 block whitespace-normal break-words leading-tight">{s.name}</span>
                                <span className="text-[8.5px] text-[#38A325] font-bold block mt-0.5 font-sans">
                                  {s.price === 0 ? "Included" : `+₹${s.price}`}
                                </span>
                                <p className="text-[8px] text-gray-500 mt-0.5 leading-tight">{s.desc}</p>
                              </div>
                              {isActive && (
                                <span className="absolute top-1.5 right-1.5 text-[#38A325]">
                                  <CheckCircle2 className="w-3 h-3 fill-none stroke-current" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 3. Summary details price receipt panel (Column span 3) */}
                  <div className="lg:col-span-3 space-y-4">
                    {/* Subscription Cycle Toggle */}
                    <div className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-3 shadow-xs space-y-2">
                      <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Choose Bundle Length</p>
                      <div className="grid grid-cols-2 gap-1 bg-[#EFECE5]/50 p-1 rounded-lg">
                        <button
                          onClick={() => setCustomCycleType("weekly")}
                          className={`py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            customCycleType === "weekly"
                              ? "bg-[#38A325] text-white shadow-xs"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Weekly (6-Day)
                        </button>
                        <button
                          onClick={() => setCustomCycleType("monthly")}
                          className={`py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            customCycleType === "monthly"
                              ? "bg-[#38A325] text-white shadow-xs"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Monthly (24-Day)
                        </button>
                      </div>
                    </div>

                    {/* Live Bill Receipt */}
                    <div className="bg-[#1A1A1A] text-white border border-white/5 rounded-2xl p-4 shadow-md space-y-3.5 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-[#38A325]/10 rounded-full filter blur-xl" />
                      
                      <div className="border-b border-white/10 pb-2">
                        <span className="text-[8.5px] font-bold text-[#38A325] bg-[#38A325]/15 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider leading-none">
                          Custom Bill Summary
                        </span>
                        <h4 className="text-xs font-sans font-extrabold mt-1 text-white tracking-wide uppercase flex items-center gap-1.5">
                          <span>{customCycleType === "monthly" ? "👑 24-Day Sub" : "✨ 6-Day Combo"}</span>
                        </h4>
                      </div>

                      {/* Day-by-Day Selected Matches */}
                      <div className="space-y-1 bg-white/5 p-2 rounded-xl border border-white/5 max-h-56 overflow-y-auto scrollbar-none">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 px-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400">
                          <span>Daily Blueprint</span>
                          <span className="text-emerald-400">Setup Active</span>
                        </div>
                        {Object.keys(dayNames).map((dayId) => {
                          const day = dayNames[dayId];
                          const selections = customDays[dayId] || { juiceIds: [], snackIds: [] };
                          const juices = JUICE_OPTIONS.filter(j => selections.juiceIds?.includes(j.id));
                          const snacks = SNACK_OPTIONS.filter(s => selections.snackIds?.includes(s.id));

                          const cleanJuicesName = juices.map(j => {
                            return j.name
                              .replace(" Juice", "")
                              .replace(" Valencia", "")
                              .replace(" Cleanse", "")
                              .replace(" Booster", "")
                              .replace(" Shake", "")
                              .replace(" Drink", "");
                          }).join(" & ") || "No Drink";

                          const cleanSnacksName = snacks.length === 0 
                            ? "Juice Only" 
                            : snacks.map(s => {
                                return s.name
                                  .replace(" Sprouts Bowl", "")
                                  .replace(" Classic ", "")
                                  .replace(" Fruit Platter", " Fruit")
                                  .replace(" Bowl", "")
                                  .replace(" Cup", "")
                                  .replace(" Power", "");
                              }).join(" & ");

                          const juicesIcon = juices.map(j => j.icon).join("") || "🥤";
                          const snacksIcon = snacks.length === 0 ? "❌" : snacks.map(s => s.icon).join("");

                          return (
                            <div 
                              key={dayId} 
                              className="grid grid-cols-[58px_1fr_12px_1fr] items-center gap-1.5 text-[9px] py-1.5 last:border-b-0 border-b border-white/5 hover:bg-white/5 px-1 rounded transition-colors"
                            >
                              {/* Day Column */}
                              <span className="text-gray-300 font-bold flex items-center space-x-1 min-w-0">
                                <span className="text-[10px] shrink-0 select-none">{day.icon}</span>
                                <span className="uppercase text-gray-400 text-[8.5px] tracking-wide font-sans">{day.label.slice(0, 3)}</span>
                              </span>

                              {/* Juice Column */}
                              <span className="truncate text-gray-100 font-medium flex items-center space-x-1 min-w-0" title={juices.map(j => j.name).join(", ")}>
                                <span className="text-[10px] shrink-0 select-none">{juicesIcon}</span>
                                <span className="truncate">{cleanJuicesName}</span>
                              </span>

                              {/* Connector Column */}
                              <span className="text-gray-500 text-[8px] font-bold text-center select-none">+</span>

                              {/* Snack Column */}
                              <span className="truncate text-gray-400 font-medium flex items-center space-x-1 min-w-0" title={snacks.map(s => s.name).join(", ")}>
                                <span className="text-[10px] shrink-0 select-none">{snacksIcon}</span>
                                <span className="truncate">{cleanSnacksName}</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-gray-300">
                          <span className="text-[10px]">Configured subtotal</span>
                          <span className="font-mono text-[10px]">₹{customSubtotal}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span className="text-[10px] font-bold"> Discount</span>
                          <span className="font-mono text-[10px] font-bold">-₹{customSavings}</span>
                        </div>
                        
                        <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Total Price</span>
                          <span className="text-base font-sans font-black text-[#38A325]">₹{customFinalPrice}</span>
                        </div>
                      </div>

                      <div className="text-[8.5px] text-gray-400 leading-relaxed pt-1 flex items-start space-x-1 border-t border-white/5">
                        <span>🛵</span>
                        <span>Free Pune core delivery + daily doorstep schedule locks included. Cancel or reschedule days anytime.</span>
                      </div>

                      <div className="space-y-2 pt-1 border-t border-white/10">
                        <button
                          onClick={handleAddCustomPlanToCart}
                          disabled={customSubtotal === 0}
                          className={`w-full py-2 px-3 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm ${
                            customSubtotal === 0 
                              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5" 
                              : "bg-[#38A325] hover:bg-[#38A325]/95 active:scale-95 text-white cursor-pointer"
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          <span>{customSubtotal === 0 ? "Select Items to Build Plan" : "Add Custom Plan"}</span>
                        </button>
                        <button
                          onClick={handleCustomWhatsAppSubscribe}
                          disabled={customSubtotal === 0}
                          className={`w-full py-2 px-3 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm ${
                            customSubtotal === 0
                              ? "bg-neutral-800/40 text-neutral-500 cursor-not-allowed border border-white/5"
                              : "bg-white text-gray-900 hover:bg-gray-100 active:scale-95 cursor-pointer"
                          }`}
                        >
                          <svg className="w-3 h-3 fill-current text-green-600" viewBox="0 0 24 24">
                            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z" />
                          </svg>
                          <span>Build via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Global floating notification success */}
          <AnimatePresence>
            {showSubscriptionSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-8 py-4.5 rounded-2xl shadow-2xl flex items-center space-x-3.5 z-50 border border-white/10"
              >
                <div className="p-1 px-1.5 bg-[#38A325] rounded-full text-white text-xs">✔</div>
                <div>
                  <p className="font-bold text-sm tracking-wide">Subscription Selected!</p>
                  <p className="text-[10px] text-gray-400">Connecting to FresCo WhatsApp concierge to lock in {showSubscriptionSuccess}...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pune Delivery Registration / Subscriber Profile Onboarding Modal */}
          <AnimatePresence>
            {showProfileModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-[#FAF9F5] border-2 border-[#38A325] max-w-md w-full rounded-3xl p-6 shadow-2xl relative text-left"
                >
                  <div className="flex items-start space-x-3.5 mb-4">
                    <div className="text-3xl select-none bg-emerald-100 p-2 rounded-2xl border border-emerald-200">
                      🛵
                    </div>
                    <div>
                      <h3 className="font-serif italic font-black text-lg text-gray-950">
                        Pune Delivery Registration
                      </h3>
                      <p className="text-[10.5px] text-gray-500 leading-normal mt-0.5">
                        Register your delivery profile at the customer end to activate morning dispatches.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-wider text-neutral-500 font-mono mb-1">
                        Subscriber Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#38A325]/50 focus:border-[#38A325] font-semibold text-gray-950 shadow-2xs"
                        placeholder="e.g. Aditi Sharma"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-wider text-neutral-500 font-mono mb-1">
                        WhatsApp/Contact Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#38A325]/50 focus:border-[#38A325] font-mono text-gray-950 shadow-2xs"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-wider text-neutral-500 font-mono mb-1">
                        Complete House / Flat Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full bg-white border border-[#1A1A1A]/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#38A325]/50 focus:border-[#38A325] text-gray-950 shadow-2xs resize-none"
                        placeholder="e.g. Flat 402, Green Glen Society, Baner, Pune - 411045"
                      />
                    </div>

                    <div className="flex justify-end items-center space-x-2 pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileModal(false);
                          setPendingPlan(null);
                        }}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold uppercase py-2.5 px-4 rounded-xl text-[10px] tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#38A325] hover:bg-[#2F891F] text-white font-extrabold uppercase py-2.5 px-5.5 rounded-xl text-[10px] tracking-wider shadow-md transition-all cursor-pointer"
                      >
                        Save & Activate
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </section>
    );
  }
