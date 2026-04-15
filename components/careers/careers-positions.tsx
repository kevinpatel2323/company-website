'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight, MapPin, Clock } from 'lucide-react';

import type { Position } from '@/lib/careers-data';
import { positions } from '@/lib/careers-data';
import { Button } from '@/components/ui/button';

function PositionCard({
  position,
  index,
  visible,
}: {
  position: Position;
  index: number;
  visible: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-foreground/10 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Row header */}
      <button
        className="group w-full py-8 flex items-start gap-6 text-left hover:bg-foreground/[0.02] px-1 -mx-1 transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex-1 grid gap-1 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
          <div>
            <h3 className="text-2xl font-display tracking-tight mb-1 lg:text-3xl">{position.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{position.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3 sm:mt-0 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {position.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Clock className="h-3 w-3" />
              {position.type}
            </span>
            <span className="rounded-full border border-foreground/15 px-3 py-0.5 text-xs font-mono text-foreground/70">
              {position.department}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded body */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'max-h-[2000px] pb-10' : 'max-h-0'
        }`}
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 pt-2">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-mono text-muted-foreground uppercase tracking-widest">About the role</p>
              <p className="leading-relaxed text-foreground/80">{position.about}</p>
            </div>

            <div>
              <p className="mb-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">What you'll do</p>
              <ul className="space-y-3">
                {position.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">What we need</p>
              <ul className="space-y-3">
                {position.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {position.niceToHave.length > 0 && (
              <div>
                <p className="mb-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">Nice to have</p>
                <ul className="space-y-3">
                  {position.niceToHave.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={`/careers/apply/${position.id}`} className="inline-block">
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 h-12 group">
                Apply for this role
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareersPositions({ extra = [] }: { extra?: Position[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dynPositions, setDynPositions] = useState<Position[]>(extra);

  useEffect(() => {
    fetch('/api/admin/careers').then(r => r.json()).then(setDynPositions).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="positions" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Open positions
            </span>
            <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Find your role
              <br />
              <span className="text-muted-foreground">in the team</span>
            </h2>
          </div>

          <p className={`text-muted-foreground max-w-xs leading-relaxed transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            All roles are fully remote. We hire for attitude and craft — backgrounds are varied by design.
          </p>
        </div>

        <div className="border-t border-foreground/10">
          {[...dynPositions, ...positions].filter(
            (p, i, arr) => arr.findIndex(x => x.id === p.id) === i
          ).map((pos, i) => (
            <PositionCard key={pos.id} position={pos} index={i} visible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
