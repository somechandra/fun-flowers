import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ParticleHeart({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const heartPoints = [];

    // Generate heart shape points using parametric equation
    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
      const x = 16 * Math.pow(Math.sin(angle), 3);
      const y = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
      heartPoints.push({ x, y });
    }

    // Fill the heart with more points
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const scale = Math.random();
      const x = scale * 16 * Math.pow(Math.sin(angle), 3);
      const y = scale * -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
      heartPoints.push({ x, y });
    }

    const scaleFactor = Math.min(canvas.width, canvas.height) / 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const point = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        this.targetX = canvas.width / 2 + point.x * scaleFactor;
        this.targetY = canvas.height / 2 + point.y * scaleFactor - 20;
        this.x = canvas.width / 2 + (Math.random() - 0.5) * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${340 + Math.random() * 30}, ${80 + Math.random() * 20}%, ${50 + Math.random() * 30}%)`;
        this.arrived = false;
        this.alpha = 0;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time) {
        if (!this.arrived) {
          this.x += (this.targetX - this.x) * 0.03;
          this.y += (this.targetY - this.y) * 0.03;
          this.alpha = Math.min(1, this.alpha + 0.02);

          if (Math.abs(this.x - this.targetX) < 1 && Math.abs(this.y - this.targetY) < 1) {
            this.arrived = true;
          }
        } else {
          // Gentle floating
          this.x = this.targetX + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 2;
          this.y = this.targetY + Math.cos(time * this.pulseSpeed + this.pulsePhase) * 2;
          this.alpha = 0.7 + Math.sin(time * this.pulseSpeed * 2) * 0.3;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = this.alpha * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 400; i++) {
      particles.push(new Particle());
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      particles.forEach((p) => {
        p.update(time);
        p.draw(ctx);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    if (active) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 1s ease' }}
    />
  );
}
