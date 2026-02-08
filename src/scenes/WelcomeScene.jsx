import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const MY_NAME = import.meta.env.VITE_MY_NAME || 'Me';
const HER_NAME = import.meta.env.VITE_HER_NAME || 'You';

export default function WelcomeScene({ onComplete }) {
  const containerRef = useRef(null);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    // Floating hearts background
    gsap.fromTo('.welcome-heart', {
      y: () => gsap.utils.random(window.innerHeight, window.innerHeight + 200),
      x: () => gsap.utils.random(0, window.innerWidth),
      opacity: 0,
      scale: 0,
    }, {
      y: () => gsap.utils.random(-100, -300),
      opacity: () => gsap.utils.random(0.2, 0.6),
      scale: () => gsap.utils.random(0.5, 1.5),
      duration: () => gsap.utils.random(6, 12),
      stagger: { each: 0.4, repeat: -1 },
      ease: 'none',
    });

    // Pulsing glow on tap text
    gsap.to('.tap-glow', {
      opacity: 0.6,
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const handleTap = () => {
    if (ripple) return;
    setRipple(true);

    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    // Ripple from center
    tl.to('.welcome-ripple', {
      scale: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
    });

    tl.to('.welcome-content', {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      duration: 0.6,
    }, 0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-30 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleTap}
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #2a0020 0%, #0a0008 70%)',
      }}
    >
      {/* Background floating hearts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="welcome-heart absolute pointer-events-none text-xl"
          style={{ opacity: 0 }}
        >
          {['❤️', '💕', '🌹', '💗', '✨'][i % 5]}
        </div>
      ))}

      {/* Ripple effect */}
      <div
        className="welcome-ripple absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff2d5544 0%, transparent 70%)',
          opacity: ripple ? 1 : 0,
        }}
      />

      <div className="welcome-content relative z-10 text-center px-6">
        {/* Decorative top flourish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.4, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mx-auto mb-8 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-400" />
          <span className="text-rose-400 text-sm">✦</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-400" />
        </motion.div>

        {/* "From" line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a' }}
        >
          From
        </motion.p>

        {/* My name */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-4xl md:text-5xl mb-2"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: '#fff',
            textShadow: '0 0 30px #ff2d5544',
          }}
        >
          {MY_NAME}
        </motion.h2>

        {/* Heart divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'backOut' }}
          className="text-3xl my-4"
          style={{ animation: 'heartbeat 2s ease-in-out infinite' }}
        >
          ❤️
        </motion.div>

        {/* "To" line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-sm tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a' }}
        >
          To
        </motion.p>

        {/* Her name — BIG and beautiful */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="text-6xl md:text-8xl"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff6b8a 0%, #ff2d55 30%, #ffd700 60%, #ff6b8a 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient-shift 4s ease infinite',
            filter: 'drop-shadow(0 0 30px #ff2d5544)',
          }}
        >
          {HER_NAME}
        </motion.h1>

        {/* Rose accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 3, ease: 'backOut' }}
          className="text-2xl mt-4"
        >
          🌹
        </motion.div>

        {/* Tap prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="mt-12"
        >
          <div className="tap-glow inline-flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(255, 45, 85, 0.1)',
              border: '1px solid rgba(255, 45, 85, 0.25)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#ff9eb5' }}
            >
              Tap anywhere to begin
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.4, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 3.8 }}
          className="mx-auto mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-400" />
          <span className="text-rose-400 text-sm">✦</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}
