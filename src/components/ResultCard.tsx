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
          
          {/* 🖼️ Media Preview: Fixed width on Desktop for stability */}
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

            {/* 📥 Selection Grid: Optimized for PC & Mobile */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
              {isImage ? (
                <button
                  onClick={() => forceDownload(previewUrl, "ViralSaver_Img", "Image")}
                  disabled={downloading !== null}
                  className="col-span-full group relative flex items-center justify-center gap-4 px-8 py-6 rounded-[1.8rem] bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <ImageIcon className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-black uppercase italic tracking-wider whitespace-nowrap">
                    {downloading === previewUrl ? "Downloading..." : "Download Image"}
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-cyan-500/10 -z-10" />
                </button>
              ) : (
                <>
                  {videoMedias.map((m: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => forceDownload(m.url, `ViralSaver_Vid_${m.quality}`, m.quality)}
                      disabled={downloading !== null}
                      className="group relative flex items-center justify-center gap-4 px-6 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors shrink-0">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-white text-[11px] font-black uppercase tracking-tighter truncate">Video {m.quality}</p>
                        <p className="text-white/30 text-[9px] uppercase font-bold">{m.ext}</p>
                      </div>
                      {downloading === m.url && (
                        <div className="absolute right-4 animate-spin rounded-full h-4 w-4 border-2 border-cyan-500 border-t-transparent" />
                      )}
                    </button>
                  ))}

                  <button
                    onClick={() => forceDownload(previewUrl, "ViralSaver_Audio", "Audio")}
                    disabled={downloading !== null}
                    className="group relative flex items-center justify-center gap-4 px-6 py-5 rounded-[1.5rem] bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors shrink-0">
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-white text-[11px] font-black uppercase tracking-tighter italic truncate">Audio Only</p>
                      <p className="text-white/30 text-[9px] uppercase font-bold">High Quality MP3</p>
                    </div>
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
