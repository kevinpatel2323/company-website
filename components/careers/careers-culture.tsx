'use client';

import { useEffect, useRef, useState } from 'react';

const values = [
  {
    number: '01',
    title: 'Senior by default',
    description: 'Everyone on the team owns outcomes, not just tasks. We hire people who can run with a brief and come back with something better than what was asked for.',
  },
  {
    number: '02',
    title: 'Writing is thinking',
    description: 'We write proposals, decision logs, design rationale, and post-mortems. If you can\'t explain it in writing, the idea isn\'t ready. We read before we meet.',
  },
  {
    number: '03',
    title: 'Client work is real work',
    description: 'We don\'t treat client projects as constraints on "real" product work. Our clients\' problems are interesting problems. We invest fully in them.',
  },
  {
    number: '04',
    title: 'Slow to hire, committed to keep',
    description: 'We take hiring seriously because the people here make the work. Once you\'re in, we\'re invested in your growth, your compensation, and your longevity.',
  },
];

export function CareersCulture() {
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
    <section id="culture" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            How we work
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Culture that isn&apos;t
            <br />
            <span className="text-background/50">a slide deck</span>
          </h2>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.number}
              className={`border-t border-background/15 py-10 md:py-12 transition-all duration-700 ${
                i % 2 === 0 ? 'md:pr-12 md:border-r' : 'md:pl-12'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="mb-4 font-mono text-sm text-background/40">{v.number}</p>
              <h3 className="mb-4 text-2xl font-display tracking-tight lg:text-3xl">{v.title}</h3>
              <p className="leading-relaxed text-background/65">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
