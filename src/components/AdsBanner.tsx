import React from "react";

interface AdsBannerProps {
  code: string;
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
  const isPlaceholder =
    !code ||
    code === "PASTE_ADSTERRA_CODE_OR_LINK";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: dim.height, maxWidth: "100%" }}
    >
      {isPlaceholder ? (
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-xs text-white/30 font-mono select-none"
          style={{ width: Math.min(dim.width, 728), height: dim.height }}
        >
          Ad Space · {dim.label}
        </div>
      ) : code.startsWith("http") ? (
        <iframe
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
