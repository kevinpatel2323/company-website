import { NextResponse } from 'next/server';
import { getDynamicPosts, getDynamicProjects, getDynamicPositions } from '@/lib/dynamic-data';
import { blogPosts } from '@/lib/blog-posts';
import { workProjects } from '@/lib/work-projects';
import { positions } from '@/lib/careers-data';

export async function GET() {
  return NextResponse.json({
    blog:    { static: blogPosts.length,    dynamic: getDynamicPosts().length },
    work:    { static: workProjects.length, dynamic: getDynamicProjects().length },
    careers: { static: positions.length,    dynamic: getDynamicPositions().length },
  });
}
