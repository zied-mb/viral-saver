import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MousePointer2, Lock, AlertTriangle, ShieldAlert } from "lucide-react";
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

  // 🛡️ Logic تحديد إذا كان الفيديو من حساب خاص (Private)
  const isPrivate = !previewVideo && result.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-[95%] sm:w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border transition-all duration-500 ${
        isPrivate 
          ? "border-red-500/30 bg-[#1a0b0b]/80 shadow-[0_20px_50px_rgba(239,68,68,0.2)]" 
          : "border-white/10 bg-[#0f0720]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      } backdrop-blur-3xl`}
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] ${isPrivate ? "bg-gradient-to-r from-transparent via-red-500 to-transparent" : "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"}`} />

      <div className="p-6 sm:p-8 md:p-10">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isPrivate ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}>
            {isPrivate ? <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className={`${isPrivate ? "text-red-400" : "text-emerald-400"} text-[10px] sm:text-[11px] font-black uppercase tracking-widest`}>
              {isPrivate ? "Access Restricted" : "Ready to Download"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase border border-white/5">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {platform || "Social Media"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* 1. Media Preview Section */}
          <div className="relative w-full sm:w-[80%] lg:w-[320px] shrink-0 mx-auto lg:mx-0">
             <div className={`relative rounded-3xl overflow-hidden bg-black shadow-2xl border ${isPrivate ? "border-red-500/20" : "border-white/5"} min-h-[250px] flex items-center justify-center`}>
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
                  <div className="relative w-full h-full flex flex-col items-center justify-center py-12 px-6">
                    {/* Thumbnail Blurred Background */}
                    <img src={result.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl" alt="blurred-preview" />
                    
                    {/* Lock Icon and Text */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <Lock className="w-8 h-8 text-red-500 animate-pulse" />
                      </div>
                      <span className="text-red-500 text-sm font-black uppercase tracking-tighter text-center">
                        This same uploaded picture product is private
                      </span>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* 2. Text & Actions Section */}
          <div className="flex-1 w-full min-w-0 text-center lg:text-left">
            <h3 className={`text-2xl sm:text-3xl font-black mb-4 leading-tight tracking-tight break-words ${isPrivate ? "text-red-500" : "text-white"}`}>
              {isPrivate ? "Private Content Detected" : (result.title || "Found your same uploaded picture product video! 🚀")}
            </h3>
            
            <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {isPrivate 
                ? "This account is private. We can't fetch the download links for this same uploaded picture product video unless it's public. 🔒" 
                : "The video is processed. Use the player options below to save the file to your device. ✅"}
            </p>

            {!isPrivate ? (
              // Guide for public videos
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
                 <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 text-cyan-400">
                    <MousePointer2 className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">Quick Save Guide:</span>
                 </div>
                 <p className="text-white/70 text-sm sm:text-base italic leading-relaxed">
                  "Click the <span className="text-white font-bold text-lg mx-1">⋮</span> menu on the video and select 
                  <span className="font-bold ml-1 text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 cursor-pointer">Download</span>."
                 </p>
              </div>
            ) : (
              // Warning for private videos
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex flex-col items-center lg:items-start gap-3">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">How to fix?</span>
                </div>
                <p className="text-red-200/60 text-sm font-medium leading-relaxed text-center lg:text-left">
                  Please check if the profile is public or try a different link that is not restricted by privacy settings. 🛡️
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
