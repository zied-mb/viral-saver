import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, FileWarning, Gavel, MailCheck, Scale, Linkedin, Github, Globe, User } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const DMCA = () => {
  return (
    <div className="min-h-screen bg-[#030005] text-white/90 selection:bg-red-500/30 font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full will-change-[filter]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full will-change-[filter]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all duration-300 mb-12 group"
          aria-label="Return to home page"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div 
          {...fadeInUp}
          className="space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            Copyright Protection
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            DMCA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">POLICY</span>
          </h1>
          <p className="text-white/40 text-lg uppercase tracking-widest font-bold">Intellectual Property Rights</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-pink-500 to-violet-500 opacity-50" />
          
          <div className="p-8 md:p-12 space-y-12 leading-relaxed">
            
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                <FileWarning className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">Statement</h2>
              </div>
              <p className="text-white/60 text-base md:text-lg">
                <span className="text-white font-bold italic">ViralSaver</span> respects the intellectual property of others. We do not host any videos on our servers; our tool fetches media directly from third-party social platforms.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 text-green-400 mb-4">
                  <User className="w-5 h-5" />
                  <h3 className="font-bold uppercase italic tracking-tighter">Legal Representative</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-black text-white italic tracking-tight">Zied Meddeb</p>
                  <a href="mailto:Dounzay@gmail.com" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200">
                    <MailCheck className="w-4 h-4" /> Dounzay@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-blue-400 mb-4">
                  <Scale className="w-5 h-5" />
                  <h3 className="font-bold uppercase italic tracking-tighter">Quick Links</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href="https://zied-meddeb-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110" aria-label="Portfolio"><Globe className="w-5 h-5" /></a>
                  <a href="https://github.com/zied-mb" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                  <a href="https://www.linkedin.com/in/zied-meddeb-7087a2266/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-violet-400">
                <Gavel className="w-5 h-5" />
                <h2 className="text-xl font-bold uppercase italic tracking-tight">Reporting Infringement</h2>
              </div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                To file a notice, please include the specific URL, your contact details, and a signature. We respond to all valid requests within 72 hours.
              </p>
            </section>

            <div className="pt-8 border-t border-white/10">
              <p className="text-white/20 text-[10px] italic text-center uppercase tracking-[0.3em]">
                Protected by ViralSaver Legal Tech • 2026
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DMCA;
