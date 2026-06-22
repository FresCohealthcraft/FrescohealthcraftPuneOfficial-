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
  // Dimensions for a perfect rectangular frame depending on size parameter
  let sizeClasses = "w-48 h-20 sm:w-56 sm:h-24 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)]";
  let titleClasses = "text-2xl sm:text-3xl";
  let subtitleClasses = "text-xs sm:text-sm tracking-[0.22em]";
  let gapClass = "space-x-4";

  if (size === "sm") {
    sizeClasses = "w-32 h-14 sm:w-36 sm:h-16 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)]";
    titleClasses = "text-lg sm:text-xl";
    subtitleClasses = "text-[8.5px] sm:text-[9.5px] tracking-[0.16em]";
    gapClass = "space-x-2.5";
  } else if (size === "lg") {
    sizeClasses = "w-64 h-28 sm:w-72 sm:h-32 rounded-3xl shadow-[0_6px_24px_rgba(0,0,0,0.05)]";
    titleClasses = "text-4xl sm:text-5xl";
    subtitleClasses = "text-sm sm:text-base tracking-[0.26em]";
    gapClass = "space-x-6";
  }

  return (
    <div 
      id="fresco-logo" 
      className={`inline-flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] select-none ${gapClass} ${className}`}
    >
      {/* Rectangular image frame with clean white background, border, and generous space so the logo highlights beautifully */}
      <div className={`${sizeClasses} flex-shrink-0 overflow-hidden bg-white border border-gray-100 p-0 hover:border-gray-200 transition-colors flex items-center justify-center`}>
        <img
          src={frescoLogo}
          alt="FresCo Logo Icon"
          className="w-full  l-full r-full  h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Side Text columns */}
    
    </div>
  );
}
