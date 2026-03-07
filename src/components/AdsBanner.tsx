import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, label: "728×90" },
  middle: { height: 100, label: "Adaptive Middle" }, // 👈 زدنا في الطول شوية للـ middle
  "sidebar-sm": { height: 250, label: "300×250" },
  "sidebar-lg": { height: 600, label: "300×600" },
  footer: { height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner; // 👈 توا يقرى في الـ ID 2429661
      case "sidebar-sm": return ADS.sidebarAd1;
      case "sidebar-lg": return ADS.sidebarAd2;
      case "footer": return ADS.footerBanner;
      default: return null;
    }
  };

  const adId = getAdId();

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden py-6 ${className}`}
      style={{ minHeight: `${dim.height}px` }}
    >
      {!adId || adId === "PASTE_ADSTERRA_CODE_OR_LINK" ? (
        <div
          className="flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-[10px] text-white/20 font-mono uppercase tracking-widest"
          style={{ width: "100%", maxWidth: type.includes('sidebar') ? "300px" : "1000px", height: `${dim.height}px` }}
        >
          {dim.label} · Ad Space
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          {/* 🎯 الإشهار بـ Styling الـ Adaptive الجديد */}
          <div className="w-full max-w-[1000px] mx-auto overflow-hidden rounded-xl border border-white/5">
            <iframe 
              data-aa={adId} 
              src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
              style={{ 
                border: 0, 
                padding: 0, 
                width: "100%", 
                height: type === "middle" ? "100px" : `${dim.height}px`, 
                overflow: "hidden",
                display: "block",
                backgroundColor: "transparent"
              }}
              scrolling="no"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
