import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, width: '728px' },
  middle: { height: 280, width: '100%' }, 
  "sidebar-sm": { height: 250, width: '300px' },
  "result-inline": { height: 250, width: '300px' }, 
  footer: { height: 90, width: '970px' },
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
    <div 
      className={`ads-container w-full block text-center my-4 ${className}`}
      style={{ minHeight: `${dim.height}px` }}
    >
      <div 
        className="ad-wrapper inline-block transition-all"
        style={{ 
          width: "100%", 
          maxWidth: dim.width,
          minHeight: `${dim.height}px`,
          position: 'relative',
          zIndex: 20
        }}
      >
        <iframe 
          key={adId}
          data-aa={adId} 
          src={`//acceptable.a-ads.com/${adId}/?size=Adaptive`}
          style={{ 
            border: 'none', 
            padding: 0, 
            margin: '0 auto',
            width: "100%", 
            height: `${dim.height}px`,
            display: "block",
            backgroundColor: "transparent",
            pointerEvents: "auto"
          }}
          scrolling="no"
          title={`ad-${adId}`}
        />
      </div>
    </div>
  );
};

export default AdsBanner;
