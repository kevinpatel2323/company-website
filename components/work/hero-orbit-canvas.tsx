'use client';

import { useEffect, useRef } from 'react';

type Node = {
  angle: number;
  radius: number;
  speed: number;
  phase: number;
};

/**
 * Custom canvas: orbiting nodes with distance-threshold links — no external animation libs.
 */
export function HeroOrbitCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes: Node[] = Array.from({ length: 28 }, (_, i) => ({
      angle: (i / 28) * Math.PI * 2,
      /* Wider radial band so the graph fills the canvas edge-to-edge */
      radius: 0.5 + (i % 8) * 0.055,
      speed: 0.00035 + (i % 7) * 0.00006,
      phase: i * 0.4,
    }));

    let raf = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) * 0.001;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const baseR = Math.min(w, h) * 0.5;

      const pts = nodes.map((n) => {
        const wobble = Math.sin(t * 0.7 + n.phase) * 0.035;
        const r = baseR * (n.radius + wobble);
        const a = n.angle + t * n.speed * 120 + Math.sin(t * 0.3 + n.phase) * 0.12;
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.97 };
      });

      const maxDist = baseR * 0.58;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.42;
            ctx.strokeStyle = `oklch(0.35 0.02 60 / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < pts.length; i++) {
        const pulse = 0.6 + Math.sin(t * 2 + nodes[i].phase) * 0.25;
        ctx.fillStyle = `oklch(0.22 0.02 60 / ${pulse})`;
        const pr = Math.max(2, Math.min(w, h) * 0.006);
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      /* dimensions read in draw from clientWidth/Height */
    };

    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
