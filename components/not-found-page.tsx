'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { Button } from '@/components/ui/button';

type Props = {
  /** Short label shown above the headline, e.g. "Blog · Post not found" */
  context?: string;
  heading?: string;
  description?: string;
  /** Primary back link */
  backHref?: string;
  backLabel?: string;
  /** Secondary CTA */
  ctaHref?: string;
  ctaLabel?: string;
};

export function NotFoundPage({
  context = 'Error · 404',
  heading = 'Page not found',
  description = "The page you're looking for doesn't exist, has moved, or was removed.",
  backHref = '/',
  backLabel = 'Back to home',
  ctaHref = '/work',
  ctaLabel = 'View our work',
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /* trigger immediately for a 404 — no need to wait for scroll */
    const t = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay flex flex-col">
      <Navigation />

      <section
        ref={sectionRef}
        className="flex flex-1 items-center justify-center py-32 lg:py-48"
      >
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 lg:items-center">

            {/* Left — copy */}
            <div>
              <div
                className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                  <span className="w-8 h-px bg-foreground/30" />
                  {context}
                </span>
              </div>

              <h1
                className={`mb-6 text-4xl font-display tracking-tight lg:text-6xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {heading}
                <br />
                <span className="text-muted-foreground">
                  {description}
                </span>
              </h1>

              <div
                className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <Link href={backHref}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 w-full rounded-full border-foreground/20 px-7 text-base hover:bg-foreground/5 sm:w-auto group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {backLabel}
                  </Button>
                </Link>
                <Link href={ctaHref}>
                  <Button
                    size="lg"
                    className="h-13 w-full rounded-full bg-foreground px-7 text-base text-background hover:bg-foreground/90 sm:w-auto group"
                  >
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — glitch 404 */}
            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="select-none text-right">
                {/* Glitch number */}
                <p
                  className="nf-glitch font-display tracking-tighter leading-none text-[clamp(7rem,20vw,14rem)] text-foreground/10"
                  data-text="404"
                  aria-hidden="true"
                >
                  404
                </p>

                {/* Staggered hint links */}
                <div className="mt-6 flex flex-col items-end gap-3">
                  {[
                    { label: '← Home',    href: '/' },
                    { label: '← Blog',    href: '/blog' },
                    { label: '← Work',    href: '/work' },
                    { label: '← Contact', href: '/contact' },
                  ].map(({ label, href }, i) => (
                    <Link
                      key={href}
                      href={href}
                      className={`font-mono text-sm text-muted-foreground transition-all duration-500 hover:text-foreground ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${400 + i * 80}ms` }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
