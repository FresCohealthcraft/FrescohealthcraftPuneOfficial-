import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Shield, FileSpreadsheet, Package, Trash2, TrendingUp, CheckCircle, Bell, Users, 
  Calendar, Clock, RefreshCw, Send, Pause, Play, Check, Search, Plus, Filter, Edit, 
  ChevronRight, Sparkles, AlertCircle, Award, DollarSign, BarChart2, Briefcase, Settings, 
  ShoppingBag, Tag, Image as ImageIcon, HelpCircle, LogOut, Menu 
} from "lucide-react";
import { MenuItem, Order, PromoCoupon } from "../types";
import { MENU_ITEMS } from "../data";
// @ts-ignore
import frescoLogo from "../assets/images/fresco_logo.png";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  onDuty: boolean;
  shift: string;
  permissions: {
    orders: boolean;
    products: boolean;
    staff: boolean;
    reports: boolean;
  };
}

interface Ingredient {
  id: string;
  name: string;
  category: "Fruits" | "Vegetables" | "Cups & Plate" | "Herbs" | "Spices" | "Others";
  stock: number; // in kg
  maxStock: number; // in kg
  unit: string;
  reorderLevel: number;
  supplier: string;
  lastUpdated: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  spent: string;
  orders: string;
  status: "Active" | "Deactivated";
  subscribedPlan: string;
  subscriptionStartDate: string;
  subscriptionExpiryDate: string;
  registeredDate: string;
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  // Authentication State
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("fresco_admin_auth") === "true";
  });
  const [authError, setAuthError] = useState("");

  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "orders" | "products" | "customers" | "inventory" | "analytics" | "settings"
  >("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dynamic Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [analyticsTab, setAnalyticsTab] = useState<"weekly" | "monthly" | "yearly" | "unit-cost">("monthly");

  // Interactive Product Cost Calculator States
  const [costFruit, setCostFruit] = useState<number>(15.0);
  const [costCupLid, setCostCupLid] = useState<number>(4.5);
  const [costPackaging, setCostPackaging] = useState<number>(2.0);
  const [costDelivery, setCostDelivery] = useState<number>(5.0);
  const [costElectricity, setCostElectricity] = useState<number>(1.5);
  const [costRent, setCostRent] = useState<number>(3.5);
  const [costOperations, setCostOperations] = useState<number>(1.5);
  const [costSellingPrice, setCostSellingPrice] = useState<number>(120.0);
  const [selectedCostJuiceName, setSelectedCostJuiceName] = useState<string>("Watermelon Splash");

  // Computed values for Product Cost Calculation
  const totalUnitProductionCost = costFruit + costCupLid + costPackaging + costDelivery + costElectricity + costRent + costOperations;
  const unitProfit = costSellingPrice - totalUnitProductionCost;
  const unitMarginPercentage = costSellingPrice > 0 ? (unitProfit / costSellingPrice) * 100 : 0;

  // Helper to parse order timestamp string into Date
  const parseOrderDate = (timestampStr: string): Date => {
    if (!timestampStr) return new Date();
    try {
      const parts = timestampStr.split(",");
      const dateParts = parts[0].trim().split("/");
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);
        return new Date(year, month, day);
      }
      const parsed = Date.parse(timestampStr);
      if (!isNaN(parsed)) return new Date(parsed);
    } catch (e) {}
    return new Date();
  };

  // Dynamic Weekly Calculations
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weeklyOrders = orders.filter(o => {
    const d = parseOrderDate(o.timestamp);
    return d >= oneWeekAgo;
  });
  const weeklyRevenue = weeklyOrders.reduce((sum, o) => sum + (o.payableAmount || 0), 0);
  const weeklyOrdersCount = weeklyOrders.length;

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const revenueByDay = [0, 0, 0, 0, 0, 0, 0];
  const countByDay = [0, 0, 0, 0, 0, 0, 0];

  orders.forEach(o => {
    const d = parseOrderDate(o.timestamp);
    const dayIndex = d.getDay();
    revenueByDay[dayIndex] += o.payableAmount || 0;
    countByDay[dayIndex] += 1;
  });

  const maxRevenue = Math.max(...revenueByDay);
  const bestDayIndex = revenueByDay.indexOf(maxRevenue);
  const bestDay = maxRevenue > 0 ? daysOfWeek[bestDayIndex] : "None";
  const bestDayRevenue = maxRevenue > 0 ? `₹${maxRevenue.toLocaleString()}` : "₹0";

  const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const mapToWeeklyIndex = (dayNum: number) => {
    return dayNum === 0 ? 6 : dayNum - 1;
  };

  const weeklyDayRevenues = [0, 0, 0, 0, 0, 0, 0];
  const weeklyDayOrderCounts = [0, 0, 0, 0, 0, 0, 0];

  weeklyOrders.forEach(o => {
    const d = parseOrderDate(o.timestamp);
    const idx = mapToWeeklyIndex(d.getDay());
    weeklyDayRevenues[idx] += o.payableAmount || 0;
    weeklyDayOrderCounts[idx] += 1;
  });

  const maxDayRevenue = Math.max(...weeklyDayRevenues);
  const weeklyBarData = weeklyDays.map((day, idx) => {
    const rev = weeklyDayRevenues[idx];
    const pct = maxDayRevenue > 0 ? (rev / maxDayRevenue) * 100 : 0;
    return {
      day,
      val: pct,
      label: `₹${rev.toLocaleString()}`,
      orders: weeklyDayOrderCounts[idx]
    };
  });

  const daysFullName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weeklyLedgerRows = daysFullName.map((day, idx) => {
    const rev = weeklyDayRevenues[idx];
    const count = weeklyDayOrderCounts[idx];
    
    const categoryCounts: { [key: string]: number } = {};
    weeklyOrders.forEach(o => {
      const d = parseOrderDate(o.timestamp);
      if (mapToWeeklyIndex(d.getDay()) === idx) {
        o.items?.forEach(item => {
          const cat = item.menuItem?.category || "Juices";
          categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity;
        });
      }
    });
    
    let topCategory = "None";
    let maxCatCount = 0;
    Object.entries(categoryCounts).forEach(([cat, cCount]) => {
      if (cCount > maxCatCount) {
        maxCatCount = cCount;
        topCategory = cat;
      }
    });

    return {
      day,
      orders: count,
      revenue: rev,
      category: topCategory,
      rate: count > 0 ? "100%" : "—"
    };
  });

  // Highlight Products and Subscriptions
  const itemQuantities: { [key: string]: number } = {};
  orders.forEach(o => {
    o.items?.forEach(item => {
      const name = item.menuItem?.name || item.id;
      itemQuantities[name] = (itemQuantities[name] || 0) + item.quantity;
    });
  });

  const sortedItemsByDemand = Object.entries(itemQuantities)
    .sort((a, b) => b[1] - a[1]);

  const top1Juice = sortedItemsByDemand[0] ? sortedItemsByDemand[0][0] : "Watermelon Splash";
  const top2Juice = sortedItemsByDemand[1] ? sortedItemsByDemand[1][0] : "Green Purifier";

  // Dynamic Monthly Calculations
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyOrders = orders.filter(o => {
    const d = parseOrderDate(o.timestamp);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyOrders.reduce((sum, o) => sum + (o.payableAmount || 0), 0);
  const monthlyOrdersCount = monthlyOrders.length;

  const totalMonthlyBottlesSold = monthlyOrders.reduce((sum, o) => {
    const itemsQty = o.items?.reduce((s, item) => s + item.quantity, 0) || 0;
    return sum + itemsQty;
  }, 0);

  const monthlyExpense = Math.round(totalMonthlyBottlesSold * totalUnitProductionCost);
  const monthlyNetProfit = Math.max(0, monthlyIncome - monthlyExpense);
  const monthlyProfitMargin = monthlyIncome > 0 ? ((monthlyNetProfit / monthlyIncome) * 100).toFixed(1) : "0.0";

  // Dynamic monthly expense category allocations based on active unit cost attributes
  const expenseFruits = Math.round(totalMonthlyBottlesSold * costFruit);
  const expenseCups = Math.round(totalMonthlyBottlesSold * costCupLid);
  const expenseElectricity = Math.round(totalMonthlyBottlesSold * costElectricity);

  const rawFruitsPct = totalUnitProductionCost > 0 ? ((costFruit / totalUnitProductionCost) * 100).toFixed(1) : "0.0";
  const cupsPct = totalUnitProductionCost > 0 ? ((costCupLid / totalUnitProductionCost) * 100).toFixed(1) : "0.0";
  const electricityPct = totalUnitProductionCost > 0 ? ((costElectricity / totalUnitProductionCost) * 100).toFixed(1) : "0.0";

  // Dynamic subscriber count
  const subscriptionCount = customers.filter(c => c.status === "Active" && c.subscribedPlan !== "None").length;

  const monthlyFruitsConsumed = Math.round(totalMonthlyBottlesSold * 0.4);

  let fruitJuicesQty = 0;
  let veggieJuicesQty = 0;
  let totalJuicesQty = 0;

  monthlyOrders.forEach(o => {
    o.items?.forEach(item => {
      const cat = (item.menuItem?.category || "").toLowerCase();
      if (cat.includes("green") || cat.includes("veggie") || cat.includes("vitality")) {
        veggieJuicesQty += item.quantity;
      } else {
        fruitJuicesQty += item.quantity;
      }
      totalJuicesQty += item.quantity;
    });
  });

  const fruitJuicesPct = totalJuicesQty > 0 ? Math.round((fruitJuicesQty / totalJuicesQty) * 100) : 0;
  const veggieJuicesPct = totalJuicesQty > 0 ? Math.round((veggieJuicesQty / totalJuicesQty) * 100) : 0;

  const locationCounts: { [key: string]: number } = {};
  orders.forEach(o => {
    const loc = o.puneLocation || "Pune";
    locationCounts[loc] = (locationCounts[loc] || 0) + 1;
  });

  const sortedLocations = Object.entries(locationCounts).sort((a, b) => b[1] - a[1]);
  const loc1 = sortedLocations[0] ? sortedLocations[0][0] : "Hadapsar";
  const loc1Count = sortedLocations[0] ? sortedLocations[0][1] : 0;
  const loc2 = sortedLocations[1] ? sortedLocations[1][0] : "Koregaon Pk";
  const loc2Count = sortedLocations[1] ? sortedLocations[1][1] : 0;
  const loc3 = sortedLocations[2] ? sortedLocations[2][0] : "Kothrud";
  const loc3Count = sortedLocations[2] ? sortedLocations[2][1] : 0;

  const totalLocCount = loc1Count + loc2Count + loc3Count;
  const loc1Pct = totalLocCount > 0 ? Math.round((loc1Count / totalLocCount) * 100) : 0;
  const loc2Pct = totalLocCount > 0 ? Math.round((loc2Count / totalLocCount) * 100) : 0;
  const loc3Pct = totalLocCount > 0 ? Math.round((loc3Count / totalLocCount) * 100) : 0;

  const monthsNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthlyLedgerData: { [key: string]: { income: number; expense: number; ordersCount: number; subscriberCount: number; aov: number } } = {};

  orders.forEach(o => {
    const d = parseOrderDate(o.timestamp);
    const mKey = `${monthsNames[d.getMonth()]} ${d.getFullYear()}`;
    if (!monthlyLedgerData[mKey]) {
      monthlyLedgerData[mKey] = { income: 0, expense: 0, ordersCount: 0, subscriberCount: 0, aov: 0 };
    }
    const data = monthlyLedgerData[mKey];
    data.income += o.payableAmount || 0;
    
    const qty = o.items?.reduce((s, item) => s + item.quantity, 0) || 0;
    data.expense += Math.round(qty * totalUnitProductionCost);
    data.ordersCount += 1;
  });

  const monthlyLedgerRows = Object.entries(monthlyLedgerData).map(([mKey, data]) => {
    const aov = data.ordersCount > 0 ? data.income / data.ordersCount : 0;
    const netProfit = Math.max(0, data.income - data.expense);
    const marginPct = data.income > 0 ? ((netProfit / data.income) * 100).toFixed(1) + "%" : "0.0%";
    
    return {
      month: mKey,
      income: data.income,
      expense: data.expense,
      subscribers: customers.filter(c => c.status === "Active" && c.subscribedPlan !== "None").length,
      aov,
      margin: marginPct
    };
  });

  if (monthlyLedgerRows.length === 0) {
    const currentMonthKey = `${monthsNames[currentMonth]} ${currentYear}`;
    monthlyLedgerRows.push({
      month: currentMonthKey,
      income: 0,
      expense: 0,
      subscribers: 0,
      aov: 0,
      margin: "0.0%"
    });
  }

  // Dynamic Yearly Calculations
  const yearlyRevenue = orders.reduce((sum, o) => sum + (o.payableAmount || 0), 0);
  const totalBottlesSoldAllTime = orders.reduce((sum, o) => sum + (o.items?.reduce((s, item) => s + item.quantity, 0) || 0), 0);
  const yearlyExpense = Math.round(totalBottlesSoldAllTime * totalUnitProductionCost);
  const yearlyNetProfit = Math.max(0, yearlyRevenue - yearlyExpense);
  const yearlyOrdersCount = orders.length;

  const yearlyFruitsConsumed = Math.round(totalBottlesSoldAllTime * 0.4);

  const yearlyProgressionData = monthsNames.map((mName, idx) => {
    let cost = 0;
    let profit = 0;
    let total = 0;
    
    orders.forEach(o => {
      const d = parseOrderDate(o.timestamp);
      if (d.getMonth() === idx && d.getFullYear() === currentYear) {
        total += o.payableAmount || 0;
        const qty = o.items?.reduce((s, item) => s + item.quantity, 0) || 0;
        cost += qty * totalUnitProductionCost;
      }
    });
    
    profit = Math.max(0, total - cost);
    
    return {
      month: mName.substring(0, 3),
      cost,
      profit,
      total,
      label: `₹${(total / 1000).toFixed(1)}k`,
      highlight: idx === currentMonth
    };
  });

  const maxMonthTotal = Math.max(...yearlyProgressionData.map(item => item.total)) || 1;
  const scaledYearlyProgression = yearlyProgressionData.map(item => {
    return {
      ...item,
      costPct: (item.cost / maxMonthTotal) * 100,
      profitPct: (item.profit / maxMonthTotal) * 100
    };
  });

  const yearlyTopProducts = sortedItemsByDemand.slice(0, 4).map(([name, qty]) => {
    const totalVolume = sortedItemsByDemand.reduce((s, x) => s + x[1], 0) || 1;
    const share = ((qty / totalVolume) * 100).toFixed(1) + "%";
    return {
      name,
      count: `${qty} units sold`,
      share,
      margin: `${Math.round(unitMarginPercentage)}%`,
      trend: qty > 5 ? "High Demand" : "Stable"
    };
  });

  if (yearlyTopProducts.length === 0) {
    products.slice(0, 4).forEach((p) => {
      yearlyTopProducts.push({
        name: `${p.icon} ${p.name}`,
        count: "0 units sold",
        share: "0%",
        margin: `${Math.round(unitMarginPercentage)}%`,
        trend: "Inactive"
      });
    });
  }

  // Edit / Add Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"product" | "order" | "ingredient">("product");
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State Buffers
  const [productForm, setProductForm] = useState<Partial<MenuItem>>({
    name: "", category: "Fruit Juices", price: 200, description: "", icon: "🥤", benefits: ["", "", ""]
  });
  const [staffForm, setStaffForm] = useState<Partial<StaffMember>>({
    name: "", role: "Juice Maker", email: "", phone: "", shift: "09:00 AM - 06:00 PM", onDuty: true,
    permissions: { orders: true, products: false, staff: false, reports: false }
  });
  const [ingredientForm, setIngredientForm] = useState<Partial<Ingredient>>({
    name: "", category: "Fruits", stock: 100, maxStock: 150, unit: "kg", reorderLevel: 20, supplier: "Pune Farm Wholesale"
  });

  // Notifications
  const [notifications, setNotifications] = useState<string[]>([
    "Admin session initialized. System is live."
  ]);

  // Helper to generate date formatted string relative to current date
  const getFormattedDateOffset = (daysOffset: number): string => {
    const d = new Date();
    d.setDate(d.getDate() - daysOffset);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(Math.floor(Math.random() * 5) + 9).padStart(2, '0');
    const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${dd}/${mm}/${yyyy}, ${hh}:${min}:00`;
  };

  const getSeededOrders = (): Order[] => [
    {
      id: "FR-1001",
      customerName: "Rohan Mehta",
      address: "Noble Hospital Road, Hadapsar, Pune",
      phone: "9876543210",
      email: "rohan@gmail.com",
      puneLocation: "Hadapsar",
      status: "delivered",
      timestamp: getFormattedDateOffset(0),
      totalBeforePromo: 118,
      discountValue: 0,
      payableAmount: 118,
      items: [
        {
          id: "Watermelon-Juice-1",
          menuItem: { id: "Watermelon-Juice", name: "Watermelon Juice", category: "Fruit Juices", price: 59, icon: "🍉", description: "Keeps You Hydrated" },
          quantity: 2,
          finalPrice: 118
        }
      ]
    },
    {
      id: "FR-1002",
      customerName: "Anjali Sharma",
      address: "DP Road, Kothrud, Pune",
      phone: "9823456781",
      email: "anjali@gmail.com",
      puneLocation: "Kothrud",
      status: "delivered",
      timestamp: getFormattedDateOffset(1),
      totalBeforePromo: 207,
      discountValue: 0,
      payableAmount: 207,
      items: [
        {
          id: "Mosambi-Juice-1",
          menuItem: { id: "Mosambi-Juice", name: "Mosambi Juice", category: "Fruit Juices", price: 69, icon: "🍊", description: "Vitamin C immunity booster" },
          quantity: 3,
          finalPrice: 207
        }
      ]
    },
    {
      id: "FR-1003",
      customerName: "Amit Patel",
      address: "Lane 5, Koregaon Park, Pune",
      phone: "9890123456",
      email: "amit@gmail.com",
      puneLocation: "Koregaon Park",
      status: "delivered",
      timestamp: getFormattedDateOffset(2),
      totalBeforePromo: 138,
      discountValue: 0,
      payableAmount: 138,
      items: [
        {
          id: "Pineapple-Juice-1",
          menuItem: { id: "Pineapple-Juice", name: "Pineapple Juice", category: "Fruit Juices", price: 69, icon: "🍍", description: "Bromelain-rich refreshing juice" },
          quantity: 2,
          finalPrice: 138
        }
      ]
    },
    {
      id: "FR-1004",
      customerName: "Priya Nair",
      address: "JM Road, Shivaji Nagar, Pune",
      phone: "9765432109",
      email: "priya@gmail.com",
      puneLocation: "Shivaji Nagar",
      status: "delivered",
      timestamp: getFormattedDateOffset(3),
      totalBeforePromo: 237,
      discountValue: 0,
      payableAmount: 237,
      items: [
        {
          id: "Mango-Juice-1",
          menuItem: { id: "Mango-Juice", name: "Mango Juice", category: "Fruit Juices", price: 79, icon: "🥭", description: "Rich, luscious juice" },
          quantity: 3,
          finalPrice: 237
        }
      ]
    },
    {
      id: "FR-1005",
      customerName: "Sneha Rao",
      address: "Amanora Park Town, Hadapsar, Pune",
      phone: "9545123489",
      email: "sneha@gmail.com",
      puneLocation: "Hadapsar",
      status: "confirmed",
      timestamp: getFormattedDateOffset(4),
      totalBeforePromo: 158,
      discountValue: 0,
      payableAmount: 158,
      items: [
        {
          id: "Apple-Juice-1",
          menuItem: { id: "Apple-Juice", name: "Apple Juice", category: "Fruit Juices", price: 79, icon: "🍎", description: "Crisp and refreshing juice sweet apple juice" },
          quantity: 2,
          finalPrice: 158
        }
      ]
    },
    {
      id: "FR-1006",
      customerName: "Vikram Singh",
      address: "Ideal Colony, Kothrud, Pune",
      phone: "9123456789",
      email: "vikram@gmail.com",
      puneLocation: "Kothrud",
      status: "delivered",
      timestamp: getFormattedDateOffset(5),
      totalBeforePromo: 118,
      discountValue: 0,
      payableAmount: 118,
      items: [
        {
          id: "Watermelon-Juice-2",
          menuItem: { id: "Watermelon-Juice", name: "Watermelon Juice", category: "Fruit Juices", price: 59, icon: "🍉", description: "Keeps You Hydrated" },
          quantity: 2,
          finalPrice: 118
        }
      ]
    },
    {
      id: "FR-1007",
      customerName: "Nisha Joshi",
      address: "North Main Road, Koregaon Park, Pune",
      phone: "9654123098",
      email: "nisha@gmail.com",
      puneLocation: "Koregaon Park",
      status: "delivered",
      timestamp: getFormattedDateOffset(6),
      totalBeforePromo: 138,
      discountValue: 0,
      payableAmount: 138,
      items: [
        {
          id: "Pineapple-Juice-2",
          menuItem: { id: "Pineapple-Juice", name: "Pineapple Juice", category: "Fruit Juices", price: 69, icon: "🍍", description: "Bromelain-rich refreshing juice" },
          quantity: 2,
          finalPrice: 138
        }
      ]
    },
    {
      id: "FR-1008",
      customerName: "Karan Johar",
      address: "Bhusari Colony, Kothrud, Pune",
      phone: "9988776655",
      email: "karan@gmail.com",
      puneLocation: "Kothrud",
      status: "delivered",
      timestamp: getFormattedDateOffset(2),
      totalBeforePromo: 158,
      discountValue: 0,
      payableAmount: 158,
      items: [
        {
          id: "Mango-Juice-2",
          menuItem: { id: "Mango-Juice", name: "Mango Juice", category: "Fruit Juices", price: 79, icon: "🥭", description: "Rich, luscious juice" },
          quantity: 2,
          finalPrice: 158
        }
      ]
    },
    {
      id: "FR-1009",
      customerName: "Pooja Hegde",
      address: "Kalyani Nagar, Pune",
      phone: "9876123405",
      email: "pooja@gmail.com",
      puneLocation: "Koregaon Park",
      status: "pending",
      timestamp: getFormattedDateOffset(0),
      totalBeforePromo: 237,
      discountValue: 0,
      payableAmount: 237,
      items: [
        {
          id: "Apple-Juice-2",
          menuItem: { id: "Apple-Juice", name: "Apple Juice", category: "Fruit Juices", price: 79, icon: "🍎", description: "Crisp and refreshing sweet apple juice" },
          quantity: 3,
          finalPrice: 237
        }
      ]
    },
    {
      id: "FR-1010",
      customerName: "Rahul Deshmukh",
      address: "Sadesatranali, Hadapsar, Pune",
      phone: "9012345678",
      email: "rahul_d@gmail.com",
      puneLocation: "Hadapsar",
      status: "delivered",
      timestamp: getFormattedDateOffset(7),
      totalBeforePromo: 207,
      discountValue: 0,
      payableAmount: 207,
      items: [
        {
          id: "Mosambi-Juice-2",
          menuItem: { id: "Mosambi-Juice", name: "Mosambi Juice", category: "Fruit Juices", price: 69, icon: "🍊", description: "Vitamin C immunity booster" },
          quantity: 3,
          finalPrice: 207
        }
      ]
    }
  ];

  const getSeededCustomers = (): Customer[] => [
    {
      id: "cust-101",
      name: "Rohan Mehta",
      email: "rohan@gmail.com",
      phone: "9876543210",
      spent: "118",
      orders: "1",
      status: "Active",
      subscribedPlan: "Daily Refresh Plan",
      subscriptionStartDate: "10/06/2026",
      subscriptionExpiryDate: "10/07/2026",
      registeredDate: "10/06/2026"
    },
    {
      id: "cust-102",
      name: "Anjali Sharma",
      email: "anjali@gmail.com",
      phone: "9823456781",
      spent: "207",
      orders: "1",
      status: "Active",
      subscribedPlan: "Fresco Power Plan",
      subscriptionStartDate: "12/06/2026",
      subscriptionExpiryDate: "12/07/2026",
      registeredDate: "12/06/2026"
    },
    {
      id: "cust-103",
      name: "Amit Patel",
      email: "amit@gmail.com",
      phone: "9890123456",
      spent: "138",
      orders: "1",
      status: "Active",
      subscribedPlan: "Weekly Cleanse Plan",
      subscriptionStartDate: "15/06/2026",
      subscriptionExpiryDate: "15/07/2026",
      registeredDate: "15/06/2026"
    },
    {
      id: "cust-104",
      name: "Priya Nair",
      email: "priya@gmail.com",
      phone: "9765432109",
      spent: "237",
      orders: "1",
      status: "Active",
      subscribedPlan: "None",
      subscriptionStartDate: "—",
      subscriptionExpiryDate: "—",
      registeredDate: "18/06/2026"
    }
  ];

  const getSeededInventory = (): Ingredient[] => [
    { id: "ing-101", name: "Fresh Watermelon", category: "Fruits", stock: 0, maxStock: 150, unit: "kg", reorderLevel: 25, supplier: "Pune Farm Wholesale", lastUpdated: "27/06/2026" },
    { id: "ing-102", name: "Organic Mosambi", category: "Fruits", stock: 0, maxStock: 200, unit: "kg", reorderLevel: 30, supplier: "Satara Farmers Coop", lastUpdated: "27/06/2026" },
    { id: "ing-103", name: "Sweet Pineapple", category: "Fruits", stock: 0, maxStock: 120, unit: "kg", reorderLevel: 20, supplier: "Kokan Fruit Suppliers", lastUpdated: "27/06/2026" },
    { id: "ing-104", name: "Alphonso Mango pulp", category: "Fruits", stock: 0, maxStock: 100, unit: "kg", reorderLevel: 15, supplier: "Ratnagiri Farms", lastUpdated: "27/06/2026" },
    { id: "ing-105", name: "Himachal Apples", category: "Fruits", stock: 0, maxStock: 100, unit: "kg", reorderLevel: 15, supplier: "Simla Orchard Direct", lastUpdated: "27/06/2026" },
    { id: "ing-106", name: "Fresh Mint Leaves", category: "Vegetables", stock: 0, maxStock: 25, unit: "kg", reorderLevel: 5, supplier: "Hadapsar Greenhouses", lastUpdated: "27/06/2026" },
    { id: "ing-107", name: "Organic Spinach", category: "Vegetables", stock: 0, maxStock: 50, unit: "kg", reorderLevel: 10, supplier: "Hadapsar Greenhouses", lastUpdated: "27/06/2026" },
    { id: "ing-108", name: "Ginger Root", category: "Vegetables", stock: 0, maxStock: 15, unit: "kg", reorderLevel: 3, supplier: "Pune Spices Market", lastUpdated: "27/06/2026" },
    { id: "ing-109", name: "Paper Cups & Straws", category: "Cups & Plate", stock: 0, maxStock: 1500, unit: "units", reorderLevel: 200, supplier: "EcoPack India", lastUpdated: "27/06/2026" },
    { id: "ing-110", name: "Paper Plates & Spoons", category: "Cups & Plate", stock: 0, maxStock: 1000, unit: "units", reorderLevel: 150, supplier: "EcoPack India", lastUpdated: "27/06/2026" }
  ];

  const getSeededStaff = (): StaffMember[] => [
    {
      id: "st-101",
      name: "Sumit.",
      role: "Outlet Manager",
      email: "frescofruit.pune@gmail.com",
      phone: "+91 9833214560",
      onDuty: true,
      shift: "Morning (07:00 AM - 03:00 PM)",
      permissions: { orders: true, products: true, staff: true, reports: true }
    },
    {
      id: "st-102",
      name: "Rahul K.",
      role: "Lead Barista",
      email: "rahul@frescojuices.com",
      phone: "+91 9765412309",
      onDuty: true,
      shift: "Morning (07:00 AM - 03:00 PM)",
      permissions: { orders: true, products: true, staff: false, reports: false }
    },
    {
      id: "st-103",
      name: "Pooja M.",
      role: "Dispatch Coordinator",
      email: "pooja@frescojuices.com",
      phone: "+91 9545123489",
      onDuty: false,
      shift: "General (10:00 AM - 06:00 PM)",
      permissions: { orders: true, products: false, staff: false, reports: true }
    }
  ];

  // Load and Seed Data Function
  const loadAllData = async () => {
    // 1. Fetch Orders from server
    try {
      const ordersRes = await fetch("/api/orders");
      const serverOrders = await ordersRes.json();
      const currentOrders = serverOrders.filter((o: any) => !o.id.startsWith("FR-1"));
      setOrders(currentOrders);
      localStorage.setItem("fresco_orders", JSON.stringify(currentOrders));
    } catch (e) {
      console.error("AdminPortal: Error loading live orders from server:", e);
      // fallback
      const savedOrders = localStorage.getItem("fresco_orders");
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders).filter((o: any) => !o.id.startsWith("FR-1")));
        } catch (err) {}
      }
    }

    // Load Products (synchronized with App.tsx menu list using real MENU_ITEMS)
    const savedMenu = localStorage.getItem("fresco_menu_items");
    if (savedMenu) {
      try {
        setProducts(JSON.parse(savedMenu));
      } catch (e) {
        setProducts(MENU_ITEMS);
      }
    } else {
      setProducts(MENU_ITEMS);
      localStorage.setItem("fresco_menu_items", JSON.stringify(MENU_ITEMS));
    }

    // Load Staff - live only
    const savedStaff = localStorage.getItem("fresco_staff");
    let currentStaff: StaffMember[] = [];
    if (savedStaff) {
      try {
        const parsed = JSON.parse(savedStaff);
        // Exclude dummy seeded staff starting with st-10
        currentStaff = parsed.filter((s: any) => !s.id.startsWith("st-10"));
      } catch (e) {
        currentStaff = [];
      }
    }
    setStaff(currentStaff);

    // Load Inventory - standard template but starting with 0 stock for live management
    const savedInventory = localStorage.getItem("fresco_inventory");
    let currentInventory: Ingredient[] = [];
    if (savedInventory) {
      try {
        const parsed: Ingredient[] = JSON.parse(savedInventory);
        // Ensure standard templates with 0 stock exist, update categories, and add missing items
        const seeded = getSeededInventory();
        const merged = [...parsed];
        
        // Add any missing standard seeded items
        seeded.forEach(sItem => {
          const existingIdx = merged.findIndex(m => m.id === sItem.id);
          if (existingIdx === -1) {
            merged.push(sItem);
          } else {
            // Update category and names for standard items
            merged[existingIdx].category = sItem.category;
            merged[existingIdx].name = sItem.name;
          }
        });

        currentInventory = merged.map((i: any) => {
          if (i.id.startsWith("ing-10")) {
            // keep stock 0 or whatever they adjusted
            return { ...i, stock: i.stock || 0 };
          }
          return i;
        });
      } catch (e) {
        currentInventory = getSeededInventory();
        localStorage.setItem("fresco_inventory", JSON.stringify(currentInventory));
      }
    } else {
      currentInventory = getSeededInventory();
      localStorage.setItem("fresco_inventory", JSON.stringify(currentInventory));
    }
    // Save back to localStorage to persist updated categories & additions
    localStorage.setItem("fresco_inventory", JSON.stringify(currentInventory));
    setInventory(currentInventory);

    // Load Customers - live only from server
    try {
      const custRes = await fetch("/api/customers");
      const serverCustomers = await custRes.json();
      const currentCustomers = serverCustomers.filter((c: any) => !c.id.startsWith("cust-10"));
      setCustomers(currentCustomers);
      localStorage.setItem("fresco_customers_v3", JSON.stringify(currentCustomers));
    } catch (e) {
      console.error("AdminPortal: Error loading live customers from server:", e);
      // fallback
      const savedCustomers = localStorage.getItem("fresco_customers_v3");
      if (savedCustomers) {
        try {
          setCustomers(JSON.parse(savedCustomers).filter((c: any) => !c.id.startsWith("cust-10")));
        } catch (err) {}
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    loadAllData();

    // Background polling interval (4s) for instant live order updates
    const pollInterval = setInterval(() => {
      loadAllData();
    }, 4000);

    // Listen for storage events to update the dashboard instantly when changes are made
    window.addEventListener("storage", loadAllData);
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("storage", loadAllData);
    };
  }, [isOpen]);

  // Login Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "Sumi@2026") {
      setIsAuthenticated(true);
      setAuthError("");
      localStorage.setItem("fresco_admin_auth", "true");
    } else {
      setAuthError("Incorrect Admin credentials. Access denied.");
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("fresco_admin_auth");
  };

  // State Save Helper with Backend Synch
  const syncStorage = async (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storage")); // Trigger client-side React refresh instantly!

    // Save to server data store
    let endpoint = "";
    if (key === "fresco_orders") endpoint = "/api/orders";
    else if (key === "fresco_customers_v3") endpoint = "/api/customers";
    else if (key === "fresco_subscriptions") endpoint = "/api/subscriptions";

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error(`Failed to push updated ${key} to server database:`, err);
      }
    }
  };

  // Order Operations
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    syncStorage("fresco_orders", updated);
    setNotifications(prev => [`Order #${orderId} marked as ${status}.`, ...prev.slice(0, 4)]);
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    syncStorage("fresco_orders", updated);
  };

  // Product Operations
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (modalMode === "add") {
      const newProduct: MenuItem = {
        id: `m_${Date.now()}`,
        name: productForm.name,
        category: productForm.category || "Fruit Juices",
        price: Number(productForm.price),
        description: productForm.description || "",
        icon: productForm.icon || "🥤",
        popular: false,
        benefits: productForm.benefits?.filter(b => b && b.trim() !== "") || ["Fresh Pressed", "Nutrient Rich", "Pure Raw"]
      };
      const updated = [newProduct, ...products];
      setProducts(updated);
      syncStorage("fresco_menu_items", updated);
    } else {
      const updated = products.map(p => p.id === editingId ? {
        ...p,
        name: productForm.name!,
        category: productForm.category!,
        price: Number(productForm.price!),
        description: productForm.description || p.description,
        icon: productForm.icon || p.icon,
        benefits: productForm.benefits?.filter(b => b && b.trim() !== "") || p.benefits
      } : p);
      setProducts(updated);
      syncStorage("fresco_menu_items", updated);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (prodId: string) => {
    const updated = products.filter(p => p.id !== prodId);
    setProducts(updated);
    syncStorage("fresco_menu_items", updated);
  };

  // Staff Operations
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.role) return;

    if (modalMode === "add") {
      const newStaff: StaffMember = {
        id: `st-${Date.now()}`,
        name: staffForm.name,
        role: staffForm.role,
        email: staffForm.email || "",
        phone: staffForm.phone || "",
        onDuty: staffForm.onDuty ?? true,
        shift: staffForm.shift || "09:00 AM - 06:00 PM",
        permissions: staffForm.permissions || { orders: true, products: false, staff: false, reports: false }
      };
      const updated = [...staff, newStaff];
      setStaff(updated);
      localStorage.setItem("fresco_staff", JSON.stringify(updated));
    } else {
      const updated = staff.map(s => s.id === editingId ? {
        ...s,
        name: staffForm.name!,
        role: staffForm.role!,
        email: staffForm.email || s.email,
        phone: staffForm.phone || s.phone,
        shift: staffForm.shift || s.shift,
        onDuty: staffForm.onDuty ?? s.onDuty,
        permissions: staffForm.permissions || s.permissions
      } : s);
      setStaff(updated);
      localStorage.setItem("fresco_staff", JSON.stringify(updated));
    }
    setIsModalOpen(false);
  };

  const handleToggleStaffDuty = (id: string) => {
    const updated = staff.map(s => s.id === id ? { ...s, onDuty: !s.onDuty } : s);
    setStaff(updated);
    localStorage.setItem("fresco_staff", JSON.stringify(updated));
    const isNowOn = updated.find(s => s.id === id)?.onDuty;
    setNotifications(prev => [`Staff member ${updated.find(s => s.id === id)?.name} is now ${isNowOn ? "On Duty" : "On Leave"}.`, ...prev.slice(0, 4)]);
  };

  const handleToggleCustomerStatus = (id: string) => {
    const updated = customers.map(c => {
      if (c.id === id) {
        const newStatus: "Active" | "Deactivated" = c.status === "Active" ? "Deactivated" : "Active";
        return { ...c, status: newStatus };
      }
      return c;
    });
    setCustomers(updated);
    localStorage.setItem("fresco_customers_v3", JSON.stringify(updated));
    const targetCust = updated.find(c => c.id === id);
    setNotifications(prev => [`Customer ${targetCust?.name} status updated to ${targetCust?.status}.`, ...prev.slice(0, 4)]);
  };

  const calculateRemainingDays = (expiryDateStr: string) => {
    if (!expiryDateStr || expiryDateStr === "N/A") return "N/A";
    const expiryDate = new Date(expiryDateStr);
    const currentDate = new Date("2026-06-27");
    const diffTime = expiryDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : "Expired";
  };

  // Inventory Operations
  const handleSaveIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientForm.name || !ingredientForm.stock) return;

    if (modalMode === "add") {
      const newIng: Ingredient = {
        id: `ing-${Date.now()}`,
        name: ingredientForm.name,
        category: ingredientForm.category as any || "Fruits",
        stock: Number(ingredientForm.stock),
        maxStock: Number(ingredientForm.maxStock || 150),
        unit: ingredientForm.unit || "kg",
        reorderLevel: Number(ingredientForm.reorderLevel || 20),
        supplier: ingredientForm.supplier || "Pune Farm Wholesale",
        lastUpdated: "Just Now"
      };
      const updated = [...inventory, newIng];
      setInventory(updated);
      localStorage.setItem("fresco_inventory", JSON.stringify(updated));
    } else {
      const updated = inventory.map(i => i.id === editingId ? {
        ...i,
        name: ingredientForm.name!,
        category: ingredientForm.category as any || i.category,
        stock: Number(ingredientForm.stock!),
        maxStock: Number(ingredientForm.maxStock || i.maxStock),
        reorderLevel: Number(ingredientForm.reorderLevel || i.reorderLevel),
        supplier: ingredientForm.supplier || i.supplier,
        lastUpdated: "Just Now"
      } : i);
      setInventory(updated);
      localStorage.setItem("fresco_inventory", JSON.stringify(updated));
    }
    setIsModalOpen(false);
  };

  const handleAdjustStock = (ingId: string, amount: number) => {
    const updated = inventory.map(i => {
      if (i.id === ingId) {
        const nextStock = Math.max(0, i.stock + amount);
        return { ...i, stock: nextStock, lastUpdated: "Just Now" };
      }
      return i;
    });
    setInventory(updated);
    localStorage.setItem("fresco_inventory", JSON.stringify(updated));
  };

  // Excel CSV Export
  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order ID", "Customer Name", "Phone", "Location", "Address", "Amount (₹)", "Status", "Date"];
    const rows = orders.map((o) => [
      o.id, o.customerName, o.phone, o.puneLocation, `"${o.address.replace(/"/g, '""')}"`,
      o.payableAmount, o.status, o.timestamp,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Fresco_Orders_Export_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWeeklyReportCSV = () => {
    const headers = ["Day of Week", "Total Orders", "Estimated Revenue (₹)", "Top Selling Category", "Delivery Fulfillment"];
    const rows = weeklyLedgerRows.map((r) => [
      r.day,
      r.orders.toString(),
      r.revenue.toString(),
      r.category,
      r.rate,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Fresco_Weekly_Performance_Report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadMonthlyReportCSV = () => {
    const headers = ["Month Name", "Revenue (₹)", "Active Subscribers", "Avg. Order Value (AOV)", "Net Margin"];
    const rows = monthlyLedgerRows.map((r) => [
      r.month,
      r.income.toString(),
      r.subscribers.toString(),
      r.aov.toFixed(2),
      r.margin,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Fresco_Monthly_Performance_Report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadYearlyReportCSV = () => {
    const headers = ["Month", "Yearly Expenses (₹)", "Yearly Revenue (₹)", "Net P&L (₹)", "Performance Status"];
    const rows = scaledYearlyProgression.map((item) => [
      item.month,
      item.cost.toString(),
      item.total.toString(),
      (item.total - item.cost).toString(),
      item.total > 0 ? "Active Sales" : "No Activity",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Fresco_Yearly_Performance_Report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Aggregated Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== "cancelled" ? o.payableAmount : 0), 0);
  const totalRawCost = inventory.reduce((acc, i) => acc + (i.stock * 45), 0); // ₹45 avg price per kg
  const lowStockCount = inventory.filter(i => i.stock <= i.reorderLevel).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex overflow-hidden font-sans bg-slate-900/60 backdrop-blur-md">
        
        {!isAuthenticated ? (
          /* 🔐 SECURE BRANDED LOGIN CONTAINER */
          <div className="flex items-center justify-center w-full h-full p-4">
            <motion.div 
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-neutral-100 text-center relative overflow-hidden"
            >
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#054A29]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />
              
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-[#054A29] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Shield className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Fresco HealthCraft Admin Panel</h2>
                  <p className="text-xs text-neutral-400">Authenticating access request for FresCo HealthCraft Pune operations.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Owner Passkey</label>
                    <input
                      type="password"
                      placeholder="ENTER PIN..."
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="w-full text-center text-xs p-4 border border-neutral-200 bg-neutral-50 rounded-2xl font-bold tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-[#054A29]"
                    />
                  </div>

                  {authError && (
                    <div className="flex items-center justify-center gap-1 text-red-500 text-[11px] font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#054A29] hover:bg-[#0B4225] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Unlock System Gateway
                  </button>
                </form>

                <button 
                  onClick={onClose}
                  className="text-xs font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  Cancel &amp; Return to Storefront
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* 🖥️ HIGH-FIDELITY ADMINISTRATIVE DASHBOARD SYSTEM */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full h-screen bg-[#F8FAF8] text-neutral-800 overflow-hidden relative"
          >
            {/* Mobile Sidebar Backdrop overlay */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 z-115 bg-slate-900/60 backdrop-blur-xs md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* 1. LEFT SIDEBAR: PURE FOREST GREEN HIGH CONTRAST (Mimicking Screenshot Layout) */}
            <aside className={`
              fixed inset-y-0 left-0 z-120 w-72 bg-[#054A29] text-white flex flex-col h-full shrink-0 select-none border-r border-[#03301B] transition-transform duration-300 md:static md:translate-x-0
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
              
              {/* Brand Logo Header */}
              <div className="p-6 pb-4 border-b border-[#03301B] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-inner overflow-hidden p-1">
                    <img 
                      src={frescoLogo} 
                      alt="FresCo HealthCraft Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left">
                    <h1 className="font-extrabold text-base tracking-tight leading-none text-white">FresCo HealthCraft</h1>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1 block">ADMIN PANEL</span>
                  </div>
                </div>
                {/* Close sidebar button for mobile */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden p-1.5 text-[#B6D6C4] hover:text-white hover:bg-[#0B4225] rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Menu Links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5 scrollbar-thin">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
                  { id: "orders", label: "Orders", icon: ShoppingBag, badge: orders.filter(o => o.status === "pending").length },
                  { id: "products", label: "Products", icon: Package },
                  { id: "customers", label: "Customers", icon: Users },
                  { id: "inventory", label: "Inventory", icon: FileSpreadsheet, badge: lowStockCount || undefined },
                  { id: "analytics", label: "Analytics & Reports", icon: TrendingUp },
                  { id: "settings", label: "Settings", icon: Settings }
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSearchQuery("");
                        setIsSidebarOpen(false); // Close mobile drawer on selection
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isActive 
                          ? "bg-amber-400 text-[#054A29] shadow-md scale-[1.02] font-black" 
                          : "text-[#E2EBE5] hover:bg-[#0B4225] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <IconComponent className={`w-4.5 h-4.5 ${isActive ? "text-[#054A29]" : "text-[#B6D6C4]"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-[#054A29] text-white" : "bg-amber-400 text-[#054A29]"}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Illustration Banner Card */}
              <div className="px-4 pb-2">
                <div className="bg-[#0B4225] border border-[#0F5C34] rounded-2xl p-4 text-center relative overflow-hidden shadow-inner">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <span className="text-2xl select-none">🥤</span>
                  <h4 className="text-[11px] font-bold mt-1 text-white uppercase tracking-wider">Fresh. Healthy. Delivered.</h4>
                  <p className="text-[9.5px] text-[#B6D6C4] mt-0.5 leading-tight">Monitor daily juice.</p>
                  
                  <button
                    onClick={onClose}
                    className="mt-3 w-full bg-amber-400 hover:bg-amber-500 text-[#054A29] py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.03]"
                  >
                    View Store
                  </button>
                </div>
              </div>

              {/* Admin Footer Switcher Profile */}
              <div className="p-4 border-t border-[#03301B] bg-[#03301B]/50 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-[#054A29] flex items-center justify-center font-extrabold text-sm border-2 border-white/20 select-none">
                    SA
                  </div>
                  <div>
                    <h5 className="text-[11px] font-extrabold leading-none text-white">Admin User</h5>
                    <span className="text-[9px] text-[#B6D6C4] font-medium block mt-1">Super Administrator</span>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  title="Logout of admin session"
                  className="p-1.5 hover:bg-[#0B4225] rounded-lg text-[#B6D6C4] hover:text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </aside>

            {/* 2. MAIN CANVAS AREA (RIGHT SIDE) */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Header Toolbar */}
              <header className="h-16 border-b border-neutral-100 bg-white px-4 sm:px-8 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2">
                  {/* Mobile sidebar toggle button */}
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden p-2 -ml-2 text-[#054A29] hover:bg-neutral-100 rounded-xl mr-1 cursor-pointer"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <span className="text-[#054A29] font-black text-xs uppercase tracking-widest bg-[#054A29]/5 px-3 py-1.5 rounded-lg border border-[#054A29]/10">
                    Pune Outlet
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium hidden xs:inline-block">
                    {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Notification dropdown */}
                  <div className="relative group">
                    <button className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-500 hover:text-neutral-800 transition-colors relative cursor-pointer">
                      <Bell className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
                    </button>
                    {/* Hover Dropdown */}
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50 text-left">
                      <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-2 border-b pb-1">Activity Feed</h4>
                      <div className="space-y-2">
                        {notifications.map((n, i) => (
                          <div key={i} className="text-[10px] leading-relaxed text-neutral-600 border-b border-neutral-50 pb-1.5 last:border-0 last:pb-0">
                            📢 {n}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-neutral-200" />

                  <div className="flex items-center gap-2.5">
                    <span className="text-right text-xs">
                      <span className="font-extrabold text-neutral-800 block">Sumit S.</span>
                      <span className="text-[9.5px] text-[#054A29] font-bold block mt-0.5">Outlet Manager</span>
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#054A29] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                      SM
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content Pane */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
                
                {/* ----------------- TAB: DASHBOARD ----------------- */}
                {activeTab === "dashboard" && (
                  <div className="space-y-8 text-left">
                    <div>
                      <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Welcome back, Admin! 👋</h2>
                      <p className="text-xs text-neutral-500 mt-1">Here's what's happening with your juice shop today.</p>
                    </div>

                    {/* Primary Analytic Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { title: "Total Sales Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "+18.6% vs last week", color: "text-[#054A29] bg-[#E2EBE5] border-[#054A29]/15", desc: "Live shop earnings" },
                        { title: "Single Orders tickets", value: orders.length, change: "+14.2% demand volume", color: "text-[#054A29] bg-white border-neutral-200", desc: "Checkout transactions" }
                      ].map((card, i) => (
                        <div key={i} className={`p-5 rounded-3xl border text-left shadow-sm flex flex-col justify-between ${card.color}`}>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">{card.title}</span>
                            <span className="text-2xl font-black tracking-tight block">{card.value}</span>
                          </div>
                          <div className="mt-4 pt-3 border-t border-neutral-100/60 flex items-center justify-between text-[10px]">
                            <span className="font-extrabold text-[#054A29] bg-amber-400/25 px-2 py-0.5 rounded-full">{card.change}</span>
                            <span className="text-neutral-400 font-medium">{card.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Charts & Popular Items Section (Fulfill UI layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Interactive Revenue Spline Chart */}
                      <div className="lg:col-span-8 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Weekly Revenue Curve</h4>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Continuous sales spline tracking morning dispatch rushes.</p>
                          </div>
                          <span className="bg-[#054A29]/5 text-[#054A29] border border-[#054A29]/10 text-[9px] font-bold px-2 py-1 rounded-lg uppercase">Live Feed</span>
                        </div>

                        {/* Beautiful Custom SVG Graph */}
                        <div className="h-64 w-full relative pt-4">
                          <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#054A29" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#054A29" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f1" strokeWidth="1" strokeDasharray="4" />
                            <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f1" strokeWidth="1" strokeDasharray="4" />
                            <line x1="0" y1="160" x2="600" y2="160" stroke="#f1f5f1" strokeWidth="1" strokeDasharray="4" />
                            
                            {/* Line Path Area */}
                            <path
                              d={(() => {
                                const pts = weeklyDayRevenues.map((rev, idx) => {
                                  const x = 10 + idx * 96.6;
                                  const y = maxDayRevenue > 0 ? 170 - (rev / maxDayRevenue) * 130 : 170;
                                  return { x, y };
                                });
                                const linePath = pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
                                return pts.length > 0 ? `${linePath} L 590 200 L 10 200 Z` : "M 10 180 Z";
                              })()}
                              fill="url(#chartGlow)"
                            />
                            {/* Spline Path */}
                            <path
                              d={(() => {
                                const pts = weeklyDayRevenues.map((rev, idx) => {
                                  const x = 10 + idx * 96.6;
                                  const y = maxDayRevenue > 0 ? 170 - (rev / maxDayRevenue) * 130 : 170;
                                  return { x, y };
                                });
                                return pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
                              })()}
                              fill="none"
                              stroke="#054A29"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                            />
                            {/* Key Dots */}
                            {weeklyDayRevenues.map((rev, idx) => {
                              const x = 10 + idx * 96.6;
                              const y = maxDayRevenue > 0 ? 170 - (rev / maxDayRevenue) * 130 : 170;
                              const isToday = idx === mapToWeeklyIndex(now.getDay());
                              return (
                                <circle
                                  key={idx}
                                  cx={x}
                                  cy={y}
                                  r={isToday ? 6 : 4.5}
                                  fill={isToday ? "#FBBF24" : "#054A29"}
                                  stroke={isToday ? "#054A29" : "white"}
                                  strokeWidth="2"
                                />
                              );
                            })}
                          </svg>
                          <div className="flex justify-between text-[9px] font-bold text-neutral-400 font-mono mt-3 px-2">
                            <span>MON</span>
                            <span>TUE</span>
                            <span>WED</span>
                            <span>THU</span>
                            <span>FRI</span>
                            <span>SAT (TODAY)</span>
                          </div>
                        </div>
                      </div>
 
                      {/* Veg vs Fruit Popularity pie donut */}
                      <div className="lg:col-span-4 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-6">
                        <div>
                          <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Demand Index: Veg vs Fruit</h4>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Juice categories popularity by sales volume ratio.</p>
                        </div>
 
                        {/* Interactive donut pie */}
                        <div className="flex flex-col items-center justify-center space-y-4 py-2">
                          <div className="relative w-36 h-36">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              {/* Background Circle */}
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F0F4F0" strokeWidth="3" />
                              {/* Fruit (Fruit Pressed %) */}
                              <circle 
                                cx="18" 
                                cy="18" 
                                r="15.915" 
                                fill="none" 
                                stroke="#054A29" 
                                strokeWidth="4" 
                                strokeDasharray={`${fruitJuicesPct} 100`} 
                                strokeDashoffset="0" 
                              />
                              {/* Veg (Veggie % ) */}
                              <circle 
                                cx="18" 
                                cy="18" 
                                r="15.915" 
                                fill="none" 
                                stroke="#FBBF24" 
                                strokeWidth="4.2" 
                                strokeDasharray={`${veggieJuicesPct} 100`} 
                                strokeDashoffset={`-${fruitJuicesPct}`} 
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                              <span className="text-lg font-black text-neutral-800">
                                {totalJuicesQty >= 1000 ? `${(totalJuicesQty / 1000).toFixed(1)}k+` : totalJuicesQty}
                              </span>
                              <span className="text-[8px] font-bold uppercase text-neutral-400">Total Cups</span>
                            </div>
                          </div>
 
                          <div className="w-full grid grid-cols-2 gap-4 text-left border-t border-neutral-50 pt-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-[10px] font-extrabold">
                                <span className="w-2.5 h-2.5 rounded bg-[#054A29]" />
                                <span>Fruit Pressed ({fruitJuicesPct}%)</span>
                              </div>
                              <span className="text-[9px] text-neutral-400 font-mono pl-4 block">{fruitJuicesQty} cups</span>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-[10px] font-extrabold">
                                <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                                <span>Green Veggies ({veggieJuicesPct}%)</span>
                              </div>
                              <span className="text-[9px] text-neutral-400 font-mono pl-4 block">{veggieJuicesQty} raw extractions</span>
                            </div>
                          </div>
                        </div>
                      </div>
 
                    </div>
 
                    {/* Top Products Slider & Sales Categorization */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Top Selling list */}
                      <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Top Selling Juices</h4>
                          <span className="text-[9.5px] font-extrabold text-[#054A29] hover:underline cursor-pointer" onClick={() => setActiveTab("products")}>View Inventory</span>
                        </div>
                        <div className="space-y-3">
                          {products.slice(0, 3).map((prod, idx) => (
                            <div key={prod.id} className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl hover:bg-neutral-100/50 border border-neutral-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl select-none">{prod.icon}</span>
                                <div className="text-left">
                                  <h5 className="font-extrabold text-neutral-800 text-xs">{prod.name}</h5>
                                  <span className="text-[9.5px] text-[#054A29] font-bold block mt-0.5">{prod.category}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-black text-neutral-800">₹{prod.price}</span>
                                <span className="text-[9.5px] text-neutral-400 block mt-0.5">Popular Seller</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
 
                      {/* Sales distribution */}
                      <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-4">
                        <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Category Sales Spread</h4>
                        <div className="space-y-4 text-left">
                          {(() => {
                            const categoryCounts: { [key: string]: number } = {};
                            orders.forEach(o => {
                              o.items?.forEach(item => {
                                const cat = item.menuItem?.category || "Fruit Juices";
                                categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity;
                              });
                            });
 
                            const defaultCategories = [
                              { name: "Fruit Juices", color: "bg-[#054A29]", defaultPct: 62, defaultQty: 773 },
                              { name: "Fresco Power Juices", color: "bg-amber-400", defaultPct: 28, defaultQty: 349 },
                              { name: "Green Vitality Juice", color: "bg-emerald-400", defaultPct: 10, defaultQty: 124 }
                            ];
 
                            const totalSoldSum = Object.values(categoryCounts).reduce((s, c) => s + c, 0);
 
                            return defaultCategories.map((cat, i) => {
                              const qty = totalSoldSum > 0 ? (categoryCounts[cat.name] || 0) : cat.defaultQty;
                              const finalTotal = totalSoldSum > 0 ? totalSoldSum : (773 + 349 + 124);
                              const pct = Math.round((qty / finalTotal) * 100);
 
                              return (
                                <div key={i} className="space-y-1.5">
                                  <div className="flex justify-between items-center text-[10.5px] font-bold">
                                    <span className="text-neutral-700">{cat.name}</span>
                                    <span className="text-neutral-400 font-mono">{qty} units ({pct}%)</span>
                                  </div>
                                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                    <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ----------------- TAB: ORDERS ----------------- */}
                {activeTab === "orders" && (
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Customer Juice Orders</h2>
                        <p className="text-xs text-neutral-500 mt-1">Manage, verify and update status of single checkouts.</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={exportToCSV}
                          disabled={orders.length === 0}
                          className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 px-4 py-3 rounded-2xl font-bold uppercase text-[10.5px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-[#054A29]" />
                          <span>Export CSV Excel</span>
                        </button>
                        <button
                          onClick={() => {
                            setModalType("order");
                            setModalMode("add");
                            setIsModalOpen(true);
                          }}
                          className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-3 rounded-2xl font-bold uppercase text-[10.5px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-lg"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Create Ticket</span>
                        </button>
                      </div>
                    </div>

                    {/* Filters Toolbar */}
                    <div className="bg-white border border-neutral-100 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                      <div className="w-full md:w-96 relative">
                        <Search className="w-4 h-4 text-neutral-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search orders by customer or address..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 border border-neutral-200 bg-neutral-50 text-xs rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#054A29] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="flex gap-2.5 w-full md:w-auto">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="flex-1 md:flex-none py-2.5 px-4 text-xs border border-neutral-200 rounded-2xl bg-white focus:outline-none"
                        >
                          <option value="all">All Statuses</option>
                          <option value="pending">Pending Approval</option>
                          <option value="confirmed">Confirmed / Preparing</option>
                          <option value="delivered">Completed / Dispatched</option>
                          <option value="cancelled">Cancelled Orders</option>
                        </select>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 uppercase text-[9.5px] font-black tracking-wider">
                              <th className="p-4">Customer Details</th>
                              <th className="p-4">Delivery Address</th>
                              <th className="p-4">Ordered Items</th>
                              <th className="p-4">Payable Amount</th>
                              <th className="p-4">System Status</th>
                              <th className="p-4">Timestamp</th>
                              <th className="p-4 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {orders
                              .filter(o => {
                                const q = searchQuery.toLowerCase().trim();
                                const matchesSearch = o.customerName.toLowerCase().includes(q) || o.phone.includes(q) || o.address.toLowerCase().includes(q);
                                const matchesStatus = statusFilter === "all" || o.status === statusFilter;
                                return matchesSearch && matchesStatus;
                              })
                              .map((order) => (
                                <tr key={order.id} className="hover:bg-[#FDFDFD] transition-colors">
                                  <td className="p-4">
                                    <div className="font-extrabold text-neutral-800">{order.customerName}</div>
                                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{order.phone}</div>
                                  </td>
                                  <td className="p-4 max-w-[200px]">
                                    <div className="font-bold text-neutral-700 truncate" title={order.address}>{order.address}</div>
                                    <div className="text-[10px] text-[#054A29] font-semibold mt-0.5 flex flex-wrap gap-1.5 items-center">
                                      <span>📍 Pune - {order.puneLocation}</span>
                                      {order.deliveryDate && (
                                        <span className="bg-emerald-50 text-[#054A29] border border-emerald-200 px-1.5 py-0.5 rounded text-[9px] font-extrabold whitespace-nowrap">
                                          📅 {order.deliveryDate} ({order.deliveryTime})
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-4 max-w-[180px]">
                                    <div className="space-y-1">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[10.5px]">
                                          <span className="text-sm select-none">{item.menuItem.icon}</span>
                                          <span className="font-bold text-neutral-700 truncate">{item.menuItem.name}</span>
                                          <span className="font-mono text-neutral-400">x{item.quantity}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span className="font-black text-neutral-800 font-mono">₹{order.payableAmount}</span>
                                    {order.discountValue > 0 && (
                                      <span className="block text-[9.5px] text-emerald-600 font-semibold mt-0.5">Saved ₹{order.discountValue}</span>
                                    )}
                                  </td>
                                  <td className="p-4">
                                    <select
                                      value={order.status}
                                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                                      className={`p-1.5 text-[10px] font-bold rounded-xl border bg-white cursor-pointer focus:outline-none ${
                                        order.status === "delivered" ? "border-emerald-300 text-emerald-700 bg-emerald-50/50" :
                                        order.status === "cancelled" ? "border-red-250 text-red-650 bg-red-50/30" :
                                        order.status === "confirmed" ? "border-[#054A29]/30 text-[#054A29] bg-[#E2EBE5]/50" :
                                        "border-amber-300 text-amber-700 bg-amber-50/30"
                                      }`}
                                    >
                                      <option value="pending">⏳ Pending Approval</option>
                                      <option value="confirmed">🍊 Confirmed</option>
                                      <option value="delivered">✅ Delivered &amp; Closed</option>
                                      <option value="cancelled">❌ Cancelled</option>
                                    </select>
                                  </td>
                                  <td className="p-4 text-neutral-400 font-mono text-[10px] whitespace-nowrap">{order.timestamp}</td>
                                  <td className="p-4 text-center">
                                    <button
                                      onClick={() => {
                                        const msg = `Hello ${order.customerName}! This is FresCo HealthCraft Pune Support. 🥤 Your raw juice order #${order.id} status is now: ${order.status.toUpperCase()}. Arriving shortly! 🌿`;
                                        window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
                                      }}
                                      className="p-1.5 hover:bg-[#E2EBE5] rounded-lg text-[#054A29] transition-colors cursor-pointer mr-1.5 inline-block"
                                      title="WhatsApp update status directly"
                                    >
                                      <Send className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteOrder(order.id)}
                                      className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors cursor-pointer inline-block"
                                      title="Delete order ticket record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB: PRODUCTS ----------------- */}
                {activeTab === "products" && (
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Juice Product Store</h2>
                        <p className="text-xs text-neutral-500 mt-1">Manage and update your menu listings. Changes sync with customer store live.</p>
                      </div>

                      <button
                        onClick={() => {
                          setModalType("product");
                          setModalMode("add");
                          setProductForm({ name: "", category: "Fruit Juices", price: 200, description: "", icon: "🥤", benefits: ["", "", ""] });
                          setIsModalOpen(true);
                        }}
                        className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-3 rounded-2xl font-bold uppercase text-[10.5px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-lg"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Add Juice Item</span>
                      </button>
                    </div>

                    {/* Grid of Juices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.map((prod) => (
                        <div key={prod.id} className="bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm hover:border-[#054A29]/25 transition-all flex flex-col justify-between relative overflow-hidden group">
                          {prod.popular && (
                            <span className="absolute top-3.5 right-3.5 bg-amber-400 text-[#054A29] text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Popular Seller
                            </span>
                          )}

                          <div className="space-y-3.5">
                            <span className="text-4xl block select-none">{prod.icon}</span>
                            <div className="space-y-1 text-left">
                              <h4 className="font-extrabold text-neutral-800 text-sm leading-tight group-hover:text-[#054A29] transition-colors">{prod.name}</h4>
                              <span className="text-[9.5px] text-neutral-400 uppercase tracking-wider block font-semibold">{prod.category}</span>
                            </div>
                            <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">{prod.description}</p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-neutral-50 flex items-center justify-between">
                            <span className="text-sm font-black text-[#054A29] font-mono">₹{prod.price}</span>
                            
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setModalType("product");
                                  setModalMode("edit");
                                  setEditingId(prod.id);
                                  setProductForm({
                                    name: prod.name,
                                    category: prod.category,
                                    price: prod.price,
                                    description: prod.description,
                                    icon: prod.icon,
                                    benefits: [...(prod.benefits || ["", "", ""]), "", ""].slice(0, 3)
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="p-1.5 bg-neutral-50 hover:bg-[#E2EBE5] rounded-lg text-neutral-500 hover:text-[#054A29] transition-colors cursor-pointer"
                                title="Edit product information"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1.5 bg-neutral-50 hover:bg-red-50 rounded-lg text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                                title="Delete product item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB: CUSTOMERS ----------------- */}
                {activeTab === "customers" && (
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Customer Database</h2>
                        <p className="text-xs text-neutral-500 mt-1">Review active clients, subscription plans, and activation status counters.</p>
                      </div>
                    </div>

                    {/* Activation Counter Statistics Widgets */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-5 rounded-3xl border border-neutral-100 bg-white text-left shadow-sm flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400">Total Registered Clients</span>
                          <div className="text-3xl font-black text-neutral-800">{customers.length}</div>
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-2 font-medium">Verified system accounts</p>
                      </div>

                      <div className="p-5 rounded-3xl border border-[#054A29]/15 bg-[#E2EBE5] text-[#054A29] text-left shadow-sm flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black tracking-wider text-[#054A29]/70">Activated Customers</span>
                          <div className="text-3xl font-black text-[#054A29]">{customers.filter(c => c.status === "Active").length}</div>
                        </div>
                        <p className="text-[10px] text-[#054A29]/80 mt-2 font-medium">Eligible for dispatch services</p>
                      </div>

                      <div className="p-5 rounded-3xl border border-red-100 bg-red-50 text-red-900 text-left shadow-sm flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black tracking-wider text-red-700/70">Deactivated Customers</span>
                          <div className="text-3xl font-black text-red-700">{customers.filter(c => c.status === "Deactivated").length}</div>
                        </div>
                        <p className="text-[10px] text-red-600/80 mt-2 font-medium">Delivery services paused</p>
                      </div>
                    </div>

                    <div className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 uppercase text-[9.5px] font-black tracking-wider">
                              <th className="p-4">Customer Name</th>
                              <th className="p-4">Contact Details</th>
                              <th className="p-4">Subscribed Plan</th>
                              <th className="p-4">Subscription Period (Start / Expiry)</th>
                              <th className="p-4">Remaining Days</th>
                              <th className="p-4 text-center">Activation Status</th>
                              <th className="p-4">Spend Metrics</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {customers.map((cust) => {
                              const isActive = cust.status === "Active";
                              const remainingStr = calculateRemainingDays(cust.subscriptionExpiryDate);
                              
                              // Format start/expiry dates nicely
                              const formatPrettyDate = (dateStr: string) => {
                                if (!dateStr || dateStr === "N/A") return "N/A";
                                try {
                                  return new Date(dateStr).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  });
                                } catch {
                                  return dateStr;
                                }
                              };

                              return (
                                <tr key={cust.id} className="hover:bg-neutral-50/50 transition-colors">
                                  {/* 1. Customer Name */}
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-[#E2EBE5] text-[#054A29] font-black text-xs flex items-center justify-center">
                                        {cust.name.split(" ").map(n => n[0]).join("")}
                                      </div>
                                      <div>
                                        <span className="font-extrabold text-neutral-800 block">{cust.name}</span>
                                        <span className="text-[9px] font-mono text-neutral-400">Registered: {cust.registeredDate}</span>
                                      </div>
                                    </div>
                                  </td>

                                  {/* 2. Contact Details */}
                                  <td className="p-4">
                                    <div className="font-bold text-neutral-700">{cust.email}</div>
                                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{cust.phone}</div>
                                  </td>

                                  {/* 3. Subscribed Plan */}
                                  <td className="p-4">
                                    {cust.subscribedPlan !== "None" ? (
                                      <span className="font-extrabold text-[#054A29] bg-[#E2EBE5] px-2.5 py-1 rounded-lg border border-[#054A29]/10">
                                        {cust.subscribedPlan}
                                      </span>
                                    ) : (
                                      <span className="font-bold text-neutral-400 italic">No Active Plan</span>
                                    )}
                                  </td>

                                  {/* 4. Subscription Period */}
                                  <td className="p-4">
                                    {cust.subscribedPlan !== "None" ? (
                                      <div className="space-y-0.5 text-neutral-700">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[9px] uppercase font-bold text-neutral-400 w-9">Start:</span>
                                          <span className="font-semibold">{formatPrettyDate(cust.subscriptionStartDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[9px] uppercase font-bold text-neutral-400 w-9">Expiry:</span>
                                          <span className="font-bold text-amber-600">{formatPrettyDate(cust.subscriptionExpiryDate)}</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="text-neutral-400 font-medium">—</span>
                                    )}
                                  </td>

                                  {/* 5. Remaining Subscription Days */}
                                  <td className="p-4">
                                    {cust.subscribedPlan !== "None" ? (
                                      <span className={`font-black font-mono text-[11px] px-2 py-0.5 rounded-md ${
                                        remainingStr === "Expired" 
                                          ? "bg-red-100 text-red-700" 
                                          : remainingStr.includes("1") || remainingStr.includes("2") || remainingStr.includes("3") 
                                            ? "bg-amber-100 text-amber-800 animate-pulse" 
                                            : "bg-emerald-100 text-emerald-800"
                                      }`}>
                                        {remainingStr}
                                      </span>
                                    ) : (
                                      <span className="text-neutral-400 font-medium">—</span>
                                    )}
                                  </td>

                                  {/* 6. Customer Activation Status (Active / Deactivated) */}
                                  <td className="p-4 text-center">
                                    <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                      isActive 
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                        : "bg-red-50 text-red-600 border-red-100"
                                    }`}>
                                      {isActive ? "Active" : "Deactivated"}
                                    </span>
                                  </td>

                                  {/* 7. Spend Metrics (Complete Customer Details) */}
                                  <td className="p-4">
                                    <div className="font-black font-mono text-neutral-800">{cust.spent}</div>
                                    <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">{cust.orders}</div>
                                  </td>

                                  {/* 8. Action Toggle */}
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => handleToggleCustomerStatus(cust.id)}
                                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all border ${
                                        isActive 
                                          ? "bg-red-50 hover:bg-red-100 text-red-700 border-red-200" 
                                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                                      }`}
                                    >
                                      {isActive ? "Deactivate" : "Activate"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB: INVENTORY ----------------- */}
                {activeTab === "inventory" && (
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-800 tracking-tight">Raw Ingredients Inventory</h2>
                        <p className="text-xs text-neutral-500 mt-1">Track warehouse raw supplies in real time. Ensure fruits &amp; veggies stay loaded.</p>
                      </div>

                      <button
                        onClick={() => {
                          setModalType("ingredient");
                          setModalMode("add");
                          setIngredientForm({ name: "", category: "Fruits", stock: 100, maxStock: 150, unit: "kg", reorderLevel: 20, supplier: "Pune Farm Wholesale" });
                          setIsModalOpen(true);
                        }}
                        className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-3 rounded-2xl font-bold uppercase text-[10.5px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-lg"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Add Raw Item</span>
                      </button>
                    </div>

                    {/* Category filter tabs */}
                    <div className="flex gap-2 border-b border-neutral-100 pb-2 select-none overflow-x-auto">
                      {["all", "Fruits", "Vegetables", "Cups & Plate", "Others"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setCategoryFilter(tab)}
                          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                            categoryFilter === tab
                              ? "bg-[#054A29] text-white shadow-sm"
                              : "text-neutral-500 hover:bg-neutral-100"
                          }`}
                        >
                          {tab === "all" ? "All Ingredients" : tab}
                        </button>
                      ))}
                    </div>

                    {/* Table of items */}
                    <div className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 uppercase text-[9.5px] font-black tracking-wider">
                              <th className="p-4">Ingredient Name</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Current Warehouse Stock</th>
                              <th className="p-4">Update Stock</th>
                              <th className="p-4">Reorder Minimum Threshold</th>
                              <th className="p-4">External Supplier</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-center">Adjust Stock</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {inventory
                              .filter(i => categoryFilter === "all" || i.category === categoryFilter)
                              .map((ing) => {
                                const stockPct = Math.min(100, Math.round((ing.stock / ing.maxStock) * 100));
                                const isLow = ing.stock <= ing.reorderLevel;
                                const isOut = ing.stock === 0;

                                return (
                                  <tr key={ing.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl select-none">
                                          {ing.category === "Fruits" ? "🍎" : ing.category === "Vegetables" ? "🥦" : ing.category === "Herbs" ? "🌱" : "🌶️"}
                                        </span>
                                        <div>
                                          <span className="font-extrabold text-neutral-800">{ing.name}</span>
                                          <span className="block text-[9.5px] text-neutral-400 font-medium mt-0.5">Last updated: {ing.lastUpdated}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 font-bold text-neutral-500">{ing.category}</td>
                                    <td className="p-4 font-extrabold text-neutral-850 font-mono text-xs">{ing.stock} {ing.unit}</td>
                                    <td className="p-4">
                                      <div className="flex items-center gap-1.5 max-w-[120px]">
                                        <input
                                          type="number"
                                          min="0"
                                          value={ing.stock}
                                          onChange={(e) => {
                                            const val = e.target.value === "" ? 0 : Math.max(0, parseInt(e.target.value) || 0);
                                            const updated = inventory.map(i => i.id === ing.id ? { ...i, stock: val, lastUpdated: "Just Now" } : i);
                                            setInventory(updated);
                                            localStorage.setItem("fresco_inventory", JSON.stringify(updated));
                                          }}
                                          className="w-16 px-2 py-1.5 text-xs font-mono font-bold text-neutral-800 bg-neutral-50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-[#054A29] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#054A29] transition-all"
                                        />
                                        <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase">{ing.unit}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 font-bold text-neutral-450 font-mono">{ing.reorderLevel} {ing.unit}</td>
                                    <td className="p-4 font-medium text-neutral-700">{ing.supplier}</td>
                                    <td className="p-4">
                                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                        isOut ? "bg-red-50 text-red-650 border border-red-200" :
                                        isLow ? "bg-amber-50 text-amber-800 border border-amber-300" :
                                        "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      }`}>
                                        {isOut ? "🚨 Out of Stock" : isLow ? "⚠️ Low Stock" : "✨ Well Stocked"}
                                      </span>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="flex items-center justify-center gap-1.5">
                                        <button
                                          onClick={() => handleAdjustStock(ing.id, -5)}
                                          className="w-7 h-7 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer transition-colors"
                                          title="Remove 5 kg from stock"
                                        >
                                          -
                                        </button>
                                        <button
                                          onClick={() => handleAdjustStock(ing.id, 5)}
                                          className="w-7 h-7 bg-[#E2EBE5] hover:bg-[#054A29] hover:text-white border border-[#054A29]/15 text-[#054A29] font-bold rounded-lg text-xs flex items-center justify-center cursor-pointer transition-all"
                                          title="Add 5 kg to stock"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB: ANALYTICS ----------------- */}
                {activeTab === "analytics" && (
                  <div className="space-y-8 text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-800 tracking-tight font-sans">Business Intelligence &amp; Profitability Desk</h2>
                        <p className="text-xs text-neutral-500 mt-1">Granular financial auditing, unit cost accounting, fruit usage, and P&amp;L margin tracking.</p>
                      </div>

                      {/* Report Type Selector Segmented Control */}
                      <div className="flex bg-neutral-100 p-1 rounded-2xl w-full md:max-w-lg select-none border border-neutral-200/50">
                        <button
                          onClick={() => setAnalyticsTab("weekly")}
                          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                            analyticsTab === "weekly"
                              ? "bg-white text-[#054A29] shadow-sm"
                              : "text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                          }`}
                        >
                          📅 Weekly
                        </button>
                        <button
                          onClick={() => setAnalyticsTab("monthly")}
                          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                            analyticsTab === "monthly"
                              ? "bg-white text-[#054A29] shadow-sm"
                              : "text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                          }`}
                        >
                          📈 Monthly
                        </button>
                        <button
                          onClick={() => setAnalyticsTab("yearly")}
                          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                            analyticsTab === "yearly"
                              ? "bg-white text-[#054A29] shadow-sm"
                              : "text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                          }`}
                        >
                          🏛️ Yearly
                        </button>
                        <button
                          onClick={() => setAnalyticsTab("unit-cost")}
                          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                            analyticsTab === "unit-cost"
                              ? "bg-white text-[#054A29] shadow-sm"
                              : "text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                          }`}
                        >
                          🍋 Unit Cost
                        </button>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {analyticsTab === "weekly" && (
                        <motion.div
                          key="weekly"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8"
                        >
                          {/* Weekly KPI Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Weekly Sales Revenue</span>
                                <div className="text-2xl font-black text-[#054A29]">₹{weeklyRevenue.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-emerald-600 mt-3 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live dynamic billing tracking
                              </p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Total Weekly Orders</span>
                                <div className="text-2xl font-black text-neutral-800 font-mono">{weeklyOrdersCount} orders</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">Avg. {(weeklyOrdersCount / 7).toFixed(1)} orders per day</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Active Weekly Subscribers</span>
                                <div className="text-2xl font-black text-[#054A29] font-mono">{subscriptionCount} active</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">Regular client subscription deliveries</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-amber-100 bg-amber-50/35 shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-amber-700/80">Best Day of the Week</span>
                                <div className="text-2xl font-black text-amber-850">{bestDay}</div>
                              </div>
                              <p className="text-[9.5px] text-amber-700 font-semibold mt-3">{bestDayRevenue} peak single-day</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Bar Chart Daily Sales */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm lg:col-span-2 space-y-5">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Weekly Sales Curve (Day-Wise)</h4>
                                <p className="text-[10px] text-neutral-400 font-medium">Daily juice orders and revenue contribution</p>
                              </div>
                              
                              <div className="h-56 w-full flex items-end justify-between px-2 pt-6">
                                {weeklyBarData.map((bar, i) => (
                                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="text-[8px] font-bold text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                                      {bar.label}
                                    </div>
                                    <div className="w-8 bg-neutral-50 h-36 rounded-xl relative overflow-hidden flex items-end border border-neutral-100/60">
                                      <div 
                                        className="bg-[#054A29] hover:bg-[#0B4225] w-full rounded-b-xl transition-all duration-700" 
                                        style={{ height: `${bar.val}%` }} 
                                      />
                                    </div>
                                    <span className="text-[9px] font-black text-neutral-400 uppercase font-mono">{bar.day}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right: Operational Highlights */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Operational Highlights</h4>
                                  <p className="text-[10px] text-neutral-400 font-medium font-mono">Pune Hadapsar Area, Active Tracker</p>
                                </div>

                                <div className="space-y-3.5 text-xs text-neutral-700">
                                  <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</div>
                                    <div className="text-left">
                                      <span className="font-extrabold text-neutral-800 block">Active Subscriptions: {subscriptionCount} plans</span>
                                      <span className="text-[10px] text-neutral-400 font-semibold">Scheduled client drop-offs synchronized across local routing hubs.</span>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</div>
                                    <div className="text-left">
                                      <span className="font-extrabold text-neutral-800 block">Highest Selling Items</span>
                                      <span className="text-[10px] text-neutral-400 font-semibold">"{top1Juice}" and "{top2Juice}" leading active checkout charts.</span>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">✓</div>
                                    <div className="text-left">
                                      <span className="font-extrabold text-neutral-800 block">Delivery Fulfillment Rate: 100%</span>
                                      <span className="text-[10px] text-neutral-400 font-semibold">Zero lost or delayed dispatches since systems init.</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-neutral-100 pt-4 flex justify-between items-center text-[10.5px]">
                                <span className="font-extrabold text-neutral-400">Current Active Subscribers:</span>
                                <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">+{subscriptionCount} clients</span>
                              </div>
                            </div>
                          </div>

                          {/* Weekly Audit Log Table */}
                          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Weekly Performance Ledger</h4>
                                <p className="text-[10px] text-neutral-400 font-medium font-mono">Daily operational performance logs & revenue audit records</p>
                              </div>
                              <button
                                onClick={downloadWeeklyReportCSV}
                                className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-2.5 rounded-2xl font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md shrink-0 self-start sm:self-center"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                                <span>Export Weekly CSV</span>
                              </button>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-neutral-100">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] uppercase font-black text-neutral-400 tracking-wider">
                                    <th className="p-3.5 pl-5">Day of Week</th>
                                    <th className="p-3.5 text-center">Orders</th>
                                    <th className="p-3.5 text-right">Revenue (₹)</th>
                                    <th className="p-3.5 text-center">Top Category</th>
                                    <th className="p-3.5 pr-5 text-right">Fulfillment</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 font-medium text-neutral-600">
                                  {weeklyLedgerRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                                      <td className="p-3.5 pl-5 font-bold text-neutral-800">{row.day}</td>
                                      <td className="p-3.5 text-center font-mono font-bold text-neutral-500">{row.orders}</td>
                                      <td className="p-3.5 text-right font-mono font-black text-neutral-800">₹{row.revenue.toLocaleString()}</td>
                                      <td className="p-3.5 text-center">
                                        <span className="bg-neutral-100 text-neutral-700 font-bold px-2 py-0.5 rounded-lg text-[9.5px]">
                                          {row.category}
                                        </span>
                                      </td>
                                      <td className="p-3.5 pr-5 text-right font-mono text-emerald-600 font-bold">{row.rate}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="bg-neutral-50/50 font-black text-neutral-800 border-t border-neutral-200">
                                    <td className="p-3.5 pl-5">Total / Avg</td>
                                    <td className="p-3.5 text-center font-mono">{weeklyOrdersCount} orders</td>
                                    <td className="p-3.5 text-right font-mono text-[#054A29]">₹{weeklyRevenue.toLocaleString()}</td>
                                    <td className="p-3.5 text-center text-neutral-400 font-semibold">—</td>
                                    <td className="p-3.5 pr-5 text-right font-mono text-emerald-600 font-semibold">{weeklyOrdersCount > 0 ? "100.0%" : "—"}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {analyticsTab === "monthly" && (
                        <motion.div
                          key="monthly"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8"
                        >
                          {/* Monthly Financial KPI Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="p-5 rounded-3xl border border-neutral-100 bg-[#E2EBE5] text-[#054A29] shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-[#054A29]/65">Total Monthly Income</span>
                                <div className="text-2xl font-black text-[#054A29]">₹{monthlyIncome.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-[#054A29]/80 mt-3 font-semibold">
                                Live Month-to-Date receipts
                              </p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Total Monthly Expense</span>
                                <div className="text-2xl font-black text-rose-600">₹{monthlyExpense.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">Derived from raw slider allocations</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-[#054A29]/20 bg-[#054A29]/5 shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-[#054A29]/70">Monthly Net Profit</span>
                                <div className="text-2xl font-black text-emerald-800">₹{monthlyNetProfit.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-emerald-700 font-extrabold mt-3">{monthlyProfitMargin}% Net Margin ratio</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Total Orders Received</span>
                                <div className="text-2xl font-black text-neutral-800 font-mono">{monthlyOrdersCount} orders</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">{subscriptionCount} subscribers active</p>
                            </div>
                          </div>

                          {/* Monthly Stock & Fruit Usage Cards */}
                          <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-150 space-y-4">
                            <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                              🍎 Monthly Raw Ingredients &amp; Fruit Usage
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Total Fruits Purchased</span>
                                <span className="text-xl font-black text-[#054A29] font-mono">{Math.round(monthlyFruitsConsumed * 1.15).toLocaleString()} kg</span>
                                <p className="text-[9.5px] text-neutral-500 mt-1">Average rate: ₹{costFruit.toFixed(1)} allocation / unit</p>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Total Fruits Consumption</span>
                                <span className="text-xl font-black text-neutral-800 font-mono">{monthlyFruitsConsumed.toLocaleString()} kg</span>
                                <p className="text-[9.5px] text-neutral-500 mt-1">Yield: ~85% juice output ratio</p>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Inventory / Stock Usage</span>
                                <span className="text-xl font-black text-amber-700 font-mono">{Math.round(monthlyFruitsConsumed * 0.15).toLocaleString()} kg (buffer)</span>
                                <p className="text-[9.5px] text-amber-600 font-semibold mt-1">Well stocked, no spoilage wastage</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Monthly Cost Breakdown */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-6">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Monthly Cost Breakdown</h4>
                                <p className="text-[10px] text-neutral-400 font-medium">Granular categorical expense list for active cycle</p>
                              </div>

                              <div className="space-y-4">
                                {[
                                  { name: "Raw Fruits & Ingredients", amt: `₹${expenseFruits.toLocaleString()}`, pct: `${rawFruitsPct}%`, col: "bg-[#054A29]" },
                                  { name: "Cup, Straws & Packaging", amt: `₹${expenseCups.toLocaleString()}`, pct: `${cupsPct}%`, col: "bg-emerald-600" },
                                  { name: "Shop Rent Allocation", amt: `₹${Math.round(totalMonthlyBottlesSold * costRent).toLocaleString()}`, pct: `${((costRent / (totalUnitProductionCost || 1)) * 100).toFixed(1)}%`, col: "bg-amber-500" },
                                  { name: "Electricity & Water utilities", amt: `₹${expenseElectricity.toLocaleString()}`, pct: `${electricityPct}%`, col: "bg-sky-500" },
                                  { name: "Delivery & Logistics dispatch", amt: `₹${Math.round(totalMonthlyBottlesSold * (costDelivery + costOperations)).toLocaleString()}`, pct: `${(((costDelivery + costOperations) / (totalUnitProductionCost || 1)) * 100).toFixed(1)}%`, col: "bg-rose-500" },
                                ].map((exp, i) => (
                                  <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black text-neutral-700">
                                      <span>{exp.name}</span>
                                      <div className="space-x-2">
                                        <span className="font-mono text-neutral-400">{exp.pct}</span>
                                        <span className="font-mono text-neutral-800">{exp.amt}</span>
                                      </div>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                      <div className={`${exp.col} h-full rounded-full transition-all duration-500`} style={{ width: exp.pct }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <p className="text-[10px] text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100 font-medium leading-relaxed">
                                💡 Overheads and raw ingredient metrics dynamically link to active production unit sliders. Adjusting raw costs in the calculator alters these operational analytics in real-time.
                              </p>
                            </div>

                            {/* Monthly demographics */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Demographics &amp; Category Sales Spread</h4>
                                <p className="text-[10px] text-neutral-400 font-medium">Consolidated distribution logs for delivery regions & categories</p>
                              </div>

                              <div className="space-y-4">
                                {/* Category Distribution Progress Bar */}
                                <div className="space-y-1.5">
                                  <div className="flex justify-between text-[11px] font-black text-neutral-700">
                                    <span>Fruit-Pressed Juices</span>
                                    <span className="font-mono text-neutral-400">{fruitJuicesPct}%</span>
                                  </div>
                                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-[#054A29] h-full rounded-full animate-all" style={{ width: `${fruitJuicesPct}%` }} />
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <div className="flex justify-between text-[11px] font-black text-neutral-700">
                                    <span>Veggie Nutrient Cleanses</span>
                                    <span className="font-mono text-neutral-400">{veggieJuicesPct}%</span>
                                  </div>
                                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-amber-400 h-full rounded-full animate-all" style={{ width: `${veggieJuicesPct}%` }} />
                                  </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                  <h5 className="text-[9.5px] uppercase font-black tracking-widest text-neutral-400">Primary Delivery Density</h5>
                                  <div className="grid grid-cols-3 gap-2.5 text-center text-[10.5px] font-bold">
                                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                                      <span className="text-neutral-400 uppercase text-[8px] font-black block tracking-wider">{loc1}</span>
                                      <span className="text-neutral-800 font-black font-mono">{loc1Pct}%</span>
                                    </div>
                                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                                      <span className="text-neutral-400 uppercase text-[8px] font-black block tracking-wider">{loc2}</span>
                                      <span className="text-neutral-800 font-black font-mono">{loc2Pct}%</span>
                                    </div>
                                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                                      <span className="text-neutral-400 uppercase text-[8px] font-black block tracking-wider">{loc3}</span>
                                      <span className="text-neutral-800 font-black font-mono">{loc3Pct}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Monthly Ledger Table */}
                          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Monthly Consolidated Ledger</h4>
                                <p className="text-[10px] text-neutral-400 font-medium font-mono">Month-on-month consolidated revenue and subscription metrics</p>
                              </div>
                              <button
                                onClick={downloadMonthlyReportCSV}
                                className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-2.5 rounded-2xl font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md shrink-0 self-start sm:self-center"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                                <span>Export Monthly CSV</span>
                              </button>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-neutral-100">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] uppercase font-black text-neutral-400 tracking-wider">
                                    <th className="p-3.5 pl-5">Month</th>
                                    <th className="p-3.5 text-right">Income (₹)</th>
                                    <th className="p-3.5 text-right">Expenses (₹)</th>
                                    <th className="p-3.5 text-center">Active Subscribers</th>
                                    <th className="p-3.5 text-right">Avg Order Value (AOV)</th>
                                    <th className="p-3.5 pr-5 text-right">Net Profit Margin</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 font-medium text-neutral-600">
                                  {monthlyLedgerRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                                      <td className="p-3.5 pl-5 font-bold text-neutral-800">{row.month}</td>
                                      <td className="p-3.5 text-right font-mono font-black text-[#054A29]">₹{row.income.toLocaleString()}</td>
                                      <td className="p-3.5 text-right font-mono text-rose-600 font-bold">₹{row.expense.toLocaleString()}</td>
                                      <td className="p-3.5 text-center font-mono font-bold text-neutral-500">{row.subscribers}</td>
                                      <td className="p-3.5 text-right font-mono font-bold text-neutral-700 font-mono">₹{row.aov.toFixed(2)}</td>
                                      <td className="p-3.5 pr-5 text-right font-mono text-emerald-600 font-black">₹{(row.income - row.expense).toLocaleString()} ({row.income > 0 ? (((row.income - row.expense) / row.income) * 100).toFixed(1) + "%" : "0.0%"})</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="bg-neutral-50/50 font-black text-neutral-800 border-t border-neutral-200">
                                    <td className="p-3.5 pl-5">Fiscal Quarter Total</td>
                                    <td className="p-3.5 text-right font-mono text-[#054A29]">₹{monthlyLedgerRows.reduce((s, r) => s + r.income, 0).toLocaleString()}</td>
                                    <td className="p-3.5 text-right font-mono text-rose-600">₹{monthlyLedgerRows.reduce((s, r) => s + r.expense, 0).toLocaleString()}</td>
                                    <td className="p-3.5 text-center font-mono">{monthlyLedgerRows.reduce((s, r) => s + r.subscribers, 0)} clients</td>
                                    <td className="p-3.5 text-right font-mono text-neutral-400 font-semibold">—</td>
                                    <td className="p-3.5 pr-5 text-right font-mono text-emerald-600">
                                      ₹{(monthlyLedgerRows.reduce((s, r) => s + r.income, 0) - monthlyLedgerRows.reduce((s, r) => s + r.expense, 0)).toLocaleString()} (
                                      {monthlyLedgerRows.reduce((s, r) => s + r.income, 0) > 0 ? (((monthlyLedgerRows.reduce((s, r) => s + r.income, 0) - monthlyLedgerRows.reduce((s, r) => s + r.expense, 0)) / monthlyLedgerRows.reduce((s, r) => s + r.income, 0)) * 100).toFixed(1) + "%" : "0.0%"}
                                      )
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {analyticsTab === "yearly" && (
                        <motion.div
                          key="yearly"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8"
                        >
                          {/* Yearly Financial Summary KPI Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="p-5 rounded-3xl border border-neutral-100 bg-[#E2EBE5] text-[#054A29] shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-[#054A29]/65">Yearly Revenue Summary</span>
                                <div className="text-2xl font-black text-[#054A29]">₹{yearlyRevenue.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-[#054A29]/80 mt-3 font-semibold">
                                Consolidated annual income curve
                              </p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Yearly Expense Summary</span>
                                <div className="text-2xl font-black text-rose-600 font-mono">₹{yearlyExpense.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">All fixed &amp; variables overheads</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-amber-200 bg-amber-50/20 shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-amber-800">Yearly Net Profit Analysis</span>
                                <div className="text-2xl font-black text-amber-900">₹{yearlyNetProfit.toLocaleString()}</div>
                              </div>
                              <p className="text-[9.5px] text-amber-700 font-extrabold mt-3">{yearlyRevenue > 0 ? ((yearlyNetProfit / yearlyRevenue) * 100).toFixed(1) : "0.0"}% average Net P&amp;L</p>
                            </div>

                            <div className="p-5 rounded-3xl border border-neutral-100 bg-white shadow-sm flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">Total Annual Orders</span>
                                <div className="text-2xl font-black text-neutral-800 font-mono">{yearlyOrdersCount} orders</div>
                              </div>
                              <p className="text-[9.5px] text-neutral-500 mt-3 font-medium">Subscription + single dispatches</p>
                            </div>
                          </div>

                          {/* Yearly Stock & Fruit Analytics Cards */}
                          <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-150 space-y-4">
                            <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                              🚜 Yearly Agricultural Procurement &amp; Stock Ledger
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Total Fruits Purchased</span>
                                <span className="text-xl font-black text-[#054A29] font-mono">{Math.round(yearlyFruitsConsumed * 1.15).toLocaleString()} kg</span>
                                <p className="text-[9.5px] text-neutral-500 mt-1">Direct farms logistics delivery</p>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Total Fruits Consumption</span>
                                <span className="text-xl font-black text-neutral-800 font-mono">{yearlyFruitsConsumed.toLocaleString()} kg</span>
                                <p className="text-[9.5px] text-neutral-500 mt-1">juice pulp conversion index</p>
                              </div>
                              <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                                <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Inventory Buffer Stock</span>
                                <span className="text-xl font-black text-amber-700 font-mono">{Math.round(yearlyFruitsConsumed * 0.15).toLocaleString()} kg</span>
                                <p className="text-[9.5px] text-amber-600 font-semibold mt-1">Active cooling warehouses buffer</p>
                              </div>
                            </div>
                          </div>

                          {/* Cost vs Profit Graph */}
                          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider">Cost vs Profit Graph (Monthly Progression)</h4>
                                <p className="text-[10px] text-neutral-400 font-semibold">Interactive annual bar distribution for financial analytics</p>
                              </div>
                              
                              <div className="flex items-center gap-4 text-[10px] font-black tracking-wider uppercase text-neutral-500">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-3 h-3 bg-neutral-300 rounded-sm" />
                                  <span>Monthly Costs</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="w-3 h-3 bg-[#054A29] rounded-sm" />
                                  <span>Net Profit / Income</span>
                                </div>
                              </div>
                            </div>

                            {/* Complex SVG/CSS Bar Graph */}
                            <div className="relative min-h-[220px] w-full pt-10 px-2 border-b border-neutral-100 flex items-end justify-between gap-1.5">
                              {scaledYearlyProgression.map((item, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                                  {/* Tooltip on hover */}
                                  <div className="absolute bottom-[110%] bg-neutral-900 text-white text-[8.5px] px-2 py-1 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold text-center z-10 w-24">
                                    <span className="block border-b border-neutral-800 pb-0.5 mb-0.5 text-neutral-400">Total: ₹{item.total.toLocaleString()}</span>
                                    <span className="text-rose-400 block">Cost: ₹{item.cost.toLocaleString()}</span>
                                    <span className="text-emerald-400 block">Profit: ₹{item.profit.toLocaleString()}</span>
                                  </div>

                                  <div className="w-full flex items-end justify-center gap-1 max-w-[28px] h-36">
                                    {/* Cost Bar */}
                                    <div 
                                      className="w-1.5 rounded-t-sm bg-neutral-250 group-hover:bg-neutral-350 transition-colors"
                                      style={{ height: `${item.costPct}%` }}
                                    />
                                    {/* Profit/Revenue Bar */}
                                    <div 
                                      className={`w-2.5 rounded-t-md transition-all duration-700 ${
                                        item.highlight ? "bg-emerald-600 ring-2 ring-emerald-100" : "bg-[#054A29]"
                                      }`}
                                      style={{ height: `${item.profitPct}%` }}
                                    />
                                  </div>

                                  <span className={`text-[9px] font-black uppercase tracking-wider mt-2 block ${
                                    item.highlight ? "text-[#054A29] font-black" : "text-neutral-400"
                                  }`}>{item.month}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Yearly Cost Breakdown Summary */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-6">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider font-sans">Yearly Cost Breakdown</h4>
                                <p className="text-[10px] text-neutral-400 font-medium">Consolidated yearly category allocation logs</p>
                              </div>

                              <div className="space-y-4">
                                {[
                                  { name: "Raw Fruits & Ingredients Procurement", amt: `₹${(totalBottlesSoldAllTime * costFruit).toLocaleString()}`, pct: `${rawFruitsPct}%`, col: "bg-[#054A29]" },
                                  { name: "Consumables & Standard Packaging", amt: `₹${(totalBottlesSoldAllTime * costCupLid).toLocaleString()}`, pct: `${cupsPct}%`, col: "bg-emerald-600" },
                                  { name: "Shop Rent Allocation (Hadapsar space)", amt: `₹${(totalBottlesSoldAllTime * costRent).toLocaleString()}`, pct: `${((costRent / (totalUnitProductionCost || 1)) * 100).toFixed(1)}%`, col: "bg-amber-500" },
                                  { name: "Electricity, Utilities & Generator fuel", amt: `₹${(totalBottlesSoldAllTime * costElectricity).toLocaleString()}`, pct: `${electricityPct}%`, col: "bg-sky-500" },
                                  { name: "Logistics, Delivery & Fuel charges", amt: `₹${(totalBottlesSoldAllTime * (costDelivery + costOperations)).toLocaleString()}`, pct: `${(((costDelivery + costOperations) / (totalUnitProductionCost || 1)) * 100).toFixed(1)}%`, col: "bg-rose-500" },
                                ].map((item, idx) => (
                                  <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black text-neutral-700">
                                      <span>{item.name}</span>
                                      <div className="space-x-2">
                                        <span className="font-mono text-neutral-400">{item.pct}</span>
                                        <span className="font-mono text-neutral-800">{item.amt}</span>
                                      </div>
                                    </div>
                                    <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                                      <div className={`${item.col} h-full rounded-full`} style={{ width: item.pct }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Top Selling Products List */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider font-sans">🏆 Top Selling Products &amp; Volumes</h4>
                                <p className="text-[10px] text-neutral-400 font-semibold">Most demanded juices this fiscal year</p>
                              </div>

                              <div className="space-y-3.5 text-xs text-neutral-700">
                                {yearlyTopProducts.map((prod, idx) => (
                                  <div key={idx} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                                    <div className="space-y-1 text-left">
                                      <span className="font-extrabold text-neutral-800 block text-xs">{prod.name}</span>
                                      <span className="text-[10px] text-neutral-400 font-semibold">{prod.count} — {prod.share} share</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[10px] font-black text-[#054A29] bg-[#E2EBE5] px-2 py-1 rounded-lg block">{prod.margin} Margin</span>
                                      <span className="text-[8px] text-neutral-400 uppercase font-black font-mono tracking-wider">{prod.trend}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Yearly Ledger Table */}
                          <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider font-sans">Yearly Consolidated Ledger</h4>
                                <p className="text-[10px] text-neutral-400 font-medium font-mono">Consolidated fiscal performance indices & audits</p>
                              </div>
                              <button
                                onClick={downloadYearlyReportCSV}
                                className="bg-[#054A29] hover:bg-[#0B4225] text-white px-4 py-2.5 rounded-2xl font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md shrink-0 self-start sm:self-center"
                              >
                                <FileSpreadsheet className="w-4 h-4" />
                                <span>Export Yearly CSV</span>
                              </button>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-neutral-100">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] uppercase font-black text-neutral-400 tracking-wider">
                                    <th className="p-3.5 pl-5">Fiscal Quarter</th>
                                    <th className="p-3.5 text-right">Income Summary (₹)</th>
                                    <th className="p-3.5 text-right">Expense Summary (₹)</th>
                                    <th className="p-3.5 text-center">Audited Orders</th>
                                    <th className="p-3.5 pr-5 text-right">Audited Net Profit Margin</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 font-medium text-neutral-600">
                                  {(() => {
                                    const quartersData = [
                                      { name: "Q1 (April - June)", months: [3, 4, 5] },
                                      { name: "Q2 (July - September)", months: [6, 7, 8] },
                                      { name: "Q3 (October - December)", months: [9, 10, 11] },
                                      { name: "Q4 (January - March)", months: [0, 1, 2] }
                                    ];

                                    const computedQuarters = quartersData.map(q => {
                                      let income = 0;
                                      let expense = 0;
                                      let ordersCount = 0;
                                      
                                      orders.forEach(o => {
                                        const d = parseOrderDate(o.timestamp);
                                        if (q.months.includes(d.getMonth()) && d.getFullYear() === currentYear) {
                                          income += o.payableAmount || 0;
                                          const qty = o.items?.reduce((s, item) => s + item.quantity, 0) || 0;
                                          expense += Math.round(qty * totalUnitProductionCost);
                                          ordersCount += 1;
                                        }
                                      });

                                      const netProfit = Math.max(0, income - expense);
                                      const marginStr = income > 0 ? ((netProfit / income) * 100).toFixed(1) + "%" : "0.0%";

                                      return {
                                        quarter: q.name,
                                        income,
                                        expense,
                                        orders: ordersCount,
                                        rate: marginStr
                                      };
                                    });

                                    return computedQuarters.map((row, idx) => (
                                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="p-3.5 pl-5 font-bold text-neutral-800">{row.quarter}</td>
                                        <td className="p-3.5 text-right font-mono font-black text-[#054A29]">₹{row.income.toLocaleString()}</td>
                                        <td className="p-3.5 text-right font-mono text-rose-600 font-bold">₹{row.expense.toLocaleString()}</td>
                                        <td className="p-3.5 text-center font-mono font-bold text-neutral-500">{row.orders} dispatches</td>
                                        <td className="p-3.5 pr-5 text-right font-mono text-emerald-600 font-black">₹{(row.income - row.expense).toLocaleString()} ({row.rate})</td>
                                      </tr>
                                    ));
                                  })()}
                                </tbody>
                                <tfoot>
                                  <tr className="bg-neutral-50/50 font-black text-neutral-800 border-t border-neutral-200">
                                    <td className="p-3.5 pl-5">Annual Business Total</td>
                                    <td className="p-3.5 text-right font-mono text-[#054A29]">₹{yearlyRevenue.toLocaleString()}</td>
                                    <td className="p-3.5 text-right font-mono text-rose-600">₹{yearlyExpense.toLocaleString()}</td>
                                    <td className="p-3.5 text-center font-mono">{yearlyOrdersCount} orders</td>
                                    <td className="p-3.5 pr-5 text-right font-mono text-emerald-600 font-black">
                                      ₹{yearlyNetProfit.toLocaleString()} ({yearlyRevenue > 0 ? ((yearlyNetProfit / yearlyRevenue) * 100).toFixed(1) + "%" : "0.0%"})
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {analyticsTab === "unit-cost" && (
                        <motion.div
                          key="unit-cost"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8"
                        >


                          {/* Sliders and Visual Output Side-By-Side */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Sliders Panel */}
                            <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm space-y-5 text-left">
                              <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider border-b border-neutral-50 pb-3">
                                🔧 Fine-tune Operational &amp; Material Costs (1 Juice)
                              </h4>

                              <div className="space-y-4 text-xs font-bold text-neutral-700">
                                {/* Fruit Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">🍉 Raw Fruit / Ingredient Cost</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costFruit}
                                      onChange={(e) => setCostFruit(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Cup Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">🥤 Glass Cup &amp; Lid Cost</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costCupLid}
                                      onChange={(e) => setCostCupLid(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Packaging Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">📦 Packaging &amp; Label Cost</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costPackaging}
                                      onChange={(e) => setCostPackaging(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Delivery Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">🛵 Logistics &amp; Delivery Cost (applicable)</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costDelivery}
                                      onChange={(e) => setCostDelivery(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Electricity Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">⚡ Electricity / Blending Power allocation</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costElectricity}
                                      onChange={(e) => setCostElectricity(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Shop Rent */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">🏠 Hadapsar Rent Allocation (per unit volume)</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costRent}
                                      onChange={(e) => setCostRent(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Other Ops Cost */}
                                <div className="flex justify-between items-center py-2.5 border-b border-neutral-100">
                                  <label className="text-neutral-600">🛠️ Miscellaneous Operational overhead</label>
                                  <div className="flex items-center bg-[#E2EBE5] px-2 py-0.5 rounded-lg border border-[#054A29]/15 focus-within:border-[#054A29]/40 focus-within:ring-1 focus-within:ring-[#054A29]/20">
                                    <span className="text-[#054A29] font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="0.1" 
                                      min="0"
                                      value={costOperations}
                                      onChange={(e) => setCostOperations(Number(e.target.value))}
                                      className="font-mono font-black text-[#054A29] bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>

                                {/* Selling Price */}
                                <div className="flex justify-between items-center pt-4 pb-2 border-t border-neutral-100">
                                  <label className="text-neutral-800 font-extrabold font-sans">💰 Retail Selling Price</label>
                                  <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-200">
                                    <span className="text-amber-700 font-black mr-0.5 font-mono text-xs">₹</span>
                                    <input 
                                      type="number" 
                                      step="1" 
                                      min="0"
                                      value={costSellingPrice}
                                      onChange={(e) => setCostSellingPrice(Number(e.target.value))}
                                      className="font-mono font-black text-amber-700 bg-transparent w-16 text-right focus:outline-none text-xs"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Cost Calculations Results Panel */}
                            <div className="space-y-6">
                              {/* Formula Card */}
                              <div className="bg-[#054A29] text-white rounded-3xl p-6 shadow-md relative overflow-hidden space-y-4">
                                <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-[#E2EBE5]/10 rounded-full blur-2xl pointer-events-none" />
                                
                                <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">Standard Accounting Equation</span>
                                <h4 className="text-lg font-black font-sans leading-tight">1 Juice Retail Formula Breakdown</h4>
                                
                                <div className="bg-white/10 p-4 rounded-2xl space-y-2.5 backdrop-blur-sm text-xs font-medium border border-white/10 text-left">
                                  <div className="flex justify-between items-center text-amber-300 font-black uppercase text-[10px]">
                                    <span>Formula Component</span>
                                    <span>Contribution (₹)</span>
                                  </div>
                                  
                                  <div className="flex justify-between items-center">
                                    <span>🍉 Fruit Cost</span>
                                    <span className="font-mono font-bold">₹{costFruit.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>🥤 Glass Cup &amp; Lid</span>
                                    <span className="font-mono font-bold">₹{costCupLid.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>📦 Packaging Label</span>
                                    <span className="font-mono font-bold">₹{costPackaging.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>🛵 Delivery Dispatch</span>
                                    <span className="font-mono font-bold">₹{costDelivery.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>⚡ Electricity Blending</span>
                                    <span className="font-mono font-bold">₹{costElectricity.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span>🏠 Hadapsar Rent</span>
                                    <span className="font-mono font-bold">₹{costRent.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span>🛠️ Other Operational Overhead</span>
                                    <span className="font-mono font-bold">₹{costOperations.toFixed(2)}</span>
                                  </div>

                                  <div className="flex justify-between items-center pt-1.5 font-black text-white text-sm">
                                    <span className="uppercase text-[10px] tracking-wider text-amber-400">Total Production Cost:</span>
                                    <span className="font-mono">₹{totalUnitProductionCost.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* P&L Analysis Results Card */}
                              <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm text-left space-y-5">
                                <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider font-sans border-b border-neutral-50 pb-2">
                                  📈 Profitability &amp; P&amp;L Analysis
                                </h4>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                    <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Total Unit Cost</span>
                                    <span className="text-xl font-black text-neutral-800 font-mono">₹{totalUnitProductionCost.toFixed(2)}</span>
                                  </div>
                                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                                    <span className="text-[9px] uppercase font-black tracking-wider text-neutral-400 block">Retail Selling Price</span>
                                    <span className="text-xl font-black text-[#054A29] font-mono">₹{costSellingPrice.toFixed(2)}</span>
                                  </div>
                                  <div className="p-4 rounded-2xl bg-[#E2EBE5] border border-[#054A29]/15">
                                    <span className="text-[9px] uppercase font-black tracking-wider text-[#054A29]/70 block">Profit per Juice</span>
                                    <span className="text-xl font-black text-[#054A29] font-mono">₹{unitProfit.toFixed(2)}</span>
                                  </div>
                                  <div className={`p-4 rounded-2xl border ${
                                    unitMarginPercentage >= 70 
                                      ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                                      : unitMarginPercentage >= 40 
                                      ? "bg-[#E2EBE5] text-[#054A29] border-[#054A29]/10" 
                                      : unitMarginPercentage >= 15 
                                      ? "bg-amber-50 text-amber-800 border-amber-200" 
                                      : "bg-red-50 text-red-850 border-red-200"
                                  }`}>
                                    <span className="text-[9px] uppercase font-black tracking-wider opacity-70 block">Profit Margin (%)</span>
                                    <span className="text-xl font-black font-mono">{unitMarginPercentage.toFixed(1)}%</span>
                                  </div>
                                </div>

                                {/* Stacked progress visual graph representing cost vs profit */}
                                <div className="space-y-2">
                                  <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">
                                    Visual Unit Cost / Profit Split
                                  </span>
                                  <div className="w-full bg-neutral-100 h-6 rounded-2xl overflow-hidden flex font-mono font-bold text-[9px] text-center text-white">
                                    {totalUnitProductionCost > 0 && (
                                      <div 
                                        className="bg-neutral-400 flex items-center justify-center transition-all duration-350"
                                        style={{ width: `${(totalUnitProductionCost / (totalUnitProductionCost + unitProfit)) * 100}%` }}
                                        title={`Cost: ₹${totalUnitProductionCost.toFixed(2)}`}
                                      >
                                        Cost ({(totalUnitProductionCost / (totalUnitProductionCost + unitProfit) * 100).toFixed(0)}%)
                                      </div>
                                    )}
                                    {unitProfit > 0 && (
                                      <div 
                                        className="bg-[#054A29] flex items-center justify-center transition-all duration-350"
                                        style={{ width: `${(unitProfit / (totalUnitProductionCost + unitProfit)) * 100}%` }}
                                        title={`Profit: ₹${unitProfit.toFixed(2)}`}
                                      >
                                        Profit ({(unitProfit / (totalUnitProductionCost + unitProfit) * 100).toFixed(0)}%)
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Alert Message Callout */}
                                <div className={`p-4 rounded-2xl border flex items-start gap-2.5 text-xs font-medium leading-relaxed ${
                                  unitMarginPercentage >= 70 
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                                    : unitMarginPercentage >= 40 
                                    ? "bg-neutral-50 text-neutral-700 border-neutral-100" 
                                    : unitMarginPercentage >= 15 
                                    ? "bg-amber-50 text-amber-800 border-amber-100" 
                                    : "bg-red-50 text-red-800 border-red-150"
                                }`}>
                                  <span className="text-base select-none">
                                    {unitMarginPercentage >= 70 ? "💎" : unitMarginPercentage >= 40 ? "✨" : unitMarginPercentage >= 15 ? "⚠️" : "🚨"}
                                  </span>
                                  <div className="text-left">
                                    <span className="font-extrabold block">
                                      {unitMarginPercentage >= 70 
                                        ? "Premium High-Margin Recipe (Excellent Profitability)" 
                                        : unitMarginPercentage >= 40 
                                        ? "Solid Profit Margin (Healthy Retail Profile)" 
                                        : unitMarginPercentage >= 15 
                                        ? "Narrow Margin (Monitor Raw Materials Cost closely)" 
                                        : "Critically Low Margin / Loss Maker (Urgent pricing action required)"}
                                    </span>
                                    <span className="text-[10.5px] opacity-80 block mt-0.5">
                                      {unitMarginPercentage >= 70 
                                        ? "This product has a stellar retail profile. The Hadapsar store should prioritize premium catalog placement & coupon active codes to push demand further." 
                                        : unitMarginPercentage >= 40 
                                        ? "Maintains standard retail benchmark. Balanced fruit and logistics costs keep this blend highly attractive for both subscribers and walk-in sales." 
                                        : unitMarginPercentage >= 15 
                                        ? "Operating below safe operational targets. Suggest bulk ingredients purchasing or raw fruit costs optimization to increase health score." 
                                        : "This juice costs more than its retail realization value. Increase selling price or renegotiate direct farm supply costs immediately."}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* ----------------- TAB: SETTINGS ----------------- */}
                {activeTab === "settings" && (
                  <div className="space-y-6 text-left">
                    <div>
                      <h2 className="text-2xl font-black text-neutral-800 tracking-tight">System &amp; Outlet Settings</h2>
                      <p className="text-xs text-neutral-500 mt-1">Configure general metadata variables for your Pune shop.</p>
                    </div>

                    <div className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm max-w-2xl space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Store Name</label>
                          <input type="text" defaultValue="FresCo HealthCraft" className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Store Phone Contact</label>
                          <input type="text" defaultValue="+91 89833 63146" className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Store email support</label>
                          <input type="email" defaultValue="frescofruit.pune@gmail.com" className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Delivery Coverage</label>
                          <input type="text" defaultValue="Pune, Maharashtra (15km radius)" className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-bold" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Outlet Address</label>
                          <textarea rows={2} defaultValue="Amanora Urban Plaza, near Sanjay medico, Amanora Park Town, Hadapsar, Pune, Maharashtra 411028" className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-bold" />
                        </div>
                      </div>

                      <button className="bg-[#054A29] hover:bg-[#0B4225] text-white px-6 py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer shadow-sm">
                        Save System Settings
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </main>

          </motion.div>
        )}

        {/* ----------------- GLOBAL ACTIONS FORM MODAL ----------------- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm select-none">
            
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="relative bg-white w-[96%] max-w-md rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 z-10 p-6 text-left"
            >
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-black text-base text-neutral-800 uppercase tracking-tight">
                  {modalMode === "add" ? "Create New" : "Edit"} {modalType.toUpperCase()}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-neutral-50 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* PRODUCT MODAL FORM */}
              {modalType === "product" && (
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Juice Name</label>
                      <input
                        type="text" required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29]"
                        placeholder="e.g., Avocado Green Shake"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-neutral-400">Category</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className="w-full text-xs p-3 border border-neutral-200 bg-white rounded-xl focus:outline-none"
                        >
                          <option value="Fruit Juices">Fruit Juices</option>
                          <option value="Fresco Power Juices">FresCo Power Juices</option>
                          <option value="Green Vitality Juice">Green Vitality Juice</option>
                          <option value="Power Cups">Power Cups</option>
                          <option value="Shakes">Shakes</option>
                          <option value="Specials">Specials</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-neutral-400">Price (₹)</label>
                        <input
                          type="number" required min={0}
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] font-mono font-bold text-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Emoji icon</label>
                      <input
                        type="text" required maxLength={4}
                        value={productForm.icon}
                        onChange={(e) => setProductForm({ ...productForm, icon: e.target.value })}
                        className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29] text-center font-bold text-base"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Product Description</label>
                      <textarea
                        rows={2} required
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full text-xs p-3 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#054A29]"
                        placeholder="Explain premium extract process..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#054A29] hover:bg-[#0B4225] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer shadow-sm"
                  >
                    Save Juice Listing
                  </button>
                </form>
              )}

              {/* ORDER MODAL FORM */}
              {modalType === "order" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formEl = e.currentTarget;
                  const nameInput = formEl.elements.namedItem("custName") as HTMLInputElement;
                  const phoneInput = formEl.elements.namedItem("custPhone") as HTMLInputElement;
                  const addrInput = formEl.elements.namedItem("custAddr") as HTMLTextAreaElement;
                  const payInput = formEl.elements.namedItem("custAmt") as HTMLInputElement;
                  const locInput = formEl.elements.namedItem("custLoc") as HTMLSelectElement;

                  const newOrder: Order = {
                    id: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
                    customerName: nameInput.value,
                    phone: phoneInput.value,
                    email: "direct_admin@fresco.com",
                    address: addrInput.value,
                    puneLocation: locInput.value,
                    totalBeforePromo: Number(payInput.value),
                    discountValue: 0,
                    payableAmount: Number(payInput.value),
                    status: "pending",
                    timestamp: new Date().toLocaleString("en-IN"),
                    items: [
                      { id: `c_${Date.now()}`, menuItem: products[0] || { id: "m1", name: "Fresh Custom Drop", price: Number(payInput.value), category: "Fruit Juices", description: "Fresh press", icon: "🥤" }, quantity: 1, finalPrice: Number(payInput.value) }
                    ]
                  };
                  const updated = [newOrder, ...orders];
                  setOrders(updated);
                  syncStorage("fresco_orders", updated);
                  setIsModalOpen(false);
                }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Customer Name</label>
                    <input type="text" name="custName" required className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none" placeholder="e.g. Aditi Deshmukh" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Phone</label>
                      <input type="text" name="custPhone" required defaultValue="+91 " className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Pune Location</label>
                      <select name="custLoc" className="w-full text-xs p-3 border border-neutral-200 bg-white rounded-xl focus:outline-none">
                        <option value="Hadapsar">Hadapsar</option>
                        <option value="Kothrud">Kothrud</option>
                        <option value="Aundh">Aundh</option>
                        <option value="Viman Nagar">Viman Nagar</option>
                        <option value="Kalyani Nagar">Kalyani Nagar</option>
                        <option value="Baner">Baner</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Total Price (₹)</label>
                    <input type="number" name="custAmt" required defaultValue="500" className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Delivery Address</label>
                    <textarea name="custAddr" required rows={2} className="w-full text-xs p-3 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none" placeholder="Full residential location..." />
                  </div>
                  <button type="submit" className="w-full bg-[#054A29] hover:bg-[#0B4225] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer shadow-sm">
                    Issue Order Ticket
                  </button>
                </form>
              )}

              {/* INVENTORY MODAL FORM */}
              {modalType === "ingredient" && (
                <form onSubmit={handleSaveIngredient} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Raw Ingredient Name</label>
                    <input
                      type="text" required
                      value={ingredientForm.name}
                      onChange={(e) => setIngredientForm({ ...ingredientForm, name: e.target.value })}
                      className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none"
                      placeholder="e.g. Nagpur Strawberries"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Category</label>
                      <select
                        value={ingredientForm.category}
                        onChange={(e) => setIngredientForm({ ...ingredientForm, category: e.target.value as any })}
                        className="w-full text-xs p-3 border border-neutral-200 bg-white rounded-xl focus:outline-none"
                      >
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Cups & Plate">Cups & Plate</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400">Warehouse stock (kg)</label>
                      <input
                        type="number" required
                        value={ingredientForm.stock}
                        onChange={(e) => setIngredientForm({ ...ingredientForm, stock: Number(e.target.value) })}
                        className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-neutral-400">Supplier</label>
                    <input
                      type="text" required
                      value={ingredientForm.supplier}
                      onChange={(e) => setIngredientForm({ ...ingredientForm, supplier: e.target.value })}
                      className="w-full text-xs p-3.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#054A29] hover:bg-[#0B4225] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer shadow-sm"
                  >
                    Add Raw Stock Item
                  </button>
                </form>
              )}



            </motion.div>
          </div>
        )}

      </div>
    </AnimatePresence>
  );
}
