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
  
  // دالة نظيفة لجلب الـ ID
  const getAdId = () => {
    try {
      const resolveValue = (val: any) => (val && typeof val === 'string' && val !== "[object Object]") ? val : "";
      if (type === "top") return ADS.topBanner || "";
      if (type === "sidebar-sm") return resolveValue(ADS.sidebarAd1);
      if (type === "result-inline") return resolveValue(ADS.sidebarAd2);
      if (type === "middle") return resolveValue(ADS.middleBanner);
      if (type === "footer") return resolveValue(ADS.footerBanner);
      return "";
    } catch (e) {
      return "";
    }
  };

  const adId = getAdId();

  useEffect(() => {
    const isCleanId = adId && adId !== "" && adId !== "[object Object]";

    if (isCleanId && adContainerRef.current) {
      const originalPostMessage = window.postMessage;
      
      // 🛡️ Guard للـ Console
      window.postMessage = function(data: any, ...args: any[]) {
        if (typeof data === 'string' && data.includes('[object Object]')) return;
        return originalPostMessage.apply(window, [data, ...args] as any);
      };

      const timeoutId = setTimeout(() => {
        if (!adContainerRef.current) return;
        
        // تنظيف المكان قبل الحقن
        adContainerRef.current.innerHTML = "";

        const script = document.createElement("script");
        if (type === "middle") script.src = "//selfassured-celebration.com/bHXLV/s.dJGHlS0HYXWBcl/wezmJ9vu/ZqU/lskaPJTgYq4cNATHQY0EOgTqc/tkNoj/gR1PNiD_U/wOMYQX";
        else if (type === "footer") script.src = "//selfassured-celebration.com/b.XeVQsXdDGcls0XYFWicl/oecm/9-u/Z/UgljktPfTWYE4LNXTsQr1YOgDRU/t/N/jYg/1xNsDnUI4aOoQh";
        else if (type === "sidebar-sm") script.src = "//selfassured-celebration.com/bUXpVks.dcGblt0/Y/W/cM/CekmB9eucZnUQlwkuPsTyYz4qNETtIgyPMxj/ELtJN/jRg/1/M/jhI/ybNLQq";
        else if (type === "result-inline") script.src = "//selfassured-celebration.com/bxXzVjs.dDGyla0EYtWVcn/xeAmA9NuzZJUulnkWPZT_Y/4bNgTRI/yrO/DtUdtSNrj/gK1lM/jGIp4/OGQE";
        
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.referrerPolicy = 'no-referrer-when-downgrade';

        adContainerRef.current.appendChild(script);
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
        window.postMessage = originalPostMessage;
      };
    }
  }, [adId, type]);

  // 1. حالة الـ MDB Collection (Top Banner)
  if (!adId && type === "top") {
    return (
      <div className={`w-full flex justify-center items-center my-6 px-4 ${className}`}>
        <a href="https://mdbcollection.com" target="_blank" rel="noopener noreferrer" className="relative w-full group overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20" style={{ maxWidth: dim.width }}>
          <div className="h-[90px] md:h-[130px] w-full">
            <img src="/mdb-banner.jpg" alt="MDB Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/5">Sponsored</div>
        </a>
      </div>
    );
  }

  // 2. إذا ما فماش إشهار، نرجعوا ديف فارغة باش الـ DownloaderBox ما يتحيرش
  if (!adId || adId === "") {
    return <div className="ad-placeholder hidden" aria-hidden="true" />;
  }

  // 3. الحالة العادية للإشهار
  return (
    <div className={`ads-banner-wrapper w-full flex justify-center items-center my-4 ${className}`}>
      <div 
        ref={adContainerRef}
        style={{ width: "100%", maxWidth: dim.width, minHeight: `${dim.height}px` }}
        className="flex justify-center items-center"
      />
    </div>
  );
};

export default AdsBanner;
