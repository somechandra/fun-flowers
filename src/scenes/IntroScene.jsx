import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HER_NAME = import.meta.env.VITE_HER_NAME || 'You';

export default function IntroScene({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Create starfield
    const container = starsRef.current;
    if (container) {
      for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.borderRadius = '50%';
        star.style.background = ['#fff', '#ffd700', '#ff6b8a'][Math.floor(Math.random() * 3)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = '0';
        container.appendChild(star);

        gsap.to(star, {
          opacity: gsap.utils.random(0.2, 0.8),
          duration: gsap.utils.random(1, 3),
          delay: gsap.utils.random(0, 2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 800);
      },
    });

    // Gentle entrance with stagger
    tl.fromTo(
      '.intro-line',
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.8, ease: 'power3.out' }
    );

    // Her name special entrance
    tl.fromTo('.intro-name', {
      opacity: 0,
      scale: 0.5,
      filter: 'blur(20px)',
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'elastic.out(1, 0.6)',
    }, '-=0.3');

    // Hold
    tl.to({}, { duration: 3.5 });

    // Fade out
    tl.to(['.intro-line', '.intro-name'], {
      opacity: 0,
      y: -30,
      filter: 'blur(8px)',
      duration: 1,
      stagger: 0.15,
      ease: 'power2.in',
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: 'radial-gradient(ellipse at center, #1a0011 0%, #0a0008 70%)' }}
    >
      {/* Starfield */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />

      <div ref={textRef} className="text-center px-6 relative z-10">
        <p
          className="intro-line text-lg tracking-[0.3em] uppercase opacity-0"
          style={{ fontFamily: "'Poppins', sans-serif", color: '#ff6b8a' }}
        >
          A Little Surprise
        </p>
        <h1
          className="intro-line text-5xl md:text-7xl mt-6 opacity-0"
          style={{ fontFamily: "'Dancing Script', cursive", color: '#fff' }}
        >
          For You
        </h1>

        {/* Her name with shimmer */}
        <h2
          className="intro-name text-6xl md:text-8xl mt-4 opacity-0"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ff6b8a, #ffd700, #ff2d55, #ffb6c1, #ff6b8a)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s linear infinite',
            filter: 'drop-shadow(0 0 30px #ff2d5566)',
          }}
        >
          {HER_NAME}
        </h2>

        <p
          className="intro-line text-base mt-8 opacity-0"
          style={{ fontFamily: "'Playfair Display', serif", color: '#ff9eb5', fontStyle: 'italic' }}
        >
          with all my heart...
        </p>
      </div>

      {/* Animated hearts background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {['💕', '🌹', '✨', '💗', '🌸'][i % 5]}
        </motion.div>
      ))}
    </motion.div>
  );
}
