import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  speedY: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const PALETTE = [
  { color: 'rgba(52, 211, 153, ', glow: 'rgba(52, 211, 153, 0.4)' }, // living mint
  { color: 'rgba(134, 239, 172, ', glow: 'rgba(134, 239, 172, 0.35)' }, // sage
  { color: 'rgba(16, 185, 129, ', glow: 'rgba(16, 185, 129, 0.3)' }, // emerald
  { color: 'rgba(253, 230, 138, ', glow: 'rgba(253, 230, 138, 0.25)' }, // solar pollen gold
];

export const BioluminescentField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 45 ambient spore particles
    const particleCount = Math.min(50, Math.floor(width / 32));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: pColor.color,
        glowColor: pColor.glow,
        speedY: Math.random() * 0.35 + 0.15,
        swaySpeed: Math.random() * 0.015 + 0.005,
        swayAmount: Math.random() * 1.5 + 0.5,
        swayOffset: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.5 + 0.25,
        alpha: 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic sway + upward drift
        p.y -= p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmount;

        // Alpha pulse
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.2;
        p.alpha = Math.max(0.05, Math.min(0.85, p.alpha));

        // Wrap edges smoothly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw glowing spore
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(0.4, `${p.color}${p.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-1 w-full h-full ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
