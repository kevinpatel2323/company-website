'use client';

import { useEffect, useRef, useState } from 'react';

const values = [
  {
    number: "01",
    title: "Be an expert",
    description: "Master your craft and stay ahead of industry trends. We invest in continuous learning and excellence.",
  },
  {
    number: "02",
    title: "Understand the conversation",
    description: "Listen deeply to our clients' needs and challenges. Clear communication drives better outcomes.",
  },
  {
    number: "03",
    title: "Envision the vision",
    description: "Think beyond the present. We help clients see possibilities and opportunities they haven't considered.",
  },
  {
    number: "04",
    title: "Mind first, motion next",
    description: "Strategy and planning precede execution. Thoughtful preparation ensures successful delivery.",
  },
  {
    number: "05",
    title: "Think for yourself",
    description: "We encourage independent thinking and creative problem-solving across our entire team.",
  },
  {
    number: "06",
    title: "Be detail driven",
    description: "Excellence lives in the details. Meticulous attention ensures quality at every level.",
  },
];

export function ValuesSection() {
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
            Core values
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The values that
            <br />
            <span className="text-muted-foreground">power our growth</span>
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex flex-col h-full">
                <p className="text-sm font-mono text-muted-foreground mb-4">
                  {value.number}
                </p>
                <h3 className="text-2xl font-display tracking-tight mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
