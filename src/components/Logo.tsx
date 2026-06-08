import React from "react";
// @ts-ignore
import frescoLogo from "../assets/images/fresco_logo.png";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  lightText?: boolean;
  layout?: "horizontal" | "vertical"; // Maintained for interface compatibility
}

export default function Logo({
  className = "",
  size = "md",
  showTagline = true,
  lightText = false,
}: LogoProps) {
  // Dimensions for a perfect circle frame depending on size parameter
  let sizeClasses = "w-20 h-20";
  let titleClasses = "text-xl sm:text-2xl";
  let subtitleClasses = "text-[10px] sm:text-[11px] tracking-[0.2em]";
  let gapClass = "space-x-4";

  if (size === "sm") {
    sizeClasses = "w-11 h-11 sm:w-12 sm:h-12";
    titleClasses = "text-lg sm:text-xl";
    subtitleClasses = "text-[9px] tracking-[0.18em]";
    gapClass = "space-x-3";
  } else if (size === "lg") {
    sizeClasses = "w-32 h-32 sm:w-36 sm:h-36";
    titleClasses = "text-3xl sm:text-4.5xl";
    subtitleClasses = "text-xs sm:text-sm tracking-[0.24em]";
    gapClass = "space-x-6";
  }

  return (
    <div 
      id="fresco-logo" 
      className={`inline-flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] select-none ${gapClass} ${className}`}
    >
      {/* Perfect circle image frame */}
      <div className={`${sizeClasses} flex-shrink-0 rounded-full overflow-hidden p-[0%] flex items-center justify-center`}>
        <img
          src={frescoLogo}
          alt="FresCo Logo Icon"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Side Text columns */}
      <div className="flex flex-col text-left justify-center">
        <div className={`font-sans font-black tracking-tight leading-none ${titleClasses}`}>
          <span className={`font-sans font-extrabold ${lightText ? "text-[#9BD54E]" : "text-[#418420]"}`}>
            Fres
          </span>
          <span className={`font-serif font-black italic tracking-wide ml-0.5 ${lightText ? "text-[#F58220]" : "text-[#F26419]"}`}>
            Co
          </span>
        </div>

        <span
          className={`font-sans font-extrabold uppercase mt-1 leading-none ${subtitleClasses} ${
            lightText ? "text-white/90" : "text-[#334D1C]"
          }`}
        >
          HEALTHCRAFT
        </span>

        {showTagline && size !== "sm" && (
          <span
            className={`font-serif italic mt-1.5 leading-tight tracking-tight border-t pt-1.5 block text-[10px] sm:text-[12px] ${
              lightText ? "text-[#F9F8F4]/75 border-white/10" : "text-[#7B6E53] border-gray-100"
            }`}
          >
            Crafting Wellness, Nurturing Life.
          </span>
        )}
      </div>
    </div>
  );
}


