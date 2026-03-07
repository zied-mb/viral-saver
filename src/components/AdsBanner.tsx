import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  // خليت كان الأنواع اللي حاجتك بيهم توه 🎯
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, label: "728×90" },
  middle: { height: 320, label: "Large Adaptive Middle" }, 
  "sidebar-sm": { height: 250, label: "300×250" },
  "result-inline": { height: 280, label: "Inline Card Ad" }, // 👈 هذا اللي في وسط المربع
  footer: { height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type as keyof typeof AD_DIMENSIONS];
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner;
      case "sidebar-sm": return ADS.sidebarAd1;
      case "result-inline": return ADS.sidebarAd2; // 🎯 يخدم بالـ ID 2429665
      default: return null; 
    }
  };

  const adId = getAdId();

  if (!adId) return null;

  return (
    <div className={`w-full flex items-center justify-center overflow-hidden ${type === 'result-inline' ? 'py-0' : 'py-4'} ${className}`}>
      <div className="w-full flex justify-center items-center px-2">
        <div className={`w-full transition-all duration-500 ${type === 'result-inline' ? 'max-w-[320px]' : 'max-w-[1000px]'} mx-auto overflow-hidden rounded-2xl border border-white/5 bg-transparent`}>
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
