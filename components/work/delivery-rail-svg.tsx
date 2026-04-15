'use client';

import { useEffect, useRef } from 'react';

type WaveDef = {
  amplitude: number;  // px from centre
  frequency: number;  // cycles across full width
  speed: number;      // radians per second
  phase: number;      // initial phase offset
  alpha: number;      // opacity
  width: number;      // stroke width
};

const WAVES: WaveDef[] = [
  { amplitude: 10, frequency: 2.2, speed: 0.9,  phase: 0,    alpha: 0.55, width: 1.5 },
  { amplitude: 6,  frequency: 3.5, speed: 1.4,  phase: 1.1,  alpha: 0.30, width: 1   },
  { amplitude: 14, frequency: 1.4, speed: 0.55, phase: 2.3,  alpha: 0.18, width: 2   },
  { amplitude: 4,  frequency: 5.0, speed: 2.1,  phase: 0.7,  alpha: 0.20, width: 0.8 },
  { amplitude: 8,  frequency: 2.8, speed: 1.1,  phase: 3.9,  alpha: 0.12, width: 1.2 },
];

export function DeliveryRailSvg({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(visible);
  const fadeRef = useRef(0); // 0 → 1 as it becomes visible

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const startTime = performance.now();

    const draw = (now: number) => {
      const t = (now - startTime) * 0.001;

      // Smooth fade-in
      const target = visibleRef.current ? 1 : 0;
      fadeRef.current += (target - fadeRef.current) * 0.04;

      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) { raf = requestAnimationFrame(draw); return; }

      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cy = h * 0.5;
      const fade = fadeRef.current;

      WAVES.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = `oklch(0.25 0.02 60 / ${(wave.alpha * fade).toFixed(3)})`;
        ctx.lineWidth = wave.width;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        const steps = Math.ceil(w / 2);
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * w;
          const angle = (x / w) * Math.PI * 2 * wave.frequency - t * wave.speed + wave.phase;
          const y = cy + Math.sin(angle) * wave.amplitude;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mb-12 h-16 w-full lg:mb-16 lg:h-20" aria-hidden>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
