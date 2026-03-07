import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Clipboard, X, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { fetchDownload, detectPlatform, isValidUrl } from "@/services/api";
import { DownloadResult } from "@/types";
import PlatformIcons from "@/components/PlatformIcons";
import ResultCard from "@/components/ResultCard";
import AdsBanner from "@/components/AdsBanner";
import { ADS } from "@/config/ads";

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
      toast.error("Clipboard access denied. Please paste manually.");
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
      setError("Please enter a valid Instagram, TikTok, Facebook, or YouTube URL.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    const data = await fetchDownload(url.trim()).catch((err) => {
      const msg = err?.response?.data?.message || err?.message || "Failed to fetch. Please try again.";
      setError(msg);
      setLoading(false);
      return null;
    });

    if (data) {
      setResult(data);
      toast.success("Media fetched successfully!");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleDownload();
  };

  return (
    /* زدنا w-full باش نتحكموا في الـ Width لداخل */
    <div className="w-full space-y-5">
      
      {/* ── Main Input Card ── */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              <AnimatePresence mode="wait">
                {platform && platform !== "unknown" && (
                  <motion.span
                    key={platform}
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500/25 to-pink-500/25 text-pink-300 border border-pink-400/25 capitalize"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                    {platform} detected
                  </motion.span>
                )}
              </AnimatePresence>
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
                  placeholder="Paste Instagram / TikTok / Facebook / YouTube link here..."
                  className="w-full px-5 py-4 pr-11 rounded-2xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <AnimatePresence>
                  {url && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={handleClear}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-all"
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
                className="flex-shrink-0 flex items-center gap-2 px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-200 text-white/60 hover:text-white"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Clipboard className="w-4 h-4" />
                <span className="hidden sm:inline">Paste</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 mt-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                  <span className="text-red-300 text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={loading}
              className="relative mt-5 w-full py-4 rounded-2xl font-black text-white overflow-hidden group transition-all disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500" />
              <span className="relative flex items-center justify-center gap-2.5">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Fetching...</> : <><Download className="w-5 h-5" /> Download Now</>}
              </span>
            </motion.button>

            <PlatformIcons detected={platform !== "unknown" ? platform : undefined} />
          </div>
        </motion.div>
      </div>

      {/* ── Results Section ── */}
      <div className="max-w-4xl mx-auto w-full px-4">
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="rounded-2xl backdrop-blur-xl p-6 mb-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex gap-4 animate-pulse">
                <div className="w-32 h-32 rounded-xl bg-white/5" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-white/5 w-1/4 rounded" />
                  <div className="h-4 bg-white/5 w-3/4 rounded" />
                </div>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <AdsBanner code={ADS.middleBanner} type="middle" />
              </div>
              {/* نفس الـ ResultCard باش تخدم توا مرتاحة في الـ 4xl */}
              <ResultCard result={result} platform={platform} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DownloaderBox;
