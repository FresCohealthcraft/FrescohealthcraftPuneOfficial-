import React from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  lightText?: boolean;
  layout?: "horizontal" | "vertical";
}

export default function Logo({
  className = "",
  showTagline = true,
  size = "md",
  lightText = false,
  layout = "horizontal",
}: LogoProps) {
  // Size configurations
  const isVertical = layout === "vertical";
  
  const iconSize = isVertical
    ? size === "sm" ? "h-14 w-14" : size === "md" ? "h-20 w-20" : "h-28 w-28"
    : size === "sm" ? "h-11 w-11" : size === "md" ? "h-16 w-16" : "h-24 w-24";
    
  const brandTextSize = isVertical
    ? size === "sm" ? "text-xl" : size === "md" ? "text-3xl" : "text-4xl"
    : size === "sm" ? "text-lg" : size === "md" ? "text-2.5xl" : "text-4xl";
    
  const subTextSize = isVertical
    ? size === "sm" ? "text-[9px]" : size === "md" ? "text-[12px]" : "text-[14px]"
    : size === "sm" ? "text-[8px]" : size === "md" ? "text-[11px]" : "text-[14px]";
    
  const taglineTextSize = isVertical
    ? size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-[12.5px]"
    : size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-[12px]";

  // Emblem Component
  const Emblem = () => (
    <div className={`${iconSize} relative flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-[0_2px_4px_rgba(40,80,30,0.06)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leafGradGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9BD54E" />
            <stop offset="100%" stopColor="#418420" />
          </linearGradient>
          <linearGradient id="bodyGradGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8DC63F" />
            <stop offset="100%" stopColor="#38A325" />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A7E2A" />
            <stop offset="100%" stopColor="#2A4E15" />
          </linearGradient>
        </defs>

        {/* HUMAN WELLNESS WORKOUT FIGURE - Calligraphic swooshes */}
        {/* Head */}
        <circle cx="80" cy="35" r="9" fill="url(#bodyGradGreen)" />

        {/* Spine and Running Leg curve */}
        <path
          d="M 80 47 C 76 56, 70 70, 64 88 C 58 106, 73 118, 88 122"
          stroke="url(#bodyGradGreen)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Back Leg trailing in running pose */}
        <path
          d="M 72 82 C 86 86, 102 96, 114 116"
          stroke="url(#bodyGradGreen)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Arm / Wing swoosh making the right lobe of the heart */}
        <path
          d="M 85 52 C 104 36, 128 42, 134 68 C 137 80, 126 94, 112 102"
          stroke="url(#bodyGradGreen)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Arm reaching out to hold dumbbell */}
        <path
          d="M 75 54 C 64 62, 54 54, 46 45"
          stroke="url(#bodyGradGreen)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Elegant Dumbbell held in left arm area */}
        <g transform="rotate(-30 46 45)">
          <path d="M 38 45 L 54 45" stroke="url(#dbGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="34" y="39" width="4" height="12" rx="1.5" fill="url(#dbGrad)" />
          <rect x="54" y="39" width="4" height="12" rx="1.5" fill="url(#dbGrad)" />
        </g>

        {/* LEFT BRAND DECORATIVE LEAF STEM */}
        <path
          d="M 62 82 Q 44 65, 32 72"
          stroke="url(#leafGradGreen)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left branch leaves */}
        <path
          d="M 32 72 Q 22 66, 30 58 Q 42 66, 32 72 Z"
          fill="url(#leafGradGreen)"
        />
        <path
          d="M 44 66 Q 36 54, 46 48 Q 54 58, 44 66 Z"
          fill="url(#leafGradGreen)"
        />

        {/* RIGHT BRAND DECORATIVE LEAF STEM */}
        <path
          d="M 98 82 Q 116 65, 128 72"
          stroke="url(#leafGradGreen)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right branch leaves */}
        <path
          d="M 128 72 Q 138 66, 130 58 Q 118 66, 128 72 Z"
          fill="url(#leafGradGreen)"
        />
        <path
          d="M 116 66 Q 124 54, 114 48 Q 106 58, 116 66 Z"
          fill="url(#leafGradGreen)"
        />

        {/* Omit horizontal sweeping wave path in vertical view-top circle */}
        {!isVertical && (
          <path
            d="M 24 134 Q 80 156, 136 132 C 140 126, 132 122, 124 125 Q 80 144, 30 127 C 22 125, 20 130, 24 134 Z"
            fill="url(#leafGradGreen)"
          />
        )}
      </svg>
    </div>
  );

  if (isVertical) {
    return (
      <div
        id="fresco-logo"
        className={`flex flex-col items-center text-center select-none space-y-3.5 p-1 ${className}`}
      >
        {/* Emblem on top */}
        <Emblem />

        {/* Primary Stacked Typographic group */}
        <div className="flex flex-col items-center">
          {/* FresCo */}
          <div className={`font-sans font-black tracking-tight leading-none ${brandTextSize}`}>
            <span className={`font-sans font-extrabold ${lightText ? "text-[#8DC63F]" : "text-[#649C33]"}`}>
              Fres
            </span>
            <span className={`font-serif font-black italic tracking-wide ml-0.5 ${lightText ? "text-[#F58220]" : "text-[#F26419]"}`}>
              Co
            </span>
          </div>

          {/* HEALTHCRAFT */}
          <span
            className={`font-sans tracking-[0.24em] font-extrabold uppercase mt-2.5 leading-none ${subTextSize} ${
              lightText ? "text-white/95" : "text-[#334D1C]"
            }`}
          >
            HEALTHCRAFT
          </span>

          {/* Gorgeous Separator Swoosh Under HEALTHCRAFT */}
          <div className="w-52 h-6 my-1.5 flex items-center justify-center relative">
            <svg viewBox="0 0 200 24" className="w-full h-full text-emerald-600" fill="currentColor">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8DC63F" />
                  <stop offset="50%" stopColor="#38A325" />
                  <stop offset="100%" stopColor="#4A8824" />
                </linearGradient>
              </defs>
              <path
                d="M 12 14 C 50 25, 120 23, 188 8 C 193 6, 185 2, 178 4 C 120 17, 60 17, 18 10 C 13 9, 10 12, 12 14 Z"
                fill="url(#waveGrad)"
              />
            </svg>
          </div>

          {/* Cursive Tagline at bottom */}
          {showTagline && (
            <span
              className={`font-serif italic leading-tight tracking-tight mt-0.5 ${taglineTextSize} ${
                lightText ? "text-[#EFECE5]/80" : "text-[#7B6E53]"
              }`}
            >
              Crafting Wellness, Nurturing Life.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Standard horizontal row layout (default)
  return (
    <div id="fresco-logo" className={`flex items-center space-x-3 select-none ${className}`}>
      <Emblem />

      <div className="flex flex-col text-left justify-center">
        <div className={`font-sans font-black tracking-tight leading-none ${brandTextSize}`}>
          <span className={`font-sans font-extrabold transition-colors ${lightText ? "text-[#8DC63F]" : "text-[#649C33] hover:text-[#38A325]"}`}>
            Fres
          </span>
          <span className={`font-serif font-black italic tracking-wide ml-0.5 transition-colors ${lightText ? "text-[#F58220]" : "text-[#F26419] hover:text-[#D9531E]"}`}>
            Co
          </span>
        </div>

        <span
          className={`font-sans tracking-[0.24em] font-extrabold uppercase mt-1 leading-none ${subTextSize} ${lightText ? "text-white/90" : "text-[#334D1C]"}`}
        >
          HEALTHCRAFT
        </span>

        {showTagline && (
          <span
            className={`font-serif italic mt-1.5 leading-tight tracking-tight border-t pt-1 block ${taglineTextSize} ${lightText ? "text-[#F9F8F4]/75 border-white/10" : "text-[#7B6E53] border-gray-100"}`}
          >
            Crafting Wellness, Nurturing Life.
          </span>
        )}
      </div>
    </div>
  );
}
