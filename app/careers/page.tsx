'use client';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { CareersHero } from '@/components/careers/careers-hero';
import { CareersPositions } from '@/components/careers/careers-positions';
import { CareersCulture } from '@/components/careers/careers-culture';
import { CareersPerks } from '@/components/careers/careers-perks';
import { CareersCta } from '@/components/careers/careers-cta';

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <CareersHero />
      <CareersPositions />
      <CareersCulture />
      <CareersPerks />
      <CareersCta />
      <FooterSection />
    </main>
  );
}
