'use client';

import { useEffect, useRef, useState } from 'react';

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & Creative Director",
    description: "Visionary leader with 15+ years of experience in digital design and brand strategy.",
  },
  {
    name: "Marcus Webb",
    role: "Co-founder & CTO",
    description: "Engineering innovator passionate about building scalable, elegant solutions.",
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

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="aspect-square bg-foreground/5 rounded-lg mb-6 border border-foreground/10" />
              <h3 className="text-2xl lg:text-3xl font-display tracking-tight mb-2">
                {member.name}
              </h3>
              <p className="text-sm font-mono text-muted-foreground mb-4">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
