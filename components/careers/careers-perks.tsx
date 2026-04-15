'use client';

import { useEffect, useRef, useState } from 'react';

import { perks } from '@/lib/careers-data';

export function CareersPerks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Benefits
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            What comes
            <br />
            <span className="text-muted-foreground">with the job</span>
          </h2>
        </div>

        <div className="grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className={`bg-background p-8 lg:p-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Icon className="h-4.5 w-4.5 text-foreground/70" />
                </div>
                <h3 className="mb-2 font-medium">{perk.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground break-words">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
