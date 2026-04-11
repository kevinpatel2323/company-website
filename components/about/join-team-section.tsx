'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function JoinTeamSection() {
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
        <div className="max-w-2xl">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-8 h-px bg-foreground/30" />
            Join us
          </span>

          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ready to make
            <br />
            an impact?
          </h2>

          <p
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We&apos;re always looking for talented individuals who share our passion for creating exceptional digital experiences.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/careers" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group w-full sm:w-auto"
              >
                View careers
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 w-full sm:w-auto"
              >
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
