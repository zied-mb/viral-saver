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
      // 1. Nadhfou el container
      adRef.current.innerHTML = "";
      
      // 2. N-creaw iframe bech n-isoliw el script mte3 Adsterra
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      // El hauteur n-ajustiwha 7asb el type
      iframe.height = type.includes("sidebar") ? "600" : "90"; 
      
      adRef.current.appendChild(iframe);

      // 3. N-injectiw el script dlakhel el iframe
      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <html>
            <body style="margin:0; padding:0; display:flex; justify-content:center;">
              ${code}
            </body>
          </html>
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
