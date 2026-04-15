'use client';

import { useEffect, useRef, useState } from 'react';

import MagnetLines from '@/components/MagnetLines';

export function CultureSection() {
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
        {/* One grid so the right column spans headline + body height; MagnetLines centers in that full column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 lg:items-stretch lg:min-h-[calc(100svh-12rem)]">
          <div>
            <div className="mb-16 lg:mb-24">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
                <span className="w-8 h-px bg-background/30" />
                Culture
              </span>
              <h2
                className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Embracing a culture
                <br />
                <span className="text-background/50">that runs deep</span>
              </h2>
            </div>

            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xl lg:text-2xl leading-relaxed mb-6">
                We maintain a flexible work environment focused on delivering exceptional results.
              </p>
              <p className="text-background/70 leading-relaxed mb-8">
                While we have beautiful office spaces in Vancouver and Toronto, we encourage a healthy balance between remote collaboration and in-person interaction. Our team thrives when given the autonomy to work in ways that maximize their creativity and productivity.
              </p>
              <ul className="space-y-4">
                {[
                  "Flexible work arrangements",
                  "Collaborative and creative environment",
                  "Continuous learning opportunities",
                  "Focus on work-life balance",
                  "Inclusive and diverse team",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-background" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`flex min-h-0 w-full items-center justify-center self-stretch lg:justify-end transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              transitionDelay: "200ms",
            }}
          >
            <MagnetLines
              rows={15}
              columns={12}
              containerSize="40vmin"
              lineColor="#efefef"
              lineWidth="2px"
              lineHeight="30px"
              baseAngle={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
