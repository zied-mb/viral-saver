import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Download, Zap, Shield, Globe, ChevronDown,
  ArrowRight, CheckCircle2, Star, TrendingUp
} from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import DownloaderBox from "@/components/DownloaderBox";
import AdsBanner from "@/components/AdsBanner";
import { ADS } from "@/config/ads";
import heroBg from "@/assets/hero-bg.jpg";

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
  {
    num: "01",
    title: "Copy the Link",
    desc: "Find your video on Instagram, TikTok, YouTube or any supported platform and copy its URL.",
    color: "from-violet-500 to-purple-600",
  },
  {
    num: "02",
    title: "Paste & Detect",
    desc: "Paste the URL into ViralSaver. We instantly detect the platform and prepare your file.",
    color: "from-pink-500 to-rose-600",
  },
  {
    num: "03",
    title: "Download Instantly",
    desc: "Choose your format — HD, SD or MP3 — and download to your device in one click.",
    color: "from-cyan-500 to-blue-600",
  },
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
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -60, 50, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -top-40 -right-60 w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 backdrop-blur-2xl border-b ${darkMode ? "border-white/5 bg-black/40" : "border-slate-200/60 bg-white/80"}`}
      >
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

        <motion.a
          href="#downloader"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg"
        >
          Start Downloading <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>
      </motion.nav>

      {/* ── Top Ads ── */}
      <div className="flex justify-center py-3 px-4 overflow-x-auto">
        <AdsBanner code={ADS.topBanner} type="top" />
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-10 pb-20">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060f]/60 via-transparent to-[#06060f]" />
        </motion.div>

        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col xl:flex-row gap-16 items-center">
            <div className="flex-1 text-center xl:text-left">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-xs font-bold uppercase mb-8">
                Free · No Watermark · No Account Needed
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                Save Any Video <br /> <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">In Seconds.</span>
              </motion.h1>
              <p className="text-lg text-white/45 max-w-xl mx-auto xl:mx-0 mb-10">
                Download HD content from Instagram, TikTok, and more instantly. No watermarks, no limits. 🚀
              </p>
            </div>
            <div className="hidden xl:block">
              <AdsBanner code={ADS.sidebarAd1} type="sidebar-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-6 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center py-4">
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-xs font-medium text-white/35 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Downloader Box ── */}
      <section id="downloader" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <DownloaderBox />
        </div>
      </section>
      {/* ── How It Works ── */}
      <section id="how-it-works" className={`py-20 px-4 ${darkMode ? "bg-white/[0.02]" : "bg-slate-50"} border-y ${darkMode ? "border-white/5" : "border-slate-100"}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${darkMode ? "text-pink-400" : "text-pink-500"}`}>— Simple Process —</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              How{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">ViralSaver</span>
              {" "}Works
            </h2>
            <p className={`text-base max-w-md mx-auto ${darkMode ? "text-white/40" : "text-slate-400"}`}>
              Three simple steps to download any video from the internet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-violet-500/40 via-pink-500/40 to-cyan-500/40" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-7 border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"} backdrop-blur-sm transition-all duration-300 group`}
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.color} rounded-t-2xl`} />
                <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} items-center justify-center mb-5 shadow-lg`}>
                  <span className="text-white text-xs font-black">{step.num}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-white/40" : "text-slate-500"}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${darkMode ? "text-cyan-400" : "text-cyan-500"}`}>— Why Us —</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">ViralSaver?</span>
            </h2>
            <p className={`text-base max-w-md mx-auto ${darkMode ? "text-white/40" : "text-slate-400"}`}>
              The fastest, cleanest, most reliable social media downloader on the web.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className={`group relative rounded-2xl p-7 border ${darkMode ? "border-white/8 bg-white/3 hover:border-white/14" : "border-slate-200 bg-white hover:border-slate-300"} backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-default`}
                  style={{ boxShadow: `0 0 0 0 ${f.glow}` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px 0 ${f.glow}`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${f.glow}`; }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} items-center justify-center shadow-md mb-5`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-white/40" : "text-slate-500"}`}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Supported Platforms ── */}
      <section className={`py-16 px-4 ${darkMode ? "bg-white/[0.02] border-y border-white/5" : "bg-slate-50 border-y border-slate-100"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-black mb-2">Supported Platforms</h2>
            <p className={`text-sm ${darkMode ? "text-white/35" : "text-slate-400"}`}>Download from all the biggest social media networks</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {supported.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${darkMode ? "border-white/8 bg-white/3 hover:bg-white/6" : "border-slate-200 bg-white hover:bg-slate-50"} transition-all duration-200 cursor-default`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-md"
                    style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}80)` }}
                  >
                    <Icon />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">{p.name}</p>
                    <p className={`text-[10px] mt-0.5 ${darkMode ? "text-white/30" : "text-slate-400"}`}>{p.types}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Middle Ad ── */}
      <div className="flex justify-center py-8 px-4 overflow-x-auto">
        <AdsBanner code={ADS.middleBanner} type="middle" className="rounded-xl overflow-hidden" />
      </div>

      {/* ── Reviews ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-black mb-2">Loved by Millions</h2>
            <p className={`text-sm ${darkMode ? "text-white/35" : "text-slate-400"}`}>See what our users are saying</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className={`rounded-2xl p-6 border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"}`}
              >
                <div className="flex mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? "text-white/60" : "text-slate-600"}`}>"{r.text}"</p>
                <p className={`text-xs font-bold ${darkMode ? "text-white/40" : "text-slate-400"}`}>— {r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className={`py-20 px-4 ${darkMode ? "bg-white/[0.02] border-y border-white/5" : "bg-slate-50 border-y border-slate-100"}`}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${darkMode ? "text-pink-400" : "text-pink-500"}`}>— FAQ —</p>
            <h2 className="text-3xl font-black mb-2">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border ${darkMode ? "border-white/8 bg-white/3" : "border-slate-200 bg-white"} overflow-hidden`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 ${darkMode ? "hover:bg-white/4" : "hover:bg-slate-50"}`}
                >
                  <span className={`font-semibold text-sm pr-4 ${darkMode ? "text-white/90" : "text-slate-800"}`}>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-violet-400" : darkMode ? "text-white/30" : "text-slate-400"}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 pb-5 text-sm leading-relaxed ${darkMode ? "text-white/45" : "text-slate-500"}`}>{faq.a}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden text-center p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-pink-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-500/30 blur-[80px] rounded-full" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Ready to Start Saving?
              </h2>
              <p className={`text-base mb-8 ${darkMode ? "text-white/50" : "text-white/70"}`}>
                Join 2 million+ users downloading videos for free, every day.
              </p>
              <motion.a
                href="#downloader"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white text-base bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:from-violet-500 hover:via-pink-400 hover:to-cyan-400 shadow-2xl shadow-violet-500/30 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download Now — It's Free
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer Banner Ad ── */}
      <div className="flex justify-center py-6 px-4 overflow-x-auto">
        <AdsBanner code={ADS.footerBanner} type="footer" className="rounded-xl overflow-hidden" />
      </div>

      {/* ── Footer ── */}
      <footer className={`border-t ${darkMode ? "border-white/5" : "border-slate-100"} py-12 px-6`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ViralSaver logo"
                className="w-7 h-7 object-contain"
              />

              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                ViralSaver
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Contact", "DMCA"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`transition-colors duration-200 ${darkMode ? "text-white/30 hover:text-white/60" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className={`border-t ${darkMode ? "border-white/5" : "border-slate-100"} pt-6 flex flex-col sm:flex-row items-center justify-between gap-3`}>
            <p className={`text-xs ${darkMode ? "text-white/20" : "text-slate-300"}`}>
              © {new Date().getFullYear()} ViralSaver. All rights reserved.
            </p>
            <p className={`text-xs ${darkMode ? "text-white/15" : "text-slate-300"}`}>
              For personal use only. Respect creators' rights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
