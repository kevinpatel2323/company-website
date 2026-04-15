'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ContactNoteModal } from './contact-note-modal';

export function CareersCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <span className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-8 h-px bg-foreground/30" />
              Not seeing your role?
            </span>
            <h2 className={`text-4xl lg:text-6xl font-display tracking-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              We hire for craft,
              <br />
              <span className="text-muted-foreground">not job titles</span>
            </h2>
            <p className={`text-xl text-muted-foreground leading-relaxed mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              If you&apos;re exceptional at what you do and think you&apos;d thrive here, send us a note. The best hires we&apos;ve made were for roles that didn&apos;t exist when we met.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="h-14 w-full rounded-full bg-foreground px-8 text-base text-background hover:bg-foreground/90 sm:w-auto group"
              >
                Send us a note
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 w-full rounded-full border-foreground/20 px-8 text-base hover:bg-foreground/5 sm:w-auto">
                  Meet the team
                </Button>
              </Link>
            </div>
          </div>

          {/* Hiring process steps */}
          <div className={`space-y-0 border-t border-foreground/10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { step: '01', title: 'Intro call', description: '30-minute conversation to learn about each other — no prep required, no tricks.' },
              { step: '02', title: 'Work sample', description: 'A small paid exercise relevant to the role. We respect your time and pay for it.' },
              { step: '03', title: 'Team conversation', description: 'A deeper conversation with 2–3 team members across design, engineering, and strategy.' },
              { step: '04', title: 'Offer', description: 'We move quickly. If it\'s a yes, you\'ll hear within 48 hours of the final conversation.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6 border-b border-foreground/10 py-7">
                <span className="font-mono text-sm text-muted-foreground shrink-0 w-6">{s.step}</span>
                <div>
                  <p className="font-medium mb-1">{s.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactNoteModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
