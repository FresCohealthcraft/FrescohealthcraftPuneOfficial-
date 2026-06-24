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
  let sizeClasses = "w-20 h-20 sm:w-28 sm:h-28";
  let titleClasses = "text-2xl sm:text-3xl";
  let subtitleClasses = "text-xs sm:text-sm tracking-[0.22em]";
  let gapClass = "space-x-4";

  if (size === "sm") {
    sizeClasses = "w-20 h-20 sm:w-16 sm:h-16";
    titleClasses = "text-lg sm:text-xl";
    subtitleClasses = "text-[8.5px] sm:text-[9.5px] tracking-[0.16em]";
    gapClass = "space-x-2.5";
  } else if (size === "lg") {
    sizeClasses = "w-60 h-60 sm:w-48 sm:h-48";
    titleClasses = "text-6xl sm:text-6xl";
    subtitleClasses = "text-sm sm:text-base tracking-[0.26em]";
    gapClass = "space-x-6";
  }

  return (
    <div 
      id="fresco-logo" 
      className={`inline-flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] select-none ${gapClass} ${className}`}
    >
      {/* Perfect circle image frame with clean white background and slightly reduced padding so the logo fills the space more */}
     

      {/* Side Text columns */}
      <div className="flex flex-col text-left justify-center">
        <div className={`font-sans font-black tracking-tight leading-none ${titleClasses}`}>
          <span className={`font-sans font-extrabold ${lightText ? "text-[#9BD54E]" : "text-[#418420]"}`}>
            Fres
          </span>
          <span className={`font-sans font-black italic tracking-wide ml-0.5 ${lightText ? "text-[#F58220]" : "text-[#F26419]"}`}>
            Co
          </span>
         <span
  className={`font-sans font-extrabold ml-2 ${
    lightText ? "text-[#9BD54E]" : "text-[#418420]"
  }`}
>
  HEALTHCRAFT
</span>
        
        </div>

                

        {showTagline && (
          <span
            className={`font-serif italic leading-tight tracking-tight border-t block ${
              size === "sm"
                ? "text-[17.5px] sm:text-[16.5px] mt-0.5 pt-0.5"
                : size === "lg"
                  ? "text-10xs sm:text-sm mt-2 pt-2"
                  : "text-[16px] sm:text-[14.5px] mt-1.5 pt-1.5"
            } ${
              lightText ? "text-white/80 border-white/10" : "text-[#000000]/85 border-gray-100"
            }`}
          >
            Crafting Wellness, Nurturing Life
          </span>
        )}
      </div>
    </div>
  );
}
