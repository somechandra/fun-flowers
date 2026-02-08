import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RoseSVG({ animate = false, size = 300 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const petals = svgRef.current.querySelectorAll('.rose-petal');
    const stem = svgRef.current.querySelector('.rose-stem');
    const leaves = svgRef.current.querySelectorAll('.rose-leaf');
    const center = svgRef.current.querySelector('.rose-center');

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Start everything hidden
    gsap.set(petals, { scale: 0, opacity: 0, transformOrigin: '50% 100%' });
    gsap.set(stem, { scaleY: 0, opacity: 0, transformOrigin: '50% 100%' });
    gsap.set(leaves, { scale: 0, opacity: 0, transformOrigin: '0% 100%' });
    gsap.set(center, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });

    // Animate stem growing
    tl.to(stem, { scaleY: 1, opacity: 1, duration: 1.2 });

    // Animate leaves
    tl.to(leaves, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2 }, '-=0.4');

    // Bloom petals from inside out
    petals.forEach((petal, i) => {
      tl.to(petal, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, `-=${i === 0 ? 0.2 : 0.4}`);
    });

    // Center pop
    tl.to(center, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.3');

    // Gentle glow pulse
    tl.to(svgRef.current, {
      filter: 'drop-shadow(0 0 20px #ff2d5588)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => tl.kill();
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 350"
      width={size}
      height={size * 1.17}
      style={{ filter: 'drop-shadow(0 0 10px #ff2d5544)' }}
    >
      {/* Stem */}
      <g className="rose-stem">
        <path
          d="M100 160 Q98 220 100 320"
          stroke="#2d5a27"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 200 Q95 210 100 320"
          stroke="#3a7a33"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Leaves */}
      <g className="rose-leaf">
        <path
          d="M100 230 Q70 215 55 235 Q70 250 100 240"
          fill="#3a7a33"
          opacity="0.9"
        />
        <path
          d="M100 235 Q75 228 60 237"
          stroke="#2d5a27"
          strokeWidth="1"
          fill="none"
        />
      </g>
      <g className="rose-leaf">
        <path
          d="M100 260 Q130 245 145 265 Q130 280 100 270"
          fill="#3a7a33"
          opacity="0.9"
        />
        <path
          d="M100 265 Q125 258 140 267"
          stroke="#2d5a27"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* Outer petals (layer 1) */}
      <path
        className="rose-petal"
        d="M100 90 Q60 60 50 95 Q45 130 100 155 Q155 130 150 95 Q140 60 100 90Z"
        fill="#c9184a"
        opacity="0.85"
      />
      <path
        className="rose-petal"
        d="M100 85 Q55 70 48 100 Q42 135 100 158"
        fill="none"
        stroke="#a0133c"
        strokeWidth="0.5"
        opacity="0.5"
      />

      {/* Outer petals (layer 2) */}
      <path
        className="rose-petal"
        d="M100 80 Q68 55 58 90 Q50 120 100 148 Q150 120 142 90 Q132 55 100 80Z"
        fill="#e8395b"
        opacity="0.8"
      />

      {/* Mid petals */}
      <path
        className="rose-petal"
        d="M100 78 Q72 62 65 88 Q58 114 100 140 Q142 114 135 88 Q128 62 100 78Z"
        fill="#ff2d55"
        opacity="0.9"
      />

      {/* Inner petals */}
      <path
        className="rose-petal"
        d="M100 82 Q78 70 73 92 Q68 112 100 132 Q132 112 127 92 Q122 70 100 82Z"
        fill="#ff4d6d"
        opacity="0.9"
      />

      {/* Deep inner petals */}
      <path
        className="rose-petal"
        d="M100 88 Q84 78 80 96 Q76 110 100 125 Q124 110 120 96 Q116 78 100 88Z"
        fill="#ff6b8a"
        opacity="0.85"
      />

      {/* Center spiral */}
      <g className="rose-center">
        <ellipse cx="100" cy="103" rx="12" ry="15" fill="#ff8fa3" opacity="0.9" />
        <path
          d="M96 98 Q100 92 104 98 Q108 104 100 110 Q92 104 96 98Z"
          fill="#ffb3c1"
          opacity="0.9"
        />
        <ellipse cx="100" cy="102" rx="4" ry="5" fill="#ffd6de" opacity="0.8" />
      </g>

      {/* Dewdrop */}
      <ellipse cx="82" cy="110" rx="3" ry="4" fill="white" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}
