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
      // 1. Nadhfou el blasa
      containerRef.current.innerHTML = "";
      
      // 2. N-creaw element jdid
      const wrapper = document.createElement("div");
      wrapper.id = `ad-wrapper-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.appendChild(wrapper);

      // 3. N-executiw el code b'tari9a "Native"
      try {
        const range = document.createRange();
        range.selectNode(document.body);
        const documentFragment = range.createContextualFragment(code);
        
        // N-forcey-iw el scripts bech yet-loadiw 100%
        const scripts = documentFragment.querySelectorAll("script");
        scripts.forEach((s) => {
          const newScript = document.createElement("script");
          Array.from(s.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
          newScript.innerHTML = s.innerHTML;
          wrapper.appendChild(newScript);
        });

        // Nzidu el div mte3 Native Ads kima fil tsawer
        const others = Array.from(documentFragment.childNodes).filter(n => n.nodeName !== "SCRIPT");
        others.forEach(n => wrapper.appendChild(n.cloneNode(true)));

      } catch (e) {
        console.error("Adsterra Injection Error:", e);
      }
    }
  }, [code]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex justify-center items-center my-4 overflow-hidden ${className}`} 
      style={{ minHeight: '90px' }}
    />
  );
};

export default AdsBanner;
        `);
        iframeDoc.close();
      }
    }
  }, [code, type]);

  if (!code || code === "PASTE_ADSTERRA_CODE_OR_LINK") {
    return null; // Ma n-affichiw chay ken mafemma chay
  }

  return (
    <div 
      ref={adRef} 
      className={`w-full flex justify-center items-center my-4 ${className}`} 
      style={{ minHeight: '50px' }}
    />
  );
};

export default AdsBanner;


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
