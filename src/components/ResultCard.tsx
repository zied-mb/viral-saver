import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MousePointer2, Heart, Eye, User } from "lucide-react";
import { DownloadResult } from "@/types";
import AdsBanner from "./AdsBanner";

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
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="p-6 sm:p-8"> {/* نقصت شوية في الـ padding باش تلم روحها */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Ready to Download</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border border-white/5">
            <Globe className="w-3 h-3" /> {platform || "Instagram"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* 🎬 Video Preview - نركزو هنا */}
          <div className="relative w-full sm:w-[70%] lg:w-[300px] shrink-0 mx-auto lg:mx-0">
             <div className="relative rounded-[1.5rem] overflow-hidden bg-black shadow-2xl border border-white/5 flex items-center justify-center">
                {/* نحيت الـ aspect-ratio باش الطول يتعدل وحده */}
                <video 
                  key={bestVideo} 
                  src={bestVideo} 
                  loop 
                  muted 
                  controls 
                  playsInline 
                  className="w-full h-auto max-h-[400px] object-contain" 
                />
             </div>
          </div>

          {/* ℹ️ Content Info */}
          <div className="flex-1 w-full min-w-0 text-center lg:text-left">
            
            {/* 👤 Owner Username */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-white font-black text-xs tracking-tight italic">
                @{res.owner?.username || "social_user"}
              </span>
            </div>

            {/* 📝 Title */}
            <h3 className="text-xl font-bold mb-4 leading-tight text-white italic">
              {showFullTitle ? res.title : truncateTitle(res.title || "Video Ready!", 80)}
              {res.title && res.title.length > 80 && (
                <button 
                  onClick={() => setShowFullTitle(!showFullTitle)} 
                  className="ml-2 text-cyan-400 text-[10px] font-black uppercase hover:underline"
                >
                  {showFullTitle ? "Less" : "...Plus"}
                </button>
              )}
            </h3>

            {/* 📊 Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Heart className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-white font-black text-xs">{res.like_count || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-black text-xs">{res.view_count || 0}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-cyan-400">
                     <MousePointer2 className="w-3.5 h-3.5" />
                     <span className="text-[9px] font-black tracking-widest uppercase">Quick Save:</span>
                  </div>
                  <p className="text-white/60 text-xs italic">
                   "Click <span className="text-white font-bold">⋮</span> and select <span className="text-emerald-400 font-bold">Download</span>."
                  </p>
               </div>
               <AdsBanner type="result-inline" />
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;