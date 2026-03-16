import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Globe, User, Sparkles, Video,
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

  const videoMedias = (res.medias || []).filter((m: any) => m.type === "video" || m.ext === "mp4");
  const imageMedias = (res.medias || []).filter((m: any) => m.type === "image" || m.ext === "jpg" || m.ext === "png");

  const isVideo = videoMedias.length > 0;
  const isImage = !isVideo && (imageMedias.length > 0 || res.type === "image");

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
      className="relative w-[95%] sm:w-full max-w-5xl mx-auto mt-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f0720]/80 shadow-2xl backdrop-blur-3xl"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="p-6 sm:p-10">
        {/* Header: Status & Platform */}
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          
          {/* 🖼️ Media Preview Section */}
          <div className="relative w-full sm:w-[80%] lg:w-[360px] shrink-0">
             <div className="relative rounded-[2.2rem] overflow-hidden bg-black/40 shadow-2xl border border-white/10 group">
                {isImage ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <video 
                    key={previewUrl}
                    src={previewUrl} 
                    loop muted controls playsInline 
                    className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                  />
                )}
             </div>
          </div>

          {/* 📝 Content & Action Buttons */}
          <div className="flex-1 w-full text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-black text-sm italic opacity-80">
                @{res.owner?.username || res.author || "creator"}
              </span>
            </div>

            <h3 className="text-xl lg:text-3xl font-extrabold mb-8 text-white italic leading-tight tracking-tight">
              {res.title ? (showFullTitle ? res.title : res.title.slice(0, 55) + "...") : "Processing done! 🚀"}
            </h3>

            {/* 📥 Selection List: Minimalist Glass Rectangles */}
            <div className="flex flex-col gap-4 mb-10 max-w-md mx-auto lg:mx-0">
              {isImage ? (
                <button
                  onClick={() => forceDownload(previewUrl, "ViralSaver_Img", "Image")}
                  disabled={downloading !== null}
                  className="group relative flex items-center justify-center py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-pink-500/40 transition-all duration-300 shadow-lg"
                >
                  <ImageIcon className="w-7 h-7 text-pink-400 group-hover:scale-110 transition-transform" />
                  {downloading === previewUrl && (
                    <div className="absolute right-6 animate-spin rounded-full h-5 w-5 border-2 border-pink-500 border-t-transparent" />
                  )}
                </button>
              ) : (
                <>
                  {videoMedias.slice(0, 1).map((m: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => forceDownload(m.url, `ViralSaver_Vid`, "Video")}
                      disabled={downloading !== null}
                      className="group relative flex items-center justify-center py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 shadow-lg"
                    >
                      <Video className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
                      {downloading === m.url && (
                        <div className="absolute right-6 animate-spin rounded-full h-5 w-5 border-2 border-cyan-500 border-t-transparent" />
                      )}
                    </button>
                  ))}

                  <button
                    onClick={() => forceDownload(previewUrl, "ViralSaver_Audio", "Audio")}
                    disabled={downloading !== null}
                    className="group relative flex items-center justify-center py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 shadow-lg"
                  >
                    <Music className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform" />
                    {downloading === "Audio" && (
                      <div className="absolute right-6 animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent" />
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Smart Core Box */}
            <div className="p-5 rounded-[1.8rem] bg-white/[0.03] border border-white/5">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-widest uppercase italic">ViralSaver Smart Core</span>
              </div>
              <p className="text-white/40 text-[11px] italic leading-relaxed">
                Content detected and optimized. High quality guaranteed. 🚀
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
