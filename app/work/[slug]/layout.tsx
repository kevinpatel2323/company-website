import type { Metadata } from 'next';

import { getProjectBySlug, workProjects } from '@/lib/work-projects';

export async function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project — Tachyon Tech' };
  return {
    title: `${project.title} — Tachyon Tech`,
    description: project.tagline,
  };
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
