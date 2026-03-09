import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, FileText, Globe } from "lucide-react";
import { Link } from "react-router-dom"; // ⬅️ التغيير هنا

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#030005] text-white/90 selection:bg-violet-500/30 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
            PRIVACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">POLICY</span>
          </h1>
          <p className="text-white/40 text-lg">Last updated: March 2026</p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-400 to-cyan-400 opacity-50" />
          
          <div className="p-8 md:p-12 space-y-12 leading-relaxed">
            
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-violet-400">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">1. Data Collection</h2>
              </div>
              <p className="text-white/60">
                At <span className="text-white font-bold italic">ViralSaver</span>, we do not require any personal registration. We do not store your IP address or social media login credentials. Any data processed during the download is temporary.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <EyeOff className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">2. No Logs Policy</h2>
              </div>
              <p className="text-white/60">
                We believe in total anonymity. We do not maintain logs of the videos you download or the links you paste into our "Smart Downloader".
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                <Globe className="w-6 h-6 text-pink-400 mb-3" />
                <h3 className="font-bold mb-2 uppercase italic tracking-tighter">Cookies</h3>
                <p className="text-sm text-white/40">We only use essential cookies to ensure site stability.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                <FileText className="w-6 h-6 text-violet-400 mb-3" />
                <h3 className="font-bold mb-2 uppercase italic tracking-tighter">Third-Party</h3>
                <p className="text-sm text-white/40">Ads may use basic tracking for analytics purposes.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm italic text-center">
                By using ViralSaver, you agree to our privacy standards. 🛡️
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;