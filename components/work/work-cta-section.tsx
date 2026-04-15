'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function WorkCtaSection() {
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
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32 bg-foreground text-background">
      <div className="work-cta-aurora" aria-hidden />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-8 h-px bg-background/30" />
            Next project
          </span>

          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Tell us what
            <br />
            <span className="text-background/50">you&apos;re building</span>
          </h2>

          <p
            className={`text-xl lg:text-2xl text-background/70 leading-relaxed mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Whether you need a focused sprint or a team embedded for the long haul, we&apos;ll scope an approach that
            fits your timeline and risk profile.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 w-full rounded-full bg-background px-8 text-base text-foreground hover:bg-background/90 sm:w-auto group"
              >
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full rounded-full border-background/30 bg-transparent px-8 text-base text-background hover:bg-background/10 sm:w-auto"
              >
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
