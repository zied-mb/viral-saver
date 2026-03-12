import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, ArrowLeft, User, Sparkles, Linkedin, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    const formData = new FormData(formRef.current);
    const userName = formData.get("user_name");
    const userEmail = formData.get("user_email");
    const message = formData.get("message");

    try {
      await emailjs.send(
        "service_dfltw6t", 
        "template_mmz2gkd", 
        {
          name: userName,
          email: userEmail,
          message: message,
          title: "New Inquiry from ViralSaver", 
        },
        "KGqsUeRoB-iMQqi3C"
      );

      await emailjs.send(
        "service_dfltw6t",
        "template_huqwbco",
        {
          name: userName,
          email: userEmail, 
          title: "ViralSaver Support Request",
        },
        "KGqsUeRoB-iMQqi3C" 
      );

      toast.success("Message sent successfully! Check your inbox for confirmation. 🚀");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030005] text-white/90 selection:bg-pink-500/30 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">Touch</span>
          </h1>
          <p className="text-white/40 text-lg">Have a question? Reach out to <span className="text-white font-bold italic">Zied Meddeb</span> directly. 💬</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-pink-500/30 transition-all">
              <Sparkles className="w-6 h-6 text-pink-400 mb-3" />
              <h3 className="font-bold text-white uppercase italic tracking-tighter">Fast Response</h3>
              <p className="text-sm text-white/40">Zied usually responds within 24 hours via.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-bold text-white uppercase italic tracking-tighter mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" /> Connect
              </h3>
              <div className="flex flex-col gap-3">
                <a href="https://zied-meddeb-portfolio.netlify.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-pink-500/20"><Globe className="w-4 h-4" /></div>
                  Portfolio
                </a>
                <a href="https://github.com/zied-mb" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/20"><Github className="w-4 h-4" /></div>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/zied-meddeb-7087a2266/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-500/20"><Linkedin className="w-4 h-4" /></div>
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 opacity-50" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-pink-400 transition-colors" />
                  <input name="user_name" required type="text" placeholder="Your Name" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-pink-500/50 focus:bg-pink-500/5 transition-all" />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-violet-400 transition-colors" />
                  <input name="user_email" required type="email" placeholder="Email Address" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all" />
                </div>

                <div className="relative group">
                  <textarea name="message" required rows={4} placeholder="How can Zied help you?" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all resize-none"></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="relative w-full py-4 rounded-2xl font-black text-white text-base overflow-hidden group transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2.5 italic uppercase tracking-widest">
                  {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
