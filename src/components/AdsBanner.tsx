import React, { useEffect, useRef } from "react";

interface AdsBannerProps {
  code: string;
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && code && code !== "PASTE_ADSTERRA_CODE_OR_LINK") {
      containerRef.current.innerHTML = "";
      
      const wrapper = document.createElement("div");
      wrapper.id = `ad-wrapper-${Math.random().toString(36).substring(2, 9)}`;
      containerRef.current.appendChild(wrapper);

      try {
        const range = document.createRange();
        range.selectNode(document.body);
        const fragment = range.createContextualFragment(code);
        
        const scripts = fragment.querySelectorAll("script");
        scripts.forEach((s) => {
          const newScript = document.createElement("script");
          Array.from(s.attributes).forEach(attr => 
            newScript.setAttribute(attr.name, attr.value)
          );
          newScript.innerHTML = s.innerHTML;
          wrapper.appendChild(newScript);
        });

        const others = Array.from(fragment.childNodes).filter(n => n.nodeName !== "SCRIPT");
        others.forEach(n => wrapper.appendChild(n.cloneNode(true)));
      } catch (e) {
        console.error("Ad Injection Error:", e);
      }
    }
  }, [code]);

  if (!code || code === "PASTE_ADSTERRA_CODE_OR_LINK") {
    return (
      <div className={`hidden sm:flex items-center justify-center border border-white/5 bg-white/[0.02] text-[10px] text-white/10 uppercase font-bold rounded-xl ${className}`} 
           style={{ minHeight: '90px', width: '100%' }}>
        Ad Space
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex justify-center items-center my-4 overflow-hidden ${className}`} 
      style={{ minHeight: '90px' }}
    />
  );
};

export default AdsBanner;
