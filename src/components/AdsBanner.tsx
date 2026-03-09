import React, { useEffect, useRef } from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, width: '1200px' },
  middle: { height: 100, width: '300px' },
  "sidebar-sm": { height: 250, width: '300px' },
  "result-inline": { height: 250, width: '300px' }, 
  footer: { height: 100, width: '300px' },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  const adContainerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    // نركزو كان على الـ Hilltop types
    const isHilltopType = ["sidebar-sm", "result-inline", "middle", "footer"].includes(type);
    
    if (isHilltopType && adId && adContainerRef.current) {
      // تنظيف الـ container قبل الزرق
      adContainerRef.current.innerHTML = "";
      
      const script = document.createElement("script");
      
      // التثبت من الـ Source الصحيح
      if (type === "middle" || type === "footer") {
        // الـ Script الخاص بالـ Zone #6854497 (300x100)
        script.src = "//selfassured-celebration.com/b.X-VysadYGBlB0nYjWycN/QesmO9/upZ/UKlKk/PPTkYc4iNkThQr0/OgTFc/t_NdjigI1/NvDmUTwYM/Qp";
      } else if (adId === ADS.sidebarAd1) {
        script.src = "//selfassured-celebration.com/bUXpVks.dcGblt0/Y/W/cM/CekmB9eucZnUQlwkuPsTyYz4qNETtIgyPMxj/ELtJN/jRg/1/M/jhI/ybNLQq";
      } else if (adId === ADS.sidebarAd2) {
        script.src = "//selfassured-celebration.com/bxXzVjs.dDGyla0EYtWVcn/xeAmA9NuzZJUulnkWPZT_Y/4bNgTRI/yrO/DtUdtSNrj/gK1lM/jGIp4/OGQE";
      }
      
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.referrerPolicy = 'no-referrer-when-downgrade';
      
      adContainerRef.current.appendChild(script);
    }
  }, [adId, type]);

  // Fallback للماركة متاعنا MDB Collection
  if (!adId && type === "top") {
    return (
      <div className={`w-full flex justify-center items-center my-6 px-4 ${className}`}>
        <a 
          href="https://mdbcollection.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-full max-w-[1200px] group overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        >
          <div className="h-[90px] md:h-[130px] w-full">
            <img 
              src="/mdb-banner.jpg" 
              alt="MDB Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </a>
      </div>
    );
  }

  if (!adId) return null;

  const isHilltop = ["sidebar-sm", "result-inline", "middle", "footer"].includes(type);

  if (isHilltop) {
    return (
      <div className={`ads-container w-full flex justify-center items-center my-4 ${className}`}>
        <div 
          ref={adContainerRef}
          className="ad-wrapper flex justify-center items-center"
          style={{ width: "100%", maxWidth: dim.width, minHeight: `${dim.height}px` }}
        />
      </div>
    );
  }

  // A-Ads Fallback
  return (
    <div className={`ads-container w-full flex justify-center items-center my-4 ${className}`}>
        <iframe 
          data-aa={adId} 
          src={`https://acceptable.a-ads.com/${adId}/?size=Adaptive`}
          style={{ border: 'none', width: "100%", maxWidth: dim.width, height: `${dim.height}px`, display: "block" }}
          scrolling="no"
          loading="lazy" 
        />
    </div>
  );
};

export default AdsBanner;
