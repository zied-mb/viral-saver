import React, { useEffect, useRef } from "react";

interface AdsBannerProps {
  code: string;
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  let isMounted = true;

  if (adRef.current && code && code !== "PASTE_ADSTERRA_CODE_OR_LINK") {
    adRef.current.innerHTML = "";
    
    const range = document.createRange();
    const fragment = range.createContextualFragment(code);
    const scripts = fragment.querySelectorAll("script");

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.innerHTML = oldScript.innerHTML;
      if (isMounted) adRef.current?.appendChild(newScript);
    });

    const others = Array.from(fragment.childNodes).filter(n => n.nodeName !== "SCRIPT");
    others.forEach(node => {
      if (isMounted) adRef.current?.appendChild(node.cloneNode(true));
    });
  }

  return () => { isMounted = false; };
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
