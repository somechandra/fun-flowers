import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Sparkles({ count = 40 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sparkles = [];

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✦';
      sparkle.style.position = 'absolute';
      sparkle.style.fontSize = `${gsap.utils.random(8, 18)}px`;
      sparkle.style.left = `${gsap.utils.random(0, 100)}%`;
      sparkle.style.top = `${gsap.utils.random(0, 100)}%`;
      sparkle.style.color = ['#ffd700', '#fff', '#ff6b8a', '#ffb6c1'][Math.floor(Math.random() * 4)];
      sparkle.style.pointerEvents = 'none';
      sparkle.style.opacity = '0';
      container.appendChild(sparkle);
      sparkles.push(sparkle);

      gsap.to(sparkle, {
        opacity: gsap.utils.random(0.3, 1),
        scale: gsap.utils.random(0.5, 1.5),
        duration: gsap.utils.random(1, 3),
        delay: gsap.utils.random(0, 5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(sparkle, {
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(3, 8),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      sparkles.forEach((s) => {
        gsap.killTweensOf(s);
        s.remove();
      });
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5 overflow-hidden"
    />
  );
}
