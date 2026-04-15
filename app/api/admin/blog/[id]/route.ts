import { NextResponse } from 'next/server';
import { getDynamicPosts, saveDynamicPosts } from '@/lib/dynamic-data';
import { blogPosts as staticPosts } from '@/lib/blog-posts';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  const dyn = getDynamicPosts().find(p => p.slug === id);
  if (dyn) return NextResponse.json({ ...dyn, source: 'dynamic' });
  const stat = staticPosts.find(p => p.slug === id);
  if (stat) return NextResponse.json({ ...stat, source: 'static' });
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const dynamic = getDynamicPosts();
  const exists = dynamic.some(p => p.slug === id);
  if (exists) {
    saveDynamicPosts(dynamic.map(p => (p.slug === id ? { ...p, ...body } : p)));
  } else {
    // Editing a static entry — create a dynamic copy that shadows it
    const stat = staticPosts.find(p => p.slug === id);
    saveDynamicPosts([{ ...stat, ...body }, ...dynamic]);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  saveDynamicPosts(getDynamicPosts().filter(p => p.slug !== id));
  return NextResponse.json({ ok: true });
}
