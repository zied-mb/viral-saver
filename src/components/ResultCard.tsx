import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MousePointer2, Lock, AlertTriangle } from "lucide-react";
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

  // ✨ Logic جديد: ثبتنا هل الفيديو موجود فعلاً وإلا لا؟ ✨
  const isPrivate = !previewVideo && result.thumbnail;

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
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isPrivate ? "bg-orange-500/10 border-orange-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}>
            {isPrivate ? <Lock className="w-3.5 h-3.5 text-orange-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className={`${isPrivate ? "text-orange-400" : "text-emerald-400"} text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-shadow-glow`}>
              {isPrivate ? "Private Content Detected" : "Ready to Download"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase border border-white/5">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {platform || "Social Media"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start overflow-hidden">
          
          {/* 1. Video/Thumbnail Section */}
          <div className="relative w-full sm:w-[80%] lg:w-[320px] shrink-0 mx-auto lg:mx-0">
             <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5 min-h-[200px] flex items-center justify-center">
                {previewVideo ? (
                  <video
                    key={previewVideo}
                    src={previewVideo}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-auto max-h-[450px] sm:max-h-[520px] object-contain"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img src={result.thumbnail} className="w-full h-auto object-contain opacity-40 blur-[2px]" alt="thumbnail" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                       <Lock className="w-10 h-10 text-white/20 mb-2" />
                       <span className="text-white/40 text-[10px] font-bold uppercase tracking-tighter">Preview Locked</span>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* 2. Content Section */}
          <div className="flex-1 w-full min-w-0 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-4 leading-tight tracking-tight break-words px-2 lg:px-0">
              {isPrivate ? "This Account is Private 🔒" : (result.title || "Found your same uploaded picture product video! 🚀")}
            </h3>
            
            <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
              {isPrivate 
                ? "We found the post, but it's from a private profile. We can't fetch the download link for private videos due to security restrictions. 🛡️" 
                : "Video is processed. Use the player options below to save the file to your device. ✅"}
            </p>

            {/* Conditional Guide Card */}
            {!isPrivate ? (
              <div className="flex flex-col items-center lg:items-start p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner mx-4 lg:mx-0">
                 <div className="flex items-center gap-2 mb-3 text-cyan-400">
                    <MousePointer2 className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">Quick Save Guide:</span>
                 </div>
                 <p className="text-white/70 text-sm sm:text-base italic leading-relaxed">
                  "Click the <span className="text-white font-bold text-lg mx-1">⋮</span> menu on the video and select 
                  <span className="font-bold ml-1 text-emerald-400 underline decoration-emerald-400/30 underline-offset-4">Download</span>."
                 </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-orange-300 text-xs font-medium italic">
                Tip: Ask the owner to make the post public, then try again!
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
