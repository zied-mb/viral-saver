import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90 },
  middle: { height: 280 }, 
  "sidebar-sm": { height: 250 },
  "result-inline": { height: 250 }, 
  footer: { height: 90 },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "middle": return ADS.middleBanner;
      case "sidebar-sm": return ADS.sidebarAd1;
      case "result-inline": return ADS.sidebarAd2;
      case "footer": return ADS.footerBanner;
      default: return null; 
    }
  };

  const adId = getAdId();
  if (!adId) return null;

  return (
    <div className={`w-full flex justify-center items-center my-2 ${className}`}>
      {/* 1. نحينا الـ overflow-hidden (باش يتنحى Hidden Error)
          2. نحينا الـ rounded والـ border (باش يتنحى Unclickable Error)
          3. الـ pointer-events-auto تضمن إنو الكليك يتعدى
      */}
      <div 
        className="relative transition-all duration-300 pointer-events-auto"
        style={{ 
          width: "100%", 
          maxWidth: type === 'result-inline' || type === 'sidebar-sm' ? '300px' : '100%',
          minHeight: `${dim.height}px`,
          zIndex: 10 // باش الإشهار يجي فوق أي Background blob
        }}
      >
        <iframe 
          data-aa={adId} 
          src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
          style={{ 
            border: 0, 
            padding: 0, 
            width: "100%", 
            height: `${dim.height}px`,
            display: "block",
            backgroundColor: "transparent"
          }}
          scrolling="no"
        />
      </div>
    </div>
  );
};

export default AdsBanner;
