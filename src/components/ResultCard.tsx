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
  const bestVideo = videoLinks.sort((a, b) => (parseInt(b.quality) || 0) - (parseInt(a.quality) || 0))[0];
  const previewVideo = bestVideo?.url || null;

  // 🛡️ تحديد الحالة: إذا ما فماش فيديو وفما Thumbnail يعني الحساب Private
  const isPrivate = !previewVideo && !!result.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-[95%] sm:w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
        isPrivate ? "border-red-500/30 bg-[#1a0b0b]/90 shadow-[0_0_40px_rgba(239,68,68,0.1)]" : "border-white/10 bg-[#0f0720]/80 shadow-2xl"
      } backdrop-blur-3xl`}
    >
      {/* Top Gradient Line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] ${isPrivate ? "bg-red-500" : "bg-cyan-500/50"}`} />

      <div className="p-6 sm:p-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isPrivate ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`}>
            {isPrivate ? <Lock size={14} /> : <CheckCircle2 size={14} />}
            <span className="text-[11px] font-black uppercase tracking-widest">
              {isPrivate ? "Access Restricted" : "Ready to Download"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-4 py-2 rounded-full text-[11px] font-bold border border-white/5">
            <Globe size={14} /> {platform.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          
          {/* 1. Preview Area */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className={`relative aspect-square lg:aspect-[9/16] rounded-[2rem] overflow-hidden bg-black border ${isPrivate ? "border-red-500/20" : "border-white/5"} flex items-center justify-center shadow-2xl`}>
              {previewVideo ? (
                <video src={previewVideo} controls className="w-full h-full object-contain" />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
                   <img src={result.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl" alt="" />
                   <div className="relative z-10">
                     <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto border border-red-500/30">
                        <ShieldAlert className="text-red-500" size={32} />
                     </div>
                     <p className="text-red-500 font-black uppercase text-sm tracking-tighter">Private Profile</p>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Dynamic Content Area */}
          <div className="flex-1 text-center lg:text-left py-2">
            {isPrivate ? (
              /* --- PRIVATE STATE UI --- */
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl font-black text-red-500 leading-tight">
                  This Account is Private! 🔒
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                  We're sorry, but we can't access this content. Private videos are protected by the platform's security. 🛡️
                </p>
                <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 inline-flex items-start gap-3 text-left">
                  <AlertTriangle className="text-red-500 shrink-0" size={20} />
                  <p className="text-red-200/70 text-sm font-medium">
                    Make sure the account is public or try a different link that isn't restricted.
                  </p>
                </div>
              </div>
            ) : (
              /* --- PUBLIC STATE UI (READY) --- */
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                    Video Ready for Download! 🚀
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed max-w-md">
                    The video has been successfully processed. You can now save it to your device using the player options. ✅
                  </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 shadow-inner">
                  <div className="flex items-center gap-2 mb-4 text-cyan-400">
                    <MousePointer2 size={18} />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Quick Save Guide</span>
                  </div>
                  <p className="text-white/80 text-lg italic font-medium">
                    "Click the <span className="text-white font-black text-2xl mx-1 inline-block translate-y-0.5">⋮</span> menu on the video and select 
                    <span className="text-emerald-400 underline underline-offset-8 ml-2">Download</span>."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
