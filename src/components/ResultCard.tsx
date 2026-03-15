import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Globe, User, Sparkles, 
  Download, Music, Image as ImageIcon 
} from "lucide-react";
import { DownloadResult } from "@/types";
import { toast } from "sonner";

interface ResultCardProps {
  result: DownloadResult;
  platform: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, platform }) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const res = result as any;

  // 1. تنظيف الـ Medias وتحديد الروابط الصحيحة
  const videoMedias = (res.medias || []).filter((m: any) => m.type === "video" || m.ext === "mp4");
  const imageMedias = (res.medias || []).filter((m: any) => m.type === "image" || m.ext === "jpg" || m.ext === "png");

  // تحديد نوع المحتوى الأساسي
  const isVideo = videoMedias.length > 0;
  const isImage = !isVideo && (imageMedias.length > 0 || res.type === "image");

  // الرابط اللي باش يظهر في الـ Preview
  const previewUrl = isVideo ? videoMedias[0]?.url : (imageMedias[0]?.url || res.url);

  const forceDownload = async (url: string, filename: string, label: string) => {
    try {
      setDownloading(url);
      toast.info(`Downloading ${label}... ⏳`);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${filename}_${Date.now()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success(`${label} saved! 🚀`);
    } catch (error) {
      window.open(url, "_blank");
      toast.error("Redirecting to source...");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-[95%] sm:w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f0720]/80 shadow-2xl backdrop-blur-3xl"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest italic">
              {isImage ? "Image Found" : "Video Found"}
            </span>
          </div>
          <div className="text-white/50 bg-white/5 px-4 py-2 rounded-full text-[11px] font-bold uppercase border border-white/5 italic tracking-tighter">
            {platform || "Social Media"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start">
          
          {/* 🖼️ Media Preview Fix */}
          <div className="relative w-full sm:w-[80%] lg:w-[320px] shrink-0">
             <div className="relative rounded-[2rem] overflow-hidden bg-black/40 shadow-2xl border border-white/10 group min-h-[200px] flex items-center justify-center">
                {isImage ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[450px] object-contain transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <video 
                    key={previewUrl} // مهم جداً لإعادة تشغيل الـ Player عند تغيير الفيديو
                    src={previewUrl} 
                    loop muted controls playsInline 
                    className="w-full h-auto max-h-[450px] object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                  />
                )}
             </div>
          </div>

          <div className="flex-1 w-full text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-black text-sm italic opacity-80">
                @{res.owner?.username || res.author || "creator"}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold mb-6 text-white italic leading-tight tracking-tight">
              {res.title ? (showFullTitle ? res.title : res.title.slice(0, 60) + "...") : "Processing done! 🚀"}
            </h3>

            {/* 📥 Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {isImage ? (
                <button
                  onClick={() => forceDownload(previewUrl, "ViralSaver_Img", "Image")}
                  className="col-span-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-white/10 hover:bg-white/5 transition-all group"
                >
                  <ImageIcon className="w-6 h-6 text-pink-400" />
                  <span className="text-white font-black uppercase italic">Download Image</span>
                </button>
              ) : (
                <>
                  {videoMedias.map((m: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => forceDownload(m.url, `ViralSaver_Vid_${m.quality}`, m.quality)}
                      className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all"
                    >
                      <Download className="w-5 h-5 text-cyan-400" />
                      <div className="text-left">
                        <p className="text-white text-[10px] font-black uppercase">Video {m.quality}</p>
                        <p className="text-white/40 text-[9px] uppercase font-bold">{m.ext}</p>
                      </div>
                    </button>
                  ))}

                  <button
                    onClick={() => forceDownload(previewUrl, "ViralSaver_Audio", "Audio")}
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all"
                  >
                    <Music className="w-5 h-5 text-emerald-400" />
                    <div className="text-left">
                      <p className="text-white text-[10px] font-black uppercase italic">Audio Only</p>
                      <p className="text-white/40 text-[9px] uppercase font-bold">MP3 / AAC</p>
                    </div>
                  </button>
                </>
              )}
            </div>

            <div className="p-5 rounded-[1.8rem] bg-white/[0.03] border border-white/5">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-widest uppercase italic">ViralSaver Smart Core</span>
              </div>
              <p className="text-white/40 text-[11px] italic leading-relaxed">
                Content detected and optimized. Quality might vary based on source. 🚀
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
