import React, { useState, useEffect } from "react";
import * as a from "react/jsx-runtime";
import { motion as Ke, AnimatePresence as Hn } from "motion/react";
import { MenuItem, CartItem } from "../types";
import { MENU_ITEMS } from "../data";
import { 
  Sparkles as Sb, 
  Minus as ol, 
  Plus as ea, 
  Calendar as Kh, 
  CheckCircle2 as Ny 
} from "lucide-react";

// @ts-ignore
import WeeklyFruitJuiceMockup from "../assets/images/weekly_fruit_juice.png";
// @ts-ignore
import FrescoWellnessMockup from "../assets/images/fresco_wellness_flatlay.png";
// @ts-ignore
import WeightLossMockup from "../assets/images/weight_loss.png";
// @ts-ignore
import HeroHealthySelection from "../assets/images/hero_healthy_selection.png";
// @ts-ignore
import WellnessCycleMockup from "../assets/images/Wellness-cycle.png";
// @ts-ignore
import DailyFreshWellnessPlanMockup from "../assets/images/Daily_Fresh_Wellness_Plan.png";
// @ts-ignore
import ProteinPowerPlanMockup from "../assets/images/Protein_Power_Plan.png";
// @ts-ignore
import UltimateWellnessElitePlanMockup from "../assets/images/Ultimate_Wellness_Elite_Plan.png";

const DailyFreshWellnessPlan = DailyFreshWellnessPlanMockup;
const ProteinPowerPlan = ProteinPowerPlanMockup;
const UltimateWellnessElitePlan = UltimateWellnessElitePlanMockup;

const Db = WeeklyFruitJuiceMockup;
const $h = WellnessCycleMockup;
const Mb = WeightLossMockup;
const YA = DailyFreshWellnessPlanMockup;
const JA = ProteinPowerPlanMockup;
const XA = UltimateWellnessElitePlanMockup;

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
  import PaneerSproutsBowlImg from "../assets/images/Paneer-Power-Bowl.png";
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


const fc = DetoxBodyImg;
const ri = SproutsBowlImg;
const Ey = ImmunityBoosterImg;
const Oc = ClassicDelightCupImg;
const vh = VitalEnergyDrinkImg;
const gr = ProteinPowerCupImg;
const ky = SkinGlowUpImg;
const Bc = ExoticDelightCupImg;
const dc = FatBurnerImg;
const Lf = PaneerSproutsBowlImg;
const qf = ABCDriknImg;
const Rc = EnergyBoostShakeImg;
const wc = OrangeJuiceImg;
const Ff = PineappleJuiceImg;
const Vf = MosambiJuiceImg;
const Hf = AppleJuiceImg;
const Gf = PapayaJuiceImg;
const Uf = PomegranateJuiceImg;
const jc = chickenPowerBowlImg;
const If = GutResetImg;

const P = React;
const f5 = React;

interface SubscriptionSectionProps {
  onAddToCartDirectly: (item: MenuItem) => void;
  onAddBulkToCartDirectly: (items: MenuItem[]) => void;
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (cartId: string, quantity: number) => void;
  onRemoveCartItem?: (cartId: string) => void;
}

const ws = MENU_ITEMS.filter((i: any) =>
  [
    "Fruit Juices",
    "Green Vitality Juice",
    "Fresco Power Juices",
    "Specials",
    "Smoothies",
    "Shakes"
  ].includes(i.category) ||
  i.name.toLowerCase().includes("juice") ||
  i.name.toLowerCase().includes("drink") ||
  i.name.toLowerCase().includes("shake") ||
  i.name.toLowerCase().includes("smoothie")
).map((i: any) => {
  let l = "Fruit Juices";
  if (i.category === "Fruit Juices") {
    l = "Fruit Juices";
  } else if (i.category === "Green Vitality Juice") {
    l = "Green Vitality";
  } else if (i.category === "Fresco Power Juices") {
    l = "Power Juices";
  } else if (i.category === "Specials") {
    l = "Specials";
  } else if (i.category === "Shakes" || i.category === "Smoothies") {
    l = "Shakes & Smoothies";
  }
  return {
    id: i.id,
    name: i.name,
    price: i.price,
    icon: i.icon || "🍹",
    image: i.image,
    desc: i.description,
    category: i.category,
    subcategory: l
  };
});

const js = MENU_ITEMS.filter((i: any) => {
  const highProteinCategories = [
    "High Protein Meals",
    "Sandwich",
    "Wrap",
    "Salad Bowl",
    "Quinoa Bowl",
    "Rice Bowl",
    "Power Cups",
    "Super Food Sprouts Bowls",
    "Healthy Bites"
  ];
  return highProteinCategories.includes(i.category) || i.name.toLowerCase().includes("protein");
}).map((i: any) => {
  let l = "Bowls & Meals";
  if (i.category === "Sandwich" || i.category === "Wrap") {
    l = "Sandwiches & Wraps";
  } else if (i.category === "Salad Bowl") {
    l = "Salads";
  } else if (i.category === "Power Cups" || i.category === "Super Food Sprouts Bowls" || i.category === "Healthy Bites") {
    l = "Power Cups & Bites";
  } else if (i.category === "Quinoa Bowl" || i.category === "Rice Bowl" || i.category === "High Protein Meals") {
    l = "Bowls & Meals";
  }

  const u = i.name.match(/(\d+g\s*Protein|\d+G\s*Protein)/i) || 
    (i.description && i.description.match(/(\d+g\s*Protein|\d+G\s*Protein)/i));
  const c = u ? u[0] : null;

  return {
    id: i.id,
    name: i.name,
    price: i.price,
    icon: i.icon || "💪",
    image: i.image,
    desc: i.description,
    category: i.category,
    subcategory: l,
    proteinBadge: c
  };
});

const QA = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 85C45 70 52 45 55 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M42 65C30 63 18 70 12 66C20 57 35 58 42 65Z" fill="currentColor" />
    <path d="M46 50C35 45 25 50 18 45C27 38 38 41 46 50Z" fill="currentColor" />
    <path d="M50 35C40 28 32 32 26 26C34 22 43 26 50 35Z" fill="currentColor" />
    <path d="M44 73C54 75 64 68 70 71C62 77 50 75 44 73Z" fill="currentColor" />
    <path d="M48 57C58 59 66 52 72 54C64 60 54 59 48 57Z" fill="currentColor" />
    <path d="M51 41C61 40 68 33 74 35C67 40 58 41 51 41Z" fill="currentColor" />
    <path d="M54 25C62 21 66 14 71 16C66 21 60 23 54 25Z" fill="currentColor" />
  </svg>
);


export default function SubscriptionSection({
  onAddToCartDirectly: i,
  onAddBulkToCartDirectly: l,
  cartItems: u = [],
  onUpdateCartQuantity: c,
  onRemoveCartItem: d,
}) {
  var Fe, ae, re, ct, rt, Rt, zt, bt, Xe, Qt;
  const [m, h] = P.useState("weekly"),
    [p, v] = P.useState("fresco"),
    [j, b] = P.useState(0),
    [y, w] = P.useState(null),
    [M, N] = P.useState(!0),
    [V, k] = P.useState(null),
    [F, Y] = P.useState(!1),
    [q, B] = P.useState(() => {
      const J = localStorage.getItem("fresco_active_sub_v2");
      if (J)
        try {
          const ie = JSON.parse(J);
          if (ie && typeof ie == "object") return ie;
        } catch {}
      return null;
    }),
    W = (J) => {
      if (J) {
        const ie = {
          customerName:
            J.customerName || (q == null ? void 0 : q.customerName) || "",
          customerPhone:
            J.customerPhone || (q == null ? void 0 : q.customerPhone) || "",
          customerLocation:
            J.customerLocation ||
            (q == null ? void 0 : q.customerLocation) ||
            "",
          customerAddress:
            J.customerAddress || (q == null ? void 0 : q.customerAddress) || "",
          ...J,
        };
        (B(ie),
          localStorage.setItem("fresco_active_sub_v2", JSON.stringify(ie)));
        const ce = JSON.parse(
            localStorage.getItem("fresco_subscriptions") || "[]",
          ),
          je = ce.findIndex(
            (pe) =>
              pe.id === ie.id ||
              (pe.customerPhone &&
                pe.customerPhone === ie.customerPhone &&
                pe.name === ie.name),
          );
        (je > -1 ? (ce[je] = { ...ce[je], ...ie }) : ce.unshift(ie),
          localStorage.setItem("fresco_subscriptions", JSON.stringify(ce)));
      } else {
        const ie = q;
        if ((B(null), localStorage.removeItem("fresco_active_sub_v2"), ie)) {
          const je = JSON.parse(
            localStorage.getItem("fresco_subscriptions") || "[]",
          ).filter((pe) => pe.id !== ie.id);
          localStorage.setItem("fresco_subscriptions", JSON.stringify(je));
        }
      }
      window.dispatchEvent(new Event("storage"));
    };
  f5.useEffect(() => {
    const J = () => {
      const ie = localStorage.getItem("fresco_active_sub_v2");
      if (ie)
        try {
          const ce = JSON.parse(ie);
          ce && typeof ce == "object" && B(ce);
        } catch {}
      else B(null);
    };
    return (
      window.addEventListener("storage", J),
      () => {
        window.removeEventListener("storage", J);
      }
    );
  }, []);
  const [te, Z] = P.useState({
      sub_monday: { juiceIds: [], snackIds: [] },
      sub_tuesday: { juiceIds: [], snackIds: [] },
      sub_wednesday: { juiceIds: [], snackIds: [] },
      sub_thursday: { juiceIds: [], snackIds: [] },
      sub_friday: { juiceIds: [], snackIds: [] },
      sub_saturday: { juiceIds: [], snackIds: [] },
    }),
    [G, le] = P.useState("weekly"),
    [ee, Ce] = P.useState("sub_monday"),
    [Ne, ne] = P.useState("all"),
    [me, de] = P.useState("all"),
    U = {
      sub_monday: { label: "Monday", icon: "🌱", title: "Detox Day" },
      sub_tuesday: { label: "Tuesday", icon: "🛡️", title: "Immunity Day" },
      sub_wednesday: { label: "Wednesday", icon: "⚡", title: "Energy Day" },
      sub_thursday: { label: "Thursday", icon: "✨", title: "Glow Day" },
      sub_friday: { label: "Friday", icon: "💪", title: "Fitness Day" },
      sub_saturday: { label: "Saturday", icon: "💧", title: "Refresh Day" },
    },
    he = [
      {
        id: "sub_monday",
        name: "Detox Monday",
        icon: "🌱",
        image1: fc,
        image2: ri,
        subtitle: "Detox Body Drink + Sprouts Bowl",
        tags: ["Value Pack", "Immunity"],
        price: 164,
        originalPrice: 178,
        bgColor:
          "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981",
      },
      {
        id: "sub_tuesday",
        name: "Immunity Tuesday",
        icon: "🛡️",
        image1: Ey,
        image2: Oc,
        subtitle: "Immunity Booster Drink+ Classic Delight Cup",
        tags: ["Detox", "Full Day"],
        price: 164,
        originalPrice: 178,
        bgColor:
          "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-800",
        accentColor: "#f59e0b",
      },
      {
        id: "sub_wednesday",
        name: "Energy Wednesday",
        icon: "⚡",
        image1: vh,
        image2: gr,
        subtitle: "Vital Energy Drink + Protein Packed Cup",
        tags: ["Detox", "Full Day"],
        price: 201,
        originalPrice: 218,
        bgColor:
          "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-800",
        accentColor: "#ef4444",
      },
      {
        id: "sub_thursday",
        name: "Glow Thursday",
        icon: "✨",
        image1: ky,
        image2: Bc,
        subtitle: "Skin Glow-up Drink + Exotic Delight Cup",
        tags: ["Detox", "Full Day"],
        price: 182,
        originalPrice: 198,
        bgColor:
          "bg-fuchsia-100/40 hover:bg-fuchsia-100/70 border-fuchsia-400/10 hover:border-fuchsia-400/30 text-fuchsia-800",
        accentColor: "#d946ef",
      },
      {
        id: "sub_friday",
        name: "Fitness Friday",
        icon: "💪",
        image1: dc,
        image2: Lf,
        subtitle: "Fat Burner Drink + 30G Protein Paneer Bowl",
        tags: ["Active High", "Low Carb"],
        price: 182,
        originalPrice: 198,
        bgColor:
          "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 hover:border-blue-500/30 text-blue-800",
        accentColor: "#3b82f6",
      },
      {
        id: "sub_saturday",
        name: "Refresh Saturday",
        icon: "💧",
        image1: qf,
        image2: Rc,
        subtitle: "ABC Drink + Energy Boost Shake",
        tags: ["Weekend Prep", "Hydration"],
        price: 219,
        originalPrice: 238,
        bgColor:
          "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6",
      },
    ],
    $ = [
      {
        id: "sub_fj_monday",
        name: "Orange monday",
        icon: "🍊",
        image1: wc,
        image2: wc,
        subtitle: "Fresh Sweet Orange Juice",
        price: 73,
        originalPrice: 79,
        bgColor:
          "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30 text-amber-800",
        accentColor: "#f59e0b",
      },
      {
        id: "sub_fj_tuesday",
        name: "Pineapple Tuesday",
        icon: "🍍",
        image1: Ff,
        image2: Ff,
        subtitle: "Bromelain-Rich Refreshing Pineapple Juice",
        price: 64,
        originalPrice: 69,
        bgColor:
          "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308",
      },
      {
        id: "sub_fj_wednesday",
        name: "Mosambi Wednesday",
        icon: "🍈 ",
        image1: Vf,
        image2: Vf,
        subtitle: "Sweet Lime Natural Immunity Extract",
        price: 64,
        originalPrice: 69,
        bgColor:
          "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981",
      },
      {
        id: "sub_fj_thursday",
        name: "Apple thursday",
        icon: "🍎",
        image1: Hf,
        image2: Hf,
        subtitle: "Provides hydration and essential nutrients.",
        price: 73,
        originalPrice: 79,
        bgColor:
          "bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/10 hover:border-rose-500/30 text-rose-800",
        accentColor: "#f43f5e",
      },
      {
        id: "sub_fj_friday",
        name: "Papaya Friday",
        icon: "🍑",
        image1: Gf,
        image2: Gf,
        subtitle: "Rich in digestive enzymes and nutrients.",
        price: 64,
        originalPrice: 69,
        bgColor:
          "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6",
      },
      {
        id: "sub_fj_saturday",
        name: "Pomegranate Saturday",
        icon: "🍷",
        image1: Uf,
        image2: Uf,
        subtitle:
          "Rich in antioxidants, helping support heart health and overall wellness.",
        price: 137,
        originalPrice: 149,
        bgColor:
          "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/30 text-purple-800",
        accentColor: "#8b5cf6",
      },
    ],
    ve = [
      {
        id: "sub_fb_monday",
        name: "Fat Burn Monday",
        icon: "🔥",
        image1: dc,
        image2: jc,
        subtitle: "Fat Burner Juice + 35g Protein Chicken Bowl",
        price: 182,
        originalPrice: 198,
        bgColor:
          "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/30 text-emerald-800",
        accentColor: "#10b981",
      },
      {
        id: "sub_fb_tuesday",
        name: "Detox Tuesday",
        icon: "🌿",
        image1: fc,
        image2: ri,
        subtitle: "Detox Body Juice + Sprout Bowl",
        price: 164,
        originalPrice: 178,
        bgColor:
          "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308",
      },
      {
        id: "sub_fb_wednesday",
        name: "Gut Reset Wednesday",
        icon: "🥒",
        image1: If,
        image2: Lf,
        subtitle: "Gut Reset Juice + 30G Protein Paneer Bowl",
        price: 201,
        originalPrice: 218,
        bgColor:
          "bg-green-500/5 hover:bg-green-500/10 border-green-500/10 hover:border-green-500/30 text-green-800",
        accentColor: "#22c55e",
      },
      {
        id: "sub_fb_thursday",
        name: "Fat Burn Thursday",
        icon: "🔥",
        image1: dc,
        image2: jc,
        subtitle: "Fat Burner Juice + 35g Protein Chicken Bowl",
        price: 164,
        originalPrice: 178,
        bgColor:
          "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/10 hover:border-orange-500/30 text-orange-800",
        accentColor: "#f97316",
      },
      {
        id: "sub_fb_friday",
        name: "Detox Friday",
        icon: "🍃",
        image1: fc,
        image2: ri,
        subtitle: "Detox Body Juice + Sprout Bowl",
        price: 164,
        originalPrice: 178,
        bgColor:
          "bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/10 hover:border-yellow-500/30 text-yellow-800",
        accentColor: "#eab308",
      },
      {
        id: "sub_fb_saturday",
        name: "ABC Booster Saturday",
        icon: "❤️",
        image1: qf,
        image2: gr,
        subtitle: "ABC Juice + Power Packed Cup",
        price: 201,
        originalPrice: 218,
        bgColor:
          "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-100",
        accentColor: "#ef4444",
      },
      {
        id: "sub_fb_sunday",
        name: "Gut Reset Sunday",
        icon: "🌱",
        image1: If,
        image2: Lf,
        subtitle: "Gut Reset Juice + 30G Protein Paneer Bowl",
        price: 182,
        originalPrice: 198,
        bgColor:
          "bg-red-500/5 hover:bg-red-500/10 border-red-500/10 hover:border-red-500/30 text-red-100",
        accentColor: "#ef4444",
      },
    ],
    ke = [
      {
        id: "month_green_taster",
        name: "Daily Fresh Wellness Plan",
        icon: "🌿",
        subtitle: "Complete 30-Day Nutrition Journey",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹407 off standard menu",
        price: 4333,
        image: YA,
        benefits: [
          "🍹 30 Fresh Juices",
          "🥗 15 Sprouts Bowls + 15 Classic Delight Cups",
          "🌿 Supports Natural Detox, High in Protein",
          "💪 Rich in Nutrients, Vitamins & Minerals",
          "🚚 Free Delivery",
          "📱  WhatsApp Support",
        ],
        popular: !1,
        bgColor: "bg-white",
        accentColor: "#38A325",
        whatsappText:
          "Hi! I want to subscribe to the Daily Fresh Wellness Plan (₹4333) on FresCo HealthCraft.",
      },
      {
        id: "month_balanced_cleanse",
        name: "Protein Power Plan",
        icon: "💪",
        subtitle: "Complete 30-Day Nutrition Journey",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹683 off standard menu",
        price: 8777,
        image: JA,
        benefits: [
          "🥣 30 30G Protein Paneer Bowl",
          "🍓 26 Power Packed Cups",
          "🍍 4  Premium Fruit Cup Every Sunday",
          "⚡ High Protein & Fiber",
          "🚚 Priority Morning Delivery",
          "📱  Priority WhatsApp Support",
          "💪 Rich in Omega-3, Vitamins, and Minerals",
        ],
        popular: !0,
        bgColor: "bg-gradient-to-b from-white to-[#38A325]/5",
        accentColor: "#38A325",
        whatsappText:
          "Hi! I want to subscribe to the Protein Power Plan (₹8777) on FresCo HealthCraft.",
      },
      {
        id: "month_wellness_overhaul",
        name: "Ultimate Wellness Elite Plan",
        icon: "👑",
        subtitle: "Complete 30-Day Nutrition Journey",
        deliveries: "30 deliveries / month (Free Delivery)",
        savings: "Save ₹494 off standard retail menu",
        price: 5444,
        image: XA,
        benefits: [
          "🍹 30 Daily Juice",
          "🥗 26 Daily Sprouts Bowl",
          "🍓 26 Daily Premium Fruit Cup",
          "💪 4  Weekly Power Packed Cup",
          "🥣 4  Weekly 30G Protein Paneer Bowl",
          "📱  WhatsApp Support",
          "🚚 Free Delivery",
          "⭐ Priority Order Handling",
          "📅 Pause or Reschedule Anytime",
        ],
        popular: !1,
        bgColor: "bg-white",
        accentColor: "#F26419",
        whatsappText:
          "Hi! I want to subscribe to the full Ultimate Wellness Elite Plan (₹5444) on FresCo HealthCraft.",
      },
    ],
    se = (J, ie) => {
      let ce = null;
      try {
        const Tn = localStorage.getItem("fresco_logged_in_user");
        Tn && (ce = JSON.parse(Tn));
      } catch {}
      const je =
          (ce == null ? void 0 : ce.name) ||
          (q == null ? void 0 : q.customerName) ||
          "Subscriber",
        pe =
          (ce == null ? void 0 : ce.phone) ||
          (q == null ? void 0 : q.customerPhone) ||
          "",
        He =
          (ce == null ? void 0 : ce.address) ||
          (q == null ? void 0 : q.customerAddress) ||
          "",
        At = {
          ...J,
          ...ie,
          customerName: je,
          customerPhone: pe,
          customerLocation: "Pune",
          customerAddress: He,
        },
        {
          bulkItems: De,
          singleItem: Ze,
          customSchedule: Cs,
          whatsappText: Ie,
          isWhatsApp: tn,
          customWhatsAppTemplate: Zt,
          ...Fa
        } = At;
      if ((W(Fa), De && l(De), Ze && (i as any)(Ze, undefined, Cs), tn || Zt || Ie)) {
        let Tn = "";
        Zt
          ? (Tn = Zt)
          : Ie
            ? (Tn = Ie)
            : (Tn = `Hi! I want to subscribe to ${Fa.name} (Price: ₹${Fa.price}) on FresCo HealthrCaft. Please activate my cycle dispatch immediately!`);
        const Ha = `*Hello FresCo HealthCraft! I'd like to place an order:* 🥤

${Tn}${
            pe
              ? `

*My Delivery Address Profile*:
👤 Name: ${je}
📞 WhatsApp: ${pe}
🛵 Address: ${He}`
              : ""
          }

Please dispatch this subscription!`,
          wa = encodeURIComponent(Ha);
        window.open(`https://wa.me/918983363146?text=${wa}`, "_blank");
      }
      (w(Fa.name),
        setTimeout(() => {
          w(null);
        }, 2500));
    },
    we = () => {
      const J = he.map((ie) => ({
        id: ie.id,
        name: ie.name,
        category: "Detox & Wellness",
        price: ie.price,
        description: ie.subtitle,
        icon: ie.icon,
      }));
      se(
        {
          id: "sub_weekly_nutrient",
          name: "FrsCo 6-Day Wellness Cycle",
          type: "weekly",
          price: 1266,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 10080 * 60 * 1e3)
            .toISOString()
            .split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active",
        },
        { bulkItems: J },
      );
    },
    tt = () => {
      const J = $.map((ie) => ({
        id: ie.id,
        name: ie.name,
        category: "Detox & Wellness",
        price: ie.price,
        description: ie.subtitle,
        icon: ie.icon,
      }));
      se(
        {
          id: "sub_weekly_fruit_juice",
          name: "weekly fruit juice",
          type: "weekly",
          price: 499,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 10080 * 60 * 1e3)
            .toISOString()
            .split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active",
        },
        { bulkItems: J },
      );
    },
    A = () => {
      const J = ve.map((ie) => ({
        id: ie.id,
        name: ie.name,
        category: "Detox & Wellness",
        price: ie.price,
        description: ie.subtitle,
        icon: ie.icon,
      }));
      se(
        {
          id: "sub_weekly_fat_burn",
          name: "7 days weight loss transformation",
          type: "weekly",
          price: 1717,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(Date.now() + 10080 * 60 * 1e3)
            .toISOString()
            .split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active",
        },
        { bulkItems: J },
      );
    },
    ue = (() => {
      let J = 0;
      return (
        Object.keys(te).forEach((ie) => {
          const ce = te[ie];
          (ce.juiceIds &&
            ce.juiceIds.forEach((je) => {
              const pe = ws.find((He) => He.id === je);
              pe && (J += pe.price);
            }),
            ce.snackIds &&
              ce.snackIds.forEach((je) => {
                const pe = js.find((He) => He.id === je);
                pe && (J += pe.price);
              }));
        }),
        G === "monthly" ? J * 4 : J
      );
    })(),
    ge = ue,
    Be = () => {
      const scheduleLines = Object.keys(te).map((ce) => {
        const je = U[ce]?.label || ce,
          pe = te[ce],
          juices = ws
            .filter((De) => {
              var Ze;
              return (Ze = pe?.juiceIds) == null ? void 0 : Ze.includes(De.id);
            })
            .map((De) => `${De.name} (${De.icon})`),
          snacks = js
            .filter((De) => {
              var Ze;
              return (Ze = pe?.snackIds) == null ? void 0 : Ze.includes(De.id);
            })
            .map((De) => `${De.name} (${De.icon})`);
        const parts = [];
        if (juices.length > 0) parts.push(juices.join(", "));
        if (snacks.length > 0) parts.push(snacks.join(", "));
        return `${je}: ${parts.length > 0 ? parts.join(" + ") : "Not selected"}`;
      });
      const J = scheduleLines.map((line) => `• ${line}`).join("\n");
      const ie = {
        id: `custom_plan_${G}_${Date.now()}`,
        name:
          G === "monthly"
            ? "My Custom Monthly Plan"
            : "My Custom Weekly Plan",
        category: "Detox & Wellness",
        price: ge,
        description: `Custom schedule (${G === "monthly" ? "24 deliveries" : "6 deliveries"}):\n${J}`,
        icon: G === "monthly" ? "👑" : "✨",
      };
      se(
        {
          id: `custom_plan_${G}`,
          name:
            G === "monthly"
              ? "My Custom Monthly Plan"
              : "My Custom Weekly Plan",
          type: G,
          price: ge,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(
            Date.now() + (G === "monthly" ? 30 : 7) * 24 * 60 * 60 * 1e3,
          )
            .toISOString()
            .split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: G === "monthly" ? 24 : 6,
          status: "active",
        },
        { singleItem: ie, customSchedule: scheduleLines },
      );
    },
    Le = () => {
      const scheduleLines = Object.keys(te).map((ce) => {
        const je = U[ce]?.label || ce,
          pe = te[ce],
          juices = ws
            .filter((De) => {
              var Ze;
              return (Ze = pe?.juiceIds) == null ? void 0 : Ze.includes(De.id);
            })
            .map((De) => `${De.name} (${De.icon})`),
          snacks = js
            .filter((De) => {
              var Ze;
              return (Ze = pe?.snackIds) == null ? void 0 : Ze.includes(De.id);
            })
            .map((De) => `${De.name} (${De.icon})`);
        const parts = [];
        if (juices.length > 0) parts.push(juices.join(", "));
        if (snacks.length > 0) parts.push(snacks.join(", "));
        return `• ${je}: ${parts.length > 0 ? parts.join(" + ") : "None"}`;
      }).join("\n");
      const ie = `Hi! I want to activate a Custom ${G === "monthly" ? "Monthly (24-Day)" : "Weekly (6-Day)"} Wellness Plan of ₹${ge} on FresCo HealthCraft.\n\n📋 *My Custom Schedule:*\n${scheduleLines}\n\n*Total Payable:* ₹${ge}`;
      se(
        {
          id: `custom_plan_${G}`,
          name: G === "monthly" ? "Custom Monthly Plan" : "Custom Weekly Plan",
          type: G,
          price: ge,
          startDate: new Date().toISOString().split("T")[0],
          renewalDate: new Date(
            Date.now() + (G === "monthly" ? 30 : 7) * 24 * 60 * 60 * 1e3,
          )
            .toISOString()
            .split("T")[0],
          deliveriesCompleted: 0,
          totalDeliveries: G === "monthly" ? 24 : 6,
          status: "active",
        },
        { isWhatsApp: !0, customWhatsAppTemplate: ie },
      );
    };
  return a.jsxs("section", {
    id: "subscriptions",
    className:
      "pt-3.5 pb-3 bg-gradient-to-br from-white via-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10 relative overflow-hidden",
    children: [
      a.jsx("div", {
        className:
          "absolute right-0 top-1/4 w-96 h-96 bg-[#38A325]/5 rounded-full filter blur-3xl -z-10",
      }),
      a.jsx("div", {
        className:
          "absolute left-0 bottom-1/4 w-80 h-80 bg-[#F26419]/5 rounded-full filter blur-3xl -z-10",
      }),
      a.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [
          a.jsxs("div", {
            className: "pt-6 pb-2",
            children: [
              a.jsx("h2", {
                className:
                  "font-serif text-[28px] sm:text-[34px] md:text-[38px] text-[#1E4620] font-medium tracking-normal leading-tight",
                children: "Choose Your Wellness Journey",
              }),
              a.jsx("p", {
                className:
                  "mt-2 text-[#1A1A1A]/60 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium",
                children:
                  "Transform your daily wellness and save big with scheduled raw nourishment. Freshly prepared and delivered daily.",
              }),
              a.jsx("p", {
                className:
                  "mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-semibold text-[#1E4620]",
                children:
                  "👇 Click a wellness program below to view benefits, pricing & delivery schedule.",
              }),
            ],
          }),
          a.jsxs("div", {
            id: "explore-plans-container",
            className: "scroll-mt-24",
            children: [
              a.jsx("div", {
                className: "mt-5 mb-8 flex justify-center",
                children: a.jsxs("div", {
                  className:
                    "bg-[#FAF8F5]/90 backdrop-blur-md p-1.5 rounded-full inline-flex flex-row items-center gap-1.5 border border-stone-200/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]",
                  children: [
                    a.jsx("button", {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        h("weekly");
                      },
                      className: `py-2 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${m === "weekly" ? "bg-[#2E7D32] text-white shadow-[0_4px_16px_rgba(46,125,50,0.35)] font-bold" : "text-[#2E3A2F]/80 hover:text-[#2E7D32] hover:bg-stone-100/50"}`,
                      children: a.jsx("span", { children: "Weekly" }),
                    }),
                    a.jsx("button", {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        h("monthly");
                      },
                      className: `py-2 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${m === "monthly" ? "bg-[#2E7D32] text-white shadow-[0_4px_16px_rgba(46,125,50,0.35)] font-bold" : "text-[#2E3A2F]/80 hover:text-[#2E7D32] hover:bg-stone-100/50"}`,
                      children: a.jsx("span", { children: "Monthly" }),
                    }),
                    a.jsx("button", {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        h("custom");
                      },
                      className: `py-2 px-6 sm:px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${m === "custom" ? "bg-[#2E7D32] text-white shadow-[0_4px_16px_rgba(46,125,50,0.35)] font-bold" : "text-[#2E3A2F]/80 hover:text-[#2E7D32] hover:bg-stone-100/50"}`,
                      children: a.jsx("span", { children: "Customize" }),
                    }),
                  ],
                }),
              }),
              a.jsxs(Hn, {
                mode: "wait",
                children: [
                  m === null &&
                    a.jsxs(
                      Ke.div,
                      {
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -15 },
                        transition: { duration: 0.3 },
                        className: "max-w-xl mx-auto text-center py-16 px-4",
                        children: [
                          a.jsx("div", {
                            className:
                              "inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38A325]/10 text-[#38A325] mb-5 border border-[#38A325]/20 shadow-xs",
                            children: a.jsx(Sb, {
                              className: "w-7 h-7 animate-pulse text-[#38A325]",
                            }),
                          }),
                          a.jsx("h3", {
                            className:
                              "font-serif italic text-lg sm:text-xl text-[#1A1A1A] font-extrabold tracking-tight",
                            children: "Choose Your Wellness Journey",
                          }),
                          a.jsx("p", {
                            className:
                              "text-xs sm:text-sm text-[#1A1A1A]/60 mt-2.5 max-w-sm mx-auto leading-relaxed font-sans font-medium",
                            children:
                              "Please select a subscription plan above to explore our Weekly, Monthly, or completely Customized wellness subscription cycles.",
                          }),
                        ],
                      },
                      "placeholder",
                    ),
                  m === "weekly" &&
                    a.jsxs(
                      Ke.div,
                      {
                        layout: !0,
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -15 },
                        transition: { duration: 0.3 },
                        className: "max-w-6xl mx-auto px-2",
                        children: [
                          a.jsxs("div", {
                            className:
                              "flex flex-wrap justify-center gap-2 mb-8 max-w-xl mx-auto",
                            children: [
                              a.jsx("button", {
                                onClick: () => {
                                  (v("fresco"), b(0));
                                },
                                className: `flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border ${p === "fresco" ? "bg-[#1E4620]/10 text-[#1E4620] border-[#1E4620]/30 shadow-xs" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#FAF8F5]/80 border-stone-200"}`,
                                children: a.jsx("span", {
                                  children: "🌿 6-Day Wellness Cycle",
                                }),
                              }),
                              a.jsx("button", {
                                onClick: () => {
                                  (v("fruit"), b(0));
                                },
                                className: `flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border ${p === "fruit" ? "bg-[#1E4620]/10 text-[#1E4620] border-[#1E4620]/30 shadow-xs" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#FAF8F5]/80 border-stone-200"}`,
                                children: a.jsx("span", {
                                  children: "🍹 Weekly Fruit Juice",
                                }),
                              }),
                              a.jsx("button", {
                                onClick: () => {
                                  (v("fatburn"), b(0));
                                },
                                className: `flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border ${p === "fatburn" ? "bg-[#1E4620]/10 text-[#1E4620] border-[#1E4620]/30 shadow-xs" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#FAF8F5]/80 border-stone-200"}`,
                                children: a.jsx("span", {
                                  children: "🔥 7-Day Weight Loss",
                                }),
                              }),
                            ],
                          }),
                          (() => {
                            const J = {
                                fresco: {
                                  title: "FresCo 6-Day Wellness Cycle",
                                  subtitle:
                                    "A curated Monday-to-Saturday breakfast routing with raw juices, fruit cups & sprout bowls.",
                                  price: 1266,
                                  originalPrice: 1328,
                                  showcaseImg: $h,
                                  icon: "🌿",
                                  onSubscribe: we,
                                  days: [],
                                },
                                fruit: {
                                  title: "Weekly Fruit Juice",
                                  subtitle:
                                    "A curated Monday-to-Saturday pure organic fresh juices.",
                                  price: 499,
                                  originalPrice: 514,
                                  showcaseImg: Db,
                                  icon: "🍹",
                                  onSubscribe: tt,
                                  days: [],
                                },
                                fatburn: {
                                  title: "7-Days Weight Loss Transformation",
                                  subtitle:
                                    "Scientifically curated juice & protein bowl plan to support healthy weight management.",
                                  price: 1717,
                                  originalPrice: 1806,
                                  showcaseImg: Mb,
                                  icon: "🔥",
                                  onSubscribe: A,
                                  days: [],
                                },
                              },
                              ie = J[p] || J.fresco;
                            return a.jsxs("div", {
                              className:
                                "bg-[#FAF9F5] border border-stone-200/40 rounded-[36px] overflow-hidden shadow-2xl shadow-stone-900/5 text-left flex flex-col relative p-6 sm:p-8 max-w-4xl mx-auto transition-all duration-300",
                              children: [
                                a.jsxs("div", {
                                  className: "flex items-center gap-4.5 mb-6",
                                  children: [
                                    a.jsx("div", {
                                      className:
                                        "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-stone-200/50 shadow-xs flex items-center justify-center shrink-0",
                                      children: a.jsx("span", {
                                        className:
                                          "text-2xl sm:text-3xl select-none",
                                        children: ie.icon,
                                      }),
                                    }),
                                    a.jsxs("div", {
                                      children: [
                                        a.jsx("h3", {
                                          className:
                                            "font-serif italic text-xl sm:text-2xl text-[#1A253C] font-extrabold leading-tight tracking-tight",
                                          children: ie.title,
                                        }),
                                        a.jsx("p", {
                                          className:
                                            "text-xs sm:text-sm text-stone-500 font-medium mt-1 leading-normal",
                                          children: ie.subtitle,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                a.jsx("div", {
                                  className:
                                    "relative w-full aspect-[2.1/1] rounded-[24px] overflow-hidden border border-stone-200/20 shadow-xs mb-6",
                                  children: a.jsx("img", {
                                    src: ie.showcaseImg,
                                    alt: ie.title,
                                    referrerPolicy: "no-referrer",
                                    className: "w-full h-full object-cover",
                                  }),
                                }),
                               
                               
                                a.jsxs("div", {
                                  className:
                                    "flex flex-col sm:flex-row items-center justify-between gap-5",
                                  children: [
                                    a.jsxs("div", {
                                      className: "text-left shrink-0",
                                      children: [
                                        a.jsx("span", {
                                          className:
                                            "text-[10px] uppercase tracking-widest text-stone-400 font-extrabold block leading-none",
                                          children: "COMBO PRICE:",
                                        }),
                                        a.jsxs("div", {
                                          className:
                                            "flex items-baseline gap-2 mt-2",
                                          children: [
                                            a.jsxs("span", {
                                              className:
                                                "text-2xl sm:text-3xl font-black text-[#2B6323] leading-none",
                                              children: ["₹", ie.price],
                                            }),
                                            ie.originalPrice &&
                                              a.jsxs("span", {
                                                className:
                                                  "text-stone-400 line-through text-sm sm:text-base font-semibold leading-none",
                                                children: [
                                                  "₹",
                                                  ie.originalPrice,
                                                ],
                                              }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    a.jsxs("div", {
                                      className:
                                        "flex flex-col items-center sm:items-end w-full sm:w-auto",
                                      children: [
                                        (() => {
                                          const je = {
                                              fresco: {
                                                id: "sub_weekly_nutrient",
                                                name: "FrsCo 6-Day Wellness Cycle",
                                                price: 1266,
                                                category: "Subscription Plans",
                                                description:
                                                  "A curated Monday-to-Saturday breakfast routing with raw juices, fruit cups & sprout bowls.",
                                                icon: "🌿",
                                              },
                                              fruit: {
                                                id: "sub_weekly_fruit_juice",
                                                name: "Weekly Fruit Juice",
                                                price: 499,
                                                category: "Subscription Plans",
                                                description:
                                                  "A curated Monday-to-Saturday pure organic fresh juices.",
                                                icon: "🍹",
                                              },
                                              fatburn: {
                                                id: "sub_weekly_fat_burn",
                                                name: "7 Days Weight Loss Transformation",
                                                price: 1717,
                                                category: "Subscription Plans",
                                                description:
                                                  "A high-efficacy 7-day caloric deficit fresh nutrition plan designed to boost metabolic activity.",
                                                icon: "🔥",
                                              },
                                            }[p],
                                            pe = u.find(
                                              (He) =>
                                                He.menuItem.id === je.id &&
                                                (!He.customIngredients ||
                                                  He.customIngredients
                                                    .length === 0),
                                            );
                                          return pe
                                            ? a.jsxs("div", {
                                                className:
                                                  "w-full sm:w-[240px] flex items-center justify-between bg-[#F1F6F2] text-[#1E4620] border border-[#1E4620]/30 rounded-full h-[48px] px-2 select-none transition-all duration-300",
                                                children: [
                                                  a.jsx("button", {
                                                    onClick: (He) => {
                                                      (He.stopPropagation(),
                                                        pe.quantity > 1
                                                          ? c == null ||
                                                            c(
                                                              pe.id,
                                                              pe.quantity - 1,
                                                            )
                                                          : d == null ||
                                                            d(pe.id));
                                                    },
                                                    className:
                                                      "w-9 h-9 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-full text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-xs",
                                                    title: "Decrease Quantity",
                                                    children: a.jsx(ol, {
                                                      className: "w-4 h-4",
                                                      strokeWidth: 3,
                                                    }),
                                                  }),
                                                  a.jsx("div", {
                                                    className:
                                                      "flex flex-col items-center justify-center",
                                                    children: a.jsxs("span", {
                                                      className:
                                                        "text-[12px] font-black tracking-wider uppercase text-[#1E4620]",
                                                      children: [
                                                        pe.quantity,
                                                        " Added",
                                                      ],
                                                    }),
                                                  }),
                                                  a.jsx("button", {
                                                    onClick: (He) => {
                                                      (He.stopPropagation(),
                                                        i(je));
                                                    },
                                                    className:
                                                      "w-9 h-9 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-full text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-xs",
                                                    title: "Increase Quantity",
                                                    children: a.jsx(ea, {
                                                      className: "w-4 h-4",
                                                      strokeWidth: 3,
                                                    }),
                                                  }),
                                                ],
                                              })
                                            : a.jsxs("button", {
                                                onClick: () => i(je),
                                                className:
                                                  "w-full sm:w-auto bg-gradient-to-r from-[#2B6323] to-[#1E4620] hover:from-[#35752C] hover:to-[#2B6323] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-10 rounded-full shadow-md shadow-green-900/10 hover:shadow-lg hover:shadow-green-900/15 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-white/10",
                                                children: [
                                                  a.jsx("svg", {
                                                    className:
                                                      "w-4 h-4 text-white/90",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2.5",
                                                    viewBox: "0 0 24 24",
                                                    children: a.jsx("path", {
                                                      strokeLinecap: "round",
                                                      strokeLinejoin: "round",
                                                      d: "M12 4.5v15m7.5-7.5h-15",
                                                    }),
                                                  }),
                                                  a.jsx("span", {
                                                    children: "ADD TO CART",
                                                  }),
                                                ],
                                              });
                                        })(),
                                        a.jsx("span", {
                                          className:
                                            "text-[9px] text-stone-400 hover:text-stone-600 block mt-2 underline cursor-pointer",
                                          children: "Terms & Conditions Apply",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            });
                          })(),
                        ],
                      },
                      "weekly",
                    ),
                  m === "monthly" &&
                    a.jsx(
                      Ke.div,
                      {
                        layout: !0,
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -15 },
                        transition: { duration: 0.3 },
                        className: "space-y-4",
                        children: a.jsx("div", {
                          className:
                            "grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto text-left",
                          children: ke.map((J) => {
                            J.id;
                            const ie = J.id === "month_balanced_cleanse";
                            return (
                              J.id,
                              a.jsxs(
                                Ke.div,
                                {
                                  whileHover: { y: -5 },
                                  transition: { duration: 0.2 },
                                  className: `rounded-3xl p-5 border bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative ${ie ? "border-emerald-500/30 ring-4 ring-emerald-500/5" : "border-stone-200/80"}`,
                                  children: [
                                    a.jsxs("div", {
                                      className:
                                        "flex items-center justify-between mb-3",
                                      children: [
                                        a.jsxs("div", {
                                          className:
                                            "flex items-center gap-2.5",
                                          children: [
                                            a.jsx("div", {
                                              className:
                                                "text-xl shrink-0 p-1.5 bg-amber-100/65 rounded-xl border border-amber-200/30",
                                              children: J.icon,
                                            }),
                                            a.jsxs("div", {
                                              children: [
                                                a.jsx("h3", {
                                                  className:
                                                    "font-extrabold text-[12.5px] text-stone-900 leading-tight",
                                                  children: J.name,
                                                }),
                                                a.jsx("p", {
                                                  className:
                                                    "text-[7.5px] font-bold text-stone-400 uppercase tracking-widest mt-0.5",
                                                  children: J.subtitle,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        ie &&
                                          a.jsx("span", {
                                            className:
                                              "bg-[#2E7D32] text-white text-[7px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#38A325]/20",
                                            children: "Best Seller",
                                          }),
                                      ],
                                    }),
                                    a.jsx("div", {
                                      className:
                                        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-stone-200/50 mb-3.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] bg-stone-100",
                                      children: a.jsx("img", {
                                        src: J.image,
                                        alt: J.name,
                                        referrerPolicy: "no-referrer",
                                        className: "w-full h-full object-cover",
                                      }),
                                    }),
                                    a.jsxs("div", {
                                      className: "flex-1 flex flex-col",
                                      children: [
                                        a.jsx("div", {
                                          className: "mt-1",
                                          children: a.jsxs("div", {
                                            className:
                                              "flex items-baseline space-x-1.5",
                                            children: [
                                              a.jsxs("span", {
                                                className:
                                                  "text-2.5xl font-black text-stone-950",
                                                children: ["₹", J.price],
                                              }),
                                              (J as any).originalPrice &&
                                                a.jsxs("span", {
                                                  className:
                                                    "text-stone-400 line-through text-sm font-semibold",
                                                  children: [
                                                    "₹",
                                                    (J as any).originalPrice,
                                                  ],
                                                }),
                                              a.jsx("span", {
                                                className:
                                                  "text-[11px] font-bold text-stone-400",
                                                children: "/month",
                                              }),
                                            ],
                                          }),
                                        }),
                                        a.jsx("div", {
                                          className: "mt-2.5",
                                          children: a.jsxs("span", {
                                            className:
                                              "inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-[9.5px] font-bold px-2.5 py-1 rounded-md leading-none border border-emerald-100",
                                            children: [
                                              a.jsx("span", { children: "✓" }),
                                              " ",
                                              J.savings,
                                            ],
                                          }),
                                        }),
                                        a.jsxs("div", {
                                          className: "mt-4",
                                          children: [
                                            a.jsx("p", {
                                              className:
                                                "text-[8px] uppercase font-extrabold text-stone-400 tracking-wider mb-1.5",
                                              children: "Deliveries Frequency:",
                                            }),
                                            a.jsxs("div", {
                                              className:
                                                "flex items-center gap-2 bg-[#E8F5E9]/20 border border-[#2E7D32]/10 py-2 px-3 rounded-xl text-[9.5px] font-bold text-stone-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]",
                                              children: [
                                                a.jsx(Kh, {
                                                  className:
                                                    "w-3.5 h-3.5 text-[#2E7D32] shrink-0",
                                                }),
                                                a.jsx("span", {
                                                  children: J.deliveries,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        a.jsxs("div", {
                                          className:
                                            "mt-4 flex-1 flex flex-col justify-start",
                                          children: [
                                            a.jsx("p", {
                                              className:
                                                "text-[8px] uppercase font-extrabold text-stone-400 tracking-wider mb-2",
                                              children: "Exclusive Benefits:",
                                            }),
                                            a.jsx("ul", {
                                              className:
                                                "space-y-1.5 text-[10.5px] font-medium text-stone-700",
                                              children: J.benefits.map(
                                                (ce, je) => {
                                                  const pe = ce.split(" ")[0],
                                                    He = ce
                                                      .replace(pe, "")
                                                      .trim();
                                                  return a.jsxs(
                                                    "li",
                                                    {
                                                      className:
                                                        "flex items-start gap-2",
                                                      children: [
                                                        a.jsx("span", {
                                                          className:
                                                            "text-xs shrink-0 select-none mt-0.5",
                                                          children: pe,
                                                        }),
                                                        a.jsx("span", {
                                                          className:
                                                            "leading-normal font-sans text-stone-700 font-semibold",
                                                          children: He,
                                                        }),
                                                      ],
                                                    },
                                                    je,
                                                  );
                                                },
                                              ),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    a.jsx("div", {
                                      className:
                                        "mt-5 pt-3 border-t border-stone-100 space-y-2",
                                      children: (() => {
                                        const ce = {
                                            id: J.id,
                                            name: J.name,
                                            price: J.price,
                                            category: "Subscription Plans",
                                            description: J.subtitle,
                                            icon: J.icon,
                                            image: J.image,
                                          },
                                          je = u.find(
                                            (pe) =>
                                              pe.menuItem.id === J.id &&
                                              (!pe.customIngredients ||
                                                pe.customIngredients.length ===
                                                  0),
                                          );
                                        return je
                                          ? a.jsxs("div", {
                                              className:
                                                "w-full flex items-center justify-between bg-[#F1F6F2] text-[#1E4620] border border-[#1E4620]/30 rounded-xl h-[44px] px-2 select-none transition-all duration-300",
                                              children: [
                                                a.jsx("button", {
                                                  onClick: (pe) => {
                                                    (pe.stopPropagation(),
                                                      je.quantity > 1
                                                        ? c == null ||
                                                          c(
                                                            je.id,
                                                            je.quantity - 1,
                                                          )
                                                        : d == null ||
                                                          d(je.id));
                                                  },
                                                  className:
                                                    "w-8 h-8 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-lg text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-2xs",
                                                  title: "Decrease Quantity",
                                                  children: a.jsx(ol, {
                                                    className: "w-3.5 h-3.5",
                                                    strokeWidth: 3,
                                                  }),
                                                }),
                                                a.jsx("div", {
                                                  className:
                                                    "flex flex-col items-center justify-center",
                                                  children: a.jsxs("span", {
                                                    className:
                                                      "text-[11px] font-black tracking-wider uppercase text-[#1E4620]",
                                                    children: [
                                                      je.quantity,
                                                      " Added",
                                                    ],
                                                  }),
                                                }),
                                                a.jsx("button", {
                                                  onClick: (pe) => {
                                                    (pe.stopPropagation(),
                                                      i(ce));
                                                  },
                                                  className:
                                                    "w-8 h-8 flex items-center justify-center bg-white border border-[#1E4620]/25 hover:bg-[#1E4620]/10 rounded-lg text-[#1E4620] cursor-pointer transition-colors active:scale-95 shadow-2xs",
                                                  title: "Increase Quantity",
                                                  children: a.jsx(ea, {
                                                    className: "w-3.5 h-3.5",
                                                    strokeWidth: 3,
                                                  }),
                                                }),
                                              ],
                                            })
                                          : a.jsxs("button", {
                                              onClick: () => {
                                                se(
                                                  {
                                                    id: J.id,
                                                    name: J.name,
                                                    type: "monthly",
                                                    price: J.price,
                                                    startDate: new Date()
                                                      .toISOString()
                                                      .split("T")[0],
                                                    renewalDate: new Date(
                                                      Date.now() +
                                                        720 * 60 * 60 * 1e3,
                                                    )
                                                      .toISOString()
                                                      .split("T")[0],
                                                    deliveriesCompleted: 0,
                                                    totalDeliveries: 30,
                                                    status: "active",
                                                  },
                                                  { singleItem: ce },
                                                );
                                              },
                                              className: `w-full py-2.5 px-4 rounded-xl font-bold text-[10px] sm:text-[10.5px] uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-xs border ${ie ? "bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:brightness-110 active:scale-[0.98] border-[#1B5E20]/25 text-white shadow-md shadow-emerald-900/10" : "bg-[#111111] hover:bg-stone-900 active:scale-[0.98] border-stone-950 text-white shadow-sm"}`,
                                              children: [
                                                a.jsx("svg", {
                                                  className:
                                                    "w-3.5 h-3.5 text-white",
                                                  fill: "none",
                                                  stroke: "currentColor",
                                                  strokeWidth: "3",
                                                  viewBox: "0 0 24 24",
                                                  children: a.jsx("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M12 4.5v15m7.5-7.5h-15",
                                                  }),
                                                }),
                                                a.jsx("span", {
                                                  children: "ADD TO CART",
                                                }),
                                              ],
                                            });
                                      })(),
                                    }),
                                  ],
                                },
                                J.id,
                              )
                            );
                          }),
                        }),
                      },
                      "monthly",
                    ),
                  m === "custom" &&
                    a.jsxs(
                      Ke.div,
                      {
                        layout: !0,
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -15 },
                        transition: { duration: 0.3 },
                        className: "space-y-6",
                        children: [
                          a.jsx("div", {
                            className:
                              "flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-4 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-amber-500/5 border border-emerald-500/20 rounded-2xl text-left gap-4",
                            children: a.jsxs("div", {
                              className: "flex items-start space-x-3",
                              children: [
                                a.jsx("span", {
                                  className: "text-2xl mt-0.5",
                                  children: "🎨",
                                }),
                                a.jsxs("div", {
                                  children: [
                                    a.jsx("h4", {
                                      className:
                                        "font-bold text-xs sm:text-sm uppercase tracking-widest text-[#38A325]",
                                      children: "Fresco Dynamic Custom Builder",
                                    }),
                                    a.jsx("p", {
                                      className:
                                        "text-[11px] sm:text-xs text-gray-605 mt-1 leading-relaxed",
                                      children:
                                        "Build your ultimate personalized Monday-to-Saturday healthy breakfast & juice combo schedule. Choose the perfect daily match for your personal fitness goal!",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          a.jsxs("div", {
                            className:
                              "grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-5xl mx-auto text-left",
                            children: [
                              a.jsxs("div", {
                                className: "lg:col-span-3 space-y-2",
                                children: [
                                  a.jsx("p", {
                                    className:
                                      "text-[9px] uppercase font-bold text-gray-400 tracking-wider",
                                    children: "Select Day to Customize",
                                  }),
                                  a.jsx("div", {
                                    className:
                                      "flex flex-row overflow-x-auto lg:flex-col gap-1.5 pb-2 lg:pb-0 scrollbar-none w-full",
                                    children: Object.keys(U).map((J) => {
                                      const ie = ee === J,
                                        ce = te[J] || {
                                          juiceIds: [],
                                          snackIds: [],
                                        },
                                        je = ws.filter((De) => {
                                          var Ze;
                                          return (Ze = ce.juiceIds) == null
                                            ? void 0
                                            : Ze.includes(De.id);
                                        }),
                                        pe = js.filter((De) => {
                                          var Ze;
                                          return (Ze = ce.snackIds) == null
                                            ? void 0
                                            : Ze.includes(De.id);
                                        }),
                                        He =
                                          je.length > 0
                                            ? `${je.map((De) => De.icon).join("")} ${je.map((De) => De.name.replace(" Juice", "").replace(" Shake", "").replace(" Drink", "")).join(", ")}`
                                            : "❌ No drinks selected",
                                        At =
                                          pe.length > 0
                                            ? `${pe.map((De) => De.icon).join("")} ${pe.map((De) => De.name.replace(" Sandwich", " Sandw.").replace(" Chicken", " Chk.").replace(" Sprouts Bowl", " Sprouts")).join(", ")}`
                                            : "❌ No protein selected";
                                      return a.jsxs(
                                        "button",
                                        {
                                          onClick: () => Ce(J),
                                          className: `w-36 lg:w-full text-left p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${ie ? "bg-[#38A325]/10 border-[#38A325] shadow-xs" : "bg-white border-[#1A1A1A]/10 hover:border-[#38A325]/40"}`,
                                          children: [
                                            a.jsxs("div", {
                                              className:
                                                "flex items-center justify-between",
                                              children: [
                                                a.jsxs("span", {
                                                  className:
                                                    "font-bold text-[11px] text-gray-900 flex items-center gap-1",
                                                  children: [
                                                    a.jsx("span", {
                                                      children: U[J].icon,
                                                    }),
                                                    a.jsx("span", {
                                                      children: U[J].label,
                                                    }),
                                                  ],
                                                }),
                                                ie &&
                                                  a.jsx("span", {
                                                    className:
                                                      "w-1.5 h-1.5 rounded-full bg-[#38A325]",
                                                  }),
                                              ],
                                            }),
                                            a.jsx("div", {
                                              className:
                                                "mt-0.5 text-[8.5px] text-gray-500 whitespace-normal break-words leading-tight",
                                              children: He,
                                            }),
                                            a.jsxs("div", {
                                              className:
                                                "text-[8.5px] text-gray-400 whitespace-normal break-words mt-0.5 leading-tight",
                                              children: ["+ ", At],
                                            }),
                                          ],
                                        },
                                        J,
                                      );
                                    }),
                                  }),
                                ],
                              }),
                              a.jsxs("div", {
                                className:
                                  "lg:col-span-6 space-y-3 bg-white border border-[#1A1A1A]/10 rounded-xl p-3.5 shadow-xs",
                                children: [
                                  a.jsxs("div", {
                                    children: [
                                      a.jsx("span", {
                                        className:
                                          "bg-[#38A325]/10 text-[#38A325] text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider",
                                        children: "Active Configuration",
                                      }),
                                      a.jsxs("h3", {
                                        className:
                                          "font-serif italic text-base text-gray-900 mt-0.5 font-semibold flex items-center gap-1",
                                        children: [
                                          a.jsx("span", {
                                            children: U[ee].icon,
                                          }),
                                          a.jsxs("span", {
                                            children: [
                                              " ",
                                              U[ee].label,
                                              "'s Match",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  a.jsxs("div", {
                                    className: "space-y-2",
                                    children: [
                                      a.jsxs("div", {
                                        className:
                                          "flex flex-col sm:flex-row sm:items-center justify-between gap-1",
                                        children: [
                                          a.jsxs("div", {
                                            children: [
                                              a.jsxs("label", {
                                                className:
                                                  "text-[11px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5",
                                                children: [
                                                  a.jsx("span", {
                                                    className: "text-sm",
                                                    children: "🍹",
                                                  }),
                                                  a.jsx("span", {
                                                    children:
                                                      "1. Choose Fresh Juice / Drink",
                                                  }),
                                                  ((ae =
                                                    (Fe = te[ee]) == null
                                                      ? void 0
                                                      : Fe.juiceIds) == null
                                                    ? void 0
                                                    : ae.length) > 0 &&
                                                    a.jsxs("span", {
                                                      className:
                                                        "bg-[#38A325] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full",
                                                      children: [
                                                        (ct =
                                                          (re = te[ee]) == null
                                                            ? void 0
                                                            : re.juiceIds) ==
                                                        null
                                                          ? void 0
                                                          : ct.length,
                                                        " selected",
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              a.jsxs("p", {
                                                className:
                                                  "text-[8.5px] text-gray-500",
                                                children: [
                                                  "Entire beverages menu: cold-pressed fruit juices, green vitality, power juices, specials, smoothies & shakes for ",
                                                  (rt = U[ee]) == null
                                                    ? void 0
                                                    : rt.label,
                                                ],
                                              }),
                                            ],
                                          }),
                                          a.jsx("span", {
                                            className:
                                              "text-[9px] text-[#38A325] font-bold self-start sm:self-auto",
                                            children: "Select Multiple",
                                          }),
                                        ],
                                      }),
                                      a.jsx("div", {
                                        className:
                                          "flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[8.5px]",
                                        children: [
                                          { key: "all", label: "All Drinks" },
                                          {
                                            key: "Fruit Juices",
                                            label: "Fruit Juices",
                                          },
                                          {
                                            key: "Green Vitality",
                                            label: "Green Vitality",
                                          },
                                          {
                                            key: "Power Juices",
                                            label: "Power Juices",
                                          },
                                          {
                                            key: "Specials",
                                            label: "Specials",
                                          },
                                          {
                                            key: "Shakes & Smoothies",
                                            label: "Shakes & Smoothies",
                                          },
                                        ].map((J) => {
                                          const ie =
                                              J.key === "all"
                                                ? ws.length
                                                : ws.filter(
                                                    (je) =>
                                                      je.subcategory === J.key,
                                                  ).length,
                                            ce = Ne === J.key;
                                          return a.jsxs(
                                            "button",
                                            {
                                              type: "button",
                                              onClick: () => ne(J.key),
                                              className: `px-2 py-0.5 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${ce ? "bg-[#38A325] text-white shadow-2xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                                              children: [
                                                J.label,
                                                " (",
                                                ie,
                                                ")",
                                              ],
                                            },
                                            J.key,
                                          );
                                        }),
                                      }),
                                      a.jsx("div", {
                                        className:
                                          "grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1",
                                        children: ws
                                          .filter(
                                            (J) =>
                                              Ne === "all" ||
                                              J.subcategory === Ne,
                                          )
                                          .map((J) => {
                                            var ce, je;
                                            const ie =
                                              (je =
                                                (ce = te[ee]) == null
                                                  ? void 0
                                                  : ce.juiceIds) == null
                                                ? void 0
                                                : je.includes(J.id);
                                            return a.jsxs(
                                              "div",
                                              {
                                                onClick: () =>
                                                  Z((pe) => {
                                                    var De;
                                                    const He =
                                                        ((De = pe[ee]) == null
                                                          ? void 0
                                                          : De.juiceIds) || [],
                                                      At = He.includes(J.id)
                                                        ? He.filter(
                                                            (Ze) => Ze !== J.id,
                                                          )
                                                        : [...He, J.id];
                                                    return {
                                                      ...pe,
                                                      [ee]: {
                                                        ...pe[ee],
                                                        juiceIds: At,
                                                      },
                                                    };
                                                  }),
                                                className: `p-1.5 px-2 rounded-lg border text-left cursor-pointer transition-all flex items-center space-x-2 relative ${ie ? "border-[#38A325] bg-[#38A325]/5 shadow-xs ring-1 ring-[#38A325]/30" : "border-gray-200 hover:border-gray-400 bg-white"}`,
                                                children: [
                                                  J.image
                                                    ? a.jsx("div", {
                                                        className:
                                                          "w-[38px] h-[38px] rounded-lg overflow-hidden bg-white border border-neutral-100/60 flex-shrink-0 flex items-center justify-center p-0.5 shadow-2xs",
                                                        children: a.jsx("img", {
                                                          src: J.image,
                                                          alt: J.name,
                                                          referrerPolicy:
                                                            "no-referrer",
                                                          className:
                                                            "w-full h-full rounded-md object-cover",
                                                        }),
                                                      })
                                                    : a.jsx("span", {
                                                        className:
                                                          "text-base select-none mt-0.5",
                                                        children: J.icon,
                                                      }),
                                                  a.jsxs("div", {
                                                    className:
                                                      "flex-1 min-w-0 pr-4",
                                                    children: [
                                                      a.jsx("span", {
                                                        className:
                                                          "font-bold text-[10px] text-gray-900 block whitespace-normal break-words leading-tight",
                                                        children: J.name,
                                                      }),
                                                      a.jsxs("span", {
                                                        className:
                                                          "text-[8.5px] text-[#38A325] font-bold block mt-0.5 font-sans",
                                                        children: [
                                                          "₹",
                                                          J.price,
                                                        ],
                                                      }),
                                                      a.jsx("p", {
                                                        className:
                                                          "text-[8px] text-gray-500 mt-0.5 leading-tight line-clamp-1",
                                                        children: J.desc,
                                                      }),
                                                    ],
                                                  }),
                                                  ie &&
                                                    a.jsx("span", {
                                                      className:
                                                        "absolute top-1.5 right-1.5 text-[#38A325]",
                                                      children: a.jsx(Ny, {
                                                        className:
                                                          "w-3.5 h-3.5 fill-[#38A325] text-white",
                                                      }),
                                                    }),
                                                ],
                                              },
                                              J.id,
                                            );
                                          }),
                                      }),
                                    ],
                                  }),
                                  a.jsxs("div", {
                                    className:
                                      "space-y-2 pt-2 border-t border-[#1A1A1A]/10",
                                    children: [
                                      a.jsxs("div", {
                                        className:
                                          "flex flex-col sm:flex-row sm:items-center justify-between gap-1",
                                        children: [
                                          a.jsxs("div", {
                                            children: [
                                              a.jsxs("label", {
                                                className:
                                                  "text-[11px] font-extrabold text-[#1A1A1A] flex items-center gap-1.5",
                                                children: [
                                                  a.jsx("span", {
                                                    className: "text-sm",
                                                    children: "💪",
                                                  }),
                                                  a.jsx("span", {
                                                    children:
                                                      "2. High Protein Selection",
                                                  }),
                                                  ((zt =
                                                    (Rt = te[ee]) == null
                                                      ? void 0
                                                      : Rt.snackIds) == null
                                                    ? void 0
                                                    : zt.length) > 0 &&
                                                    a.jsxs("span", {
                                                      className:
                                                        "bg-[#38A325] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full",
                                                      children: [
                                                        (Xe =
                                                          (bt = te[ee]) == null
                                                            ? void 0
                                                            : bt.snackIds) ==
                                                        null
                                                          ? void 0
                                                          : Xe.length,
                                                        " selected",
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              a.jsxs("p", {
                                                className:
                                                  "text-[8.5px] text-gray-500",
                                                children: [
                                                  "Choose protein-rich bowls, sandwiches, wraps, salads, and cups for ",
                                                  (Qt = U[ee]) == null
                                                    ? void 0
                                                    : Qt.label,
                                                ],
                                              }),
                                            ],
                                          }),
                                          a.jsx("span", {
                                            className:
                                              "text-[9px] text-[#38A325] font-bold self-start sm:self-auto",
                                            children: "Select Multiple",
                                          }),
                                        ],
                                      }),
                                      a.jsx("div", {
                                        className:
                                          "flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[8.5px]",
                                        children: [
                                          { key: "all", label: "All Protein" },
                                          {
                                            key: "Bowls & Meals",
                                            label: "Bowls & Meals",
                                          },
                                          {
                                            key: "Sandwiches & Wraps",
                                            label: "Sandwiches & Wraps",
                                          },
                                          { key: "Salads", label: "Salads" },
                                          {
                                            key: "Power Cups & Bites",
                                            label: "Cups & Bites",
                                          },
                                        ].map((J) => {
                                          const ie =
                                              J.key === "all"
                                                ? js.length
                                                : js.filter(
                                                    (je) =>
                                                      je.subcategory === J.key,
                                                  ).length,
                                            ce = me === J.key;
                                          return a.jsxs(
                                            "button",
                                            {
                                              type: "button",
                                              onClick: () => de(J.key),
                                              className: `px-2 py-0.5 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${ce ? "bg-[#38A325] text-white shadow-2xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                                              children: [
                                                J.label,
                                                " (",
                                                ie,
                                                ")",
                                              ],
                                            },
                                            J.key,
                                          );
                                        }),
                                      }),
                                      a.jsx("div", {
                                        className:
                                          "grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1",
                                        children: js
                                          .filter(
                                            (J) =>
                                              me === "all" ||
                                              J.subcategory === me,
                                          )
                                          .map((J) => {
                                            var ce, je;
                                            const ie =
                                              (je =
                                                (ce = te[ee]) == null
                                                  ? void 0
                                                  : ce.snackIds) == null
                                                ? void 0
                                                : je.includes(J.id);
                                            return a.jsxs(
                                              "div",
                                              {
                                                onClick: () =>
                                                  Z((pe) => {
                                                    var De;
                                                    const He =
                                                        ((De = pe[ee]) == null
                                                          ? void 0
                                                          : De.snackIds) || [],
                                                      At = He.includes(J.id)
                                                        ? He.filter(
                                                            (Ze) => Ze !== J.id,
                                                          )
                                                        : [...He, J.id];
                                                    return {
                                                      ...pe,
                                                      [ee]: {
                                                        ...pe[ee],
                                                        snackIds: At,
                                                      },
                                                    };
                                                  }),
                                                className: `p-1.5 px-2 rounded-lg border text-left cursor-pointer transition-all flex items-center space-x-2 relative ${ie ? "border-[#38A325] bg-[#38A325]/5 shadow-xs ring-1 ring-[#38A325]/30" : "border-gray-200 hover:border-gray-400 bg-white"}`,
                                                children: [
                                                  J.image
                                                    ? a.jsx("div", {
                                                        className:
                                                          "w-[38px] h-[38px] rounded-lg overflow-hidden bg-white border border-neutral-100/60 flex-shrink-0 flex items-center justify-center p-0.5 shadow-2xs",
                                                        children: a.jsx("img", {
                                                          src: J.image,
                                                          alt: J.name,
                                                          referrerPolicy:
                                                            "no-referrer",
                                                          className:
                                                            "w-full h-full rounded-md object-cover",
                                                        }),
                                                      })
                                                    : a.jsx("span", {
                                                        className:
                                                          "text-base select-none mt-0.5",
                                                        children: J.icon,
                                                      }),
                                                  a.jsxs("div", {
                                                    className:
                                                      "flex-1 min-w-0 pr-4",
                                                    children: [
                                                      a.jsxs("div", {
                                                        className:
                                                          "flex items-center gap-1 flex-wrap",
                                                        children: [
                                                          a.jsx("span", {
                                                            className:
                                                              "font-bold text-[10px] text-gray-900 block whitespace-normal break-words leading-tight",
                                                            children: J.name,
                                                          }),
                                                          J.proteinBadge &&
                                                            a.jsx("span", {
                                                              className:
                                                                "inline-flex items-center text-[7.5px] font-black bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded leading-none",
                                                              children:
                                                                J.proteinBadge,
                                                            }),
                                                        ],
                                                      }),
                                                      a.jsx("span", {
                                                        className:
                                                          "text-[8.5px] text-[#38A325] font-bold block mt-0.5 font-sans",
                                                        children:
                                                          J.price === 0
                                                            ? "Included"
                                                            : `+₹${J.price}`,
                                                      }),
                                                      a.jsx("p", {
                                                        className:
                                                          "text-[8px] text-gray-500 mt-0.5 leading-tight line-clamp-1",
                                                        children: J.desc,
                                                      }),
                                                    ],
                                                  }),
                                                  ie &&
                                                    a.jsx("span", {
                                                      className:
                                                        "absolute top-1.5 right-1.5 text-[#38A325]",
                                                      children: a.jsx(Ny, {
                                                        className:
                                                          "w-3.5 h-3.5 fill-[#38A325] text-white",
                                                      }),
                                                    }),
                                                ],
                                              },
                                              J.id,
                                            );
                                          }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              a.jsxs("div", {
                                className: "lg:col-span-3 space-y-4",
                                children: [
                                  a.jsxs("div", {
                                    className:
                                      "bg-white border border-[#1A1A1A]/10 rounded-2xl p-3 shadow-xs space-y-2",
                                    children: [
                                      a.jsx("p", {
                                        className:
                                          "text-[9px] uppercase font-bold text-gray-400 tracking-wider",
                                        children: "Choose Bundle Length",
                                      }),
                                      a.jsxs("div", {
                                        className:
                                          "grid grid-cols-2 gap-1 bg-[#EFECE5]/50 p-1 rounded-lg",
                                        children: [
                                          a.jsx("button", {
                                            onClick: () => le("weekly"),
                                            className: `py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${G === "weekly" ? "bg-[#38A325] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`,
                                            children: "Weekly (6-Day)",
                                          }),
                                          a.jsx("button", {
                                            onClick: () => le("monthly"),
                                            className: `py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${G === "monthly" ? "bg-[#38A325] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`,
                                            children: "Monthly (24-Day)",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  a.jsxs("div", {
                                    className:
                                      "bg-[#1A1A1A] text-white border border-white/5 rounded-2xl p-4 shadow-md space-y-3.5 relative overflow-hidden",
                                    children: [
                                      a.jsx("div", {
                                        className:
                                          "absolute right-0 top-0 w-24 h-24 bg-[#38A325]/10 rounded-full filter blur-xl",
                                      }),
                                      a.jsxs("div", {
                                        className:
                                          "border-b border-white/10 pb-2",
                                        children: [
                                          a.jsx("span", {
                                            className:
                                              "text-[8.5px] font-bold text-[#38A325] bg-[#38A325]/15 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider leading-none",
                                            children: "Custom Bill Summary",
                                          }),
                                          a.jsx("h4", {
                                            className:
                                              "text-xs font-sans font-extrabold mt-1 text-white tracking-wide uppercase flex items-center gap-1.5",
                                            children: a.jsx("span", {
                                              children:
                                                G === "monthly"
                                                  ? "👑 24-Day Sub"
                                                  : "✨ 6-Day Combo",
                                            }),
                                          }),
                                        ],
                                      }),
                                      a.jsxs("div", {
                                        className:
                                          "space-y-1 bg-white/5 p-2 rounded-xl border border-white/5 max-h-56 overflow-y-auto scrollbar-none",
                                        children: [
                                          a.jsxs("div", {
                                            className:
                                              "flex items-center justify-between border-b border-white/10 pb-1.5 px-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400",
                                            children: [
                                              a.jsx("span", {
                                                children: "Daily Blueprint",
                                              }),
                                              a.jsx("span", {
                                                className: "text-emerald-400",
                                                children: "Setup Active",
                                              }),
                                            ],
                                          }),
                                          Object.keys(U).map((J) => {
                                            const ie = U[J],
                                              ce = te[J] || {
                                                juiceIds: [],
                                                snackIds: [],
                                              },
                                              je = ws.filter((Ie) => {
                                                var tn;
                                                return (tn = ce.juiceIds) ==
                                                  null
                                                  ? void 0
                                                  : tn.includes(Ie.id);
                                              }),
                                              pe = js.filter((Ie) => {
                                                var tn;
                                                return (tn = ce.snackIds) ==
                                                  null
                                                  ? void 0
                                                  : tn.includes(Ie.id);
                                              }),
                                              He =
                                                je
                                                  .map((Ie) =>
                                                    Ie.name
                                                      .replace(" Juice", "")
                                                      .replace(" Valencia", "")
                                                      .replace(" Cleanse", "")
                                                      .replace(" Booster", "")
                                                      .replace(" Shake", "")
                                                      .replace(" Drink", ""),
                                                  )
                                                  .join(" & ") || "No Drink",
                                              At =
                                                pe.length === 0
                                                  ? "Juice Only"
                                                  : pe
                                                      .map((Ie) =>
                                                        Ie.name
                                                          .replace(
                                                            " Sprouts Bowl",
                                                            "",
                                                          )
                                                          .replace(
                                                            " Classic ",
                                                            "",
                                                          )
                                                          .replace(
                                                            " Fruit Platter",
                                                            " Fruit",
                                                          )
                                                          .replace(" Bowl", "")
                                                          .replace(" Cup", "")
                                                          .replace(
                                                            " Power",
                                                            "",
                                                          ),
                                                      )
                                                      .join(" & "),
                                              De =
                                                je
                                                  .map((Ie) => Ie.icon)
                                                  .join("") || "🥤",
                                              Ze =
                                                pe.length === 0
                                                  ? "❌"
                                                  : pe
                                                      .map((Ie) => Ie.icon)
                                                      .join("");
                                            return a.jsxs(
                                              "div",
                                              {
                                                className:
                                                  "grid grid-cols-[58px_1fr_12px_1fr] items-center gap-1.5 text-[9px] py-1.5 last:border-b-0 border-b border-white/5 hover:bg-white/5 px-1 rounded transition-colors",
                                                children: [
                                                  a.jsxs("span", {
                                                    className:
                                                      "text-gray-300 font-bold flex items-center space-x-1 min-w-0",
                                                    children: [
                                                      a.jsx("span", {
                                                        className:
                                                          "text-[10px] shrink-0 select-none",
                                                        children: ie.icon,
                                                      }),
                                                      a.jsx("span", {
                                                        className:
                                                          "uppercase text-gray-400 text-[8.5px] tracking-wide font-sans",
                                                        children:
                                                          ie.label.slice(0, 3),
                                                      }),
                                                    ],
                                                  }),
                                                  a.jsxs("span", {
                                                    className:
                                                      "truncate text-gray-100 font-medium flex items-center space-x-1 min-w-0",
                                                    title: je
                                                      .map((Ie) => Ie.name)
                                                      .join(", "),
                                                    children: [
                                                      a.jsx("span", {
                                                        className:
                                                          "text-[10px] shrink-0 select-none",
                                                        children: De,
                                                      }),
                                                      a.jsx("span", {
                                                        className: "truncate",
                                                        children: He,
                                                      }),
                                                    ],
                                                  }),
                                                  a.jsx("span", {
                                                    className:
                                                      "text-gray-500 text-[8px] font-bold text-center select-none",
                                                    children: "+",
                                                  }),
                                                  a.jsxs("span", {
                                                    className:
                                                      "truncate text-gray-400 font-medium flex items-center space-x-1 min-w-0",
                                                    title: pe
                                                      .map((Ie) => Ie.name)
                                                      .join(", "),
                                                    children: [
                                                      a.jsx("span", {
                                                        className:
                                                          "text-[10px] shrink-0 select-none",
                                                        children: Ze,
                                                      }),
                                                      a.jsx("span", {
                                                        className: "truncate",
                                                        children: At,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              },
                                              J,
                                            );
                                          }),
                                        ],
                                      }),
                                      a.jsxs("div", {
                                        className: "space-y-1.5 text-xs",
                                        children: [
                                          a.jsxs("div", {
                                            className:
                                              "flex justify-between text-gray-300 border-b border-white/10 pb-1.5",
                                            children: [
                                              a.jsx("span", {
                                                className: "text-[10px]",
                                                children: "Configured subtotal",
                                              }),
                                              a.jsxs("span", {
                                                className:
                                                  "font-mono text-[10px] text-stone-300 font-bold",
                                                children: ["₹", ue],
                                              }),
                                            ],
                                          }),
                                          a.jsxs("div", {
                                            className:
                                              "pt-1 flex justify-between items-baseline",
                                            children: [
                                              a.jsx("span", {
                                                className:
                                                  "text-[10px] text-gray-400 font-bold uppercase",
                                                children: "Total Price",
                                              }),
                                              a.jsxs("span", {
                                                className:
                                                  "text-base font-sans font-black text-[#38A325]",
                                                children: ["₹", ge],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      a.jsxs("div", {
                                        className:
                                          "text-[8.5px] text-gray-400 leading-relaxed pt-1 flex items-start space-x-1 border-t border-white/5",
                                        children: [
                                          a.jsx("span", { children: "🛵" }),
                                          a.jsx("span", {
                                            children:
                                              "Free Pune core delivery + daily schedule locks included. Cancel or reschedule days anytime.",
                                          }),
                                        ],
                                      }),
                                      a.jsxs("div", {
                                        className:
                                          "space-y-2 pt-1 border-t border-white/10",
                                        children: [
                                          a.jsxs("button", {
                                            onClick: Be,
                                            disabled: ue === 0,
                                            className: `w-full py-2 px-3 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm ${ue === 0 ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5" : "bg-[#38A325] hover:bg-[#38A325]/95 active:scale-95 text-white cursor-pointer"}`,
                                            children: [
                                              a.jsx("svg", {
                                                className:
                                                  "w-3.5 h-3.5 text-white",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "3",
                                                viewBox: "0 0 24 24",
                                                children: a.jsx("path", {
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round",
                                                  d: "M12 4.5v15m7.5-7.5h-15",
                                                }),
                                              }),
                                              a.jsx("span", {
                                                children:
                                                  ue === 0
                                                    ? "Select Items to Build Plan"
                                                    : "Add to Cart",
                                              }),
                                            ],
                                          }),
                                          a.jsxs("button", {
                                            onClick: Le,
                                            disabled: ue === 0,
                                            className: `w-full py-2 px-3 rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm ${ue === 0 ? "bg-neutral-800/40 text-neutral-500 cursor-not-allowed border border-white/5" : "bg-white text-gray-900 hover:bg-gray-100 active:scale-95 cursor-pointer"}`,
                                            children: [
                                              a.jsx("svg", {
                                                className:
                                                  "w-3 h-3 fill-current text-green-600",
                                                viewBox: "0 0 24 24",
                                                children: a.jsx("path", {
                                                  d: "M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.887 1.28c5.505 0 9.988-4.478 9.989-9.985v-.012C22 6.478 17.518 2 12.012 2zm4.986 14.108c-.273.767-1.345 1.388-1.887 1.48-.485.082-.98.156-3.13-.734-2.15-.89-3.534-3.075-3.641-3.218-.107-.144-.863-1.148-.863-2.19 0-1.042.545-1.554.739-1.765.193-.21.428-.263.57-.263h.406c.128 0 .3.047.47.45.17.41.597 1.455.648 1.56.052.107.086.23.013.374-.072.144-.11.23-.217.359-.11.13-.23.29-.327.391-.107.111-.22.23-.094.444.125.214.557.917 1.194 1.485.819.73 1.507.955 1.721 1.062.214.107.34.09.467-.056.128-.147.548-.64.694-.858.147-.217.29-.181.49-.107s1.265.597 1.482.705c.217.107.362.164.416.257.054.094.054.545-.22 1.312z",
                                                }),
                                              }),
                                              a.jsx("span", {
                                                children: "Build via WhatsApp",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      "custom",
                    ),
                ],
              }),
            ],
          }),
          a.jsx(Hn, {
            children:
              y &&
              a.jsxs(Ke.div, {
                initial: { opacity: 0, y: 50, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 50, scale: 0.9 },
                className:
                  "fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-8 py-4.5 rounded-2xl shadow-2xl flex items-center space-x-3.5 z-50 border border-white/10",
                children: [
                  a.jsx("div", {
                    className:
                      "p-1 px-1.5 bg-[#38A325] rounded-full text-white text-xs",
                    children: "✔",
                  }),
                  a.jsxs("div", {
                    children: [
                      a.jsx("p", {
                        className: "font-bold text-sm tracking-wide",
                        children: "Subscription Selected!",
                      }),
                      a.jsxs("p", {
                        className: "text-[10px] text-gray-400",
                        children: [
                          "Connecting to FresCo WhatsApp concierge to lock in ",
                          y,
                          "...",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
          }),
        ],
      }),
    ],
  });
}
const _b = "/assets/ABC_Wellness_Combo-Bn9ek92Q.png",
  KA = "/assets/Immunity_Shield_Special-R0w86077.png",
  WA = "/assets/Golden_Glow_Special-Dii4zYLo.png",
  $A = "/assets/Muscle_Refill_Special-D8rjMEd7.png",
  uc = [
    {
      id: "combo_glow_thursday",
      name: "Golden Glow Special",
      badge: "SKIN GLOW",
      badgeIcon: "✨",
      image: WA,
      subtitle: "SKIN GLOW-UP JUICE + POWER PACKED CUP",
      description:
        "A refreshing beauty-focused pairing packed with fresh fruits, seeds and superfoods.",
      tags: ["Antioxidants", "Vitamin C", "Superfoods"],
      price: 199,
      originalPrice: 218,
      saveAmount: 19,
    },
    {
      id: "combo_fitness_friday",
      name: "Muscle-Refill Special",
      badge: "ATHLETE PICK",
      badgeIcon: "💪",
      image: $A,
      subtitle: "FAT-BURNING + 35G PROTEIN CHICKEN BOWL",
      description:
        "A fitness-focused combination delivering protein, fiber and lasting energy.",
      tags: ["35g Protein", "High Fiber", "Fitness"],
      price: 299,
      originalPrice: 318,
      saveAmount: 19,
    },
    {
      id: "combo_detox_monday",
      name: "ABC Wellness Combo",
      badge: "POPULAR",
      badgeIcon: "🌱", 
      image: _b,
      subtitle: "ABC JUICE + SPROUTS BOWL",
      description:
        "Fresh ABC Juice paired with our protein-rich Sprouts Bowl for a refreshing wellness meal.",
      tags: ["Vitamins", "Antioxidants", "Fiber"],
      price: 161,
      originalPrice: 178,
      saveAmount: 17,
    },
    {
      id: "combo_immuno_tuesday",
      name: "Immunity Shield Special",
      badge: "IMMUNITY BOOST",
      badgeIcon: "🛡️",
      image: KA,
      subtitle: "IMMUNITY BOOSTER JUICE + EXOTIC DELIGHT CUP",
      description:
        "A refreshing antioxidant-rich pairing with fresh fruits and immunity-supporting ingredients.",
      tags: ["Vitamin C", "Antioxidants", "Fresh Fruits"],
      price: 179,
      originalPrice: 198,
      saveAmount: 19,
    },
  ];
