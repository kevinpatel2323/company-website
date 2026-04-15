'use client';

import { useEffect, useRef, useState } from 'react';

import { MetricSurge } from '@/components/work/metric-surge';

const metrics = [
  { value: 48, suffix: '+', prefix: '', label: 'Products & launches shipped' },
  { value: 12, suffix: '', prefix: '', label: 'Industries partnered with' },
  { value: 94, suffix: '%', prefix: '', label: 'Clients who refer us again' },
  { value: 6, suffix: ' wk', prefix: '<', label: 'Median time to first demo' },
];

export function WorkImpactSection() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Impact
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Numbers from
            <br />
            <span className="text-muted-foreground">the last few years</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-foreground/10 md:grid-cols-2">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background p-8 lg:p-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <MetricSurge
                end={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                active={isVisible}
                delayMs={index * 140}
              />
              <div className="mt-4 text-lg text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
