// src/components/AdsBanner.tsx
import React, { useEffect } from "react";

interface AdsBannerProps {
  code: string; // رقم ID من Adsterra
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS: Record<AdsBannerProps["type"], { width: number; height: number; label: string }> = {
  top: { width: 728, height: 90, label: "728×90" },
  middle: { width: 728, height: 90, label: "728×90" },
  "sidebar-sm": { width: 300, height: 250, label: "300×250" },
  "sidebar-lg": { width: 300, height: 600, label: "300×600" },
  footer: { width: 970, height: 90, label: "970×90" },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];

  useEffect(() => {
    if (!code || code === "PASTE_ADSTERRA_CODE_OR_LINK") return;

    // إنشاء سكريبت Adsterra
    const script = document.createElement("script");
    script.src = `https://www.adsterra.com/ads.js?${code}`; // مثال، حسب سكريبتهم
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [code]);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: dim.height, maxWidth: "100%" }}
    >
      {/* Placeholder يظهر إذا ما فماش كود */}
      {!code || code === "PASTE_ADSTERRA_CODE_OR_LINK" ? (
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-xs text-white/30 font-mono select-none"
          style={{ width: Math.min(dim.width, 728), height: dim.height }}
        >
          Ad Space · {dim.label}
        </div>
      ) : (
        // div خاص باش Adsterra يحط الإعلان فيه
        <div
          id={`ad-${code}`}
          style={{ width: dim.width, height: dim.height }}
        />
      )}
    </div>
  );
};

export default AdsBanner;
