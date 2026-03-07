import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  // زدنا result-inline لهنا 🎯
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, label: "728×90" },
  middle: { height: 320, label: "Large Adaptive Middle" }, 
  "sidebar-sm": { height: 250, label: "300×250" },
  "sidebar-lg": { height: 500, label: "Adaptive Result Ad" }, 
  "result-inline": { height: 200, label: "Inline Card Ad" }, // 👈 طول مناسب للمربع الأخضر
  footer: { height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner;
      case "sidebar-sm": return ADS.sidebarAd1;
      case "sidebar-lg": return ADS.sidebarAd2;
      case "result-inline": return ADS.sidebarAd1; // 👈 يستعمل نفس الـ ID 2429661
      default: return null; 
    }
  };

  const adId = getAdId();

  if (!adId) return null;

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden ${
        type === 'result-inline' ? 'py-2' : 'py-4'
      } ${className}`}
      style={{ minHeight: type === 'sidebar-lg' ? '300px' : `${dim.height}px` }}
    >
      <div className="w-full flex justify-center items-center px-4">
        <div 
          className={`w-full transition-all duration-500 ${
            type === 'middle' ? 'max-w-[1100px]' : 
            type.includes('sidebar') || type === 'result-inline' ? 'max-w-[340px]' : 'max-w-[1000px]'
          } mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f]/50`}
        >
          <iframe 
            data-aa={adId} 
            src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
            style={{ 
              border: 0, 
              padding: 0, 
              width: "100%", 
              height: type === 'sidebar-lg' ? 'inherit' : `${dim.height}px`,
              minHeight: type === 'sidebar-lg' ? '300px' : `${dim.height}px`,
              maxHeight: `${dim.height}px`,
              overflow: "hidden",
              display: "block",
              backgroundColor: "transparent"
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default AdsBanner;
