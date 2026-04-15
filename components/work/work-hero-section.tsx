'use client';

import { useEffect, useRef, useState } from 'react';

import { HeroOrbitCanvas } from '@/components/work/hero-orbit-canvas';

export function WorkHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-3xl">
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                Our work
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Crafted products,
              <br />
              <span className="text-muted-foreground">measurable outcomes</span>
            </h1>

            <p
              className={`text-base sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              A snapshot of how we partner with teams to ship resilient platforms, polished interfaces, and
              experiences people return to—on time and built to scale.
            </p>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative aspect-square w-full max-w-[min(100%,min(36rem,52vw))] min-h-[280px]">
              <HeroOrbitCanvas className="h-full w-full min-h-[280px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
