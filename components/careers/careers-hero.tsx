'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ClusterCanvas } from './cluster-canvas';
import { positions } from '@/lib/careers-data';

export function CareersHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Left: copy */}
          <div>
            <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                Careers
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/8 px-3 py-0.5 font-mono text-xs text-foreground/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  {positions.length} open roles
                </span>
              </span>
            </div>

            <h1 className={`text-5xl lg:text-7xl font-display leading-[0.95] tracking-tight mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Build the future
              <br />
              <span className="text-muted-foreground">with us</span>
            </h1>

            <p className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              We are a small, senior team that builds products people love. We work in the open, move fast without cutting corners, and care deeply about craft.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Link href="#positions">
                <Button size="lg" className="h-14 w-full rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90 sm:w-auto group">
                  View open roles
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
              </Link>
              <Link href="#culture">
                <Button size="lg" variant="outline" className="h-14 w-full rounded-full border-foreground/20 px-8 text-base hover:bg-foreground/5 sm:w-auto">
                  Our culture
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: cluster animation */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative aspect-square w-full max-w-[min(100%,min(36rem,50vw))] min-h-[280px]">
              <ClusterCanvas className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
