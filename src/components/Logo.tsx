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
  let sizeClasses = "w-28 h-28 sm:w-32 sm:h-32";
  let titleClasses = "text-3xl sm:text-4xl";
  let subtitleClasses = "text-xs sm:text-sm tracking-[0.22em]";
  let gapClass = "space-x-4.5";

  if (size === "sm") {
    sizeClasses = "w-16 h-16 sm:w-18 sm:h-18";
    titleClasses = "text-2xl sm:text-2.5xl";
    subtitleClasses = "text-[11px] sm:text-[12px] tracking-[0.18em]";
    gapClass = "space-x-4";
  } else if (size === "lg") {
    sizeClasses = "w-40 h-40 sm:w-48 sm:h-48";
    titleClasses = "text-5xl sm:text-6xl";
    subtitleClasses = "text-sm sm:text-base tracking-[0.26em]";
    gapClass = "space-x-9";
  }

  return (
    <div 
      id="fresco-logo" 
      className={`inline-flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] select-none ${gapClass} ${className}`}
    >
      {/* Perfect circle image frame with clean white background and slightly reduced padding so the logo fills the space more */}
      <div className={`${sizeClasses} flex-shrink-0 rounded-full overflow-hidden  shadow-xs bg-white p-[0%] flex items-center justify-center`}>
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

        {showTagline && (
          <span
            className={`font-serif italic leading-tight tracking-tight border-t block ${
              size === "sm"
                ? "text-[10px] sm:text-[10px] mt-0.5 pt-0.5"
                : size === "lg"
                  ? "text-xs sm:text-sm mt-2 pt-2"
                  : "text-[10px] sm:text-[12px] mt-1.5 pt-1.5"
            } ${
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
