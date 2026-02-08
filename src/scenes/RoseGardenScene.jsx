import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import RoseSVG from "../components/RoseSVG";
import Sparkles from "../components/Sparkles";

export default function RoseGardenScene({ onComplete }) {
  const [bloomIndex, setBloomIndex] = useState(-1);

  const rosePositions = [
    { x: "50%", y: "50%", size: 120, delay: 0 },
    { x: "25%", y: "40%", size: 90, delay: 0.6 },
    { x: "75%", y: "40%", size: 90, delay: 1.2 },
    { x: "15%", y: "60%", size: 70, delay: 1.8 },
    { x: "85%", y: "60%", size: 70, delay: 2.4 },
    { x: "35%", y: "70%", size: 80, delay: 3.0 },
    { x: "65%", y: "70%", size: 80, delay: 3.6 },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    rosePositions.forEach((_, i) => {
      tl.call(() => setBloomIndex(i), null, i * 0.7);
    });

    // Show message after all roses bloom
    tl.fromTo(
      ".garden-message",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=1.5"
    );

    // Hold then transition
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
      className="fixed inset-0 flex items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background:
          "radial-gradient(ellipse at center, #0d0f0a 0%, #0a0008 70%)",
      }}
    >
      <Sparkles count={35} />

      {/* Roses */}
      {rosePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            i <= bloomIndex
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1.0, ease: "backOut" }}
        >
          <div
            style={{
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <RoseSVG animate={i <= bloomIndex} size={pos.size} />
          </div>
        </motion.div>
      ))}

      {/* Garden message */}
      <div className="garden-message absolute bottom-16 left-0 right-0 text-center opacity-0">
        <p
          className="text-2xl md:text-3xl px-6"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#ffb6c1",
            textShadow: "0 0 30px #ff2d5544",
          }}
        >
          A garden of roses, all for you
        </p>
        <p
          className="text-base mt-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#ff6b8a88",
            fontStyle: "italic",
          }}
        >
          because you deserve the most beautiful things
        </p>
      </div>
    </motion.div>
  );
}
