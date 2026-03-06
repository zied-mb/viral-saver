import React, { useEffect, useRef } from "react";

interface AdsBannerProps {
  code: string;
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && code && code !== "PASTE_ADSTERRA_CODE_OR_LINK") {
      // Nadhfou el blasa 9bal ma nloadiw
      adRef.current.innerHTML = "";
      
      const container = document.createElement("div");
      container.innerHTML = code;

      // React ma i-executich script tags dlakhel innerHTML, 
      // donc lazem n-creaw script tag jdid manually
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        
        // Copier les attributs (src, async, etc.)
        Array.from(oldScript.attributes).forEach(attr => 
          newScript.setAttribute(attr.name, attr.value)
        );
        
        // Copier el content dlakhel el script (el key wel options)
        newScript.innerHTML = oldScript.innerHTML;
        adRef.current?.appendChild(newScript);
      });

      // Nzidu el HTML el ba9i (kima el div mte3 Native Ads)
      const otherNodes = Array.from(container.childNodes).filter(n => n.nodeName !== "SCRIPT");
      otherNodes.forEach(node => adRef.current?.appendChild(node.cloneNode(true)));
    }
  }, [code]);

  if (!code || code === "PASTE_ADSTERRA_CODE_OR_LINK") {
    return (
      <div className="hidden sm:flex items-center justify-center border border-white/5 bg-white/[0.02] text-[10px] text-white/10 uppercase rounded-xl min-h-[90px] w-full">
        Ad Space
      </div>
    );
  }

  return <div ref={adRef} className={`w-full flex justify-center overflow-hidden min-h-[50px] ${className}`} />;
};

export default AdsBanner;
      <div className={`hidden sm:flex items-center justify-center border border-white/5 bg-white/[0.02] text-[10px] text-white/10 uppercase font-bold rounded-xl ${className}`} 
           style={{ minHeight: '90px', width: '100%' }}>
        Ad Space
      </div>
    );
  }

  return <div ref={adRef} className={`w-full flex justify-center overflow-hidden min-h-[50px] ${className}`} />;
};

export default AdsBanner;
          src={code}
          width={dim.width}
          height={dim.height}
          scrolling="no"
          frameBorder="0"
          style={{ border: "none", maxWidth: "100%" }}
          title={`ad-${type}`}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: code }}
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default AdsBanner;
