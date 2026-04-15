'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { WorkProject } from '@/lib/work-projects';
import { Button } from '@/components/ui/button';

export function CaseStudyNext({
  next,
}: {
  next: WorkProject;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`flex flex-col gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Next project
          </span>

          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-2 text-sm font-mono text-muted-foreground">{next.category} · {next.year}</p>
              <h2 className="text-4xl font-display tracking-tight transition-colors duration-300 group-hover:text-muted-foreground lg:text-6xl">
                {next.title}
              </h2>
            </div>
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-foreground/20 shrink-0 transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/10">
            <Link href="/work">
              <Button variant="outline" className="rounded-full h-12 px-6 border-foreground/20 hover:bg-foreground/5">
                All projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="rounded-full h-12 px-6 bg-foreground text-background hover:bg-foreground/90">
                Start a project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
