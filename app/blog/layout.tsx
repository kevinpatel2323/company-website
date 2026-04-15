import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Case Studies — Tachyon Tech',
  description:
    'Practical insights on product design, engineering, and delivery. Case studies from real projects, and guides your team can apply today.',
  openGraph: {
    title: 'Blog & Case Studies — Tachyon Tech',
    description:
      'Practical insights on product design, engineering, and delivery. Case studies from real projects, and guides your team can apply today.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tachyontech.io/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
