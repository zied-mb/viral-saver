import React from "react";
import { motion } from "framer-motion";
import { Scale, ArrowLeft, AlertCircle, UserCheck, Copyright, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#030005] text-white/90 selection:bg-cyan-500/30 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            User Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Service</span>
          </h1>
          <p className="text-white/40 text-lg font-medium">Agreement for using ViralSaver tools.</p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-400 opacity-50" />
          
          <div className="p-8 md:p-12 space-y-12 leading-relaxed">
            
            {/* Section 1: Acceptance */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <UserCheck className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <p className="text-white/60">
                By accessing <span className="text-white font-bold italic text-cyan-400">ViralSaver</span>, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using this site. 🛡️
              </p>
            </section>

            {/* Section 2: Use License */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-violet-400">
                <Copyright className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">2. Use License</h2>
              </div>
              <p className="text-white/60">
                Our service is provided for <span className="text-white font-bold italic">personal, non-commercial use</span> only. You may not use ViralSaver to download copyrighted content without the owner's permission. You are solely responsible for the content you download.
              </p>
            </section>

            {/* Section 3: Disclaimer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                <AlertCircle className="w-6 h-6 text-red-500 mb-3" />
                <h3 className="font-bold mb-2 uppercase italic tracking-tighter">Disclaimer</h3>
                <p className="text-sm text-white/40 italic">The tools are provided "as is". We make no warranties regarding accuracy or reliability.</p>
              </div>
              <div className="p-6 rounded-3xl bg-orange-500/5 border border-orange-500/10">
                <ShieldAlert className="w-6 h-6 text-orange-500 mb-3" />
                <h3 className="font-bold mb-2 uppercase italic tracking-tighter">Limitations</h3>
                <p className="text-sm text-white/40 italic">ViralSaver shall not be held liable for any damages arising out of the use of our services.</p>
              </div>
            </div>

            {/* Section 4: External Links */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold uppercase italic tracking-tight text-pink-400 italic">3. Content Ownership</h2>
              <p className="text-white/60">
                ViralSaver does not host any content. We only provide a technical solution to access publicly available media. All rights belong to their respective owners.
              </p>
            </section>

            {/* Final Note */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-white/40 text-[11px] italic text-center uppercase tracking-[0.2em]">
                Last Update: March 2026 • © ViralSaver Legal Team
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;