'use client';

import { useEffect, useRef, useState } from 'react';

import type { WorkProject } from '@/lib/work-projects';

/**
 * Staggered bar-fill animation — each stat has a thin bar that fills left-to-right
 * over 1.2s with a spring-like easing when the section enters the viewport.
 * Completely custom; no animation library.
 */
function OutcomeStat({
  outcome,
  index,
  active,
}: {
  outcome: WorkProject['outcomes'][number];
  index: number;
  active: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(() => setFilled(true), index * 120 + 200);
    return () => clearTimeout(timeout);
  }, [active, index]);

  return (
    <div
      ref={barRef}
      className={`transition-all duration-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="mb-1 text-5xl font-display tracking-tight lg:text-6xl">{outcome.metric}</p>
      <p className="mb-3 font-medium">{outcome.label}</p>
      {/* animated fill bar */}
      <div className="mb-3 h-px w-full bg-foreground/10">
        <div
          className="h-px bg-foreground transition-all"
          style={{
            width: filled ? '100%' : '0%',
            transitionDuration: '1.2s',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground break-words">{outcome.description}</p>
    </div>
  );
}

export function CaseStudyOutcomes({ project }: { project: WorkProject }) {
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
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Outcomes
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What we measured
            <br />
            <span className="text-background/50">after we shipped</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {project.outcomes.map((outcome, i) => (
            <OutcomeStat key={outcome.label} outcome={outcome} index={i} active={isVisible} />
          ))}
        </div>

        {/* Pull quote */}
        <div
          className={`mt-20 border-t border-background/20 pt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <blockquote className="max-w-3xl">
            <p className="text-2xl font-display leading-relaxed tracking-tight text-background/90 lg:text-3xl">
              &ldquo;{project.quote.text}&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="h-px w-8 bg-background/30" />
              <div>
                <p className="font-medium text-background">{project.quote.author}</p>
                <p className="text-sm font-mono text-background/50">{project.quote.role}</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
