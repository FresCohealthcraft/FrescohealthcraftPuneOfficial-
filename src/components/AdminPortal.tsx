import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, FileSpreadsheet, Package, Activity, Trash2, TrendingUp, CheckCircle } from "lucide-react";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyOffer: {
    title: string;
    description: string;
    tag: string;
    code: string;
  };
  onUpdateDailyOffer: (updated: {
    title: string;
    description: string;
    tag: string;
    code: string;
  }) => void;
}

export default function AdminPortal({
  isOpen,
  onClose,
  dailyOffer,
  onUpdateDailyOffer,
}: AdminPortalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [editOfferTitle, setEditOfferTitle] = useState("");
  const [editOfferDesc, setEditOfferDesc] = useState("");
  const [editOfferTag, setEditOfferTag] = useState("");
  const [editOfferCode, setEditOfferCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      const savedOrders = JSON.parse(localStorage.getItem("fresco_orders") || "[]");
      setOrders(savedOrders);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dailyOffer) {
      setEditOfferTitle(dailyOffer.title || "");
      setEditOfferDesc(dailyOffer.description || "");
      setEditOfferTag(dailyOffer.tag || "");
      setEditOfferCode(dailyOffer.code || "");
    }
  }, [isOpen, dailyOffer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "fresco123") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid Admin Passkey. Hint: fresco123");
    }
  };

  const handleSaveOffer = () => {
    if (!editOfferTitle.trim() || !editOfferDesc.trim()) {
      alert("Please specify at least an Offer Title and Description!");
      return;
    }
    onUpdateDailyOffer({
      title: editOfferTitle.trim(),
      description: editOfferDesc.trim(),
      tag: editOfferTag.trim(),
      code: editOfferCode.trim(),
    });
    alert("Daily Promo Offer configured successfully!");
  };

  const handleClearOrders = () => {
    if (confirm("Are you sure you want to clear all local order checkout histories?")) {
      localStorage.removeItem("fresco_orders");
      setOrders([]);
    }
  };

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
                <Shield className="w-5 h-5 text-[#4A8824]" />
                <div>
                  <h3 className="font-serif italic text-base text-[#1A1A1A]">
                    Fresco Pune Admin Center
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#4A8824] mt-1">
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
                    className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#4A8824] focus:outline-none bg-[#F9F8F4]/50 text-center uppercase tracking-widest font-bold"
                  />
                  {authError && <p className="text-[10px] text-red-500 font-bold">{authError}</p>}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1A1A1A] hover:bg-[#4A8824] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-colors"
                    >
                      Verify &amp; Unlock
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono tracking-wide block">
                     Default Passkey: <span className="font-bold underline text-[#4A8824]">fresco123</span>
                  </span>
                </form>
              ) : (
                /* Authenticated State */
                <div className="space-y-6 text-xs">
                  
                  {/* Analytic Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#EFECE5]/40 p-4 rounded-2xl text-left border border-[#1A1A1A]/5">
                      <span className="text-[9px] font-bold text-[#4A8824] uppercase tracking-widest block">Total Sales</span>
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

                  {/* Daily Offer Management Section */}
                  <div className="bg-[#F9F8F4] p-4.5 rounded-2xl border border-[#1A1A1A]/10 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📢</span>
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Configure Daily Offer Card</h4>
                        <p className="text-[10px] text-gray-500">Edit the primary daily promotional offer displayed to Pune customers.</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-left">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Offer Title</label>
                        <input
                          type="text"
                          value={editOfferTitle}
                          onChange={(e) => setEditOfferTitle(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4A8824]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={editOfferTag}
                            onChange={(e) => setEditOfferTag(e.target.value)}
                            placeholder="e.g. TODAY-ONLY"
                            className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4A8824]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Promo Code</label>
                          <input
                            type="text"
                            value={editOfferCode}
                            onChange={(e) => setEditOfferCode(e.target.value)}
                            placeholder="e.g. FREEBOOST"
                            className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4A8824]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Offer Description / Subtitle</label>
                        <textarea
                          rows={2}
                          value={editOfferDesc}
                          onChange={(e) => setEditOfferDesc(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4A8824]"
                        />
                      </div>

                      <button
                        onClick={handleSaveOffer}
                        className="w-full py-2.5 bg-[#4A8824] hover:bg-[#1A1A1A] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Update Custom Daily Offer</span>
                      </button>
                    </div>
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
                        className="bg-[#EFECE5] hover:bg-[#4A8824] hover:text-white text-[#1A1A1A] border border-[#1A1A1A]/10 px-3.5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer disabled:opacity-40"
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
                              <td className="p-3 font-mono font-bold text-[#4A8824]">₹{o.payableAmount}</td>
                              <td className="p-3">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                                  className={`p-1.5 text-[10px] font-bold rounded-lg bg-white border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4A8824] ${
                                    o.status === "delivered" ? "border-[#4A8824]/30 text-[#4A8824] bg-[#4A8824]/5" :
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
