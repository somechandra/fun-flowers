import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import RoseSVG from "../components/RoseSVG";
import FallingPetals from "../components/FallingPetals";

const messages = [
  "Every moment with you feels like magic",
  "You make my world bloom with color",
  "This rose is just a glimpse of my love",
];

export default function RoseBloomScene({ onComplete }) {
  const [showRose, setShowRose] = useState(false);
  const [msgIndex, setMsgIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(
      {},
      {
        duration: 0.5,
        onComplete: () => setShowRose(true),
      }
    );

    tl.to(
      {},
      {
        duration: 4.5,
        onComplete: () => setMsgIndex(0),
      }
    );

    tl.to(
      {},
      {
        duration: 4.5,
        onComplete: () => setMsgIndex(1),
      }
    );

    tl.to(
      {},
      {
        duration: 4.5,
        onComplete: () => setMsgIndex(2),
      }
    );

    tl.to(
      {},
      {
        duration: 5,
        onComplete: () => onComplete(),
      }
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0015 0%, #0a0008 70%)",
      }}
    >
      <FallingPetals count={25} />

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <RoseSVG animate={showRose} size={220} />
        </motion.div>

        <div className="h-20 mt-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {msgIndex >= 0 && (
              <motion.p
                key={msgIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl text-center px-8 max-w-lg"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#ffb6c1",
                  fontStyle: "italic",
                  textShadow: "0 0 30px #ff2d5544",
                }}
              >
                {messages[msgIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ff2d5515 0%, transparent 70%)",
          animation: "glow-pulse 3s ease-in-out infinite",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
}
