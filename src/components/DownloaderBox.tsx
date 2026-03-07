import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Clipboard, X, Loader2, AlertCircle, Sparkles, Lock, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { fetchDownload, detectPlatform, isValidUrl } from "@/services/api";
import { DownloadResult } from "@/types";
import PlatformIcons from "@/components/PlatformIcons";
import ResultCard from "@/components/ResultCard";

const DownloaderBox: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const platform = detectPlatform(url);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
      setResult(null);
      inputRef.current?.focus();
    } catch {
      toast.error("Clipboard access denied.");
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
    setResult(null);
    inputRef.current?.focus();
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please paste a social media link to continue.");
      return;
    }
    if (!isValidUrl(url.trim())) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await fetchDownload(url.trim());
      if (data && (data.error === true || data.status === 404 || data.message === "Not found data")) {
        setError("PRIVATE_ACCOUNT_DETECTED");
        setLoading(false);
        return;
      }
      if (data) {
        setResult(data);
        toast.success("Media fetched successfully!");
      }
    } catch (err: any) {
      setError("Unable to fetch media. Please check your link. ⚠️");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleDownload();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative rounded-3xl overflow-hidden backdrop-blur-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-400 via-50% to-cyan-400" />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white/50 uppercase tracking-wider">Smart Downloader</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                  if (!e.target.value) setResult(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Paste Instagram / TikTok / Facebook link..."
                className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-200 bg-white/5 border border-white/10"
              />
              <AnimatePresence>
                {url && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={handleClear}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePaste}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-4 rounded-2xl text-sm font-semibold text-white/60 hover:text-white border border-white/10 bg-white/5"
            >
              <Clipboard className="w-4 h-4" />
              <span className="hidden sm:inline">Paste</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            disabled={loading}
            className="relative mt-5 w-full py-4 rounded-2xl font-black text-white text-base overflow-hidden group transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500" />
            <span className="relative flex items-center justify-center gap-2.5">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Fetching...</> : <><Download className="w-5 h-5" /> Download Now</>}
            </span>
          </motion.button>

{/* ── Private Content Card ── */}
<AnimatePresence>
  {error === "PRIVATE_ACCOUNT_DETECTED" && (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-6 overflow-hidden rounded-[2rem] border border-red-500/10 bg-[#0d070b] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 sm:p-10">
        
        {/* 🎥 الكادر (Clean Phone Frame) */}
  <div className="relative flex-shrink-0 w-[140px] h-[200px] rounded-2xl bg-black border-2 border-red-500/5 flex items-center justify-center">
  {/* Corner Accents */}
  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/40" />
  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/40" />
  
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
       <div className="absolute -inset-1 bg-red-500/10 blur rounded-full" />
       <Lock className="relative w-7 h-7 text-red-600/90" />
    </div>
    <div className="h-[1px] w-8 bg-white/10" />
  </div>
</div>

        {/* 📝 المحتوى (Minimalist Text) */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-500/10 text-red-500 uppercase tracking-widest border border-red-500/10">
              Restricted
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight italic">
             PRIVATE CONTENT <span className="text-red-600/90 italic">DETECTED</span>
          </h3>
          
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm">
            This account is private. Please make sure the link is public to access their content. 🛡️
          </p>

  
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          
          <PlatformIcons detected={platform !== "unknown" ? platform : undefined} />
        </div>
      </motion.div>

      {/* ── Result Card (Shows below the Main Card on Success) ── */}
      <AnimatePresence>
        {result && !loading && <ResultCard result={result} platform={platform} />}
      </AnimatePresence>
    </div>
  );
};

export default DownloaderBox;
