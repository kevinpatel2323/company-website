'use client';

import { useEffect, useRef, useState } from 'react';

import { DeliveryRailSvg } from '@/components/work/delivery-rail-svg';

const phases = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We align on goals, users, and constraints—research, workshops, and a shared roadmap before a single pixel ships.',
  },
  {
    step: '02',
    title: 'Design & build',
    description:
      'Product design, prototyping, and engineering in tight loops. Accessible UI, solid APIs, and observability from day one.',
  },
  {
    step: '03',
    title: 'Launch & evolve',
    description:
      'Rollouts, handoff, and iteration: analytics, hardening, and design-system updates so your team keeps shipping confidently.',
  },
];

export function WorkDeliverySection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            How we deliver
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From clarity
            <br />
            <span className="text-muted-foreground">to code in market</span>
          </h2>
        </div>

        <DeliveryRailSvg visible={isVisible} />

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {phases.map((phase, index) => (
            <div
              key={phase.step}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="mb-4 font-mono text-sm text-muted-foreground">{phase.step}</p>
              <h3 className="mb-4 text-2xl font-display tracking-tight lg:text-3xl">{phase.title}</h3>
              <p className="leading-relaxed text-muted-foreground break-words">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
