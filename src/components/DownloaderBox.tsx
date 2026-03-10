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
    const resolveValue = (val: any) => (val && typeof val === 'string' && val !== "[object Object]") ? val : "";
    switch (type) {
      case "top": return ADS.topBanner;
      case "sidebar-sm": return resolveValue(ADS.sidebarAd1);
      case "result-inline": return resolveValue(ADS.sidebarAd2);
      case "middle": return resolveValue(ADS.middleBanner);
      case "footer": return resolveValue(ADS.footerBanner);
      default: return ""; 
    }
  };

  const adId = getAdId();

  useEffect(() => {
    const isCleanId = adId && typeof adId === 'string' && adId.trim() !== "" && adId !== "[object Object]";

    if (isCleanId && adContainerRef.current) {
      adContainerRef.current.innerHTML = "";

      // 🛡️ Interceptor قوي للـ Desktop: يمنع الـ [object Object] من الظهور في الـ Console
      const originalPostMessage = window.postMessage;
      window.postMessage = function(data: any, ...args: any[]) {
        if (typeof data === 'string' && data.includes('[object Object]')) return;
        return originalPostMessage.apply(window, [data, ...args] as any);
      };

      const getDelay = () => {
        switch (type) {
          case "middle": return 4000;
          case "footer": return 5000;
          case "sidebar-sm": return 3000;
          case "result-inline": return 2000; 
          default: return 2000;
        }
      };

      const timeoutId = setTimeout(() => {
        if (!adContainerRef.current) return;

        const script = document.createElement("script");
        
        if (type === "middle") script.src = "//selfassured-celebration.com/bHXLV/s.dJGHlS0HYXWBcl/wezmJ9vu/ZqU/lskaPJTgYq4cNATHQY0EOgTqc/tkNoj/gR1PNiD_U/wOMYQX";
        else if (type === "footer") script.src = "//selfassured-celebration.com/b.XeVQsXdDGcls0XYFWicl/oecm/9-u/Z/UgljktPfTWYE4LNXTsQr1YOgDRU/t/N/jYg/1xNsDnUI4aOoQh";
        else if (type === "sidebar-sm") script.src = "//selfassured-celebration.com/bUXpVks.dcGblt0/Y/W/cM/CekmB9eucZnUQlwkuPsTyYz4qNETtIgyPMxj/ELtJN/jRg/1/M/jhI/ybNLQq";
        else if (type === "result-inline") script.src = "//selfassured-celebration.com/bxXzVjs.dDGyla0EYtWVcn/xeAmA9NuzZJUulnkWPZT_Y/4bNgTRI/yrO/DtUdtSNrj/gK1lM/jGIp4/OGQE";
        
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.referrerPolicy = 'no-referrer-when-downgrade';

        script.onerror = (e) => {
          if (typeof e === 'string' || (e && (e as any).filename?.includes('selfassured-celebration.com'))) {
            (e as any).preventDefault?.();
            (e as any).stopPropagation?.();
          }
        };
        
        adContainerRef.current.appendChild(script);
      }, getDelay());

      // نرجعوا الـ postMessage لأصله كان كي الـ Banner يتنحى ملـ DOM
      return () => {
        clearTimeout(timeoutId);
        window.postMessage = originalPostMessage;
      };
    }
  }, [adId, type]);

  if (!adId || adId === "") return null;

  return (
    <div key={`${type}-${adId}`} className={`ads-container w-full flex justify-center items-center my-4 ${className}`}>
      <div 
        ref={adContainerRef}
        style={{ width: "100%", maxWidth: dim.width, minHeight: `${dim.height}px` }}
        className="flex justify-center items-center"
      />
    </div>
  );
};

export default AdsBanner;
