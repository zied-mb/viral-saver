import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube, FaTwitter, FaPinterest } from "react-icons/fa";

interface PlatformIconsProps {
  detected?: string;
}

const platforms = [
  { id: "instagram", label: "Instagram", icon: FaInstagram, gradient: "from-purple-600 via-pink-500 to-orange-400", glow: "rgba(236,72,153,0.4)" },
  { id: "tiktok", label: "TikTok", icon: FaTiktok, gradient: "from-slate-800 to-[#69C9D0]", glow: "rgba(105,201,208,0.4)" },
  { id: "facebook", label: "Facebook", icon: FaFacebook, gradient: "from-blue-700 to-blue-400", glow: "rgba(59,130,246,0.4)" },
  { id: "youtube", label: "YouTube", icon: FaYoutube, gradient: "from-red-700 to-red-400", glow: "rgba(239,68,68,0.4)" },
  { id: "twitter", label: "Twitter", icon: FaTwitter, gradient: "from-sky-600 to-sky-400", glow: "rgba(14,165,233,0.4)" },
  { id: "pinterest", label: "Pinterest", icon: FaPinterest, gradient: "from-rose-600 to-rose-400", glow: "rgba(244,63,94,0.4)" },
];

const PlatformIcons: React.FC<PlatformIconsProps> = ({ detected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 pt-5 border-t border-white/5">
      {platforms.map((p, i) => {
        const isActive = detected === p.id;
        const Icon = p.icon;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.12, y: -2 }}
            className="flex flex-col items-center gap-1.5 cursor-default"
          >
            <motion.div
              animate={isActive ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center transition-all duration-300`}
              style={{
                opacity: isActive ? 1 : 0.35,
                filter: isActive ? "none" : "grayscale(60%)",
                boxShadow: isActive ? `0 4px 16px ${p.glow}` : "none",
              }}
            >
              <Icon className="text-white text-base" />
            </motion.div>
            <span
              className="text-[9px] font-semibold uppercase tracking-wide transition-all duration-300"
              style={{ color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)" }}
            >
              {p.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="active-platform"
                className="w-1 h-1 rounded-full bg-violet-400"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlatformIcons;
