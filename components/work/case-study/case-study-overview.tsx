'use client';

import { useEffect, useRef, useState } from 'react';

import type { WorkProject } from '@/lib/work-projects';

export function CaseStudyOverview({ project }: { project: WorkProject }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10 bg-foreground text-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Challenge */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-8">
              <span className="w-8 h-px bg-background/30" />
              The challenge
            </span>
            <h2
              className={`text-3xl lg:text-5xl font-display tracking-tight mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              What we were solving for
            </h2>
            <p
              className={`text-background/70 leading-relaxed text-lg transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {project.challenge}
            </p>
          </div>

          {/* Approach */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-8">
              <span className="w-8 h-px bg-background/30" />
              Our approach
            </span>
            <h2
              className={`text-3xl lg:text-5xl font-display tracking-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              How we thought about it
            </h2>
            <p
              className={`text-background/70 leading-relaxed text-lg transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {project.approach}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
