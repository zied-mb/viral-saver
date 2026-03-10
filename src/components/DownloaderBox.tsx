import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Clipboard, X, Loader2, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";
import { fetchDownload, detectPlatform, isValidUrl } from "@/services/api";
import { DownloadResult } from "@/types";
import PlatformIcons from "@/components/PlatformIcons";
import ResultCard from "@/components/ResultCard";
import AdsBanner from "./AdsBanner"; 

// 🛡️ تعريف الـ Interface لضمان توافق TypeScript مع سكربت HilltopAds
declare global {
  interface Window {
    fireHilltopPop?: () => void;
  }
}

const DownloaderBox: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 📈 تتبع عدد الضغطات (Clicks) محلياً
  const [clickCount, setClickCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem("v_saver_clicks")) || 0;
    }
    return 0;
  });

  const scrollAnchorId = "download-result-anchor";
  const platform = detectPlatform(url);

  // 🔄 تتبع هل المستخدم زار MDB قبل أو لا لتقديم الـ Branding على الإعلانات
  const [hasSeenMDB, setHasSeenMDB] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("v_saver_seen_mdb") === "true";
    }
    return false;
  });

  // ⏱️ معالجة التحميل التلقائي بعد لصق الرابط بـ 3 ثواني
  useEffect(() => {
    if (url && isValidUrl(url.trim()) && !loading && !result) {
      const timer = setTimeout(() => {
        handleDownload();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [url]);

  // 📜 تمرير الصفحة للنتائج تلقائياً عند ظهورها
  useEffect(() => {
    if (result && !loading) {
      setTimeout(() => {
        const element = document.getElementById(scrollAnchorId);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); 
    }
  }, [result, loading]);

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
    if (!url.trim() || !isValidUrl(url.trim())) {
      if (url.trim()) setError("Please enter a valid URL.");
      return;
    }

    // --- 🚀 Downloader_Pop_Logic Start ---
    const nextCount = clickCount + 1;
    
    if (nextCount >= 3) {
      // إعادة العداد للصفر وتخزينه
      setClickCount(0);
      localStorage.setItem("v_saver_clicks", "0");

      if (!hasSeenMDB) {
        // الأولوية لزيارة MDB Collection في أول 3 ضغطات
        window.open("https://mdbcollection.com", "_blank", "noopener,noreferrer");
        setHasSeenMDB(true);
        localStorage.setItem("v_saver_seen_mdb", "true");
      } else {
        // المرات التالية يتم تشغيل الـ Popunder الخاص بـ HilltopAds
        if (window.fireHilltopPop) {
          window.fireHilltopPop();
        }
      }
    } else {
      setClickCount(nextCount);
      localStorage.setItem("v_saver_clicks", nextCount.toString());
    }
    // --- 🚀 Downloader_Pop_Logic End ---

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await fetchDownload(url.trim());
      if (data && ((data as any).error === true || (data as any).status === 404)) {
        setError("PRIVATE_ACCOUNT_DETECTED");
      } else if (data) {
        setResult(data);
        toast.success("Ready to save! 🚀");
      }
    } catch {
      setError("Unable to fetch media. ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-4 sm:px-0">
      {/* 🛠️ تحميل سكربت الـ Popunder في الخلفية */}
      <AdsBanner type="downloaderPop" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/10 bg-white/5 shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-400 to-cyan-400" />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white/50 uppercase italic tracking-wider">Smart Downloader</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(""); if (!e.target.value) setResult(null); }}
                onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                placeholder="Paste Instagram / TikTok / Facebook link..."
                className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/25 text-sm focus:outline-none bg-white/5 border border-white/10 focus:border-white/20"
              />
            </div>

            <AnimatePresence mode="popLayout">
              {url && (
                <motion.button
                  key="clear-btn"
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleClear}
                  className="h-[54px] w-[54px] flex items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20"
                >
                  <X className="w-5 h-5 stroke-[3px]" />
                </motion.button>
              )}
            </AnimatePresence>

            <button onClick={handlePaste} className="h-[54px] px-5 rounded-2xl text-sm font-bold text-white/70 border border-white/10 bg-white/5 flex items-center gap-2">
              <Clipboard className="w-4.5 h-4.5" /> <span className="hidden sm:inline italic">Paste</span>
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="relative mt-5 w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:opacity-90 transition-all overflow-hidden"
          >
            <span className="relative flex items-center justify-center gap-2.5 uppercase italic">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Download className="w-5 h-5" /> Download Now</>}
            </span>
          </button>

          {error === "PRIVATE_ACCOUNT_DETECTED" && (
            <div className="mt-6 p-6 rounded-[2rem] border border-red-500/10 bg-[#0d070b] flex items-center gap-6">
              <Lock className="w-7 h-7 text-red-600/90" />
              <div>
                <h3 className="text-xl font-black text-white italic">PRIVATE CONTENT</h3>
                <p className="text-white/40 text-sm">Account is private. Please use a public link. 🛡️</p>
              </div>
            </div>
          )}

          <PlatformIcons detected={platform !== "unknown" ? platform : undefined} />
        </div>
      </motion.div>

      <div className="w-full flex justify-center py-2">
         <AdsBanner type="result-inline" />
      </div>

      {result && !loading && (
        <div id={scrollAnchorId} className="space-y-6 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultCard result={result} platform={platform} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DownloaderBox;
