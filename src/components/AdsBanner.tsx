import React from "react";

interface AdsBannerProps {
  code?: string; // ممكن تحط URL مباشر للـ iframe أو HTML
  type: "top" | "middle" | "sidebar-sm" | "sidebar-lg" | "footer";
  className?: string;
}

const AD_DIMENSIONS = {
  top: { width: 728, height: 90 },
  middle: { width: 728, height: 90 },
  "sidebar-sm": { width: 300, height: 250 },
  "sidebar-lg": { width: 160, height: 600 },
  footer: { width: 970, height: 90 },
};

const AdsBanner: React.FC<AdsBannerProps> = ({ code, type, className = "" }) => {
  const dim = AD_DIMENSIONS[type];

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: dim.height, maxWidth: "100%" }}
    >
      {code ? (
        code.startsWith("http") ? (
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
          <div dangerouslySetInnerHTML={{ __html: code }} style={{ maxWidth: "100%" }} />
        )
      ) : (
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-xs text-white/30 font-mono select-none"
          style={{ width: dim.width, height: dim.height }}
        >
          Ad Space
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
