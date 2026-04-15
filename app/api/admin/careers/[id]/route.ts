import { NextResponse } from 'next/server';
import { getDynamicPositions, saveDynamicPositions } from '@/lib/dynamic-data';
import { positions as staticPositions } from '@/lib/careers-data';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  const dyn = getDynamicPositions().find(p => p.id === id);
  if (dyn) return NextResponse.json({ ...dyn, source: 'dynamic' });
  const stat = staticPositions.find(p => p.id === id);
  if (stat) return NextResponse.json({ ...stat, source: 'static' });
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const dynamic = getDynamicPositions();
  const exists = dynamic.some(p => p.id === id);
  if (exists) {
    saveDynamicPositions(dynamic.map(p => (p.id === id ? { ...p, ...body } : p)));
  } else {
    const stat = staticPositions.find(p => p.id === id);
    saveDynamicPositions([{ ...stat, ...body }, ...dynamic]);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  saveDynamicPositions(getDynamicPositions().filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
