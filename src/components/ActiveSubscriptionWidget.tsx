import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronRight, ShieldCheck, Clock, Play, Pause, RefreshCw } from "lucide-react";

export default function ActiveSubscriptionWidget() {
  const [activePlan, setActivePlan] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkPlanState = () => {
    const saved = localStorage.getItem("fresco_active_sub_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          // Check if plan has completed all deliveries (expired)
          const isExpired = parsed.deliveriesCompleted >= parsed.totalDeliveries;
          if (!isExpired) {
            setActivePlan(parsed);
            return;
          }
        }
      } catch (e) {}
    }
    setActivePlan(null);
  };

  useEffect(() => {
    checkPlanState();
    // Synchronize instantly across storage updates
    window.addEventListener("storage", checkPlanState);
    const interval = setInterval(checkPlanState, 1500);

    return () => {
      window.removeEventListener("storage", checkPlanState);
      clearInterval(interval);
    };
  }, []);

  if (!activePlan) return null;

  const getTodayItemForPlan = (planId: string, completed: number) => {
    const dayIndex = completed;
    const daysArr = ["Detox Monday 🌱", "Immunity Tuesday 🛡️", "Energy Wednesday ⚡", "Glow Thursday ✨", "Fitness Friday 💪", "Refresh Saturday 🍉"];
    const targetDayName = daysArr[dayIndex % 6];

    if (planId === "sub_weekly_nutrient") {
      return { juice: "Fresh Green Cycle", icon: "🌱", description: `${targetDayName} drop matching your 6-day cycle` };
    } else if (planId === "sub_weekly_fruit_juice") {
      return { juice: "Weekly Fruit Juice", icon: "🍊", description: `${targetDayName} fresh seasonal fruit blend` };
    } else if (planId?.startsWith("custom_plan")) {
      return { juice: "My Custom Selection", icon: "🥤", description: `${targetDayName} customized drops` };
    } else if (planId?.includes("green_taster")) {
      return { juice: "Daily Fresh Fruit Juice", icon: "🥝", description: "Fresh seasonal juice with organic sprouts bowl" };
    } else if (planId?.includes("balanced_cleanse")) {
      return { juice: "Daily Protein Cup", icon: "🥑", description: "Protein booster snack with organic sprouts bowl" };
    } else {
      return { juice: "Wellness Overhaul Drop", icon: "🌿", description: "Premium tailored body transformation package" };
    }
  };

  const todayItem = getTodayItemForPlan(activePlan.id, activePlan.deliveriesCompleted);
  const progressPercent = Math.min(100, Math.max(0, (activePlan.deliveriesCompleted / activePlan.totalDeliveries) * 100));

  const handleScrollToTracker = () => {
    const tracker = document.getElementById("subscription-tracker-desk");
    if (tracker) {
      tracker.scrollIntoView({ behavior: "smooth", block: "center" });
      // Add a brief glow effect
      tracker.classList.add("ring-4", "ring-[#38A325]/50", "transition-all", "duration-500");
      setTimeout(() => {
        tracker.classList.remove("ring-4", "ring-[#38A325]/50");
      }, 2000);
    }
    setIsExpanded(false);
  };

  return (
    <div id="active-plan-float-mobile" className="fixed bottom-24 left-4 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm pointer-events-auto">
      <AnimatePresence>
        {!isExpanded ? (
          // Compact Pill View (Perfect for mobile screens)
          <motion.button
            key="compact-pill"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-2 bg-neutral-900 text-white rounded-full pl-3.5 pr-2 py-2 shadow-2xl border border-white/10 hover:bg-neutral-800 transition-all cursor-pointer group text-xs font-semibold"
          >
            <span className="relative flex h-2 w-2 mr-0.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePlan.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${activePlan.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
            </span>
            <span>🌱 Active Plan:</span>
            <span className="text-[#38A325] font-bold tracking-tight max-w-[130px] truncate">
              {activePlan.name}
            </span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded-full text-[10px] font-mono text-gray-300">
              {activePlan.deliveriesCompleted}/{activePlan.totalDeliveries}
            </span>
            <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
              <ChevronRight className="w-3 h-3" />
            </div>
          </motion.button>
        ) : (
          // Detailed Quick-Inspection Card
          <motion.div
            key="expanded-card"
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="bg-neutral-900 border border-white/15 rounded-2xl p-4 shadow-3xl text-left text-white overflow-hidden relative"
          >
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#38A325]/10 rounded-full filter blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#38A325]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38A325]">Fresco Pune Subscription</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 bg-neutral-800 rounded"
              >
                Hide
              </button>
            </div>

            <h4 className="font-serif italic font-bold text-sm tracking-tight text-white mb-0.5">
              {activePlan.name}
            </h4>
            <p className="text-[10px] text-gray-400 mb-2">
              Status: <span className={`font-bold capitalize ${activePlan.status === "active" ? "text-emerald-400" : "text-amber-400"}`}>{activePlan.status === "active" ? "In Progress" : "Paused"}</span>
            </p>

            {/* Delivery Progress */}
            <div className="space-y-1 mt-2.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400">Total Progress:</span>
                <span className="font-bold font-mono text-gray-200">
                  {activePlan.deliveriesCompleted} of {activePlan.totalDeliveries} Drops
                </span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#38A325] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>

            {/* Today's Drop Highlight */}
            <div className="bg-neutral-800/80 border border-neutral-700/50 rounded-xl p-2.5 mt-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-gray-300">
                <span className="text-sm select-none">{todayItem.icon}</span>
                <span>Next Dispatch Drop:</span>
              </div>
              <p className="text-[11.5px] font-bold text-white leading-tight">
                {todayItem.juice}
              </p>
              <p className="text-[9.5px] text-neutral-400 leading-normal">
                {todayItem.description}
              </p>
            </div>

            {/* Details CTA Link */}
            <button
              onClick={handleScrollToTracker}
              className="w-full bg-[#38A325] hover:bg-[#2f8a1e] text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg mt-3 text-center transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Manage My Subscriptions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
