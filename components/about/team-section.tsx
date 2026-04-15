'use client';

import { useEffect, useRef, useState } from 'react';

const team = [
  {
    name: "Kevin Patel",
    role: "Founder and CEO",
    description:
      "Leading the vision, strategy, and execution behind products that help teams ship exceptional digital experiences.",
  },
];

export function TeamSection() {
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
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Leadership
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 mb-8 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Our innovators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transforming ideas into reality with boundless creativity and visionary leadership.
          </p>
        </div>

        {/* Team */}
        <div className="grid grid-cols-1 gap-12 max-w-3xl">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group flex flex-col gap-8 transition-all duration-700 sm:flex-row sm:items-start sm:gap-10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div
                className="aspect-square w-full max-w-[280px] shrink-0 rounded-lg border border-foreground/10 bg-foreground/5 sm:max-w-none sm:w-56 lg:w-64"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl lg:text-3xl font-display tracking-tight mb-2">
                  {member.name}
                </h3>
                <p className="mb-4 text-sm font-mono text-muted-foreground">
                  {member.role}
                </p>
                <p className="leading-relaxed text-muted-foreground break-words">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
