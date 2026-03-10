import React, { useEffect, useRef } from "react";
import { ADS } from '@/config/ads';

interface AdsBannerProps {
  type: "top" | "middle" | "footer" | "sidebar-sm" | "result-inline";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { height: 90, width: '1200px' },
  middle: { height: 100, width: '300px' },
  footer: { height: 100, width: '300px' },
  "sidebar-sm": { height: 250, width: '300px' },
  "result-inline": { height: 250, width: '300px' }, 
};

const AdsBanner: React.FC<AdsBannerProps> = ({ type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  const getAdId = () => {
    switch (type) {
      case "top": return ADS.topBanner;
      case "sidebar-sm": return ADS.sidebarAd1;
      case "result-inline": return ADS.sidebarAd2;
      case "middle": return ADS.middleBanner;
      case "footer": return ADS.footerBanner;
      default: return null; 
    }
  };

  const adId = getAdId();

  useEffect(() => {
    // التأكد أن الـ ID عبارة عن نص صحيح وليس Object أو Undefined
    const validAdId = adId && typeof adId === 'string' && adId !== "[object Object]";

    if (validAdId && adContainerRef.current) {
      adContainerRef.current.innerHTML = "";
      const script = document.createElement("script");
      
      // تحديد الـ Script الصحيح لكل منطقة بناءً على الأكواد اللي بعثتهم
      if (type === "middle") {
        // Script الخاص بـ Zone #6854497
        script.src = "//selfassured-celebration.com/bHXLV/s.dJGHlS0HYXWBcl/wezmJ9vu/ZqU/lskaPJTgYq4cNATHQY0EOgTqc/tkNoj/gR1PNiD_U/wOMYQX";
      } else if (type === "footer") {
        // Script الخاص بـ Zone #6854585
        script.src = "//selfassured-celebration.com/b.XeVQsXdDGcls0XYFWicl/oecm/9-u/Z/UgljktPfTWYE4LNXTsQr1YOgDRU/t/N/jYg/1xNsDnUI4aOoQh";
      } else if (type === "sidebar-sm") {
        script.src = "//selfassured-celebration.com/bUXpVks.dcGblt0/Y/W/cM/CekmB9eucZnUQlwkuPsTyYz4qNETtIgyPMxj/ELtJN/jRg/1/M/jhI/ybNLQq";
      } else if (type === "result-inline") {
        script.src = "//selfassured-celebration.com/bxXzVjs.dDGyla0EYtWVcn/xeAmA9NuzZJUulnkWPZT_Y/4bNgTRI/yrO/DtUdtSNrj/gK1lM/jGIp4/OGQE";
      }
      
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.referrerPolicy = 'no-referrer-when-downgrade';
      
      adContainerRef.current.appendChild(script);
    }
  }, [adId, type]);

  // Fallback MDB (Top Only)
  if (!adId && type === "top") {
    return (
      <div className={`w-full flex justify-center items-center my-6 px-4 ${className}`}>
        <a href="https://mdbcollection.com" target="_blank" rel="noopener noreferrer" className="relative w-full max-w-[1200px] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-[90px] md:h-[130px] w-full">
            <img src="/mdb-banner.jpg" alt="MDB" className="w-full h-full object-cover" />
          </div>
        </a>
      </div>
    );
  }

  if (!adId || adId === "[object Object]") return null;

  return (
    <div 
      key={`${type}-${adId}`} 
      className={`ads-container w-full flex justify-center items-center my-4 ${className}`}
    >
      <div 
        ref={adContainerRef}
        style={{ width: "100%", maxWidth: dim.width, minHeight: `${dim.height}px` }}
        className="flex justify-center items-center"
      />
    </div>
  );
};

export default AdsBanner;
