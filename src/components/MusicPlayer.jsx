import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer({ audioRef, playing }) {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  };

  return (
    <AnimatePresence>
      {playing && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={toggleMute}
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none outline-none"
          style={{
            background: "rgba(255, 45, 85, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 45, 85, 0.3)",
            boxShadow: "0 0 20px rgba(255, 45, 85, 0.2)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff6b8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff6b8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}

          {/* Animated music waves */}
          {!muted && (
            <div className="absolute -top-1 -right-1 flex gap-[2px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{ background: "#ff6b8a" }}
                  animate={{ height: [4, 10, 4] }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
