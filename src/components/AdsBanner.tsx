import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, label: "728×90" },
  middle: { height: 320, label: "Large Adaptive Middle" }, 
  "sidebar-sm": { height: 250, label: "300×250" },
  "sidebar-lg": { height: 600, label: "300×600" }, // 👈 هذا باش يجي طويل ومزيان في الجنب
  footer: { height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  const getAdId = () => {
    switch (type) {
      case "top": 
        return ADS.topBanner;
      case "middle": 
        return ADS.middleBanner;
      case "sidebar-sm": 
        return ADS.sidebarAd1;
      case "sidebar-lg": 
        return ADS.sidebarAd2; // 👈 توا يقرى في 2429665 مريغل
      default: 
        return null; 
    }
  };

  const adId = getAdId();

  if (!adId) return null;

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden py-6 ${className}`}
      style={{ minHeight: `${dim.height}px` }}
    >
      <div className="w-full flex justify-center items-center">
        <div 
          className={`w-full transition-all duration-500 ${
            type === 'middle' ? 'max-w-[1100px]' : 
            type.includes('sidebar') ? 'max-w-[300px]' : 'max-w-[1000px]'
          } mx-auto overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-violet-500/5`}
        >
          <iframe 
            data-aa={adId} 
            src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
            style={{ 
              border: 0, 
              padding: 0, 
              width: "100%", 
              height: `${dim.height}px`, 
              overflow: "hidden",
              display: "block",
              backgroundColor: "transparent",
              transform: type === 'middle' ? 'scale(1.02)' : 'none' 
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default AdsBanner;
