import { NextResponse } from 'next/server';
import { getDynamicProjects, saveDynamicProjects } from '@/lib/dynamic-data';
import { workProjects as staticProjects } from '@/lib/work-projects';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  const dyn = getDynamicProjects().find(p => p.slug === id);
  if (dyn) return NextResponse.json({ ...dyn, source: 'dynamic' });
  const stat = staticProjects.find(p => p.slug === id);
  if (stat) return NextResponse.json({ ...stat, source: 'static' });
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const dynamic = getDynamicProjects();
  const exists = dynamic.some(p => p.slug === id);
  if (exists) {
    saveDynamicProjects(dynamic.map(p => (p.slug === id ? { ...p, ...body } : p)));
  } else {
    const stat = staticProjects.find(p => p.slug === id);
    saveDynamicProjects([{ ...stat, ...body }, ...dynamic]);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  saveDynamicProjects(getDynamicProjects().filter(p => p.slug !== id));
  return NextResponse.json({ ok: true });
}
