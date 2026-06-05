import React from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  lightText?: boolean;
}

export default function Logo({ className = "", showTagline = true, size = "md", lightText = false }: LogoProps) {
  // Dimensions and text sizing configurations based on size prop
  const iconSize = size === "sm" ? "h-11 w-11" : size === "md" ? "h-16 w-16" : "h-24 w-24";
  const brandTextSize = size === "sm" ? "text-lg" : size === "md" ? "text-2.5xl" : "text-4xl";
  const subTextSize = size === "sm" ? "text-[8px]" : size === "md" ? "text-[11px]" : "text-[14px]";
  const taglineTextSize = size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-[12px]";

  return (
    <div id="fresco-logo" className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Dynamic beautifully crafted vector graphic representing the wellness emblem */}
      <div className={`${iconSize} relative flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(40,80,30,0.12)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gorgeous gradients matching the uploaded image */}
          <defs>
            <linearGradient id="leafGradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#82C341" />
              <stop offset="100%" stopColor="#418420" />
            </linearGradient>
            <linearGradient id="bodyGradGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8DC63F" />
              <stop offset="100%" stopColor="#4A8824" />
            </linearGradient>
            <linearGradient id="textGradOrange" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F58220" />
              <stop offset="100%" stopColor="#D9531E" />
            </linearGradient>
          </defs>

          {/* BACKGROUND HEART OUTLINE FLANKED IN VECTORS */}
          <path
            d="M 80 132 C 10 90, 10 32, 80 28 C 150 32, 150 90, 80 132 Z"
            stroke="url(#leafGradGreen)"
            strokeWidth="2.5"
            strokeDasharray="1 3"
            className="opacity-20 translate-y-[-2px]"
          />

          {/* EXQUISITE HUMAN WELLNESS WORKOUT FIGURE */}
          {/* Curved muscular fluid torso, legs, and arms */}
          <path
            d="M 74 65 C 67 78, 62 98, 86 118 C 91 106, 99 94, 82 85 C 80 81, 78 74, 84 62"
            fill="none"
            stroke="url(#bodyGradGreen)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Head */}
          <circle cx="83" cy="46" r="8" fill="url(#bodyGradGreen)" />

          {/* Active arms reaching overhead and out */}
          <path
            d="M 68 53 C 74 38, 92 38, 98 52 C 105 58, 114 62, 122 61"
            fill="none"
            stroke="url(#bodyGradGreen)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          <path
            d="M 68 53 C 60 57, 52 50, 44 43"
            fill="none"
            stroke="url(#bodyGradGreen)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* DUMBBELL DETAILED SYMBOL */}
          {/* Dumbbell bar */}
          <path d="M 40 40 L 49 49" stroke="#3A6620" strokeWidth="4" strokeLinecap="round" />
          {/* Left weights bell */}
          <rect
            x="34"
            y="37"
            transform="rotate(-45 34 37)"
            width="5"
            height="11"
            rx="1.5"
            fill="#3A6620"
          />
          {/* Right weights bell */}
          <rect
            x="45"
            y="48"
            transform="rotate(-45 45 48)"
            width="5"
            height="11"
            rx="1.5"
            fill="#3A6620"
          />

          {/* LEFT DECORATIVE LEAF OUTLINES */}
          {/* Branch */}
          <path
            d="M 60 84 C 52 72, 42 66, 30 75"
            fill="none"
            stroke="url(#leafGradGreen)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Leaf 1 */}
          <path
            d="M 30 75 C 22 71, 24 59, 36 63 C 44 65, 40 76, 30 75 Z"
            fill="url(#leafGradGreen)"
          />
          {/* Leaf 2 */}
          <path
            d="M 44 69 C 38 61, 44 51, 52 57 C 56 62, 50 71, 44 69 Z"
            fill="url(#leafGradGreen)"
          />

          {/* RIGHT DECORATIVE LEAF BRANCH */}
          {/* Branch */}
          <path
            d="M 100 84 C 110 70, 120 62, 134 71"
            fill="none"
            stroke="url(#leafGradGreen)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Leaf 1 */}
          <path
            d="M 134 71 C 142 68, 140 56, 128 60 C 120 62, 124 73, 134 71 Z"
            fill="url(#leafGradGreen)"
          />
          {/* Leaf 2 */}
          <path
            d="M 120 65 C 126 57, 120 47, 112 53 C 108 58, 114 67, 120 65 Z"
            fill="url(#leafGradGreen)"
          />

          {/* BOTTOM ACCENT SWEEPING WAVE */}
          <path
            d="M 24 134 Q 80 156, 136 132 C 140 126, 132 122, 124 125 Q 80 144, 30 127 C 22 125, 20 130, 24 134 Z"
            fill="url(#leafGradGreen)"
          />
        </svg>
      </div>

      {/* Brand typographic elements */}
      <div className="flex flex-col text-left justify-center">
        <div className={`font-sans font-black tracking-tight leading-none ${brandTextSize}`}>
          {/* Fres in deep green script-like bold typography */}
          <span className={`font-sans font-extrabold transition-colors ${lightText ? "text-[#8DC63F]" : "text-[#649C33] hover:text-[#4A8824]"}`}>
            Fres
          </span>
          {/* Co in warm ripe-orange text gradient */}
          <span className={`font-serif font-black italic tracking-wide ml-0.5 transition-colors ${lightText ? "text-[#F58220]" : "text-[#F26419] hover:text-[#D9531E]"}`}>
            Co
          </span>
        </div>

        {/* HEALTHCRAFT subtitle */}
        <span
          className={`font-sans tracking-[0.24em] font-extrabold uppercase mt-1 leading-none ${subTextSize} ${lightText ? "text-white/90" : "text-[#334D1C]"}`}
        >
          HEALTHCRAFT
        </span>

        {/* Optional beautiful cursive tagline under the brand name */}
        {showTagline && (
          <span
            className={`font-serif italic mt-1.5 leading-tight tracking-tight border-t pt-1 block ${taglineTextSize} ${lightText ? "text-[#F9F8F4]/75 border-white/10" : "text-gray-500/90 border-gray-100"}`}
          >
            Crafting Wellness, Nurturing Life.
          </span>
        )}
      </div>
    </div>
  );
}
