import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, FileSpreadsheet, Package, Activity, Trash2, TrendingUp, CheckCircle, Bell, Users, Calendar, Clock, RefreshCw, Send, Pause, Play, Check } from "lucide-react";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({
  isOpen,
  onClose,
}: AdminPortalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "subscriptions">("orders");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const loadLogs = () => {
      const savedOrders = JSON.parse(localStorage.getItem("fresco_orders") || "[]");
      setOrders(savedOrders);

      const savedSubs = JSON.parse(localStorage.getItem("fresco_subscriptions") || "[]");
      // Seed default active plan if empty so that the admin has beautiful sample entries right away
      if (savedSubs.length === 0) {
        const defaultSub = {
          id: "sub_weekly_nutrient",
          name: "Standard 6-day nutrient cycle",
          type: "weekly",
          price: 1018,
          startDate: "2026-06-12",
          renewalDate: "2026-06-19",
          deliveriesCompleted: 0,
          totalDeliveries: 6,
          status: "active",
          customerName: "Awaiting Client Setup",
          customerPhone: "+91 xxxxx xxxxx",
          customerLocation: "Pune",
          customerAddress: "Please register your delivery address profile at the customer end (website) to see custom subscriber dispatches here.",
          lastUpdated: new Date().toISOString()
        };
        savedSubs.push(defaultSub);
        localStorage.setItem("fresco_subscriptions", JSON.stringify(savedSubs));
      }
      setSubscriptions(savedSubs);
    };

    if (isOpen) {
      loadLogs();
      window.addEventListener("storage", loadLogs);
    }
    return () => {
      window.removeEventListener("storage", loadLogs);
    };
  }, [isOpen]);

  const handleUpdateSubscriptionStatus = (id: string, phone: string, newStatus: "active" | "paused") => {
    const updated = subscriptions.map((s) => {
      if (s.id === id || (s.customerPhone === phone && s.id === id)) {
        return { ...s, status: newStatus };
      }
      return s;
    });
    setSubscriptions(updated);
    localStorage.setItem("fresco_subscriptions", JSON.stringify(updated));

    // Sync client visual tracker
    const clientSubStr = localStorage.getItem("fresco_active_sub_v2");
    if (clientSubStr) {
      try {
        const clientSub = JSON.parse(clientSubStr);
        if (clientSub.id === id) {
          localStorage.setItem("fresco_active_sub_v2", JSON.stringify({ ...clientSub, status: newStatus }));
        }
      } catch (e) {}
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleAdvanceSubscriptionDelivery = (id: string, currentDays: number, totalDays: number) => {
    const nextDays = currentDays + 1;
    if (nextDays > totalDays) {
      alert("This subscription cycle is already 100% completed!");
      return;
    }
    
    const updated = subscriptions.map((s) => {
      if (s.id === id) {
        return { ...s, deliveriesCompleted: nextDays };
      }
      return s;
    });
    setSubscriptions(updated);
    localStorage.setItem("fresco_subscriptions", JSON.stringify(updated));

    // Sync client visual tracker
    const clientSubStr = localStorage.getItem("fresco_active_sub_v2");
    if (clientSubStr) {
      try {
        const clientSub = JSON.parse(clientSubStr);
        if (clientSub.id === id) {
          localStorage.setItem("fresco_active_sub_v2", JSON.stringify({ ...clientSub, deliveriesCompleted: nextDays }));
        }
      } catch (e) {}
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleSetSubscriptionDeliveryCount = (id: string, count: number) => {
    const updated = subscriptions.map((s) => {
      if (s.id === id) {
        return { ...s, deliveriesCompleted: count };
      }
      return s;
    });
    setSubscriptions(updated);
    localStorage.setItem("fresco_subscriptions", JSON.stringify(updated));

    // Sync client visual tracker
    const clientSubStr = localStorage.getItem("fresco_active_sub_v2");
    if (clientSubStr) {
      try {
        const clientSub = JSON.parse(clientSubStr);
        if (clientSub.id === id) {
          localStorage.setItem("fresco_active_sub_v2", JSON.stringify({ ...clientSub, deliveriesCompleted: count }));
        }
      } catch (e) {}
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleCancelSubscription = (id: string) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
    localStorage.setItem("fresco_subscriptions", JSON.stringify(updated));

    // Clear client visual tracker if matching
    const clientSubStr = localStorage.getItem("fresco_active_sub_v2");
    if (clientSubStr) {
      try {
        const clientSub = JSON.parse(clientSubStr);
        if (clientSub.id === id) {
          localStorage.removeItem("fresco_active_sub_v2");
        }
      } catch (e) {}
    }
    window.dispatchEvent(new Event("storage"));
  };

  const getSubscriptionItemForDay = (planId: string, dayIndex: number) => {
    const nutrientCycle = [
      { juice: "Detox Monday", icon: "🌱", description: "Detox Body + Sprouts Bowl" },
      { juice: "Immunity Tuesday", icon: "🛡️", description: "Immunity Booster + Classic Delight Cup" },
      { juice: "Energy Wednesday", icon: "⚡", description: "Vital Energy Drink + Protein Power Cup" },
      { juice: "Glow Thursday", icon: "✨", description: "Skin Glow-up + Exotic Delight Cup" },
      { juice: "Fitness Friday", icon: "💪", description: "Fat Burner + Paneer Sprouts Bowl" },
      { juice: "Refresh Saturday", icon: "🍉", description: "ABC Drink + Banana Shake" }
    ];

    const fruitJuiceCycle = [
      { juice: "Watermelon Monday", icon: "🍉", description: "Pure Organic Cold-Pressed Watermelon Juice" },
      { juice: "Orange Tuesday", icon: "🍊", description: "Fresh Sweet Valencia Orange Press" },
      { juice: "Pineapple Wednesday", icon: "🍍", description: "Bromelain-Rich Refreshing Pineapple Cold Press" },
      { juice: "Mosambi Thursday", icon: "🥤", description: "Sweet Lime Natural Immunity Extract" },
      { juice: "Apple Friday", icon: "🍎", description: "Royal Red Gala Apple Juice Extract" },
      { juice: "ABC Saturday", icon: "🥤", description: "Apple Beetroot Carrot Detox Special" }
    ];

    if (planId === "sub_weekly_fruit_juice") {
      const idx = dayIndex % 6;
      return fruitJuiceCycle[idx];
    } else if (planId === "sub_weekly_nutrient") {
      const idx = dayIndex % 6;
      return nutrientCycle[idx];
    } else {
      const idx = dayIndex % 6;
      const baseItem = nutrientCycle[idx];
      if (planId.includes("green_taster")) {
        return { juice: "Daily Fresh Fruit Juice", icon: "🥝", description: "Fresh organic juice + Daily Sprouts Bowl" };
      } else if (planId.includes("balanced_cleanse")) {
        return { juice: "Daily Protein Cup", icon: "🥑", description: "Protein rich snack + Daily Organic Sprouts Bowl" };
      } else {
        return { juice: baseItem.juice, icon: baseItem.icon, description: `Wellness Overhaul Drop: ${baseItem.description}` };
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "Sumi@2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid Admin Passkey.");
    }
  };

  const handleClearOrders = () => {
    localStorage.removeItem("fresco_orders");
    setOrders([]);
  };

  // Compute top ordered items by quantity
  const getTopOrderedItems = () => {
    const counts: { [key: string]: { name: string; quantity: number; icon: string; category: string } } = {};
    orders.forEach((o) => {
      // Only count non-cancelled orders for accurate demand tracking
      if (o.status === "cancelled") return;
      
      if (o.items && Array.isArray(o.items)) {
        o.items.forEach((item: any) => {
          const menuItem = item.menuItem;
          if (!menuItem) return;
          const id = menuItem.id || menuItem.name;
          const name = menuItem.name;
          const icon = menuItem.icon || "🥤";
          const category = menuItem.category || "Drink";
          const qty = Number(item.quantity) || 1;

          if (counts[id]) {
            counts[id].quantity += qty;
          } else {
            counts[id] = { name, quantity: qty, icon, category };
          }
        });
      }
    });

    return Object.values(counts)
      .sort((a, b) => b.quantity - a.quantity);
  };

  const topItems = getTopOrderedItems();

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem("fresco_orders", JSON.stringify(updated));
  };

  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order ID", "Customer Name", "Phone", "Pune Area", "Address", "Amount", "Status", "Timestamp"];
    const rows = orders.map((o) => [
      o.id,
      o.customerName,
      o.phone,
      o.puneLocation,
      `"${o.address.replace(/"/g, '""')}"`,
      o.payableAmount,
      o.status,
      o.timestamp,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fresco_Pune_Orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute metrics
  const totalRevenue = orders.reduce((acc, current) => acc + (current.status !== "cancelled" ? current.payableAmount : 0), 0);
  const activeCount = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
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
            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#1A1A1A]/10 z-10 max-h-[85vh] flex flex-col text-left"
          >
            
            {/* Header */}
            <div className="p-5 border-b border-[#1A1A1A]/5 bg-[#EFECE5]/40 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Shield className="w-5 h-5 text-[#38A325]" />
                <div>
                  <h3 className="font-serif italic text-base text-[#1A1A1A]">
                    Fresco Pune Admin Center
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#38A325] mt-1">
                    Outlet Management &amp; Analytics
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#EFECE5] rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              
              {!isAuthenticated ? (
                /* Passkey request form */
                <form onSubmit={handleLogin} className="max-w-xs mx-auto text-center py-12 space-y-4">
                  <span className="text-5xl select-none">🔑</span>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Passkey Authentication</h4>
                    <p className="text-xs text-gray-450 mt-1">
                      Enter the owner's credential passkey to monitor checkout requests, revenue, and active logs.
                    </p>
                  </div>

                  <input
                    type="password"
                    placeholder="Enter passkey..."
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/50 text-center uppercase tracking-widest font-bold"
                  />
                  {authError && <p className="text-[10px] text-red-500 font-bold">{authError}</p>}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1A1A1A] hover:bg-[#38A325] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-colors"
                    >
                      Verify &amp; Unlock
                    </button>
                  </div>
                </form>
              ) : (
                /* Authenticated State */
                <div className="space-y-6 text-xs">
                  
                  {/* Analytic Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#EFECE5]/40 p-4 rounded-2xl text-left border border-[#1A1A1A]/5">
                      <span className="text-[9px] font-bold text-[#38A325] uppercase tracking-widest block">Total Sales</span>
                      <span className="text-lg sm:text-xl font-sans font-extrabold text-[#1A1A1A] block mt-1">₹{totalRevenue}</span>
                    </div>

                    <div className="bg-[#F9F8F4] p-4 rounded-2xl text-left border border-[#1A1A1A]/5">
                      <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest block">Active Tickets</span>
                      <span className="text-lg sm:text-xl font-sans font-extrabold text-amber-700 block mt-1">{activeCount}</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl text-left border border-[#1A1A1A]/10">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Checkouts log</span>
                      <span className="text-lg sm:text-xl font-sans font-extrabold text-[#1A1A1A] block mt-1">{orders.length}</span>
                    </div>
                  </div>

                  {/* 📢 Live Daily Morning Dispatch Notifications Alert Center */}
                  <div className="bg-gradient-to-r from-[#38A325]/10 via-[#38A325]/5 to-emerald-500/5 border-2 border-[#38A325]/20 rounded-2xl p-4.5 text-left relative overflow-hidden shadow-xs">
                    <div className="absolute right-0 top-0 w-20 h-20 bg-[#38A325]/5 rounded-full filter blur-lg pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-[#38A325]/15 pb-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <h4 className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <Bell className="w-3.5 h-3.5 text-[#38A325] animate-bounce" />
                          <span>Admin Live Operations: Daily Plan Dispatch Alerts</span>
                        </h4>
                      </div>
                      <span className="text-[8.5px] font-mono text-gray-400">TODAY: {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}</span>
                    </div>

                    {subscriptions.filter(s => s.status === "active" && s.deliveriesCompleted < s.totalDeliveries).length === 0 ? (
                      <p className="text-gray-400 text-[10.5px] italic leading-normal text-center py-2">
                        💡 No active subscriber dispatches scheduled for today. All current customer cycles are closed or paused.
                      </p>
                    ) : (
                      <div className="space-y-2.5 max-h-48 overflow-y-auto">
                        {subscriptions.filter(s => s.status === "active" && s.deliveriesCompleted < s.totalDeliveries).map((sub) => {
                          const todayItem = getSubscriptionItemForDay(sub.selectedPlanId || sub.id, sub.deliveriesCompleted);

                          return (
                            <div key={sub.id} className="bg-white/85 border border-[#38A325]/15 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] shadow-2xs hover:border-[#38A325]/40 transition-all">
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="bg-[#38A325]/15 text-[#38A325] text-[7.5px] font-black px-1.5 py-0.2 rounded font-mono">
                                    DAY D-{sub.deliveriesCompleted + 1}
                                  </span>
                                  <span className="font-bold text-[#1A1A1A]">
                                    {sub.customerName}
                                  </span>
                                  <span className="text-gray-450 font-mono text-[9.5px]">({sub.customerPhone})</span>
                                </div>
                                <p className="text-neutral-500 text-[10.5px] leading-tight">
                                  📦 <strong>Prepare scheduled:</strong> <span className="text-gray-900 font-semibold">{todayItem?.icon || "🥤"} {todayItem?.juice || "Juice Drop"}</span> ({todayItem?.description || ""})
                                </p>
                                <p className="text-[10px] text-gray-400 truncate">
                                  📍 <strong>Pune Address:</strong> {sub.customerAddress}
                                </p>
                                {/* Direct Dispatch Cycle Day Buttons inside Alerts for easy Admin update */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-1.5 border-t border-gray-100/60 pt-1.5">
                                  <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider mr-1">Approve Drop:</span>
                                  {Array.from({ length: sub.totalDeliveries || 6 }).map((_, dIdx) => {
                                    const isDone = dIdx < sub.deliveriesCompleted;
                                    const isCurrent = dIdx === sub.deliveriesCompleted;
                                    return (
                                      <button
                                        key={dIdx}
                                        type="button"
                                        onClick={() => {
                                          // Set specific count
                                          const newCount = isDone ? dIdx : dIdx + 1;
                                          handleSetSubscriptionDeliveryCount(sub.id, newCount);
                                        }}
                                        title={isDone ? `Mark Day ${dIdx+1} as NOT delivered` : `Approve Day ${dIdx+1} as Delivered & Done`}
                                        className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold flex items-center gap-0.5 border cursor-pointer hover:scale-105 transition-all select-none ${
                                          isDone 
                                            ? "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600" 
                                            : isCurrent 
                                            ? "bg-amber-100 text-amber-800 border-amber-400 hover:bg-amber-200 animate-pulse font-extrabold"
                                            : "bg-neutral-50 text-neutral-450 border-neutral-200 hover:bg-neutral-100"
                                        }`}
                                      >
                                        <span>D{dIdx+1}</span>
                                        {isDone && <Check className="w-2 h-2 text-white stroke-[3.5]" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
                                {/* Direct WhatsApp Dispatch templates */}
                                <button
                                  onClick={() => {
                                    const message = `Hello ${sub.customerName}! This is FresCo HealthCraft Pune. 🥤 Your healthy subscription drop for Day D-${sub.deliveriesCompleted + 1} (${todayItem?.juice}) has been freshly cold-pressed and dispatched for premium morning delivery. Arriving shortly! Have a wholesome day. 🌿`;
                                    window.open(`https://wa.me/${sub.customerPhone.replace(/[^0-9]/g, "") || "918983363146"}?text=${encodeURIComponent(message)}`, "_blank");
                                  }}
                                  className="border border-[#38A325]/45 text-[#38A325] bg-emerald-50/50 hover:bg-[#38A325]/10 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-colors"
                                  title="Send Dispatch update to subscriber"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>Ping</span>
                                </button>

                                {/* Complete & Advance Drop */}
                                <button
                                  onClick={() => handleAdvanceSubscriptionDelivery(sub.id, sub.deliveriesCompleted, sub.totalDeliveries)}
                                  className="bg-[#38A325] hover:bg-[#2F891F] text-white px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                                >
                                  <Check className="w-3 h-3 text-white" />
                                  <span>Complete Drop</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Action Tabs Selector */}
                  <div className="flex bg-[#EFECE5] p-1 rounded-2xl border border-[#1A1A1A]/5 shadow-inner">
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`flex-1 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                        activeTab === "orders"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Package className="w-3.5 h-3.5 text-[#38A325]" />
                      <span>Single Delivery Tickets ({orders.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("subscriptions")}
                      className={`flex-1 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                        activeTab === "subscriptions"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-[#38A325]" />
                      <span>Customer Subscriptions Cycle Desk ({subscriptions.length})</span>
                    </button>
                  </div>

                  {activeTab === "orders" ? (
                    <>
                      {/* High Quantity Items Section */}
                      <div className="bg-[#F9F8F4] p-5 rounded-2xl border border-[#1A1A1A]/10 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">🔥</span>
                            <div>
                              <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">High Quantity Items Demand Index</h4>
                              <p className="text-[10px] text-gray-500">Live analytics tracking the highest quantity products ordered across your store.</p>
                            </div>
                          </div>
                          <span className="bg-[#38A325]/10 text-[#38A325] text-[9px] font-bold px-2 py-1 rounded-full uppercase">Live</span>
                        </div>

                        {topItems.length === 0 ? (
                          <div className="bg-white/50 border border-[#1A1A1A]/5 rounded-xl p-6 text-center text-gray-400">
                            <TrendingUp className="w-5 h-5 mx-auto text-gray-300 mb-1" />
                            <span className="text-xs font-semibold text-[#1A1A1A]/60 block">No product analytics available</span>
                            <p className="text-[9px] text-[#1A1A1A]/40 mt-0.5">Place new orders containing items to generate high-demand index rankings.</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {topItems.slice(0, 4).map((item, index) => {
                              // Rank badges or colors
                              const rankColors = [
                                "bg-amber-100 text-amber-800 border-amber-250", // Rank 1
                                "bg-slate-100 text-slate-800 border-slate-250", // Rank 2
                                "bg-amber-50 text-amber-700 border-amber-150",  // Rank 3
                                "bg-gray-50 text-gray-600 border-gray-150"      // Rank 4+
                              ];
                              const rankColor = rankColors[index] || "bg-gray-50 text-gray-600 border-gray-150";

                              return (
                                <div key={item.name} className="bg-white border border-[#1A1A1A]/5 rounded-xl p-3 flex items-center justify-between gap-4 shadow-sm hover:border-[#38A325]/20 transition-colors">
                                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <div className={`w-6 h-6 rounded-lg text-xs font-bold border flex items-center justify-center shrink-0 ${rankColor}`}>
                                      #{index + 1}
                                    </div>
                                    <span className="text-base leading-none select-none shrink-0">{item.icon}</span>
                                    <div className="min-w-0 flex-1">
                                      <h5 className="font-bold text-[#1A1A1A] leading-tight truncate">{item.name}</h5>
                                      <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold font-mono block mt-0.5">{item.category}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="text-right shrink-0">
                                    <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wide">Ordered</span>
                                    <span className="text-xs font-extrabold text-[#38A325]">{item.quantity} {item.quantity === 1 ? 'Unit' : 'Units'}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Actions Header Bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>Order Dispatch Log ({orders.length})</span>
                        </span>

                        <div className="flex space-x-2">
                          <button
                            onClick={exportToCSV}
                            disabled={orders.length === 0}
                            className="bg-[#EFECE5] hover:bg-[#38A325] hover:text-white text-[#1A1A1A] border border-[#1A1A1A]/10 px-3.5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5 mr-0.5" />
                            <span>Export CSV</span>
                          </button>
                        </div>
                      </div>

                      {/* Orders List Tables */}
                      <div className="border border-[#1A1A1A]/10 bg-[#F9F8F4]/50 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
                        {orders.length === 0 ? (
                          <div className="text-center py-16 text-gray-400">
                            <Package className="w-8 h-8 text-gray-300 mx-auto block animate-bounce" />
                            <p className="mt-2 text-xs font-semibold text-[#1A1A1A]/70">No transactions registered yet</p>
                            <p className="text-[10px] text-gray-450 mt-0.5">Submit orders from the cart to watch this populate live!</p>
                          </div>
                        ) : (
                          <table className="w-full text-[11px] text-left border-collapse">
                            <thead className="bg-[#EFECE5]/80 text-[#1A1A1A] font-bold border-b border-[#1A1A1A]/5 uppercase text-[9px] tracking-wide">
                              <tr>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Deliver to Address</th>
                                <th className="p-3">Total Payable</th>
                                <th className="p-3">Dispatch Status</th>
                                <th className="p-3">Registered</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A1A1A]/5">
                              {orders.map((o) => (
                                <tr key={o.id} className="hover:bg-white transition-colors">
                                  <td className="p-3 font-bold text-[#1A1A1A]">
                                    {o.customerName}
                                    <span className="block font-mono text-[9px] text-gray-450 font-normal">{o.phone}</span>
                                  </td>
                                  <td className="p-3 text-gray-500 max-w-[150px] truncate" title={o.address}>
                                    {o.address}
                                  </td>
                                  <td className="p-3 font-mono font-bold text-[#38A325]">₹{o.payableAmount}</td>
                                  <td className="p-3">
                                    <select
                                      value={o.status}
                                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                                      className={`p-1.5 text-[10px] font-bold rounded-lg bg-white border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#38A325] ${
                                        o.status === "delivered" ? "border-[#38A325]/30 text-[#38A325] bg-[#38A325]/5" :
                                        o.status === "cancelled" ? "border-red-300 text-red-650 bg-red-50/20" : "border-amber-300 text-amber-700"
                                      }`}
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="delivered">Delivered</option>
                                      <option value="cancelled">Cancelled</option>
                                    </select>
                                  </td>
                                  <td className="p-3 text-gray-400 font-mono text-[9px]">{o.timestamp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Subscriptions Cycle Desk */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#38A325]" />
                          <span>Customer Subscriptions Cycle Log ({subscriptions.length})</span>
                        </span>
                      </div>

                      <div className="border border-[#1A1A1A]/10 bg-[#F9F8F4]/50 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
                        {subscriptions.length === 0 ? (
                          <div className="text-center py-16 text-gray-400">
                            <Users className="w-8 h-8 text-gray-350 mx-auto block animate-bounce" />
                            <p className="mt-2 text-xs font-semibold text-[#1A1A1A]/70">No active subscriptions registered yet</p>
                            <p className="text-[10px] text-gray-450 mt-0.5">Activate a subscription cycle on the website to see subscriber profiles appear!</p>
                          </div>
                        ) : (
                          <table className="w-full text-[11px] text-left border-collapse">
                            <thead className="bg-[#EFECE5]/80 text-[#1A1A1A] font-bold border-b border-[#1A1A1A]/5 uppercase text-[9px] tracking-wide">
                              <tr>
                                <th className="p-3">Subscriber Address Details</th>
                                <th className="p-3">Active Cycle</th>
                                <th className="p-3">Cycle Progress</th>
                                <th className="p-3">Next Renewal Date</th>
                                <th className="p-3">Cycle Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A1A1A]/5">
                              {subscriptions.map((s) => {
                                const pct = Math.round((s.deliveriesCompleted / s.totalDeliveries) * 100);
                                return (
                                  <tr key={s.id} className="hover:bg-white transition-colors">
                                    <td className="p-3 text-[#1A1A1A] max-w-[140px]">
                                      <div className="font-bold flex items-center gap-1.5">
                                        <span>👤 {s.customerName}</span>
                                      </div>
                                      <span className="block font-mono text-[9px] text-gray-450 mt-0.5">{s.customerPhone}</span>
                                      <span className="block text-[8.5px] text-gray-400 truncate mt-0.5" title={s.customerAddress}>📍 {s.customerAddress}</span>
                                    </td>
                                    <td className="p-3 text-gray-700 font-medium">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs">{s.type === "monthly" ? "👑" : "🌱"}</span>
                                        <div>
                                          <span className="font-bold text-[11.5px]">{s.name}</span>
                                          <span className="block text-[9.5px] text-emerald-700 font-mono font-bold mt-0.5">₹{s.price}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3 min-w-[210px]">
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                          <span className="font-bold text-[#38A325]">{s.deliveriesCompleted}/{s.totalDeliveries} Drops Done</span>
                                          <span className="text-gray-400 font-semibold">{pct}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                          <div
                                            className="bg-[#38A325] h-1.5 rounded-full transition-all duration-300"
                                            style={{ width: `${pct}%` }}
                                          />
                                        </div>
                                        {/* Direct Dispatch Cycle Day Buttons for Admin update */}
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                          {Array.from({ length: s.totalDeliveries || 6 }).map((_, dIdx) => {
                                            const isDone = dIdx < s.deliveriesCompleted;
                                            const isCurrent = dIdx === s.deliveriesCompleted;
                                            return (
                                              <button
                                                key={dIdx}
                                                type="button"
                                                onClick={() => {
                                                  // Set specific count
                                                  const newCount = isDone ? dIdx : dIdx + 1;
                                                  handleSetSubscriptionDeliveryCount(s.id, newCount);
                                                }}
                                                title={isDone ? `Mark Day ${dIdx+1} as NOT delivered` : `Approve Day ${dIdx+1} as Delivered & Done`}
                                                className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold flex items-center gap-0.5 border cursor-pointer hover:scale-105 transition-all select-none ${
                                                  isDone 
                                                    ? "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600" 
                                                    : isCurrent 
                                                    ? "bg-amber-100 text-amber-800 border-amber-400 hover:bg-amber-200 animate-pulse font-extrabold"
                                                    : "bg-neutral-100 text-neutral-450 border-neutral-200 hover:bg-neutral-200"
                                                }`}
                                              >
                                                <span>D{dIdx+1}</span>
                                                {isDone && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                                              </button>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-3 text-gray-400 font-mono text-[10px]">
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Calendar className="w-3 h-3 text-gray-400" />
                                        <span>{s.renewalDate}</span>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <div className="flex items-center space-x-1.5">
                                        {/* Pause/Resume Switch */}
                                        <button
                                          onClick={() => handleUpdateSubscriptionStatus(s.id, s.customerPhone, s.status === "active" ? "paused" : "active")}
                                          className={`p-1.5 rounded-lg border cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                                            s.status === "active"
                                              ? "border-amber-300 text-amber-700 bg-amber-50"
                                              : "border-emerald-300 text-emerald-700 bg-[#38A325]/5"
                                          }`}
                                          title={s.status === "active" ? "Pause subscription" : "Resume subscription"}
                                        >
                                          {s.status === "active" ? (
                                            <Pause className="w-3 h-3" />
                                          ) : (
                                            <Play className="w-3 h-3 fill-current" />
                                          )}
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

