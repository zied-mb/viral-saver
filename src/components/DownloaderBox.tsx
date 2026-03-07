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

          {/* ── 🛡️ New Placement for Error/Private Card ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                  error === "PRIVATE_ACCOUNT_DETECTED" 
                    ? "border-red-500/30 bg-red-500/10 shadow-[0_10px_30px_rgba(239,68,68,0.1)]" 
                    : "border-red-500/20 bg-red-500/5 px-4 py-3 flex items-center gap-3"
                }`}
              >
                {error === "PRIVATE_ACCOUNT_DETECTED" ? (
                  <div className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                      <Lock className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight italic">
                        PRIVATE CONTENT DETECTED 🔒
                      </h3>
                      <p className="text-red-200/50 text-[13px] font-medium max-w-sm mx-auto leading-relaxed mt-1">
                        This account is private. Please make sure the link is public or follow the user to access their content. 🛡️
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/20 flex items-center gap-2 text-[9px] font-black text-red-400 uppercase tracking-widest">
                      <ShieldAlert size={12} />
                      Access Restricted
                    </div>
                  </div>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 text-sm font-medium">{error}</span>
                  </>
                )}
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
