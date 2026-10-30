import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const PALETTE = [
  { color: 'rgba(0, 255, 178, ', glow: 'rgba(0, 255, 178, 0.45)' }, // Electric Neon Mint
  { color: 'rgba(6, 182, 212, ', glow: 'rgba(6, 182, 212, 0.40)' }, // Cyber Cyan
  { color: 'rgba(16, 185, 129, ', glow: 'rgba(16, 185, 129, 0.35)' }, // Radiant Emerald
  { color: 'rgba(251, 191, 36, ', glow: 'rgba(251, 191, 36, 0.35)' }, // Solar Pollen Gold
  { color: 'rgba(168, 85, 247, ', glow: 'rgba(168, 85, 247, 0.30)' }, // Neural Violet
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

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Density based on viewport width
    const particleCount = Math.min(65, Math.max(35, Math.floor(width / 26)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.9,
        color: pColor.color,
        glowColor: pColor.glow,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.2,
        swaySpeed: Math.random() * 0.015 + 0.006,
        swayAmount: Math.random() * 1.8 + 0.6,
        swayOffset: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.55 + 0.3,
        alpha: 0.3,
        pulseSpeed: Math.random() * 0.025 + 0.01,
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

      // 1. Draw delicate ethereal neural filament links between nearby spores
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.15 * Math.min(particles[i].alpha, particles[j].alpha);
            ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Render each vibrant glowing spore
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic sway + upward drift
        p.y -= p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmount + p.speedX;

        // Gentle interactive mouse deflection
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const mDist = Math.sqrt(dx * dx + dy * dy);
        if (mDist < 120 && mDist > 0) {
          const force = (1 - mDist / 120) * 1.5;
          p.x += (dx / mDist) * force;
          p.y += (dy / mDist) * force;
        }

        // Alpha pulse
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.25;
        p.alpha = Math.max(0.1, Math.min(0.95, p.alpha));

        // Wrap edges smoothly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw multi-stop radial flare
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4.2);
        grad.addColorStop(0, `${p.color}${p.alpha})`);
        grad.addColorStop(0.35, `${p.color}${p.alpha * 0.55})`);
        grad.addColorStop(0.7, `${p.color}${p.alpha * 0.15})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4.2, 0, Math.PI * 2);
        ctx.fill();

        // Hyper-bright photon core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.alpha * 1.1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-1 w-full h-full ${className}`}
      style={{ opacity: 0.9 }}
    />
  );
};
