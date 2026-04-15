'use client';

import { useEffect, useState } from 'react';

/**
 * Thin progress bar fixed to the top of the viewport that fills as the
 * user scrolls through the article. 100% custom — no library.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] bg-foreground transition-[width] duration-75 ease-linear"
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Reading progress"
    />
  );
}
