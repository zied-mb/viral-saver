import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MousePointer2 } from "lucide-react";
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      // Saghart fil width (w-[88%]) w na9ast fil margins
      className="relative w-[88%] sm:w-full max-w-4xl mx-auto mt-2 overflow-hidden rounded-[1.2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#0f0720]/95 backdrop-blur-3xl shadow-2xl"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Padding sghir barcha (p-3) bech el card dji mlammouma */}
      <div className="p-3 sm:p-8 md:p-10">
        
        {/* Header Section - Very compact */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-8">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[8px] sm:text-[11px] font-black uppercase tracking-tighter">Ready</span>
          </div>
          <div className="text-white/30 text-[8px] sm:text-[11px] font-bold uppercase tracking-widest">
            {platform || "Video"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-12 items-center lg:items-start overflow-hidden text-center lg:text-left">
          
          {/* 1. Video Player - Saghart fil max-h mte3ou (300px) */}
          <div className="relative w-full sm:w-[60%] lg:w-[280px] shrink-0 mx-auto lg:mx-0">
             <div className="relative rounded-lg sm:rounded-3xl overflow-hidden bg-black border border-white/5">
                {previewVideo ? (
                  <video
                    key={previewVideo}
                    src={previewVideo}
                    autoPlay
                    loop
                    muted
                    controls
                    className="w-full h-auto max-h-[300px] sm:max-h-[500px] object-contain"
                  />
                ) : (
                  <img src={result.thumbnail} className="w-full h-auto" alt="thumb" />
                )}
             </div>
          </div>

          {/* 2. Content Section - Fonts sghar lel mobile */}
          <div className="flex-1 w-full min-w-0">
            <h3 className="text-sm sm:text-2xl md:text-3xl font-black text-white mb-1.5 leading-tight tracking-tight break-words line-clamp-2">
              {result.title || "Found your video! 🚀"}
            </h3>
            
            <p className="text-white/40 text-[10px] sm:text-base mb-3 leading-tight">
              Same uploaded picture product ready. ✅
            </p>

            {/* Instruction Card - Ultra compact */}
            <div className="inline-flex flex-col items-center lg:items-start p-2.5 rounded-lg bg-white/[0.02] border border-white/5 w-full sm:w-auto">
               <div className="flex items-center gap-1.5 mb-1 text-cyan-400/80">
                  <MousePointer2 className="w-3 h-3" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">How to save</span>
               </div>
               <p className="text-white/60 text-[9px] sm:text-sm italic leading-tight">
                "Click <span className="text-white font-bold">⋮</span> then <span className="text-emerald-400 font-bold">Download</span>"
               </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
