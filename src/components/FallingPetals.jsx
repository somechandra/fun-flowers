import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PETAL_COLORS = ['#ff2d55', '#ff6b8a', '#ff9eb5', '#ffb6c1', '#e8395b', '#c9184a'];

function createPetalPath() {
  const paths = [
    'M0,0 C5,-5 10,-2 8,5 C6,12 0,15 0,15 C0,15 -6,12 -8,5 C-10,-2 -5,-5 0,0Z',
    'M0,0 C6,-4 12,-1 9,6 C6,13 0,17 0,17 C0,17 -6,13 -9,6 C-12,-1 -6,-4 0,0Z',
    'M0,0 C4,-6 9,-3 7,4 C5,11 0,14 0,14 C0,14 -5,11 -7,4 C-9,-3 -4,-6 0,0Z',
  ];
  return paths[Math.floor(Math.random() * paths.length)];
}

export default function FallingPetals({ count = 30 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petals = [];

    for (let i = 0; i < count; i++) {
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '-12 -8 24 26');
      svg.style.position = 'absolute';
      svg.style.width = `${gsap.utils.random(15, 30)}px`;
      svg.style.height = 'auto';
      svg.style.left = `${gsap.utils.random(0, 100)}%`;
      svg.style.top = '-30px';
      svg.style.opacity = '0';
      svg.style.pointerEvents = 'none';

      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', createPetalPath());
      path.setAttribute('fill', PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]);
      path.setAttribute('opacity', `${gsap.utils.random(0.6, 1)}`);
      svg.appendChild(path);
      container.appendChild(svg);
      petals.push(svg);

      const delay = gsap.utils.random(0, 8);
      const duration = gsap.utils.random(4, 9);
      const xDrift = gsap.utils.random(-100, 100);

      gsap.to(svg, {
        y: window.innerHeight + 50,
        x: xDrift,
        rotation: gsap.utils.random(-360, 360),
        opacity: 0.8,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        onStart: () => { svg.style.opacity = '0.8'; },
        modifiers: {
          y: (y) => {
            const val = parseFloat(y);
            return (val % (window.innerHeight + 80)) + 'px';
          }
        }
      });

      gsap.to(svg, {
        rotationY: gsap.utils.random(180, 540),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
    }

    return () => {
      petals.forEach((p) => {
        gsap.killTweensOf(p);
        p.remove();
      });
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
}
