import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  d: number; // density / weight factor
  speedY: number;
  driftX: number;
  angle: number;
}

export const DustParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles
    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5, // 0.5px to 2px
        d: Math.random() * particleCount,
        speedY: -(Math.random() * 0.15 + 0.05), // slowly float up
        driftX: Math.random() * 0.2 - 0.1,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Muted luxury lighting: 1.5% to 2.5% opacity
      ctx.fillStyle = 'rgba(234, 230, 223, 0.02)';

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();

        // Update positions (float upward + gentle wave drift)
        p.y += p.speedY;
        p.angle += 0.003;
        p.x += Math.sin(p.angle) * 0.15 + p.driftX;

        // Reset if offscreen (wrap around borders)
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 select-none bg-transparent"
    />
  );
};

export default DustParticles;
