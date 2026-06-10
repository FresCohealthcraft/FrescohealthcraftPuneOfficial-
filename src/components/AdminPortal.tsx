import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, FileSpreadsheet, Package, Activity, Trash2, TrendingUp, CheckCircle } from "lucide-react";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({
  isOpen,
  onClose,
}: AdminPortalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const savedOrders = JSON.parse(localStorage.getItem("fresco_orders") || "[]");
      setOrders(savedOrders);
    }
  }, [isOpen]);

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
    if (confirm("Are you sure you want to clear all local order checkout histories?")) {
      localStorage.removeItem("fresco_orders");
      setOrders([]);
    }
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
                      <span className="text-lg sm:text-xl font-serif italic text-[#1A1A1A] block mt-1">₹{totalRevenue}</span>
                    </div>

                    <div className="bg-[#F9F8F4] p-4 rounded-2xl text-left border border-[#1A1A1A]/5">
                      <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest block">Active Tickets</span>
                      <span className="text-lg sm:text-xl font-serif italic text-amber-700 block mt-1">{activeCount}</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl text-left border border-[#1A1A1A]/10">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Checkouts log</span>
                      <span className="text-lg sm:text-xl font-serif italic text-[#1A1A1A] block mt-1">{orders.length}</span>
                    </div>
                  </div>

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

                      <button
                        onClick={handleClearOrders}
                        disabled={orders.length === 0}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3.5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider border border-red-100 transition-all cursor-pointer disabled:opacity-40"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-0.5" />
                        <span>Clear Logs</span>
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
                            <th className="p-3">Pune Area</th>
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
                              <td className="p-3 text-gray-500 max-w-[100px] truncate" title={o.address}>
                                {o.puneLocation}
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

                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
