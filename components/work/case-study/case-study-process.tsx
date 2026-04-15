'use client';

import { useEffect, useRef, useState } from 'react';

import type { WorkProject } from '@/lib/work-projects';

export function CaseStudyProcess({ project, processImage }: { project: WorkProject; processImage: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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

  /* Auto-cycle active step */
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % project.process.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isVisible, project.process.length]);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Process
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            How we worked
            <br />
            <span className="text-muted-foreground">through it</span>
          </h2>
        </div>

        {/* Step selector + content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:items-start">
          {/* Step list */}
          <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {project.process.map((phase, i) => (
              <button
                key={phase.step}
                onClick={() => setActiveStep(i)}
                className={`group flex items-center gap-4 text-left lg:py-5 lg:border-b lg:border-foreground/10 whitespace-nowrap lg:whitespace-normal transition-all duration-300 shrink-0 lg:shrink px-4 lg:px-0 py-2 rounded-lg lg:rounded-none ${
                  activeStep === i
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground/70'
                }`}
              >
                <span
                  className={`font-mono text-xs transition-all duration-300 ${
                    activeStep === i ? 'text-foreground' : 'text-foreground/30'
                  }`}
                >
                  {phase.step}
                </span>
                <span
                  className={`text-lg font-display tracking-tight transition-all duration-300 ${
                    activeStep === i ? 'text-foreground' : ''
                  }`}
                >
                  {phase.title}
                </span>
                {/* active indicator */}
                <span
                  className={`hidden lg:block ml-auto h-px flex-1 transition-all duration-500 ${
                    activeStep === i ? 'bg-foreground' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Active step body */}
          <div className="min-h-[160px]">
            {project.process.map((phase, i) => (
              <div
                key={phase.step}
                className={`transition-all duration-500 ${
                  activeStep === i
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3 pointer-events-none absolute'
                }`}
                aria-hidden={activeStep !== i}
              >
                <p className="mb-3 font-mono text-sm text-muted-foreground">{phase.step}</p>
                <h3 className="mb-6 text-3xl font-display tracking-tight lg:text-4xl">{phase.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground break-words">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process image */}
        <div
          className={`mt-16 overflow-hidden border border-foreground/10 aspect-[16/7] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={processImage}
            alt="Project process"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
