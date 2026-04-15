import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers — Tachyon Tech',
  description:
    'Join a small, senior team building products people love. Remote-first, async-friendly, and obsessed with craft. 4 open roles.',
  openGraph: {
    title: 'Careers — Tachyon Tech',
    description: 'Join a small, senior team building products people love. Remote-first, 4 open roles.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tachyontech.io/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
