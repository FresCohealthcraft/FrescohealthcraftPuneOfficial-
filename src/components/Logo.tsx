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
  // Dimensions and typography depending on size parameter
  let titleClasses = "text-xl xs:text-2xl sm:text-3xl";
  let gapClass = "space-x-4";

  if (size === "sm") {
    titleClasses = "text-[11px] xs:text-[15px] sm:text-[14.5px] md:text-[16px]";
    gapClass = "space-x-1.5";
  } else if (size === "lg") {
    titleClasses = "text-2xl xs:text-3xl sm:text-4xl";
    gapClass = "space-x-5";
  }

  return (
    <div 
      id="fresco-logo" 
      className={`inline-flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] select-none ${gapClass} ${className}`}
    >
      {/* Side Text columns */}
      <div className="flex flex-col text-center justify-center items-center">
        <div className={`font-sans font-black tracking-tight leading-none ${titleClasses}`}>
          <span 
            className={`font-sans font-extrabold ${lightText ? "text-[#9BD54E]" : "text-[#418420]"}`}
            style={size === "sm" ? { width: "auto", fontSize: "17px", lineHeight: "17px" } : undefined}
          >
            Fres
          </span>
          <span 
            className={`font-sans font-black italic tracking-wide ml-0.5 ${lightText ? "text-[#F58220]" : "text-[#F26419]"}`}
            style={size === "sm" ? { fontSize: "17px", lineHeight: "17px" } : undefined}
          >
            Co
          </span>
          <span
            className={`font-sans font-extrabold ml-1 ${
              lightText ? "text-[#9BD54E]" : "text-[#418420]"
            }`}
            style={size === "sm" ? { fontSize: "17px", lineHeight: "17px" } : undefined}
          >
            HealthCraft
          </span>
        </div>

        {showTagline && (
          <span
            className={`font-serif italic leading-tight tracking-tight border-t block text-center ${
              size === "sm"
                ? "text-[8px] xs:text-[9px] sm:text-[10px] mt-0.5 pt-0.5"
                : size === "lg"
                  ? "text-xs sm:text-sm mt-2 pt-2"
                  : "text-[11px] sm:text-[12.5px] mt-1.5 pt-1.5"
            } ${
              lightText ? "text-white/80 border-white/10" : "text-[#000000]/85 border-gray-100"
            }`}
            style={size === "sm" ? { fontSize: "11px", lineHeight: "11px" } : undefined}
          >
            Crafting Wellness, Nurturing Life
          </span>
        )}
      </div>
    </div>
  );
}
