import { NextResponse } from 'next/server';
import { getDynamicProjects, saveDynamicProjects } from '@/lib/dynamic-data';

export async function GET() {
  return NextResponse.json(getDynamicProjects());
}

export async function POST(req: Request) {
  const body = await req.json();
  const projects = getDynamicProjects();
  const newProject = { ...body, id: Date.now().toString() };
  saveDynamicProjects([newProject, ...projects]);
  return NextResponse.json(newProject, { status: 201 });
}
