import { notFound } from 'next/navigation';

import { Navigation } from '@/components/landing/navigation';
import { FooterSection } from '@/components/landing/footer-section';
import { CaseStudyHero } from '@/components/work/case-study/case-study-hero';
import { CaseStudyOverview } from '@/components/work/case-study/case-study-overview';
import { CaseStudyProcess } from '@/components/work/case-study/case-study-process';
import { CaseStudyOutcomes } from '@/components/work/case-study/case-study-outcomes';
import { CaseStudyNext } from '@/components/work/case-study/case-study-next';
import { getProjectBySlug, workProjects } from '@/lib/work-projects';
import { getDynamicProjects } from '@/lib/dynamic-data';

import '@/components/work/work-visuals.css';

/* Allow slugs that weren't known at build time (admin-added projects) */
export const dynamicParams = true;

export function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* Check dynamic (admin) projects first, then fall back to static */
  const allProjects = [...getDynamicProjects(), ...workProjects];
  const project = allProjects.find(p => p.slug === slug);
  if (!project) notFound();

  /* Next project: prefer dynamic list for the linked slug too */
  const next =
    allProjects.find(p => p.slug === project.nextSlug) ??
    allProjects[0] ??
    project;

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyProcess project={project} processImage={project.processImage} />
      <CaseStudyOutcomes project={project} />
      <CaseStudyNext next={next} />
      <FooterSection />
    </main>
  );
}
