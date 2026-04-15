'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { ApplicationForm } from '@/components/careers/application-form';
import { getPositionById } from '@/lib/careers-data';

export default function ApplyPage({ params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = use(params);
  const position = getPositionById(roleId);
  if (!position) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-20 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/careers"
            className="mb-10 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All roles
          </Link>

          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-foreground/15 px-3 py-0.5 text-xs font-mono text-foreground/70">
                {position.department}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {position.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Clock className="h-3 w-3" />
                {position.type}
              </span>
            </div>

            <h1 className="text-4xl font-display leading-[1.05] tracking-tight lg:text-6xl mb-4">
              {position.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {position.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_340px] lg:gap-24 xl:grid-cols-[1fr_360px]">

          {/* Left: form */}
          <div>
            <ApplicationForm position={position} />
          </div>

          {/* Right: sticky role summary */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">Role summary</p>
                <div className="space-y-3">
                  {[
                    { label: 'Department', value: position.department },
                    { label: 'Type', value: position.type },
                    { label: 'Location', value: position.location },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between border-b border-foreground/8 pb-3">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-right max-w-[180px]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">What we need</p>
                <ul className="space-y-2">
                  {position.requirements.slice(0, 4).map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <p className="mb-3 text-xs font-mono text-muted-foreground">Questions?</p>
                <Link
                  href="mailto:careers@tachyontech.io"
                  className="text-sm font-mono text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4"
                >
                  careers@tachyontech.io
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
