import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MousePointer2, Heart, Eye, User, Sparkles } from "lucide-react";
import { DownloadResult } from "@/types";

interface ResultCardProps {
  result: DownloadResult;
  platform: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, platform }) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const res = result as any;

  const allLinks = [
    ...(result.medias || []).map((m) => ({ url: m.url, quality: m.quality || "", ext: m.ext || "mp4" })),
    ...(result.links || []),
  ].filter((l) => l.url);

  const bestVideo = allLinks.find((l) => l.ext === "mp4")?.url || allLinks[0]?.url;

  if (!bestVideo) return null;

  const truncateTitle = (text: string, limit: number) => {
    if (!text || text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-[95%] sm:w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f0720]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="p-6 sm:p-10">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.15em]">Ready to Download</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2 rounded-full text-[11px] font-bold uppercase border border-white/5 tracking-wider">
            <Globe className="w-3.5 h-3.5" /> {platform || "Social Media"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start">
          
          {/* 🎬 Video Preview Area */}
          <div className="relative w-full sm:w-[80%] lg:w-[320px] shrink-0 mx-auto lg:mx-0">
             <div className="relative rounded-[2rem] overflow-hidden bg-black shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-white/10 flex items-center justify-center group">
                <video 
                  key={bestVideo} 
                  src={bestVideo} 
                  loop 
                  muted 
                  controls 
                  playsInline 
                  className="w-full h-auto max-h-[450px] object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                />
             </div>
          </div>

          {/* ℹ️ Content Info Area */}
          <div className="flex-1 w-full min-w-0 text-center lg:text-left flex flex-col h-full">
            
            {/* 👤 Owner Profile */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-inner">
                <User className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-white font-black text-sm tracking-tight italic opacity-90">
                @{res.owner?.username || "social_user"}
              </span>
            </div>

            {/* 📝 Video Title */}
            <h3 className="text-2xl font-extrabold mb-6 leading-[1.3] text-white italic tracking-tight">
              {showFullTitle ? res.title : truncateTitle(res.title || "Your video is processed and ready!", 90)}
              {res.title && res.title.length > 90 && (
                <button 
                  onClick={() => setShowFullTitle(!showFullTitle)} 
                  className="ml-3 text-cyan-400 text-[11px] font-black uppercase hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 underline-offset-4"
                >
                  {showFullTitle ? "Show Less" : "Read More"}
                </button>
              )}
            </h3>

            {/* 📊 Engagement Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 transition-colors hover:bg-white/[0.08]">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500/10" />
                <span className="text-white font-bold text-sm">{res.like_count?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 transition-colors hover:bg-white/[0.08]">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold text-sm">{res.view_count?.toLocaleString() || 0}</span>
              </div>
            </div>

            {/* 💡 Modern Quick Save Instructions */}
            <div className="mt-auto">
               <div className="p-6 rounded-[1.8rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3 text-cyan-400">
                     <MousePointer2 className="w-4 h-4 animate-pulse" />
                     <span className="text-[10px] font-black tracking-[0.2em] uppercase">Quick Save Guide</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    "Tap the <span className="text-white font-bold mx-1">⋮</span> icon on the video player and select <span className="text-emerald-400 font-bold ml-1">Download</span> to save directly to your device."
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
