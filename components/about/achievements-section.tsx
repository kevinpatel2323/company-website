'use client';

import { useEffect, useRef, useState } from 'react';

const achievements = [
  {
    metric: "$120M",
    label: "Client funding raised",
    description: "Supporting startups to scale into market leaders",
  },
  {
    metric: "450+",
    label: "Platforms deployed",
    description: "Products we build powering businesses globally",
  },
  {
    metric: "5M+",
    label: "User interactions",
    description: "Positive experiences in the last 2 years alone",
  },
  {
    metric: "28",
    label: "Countries served",
    description: "Digital solutions deployed worldwide",
  },
  {
    metric: "500+",
    label: "5-star reviews",
    description: "Organic app store ratings for our products",
  },
  {
    metric: "15+",
    label: "Industry awards",
    description: "Recognition for innovation and excellence",
  },
];

export function AchievementsSection() {
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
            Impact
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Our achievements
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
            Nurturing startups to empowering global enterprises
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {achievements.map((achievement, index) => (
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
                <p className="text-5xl lg:text-6xl font-display tracking-tight mb-2">
                  {achievement.metric}
                </p>
                <h3 className="text-lg font-semibold mb-3">
                  {achievement.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
