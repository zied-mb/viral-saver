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
  
  const bestVideo = videoLinks.sort((a, b) => {
    const qA = parseInt(a.quality) || 0;
    const qB = parseInt(b.quality) || 0;
    return qB - qA;
  })[0];

  const previewVideo = bestVideo?.url || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-[95%] sm:w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#0f0720]/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-shadow-glow">
              Ready to Download
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase border border-white/5">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {platform || "Social Media"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start overflow-hidden">
          
          {/* 1. Video Player Section */}
          <div className="relative w-full sm:w-[80%] lg:w-[320px] shrink-0 mx-auto lg:mx-0">
             <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5 group aspect-auto">
                {previewVideo ? (
                  <video
                    key={previewVideo}
                    src={previewVideo}
                    autoPlay
                    loop
                    controls
                    className="w-full h-auto max-h-[450px] sm:max-h-[520px] object-contain"
                  />
                ) : (
                  <img src={result.thumbnail} className="w-full h-auto object-contain" alt="thumbnail" />
                )}
                
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-lg">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                   <span className="text-[9px] text-white/90 font-bold uppercase">
                    {bestVideo?.quality || "HD"} No Watermark
                   </span>
                </div>
             </div>
          </div>

          {/* 2. Content & Guide Section - Fixed Overflow here */}
          <div className="flex-1 w-full min-w-0 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-4 leading-tight tracking-tight break-words px-2 lg:px-0">
              {result.title || "Social Media Video Found"}
            </h3>
            
            <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
              Video is processed. Use the player options below to save the file to your device. ✅
            </p>

            {/* Instruction Card */}
            <div className="flex flex-col items-center lg:items-start p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner mx-4 lg:mx-0">
               <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <MousePointer2 className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">Quick Save Guide:</span>
               </div>
               <p className="text-white/70 text-sm sm:text-base italic leading-relaxed">
                "Click the <span className="text-white font-bold text-lg mx-1">⋮</span> menu on the video and select 
                <span className="font-bold ml-1 text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 cursor-pointer">Download</span>."
               </p>
            </div>

            <p className="mt-6 text-[10px] text-white/20 uppercase tracking-tighter block lg:hidden font-medium">
              Scroll if menu is hidden
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
