'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

type Props = {
  end: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  /** Stagger start so cells don’t animate in lockstep. */
  delayMs?: number;
};

/**
 * Count-up with overshoot easing — distinct from the home page counter easing.
 */
export function MetricSurge({ end, prefix = '', suffix = '', active, delayMs = 0 }: Props) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2400;
    let startAt = 0;
    const timeout = window.setTimeout(() => {
      startAt = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startAt;
        const p = Math.min(elapsed / duration, 1);
        const eased = easeOutBack(p);
        const next = Math.min(Math.round(eased * end), end);
        setValue(next);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, end, delayMs]);

  return (
    <div className="tabular-nums text-5xl sm:text-6xl font-display tracking-tight lg:text-8xl">
      <span className="inline-block origin-bottom transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
