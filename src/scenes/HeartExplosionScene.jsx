import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ParticleHeart from '../components/ParticleHeart';
import FallingPetals from '../components/FallingPetals';
import Sparkles from '../components/Sparkles';

const MY_NAME = import.meta.env.VITE_MY_NAME || 'Me';
const HER_NAME = import.meta.env.VITE_HER_NAME || 'You';

const reasons = [
  `${HER_NAME}, I love your beautiful smile`,
  "I love the way you laugh",
  "I love how you make me feel safe",
  "I love your kind and golden heart",
  "I love every single moment with you",
  "I love the way you love me back",
  "I love how you make ordinary days magical",
  `I love that you're my person, ${HER_NAME}`,
];

export default function HeartExplosionScene() {
  const [showReasons, setShowReasons] = useState(false);
  const [currentReason, setCurrentReason] = useState(-1);
  const [showFinale, setShowFinale] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo('.big-heart', {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    });

    tl.to('.big-heart', {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 5,
      ease: 'power2.inOut',
    });

    tl.to('.big-heart', {
      scale: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in',
      onComplete: () => {
        setShowParticles(true);
        setShowReasons(true);
      },
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!showReasons) return;

    let i = 0;
    const interval = setInterval(() => {
      setCurrentReason(i);
      i++;
      if (i >= reasons.length) {
        clearInterval(interval);
        setTimeout(() => setShowFinale(true), 3500);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [showReasons]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-30 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: 'radial-gradient(ellipse at center, #1a0015 0%, #0a0008 70%)' }}
    >
      <FallingPetals count={40} />
      <Sparkles count={50} />
      <ParticleHeart active={showParticles} />

      {/* Big heart that explodes */}
      {!showReasons && (
        <div
          className="big-heart text-9xl opacity-0 absolute"
          style={{
            filter: 'drop-shadow(0 0 30px #ff2d55) drop-shadow(0 0 60px #ff2d5588)',
          }}
        >
          ❤️
        </div>
      )}

      {/* Reasons carousel */}
      {showReasons && !showFinale && (
        <div className="relative z-20 flex items-center justify-center min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center px-8"
            >
              <p
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: '#fff',
                  textShadow: '0 0 30px #ff2d5566, 0 0 60px #ff2d5533',
                }}
              >
                {reasons[currentReason]}
              </p>
              <motion.div
                className="mt-4 text-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💗
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Grand finale */}
      <AnimatePresence>
        {showFinale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-20 text-center px-6"
          >
            {/* Couple names with ampersand */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span
                className="text-4xl md:text-6xl"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #ffd700, #ffb6c1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 15px #ffd70044)',
                }}
              >
                {MY_NAME}
              </span>
              <motion.span
                className="text-3xl md:text-5xl"
                style={{ color: '#ff2d55', animation: 'heartbeat 2s ease-in-out infinite' }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span
                className="text-4xl md:text-6xl"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #ff6b8a, #ff2d55, #ffd700)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease infinite',
                  filter: 'drop-shadow(0 0 15px #ff2d5544)',
                }}
              >
                {HER_NAME}
              </span>
            </motion.div>

            {/* Main message */}
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
              className="text-5xl md:text-7xl mb-4"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: '#fff',
                textShadow: '0 0 40px #ff2d55, 0 0 80px #ff2d5566',
              }}
            >
              I Love You
            </motion.h1>

            {/* Her name highlighted */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.8, ease: 'backOut' }}
              className="text-6xl md:text-8xl mb-4"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                background: 'linear-gradient(90deg, #ff6b8a, #ffd700, #ff2d55, #ffb6c1, #ff6b8a)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 2.5s linear infinite',
                filter: 'drop-shadow(0 0 40px #ff2d5566)',
              }}
            >
              {HER_NAME}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-xl md:text-2xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#ffb6c1',
                fontStyle: 'italic',
              }}
            >
              Today, tomorrow, and forever
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.3 }}
              className="mt-6 text-5xl"
              style={{ animation: 'heartbeat 2s ease-in-out infinite' }}
            >
              🌹❤️🌹
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 4 }}
              className="mt-8 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a' }}
            >
              Happy Valentine's Day, {HER_NAME}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 4.5 }}
              className="mt-2 text-xs tracking-wider"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a88' }}
            >
              with love from {MY_NAME}
            </motion.p>

            {/* Floating emoji magic */}
            {[...Array(25)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-lg pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30 - Math.random() * 50, 0],
                  x: [0, (Math.random() - 0.5) * 40, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1 + Math.random(), 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {['❤️', '💕', '💗', '🌹', '✨', '💖'][Math.floor(Math.random() * 6)]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
