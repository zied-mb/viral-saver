import React, { useEffect, useRef } from "react";

interface AdsBannerProps {
  code: string;
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Law ken femma code w mouch placeholder, n-injectiw el script
    if (adRef.current && code && code !== "PASTE_ADSTERRA_CODE_OR_LINK") {
      adRef.current.innerHTML = ""; // Nadhfou el blasa
      
      const range = document.createRange();
      const documentFragment = range.createContextualFragment(code);
      
      // React ma i-executich script tags, donc lazemna n-forcey-hom manually
      const scripts = documentFragment.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        adRef.current?.appendChild(newScript);
      });

      // Nzidu el ba9iya (kima el div mte3 Native Ads)
      const otherContent = Array.from(documentFragment.childNodes).filter(node => node.nodeName !== "SCRIPT");
      otherContent.forEach(node => adRef.current?.appendChild(node));
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
