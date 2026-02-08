import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function CountdownScene({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (count > 0) {
      gsap.fromTo('.countdown-ring', {
        strokeDashoffset: 0,
      }, {
        strokeDashoffset: 283,
        duration: 1,
        ease: 'linear',
      });
    }
  }, [count]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: 'radial-gradient(ellipse at center, #1a0011 0%, #0a0008 70%)' }}
    >
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="relative flex items-center justify-center"
          >
            <svg width="120" height="120" className="absolute">
              <circle
                cx="60" cy="60" r="45"
                fill="none" stroke="#ff2d5533" strokeWidth="3"
              />
              <circle
                className="countdown-ring"
                cx="60" cy="60" r="45"
                fill="none" stroke="#ff2d55" strokeWidth="3"
                strokeDasharray="283"
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <span
              className="text-6xl font-bold"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#ff2d55',
                textShadow: '0 0 30px #ff2d5588',
              }}
            >
              {count}
            </span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="text-5xl"
            style={{ filter: 'drop-shadow(0 0 20px #ff2d55)' }}
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-sm tracking-widest"
        style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a' }}
      >
        something special is coming...
      </motion.p>
    </motion.div>
  );
}
