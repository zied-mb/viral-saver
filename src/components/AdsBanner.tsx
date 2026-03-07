import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { width: 728, height: 90, label: "728×90" },
  middle: { width: 728, height: 90, label: "728×90" },
  "sidebar-sm": { width: 300, height: 250, label: "300×250" },
  "sidebar-lg": { width: 300, height: 600, label: "300×600" },
  footer: { width: 970, height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  // نخدموا كان بالـ topBanner توا بشوية بشوية
  const adId = type === "top" ? ADS.topBanner : null;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden py-4 ${className}`}
      style={{ minHeight: dim.height, maxWidth: "100%" }}
    >
      {!adId || adId === "PASTE_ADSTERRA_CODE_OR_LINK" ? (
        // Placeholder يظهر كي يبدأ ماثماش كود
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-[10px] text-white/20 font-mono uppercase tracking-widest"
          style={{ width: "100%", maxWidth: dim.width, height: dim.height }}
        >
          {dim.label} · Ad Space
        </div>
      ) : (
        // الإشهار الحقيقي (A-ADS)
        <div className="w-full flex justify-center items-center">
          <iframe 
            data-aa={adId} 
            src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
            style={{ 
              border: 0, 
              padding: 0, 
              width: "100%", 
              maxWidth: "728px", 
              height: "90px", 
              overflow: "hidden",
              display: "block"
            }}
            scrolling="no"
          />
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
