import { NextResponse } from 'next/server';
import { getDynamicPosts, saveDynamicPosts } from '@/lib/dynamic-data';

export async function GET() {
  return NextResponse.json(getDynamicPosts());
}

export async function POST(req: Request) {
  const body = await req.json();
  const posts = getDynamicPosts();
  const newPost = { ...body, id: Date.now().toString() };
  saveDynamicPosts([newPost, ...posts]);
  return NextResponse.json(newPost, { status: 201 });
}
