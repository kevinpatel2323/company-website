import { NextResponse } from 'next/server';
import { getDynamicPositions, saveDynamicPositions } from '@/lib/dynamic-data';

export async function GET() {
  return NextResponse.json(getDynamicPositions());
}

export async function POST(req: Request) {
  const body = await req.json();
  const positions = getDynamicPositions();
  const newPos = { ...body, id: `dyn-${Date.now()}` };
  saveDynamicPositions([newPos, ...positions]);
  return NextResponse.json(newPos, { status: 201 });
}
