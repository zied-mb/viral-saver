import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MousePointer2 } from "lucide-react";
import { DownloadResult } from "@/types";

interface ResultCardProps {
  result: DownloadResult;
  platform: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, platform }) => {
  const allLinks = [
    ...(result.medias || []).map((m) => ({
      url: m.url,
      quality: m.quality || "",
      ext: m.ext || "mp4",
    })),
    ...(result.links || []),
  ].filter((l) => l.url);

  const videoLinks = allLinks.filter((l) => l.ext === "mp4");
  const bestVideo = videoLinks.sort((a, b) => (parseInt(b.quality) || 0) - (parseInt(a.quality) || 0))[0];
  const previewVideo = bestVideo?.url || null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      // Saghart fil margins w radditha 100% width dlakhel el parent
      className="relative w-full mx-auto mt-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-[#0f0720]/95 backdrop-blur-3xl shadow-xl"
    >
      <div className="p-3 sm:p-6 lg:p-8">
        {/* Header Compact */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-black uppercase">Ready</span>
          </div>
          <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{platform || "same uploaded picture product"}</span>
        </div>

        <div className="flex flex-col gap-4 items-center overflow-hidden">
{/* Video Player Section */}
<div className="w-full max-w-[240px] sm:max-w-[280px] shrink-0">
    <div className="relative rounded-xl overflow-hidden bg-black border border-white/5 aspect-auto shadow-2xl">
        {previewVideo ? (
            <video
                key={previewVideo}
                src={previewVideo}
                autoPlay 
                loop  
                controls
                className="w-full h-auto max-h-[320px] sm:max-h-[480px] object-contain"
                // ✨ FIX: إذا الفيديو ما خدمش، أظهر الـ Thumbnail
                onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none'; // خبي الـ player المكسر
                }}
            />
        ) : null}

        {/* ✨ Thumbnail Proxy Fix ✨ */}
        {(result.thumbnail && (!previewVideo)) && (
            <img 
                src={`https://wsrv.nl/?url=${encodeURIComponent(result.thumbnail)}&default=https://viralsaver.app/og-image.jpg`} 
                className="w-full h-auto object-cover" 
                alt="Video Preview"
                referrerPolicy="no-referrer"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/og-image.jpg"; // Placeholder إذا كل شي فشل
                }}
            />
        )}
    </div>
</div>
          {/* Text Section - Break words fixed */}
          <div className="w-full min-w-0 text-center">
            <h3 className="text-sm sm:text-xl font-black text-white mb-2 leading-tight break-words line-clamp-2 px-1">
              {result.title || "Found your video! 🚀"}
            </h3>
            
            <p className="text-white/40 text-[10px] sm:text-sm mb-4">
              Your video is ready. Save it now. ✅
            </p>

            {/* Guide Card - Ultra slim */}
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 inline-block w-full">
               <div className="flex items-center justify-center gap-1.5 mb-1 text-cyan-400/80">
                  <MousePointer2 className="w-3 h-3" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Guide</span>
               </div>
               <p className="text-white/60 text-[10px] italic">
                Click <span className="text-white font-bold">⋮</span> and select <span className="text-emerald-400 font-bold underline">Download</span>.
               </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
