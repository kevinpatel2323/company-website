import '@/components/work/work-visuals.css';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { WorkHeroSection } from '@/components/work/work-hero-section';
import { WorkProjectsSection } from '@/components/work/work-projects-section';
import { WorkImpactSection } from '@/components/work/work-impact-section';
import { WorkDeliverySection } from '@/components/work/work-delivery-section';
import { WorkCtaSection } from '@/components/work/work-cta-section';
import { getDynamicProjects } from '@/lib/dynamic-data';

export const dynamic = 'force-dynamic';

export default function WorkPage() {
  const extraProjects = getDynamicProjects();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <WorkHeroSection />
      <WorkProjectsSection extra={extraProjects} />
      <WorkImpactSection />
      <WorkDeliverySection />
      <WorkCtaSection />
      <FooterSection />
    </main>
  );
}
