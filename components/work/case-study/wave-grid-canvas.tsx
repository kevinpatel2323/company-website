'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated dot grid where two sine waves propagate across rows and columns.
 * A ripple originates from the centre when `active` becomes true.
 * 100% custom — no animation library, no third-party canvas helpers.
 */
export function WaveGridCanvas({
  className,
  active,
}: {
  className?: string;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const rippleRef = useRef<number | null>(null); // timestamp when ripple started

  useEffect(() => {
    activeRef.current = active;
    if (active && rippleRef.current === null) {
      rippleRef.current = performance.now();
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) { raf = requestAnimationFrame(draw); return; }

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const t = now * 0.001;
      const cols = 22;
      const rows = 14;
      const padX = w * 0.04;
      const padY = h * 0.08;
      const cellW = (w - padX * 2) / (cols - 1);
      const cellH = (h - padY * 2) / (rows - 1);

      const rippleAge = rippleRef.current !== null ? (now - rippleRef.current) * 0.001 : null;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = padX + c * cellW;
          const cy = padY + r * cellH;

          // Two crossing sine waves — one horizontal, one diagonal
          const wave1 = Math.sin(c * 0.45 - t * 1.4 + r * 0.15) * 0.5;
          const wave2 = Math.sin(r * 0.55 - t * 0.9 + c * 0.2) * 0.5;
          const combined = (wave1 + wave2) * 0.5; // -0.5 … +0.5

          // Ripple from centre: radially expanding fade-in ring
          let rippleBoost = 0;
          if (rippleAge !== null) {
            const cx0 = cols * 0.5;
            const cy0 = rows * 0.5;
            const dist = Math.hypot(c - cx0, r - cy0);
            const front = rippleAge * 8; // ring expands at speed 8 grid-cells/s
            const diff = Math.abs(dist - front);
            rippleBoost = Math.max(0, 1 - diff * 0.6) * Math.max(0, 1 - rippleAge * 0.4);
          }

          // Base opacity: ramp up after ripple reaches the dot
          let baseAlpha = 0;
          if (rippleAge !== null) {
            const cx0 = cols * 0.5;
            const cy0 = rows * 0.5;
            const dist = Math.hypot(c - cx0, r - cy0);
            const arrivalTime = dist / 8;
            const fadeDuration = 0.4;
            baseAlpha = Math.min(1, Math.max(0, (rippleAge - arrivalTime) / fadeDuration));
          }

          const alpha = Math.max(0, Math.min(1, (0.15 + combined * 0.25 + rippleBoost * 0.5) * baseAlpha));
          const radius = Math.max(1, 1.6 + combined * 1.2 + rippleBoost * 1.4);

          ctx.fillStyle = `oklch(0.22 0.02 60 / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
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
