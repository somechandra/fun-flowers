import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Sparkles from '../components/Sparkles';

const MY_NAME = import.meta.env.VITE_MY_NAME || 'Me';
const HER_NAME = import.meta.env.VITE_HER_NAME || 'You';

const letterLines = [
  `My Dearest ${HER_NAME},`,
  "",
  "From the first moment I saw you,",
  "my heart knew you were the one.",
  "",
  "You are the first thought in my morning,",
  "and the last whisper in my night.",
  "",
  "Your smile lights up my darkest days,",
  "your laugh is my favorite melody.",
  "",
  "I love the way you see the world,",
  "I love the way you see me.",
  "",
  "Every day with you is a gift",
  "I will never stop unwrapping.",
  "",
  "You are my today and all of my tomorrows.",
  "",
  `Forever & Always Yours,`,
  `— ${MY_NAME} ♥`,
];

export default function LoveLetterScene({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const envelopeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      '.envelope-body',
      { y: 100, scale: 0.5, opacity: 0, rotation: -5 },
      { y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.5)' }
    );

    tl.to('.envelope-hint', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let line = 0;
    const interval = setInterval(() => {
      line++;
      if (line > letterLines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 5000);
        return;
      }
      setVisibleLines(line);
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  const handleOpen = () => {
    if (isOpen) return;

    const tl = gsap.timeline();
    tl.to('.envelope-flap', {
      rotationX: 180,
      duration: 0.8,
      ease: 'power2.inOut',
      transformOrigin: 'top center',
    });
    tl.to('.envelope-hint', { opacity: 0, duration: 0.3 }, 0);
    tl.to('.letter-paper', {
      y: -280,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.3');
    tl.call(() => setIsOpen(true));
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ background: 'radial-gradient(ellipse at center, #1a0018 0%, #0a0008 70%)' }}
    >
      <Sparkles count={35} />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            ref={envelopeRef}
            className="envelope-body relative cursor-pointer opacity-0"
            onClick={handleOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Letter paper inside */}
            <div
              className="letter-paper absolute left-4 right-4 top-4 h-64 rounded-sm"
              style={{
                background: 'linear-gradient(180deg, #fff8f0 0%, #fff0e6 100%)',
                zIndex: 1,
              }}
            >
              <div className="p-4 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#8b0032', fontSize: '14px' }}>
                A letter for {HER_NAME}...
              </div>
            </div>

            {/* Envelope back */}
            <div
              className="relative w-72 h-48 rounded-md overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #c9184a 0%, #8b0032 100%)',
                boxShadow: '0 10px 40px #ff2d5544, 0 0 80px #ff2d5522',
                zIndex: 2,
              }}
            >
              {/* Name on envelope */}
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ fontFamily: "'Dancing Script', cursive", color: '#ffb6c1cc', fontSize: '22px' }}
              >
                {HER_NAME}
              </div>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 0%, #00000022 100%)',
              }} />
            </div>

            {/* Envelope flap */}
            <div
              className="envelope-flap absolute -top-0 left-0 right-0 h-24"
              style={{
                background: 'linear-gradient(180deg, #e8395b 0%, #c9184a 100%)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                zIndex: 3,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Wax seal with heart */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 40% 35%, #e8395b, #8b0032)',
                boxShadow: '0 2px 8px #00000044, inset 0 1px 2px #ffffff22',
                animation: 'heartbeat 2s ease-in-out infinite',
              }}
            >
              <span className="text-2xl">💌</span>
            </div>

            {/* Hint text */}
            <p
              className="envelope-hint text-center mt-6 text-sm tracking-widest uppercase opacity-0"
              style={{ fontFamily: "'Poppins', sans-serif", color: '#ff9eb5' }}
            >
              tap to open
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The letter content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-lg w-full mx-4 rounded-lg overflow-y-auto max-h-[80vh] no-scrollbar"
            style={{
              background: 'linear-gradient(180deg, #fff8f0 0%, #fff0e6 50%, #ffe8d6 100%)',
              boxShadow: '0 20px 60px #00000044, 0 0 100px #ff2d5522, inset 0 0 30px #00000008',
              padding: '3.5rem 2.5rem 3.5rem 5rem',
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 text-rose-300 text-2xl opacity-30">❦</div>
            <div className="absolute top-4 right-4 text-rose-300 text-2xl opacity-30 -scale-x-100">❦</div>
            <div className="absolute bottom-4 left-4 text-rose-300 text-2xl opacity-30 rotate-180">❦</div>
            <div className="absolute bottom-4 right-4 text-rose-300 text-2xl opacity-30 -scale-x-100 rotate-180">❦</div>

            <div className="space-y-1">
              {letterLines.slice(0, visibleLines).map((line, i) => {
                const isFirst = i === 0;
                const isLast = i === letterLines.length - 1;
                const isSignoff = i === letterLines.length - 2;

                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`${line === '' ? 'h-3' : ''} ${isFirst ? 'text-2xl mb-4' : 'text-base'} ${isLast || isSignoff ? 'text-xl mt-4 text-right' : ''}`}
                    style={{
                      fontFamily: isFirst || isLast || isSignoff
                        ? "'Dancing Script', cursive"
                        : "'Playfair Display', serif",
                      color: isLast ? '#c9184a' : '#5c0020',
                      fontWeight: isLast ? 700 : 400,
                      lineHeight: '1.8',
                      fontStyle: !isFirst && !isLast && !isSignoff ? 'italic' : 'normal',
                    }}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </div>

            {/* Paper texture lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-lg overflow-hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, #8b0032 31px, #8b0032 32px)',
                backgroundPosition: '0 60px',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
