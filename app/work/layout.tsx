import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Our work — Tachyon Tech',
  description:
    'Selected projects, delivery model, and impact metrics from our product design and engineering partnerships.',
};

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
