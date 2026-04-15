'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { WorkProject } from '@/lib/work-projects';
import { WaveGridCanvas } from './wave-grid-canvas';

export function CaseStudyHero({ project }: { project: WorkProject }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Back link */}
      <div
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Our work
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Left: text */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                {project.category} · {project.year}
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {project.title}
            </h1>

            <p
              className={`text-base sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {project.tagline}
            </p>

            {/* Meta strip */}
            <div
              className={`mt-12 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                { label: 'Scope', value: project.role },
                { label: 'Timeline', value: project.timeline },
                { label: 'Stack', value: project.stack.slice(0, 3).join(', ') },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: cover image with wave-grid overlay */}
          <div
            className={`relative aspect-[4/3] w-full overflow-hidden border border-foreground/10 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Wave grid sits on top as a subtle animated texture */}
            <div className="absolute inset-0 mix-blend-overlay opacity-60">
              <WaveGridCanvas className="h-full w-full" active={isVisible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
