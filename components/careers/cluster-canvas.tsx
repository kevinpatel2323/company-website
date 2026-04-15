'use client';

import { useEffect, useRef } from 'react';

/**
 * Cluster Canvas — particles drift toward soft attractor points that
 * periodically relocate, forming and dissolving "teams". The metaphor
 * maps directly to careers / people coming together.
 *
 * 100% custom: no libs, no physics engine, no pre-built animation helpers.
 */

const PARTICLE_COUNT  = 55;
const CLUSTER_COUNT   = 4;
const CLUSTER_LIFE_MS = 4200;  // how long each cluster centre lives
const ATTRACT_FORCE   = 0.022; // pull toward cluster centre
const REPEL_RADIUS    = 18;    // min distance between particles
const REPEL_FORCE     = 0.06;
const FRICTION        = 0.88;  // velocity dampening per frame

type Vec2 = { x: number; y: number };

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;  // visual size
  phase: number;   // for pulse offset
};

type Cluster = {
  x: number; y: number;
  born: number;    // timestamp
};

function randomVec(w: number, h: number): Vec2 {
  return { x: Math.random() * w, y: Math.random() * h };
}

export function ClusterCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    let particles: Particle[] = [];
    let clusters: Cluster[] = [];

    /* ── helpers ─────────────────────────────────────────────── */
    const makeParticles = () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        ...randomVec(w, h),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2.5 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      }));

    const makeClusters = (now: number) =>
      Array.from({ length: CLUSTER_COUNT }, () => ({
        ...randomVec(w * 0.15 + w * 0.7 * Math.random(), h * 0.15 + h * 0.7 * Math.random()),
        born: now - Math.random() * CLUSTER_LIFE_MS, // stagger initial ages
      }));

    /* ── resize ─────────────────────────────────────────────── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) {
        particles = makeParticles();
        clusters  = makeClusters(performance.now());
      }
    };

    /* ── draw loop ───────────────────────────────────────────── */
    const draw = (now: number) => {
      if (w < 2 || h < 2) { resize(); raf = requestAnimationFrame(draw); return; }
      const t = now * 0.001;

      ctx.clearRect(0, 0, w, h);

      /* refresh expired clusters */
      clusters = clusters.map(c =>
        now - c.born > CLUSTER_LIFE_MS
          ? { ...randomVec(w * 0.1 + w * 0.8 * Math.random(), h * 0.1 + h * 0.8 * Math.random()), born: now }
          : c
      );

      /* update particles */
      for (const p of particles) {
        /* attraction: pull toward nearest cluster */
        let nearestDist = Infinity;
        let nearestCluster: Cluster | null = null;
        for (const c of clusters) {
          const d = Math.hypot(p.x - c.x, p.y - c.y);
          if (d < nearestDist) { nearestDist = d; nearestCluster = c; }
        }
        if (nearestCluster) {
          const age = (now - nearestCluster.born) / CLUSTER_LIFE_MS; // 0→1
          /* fade in and out: strongest at age 0.35, zero at 0 and 1 */
          const strength = Math.sin(age * Math.PI) * ATTRACT_FORCE;
          p.vx += (nearestCluster.x - p.x) * strength * 0.04;
          p.vy += (nearestCluster.y - p.y) * strength * 0.04;
        }

        /* repulsion from other nearby particles */
        for (const q of particles) {
          if (q === p) continue;
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS && d > 0) {
            const f = (REPEL_RADIUS - d) / REPEL_RADIUS * REPEL_FORCE;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        /* soft boundary: push gently back from edges */
        const margin = 40;
        if (p.x < margin)      p.vx += 0.08;
        if (p.x > w - margin)  p.vx -= 0.08;
        if (p.y < margin)      p.vy += 0.08;
        if (p.y > h - margin)  p.vy -= 0.08;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;
      }

      /* draw edges between close particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxEdge = 72;
          if (d < maxEdge) {
            const alpha = (1 - d / maxEdge) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `oklch(0.25 0.015 60 / ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* draw particles */
      for (const p of particles) {
        const pulse = 0.72 + Math.sin(t * 1.8 + p.phase) * 0.18;
        const r = p.radius * pulse;

        /* outer glow */
        ctx.beginPath();
        ctx.fillStyle = `oklch(0.25 0.015 60 / 0.06)`;
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.fillStyle = `oklch(0.22 0.02 60 / ${(0.55 * pulse).toFixed(3)})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
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
