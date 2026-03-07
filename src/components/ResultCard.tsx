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

  // 🛡️ تحديد حالة الحساب الخاص
  const isPrivate = !previewVideo && !!result.thumbnail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
        isPrivate 
          ? "border-red-500/30 bg-[#1a0b0b]/90 shadow-[0_20px_50px_rgba(239,68,68,0.2)]" 
          : "border-white/10 bg-[#0f0720]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      } backdrop-blur-3xl`}
    >
      <div className={`absolute top-0 left-0 w-full h-[2px] ${isPrivate ? "bg-red-500" : "bg-cyan-500/50"}`} />

      <div className="p-6 sm:p-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isPrivate ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`}>
            {isPrivate ? <Lock size={14} /> : <CheckCircle2 size={14} />}
            <span className="text-[11px] font-black uppercase tracking-widest">
              {isPrivate ? "Access Restricted" : "Ready to Download"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40 bg-white/5 px-4 py-2 rounded-full text-[11px] font-bold border border-white/5">
            <Globe size={14} /> {platform || "Social Media"}
          </div>
        </div>

        {/* ⚠️ هنا السحر: التغيير من row لـ col إذا كان private لملء المساحة */}
        <div className={`flex flex-col ${isPrivate ? "items-center text-center" : "lg:flex-row lg:items-start gap-10"}`}>
          
          {/* 1. Preview Area */}
          <div className={`shrink-0 ${isPrivate ? "w-full max-w-[300px] mb-8" : "w-full lg:w-[320px]"}`}>
             <div className={`relative rounded-[2rem] overflow-hidden bg-black shadow-2xl border ${isPrivate ? "border-red-500/20" : "border-white/5"} min-h-[250px] flex items-center justify-center`}>
                {previewVideo ? (
                  <video src={previewVideo} controls playsInline className="w-full h-auto max-h-[450px] object-contain" />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center py-12 px-6">
                    <img src={result.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl" alt="" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                      </div>
                      <span className="text-red-500 font-black uppercase tracking-tighter">Private Account</span>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* 2. Dynamic Content Area */}
          <div className={`flex-1 w-full ${isPrivate ? "max-w-lg" : "text-left"}`}>
            {isPrivate ? (
              /* --- تظهر فقط عند وجود حساب خاص --- */
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl font-black text-red-500 leading-tight">
                  This Profile is Private! 🔒
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  We can't access this content due to privacy settings. Please make sure the post is public. 🛡️
                </p>
                <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-start gap-3 text-left">
                  <AlertCircle className="text-red-500 shrink-0 mt-1" size={20} />
                  <p className="text-red-200/70 text-sm font-medium">
                    Try checking if the user has a public profile or use a different link.
                  </p>
                </div>
              </div>
            ) : (
              /* --- تظهر فقط عندما يكون الفيديو جاهز --- */
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                    {result.title || "Video Ready for Download! 🚀"}
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed max-w-md">
                    The video has been processed successfully. You can now save it to your device. ✅
                  </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 shadow-inner">
                   <div className="flex items-center gap-2 mb-4 text-cyan-400">
                      <MousePointer2 size={18} />
                      <span className="text-xs font-bold tracking-widest uppercase">Quick Save Guide</span>
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
