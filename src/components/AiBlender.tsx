import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, CartItem } from "../types";
import { Sparkles, Check, Flame, Activity, Sun, Heart, Info, RefreshCw, ShoppingCart, X } from "lucide-react";

interface AiBlenderProps {
  onSelectItemByName: (name: string) => void;
  onAddCustomToCart: (cartItem: CartItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AiBlender({
  onSelectItemByName,
  onAddCustomToCart,
  isOpen,
  onClose,
}: AiBlenderProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [avoidIngredients, setAvoidIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [recommendationResult, setRecommendationResult] = useState<any | null>(null);
  const [errorText, setErrorText] = useState("");

  const GOALS_LIST = [
    { label: "Immunity Booster", icon: "🛡️" },
    { label: "Skin Glow & Beauty", icon: "✨" },
    { label: "Weight Management", icon: "⚖️" },
    { label: "Detox & Purification", icon: "🌱" },
    { label: "Instant Energy Spike", icon: "⚡" },
    { label: "Digestion Support", icon: "🥝" },
  ];

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const startLoadingAnimation = () => {
    setLoading(true);
    setLoadingStep(0);
    const steps = [
      "Consulting FresCo nutrition experts...",
      "Analyzing your wellness goals...",
      "Extracting bioactive plant ingredients...",
      "Styling your customizable custom blend...",
      "Finishing nutritional evaluation...",
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setLoadingStep(current);
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return interval;
  };

  const handleCraftBlend = async () => {
    setErrorText("");
    setRecommendationResult(null);
    const intervalId = startLoadingAnimation();

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goals: selectedGoals,
          ingredients: avoidIngredients ? [avoidIngredients] : [],
          query: userQuery,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to consult AI Blender");
      }

      const data = await response.json();
      setRecommendationResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorText("Our blender is a bit warm! Please try again in 5 seconds.");
    } finally {
      clearInterval(intervalId);
      setLoading(false);
    }
  };

  const handleAddCustomRecipeToCart = (custom: any) => {
    const mockMenuItem: MenuItem = {
      id: `ai_custom_${Date.now()}`,
      name: custom.name,
      category: "Fresco Power Juices",
      price: custom.estimatedPrice || 95,
      description: custom.benefits,
      icon: "🥤",
    };

    const cartItem: CartItem = {
      id: `ai_custom_cart_${Date.now()}`,
      menuItem: mockMenuItem,
      quantity: 1,
      customIngredients: [
        `Blend: ${custom.ingredients.join(", ")}`,
        `Flavor Note: ${custom.tasteProfile}`,
      ],
      finalPrice: custom.estimatedPrice || 95,
      isCustomRecipe: true,
    };

    onAddCustomToCart(cartItem);
    alert(`Success! "${custom.name}" added to your Cart as a customized healthy recipe.`);
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

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#1A1A1A]/10 z-10 max-h-[90vh] flex flex-col text-left"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#1A1A1A]/5 flex items-center justify-between bg-[#EFECE5]/40">
              <div className="flex items-center space-x-2.5">
                <div className="h-10 w-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg text-[#1A1A1A] leading-tight">
                    AI Wellness Blender Assistant
                  </h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#38A325] mt-1 animate-pulse">
                    Powered by Google Gemini 1.5
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

            {/* Scroll Container */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
              
              {/* Slogan Intro */}
              <div className="bg-[#F9F8F4] p-4 rounded-2xl text-xs text-[#1A1A1A]/70 border border-[#1A1A1A]/5 flex items-start space-x-3">
                <Info className="w-5 h-5 text-[#38A325] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Tell our AI Nutritionist what wellness outcomes you'd like to reach today. We'll craft a customized fresh blend and recommend compatible juices from our official Pune menu!
                </p>
              </div>

              {/* Goal Cards Checklist */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  1. Select Goals
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {GOALS_LIST.map((goal) => {
                    const isSelected = selectedGoals.includes(goal.label);
                    return (
                      <button
                        key={goal.label}
                        onClick={() => handleGoalToggle(goal.label)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center space-x-2.5 cursor-pointer ${
                          isSelected
                            ? "border-[#38A325] bg-[#38A325]/10 text-[#38A325]"
                            : "border-[#1A1A1A]/5 bg-white hover:bg-[#F9F8F4] text-[#1A1A1A]"
                        }`}
                      >
                        <span className="text-lg select-none">{goal.icon}</span>
                        <span>{goal.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific ingredient avoidances */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  2. Ingredient Preferences / Exclusions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Add sweet honey, Avoid celery, Prefer green apple, gluten-free..."
                  value={avoidIngredients}
                  onChange={(e) => setAvoidIngredients(e.target.value)}
                  className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/55"
                />
              </div>

              {/* Open Query text field info */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  3. Describe how you feel (Query)
                </label>
                <textarea
                  placeholder="e.g. I worked out hard today and feel fatigued, need high hydration and recovery. Also, have skin dryness due to Pune summer..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3.5 border border-[#1A1A1A]/10 rounded-2xl focus:ring-1 focus:ring-[#38A325] focus:outline-none bg-[#F9F8F4]/55"
                />
              </div>

              {/* Action Button */}
              {!loading && (
                <button
                  type="button"
                  onClick={handleCraftBlend}
                  disabled={selectedGoals.length === 0 && !userQuery}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#38A325] text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                  <span>Craft My Customized Blend</span>
                </button>
              )}

              {/* Loading State Animation with Step counters */}
              {loading && (
                <div className="py-8 bg-[#F9F8F4] rounded-3xl border border-[#1A1A1A]/10 flex flex-col items-center justify-center text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-[#38A325] animate-spin" />
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Blending your ideas...</h4>
                    <p className="text-xs text-[#38A325] font-bold mt-1.5 animate-pulse uppercase tracking-wider text-[11px]">
                      {[
                        "Consulting FresCo nutrition experts...",
                        "Analyzing your wellness goals...",
                        "Extracting bioactive plant ingredients...",
                        "Styling your customizable custom blend...",
                        "Finishing nutritional evaluation...",
                      ][loadingStep]}
                    </p>
                  </div>
                </div>
              )}

              {errorText && (
                <p className="text-xs text-red-500 font-bold text-center">
                  {errorText}
                </p>
              )}

              {/* Results Showcase blocks */}
              {recommendationResult && (
                <div className="space-y-6 pt-2 border-t border-gray-100">
                  
                  {/* Custom Recipe Generated Showcase Card */}
                  <div className="bg-[#F9F8F4] border border-[#1A1A1A]/10 p-6 rounded-3xl space-y-4 shadow-sm">
                    <span className="bg-[#F26419]/10 text-[#F26419] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#F26419]/10">
                      Custom Crafted Recipe
                    </span>

                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-serif italic text-gray-900 leading-tight">
                          {recommendationResult.customRecipe.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          Flavor Accent: <span className="font-bold text-[#38A325]">{recommendationResult.customRecipe.tasteProfile}</span>
                        </p>
                      </div>
                      <span className="text-2xl font-sans font-extrabold text-[#38A325]">
                        ₹{recommendationResult.customRecipe.estimatedPrice || 85}
                      </span>
                    </div>

                    {/* Ingredients lists */}
                    <div className="space-y-1.5 text-xs text-left">
                      <p className="font-bold text-[#1A1A1A]/80 uppercase tracking-wide text-[10px]">Ingredients needed:</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {recommendationResult.customRecipe.ingredients.map((ing: string, i: number) => (
                           <li key={i} className="flex items-center space-x-2 text-gray-600 bg-white p-2.5 rounded-xl border border-[#1A1A1A]/5 font-medium">
                            <span className="text-[#38A325] font-bold shrink-0">✔</span>
                            <span className="truncate">{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sound clinical health/wellness benefits */}
                    <div className="text-xs text-gray-550 space-y-1.5 text-left leading-relaxed">
                      <p className="font-bold text-[#1A1A1A]/80 uppercase tracking-wide text-[10px]">Nutritionists Wellness Slogan:</p>
                      <p className="bg-white p-3.5 rounded-xl border border-[#1A1A1A]/5 italic text-[#1A1A1A]/70">
                        "{recommendationResult.customRecipe.benefits}"
                      </p>
                    </div>

                    {/* Action buttons */}
                    <button
                      onClick={() => handleAddCustomRecipeToCart(recommendationResult.customRecipe)}
                      className="w-full bg-[#1A1A1A] hover:bg-[#38A325] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4 text-white" />
                      <span>Order This Custom Crafted Recipe</span>
                    </button>
                  </div>

                  {/* Standard Menu recommendations mapped to query */}
                  <div className="space-y-3.5 text-left text-xs">
                    <span className="text-[10px] font-bold text-gray-405 uppercase tracking-widest block">
                      Compatible Standard Pune Menu Juices
                    </span>

                    <div className="space-y-3">
                      {recommendationResult.menuRecommendations.map((rec: any, k: number) => (
                        <div
                          key={k}
                          className="bg-white hover:bg-[#F9F8F4] p-4 border border-[#1A1A1A]/10 rounded-2xl flex items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex-1">
                            <h5 className="font-serif italic text-gray-900 text-sm">
                              {rec.itemName}
                            </h5>
                            <p className="text-xs text-gray-500 mt-1 leading-normal">
                              {rec.reason}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => {
                              onSelectItemByName(rec.itemName);
                              onClose();
                            }}
                            className="bg-[#EFECE5] hover:bg-[#38A325] hover:text-white text-[#1A1A1A] border border-[#1A1A1A]/10 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold cursor-pointer shrink-0"
                          >
                            Order Now
                          </button>
                        </div>
                      ))}
                    </div>
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
