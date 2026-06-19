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
  let sizeClasses = "w-24 h-24 sm:w-28 sm:h-28";
  let titleClasses = "text-2xl sm:text-3xl";
  let subtitleClasses = "text-xs sm:text-sm tracking-[0.22em]";
  let gapClass = "space-x-4";

  if (size === "sm") {
    sizeClasses = "w-12 h-12 sm:w-14 sm:h-14";
    titleClasses = "text-lg sm:text-xl";
    subtitleClasses = "text-[8.5px] sm:text-[9.5px] tracking-[0.16em]";
    gapClass = "space-x-2.5";
  } else if (size === "lg") {
    sizeClasses = "w-40 h-40 sm:w-48 sm:h-48";
    titleClasses = "text-4xl sm:text-5xl";
    subtitleClasses = "text-sm sm:text-base tracking-[0.26em]";
    gapClass = "space-x-6";
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
          <span className={`font-sans font-black italic tracking-wide ml-0.5 ${lightText ? "text-[#F58220]" : "text-[#F26419]"}`}>
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
                ? "text-[9.5px] sm:text-[10.5px] mt-0.5 pt-0.5"
                : size === "lg"
                  ? "text-xs sm:text-sm mt-2 pt-2"
                  : "text-[11px] sm:text-[12.5px] mt-1.5 pt-1.5"
            } ${
              lightText ? "text-white/80 border-white/10" : "text-[#000000]/85 border-gray-100"
            }`}
          >
            Crafting Wellness, Nurturing Life.
          </span>
        )}
      </div>
    </div>
  );
}
