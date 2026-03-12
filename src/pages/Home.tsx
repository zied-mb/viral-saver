import React, { useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Download, Zap, Shield, Globe, ChevronDown,
  ArrowRight, CheckCircle2, Star, TrendingUp, Github, Linkedin, Heart,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

// --- Lazy Loading for heavy components ---
const DownloaderBox = lazy(() => import("@/components/DownloaderBox"));
const AdsBanner = lazy(() => import("@/components/AdsBanner"));
const SupportWidget = lazy(() => import("@/components/SupportWidget"));

const stats = [
  { label: "Downloads Served", value: "50M+", icon: Download },
  { label: "Platforms Supported", value: "10+", icon: Globe },
  { label: "Active Users", value: "2M+", icon: TrendingUp },
  { label: "Success Rate", value: "99.9%", icon: Star },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Fetch and download media in seconds with our optimized global API infrastructure.",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    icon: Shield,
    title: "No Watermarks",
    desc: "Get clean, original-quality files without any branding overlays or compression.",
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    icon: Globe,
    title: "10+ Platforms",
    desc: "Supports Instagram, TikTok, Facebook, YouTube, Twitter, Pinterest and more.",
    gradient: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    desc: "Choose HD video, SD video, or audio-only MP3 downloads instantly — always free.",
    gradient: "from-cyan-500 to-blue-500",
    glow: "rgba(6,182,212,0.2)",
  },
];

const steps = [
  { num: "01", title: "Copy the Link", desc: "Find your video on Instagram, TikTok, YouTube or any supported platform and copy its URL.", color: "from-violet-500 to-purple-600" },
  { num: "02", title: "Paste & Detect", desc: "Paste the URL into ViralSaver. We instantly detect the platform and prepare your file.", color: "from-pink-500 to-rose-600" },
  { num: "03", title: "Download Instantly", desc: "Choose your format — HD, SD or MP3 — and download to your device in one click.", color: "from-cyan-500 to-blue-600" },
];

const supported = [
  { icon: FaInstagram, name: "Instagram", types: "Reels · Photos · Stories", color: "#E1306C" },
  { icon: FaTiktok, name: "TikTok", types: "Videos · Sounds", color: "#69C9D0" },
  { icon: FaFacebook, name: "Facebook", types: "Videos · Reels", color: "#1877F2" },
  { icon: FaYoutube, name: "YouTube", types: "Videos · Shorts", color: "#FF0000" },
  { icon: FaTwitter, name: "Twitter / X", types: "Videos · GIFs", color: "#1D9BF0" },
];

const reviews = [
  { name: "Sarah M.", text: "Best downloader I've used. Fast, clean, no watermarks!", stars: 5 },
  { name: "Jake L.", text: "Downloaded 50+ TikToks without a single issue. Incredible!", stars: 5 },
  { name: "Priya K.", text: "Works perfectly on mobile. Saved my whole Instagram feed.", stars: 5 },
];

const faqs = [
  { q: "Is ViralSaver completely free to use?", a: "Yes, ViralSaver is 100% free. Paste any supported link and download instantly — no subscription required." },
  { q: "Which platforms are supported?", a: "We support Instagram, TikTok, Facebook, YouTube, Twitter/X, Pinterest, and many more platforms globally." },
  { q: "Are there watermarks on downloaded videos?", a: "Absolutely not. You get the original media exactly as uploaded by the creator — no watermarks, no quality loss." },
  { q: "Do I need to create an account?", a: "No account or sign-up required. Just paste the link and click download — it's that simple." },
  { q: "Is it legal to download videos?", a: "ViralSaver is for personal use only. Always respect creators' rights and platform terms of service when downloading." },
];

const Home: React.FC = () => {
  const [darkMode] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const bg = darkMode ? "bg-[#06060f]" : "bg-slate-50";
  const text = darkMode ? "text-white" : "text-slate-900";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bg} ${text} overflow-x-hidden`}>

      {/* ── Animated background blobs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[140px]" />
        <motion.div animate={{ x: [0, -60, 50, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute -top-40 -right-60 w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      </div>

      {/* ── Navbar ── */}
      <motion.nav initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 py-3 backdrop-blur-2xl border-b ${darkMode ? "border-white/5 bg-black/40" : "border-slate-200/60 bg-white/80"}`}>
        <a href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ViralSaver logo" className="w-7 h-7 object-contain" />
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"> ViralSaver </span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Downloader", "Features", "How It Works", "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-white/40 hover:text-white transition-colors"> {item} </a>
          ))}
        </div>
        <motion.a href="#downloader" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg">
          Start Downloading <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>
      </motion.nav>

      {/* ── Top Ads ── */}
      <Suspense fallback={<div className="h-24 w-full animate-pulse bg-white/5" />}>
        <div className="flex justify-center py-1 px-4"><AdsBanner type="top" /></div>
      </Suspense>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-4 pb-12 sm:pt-10 sm:pb-20">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060f]/60 via-transparent to-[#06060f]" />
        </motion.div>
        <div className="max-w-7xl w-full mx-auto flex flex-col xl:flex-row gap-8 xl:gap-16 items-center">
          <div className="flex-1 text-center xl:text-left">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[10px] sm:text-xs font-bold uppercase mb-4 sm:mb-8">Free · No Watermark · No Account Needed</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6">Save Any Video <br /> <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">In Seconds.</span></motion.h1>
            <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto xl:mx-0 mb-6 sm:mb-10">Download HD content from Instagram, TikTok, and more instantly. No watermarks, no limits. 🚀</p>
          </div>
          <div className="hidden xl:block">
            <Suspense fallback={<div className="h-64 w-32 bg-white/5 animate-pulse" />}><AdsBanner type="sidebar-sm" /></Suspense>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-4 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center py-2 sm:py-4">
              <p className="text-2xl sm:text-3xl font-black text-white">{s.value}</p>
              <p className="text-[9px] sm:text-xs font-medium text-white/35 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Downloader Box ── */}
      <section id="downloader" className="py-10 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-40 w-full bg-white/5 rounded-2xl animate-pulse" />}><DownloaderBox /></Suspense>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className={`py-12 sm:py-20 px-4 ${darkMode ? "bg-white/[0.02]" : "bg-slate-50"} border-y ${darkMode ? "border-white/5" : "border-slate-100"}`}>
        <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-16">
          <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 ${darkMode ? "text-pink-400" : "text-pink-500"}`}>— Simple Process —</p>
          <h2 className="text-2xl sm:text-4xl font-black mb-2 sm:mb-3">How <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">ViralSaver</span> Works</h2>
          <div className="grid md:grid-cols-3 gap-6 relative mt-12">
            {steps.map((step, i) => (
              <motion.div key={step.num} whileHover={{ y: -6 }} className={`relative rounded-2xl p-6 sm:p-7 border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"} backdrop-blur-sm transition-all group`}>
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.color} rounded-t-2xl`} />
                <div className={`inline-flex w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${step.color} items-center justify-center mb-4 sm:mb-5 shadow-lg`}><span className="text-white text-[10px] sm:text-xs font-black">{step.num}</span></div>
                <h3 className="font-bold text-base sm:text-lg mb-2">{step.title}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-white/40" : "text-slate-500"}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 ${darkMode ? "text-cyan-400" : "text-cyan-500"}`}>— Why Us —</p>
            <h2 className="text-2xl sm:text-4xl font-black mb-2 sm:mb-3">Why Choose <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">ViralSaver?</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} whileHover={{ y: -5 }} className={`group relative rounded-2xl p-6 sm:p-7 border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"} backdrop-blur-sm transition-all duration-300`}>
                  <div className={`inline-flex w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${f.gradient} items-center justify-center shadow-md mb-4 sm:mb-5`}><Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" /></div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">{f.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-white/40" : "text-slate-500"}`}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Supported Platforms ── */}
      <section className={`py-12 sm:py-16 px-4 ${darkMode ? "bg-white/[0.02] border-y border-white/5" : "bg-slate-50 border-y border-slate-100"}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-black mb-8 text-center">Supported Platforms</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {supported.map((p, i) => (
              <motion.div key={p.name} whileHover={{ y: -4 }} className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-2xl border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-md" style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}80)` }}><p.icon /></div>
                <div className="text-center">
                  <p className="font-bold text-xs sm:text-sm">{p.name}</p>
                  <p className={`text-[8px] sm:text-[10px] mt-0.5 ${darkMode ? "text-white/30" : "text-slate-400"}`}>{p.types}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center py-8 bg-white/[0.01] border-y border-white/5">
        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-white/5" />}><AdsBanner type="middle" /></Suspense>
      </div>

      {/* ── Reviews ── */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-black text-center mb-8">Loved by Millions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={r.name} className={`rounded-2xl p-5 sm:p-6 border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <div className="flex mb-3">{Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />)}</div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${darkMode ? "text-white/60" : "text-slate-600"}`}>"{r.text}"</p>
                <p className={`text-[10px] sm:text-xs font-bold ${darkMode ? "text-white/40" : "text-slate-400"}`}>— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={`py-12 sm:py-20 px-4 ${darkMode ? "bg-white/[0.02]" : "bg-slate-50"} border-y border-white/5`}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-2xl border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className={`font-semibold text-xs sm:text-sm ${darkMode ? "text-white/90" : "text-slate-800"}`}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className={`px-5 pb-4 text-xs sm:text-sm ${darkMode ? "text-white/45" : "text-slate-500"}`}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center py-8 bg-[#030005]"><Suspense fallback={null}><AdsBanner type="footer" /></Suspense></div>

      {/* ── Footer ── */}
      <footer className={`border-t ${darkMode ? "border-white/5 bg-[#030005]" : "border-slate-100 bg-white"} py-8 px-6`}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-6 h-6" />
            <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent italic">ViralSaver</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/zied-mb" className="text-white/20 hover:text-white"><Github className="w-4 h-4" /></a>
            <a href="https://www.linkedin.com/in/zied-meddeb-7087a2266/" className="text-white/20 hover:text-blue-400"><Linkedin className="w-4 h-4" /></a>
          </div>
          <div className="flex gap-4 text-xs font-medium text-white/30">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-of-service">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-[10px] text-white/20">© {new Date().getFullYear()} ViralSaver. Developed by <span className="text-violet-400/80 italic font-bold">Zied Meddeb</span> 👨‍💻</p>
        </div>
      </footer>
      <Suspense fallback={null}><SupportWidget /></Suspense>
    </div>
  );
};

export default Home;
