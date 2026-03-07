import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { width: "100%", height: 90, label: "728×90" },
  middle: { width: "100%", height: 90, label: "728×90" },
  "sidebar-sm": { width: 300, height: 250, label: "300×250" },
  "sidebar-lg": { width: 300, height: 600, label: "300×600" },
  footer: { width: "100%", height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  // نجبدو الكود على حسب الـ type من الـ Config
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner;
      case "sidebar-sm": return ADS.sidebarAd1;
      case "sidebar-lg": return ADS.sidebarAd2;
      case "footer": return ADS.footerBanner;
      default: return null;
    }
  };

  const adId = getAdId();

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden py-2 ${className}`}
      style={{ minHeight: dim.height }}
    >
      {!adId || adId === "PASTE_ADSTERRA_CODE_OR_LINK" ? (
        // Placeholder
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-[10px] text-white/20 font-mono uppercase tracking-widest transition-all"
          style={{ width: "100%", maxWidth: type.includes('sidebar') ? 300 : 970, height: dim.height }}
        >
          {dim.label} · Ad Space
        </div>
      ) : (
        // 🚀 الإشهار الحقيقي مع تصليح العرض
        <div className="w-full flex justify-center items-center">
          <iframe 
            data-aa={adId} 
            src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
            style={{ 
              border: 0, 
              padding: 0, 
              width: "100%", // 👈 يولي معبي العرض كامل
              height: `${dim.height}px`, 
              overflow: "hidden",
              display: "block",
              backgroundColor: "transparent"
            }}
            scrolling="no"
          />
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
