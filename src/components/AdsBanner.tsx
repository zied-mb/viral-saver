import React from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, width: '1200px' }, // زدنا في الـ width للـ PC
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

  // ─── البانر متاع MDB Collection المعدل ───
  if (!adId && type === "top") {
    return (
      <div className={`w-full flex justify-center items-center my-6 px-4 overflow-hidden ${className}`}>
        <a 
          href="https://mdbcollection.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-full group overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20"
          // في الـ PC الطول 130px والعرض أقصى حد 1200px، وفي الـ Mobile يبقى 90px
          style={{ maxWidth: dim.width }}
        >
          <div className="h-[90px] md:h-[130px] w-full transition-all duration-500">
            <img 
              src="/mdb-banner.jpg" 
              alt="MDB Collection - Luxury Streetwear" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/5">
            Sponsored
          </div>

          {/* Overlay خفيف يزيد الـ Premium look عند الـ Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
      </div>
    );
  }

  if (!adId) return null;

  return (
    <div 
      className={`ads-container w-full flex justify-center items-center my-4 overflow-hidden ${className}`}
      style={{ minHeight: `${dim.height}px` }}
    >
      <div 
        className="ad-wrapper relative transition-opacity duration-500"
        style={{ 
          width: "100%", 
          maxWidth: dim.width,
          minHeight: `${dim.height}px`,
          zIndex: 10 
        }}
      >
        <iframe 
          key={adId}
          data-aa={adId} 
          src={`https://acceptable.a-ads.com/${adId}/?size=Adaptive`}
          style={{ 
            border: 'none', 
            padding: 0, 
            margin: '0 auto',
            width: "100%", 
            height: `${dim.height}px`,
            display: "block",
            backgroundColor: "transparent",
          }}
          scrolling="no"
          title={`ad-${type}-${adId}`}
          loading="lazy" 
        />
      </div>
    </div>
  );
};

export default AdsBanner;