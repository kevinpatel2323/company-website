'use client';

import { useEffect, useRef, useState } from 'react';

const factors = [
  {
    title: "Goal-driven approach",
    description: "We understand your goals and provide strategic guidance on what to build and when. Our dynamic scaling adapts from POCs and MVPs to full-scale production solutions.",
  },
  {
    title: "Design-first mindset",
    description: "We create products that combine stunning aesthetics with seamless functionality, prioritizing intuitive user experiences at every touchpoint.",
  },
  {
    title: "Integrated team excellence",
    description: "Our combined design and development team ensures outstanding execution, translating beautiful concepts into production-ready products.",
  },
  {
    title: "Research-powered strategy",
    description: "We build products around your business and users, uncovering insights and opportunities through comprehensive research and analysis.",
  },
];

export function XFactorSection() {
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
      className="relative py-24 lg:py-32 bg-foreground text-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Differentiation
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The X-Factor that
            <br />
            <span className="text-background/50">sets us apart</span>
          </h2>
        </div>

        {/* Factors Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {factors.map((factor, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex flex-col h-full border-b border-background/20 pb-8">
                <h3 className="text-2xl lg:text-3xl font-display tracking-tight mb-4">
                  {factor.title}
                </h3>
                <p className="text-background/70 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
