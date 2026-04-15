'use client';

import { useEffect, useRef, useState } from 'react';

import Cubes from '@/components/Cubes';

export function AboutHeroSection() {
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
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-3xl">
            <div 
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                Our story
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Transforming ideas into
              <br />
              <span className="text-muted-foreground">exceptional digital solutions</span>
            </h1>

            <p 
              className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We are visionary designers, innovative strategists, and meticulous builders of world-class digital experiences. Every project is an opportunity to create something meaningful.
            </p>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative w-full max-w-[min(100%,420px)] aspect-square [&_.default-animation]:!w-full [&_.default-animation]:!h-auto">
              <Cubes
                gridSize={10}
                faceColor="transparent"
                borderStyle="1px solid oklch(0.32 0.02 60)"
                rippleColor="oklch(0.88 0.02 90)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
