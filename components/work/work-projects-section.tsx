'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { workProjects as staticProjects } from '@/lib/work-projects';
import type { WorkProject } from '@/lib/work-projects';

export function WorkProjectsSection({ extra = [] }: { extra?: WorkProject[] }) {
  const workProjects = [...extra, ...staticProjects];
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Selected work
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Recent engagements
            <br />
            <span className="text-muted-foreground">and outcomes</span>
          </h2>
        </div>

        <div className="grid gap-px bg-foreground/10 md:grid-cols-2">
          {workProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`group block bg-background p-8 lg:p-12 transition-all duration-700 hover:bg-foreground/[0.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-8 aspect-[4/3] overflow-hidden border border-foreground/10 transition-colors duration-500 group-hover:border-foreground/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-muted-foreground">
                <span>{project.category}</span>
                <span className="text-foreground/20">·</span>
                <span>{project.year}</span>
              </div>

              <h3 className="mb-4 flex items-start justify-between gap-4 text-2xl font-display tracking-tight lg:text-3xl">
                <span>{project.title}</span>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </h3>

              <p className="leading-relaxed text-muted-foreground break-words">{project.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
