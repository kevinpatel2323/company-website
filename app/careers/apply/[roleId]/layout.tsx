import type { Metadata } from 'next';
import { getPositionById } from '@/lib/careers-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleId: string }>;
}): Promise<Metadata> {
  const { roleId } = await params;
  const position = getPositionById(roleId);
  if (!position) return { title: 'Apply — Tachyon Tech' };
  return {
    title: `Apply: ${position.title} — Tachyon Tech`,
    description: `Submit your application for the ${position.title} role at Tachyon Tech.`,
  };
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
