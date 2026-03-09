import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Globe, Mail, X, MessageCircle, Heart } from "lucide-react";

const SupportWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/in/zied-meddeb-7087a2266/", color: "hover:text-blue-400", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/zied-mb", color: "hover:text-white", label: "Github" },
        { icon: Globe, href: "https://zied-meddeb-portfolio.netlify.app/", color: "hover:text-pink-400", label: "Portfolio" },
        { icon: Mail, href: "mailto:dounzay@gmail.com", color: "hover:text-cyan-400", label: "Email" },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-72 rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d15]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-br from-violet-600/20 to-pink-500/20 border-b border-white/5 relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 p-[1px]">
                                    <div className="w-full h-full rounded-2xl bg-[#0d0d15] flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/Zied.png"
                                            alt="Zied Meddeb"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tight">Zied Meddeb</h4>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Full-Stack Developer</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            <p className="text-[11px] leading-relaxed text-white/60">
                                Hey! Thanks for using <span className="text-violet-400 font-bold italic">ViralSaver</span>. If you like the tool, let's connect! 🚀
                            </p>

                            <div className="grid grid-cols-4 gap-2">
                                {socialLinks.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 ${link.color} hover:bg-white/10 group`}
                                    >
                                        <link.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>

                            <div className="pt-2 border-t border-white/5">
                                <p className="text-[9px] text-center text-white/20 font-medium">Made with <Heart className="w-2 h-2 inline-block text-pink-500 mx-1 fill-pink-500" /> in Tunisia</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? "bg-white text-black rotate-90" : "bg-gradient-to-br from-violet-600 to-pink-500 text-white"
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 fill-current" />}

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 border-2 border-[#06060f] rounded-full animate-bounce" />
                )}
            </motion.button>
        </div>
    );
};

export default SupportWidget;