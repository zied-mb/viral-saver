import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, label: "728×90" },
  middle: { height: 280, label: "Large Adaptive Middle" }, // 👈 كبرنا الـ Height بالباهي
  "sidebar-sm": { height: 250, label: "300×250" },
  "sidebar-lg": { height: 600, label: "300×600" },
  footer: { height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner;
      default: return ADS.topBanner; 
    }
  };

  const adId = getAdId();

  return (
    <div
      className={`w-full flex items-center justify-center overflow-hidden py-8 ${className}`}
      style={{ minHeight: `${dim.height}px` }}
    >
      {!adId ? (
        <div
          className="flex items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 text-[10px] text-white/20 font-mono uppercase tracking-widest"
          style={{ width: "100%", maxWidth: "1000px", height: `${dim.height}px` }}
        >
          {dim.label} · Ad Space
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          {/* Container فيه تحسينات للـ Middle بالذات */}
          <div 
            className={`w-full transition-transform duration-500 ${type === 'middle' ? 'max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]' : 'max-w-[1000px]'} mx-auto overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-violet-500/5`}
          >
            <iframe 
              data-aa={adId} 
              src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
              style={{ 
                border: 0, 
                padding: 0, 
                width: "100%", 
                // 🚀 الـ height توا يتبع الـ Dim الجديدة اللي كبرناها
                height: `${dim.height}px`, 
                overflow: "hidden",
                display: "block",
                backgroundColor: "transparent",
                transform: type === 'middle' ? 'scale(1.02)' : 'none' // تكبيرة خفيفة للمنظر
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
