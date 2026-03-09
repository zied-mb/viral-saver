import React, { useEffect, useRef } from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "sidebar-sm" | "footer" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, width: '1200px' },
  middle: { height: 100, width: '300px' }, // تعديل الـ height لـ 100px حسب اختيارك
  "sidebar-sm": { height: 250, width: '300px' },
  "result-inline": { height: 250, width: '300px' }, 
  footer: { height: 100, width: '300px' }, // تعديل الـ height لـ 100px
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
    // التحديث: يخدم على الـ Sidebar، Result Card، Middle، والـ Footer (كل ما هو HilltopAds)
    if ((type === "sidebar-sm" || type === "result-inline" || type === "middle" || type === "footer") && adId && adContainerRef.current) {
      adContainerRef.current.innerHTML = "";
      
      const script = document.createElement("script");
      
      // اختيار الـ Source الصحيح حسب الـ ID من الـ Dashboard
      if (adId === ADS.sidebarAd1) {
        script.src = "//selfassured-celebration.com/bUXpVks.dcGblt0/Y/W/cM/CekmB9eucZnUQlwkuPsTyYz4qNETtIgyPMxj/ELtJN/jRg/1/M/jhI/ybNLQq";
      } else if (adId === ADS.sidebarAd2) {
        script.src = "//selfassured-celebration.com/bxXzVjs.dDGyla0EYtWVcn/xeAmA9NuzZJUulnkWPZT_Y/4bNgTRI/yrO/DtUdtSNrj/gK1lM/jGIp4/OGQE";
      } else if (adId === ADS.middleBanner || adId === ADS.footerBanner) {
        // الـ Script الجديد للـ Zone #6854497 (300x100)
        script.src = "//selfassured-celebration.com/b.X-VysadYGBlB0nYjWycN/QesmO9/upZ/UKlKk/PPTkYc4iNkThQr0/OgTFc/t_NdjigI1/NvDmUTwYM/Qp";
      }
      
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.referrerPolicy = 'no-referrer-when-downgrade';
      
      adContainerRef.current.appendChild(script);
    }
  }, [adId, type]);

  // ─── MDB Collection (Fallback for Top) ───
  if (!adId && type === "top") {
    return (
      <div className={`w-full flex justify-center items-center my-6 px-4 overflow-hidden ${className}`}>
        <a 
          href="https://mdbcollection.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-full group overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20"
          style={{ maxWidth: dim.width }}
        >
          <div className="h-[90px] md:h-[130px] w-full transition-all duration-500">
            <img 
              src="/mdb-banner.jpg" 
              alt="MDB Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/5">
            Sponsored
          </div>
        </a>
      </div>
    );
  }

  if (!adId) return null;

  // الـ UI الخاص بـ HilltopAds (Sidebar, Result, Middle, Footer)
  const isHilltop = ["sidebar-sm", "result-inline", "middle", "footer"].includes(type);

  if (isHilltop) {
    return (
      <div 
        className={`ads-container w-full flex justify-center items-center my-4 overflow-hidden ${className}`}
        style={{ minHeight: `${dim.height}px` }}
      >
        <div 
          ref={adContainerRef}
          className="ad-wrapper relative flex justify-center items-center"
          style={{ width: "100%", maxWidth: dim.width, minHeight: `${dim.height}px` }}
        />
      </div>
    );
  }

  // الـ UI الخاص بـ A-Ads (لأي أنواع أخرى مستقبلاً)
  return (
    <div className={`ads-container w-full flex justify-center items-center my-4 overflow-hidden ${className}`}>
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
